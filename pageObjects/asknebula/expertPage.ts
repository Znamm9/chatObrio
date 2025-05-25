import { Locator, Page } from "@playwright/test";
import { BasePage } from "../basePage";

export class ExpertPage extends BasePage {

  readonly resentVerificationBtn: Locator;
  readonly verificationSuccessDoneBtn: Locator;
  readonly startChatWithExpert: Locator;

  constructor(page: Page) {
    super(page);
    this.resentVerificationBtn = this.page.locator("//div[@data-sentry-component='EmailResend']//button//span[text()='Resend']");
    this.verificationSuccessDoneBtn = this.page.locator("//div[@data-sentry-component='EmailResendSucceed']//button//span[text()='Done']");
    this.startChatWithExpert = page.locator("//span[text() = 'Start chat']");
  }

  async navigate(id: string = "9bbab846-377a-447c-bfa9-30846dec07ea") {
    await this.page.goto(`https://stage-asknebula.asknebula.com/app/expert/${id}`);
  }

  async passVerification() { 
    await this.resentVerificationBtn.click();
    await this.verificationSuccessDoneBtn.click();
  }
}