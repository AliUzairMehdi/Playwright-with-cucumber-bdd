import { chromium } from '@playwright/test';
import { userLogsIntoShuftiBackOffice } from '../main/authPage/authPage.tasks'; 
import fs from 'fs';
import path from 'path';

async function globalSetup(config) {
  const storageFile = path.resolve(__dirname, '../storage.json');
  if (fs.existsSync(storageFile)) {
    console.log('Using existing storage.json');
    return;
  }
  console.log('🔑 No storage found. Logging in...');
  const browser = await chromium.launch({headless: false});
  const page = await browser.newPage();
  await userLogsIntoShuftiBackOffice(page, { attach: async () => {} });
  await page.context().storageState({ path: storageFile });
  await browser.close();
  console.log('Storage saved to storage.json');
}

export default globalSetup;
