import { BasePage } from './BasePage';
import {Page, Locator,expect } from '@playwright/test';

export class RegisterPage extends BasePage {
    private readonly sexe: Locator;
    private readonly name: Locator;
    private readonly email: Locator;
    private readonly password: Locator;
    private readonly days: Locator;
    private readonly months: Locator;
    private readonly years: Locator;
    private readonly newsletter: Locator;
    private readonly receive: Locator;
    private readonly firstName: Locator;
    private readonly lastName: Locator;
    private readonly company: Locator;
    private readonly address: Locator;
    private readonly address2: Locator;
    private readonly country: Locator;
    private readonly state: Locator;
    private readonly city: Locator;
    private readonly zipcode: Locator;
    private readonly mobileNumber: Locator;
    private readonly createAccountButton: Locator;
    private readonly continueButton: Locator;

    constructor(public readonly page: Page) {
        super(page);
        this.sexe = this.page.getByLabel('Mr.');
        this.name = this.page.getByTestId('name');
        this.email = this.page.getByTestId('email');
        this.password = this.page.getByTestId('password');
        this.days = this.page.getByTestId('days');
        this.months = this.page.getByTestId('months');
        this.years = this.page.getByTestId('years');
        this.newsletter = this.page.getByLabel('Sign up for our newsletter!');
        this.receive = this.page.getByLabel('Receive special offers from our partners!');
        this.firstName = this.page.getByTestId('first_name');
        this.lastName = this.page.getByTestId('last_name');
        this.company = this.page.getByTestId('company');
        this.address = this.page.getByTestId('address');
        this.address2 = this.page.getByTestId('address2');
        this.country = this.page.getByTestId('country');
        this.state = this.page.getByTestId('state');
        this.city = this.page.getByTestId('city');
        this.zipcode = this.page.getByTestId('zipcode');
        this.mobileNumber = this.page.getByTestId('mobile_number');
        this.createAccountButton = this.page.getByRole('button', { name: 'Create Account' });
        this.continueButton = this.page.getByTestId('continue-button');
    }

    async getNameValue(name: string){
        await expect(this.name).toHaveValue(name);
    }
    async getEmailValue(email: string){
        await expect(this.email).toHaveValue(email);
    }

    async registerFirstInfo(password:string) {
        await this.sexe.check();
        await this.password.fill(password);
    }


    async registerDateOfBirth(days:string,months:string,year:string){
        await this.days.selectOption({value:days});
        await this.months.selectOption({value:months});
        await this.years.selectOption({value:year});
    }

    async checkConsentStatus(){
        await this.newsletter.check();
        await this.receive.check();
    }

    async registerPersonnalInfo(firstName: string,lastName:string,company:string,address:string,address2:string){
        await this.firstName.fill(firstName);
        await this.lastName.fill(lastName);
        await this.company.fill(company);
        await this.address.fill(address);
        await this.address2.fill(address2);
    }

    async registerLocationInfo(country: string,state:string,city:string,zipcode:string,mobileNumber:string){
        await this.country.selectOption({value:country});
        await this.state.fill(state);
        await this.city.fill(city);
        await this.zipcode.fill(zipcode);
        await this.mobileNumber.fill(mobileNumber);
    }

    async createAccount(){
        await this.createAccountButton.click();
    }

    async continueOn(){
        await this.continueButton.click();
    }
}