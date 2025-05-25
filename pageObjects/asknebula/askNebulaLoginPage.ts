import { Locator, Page } from "@playwright/test";
import { BasePage } from "../basePage.ts";

export class AskNebulaLoginPage extends BasePage {

  readonly signUpLink: Locator;

  constructor(page: Page) {
    super(page);
    this.signUpLink = page.locator("//a[@data-sentry-element='NavLink'][text() = 'Sign up']");
  }

  async navigate() {
    await this.page.goto(`${process.env.ASKNEBULA_URL}/app/login`);
  }
}
