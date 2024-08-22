import type { Page, Locator } from '@playwright/test';

export class BasePage {
    public readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async goto(url: string = '/') {
        await this.page.goto(url);
    }

    async isAltTextVisible(altText: string): Promise<boolean> {
        const element = this.page.getByAltText(altText, { exact: true });
        return element.isVisible();
    }

    async exitPage() {
        await this.page.close();
    }
}