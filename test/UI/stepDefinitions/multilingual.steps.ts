import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { Page } from "playwright"; // Or however you're managing Page in your World
import * as fs from "fs";
import path from "path";

let page: Page;

Given('the user is on the homepage', async function () {
  page = this.page; // comes from World.ts
  await page.goto("https://www.edgardcooper.com/en/");
  
  console.log("Hey theereee im here");
  console.log(await extractAndSaveText(page))
});

When('the user selects {string} from the language dropdown', async function (language: string) {
  await page.click(`//button[contains(@data-testid,"countryLanguageSelector")]`);
  await page.click(`//*[@id="label-language-selector"]/following-sibling::*[1]`);
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("Enter");
  await page.waitForLoadState("domcontentloaded")
  await page.waitForTimeout(5000)
  await page.click(`//*[@id="headlessui-dialog-:r17:"]/div/div[2]/div/div/button`);
});

Then('the website content should be displayed in {string}', async function (language: string) {
    console.log(await extractAndSaveText(page))
    await page.goto("https://www.edgardcooper.com/");
    await page.goto("https://www.edgardcooper.com/");
    await page.goto("https://www.edgardcooper.com/");
    await page.goto("https://www.edgardcooper.com/");
});

Given('the user has selected {string}', async function (language: string) {
  await page.click("#language-dropdown");

});

async function getAllTextFromDOM(page:Page): Promise<string> {
  return await page.evaluate(() => {
    return document.body.innerText;
  });
}

async function extractAndSaveText(page: Page,fileName='all_text.txt') {
  // Extract all visible text from DOM
  const allText = await page.evaluate(() => document.body.innerText);
  return allText
}