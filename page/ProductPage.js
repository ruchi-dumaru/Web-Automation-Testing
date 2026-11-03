const {expect}=require("@playwright/test");

class ProductPage{
  cosntructor(page){
    this.page=page;

    this.searchInput=page.getByRole('textbox', { name: 'Search Product' })

    this.searchButton=page.locator('#submit_search');

    this.searchHeading=page.getByRole('heading', { name: 'Searched Products' })

    this.productNames= page.locator(".productinfo p");
  }

  async open(){
    const productUrl= new URL('/products',process.env.BASE_URL).toString();

    await this.page.goto(productUrl);
  }

  async serachProduct(productName){
    await this.searchInput.fill(productName)
    await this.searchButton.click();
  }

  async verifySearchResults(productName){
    await expect (this.searchHeading).toBeVisible();

    const count=await this.productNames.count();

    expect(count).toBeGreaterThan(0);

    await expect(this.productNames.first()).toContainText(productName,{ ignoreCase: true })
  }
}

module.exports={ProductPage};