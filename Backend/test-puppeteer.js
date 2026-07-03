const chromium = require('@sparticuz/chromium');
const puppeteer = require('puppeteer-core');

async function test() {
    try {
        console.log("Getting executable path...");
        const path = await chromium.executablePath();
        console.log("Executable path:", path);

        console.log("Launching browser...");
        const browser = await puppeteer.launch({
            args: chromium.args,
            executablePath: path,
            headless: chromium.headless
        });
        console.log("Browser launched successfully!");
        await browser.close();
    } catch (e) {
        console.error("Failed:", e);
    }
}
test();
