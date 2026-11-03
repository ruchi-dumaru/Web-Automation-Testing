const constants = require("../data/constants");
const { expect } = require("@playwright/test");

class LoginPage {
  constructor(page) {
    this.loginLink = page.getByRole("link", { name: "Signup / Login" });

    this.logoutLink = page.getByText("Logout", { exact: true });
    this.page = page;
    this.email = page
      .locator("form")
      .filter({ hasText: "Login" })
      .getByPlaceholder("Email Address");
    this.password = page.getByRole("textbox", { name: "Password" });
    this.loginBtn = page.getByRole("button", { name: "Login" });

    this.loginError=page.getByText('Your email or password is incorrect!');

  }

  async open() {
    console.log("website open for login test");
    await this.page.goto(process.env.BASE_URL);
    console.log("Landing page opened successfully");
  }

  async login(email, password) {
    await this.loginLink.click();
    await this.email.fill(email);
    await this.password.fill(password);
    await this.loginBtn.click();

    await expect(this.page.getByRole("link", { name: "Logout" })).toBeVisible();
    await expect(this.page).toHaveURL(process.env.BASE_URL);
    // await expect(page.getByText('Logged in as om')).toBeVisible();
  }

  async logout() {
    await this.logoutLink.click();
    await expect(this.page).toHaveURL(/\/login$/);
  }

  async loginWithWrongCredential(email,password){
 await this.loginLink.click();
 await this.email.fill(email);
 await this.password.fill(password);

 await this.loginBtn.click();

 await expect(this.loginError).toBeVisible();
 await expect(this.logoutLink).not.toBeVisible();
  }
}



module.exports = { LoginPage };
