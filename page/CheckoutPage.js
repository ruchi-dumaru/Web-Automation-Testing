const { expect } = require("@playwright/test");

class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.addressDetails = page.getByRole("heading", {
      name: "Address Details",
    });
    this.deliveryAddress = page.getByRole("heading", {
      name: "Your delivery address",
    });
    this.placeOrderBtn =  page.getByText('Place Order', { exact: true })

    this.nameOnCard = page.locator('input[name="name_on_card"]');
    this.cardNumber = page.locator('input[name="card_number"]');

    this.expiryDate = page.getByRole("textbox", { name: "ex." });
    this.month = page.getByRole("textbox", { name: "MM" });
    this.year = page.getByRole("textbox", { name: "YYYY" });
    this.payConfirmBtn = page.getByText('Pay and Confirm Order', { exact: true })
    this.orderPlacedText= page.getByText('Order Placed!');
    this.orderSuccessText=page.locator('#form');
    this.invoiceBtn=page.getByRole('link', { name: 'Download Invoice' });
    this.continueBtn=page.getByRole('link', { name: 'Continue' });
    
  }

  async verifyCheckoutPage(){
    await expect(this.addressDetails).toBeVisible();
    await expect( this.deliveryAddress).toBeVisible();
  }

  async placeOrder(){
    await this.placeOrderBtn.click();
    await expect(this.page).toHaveURL(/\/payment$/);
  }

  async enterPaymentDetails(payment){
    await this.nameOnCard.fill(payment.nameOnCard);
    await  this.cardNumber.fill(payment.cardNumber);
    await   this.expiryDate.fill(payment.expiryDate);
     await this.month .fill(payment.month);
     await  this.year.fill(payment.year);

  }

  async confirmPayment(){
    await this.payConfirmBtn.click();
  }

  async verifyOrderConfirmation(){
    await expect(this.orderPlacedText).toBeVisible();
    await expect(this.orderSuccessText).toContainText('Congratulations! Your order has been confirmed!');
    await expect(this.invoiceBtn).toBeVisible();
    await this.continueBtn.click();

  }

}

module.exports={CheckoutPage}