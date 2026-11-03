//@ts-check
import { test, expect } from "@playwright/test";
const { SignUpPage } = require("../page/SignUpPage");
const users = require("../data/users");

/**@type {SignUpPage} */
let signUpPage;

test.beforeEach(async ({ page }) => {
  signUpPage = new SignUpPage(page);
  await signUpPage.open();
});

test("signup with correct credential", async ({ page }) => {
  await signUpPage.signup(users.userInfo.name, users.userInfo.email);
  await signUpPage.signUpForm(
    users.registerInfo.password,
    users.registerInfo.firstName,
    users.registerInfo.lastName,
    users.registerInfo.company,
    users.registerInfo.address,
    users.registerInfo.state,
    users.registerInfo.city,
    users.registerInfo.zipcode,
    users.registerInfo.phoneNumber,
  );
});

test('signup with wrong credentials',async()=>{
 await signUpPage.signUpWithExistingEmail(users.userInfo.name, users.userInfo.email);
})





