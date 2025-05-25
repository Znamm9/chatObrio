import { test, expect } from "@playwright/test";
import { AstrocrmLoginPage } from "../pageObjects/astrocrm/astrocrmLoginPage.ts";
import { NebulaxHomePage } from "../pageObjects/astrocrm/nebulaxHomePage.ts";
import { AskNebulaLoginPage } from "../pageObjects/asknebula/askNebulaLoginPage.ts";
import { AskNebulaSignUpPage } from "../pageObjects/asknebula/askNebulaSignUpPage.ts";
import { ExpertPage } from "../pageObjects/asknebula/expertPage.ts";
import { ClientChatPage } from "../pageObjects/asknebula/clientChatPage.ts";
import { CheckoutPage } from "../pageObjects/asknebula/checkoutPage.ts";
import { ExpertChatPage } from "../pageObjects/astrocrm/ExpertchatPage.ts";

test("check user can chat with expert", async ({ browser }) => {
  test.setTimeout(120 * 1000); // Set timeout to 120 seconds
  // login as assistant
  const contextAssistant = await browser.newContext();
  const pageAssistant = await contextAssistant.newPage();
  const loginPage = new AstrocrmLoginPage(pageAssistant);
  const nebulaxHomePage = new NebulaxHomePage(pageAssistant);

  await loginPage.navigate();
  await loginPage.login(
    process.env.ASTROCRM_LOGIN,
    process.env.ASTROCRM_PASSWORD
  );
  await nebulaxHomePage.noLongerAvailableText.waitFor({ state: "visible" });
  await nebulaxHomePage.startWork();

  const contextClient = await browser.newContext();
  const pageClient = await contextClient.newPage();
  const askNebulaLoginPage = new AskNebulaLoginPage(pageClient);
  await askNebulaLoginPage.navigate();
  await askNebulaLoginPage.signUpLink.click();
  const askNebulaSignUppage = new AskNebulaSignUpPage(pageClient);
  await askNebulaSignUppage.sexRadioBtn.click();
  await askNebulaSignUppage.nameInput.fill("TestVadym");
  await askNebulaSignUppage.continueBtn.click();
  await askNebulaSignUppage.continueBtn.click();
  await askNebulaSignUppage.signUpUser();
  await askNebulaSignUppage.waitForUserCreated();
  const expertPage = new ExpertPage(pageClient);
  await expertPage.navigate();
  await expertPage.passVerification();
  await expertPage.startChatWithExpert.click();

  const clientChatPage = new ClientChatPage(pageClient);
  // type a message in chat and press 
  await clientChatPage.sendMessage("Hello, this is a test message");
  // verify Connecting pop-up 
  await expect(clientChatPage.connectingPopup).toBeVisible();

  // verify Intro offer pop-up appears
  await expect(clientChatPage.introOfferPopup).toBeVisible();

  // verify 160 credits $2.99
  await expect(clientChatPage.creditsAmount).toHaveText("160 credits");
  await expect(clientChatPage.creditsPrice).toHaveText("$2.99");

  // Click on the Continue button on the Intro pop-up
  await clientChatPage.continueBtn.click();

  const checkoutPage = new CheckoutPage(pageClient);
  // Click on the CreditCard option
  await checkoutPage.paymentFormCreditCard.click();
  // Enter card details to the form & Click on the Buy button
  await checkoutPage.fillCardDetailsAndBuy();
  await expect(checkoutPage.paymentSuccessfullMessage).toBeVisible();

  const expertChatPage = new ExpertChatPage(pageAssistant);
  // Accept chat request by expert
  await expertChatPage.acceptChatBtn.click();

  // Chat is started (timer is on)
  await expect(clientChatPage.successfulConnectionMessage).toBeVisible();

  // User can send messages to the expert and vice versa
  await clientChatPage.sendMessage("test123");
  await expect(clientChatPage.chatMessage).toHaveText("test123");
});
