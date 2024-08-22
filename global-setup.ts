import { chromium } from 'playwright';
import { existsSync, rmSync } from 'fs';
import { join } from 'path';
import { test as base } from '@playwright/test';
import { BasePage } from './pageObject/BasePage';
import { HomePage } from './pageObject/HomePage';
import { LoginPage } from './pageObject/LoginPage';
import { RegisterPage } from './pageObject/RegisterPage';


type MyFixtures = {
    basePage: BasePage;
    homePage: HomePage;
    loginPage: LoginPage;
    registerPage: RegisterPage;
};

export const test = base.extend<MyFixtures>({
    basePage: async ({ page }, use) => {
        const basePage = new BasePage(page);
        await basePage.goto();  // Navigate to the default URL
        await use(basePage);
        //await basePage.exitPage();  // Close the page after test
    },
    homePage: async ({ basePage }, use) => {
        const homePage = new HomePage(basePage.page);
        await use(homePage);
    },
    loginPage: async ({ basePage }, use) => {
        const loginPage = new LoginPage(basePage.page);
        await use(loginPage);
    },
    registerPage: async ({ basePage }, use) => {
        const registerPage = new RegisterPage(basePage.page);
        await use(registerPage);
    },
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