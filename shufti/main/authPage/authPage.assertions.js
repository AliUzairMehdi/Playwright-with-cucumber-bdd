import { authPageLocators } from "./authPage.locators.js";
import * as browserAssertions from "../../utils/browserAssertions.js";

export async function verifyLoginPageIsDisplayed(page,testInfo) {
    const authPageLoginForm=await page.locator(authPageLocators.loginPagelocators.loginForm);
    const isLoginFormVisible=await authPageLoginForm.isVisible();
    await browserAssertions.verifyElementIsDisplayed("Login Form Display Assertion",isLoginFormVisible,"Login Form did not appear",testInfo,page);  
}

export async function verifyUserIsLoggedIn(page,testInfo) {
    const dashboardPageTitleElement=await page.locator(authPageLocators.loginPagelocators.dashboardPageTitle);
    const isdashboardPageTitleVisible=await dashboardPageTitleElement.isVisible();
    await browserAssertions.verifyElementIsDisplayed("Dashboard Page Title Display Assertion",isdashboardPageTitleVisible,"Dashboard Page Title did not appear",testInfo,page,true);
}