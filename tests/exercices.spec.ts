import { test as base } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { expect } from "@playwright/test";
import fs from 'fs';

const email = faker.internet.email();
const name = faker.person.firstName();
const password = faker.internet.password();

const test = base.extend({
    page: async ({ browser }, use) => {
        const page = await browser.newPage();
        await page.goto('/');
        await use(page);
        await page.close();
    },
});

    test('Register User',{tag : '@fixtures'},async ({ page }) => {



        //https://demoqa.com/checkbox
        //npm install @faker-js/faker playwright

        //Navigate to url
        expect(page.url()).toBe('https://automationexercise.com/');


        const consentButton = page.getByRole('button', {name: 'Consent'});
        if (await consentButton.isVisible()) {
            // Click the "Consent" button if it is visible
            await consentButton.click();
        }
        //Verify that home page is visible successfully
        await expect(page.getByAltText('Website for automation practice', { exact: true })).toBeVisible();

        //Click on sign up Login button
        await page.getByText(' Signup / Login').click();

        // Verify 'New User Signup!' is visible
        await expect(page.getByText('New User Signup!', { exact: true })).toBeVisible();

        //Enter name and email address
        await page.getByPlaceholder('Name').fill(name);
        await page.getByTestId('signup-email').fill(email);
        //Click 'Signup' button
        await page.getByTestId('signup-button').click();


        //Verify that 'ENTER ACCOUNT INFORMATION' is visible
        await expect(page.getByText('Enter Account Information', { exact: true })).toBeVisible();

        //Fill details: Title, Name, Email, Password, Date of birth

        await page.getByLabel('Mr.').check();
        await expect(page.getByTestId('name')).toHaveValue(name);
        await expect(page.getByTestId('email')).toHaveValue(email);
        await page.getByTestId('password').fill(password);
        await page.getByTestId('days').selectOption({value: "25"});
        await page.getByTestId('months').selectOption({value: "12"});
        await page.getByTestId('years').selectOption({value: "1995"});

        //Select checkbox 'Sign up for our newsletter!'
        await page.getByLabel('Sign up for our newsletter!').check();

        //Select checkbox 'Receive special offers from our partners!'
        await page.getByLabel('Receive special offers from our partners!').check();

        //Fill details: First name, Last name, Company, Address, Address2, Country, State, City, Zipcode, Mobile Number
        await page.getByTestId('first_name').fill('Famara');
        await page.getByTestId('last_name').fill('SANE');
        await page.getByTestId('company').fill('Mbirkilane');
        await page.getByTestId('address').fill('28 Rue Gambetta');
        await page.getByTestId('address2').fill('Lezennes');

        await page.getByTestId('country').selectOption({value: "Canada"});
        await page.getByTestId('state').fill("Montreal");
        await page.getByTestId('city').fill("Quebec");
        await page.getByTestId('zipcode').fill("59260");
        await page.getByTestId('mobile_number').fill("0744802416");

        //await page.getByLabel('Create Account').click();
        await page.getByRole('button', { name: 'Create Account' }).click();

        //Verify that 'ACCOUNT CREATED!' is visible
        await expect(page.getByText('Account Created!', { exact: true })).toBeVisible();

        //Click 'Continue' button
        await page.getByTestId('continue-button').click();
        fs.writeFileSync('tests/data.json', JSON.stringify({username: email, password: password}),'utf8');
    });