import { Locator, Page } from "@playwright/test";
import { BasePage } from "../basePage";

export class AskNebulaSignUpPage extends BasePage {
  readonly sexRadioBtn: Locator;
  readonly nameInput: Locator;
  readonly continueBtn: Locator;
  readonly continueBirthDate: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly confirmPasswordInput: Locator;
  readonly submitSignUpButton: Locator;
  readonly policyCheckbox: Locator;
  readonly closeVerificationPopup: Locator;

  constructor(page: Page) {
    super(page);
    this.sexRadioBtn = page.locator("//input[@value='male']");
    this.nameInput = page.locator("//*[@data-testid='name-field']");
    this.continueBtn = page.locator("//span[text() = 'Continue']");
    this.continueBirthDate = page.locator("//*[@data-testid='submit-button']");
    this.emailInput = this.page.locator("//*[@data-testid='email-field']");
    this.passwordInput = this.page.locator(
      "//*[@data-testid='password-field']"
    );
    this.confirmPasswordInput = this.page.locator(
      "//*[@data-testid='confirm-password-field']"
    );
    this.policyCheckbox = page.locator("//*[@data-testid='policy-checkbox']");
    this.submitSignUpButton = page.locator("//*[@data-testid='close-button']");
    this.closeVerificationPopup = page.locator("//button[@aria-label='Close']");
    
  }

  async navigate() {
    await this.page.goto(`${process.env.ASKNEBULA_URL}/app/signup`);
  }

  async waitForUserCreated() {
    // todo here would need to verify that user is created using API or BD access
    // For now, we will just wait for 10 seconds
    await this.page.waitForTimeout(10000);
  }

  async signUpUser(
    email: string = `testVadym+${Date.now()}@gmail.com`,
    password: string = "Test123456"
  ) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.confirmPasswordInput.fill(password);
    if (!(await this.policyCheckbox.isChecked())) {
      await this.policyCheckbox.check();
    }
    await this.continueBirthDate.click();
  }
}
