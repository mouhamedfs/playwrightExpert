import { BasePage } from './BasePage';
import type {Page, Locator } from '@playwright/test';

export class LoginPage extends BasePage {
    private readonly signUpName: Locator;
    private readonly signUpEmail: Locator;
    private readonly signUpButton: Locator;

    private readonly username: Locator;
    private readonly password: Locator;
    private readonly loginButton: Locator;

    constructor(public readonly page: Page) {
        super(page);
        this.signUpName = this.page.getByPlaceholder('Name');
        this.signUpEmail = this.page.getByTestId('signup-email');
        this.signUpButton = this.page.getByTestId('signup-button');
        this.username = this.page.getByTestId('login-email');
        this.password = this.page.getByTestId('login-password');
        this.loginButton = this.page.getByTestId('login-button');
    }

    async signUp(name: string,email:string) {
        await this.signUpName.fill(name);
        await this.signUpEmail.fill(email);
        await this.signUpButton.click();
    }

    async login(email: string,password:string) {
        await this.username.fill(email);
        await this.password.fill(password);
        await this.loginButton.click();
    }
}