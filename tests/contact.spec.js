import { test, expect } from "@playwright/test";
const { ContactPage } = require("../page/ContactPage");
const users = require("../data/users");

/**@type {ContactPage} */
let contactPage;

test("contact from testing", async ({ page }) => {
  contactPage = new ContactPage(page);
  await page.goto(process.env.BASE_URL);

  await contactPage.contactForm(
    users.contactInfo.email,
    users.contactInfo.name,
    users.contactInfo.subject,
    users.contactInfo.message,
  );
});


