import { chromium } from 'playwright';
import { existsSync, rmSync } from 'fs';
import { join } from 'path';


const globalSetup = async () => {
    const browser = await chromium.launch();
    await browser.newContext({
        permissions: ['geolocation', 'notifications', 'camera', 'microphone'],
    });
    const allureReportPath = join(__dirname, 'allure-results');
    // Check if allure-report directory exists and delete it
    if (existsSync(allureReportPath)) {
        console.log('allure-report directory exists. Deleting it...');
        rmSync(allureReportPath, { recursive: true, force: true });
    } else {
        console.log('allure-report directory does not exist.');
    }
};

export default globalSetup;