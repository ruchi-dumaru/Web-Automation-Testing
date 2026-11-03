const constants = require("../data/constants");
const { expect } = require("@playwright/test");

class SignUpPage {
  constructor(page) {
    this.page = page;
    this.baseURL = process.env.BASE_URL;

    this.singUpLink = page.getByRole("link", { name: "Signup / Login" });
    this.inputName = page.locator('input[name="name"]');
    this.inputEmail = page.locator("input[data-qa='signup-email']");
    this.signUpBtn = page.getByText("Signup", { exact: true });
    this.gender = page.getByText("Mrs.");
    this.inputPassword = page.getByRole("textbox", { name: "Password *" });
    this.selectDay = page.locator("#days");
    this.selectMonth = page.locator("#months");
    this.selectYear = page.locator("#years");
    this.checkNewsLetter = page.getByRole("checkbox", {
      name: "Sign up for our newsletter!",
    });
    this.checkSpecialOffer = page.getByRole("checkbox", {
      name: "Receive special offers from",
    });
    this.firstNameInput = page.getByRole("textbox", { name: "First name *" });
    this.lastNameInput = page.getByRole("textbox", { name: "Last name *" });
    this.companyInput = page.getByRole("textbox", {
      name: "Company",
      exact: true,
    });
    this.address = page.locator("#address1");
    this.state = page.getByRole("textbox", { name: "State *" });
    this.city = page.getByRole("textbox", { name: "City *" });
    this.zipcode = page.locator("#zipcode");
    this.phoneNo = page.getByRole("textbox", { name: "Mobile Number *" });
    this.clickBtn = page.getByRole("button", { name: "Create Account" });
    this.errorMessage = page.getByText("Email Address already exist!");
    this.AccInfoHeading = page.locator(':text-is("ENTER ACCOUNT INFORMATION")');
  }

  async open() {
    console.log(`Opening the website :${this.baseURL}`);
    await this.page.goto("https://www.automationexercise.com/");
    console.log("Landing page opened successfully");
  }

  async signup(name, email) {
    await this.singUpLink.click();
    await this.inputName.fill(name);
    await this.inputEmail.fill(email);

    await expect(this.page).toHaveURL(process.env.SIGNUP_PAGE_URL || "");
    await expect(
      this.page.locator(`h2:has-text("${constants.text.signUpTitle}")`),
    ).toBeVisible();

    await this.signUpBtn.click();
  }

  async signUpForm(
    password,
    firstName,
    lastName,
    company,
    address,
    state,
    city,
    zipcode,
    phonenumber,
  ) {
    await expect(
      this.page.getByText("Enter Account Information"),
    ).toBeVisible();
    await expect(this.page.getByText("Address Information")).toBeVisible();
    await this.gender.click();
    await this.gender.check();
    await this.inputPassword.fill(password);
    await this.selectDay.selectOption("10");
    await this.selectMonth.selectOption("9");
    await this.selectYear.selectOption("2009");
    await this.checkNewsLetter.check();
    await this.checkSpecialOffer.check();
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.companyInput.fill(company);
    await this.address.fill(address);
    await this.state.fill(state);
    await this.city.fill(city);
    await this.zipcode.fill(zipcode);
    await this.phoneNo.fill(phonenumber);
    await this.page.getByRole("button", { name: "Create Account" }).click();
    await expect(page.getByText("Account Created!")).toBeVisible();
    await expect(page).toHaveURL(process.env.SIGNUP_SUCCESS_PGURL);
    await page.getByRole("link", { name: "Continue" }).click();
    expect(page).toHaveURL(process.env.BASE_URL);
  }

  async signUpWithExistingEmail(name, email) {
    await this.singUpLink.click();
    await this.inputName.fill(name);
    await this.inputEmail.fill(email);

    await expect(this.page).toHaveURL(process.env.SIGNUP_PAGE_URL || "");

    await this.signUpBtn.click();

    await expect(this.errorMessage).toBeVisible();
    await expect(this.AccInfoHeading).not.toBeVisible();
  }
}

module.exports = { SignUpPage };

//npx playwright test signUp.spec.js --headed --debug
