import { test, expect } from "@playwright/test";
class ContactPage {
  constructor(page) {
    this.page = page;
    this.contactLink = page.getByRole("link", { name: "Contact us" });
    this.name = page.getByRole("textbox", { name: "Name" });
    this.email = page.getByRole("textbox", { name: "Email", exact: true });
    this.subject = page.getByRole("textbox", { name: "Subject" });
    this.message = page.getByRole("textbox", { name: "Your Message Here" });
    this.file = page.locator("input[name='upload_file']");
    this.submitBtn = page.locator('[name="submit"]');
    this.homeBtn = page.locator("span").filter({ hasText: "Home" });
  }

  async contactForm(email, name, subject, message) {
    await this.contactLink.click();
    await this.name.fill(name);
    await this.email.fill(email);
    await this.subject.fill(subject);
    await this.message.fill(message);
    await this.file.setInputFiles("upload/banner1.jpg");

     await this.submitBtn.click();

    await this.page.once("dialog", (dialog) => {
      console.log(`Dialog message: ${dialog.message()}`);
      dialog.accept();
    });
   

  //  await   expect(
  //      this.page.locator("#contact-page").getByText("Success! Your details have"),
  //   ).toBeVisible();
  //    await expect(  this.page.locator('span').filter({ hasText: 'Home' })).toBeVisible();
  //   await this.homeBtn.click();

   }
}

module.exports = { ContactPage };
// npx playwright test contact.spec.js --headed --debug
