import type { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
export class HomePage extends BasePage {
    private readonly consentButton: Locator;
    private readonly loginNavBar: Locator;
    private readonly loggoutButton: Locator;
    private readonly userIcon: Locator;

    constructor(public readonly page: Page) {
        super(page);
        this.consentButton = this.page.getByRole('button', {name: 'Consent'});
        this.loginNavBar = this.page.getByText(' Signup / Login');
        this.loggoutButton =this.page.locator('//i[@class="fa fa-lock"]');
        this.userIcon = this.page.locator('//i[@class="fa fa-user"]');

    }

    async handleConsentButton() {
        if (await this.consentButton.isVisible()) {
            await this.consentButton.click();
        }
    }
    async clickSignupLogin() {
        await this.loginNavBar.click();
    }

    async logout(){
        await this.loggoutButton.click();
    }
    async isUserIconVisible(): Promise<boolean> {
        return this.userIcon.isVisible();
    }
}