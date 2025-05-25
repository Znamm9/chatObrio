import { Page } from "@playwright/test";

export class BasePage {
  protected page: Page
  
  constructor(page) {
    this.page = page;
  }
}