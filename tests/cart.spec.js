import { test, expect } from "@playwright/test";
const { CartPage } = require("../page/CartPage");
const { LoginPage } = require("../page/LoginPage");
const { CheckoutPage } = require("../page/CheckoutPage");

const users = require("../data/users");
const payment = require("../data/payment");

/**@type {LoginPage} */
let loginPage;

/**@type {CartPage} */
let cartPage;
let checkoutPage;

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  cartPage = new CartPage(page);
  checkoutPage = new CheckoutPage(page);

  await loginPage.open();
  await loginPage.login(users.loginInfo.email, users.loginInfo.password);
});

// npx playwright test cart.spec.js --headed

test("Add multiple products to cart", async () => {
  await cartPage.openProductsPage();
  await cartPage.addMultipleProducts(3);
  await cartPage.verifyCart(3);
  await cartPage.checkOut();
  await checkoutPage.verifyCheckoutPage();
  await checkoutPage.placeOrder();
  await checkoutPage.enterPaymentDetails(payment);
  await checkoutPage.confirmPayment();
  await checkoutPage.verifyOrderConfirmation();
  await cartPage.removeProduct(0);
});

test("verify updated product quantity in cart", async ({ page }) => {
  await cartPage.verifyProductQuantity(0, 3);
});

test("Verify prodcut price and total price ", async () => {
  await cartPage.clearCart();
  await cartpage.openProductsPage();
  await cartpage.addMultipleProducts(1);
  await cartPage.openCartPage();

  const cartItems = await cartPage.getCartSnapShot();

  expect(cartItems).toHaveLength(1);
  expect(cartItems[0].price).toMatch(/^Rs\.\s*\d+$/);
  await cartPage.verifyProductTotal(0);
});

test("Verify cart is empty after removing all products", async () => {
  await cartPage.clearCart();
  await cartPage.openProductsPage();
  await cartPage.addMultipleProducts(2);
  await cartPage.openCartPage();
  await cartPage.verifyCart(3);

  await cartPage.clearCart();
  await cartPage.verifyEmptyCart();
});

test("verify cart persist after browser refresh", async ({ page }) => {
  await cartPage.clearCart();
  await cartPage.openProductsPage();
  await cartPage.openCartPage();
  const cartBeforeReferesh = await cartPage.getCartSnapShot();

  await page.reload();

  const cartAfterReferesh = await cartPage.getCartSnapShot();

  expect(cartBeforeReferesh).toEqual(cartAfterReferesh);
});

test("Verify cart persists after logout and login", async () => {
  await cartPage.clearCart();
  await cartPage.addMultipleProducts();
  await cartPage.openCartPage();

  const cartBeforeLogout = await cartPage.getCartSnapShot();

  await loginPage.logout();

  await loginPage.login(users.loginInfo.email, users.loginInfo.password);

  await cartPage.openCartPage();
  const cartAfterLogin = await cartPage.getCartSnapShot();

  expect(cartAfterLogin).toEqual(cartBeforeLogout);
});
