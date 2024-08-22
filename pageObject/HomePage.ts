import type { Page, Locator } from '@playwright/test';

export class HomePage {
    private readonly consentButton: Locator;
    private readonly homeText: Locator;
    private readonly loginNavBar: Locator;

    constructor(public readonly page: Page) {
        this.consentButton = this.page.getByRole('button', {name: 'Consent'});
        this.homeText = this.page.getByAltText('Website for automation practice');
        this.loginNavBar = this.page.getByText(' Signup / Login');
    }

    async goto() {
        await this.page.goto('/');
    }

    async handleConsentButton() {
        if (await this.consentButton.isVisible()) {
            await this.consentButton.click();
        }
    }

    async verifyHomePage(altText: string) {
        const element = this.page.getByAltText(altText, {exact: true});
        return await element.isVisible();
    }

    async clickSignupLogin() {
        await this.loginNavBar.click();
    }
    async exitPage(page: { close: () => any; }) {
        await page.close();
    }
}