import { chromium } from 'playwright';

const globalSetup = async () => {
    console.log('Global setup: starting server, initializing database, etc.');

    const browser = await chromium.launch();
    await browser.newContext({
        permissions: ['geolocation', 'notifications', 'camera', 'microphone'],
    });
};

export default globalSetup;