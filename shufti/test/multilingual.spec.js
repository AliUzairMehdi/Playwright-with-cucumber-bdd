import { test } from '@playwright/test';
import * as authPageTasks from '../main/authPage/authPage.tasks.js';
import * as reportPageActions from '../main/reportPage/reportsPage.actions.js';
import * as dashboardPageActions from '../main/dashboardPage/dashboardPage.action.js';
import * as dashboardPageTasks from '../main/dashboardPage/dashboardPage.tasks.js';
import * as reportPageTasks from '../main/reportPage/reportsPage.tasks.js';

test.describe.configure({ mode: 'parallel' });

// test.describe.serial('Dashboard Page Tests', () => {
//   let page;

//   test.beforeAll(async ({ browser }) => {
//     const context = await browser.newContext();
//     page = await context.newPage();
//   });

//   test.afterAll(async () => {
//     await page.close();
//   });

//   test('User navigates to the dashboard page', async ({}, testInfo) => {
//     await dashboardPageActions.userNavigatesToDashboardPage(page,testInfo);
//   });

//   test('User verifies dashboard texts', async ({}, testInfo) => {
//     await dashboardPageTasks.userVerifiesDashboardPageText(page,testInfo);
//   });

// });

// test.describe.serial('Customers Page Tests', () => {
//   let page;

//   test.beforeAll(async ({ browser }) => {
//     const context = await browser.newContext();
//     page = await context.newPage();
//   });

//   test.afterAll(async () => {
//     await page.close();
//   });

//   test('User visits products page', async ({}, testInfo) => {
//     await page.goto("/dashboard")
//   });

//   test('User checks dashboard header', async ({}, testInfo) => {
//     await page.waitForSelector('');
//   });

// });

test.describe.serial('Reports Page Tests', () => {
  let page;
  
  test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    page = await context.newPage();
  });
  
  test.afterAll(async () => {
    await page.close();
  });

  test('User Navigates to Report Page', async ({}, testInfo) => {
    await page.goto("/reports")
    await reportPageActions.userNavigatesToReportPage(page);
  });

  test('User Verifies Report Page Text', async ({}, testInfo) => {
    await reportPageTasks.userVerifiesReportPageText(page,testInfo);
  });

});

// test.describe.serial('Manual Review Page Tests', () => {
//   let page;
  
//   test.beforeAll(async ({ browser }) => {
//     const context = await browser.newContext();
//     page = await context.newPage();
//   });
  
//   test.afterAll(async () => {
//     await page.close();
//   });

//   test('User Navigates to Report Page', async ({}, testInfo) => {
//     await page.goto("/reports")
//     await reportPageActions.userNavigatesToReportPage(page);
//   });

//   test('User reloads the page', async ({}, testInfo) => {
//     await page.reload();
//   });

// });

// test.describe.serial('Product Page Tests', () => {
//   let page;

//   test.beforeAll(async ({ browser }) => {
//     const context = await browser.newContext();
//     page = await context.newPage();
//   });

//   test.afterAll(async () => {
//     await page.close();
//   });

//   test('User visits products page', async ({}, testInfo) => {
//     await page.goto("/products")
//   });

//   test('User checks dashboard header', async ({}, testInfo) => {
//     await page.waitForSelector('');
//   });

// });

// test.describe.serial('Billing Page Tests', () => {
//   let page;

//   test.beforeAll(async ({ browser }) => {
//     const context = await browser.newContext();
//     page = await context.newPage();
//   });

//   test.afterAll(async () => {
//     await page.close();
//   });

//   test('User visits products page', async ({}, testInfo) => {
//     await page.goto("/products")
//   });

//   test('User checks dashboard header', async ({}, testInfo) => {
//     await page.waitForSelector('');
//   });

// });

// test.describe.serial('Integrations Page Tests', () => {
//   let page;

//   test.beforeAll(async ({ browser }) => {
//     const context = await browser.newContext();
//     page = await context.newPage();
//   });

//   test.afterAll(async () => {
//     await page.close();
//   });

//   test('User visits products page', async ({}, testInfo) => {
//     await page.goto("/products")
//   });

//   test('User checks dashboard header', async ({}, testInfo) => {
//     await page.waitForSelector('');
//   });

// });

// test.describe.serial('Vendor Comparisons Page Tests', () => {
//   let page;

//   test.beforeAll(async ({ browser }) => {
//     const context = await browser.newContext();
//     page = await context.newPage();
//   });

//   test.afterAll(async () => {
//     await page.close();
//   });

//   test('User visits products page', async ({}, testInfo) => {
//     await page.goto("/products")
//   });

//   test('User checks dashboard header', async ({}, testInfo) => {
//     await page.waitForSelector('');
//   });

// });

// test.describe.serial('Analytics Page Tests', () => {
//   let page;

//   test.beforeAll(async ({ browser }) => {
//     const context = await browser.newContext();
//     page = await context.newPage();
//   });

//   test.afterAll(async () => {
//     await page.close();
//   });

//   test('User visits products page', async ({}, testInfo) => {
//     await page.goto("/products")
//   });

//   test('User checks dashboard header', async ({}, testInfo) => {
//     await page.waitForSelector('');
//   });

// });

// test.describe.serial('Billing Page Tests', () => {
//   let page;

//   test.beforeAll(async ({ browser }) => {
//     const context = await browser.newContext();
//     page = await context.newPage();
//   });

//   test.afterAll(async () => {
//     await page.close();
//   });

//   test('User visits products page', async ({}, testInfo) => {
//     await page.goto("/products")
//   });

//   test('User checks dashboard header', async ({}, testInfo) => {
//     await page.waitForSelector('');
//   });

// });

// test.describe.serial('Support Page Tests', () => {
//   let page;

//   test.beforeAll(async ({ browser }) => {
//     const context = await browser.newContext();
//     page = await context.newPage();
//   });

//   test.afterAll(async () => {
//     await page.close();
//   });

//   test('User visits products page', async ({}, testInfo) => {
//     await page.goto("/products")
//   });

//   test('User checks dashboard header', async ({}, testInfo) => {
//     await page.waitForSelector('');
//   });

// });

// test.describe.serial('Settings Page Tests', () => {
//   let page;

//   test.beforeAll(async ({ browser }) => {
//     const context = await browser.newContext();
//     page = await context.newPage();
//   });

//   test.afterAll(async () => {
//     await page.close();
//   });

//   test('User visits products page', async ({}, testInfo) => {
//     await page.goto("/products")
//   });

//   test('User checks dashboard header', async ({}, testInfo) => {
//     await page.waitForSelector('');
//   });

// });