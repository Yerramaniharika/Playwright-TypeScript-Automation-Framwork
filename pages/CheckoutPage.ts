import { Page } from '@playwright/test';

export class CheckoutPage {
  constructor(private page: Page) {}

  // Selectors using data-test attributes
  private firstNameInput = '[data-test="firstName"]';
  private lastNameInput = '[data-test="lastName"]';
  private postalCodeInput = '[data-test="postalCode"]';
  private continueButton = '[data-test="continue"]';
  private finishButton = '[data-test="finish"]';
  private cartItems = '[data-test="cart-list-item"]';
  private checkoutCompleteMessage = '[data-test="complete-header"]';

  async fillCheckoutInfo(firstName: string, lastName: string, postalCode: string) {
    await this.page.fill(this.firstNameInput, firstName);
    await this.page.fill(this.lastNameInput, lastName);
    await this.page.fill(this.postalCodeInput, postalCode);
  }

  async clickContinue() {
    await this.page.click(this.continueButton);
  }

  async clickFinish() {
    await this.page.click(this.finishButton);
  }

  async getCartItemsCount(): Promise<number> {
    const count = await this.page.locator(this.cartItems).count();
    return count;
  }

  async getCheckoutCompleteMessage(): Promise<string | null> {
    return await this.page.textContent(this.checkoutCompleteMessage);
  }
}
