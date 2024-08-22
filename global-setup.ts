import { chromium } from 'playwright';
import { existsSync, rmSync } from 'fs';
import { join } from 'path';
import { test as base } from '@playwright/test';
import { HomePage} from './pageObject/HomePage';

// Declare the types of your fixtures.
type MyFixtures = {
    homePage: HomePage;
};

export const test = base.extend<MyFixtures>({
    homePage: async ({ page }, use) => {
        const homePage = new HomePage(page);
        await homePage.goto();
        await use(homePage);
        await homePage.exitPage(page);
    }
});

const globalSetup = async () => {
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
export { expect } from '@playwright/test';