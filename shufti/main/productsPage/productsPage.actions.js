
export async function userNavigatesToProductsPage(page,testInfo){
    await browserActions.clickElement(page, productsPageLocators.navigationBarProductsButton,"Navigation Bar Products Button");
    await productsPageAssertions.verifyUserIsOnProductsPage(page,testInfo);
}