import {test,expect} from "@playwright/test";
const {LoginPage}=require('../page/LoginPage');
const users=require('../data/users')

/**@type {LoginPage} */
let loginPage;

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  await loginPage.open();
});

test('login with valid credentials',async({page})=>{
 await loginPage.login(users.loginInfo.email,users.loginInfo.password)
});

test('login with invalid credentials',async()=>{
  await loginPage.loginWithWrongCredential(
    users.invalidLoginInfo.email,
    users.invalidLoginInfo.password
  )
});
