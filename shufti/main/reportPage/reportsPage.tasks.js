import * as reportPageActions from './reportsPage.actions.js';
import * as commonActions from '../common/common.actions.js';
import { reportPageLocators } from './reportsPage.locators.js';

export async function userVerifiesReportPageText(page,testInfo){
    let array=await commonActions.processSelectors(page,reportPageLocators.textElements);
    console.log(array);
}

export async function userVerifiesReportDetailsPageText(page,testInfo){

}