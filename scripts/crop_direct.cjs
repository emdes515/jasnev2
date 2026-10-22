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
        <canvas id="pageCanvas"></canvas>
        <canvas id="cropCanvas"></canvas>
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

            async function renderAndCrop(pageNum, cropBox, scale = 2.0) {
                const p = await pdfDoc.getPage(pageNum);
                const viewport = p.getViewport({ scale });
                const pageCanvas = document.getElementById('pageCanvas');
                pageCanvas.width = viewport.width;
                pageCanvas.height = viewport.height;
                const ctx = pageCanvas.getContext('2d');
                await p.render({ canvasContext: ctx, viewport }).promise;

                // cropBox: [xNorm, yNorm, wNorm, hNorm]
                const [cx, cy, cw, ch] = cropBox;
                const sx = Math.floor(viewport.width * cx);
                const sy = Math.floor(viewport.height * cy);
                const sw = Math.floor(viewport.width * cw);
                const sh = Math.floor(viewport.height * ch);

                const cropCanvas = document.getElementById('cropCanvas');
                cropCanvas.width = sw;
                cropCanvas.height = sh;
                const cropCtx = cropCanvas.getContext('2d');
                cropCtx.drawImage(pageCanvas, sx, sy, sw, sh, 0, 0, sw, sh);

                return cropCanvas.toDataURL('image/png');
            }
        </script>
    </body>
    </html>
    `;

    await page.setContent(htmlContent);
    await page.evaluate(b => window.loadPdf(b), base64Data);

    const crops = [
        {
            page: 1,
            dest: 'fig_southwest_heartone.png',
            crop: [0.22, 0.17, 0.75, 0.32] // Southwest HeartOne airplane & flight crew jumping
        },
        {
            page: 4,
            dest: 'fig_exhibit_4_1_affect_model.png',
            crop: [0.10, 0.58, 0.65, 0.33] // Exhibit 4-1: Affect, Emotions, and Moods
        },
        {
            page: 5,
            dest: 'fig_exhibit_4_2_circumplex.png',
            crop: [0.28, 0.08, 0.63, 0.28] // Exhibit 4-2: Circumplex
        },
        {
            page: 8,
            dest: 'fig_ob_poll_emotional_states.png',
            crop: [0.10, 0.08, 0.72, 0.35] // OB Poll: Emotional States
        },
        {
            page: 10,
            dest: 'fig_exhibit_4_3_time_of_day.png',
            crop: [0.10, 0.08, 0.64, 0.72] // Exhibit 4-3: Time of Day
        },
        {
            page: 12,
            dest: 'fig_exhibit_4_4_day_of_week.png',
            crop: [0.10, 0.08, 0.62, 0.75] // Exhibit 4-4: Day of Week
        },
        {
            page: 13,
            dest: 'fig_staples_exercise.png',
            crop: [0.29, 0.69, 0.61, 0.24] // Staples exercise photo
        },
        {
            page: 17,
            dest: 'fig_exhibit_4_5_cascading_ei.png',
            crop: [0.28, 0.65, 0.62, 0.24] // Exhibit 4-5: Cascading Model of EI
        },
        {
            page: 23,
            dest: 'fig_ursula_burns_leadership.png',
            crop: [0.29, 0.08, 0.61, 0.34] // Ursula Burns leadership photo
        }
    ];

    for (const c of crops) {
        console.log(`Processing ${c.dest} from page ${c.page}...`);
        const dataUrl = await page.evaluate(({ pageNum, crop }) => window.renderAndCrop(pageNum, crop), {
            pageNum: c.page,
            crop: c.crop
        });
        const base64Png = dataUrl.replace(/^data:image\/png;base64,/, '');
        fs.writeFileSync(path.join(outDir, c.dest), Buffer.from(base64Png, 'base64'));
        console.log(`Saved ${c.dest}`);
    }

    await browser.close();
    console.log('All crops created directly and saved!');
}

main().catch(err => {
    console.error(err);
    process.exit(1);
});
