import { Page } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  // Selectors using data-test attributes
  private usernameInput = '[data-test="username"]';
  private passwordInput = '[data-test="password"]';
  private loginButton = '[data-test="login-button"]';
  private errorMessage = '[data-test="error"]';

  async goto() {
    await this.page.goto('/');
  }

  async login(username: string, password: string) {
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
  }

  async getErrorMessage(): Promise<string | null> {
    return await this.page.textContent(this.errorMessage);
  }
}
