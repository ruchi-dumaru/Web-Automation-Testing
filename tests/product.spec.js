import {test} from '@playwright/test';

const {ProductPage}=require("../page/ProductPage")
const products=require("../data/products");

let productPage;

test.beforeEach(async({page})=>{
  productPage=new ProductPage(page);
  await productPage.open();
})

test("Search product by name",async()=>{
  await productPage.searchProduct(products.searchProduct);
  await productPage.verifySearchResults(products.searchProduct)
})