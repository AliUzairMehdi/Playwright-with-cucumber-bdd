import { authPageLocators } from "./authPage.locators";
import * as authPageAssertions from "./authPage.assertions.js";
import waits from "../../utils/waits.json";

export async function userNavigatesToLoginPage(page,testInfo) {
    await page.goto('https://backoffice.shuftipro.com/login');
    await authPageAssertions.verifyLoginPageIsDisplayed(page,testInfo);
}

export async function userFillsLoginForm(page){
    await page.fill(authPageLocators.loginPagelocators.emailInput,"samiur.rahman@shufti.com")
    await page.fill(authPageLocators.loginPagelocators.passwordInput,"Sami@programmersforce123")
}

export async function userSubmitsLoginForm(page){
    await page.click(authPageLocators.loginPagelocators.loginButton);
    await page.waitForTimeout(60000);
}