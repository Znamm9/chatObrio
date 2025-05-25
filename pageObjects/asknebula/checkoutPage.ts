import { Locator, Page } from "@playwright/test";
import { BasePage } from "../basePage";

export class CheckoutPage extends BasePage {

  readonly paymentFormCreditCard: Locator;
  readonly paymentFormIframe: Locator;
  readonly buyButton: Locator;
  readonly paymentSuccessfullMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.paymentFormCreditCard = page.locator("[data-testid='payment-form-credit-card-option']");
    this.paymentFormIframe = page.locator("//iframe[@id='solid-payment-form-iframe']"); // Adjust the selector based on the actual iframe name or ID
    this.paymentSuccessfullMessage = page.locator("//*[contains(text(), 'Payment successful')]");
  }

  async fillCardDetailsAndBuy() {
    // Assuming the iframe contains input fields for card details
    const frame = await this.paymentFormIframe.contentFrame();
    if (frame) {
      await frame.locator("#ccnumber").fill("4067429974719265"); // Example card number
      await frame.locator("#cardExpiry").fill("12/34"); // Example expiry date
      await frame.locator("#cvv2").fill("123"); // Example CVC
      await frame.locator("#nameoncard").fill("Name Surname"); // Example cardholder name
      await frame.locator("[data-testid='submit-button']").click(); // Example postal code
    } else {
      throw new Error("Payment form iframe not found");
    }

  }
}