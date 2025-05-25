import { Location, Locator, Page } from "@playwright/test";
import { BasePage } from "../basePage";

export class ClientChatPage extends BasePage {

  readonly chatInput: Locator;
  readonly connectingPopup: Locator;
  readonly introOfferPopup: Locator;
  readonly creditsAmount: Locator;
  readonly creditsPrice: Locator;
  readonly continueBtn: Locator;
  readonly successfulConnectionMessage: Locator;
  readonly chatMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.chatInput = page.locator("//textarea[@data-testid='chat-message-textarea']");
    this.connectingPopup = page.locator("//*[contains(text(), 'Connecting you')]");
    this.introOfferPopup = page.locator("//h3[text()='Refill credits for the reading']");
    this.creditsAmount = page.locator("//*[@data-testid='credits-amount']");
    this.creditsPrice = page.locator("//*[@data-testid='refill-credits-price']");
    this.continueBtn = page.locator("//*[@data-testid='top-up-refill-credits-btn']");
    this.successfulConnectionMessage = page.locator("//h3[text()='Successful connection']");
    this.chatMessage = page.locator("[data-testid='chat-message-text']");
  }

  async sendMessage(message: string) {
    await this.chatInput.fill(message);
    await this.page.keyboard.press("Enter");
  }
}