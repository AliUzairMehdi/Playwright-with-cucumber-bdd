import * as authPageActions from "./authPage.actions.js";
import * as authPageAssertions from "./authPage.assertions.js";

export async function userLogsIntoShuftiBackOffice(page,testInfo) {
    await authPageActions.userNavigatesToLoginPage(page,testInfo);
    await authPageActions.userFillsLoginForm(page);
    await authPageActions.userSubmitsLoginForm(page);
    await authPageAssertions.verifyUserIsLoggedIn(page,testInfo);
}