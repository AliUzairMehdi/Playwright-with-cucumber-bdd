import waits from "../../utils/waits.json"
import { reportPageLocators } from "./reportsPage.locators"
import { commonLocators } from "../common/common.locators.js";
import * as browserActions from "../../utils/browserActions.js"

export async function userNavigatesToReportPage(page)
{
    await browserActions.clickElement(page, commonLocators.navigationBar.reportsButton,"Navigation Bar Reports Button");
}

export async function userNavigatesToReportDetailsPage(page)
{
    await browserActions.clickElement(page, reportPageLocators.viewDetailsButton,"View Report Details Button");
}

export async function userGetsReportPageTexts(page){
    
}