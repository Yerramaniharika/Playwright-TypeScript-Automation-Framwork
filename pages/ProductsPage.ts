import { Page } from '@playwright/test';

export class ProductsPage {
  constructor(private page: Page) {}

  // Selectors using data-test attributes
  private inventoryItems = '[data-test="inventory-item"]';
  private productSortContainer = '[data-test="product-sort-container"]';
  private shoppingCartBadge = '[data-test="shopping-cart-badge"]';

  async addProductToCart(productName: string) {
    const product = this.page.locator(this.inventoryItems).filter({ hasText: productName });
    await product.locator('button:has-text("Add to cart")').click();
  }

  async getCartBadgeCount(): Promise<number> {
    const count = await this.page.textContent(this.shoppingCartBadge);
    return parseInt(count || '0', 10);
  }

  async sortBy(option: string) {
    await this.page.selectOption(this.productSortContainer, option);
  }

  async getFirstProductPrice(): Promise<string | null> {
    const firstProduct = this.page.locator(this.inventoryItems).first();
    return await firstProduct.locator('.inventory_item_price').textContent();
  }

  async getAllProductPrices(): Promise<string[]> {
    const prices = await this.page.locator(`${this.inventoryItems} .inventory_item_price`).allTextContents();
    return prices;
  }
}
