import * as browserAssertions from "../../utils/browserAssertions.js"
import { dashboardPageLocators } from "./dashboardPage.locators.js";
import * as browserActions from "../../utils/browserActions.js"
import waits from "../../utils/waits.json";

export async function verifyUserIsOnDashboardPage(page,testInfo){
    const totalVerificationsSectionElement=await browserActions.getElement(page,dashboardPageLocators.totalVerificationsSection);
    await totalVerificationsSectionElement.waitFor({state:'visible',timeout:waits.maxTimeout});
    const isTotalVerificationsSectionVisible=await totalVerificationsSectionElement.isVisible();
    await browserAssertions.verifyElementIsDisplayed("Dashboard Page Total Verifications Section Assertion",isTotalVerificationsSectionVisible,"Total Verifications section did not appear",testInfo,page,true);
}