import { BasePage } from "../basePage";
import { Locator, Page } from "@playwright/test";

export class NebulaxHomePage extends BasePage {

  readonly noLongerAvailableText: Locator;
  readonly startWorkBtn: Locator;
  readonly submitStartWork: Locator;

  constructor(page: Page) {
    super(page);
    this.noLongerAvailableText = page.locator("//p[text()='The AstroCRM  is no longer available']");
    this.startWorkBtn = page.locator("//button//*[@data-testid='PlayArrowIcon']");
    this.submitStartWork = page.locator("//button[text()='Yes']");
  }

  async navigate() {
    await this.page.goto(`${process.env.ASTROCRM_URL}/redirect-to-nebulax`);
  }

  async startWork() {
    if (await this.startWorkBtn.isVisible()) {
      await this.startWorkBtn.click();
      await this.submitStartWork.click();
    }
  }
}