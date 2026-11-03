class ProductDetail{
  constructor(){
    this.page=page;
    this.productLinkName=page.getByRole('link', { name: ' Products' });
    this.product1=page.getByRole('link', { name: 'Blue Top' })
    this.quantity=page.locator('#quantity').fill('2');
    this.stockText=page.getByText('Availability: In Stock');
    this.condition=page.getByText('Condition: New')
    this.addToCartBtn=page.getByRole('button', { name: ' Add to cart' });
    this.continueBtn=page.getByRole('button', { name: 'Continue Shopping' })

  }

  
}