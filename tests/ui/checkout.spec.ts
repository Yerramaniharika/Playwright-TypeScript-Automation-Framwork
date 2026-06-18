import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { ProductsPage } from '../../pages/ProductsPage';
import { CheckoutPage } from '../../pages/CheckoutPage';

test.describe('Checkout Tests', () => {
  let loginPage: LoginPage;
  let productsPage: ProductsPage;
  let checkoutPage: CheckoutPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productsPage = new ProductsPage(page);
    checkoutPage = new CheckoutPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
  });

  test('Sort by Price low→high → verify first item price is lowest', async ({ page }) => {
    await productsPage.sortBy('lohi');
    const firstPrice = await productsPage.getFirstProductPrice();
    const allPrices = await productsPage.getAllProductPrices();
    
    const firstPriceNum = parseFloat(firstPrice?.replace('$', '') || '0');
    const allPricesNum = allPrices.map(p => parseFloat(p.replace('$', '')));
    
    const minPrice = Math.min(...allPricesNum);
    expect(firstPriceNum).toBe(minPrice);
  });

  test('Full checkout flow → "Thank you for your order!" message appears', async ({ page }) => {
    // Add a product
    await productsPage.addProductToCart('Sauce Labs Backpack');
    
    // Navigate to cart and checkout
    await page.click('[data-test="shopping-cart-link"]');
    await page.click('[data-test="checkout"]');
    
    // Fill checkout info
    await checkoutPage.fillCheckoutInfo('John', 'Doe', '12345');
    await checkoutPage.clickContinue();
    
    // Complete checkout
    await checkoutPage.clickFinish();
    
    // Verify success message
    const completeMessage = await checkoutPage.getCheckoutCompleteMessage();
    expect(completeMessage).toContain('Thank you for your order!');
  });
});
