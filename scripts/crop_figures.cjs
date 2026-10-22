const { chromium } = require('playwright-core');
const path = require('path');

async function cropFigures() {
    const dir = 'C:/Users/Oskar/.gemini/antigravity/scratch/podsumowanie_ob/images';
    const browser = await chromium.launch({
        executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
    });
    const page = await browser.newPage();

    // Definitions of crops in percentages of page width and height:
    // [x%, y%, w%, h%]
    const crops = [
        {
            src: 'page_1_full.png',
            dest: 'fig_southwest_heartone.png',
            crop: [0.22, 0.18, 0.75, 0.31] // HeartOne airplane & crew
        },
        {
            src: 'page_4_full.png',
            dest: 'fig_exhibit_4_1_affect_model.png',
            crop: [0.10, 0.58, 0.65, 0.33] // Exhibit 4-1: Affect, Emotions, and Moods
        },
        {
            src: 'page_5_full.png',
            dest: 'fig_exhibit_4_2_circumplex.png',
            crop: [0.28, 0.09, 0.63, 0.28] // Exhibit 4-2: Circumplex
        },
        {
            src: 'page_8_full.png',
            dest: 'fig_ob_poll_emotional_states.png',
            crop: [0.10, 0.09, 0.72, 0.34] // OB Poll: Emotional States
        },
        {
            src: 'page_10_full.png',
            dest: 'fig_exhibit_4_3_time_of_day.png',
            crop: [0.10, 0.09, 0.64, 0.71] // Exhibit 4-3: Time of Day
        },
        {
            src: 'page_12_full.png',
            dest: 'fig_exhibit_4_4_day_of_week.png',
            crop: [0.10, 0.09, 0.62, 0.74] // Exhibit 4-4: Day of Week
        },
        {
            src: 'page_13_full.png',
            dest: 'fig_staples_exercise.png',
            crop: [0.29, 0.69, 0.61, 0.24] // Staples exercise photo
        },
        {
            src: 'page_17_full.png',
            dest: 'fig_exhibit_4_5_cascading_ei.png',
            crop: [0.28, 0.66, 0.62, 0.23] // Exhibit 4-5: Cascading Model of EI
        },
        {
            src: 'page_23_full.png',
            dest: 'fig_ursula_burns_leadership.png',
            crop: [0.29, 0.09, 0.61, 0.33] // Ursula Burns leadership photo
        }
    ];

    for (const item of crops) {
        console.log(`Cropping ${item.dest} from ${item.src}...`);
        const srcPath = path.join(dir, item.src).replace(/\\/g, '/');
        const destPath = path.join(dir, item.dest).replace(/\\/g, '/');

        const html = `
        <!DOCTYPE html>
        <html>
        <body style="margin:0; background:white;">
            <canvas id="cropCanvas"></canvas>
            <img id="srcImg" src="file:///${srcPath}" style="display:none;" />
            <script>
                function doCrop(crop) {
                    return new Promise((resolve) => {
                        const img = document.getElementById('srcImg');
                        img.onload = () => {
                            const [cx, cy, cw, ch] = crop;
                            const sx = Math.floor(img.naturalWidth * cx);
                            const sy = Math.floor(img.naturalHeight * cy);
                            const sw = Math.floor(img.naturalWidth * cw);
                            const sh = Math.floor(img.naturalHeight * ch);

                            const canvas = document.getElementById('cropCanvas');
                            canvas.width = sw;
                            canvas.height = sh;
                            const ctx = canvas.getContext('2d');
                            ctx.drawImage(img, sx, sy, sw, sh, 0, 0, sw, sh);
                            resolve({ sw, sh });
                        };
                    });
                }
            </script>
        </body>
        </html>
        `;

        await page.setContent(html);
        await page.evaluate(c => window.doCrop(c), item.crop);
        const canvas = await page.$('#cropCanvas');
        await canvas.screenshot({ path: destPath });
        console.log(`Saved ${item.dest}`);
    }

    await browser.close();
    console.log('All crops completed successfully!');
}

cropFigures().catch(err => {
    console.error(err);
    process.exit(1);
});
