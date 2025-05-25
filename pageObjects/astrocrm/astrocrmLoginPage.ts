import { Locator, Page } from "@playwright/test";
import { BasePage } from "../basePage.ts";

export class AstrocrmLoginPage extends BasePage {
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitSignInButton: Locator;

  constructor(page: Page) {
    super(page);
    this.emailInput = page.locator('//input[@name="email"]');
    this.passwordInput = page.locator('//input[@name="password"]');
    this.submitSignInButton = page.locator(
      '//button[contains(text(), "Sign In")]'
    );
  }

  async navigate() {
    await this.page.goto(`${process.env.ASTROCRM_URL}/login`);
  }

  async login(
    email: string = "shumitska@gmail.com",
    password: string = "Bn57!aF790"
  ) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitSignInButton.click();
  }
}
