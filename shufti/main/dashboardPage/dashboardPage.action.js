import * as browserActions from "../../utils/browserActions.js"
import * as browserAssertions from "../../utils/browserAssertions.js"
import { dashboardPageLocators } from "./dashboardPage.locators.js";
import * as dashboardPageAssertions from "./dashboardPage.assertions.js"

export async function userNavigatesToDashboardPage(page){
    await browserActions.clickElement(page, dashboardPageLocators.navigationBarDashboardButton,"Dashboard Navigation Button");
    await dashboardPageAssertions.verifyUserIsOnDashboardPage(page);
}