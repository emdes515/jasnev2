const { chromium } = require('playwright-core');
const fs = require('fs');
const path = require('path');

async function main() {
    const pdfPath = 'C:/Users/Oskar/.gemini/antigravity/brain/6b096f72-aff1-4bbd-8a91-17a61fa06275/.user_uploaded/media_1792348086975.pdf';
    const outDir = 'C:/Users/Oskar/.gemini/antigravity/scratch/podsumowanie_ob/images';
    if (!fs.existsSync(outDir)) {
        fs.mkdirSync(outDir, { recursive: true });
    }

    const pdfBuffer = fs.readFileSync(pdfPath);
    const base64Data = pdfBuffer.toString('base64');

    const browser = await chromium.launch({
        executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
    });
    const page = await browser.newPage();

    const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js"></script>
    </head>
    <body style="margin:0; background:white;">
        <canvas id="canvas"></canvas>
        <script>
            pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
            let pdfDoc = null;

            async function loadPdf(base64) {
                const raw = atob(base64);
                const uint8 = new Uint8Array(raw.length);
                for (let i = 0; i < raw.length; i++) uint8[i] = raw.charCodeAt(i);
                pdfDoc = await pdfjsLib.getDocument({ data: uint8 }).promise;
                return pdfDoc.numPages;
            }

            async function renderPage(pageNum, scale = 2.0) {
                const p = await pdfDoc.getPage(pageNum);
                const viewport = p.getViewport({ scale });
                const canvas = document.getElementById('canvas');
                canvas.width = viewport.width;
                canvas.height = viewport.height;
                const ctx = canvas.getContext('2d');
                await p.render({ canvasContext: ctx, viewport }).promise;
                return { width: viewport.width, height: viewport.height };
            }
        </script>
    </body>
    </html>
    `;

    await page.setContent(htmlContent);
    const numPages = await page.evaluate(b => window.loadPdf(b), base64Data);
    console.log(`PDF loaded. Total pages: ${numPages}`);

    // Let's render key pages and crop target figures
    // Page 1: HeartOne photo (top half)
    // Page 4: Exhibit 4-1 (bottom half)
    // Page 5: Exhibit 4-2 Circumplex (top/mid)
    // Page 8: OB Poll chart (top)
    // Page 10: Exhibit 4-3 Time of Day (full graphs)
    // Page 12: Exhibit 4-4 Day of Week (graphs)
    // Page 13: Staples exercise photo
    // Page 17: Exhibit 4-5 Cascading Model of EI
    // Page 23: Ursula Burns photo

    const targets = [
        { page: 1, name: 'page_1_full.png' },
        { page: 4, name: 'page_4_full.png' },
        { page: 5, name: 'page_5_full.png' },
        { page: 8, name: 'page_8_full.png' },
        { page: 10, name: 'page_10_full.png' },
        { page: 12, name: 'page_12_full.png' },
        { page: 13, name: 'page_13_full.png' },
        { page: 17, name: 'page_17_full.png' },
        { page: 23, name: 'page_23_full.png' }
    ];

    for (const t of targets) {
        console.log(`Rendering page ${t.page}...`);
        await page.evaluate(p => window.renderPage(p, 2.0), t.page);
        const canvas = await page.$('#canvas');
        await canvas.screenshot({ path: path.join(outDir, t.name) });
        console.log(`Saved ${t.name}`);
    }

    await browser.close();
    console.log('All target pages rendered successfully!');
}

main().catch(err => {
    console.error('Error:', err);
    process.exit(1);
});
