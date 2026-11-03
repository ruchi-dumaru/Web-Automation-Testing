const { expect } = require("@playwright/test");

class CartPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.BASE_URL;
    this.products = page.locator(".product-image-wrapper");
    this.continueBtn = page.getByRole("button", { name: "Continue Shopping" });
    this.cartIcon = page
      .getByRole("link", {
        name: /Cart/,
      })
      .first();
    this.ShoppingCartText = page.getByText("Shopping Cart");
    this.productCol = page.locator("#cart_info_table tbody tr");
    this.checkOutBtn = page.getByText("Proceed To Checkout");
    this.checkoutBtn = page.getByText("Proceed To Checkout", { exact: true });

    this.productRows = page.locator("#cart_info_table tbody tr");
    this.cartEmptyMessage = page.getByText(
      "Cart is empty! Click here to buy products.",
    );
  }

  async openProductsPage() {
    const productUrl = new URL("/products", process.env.BASE_URL).toString();

    await this.page.goto(productUrl);
  }

  async addProduct(index) {
    // await this.products.nth(0).hover();
    // await this.products.nth(0).locator("a.add-to-cart:visible").first().click();
    // await this.continueBtn.click();

    // await this.products.nth(1).hover();

    // await this.products.nth(1).locator("a.add-to-cart:visible").first().click();

    // await this.continueBtn.click();

    // // Add third product
    // await this.products.nth(2).hover();

    // await this.products.nth(2).locator("a.add-to-cart:visible").first().click();

    // await this.continueBtn.click();

    // await this.cartIcon.click();

    const product = this.products.nth(index);
    await product.hover();
    await product.locator("a.add-to-cart:visible").first().click();
  }

  async continueShopping() {
    await this.continueBtn.click();
  }

  async addMultipleProducts(count) {
    for (let i = 0; i < count; i++) {
      await this.addProduct(i);
      if (i < count - 1) {
        await this.continueShopping();
      }
    }
    await this.cartIcon.click();
  }

  async verifyCart(expectCount) {
    await expect(this.ShoppingCartText).toBeVisible();
    await expect(this.productCol).toHaveCount(expectCount);

    await expect(this.checkOutBtn).toBeVisible();
  }

  async checkOut() {
    await this.checkOutBtn.click();
    await expect(this.page).toHaveURL(/checkout/);
  }

  //removing a peoduct from acart using its row index
  async removeProduct(index) {
    const productRow = this.productRows.nth(index);
    await expect(productRow).toBeVisible();
    await productRow.locator(".cart_quantity_delete").click();
    await expect(productRow).toBeHidden();
  }

  async verifyProductQuantity(index, quantity) {
    const productRow = this.productRows.nth(index);

    await expect(
      productRow.locator(".cart_quantity").toHaveText(String(quantity)),
    );
  }

  async openCartPage() {
    await this.page.goto(
      new URL("/view_cart", process.env.BASE_URL).toString(),
    );
  }

  async clearCart() {
    await this.openCartPage();

    while ((await this.productRows.count()) > 0) {
      const currentCount = await this.productRows.count();

      await this.productRows.first().locator(".cart_quantity_delete").click();

      await expect(this.productRows).toHaveCount(currentCount - 1);
    }
  }

  async verifyEmptyCart() {
    await expect(this.productRows).toHaveCount(0);
    await expect(this.cartEmptyMessage).toBeVisible();
  }

  async getCartSnapShot() {}

  async verifyProductPrice(index, expectedPrice) {
    const row = this.productRows.nth(index);

    await expect(
      row.locator(".cart_price p").toHaveText(`Rs. ${expectedPrice}`),
    );
  }

  async verifyProductTotal(index) {
    const row = this.productRows.nth(index);

    const priceText = await row.locator("cart_price p").innerText();

    const quantityText = await row
      .locator(". cart_quantity button")
      .innerText();

    const totalText = await row.locator("cart_total_price p").innerText();

    const price = Number(priceText.replace("Rs.", "").trim());
    const quantity = Number(quantityText.trim());

    const actualTotal = Number(totalText.replace("Rs.", "").trim());

    expect(actualTotal).toBe(price * quantity);
  }

  async getCartSnapshot() {
    return await this.productRows.evaluateAll((rows) =>
      rows.map((row) => ({
        name: row.querySelector("td.cart_description h4 a")?.innerText.trim(),
        price: row.querySelector("td.cart_price p")?.innerText.trim(),
        quantity: row
          .querySelector("td.cart_quantity button")
          ?.innerText.trim(),
        total: row.querySelector("td.cart_total p")?.innerText.trim(),
      })),
    );
  }
}
module.exports = { CartPage };
