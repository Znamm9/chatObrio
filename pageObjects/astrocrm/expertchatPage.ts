import { Locator, Page } from "@playwright/test";
import { BasePage } from "../basePage";

export class ExpertChatPage extends BasePage {
  
  readonly acceptChatBtn: Locator;
  
  constructor(page: Page) {
    super(page);
    this.acceptChatBtn = page.locator("//button[text()='Accept']");

  }

}