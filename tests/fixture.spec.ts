import { faker } from '@faker-js/faker';
import { test, expect} from '../global-setup'
import fs from 'fs';

const email = faker.internet.email();
const firstName = faker.person.firstName();
const password = faker.internet.password();



test('Register User',{tag : '@register'},async ({ homePage,loginPage,registerPage, page }) => {


    expect(page.url()).toBe('https://automationexercise.com/');


    await homePage.handleConsentButton();
    //Verify that home page is visible successfully
    await homePage.isAltTextVisible('Website for automation practice');
    //Click on sign up Login button
    await homePage.clickSignupLogin();

    // Verify 'New User Signup!' is visible
    await loginPage.isAltTextVisible('New User Signup!');

    //Enter name and email address
    //Click 'Signup' button
    await loginPage.signUp(firstName,email);


    //Verify that 'ENTER ACCOUNT INFORMATION' is visible
    await registerPage.isAltTextVisible('Enter Account Information');

    //Fill details: Title, Name, Email, Password, Date of birth
    await registerPage.registerFirstInfo(password);
    await registerPage.getNameValue(firstName);
    await registerPage.getEmailValue(email);

    await registerPage.registerDateOfBirth("25","12","1995");
    //Select checkbox 'Sign up for our newsletter!'
    await registerPage.checkConsentStatus()

    //Fill details: First name, Last name, Company, Address, Address2, Country, State, City, Zipcode, Mobile Number
    await registerPage.registerPersonnalInfo("Famara","SANE","Mbirkilane","28 Rue Gambetta","Lezennes");

    await registerPage.registerLocationInfo("Canada","Montreal","Quebec","59260","0744802416");

    //await page.getByLabel('Create Account').click();
    await registerPage.createAccount();

    //Verify that 'ACCOUNT CREATED!' is visible
    await  registerPage.isAltTextVisible('Account Created!');
    //Click 'Continue' button
    await registerPage.continueOn();
    fs.writeFileSync('tests/data.json', JSON.stringify({username: email, password: password}),'utf8');
});

test('Login User with correct email and password',async ({ homePage, loginPage,page }) => {

    const data = JSON.parse(fs.readFileSync('tests/data.json', 'utf8'));

    //Navigate to url 'http://automationexercise.com'
    expect(page.url()).toBe('https://automationexercise.com/');

    await homePage.handleConsentButton();

    //Verify that home page is visible successfully
    await homePage.isAltTextVisible('Website for automation practice');

    //Click on 'Signup / Login' button
    await homePage.clickSignupLogin();

    // Verify 'Login to your account' is visible
    await loginPage.isAltTextVisible('Login to your account');

    //Enter correct email address and password
    await loginPage.login(data.username, data.password);
});

test('Login User with incorrect email and password',async ({ homePage, loginPage,page }) => {

    //Navigate to url 'http://automationexercise.com'
    expect(page.url()).toBe('https://automationexercise.com/');

    await homePage.handleConsentButton();

    //Verify that home page is visible successfully
    await homePage.isAltTextVisible('Website for automation practice');

    //Click on 'Signup / Login' button
    await homePage.clickSignupLogin();

    // Verify 'Login to your account' is visible
    await loginPage.isAltTextVisible('Login to your account');

    //Enter correct email address and password
    await loginPage.login(email,password);

    await loginPage.isAltTextVisible('Your email or password is incorrect!');
});

test('Logout User',{ tag: '@loggout'},async ({ homePage,loginPage,page }) => {

    const data = JSON.parse(fs.readFileSync('tests/data.json', 'utf8'));

    //Navigate to url 'http://automationexercise.com'
    expect(page.url()).toBe('https://automationexercise.com/');

    await homePage.handleConsentButton();

    //Verify that home page is visible successfully
    await homePage.isAltTextVisible('Website for automation practice');

    //Click on 'Signup / Login' button
    await homePage.clickSignupLogin();

    // Verify 'Login to your account' is visible
    await loginPage.isAltTextVisible('Login to your account');

    //Enter correct email address and password
    await loginPage.login(data.username, data.password);

    //Verify that 'Logged in as username' is visible
   await homePage.isUserIconVisible();

    //Click 'Logout' button
    await homePage.logout();
});