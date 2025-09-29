import assert from "soft-assert";
import assertion from "assert";

async function attachEvidence(testInfo, page, title, message) {
  await testInfo.attach(`${title} - log`, {
    body: String(message),
    contentType: "text/plain",
  });
  if (page && typeof page.screenshot === "function") {
    await testInfo.attach(`${title} - screenshot`, {
      body: await page.screenshot(),
      contentType: "image/png",
    });
  }
}


export async function verifyElementIsDisplayed(
  assertionTitle,
  status,
  errorMessage,
  testInfo,
  page,
  isLast = false
) {
  assert.softTrue(status, errorMessage);
  await attachEvidence(testInfo, page, assertionTitle, `${assertionTitle} : ${status} | true`);
  if (isLast) assert.softAssertAll();
}

export async function verifyElementIsNotDisplayed(
  assertionTitle,
  status,
  errorMessage,
  testInfo,
  page,
  isLast = false
) {
  assert.softTrue(!status, errorMessage);
  await attachEvidence(testInfo, page, assertionTitle, `${assertionTitle} : ${status} | false`);
  if (isLast) assert.softAssertAll();
}

export async function verifyElementIsExisting(
  assertionTitle,
  status,
  errorMessage,
  testInfo,
  page,
  isLast = false
) {
  assert.softTrue(status, errorMessage);
  await attachEvidence(testInfo, page, assertionTitle, `${assertionTitle} : ${status} | true`);
  if (isLast) assert.softAssertAll();
}

export async function verifyElementIsNotExisting(
  assertionTitle,
  status,
  errorMessage,
  testInfo,
  page,
  isLast = false
) {
  assert.softTrue(!status, errorMessage);
  await attachEvidence(testInfo, page, assertionTitle, `${assertionTitle} : ${status} | false`);
  if (isLast) assert.softAssertAll();
}

export async function verifyElementAttributeIsExisting(
  assertionTitle,
  elementHandle,
  errorMessage,
  testInfo,
  page,
  isLast = false
) {
  assert.softTrue(Boolean(elementHandle), errorMessage);
  await attachEvidence(testInfo, page, assertionTitle, `${assertionTitle} : ${Boolean(elementHandle)} | true`);
  if (isLast) assert.softAssertAll();
}

export async function verifyElementAttributeIsNotExisting(
  assertionTitle,
  elementHandle,
  errorMessage,
  testInfo,
  page,
  isLast = false
) {
  assert.softTrue(!Boolean(elementHandle), errorMessage);
  await attachEvidence(testInfo, page, assertionTitle, `${assertionTitle} : ${Boolean(elementHandle)} | false`);
  if (isLast) assert.softAssertAll();
}

export async function verifyElementIsClickable(
  assertionTitle,
  status,
  errorMessage,
  testInfo,
  page,
  isLast = false
) {
  assert.softTrue(status, errorMessage);
  await attachEvidence(testInfo, page, assertionTitle, `${assertionTitle} : ${status} | true`);
  if (isLast) assert.softAssertAll();
}

export async function verifyElementIsNotClickable(
  assertionTitle,
  status,
  errorMessage,
  testInfo,
  page,
  isLast = false
) {
  assert.softTrue(!status, errorMessage);
  await attachEvidence(testInfo, page, assertionTitle, `${assertionTitle} : ${status} | false`);
  if (isLast) assert.softAssertAll();
}

export async function verifyElementsMatch(
  assertionTitle,
  actualValue,
  expectedValue,
  errorMessage,
  testInfo,
  page,
  isLast = false
) {
  assert.softAssert(actualValue, expectedValue, errorMessage, []);
  await attachEvidence(testInfo, page, assertionTitle, `${assertionTitle} : ${actualValue} | ${expectedValue}`);
  if (isLast) assert.softAssertAll();
}

export async function verifyElementsDoNotMatch(
  assertionTitle,
  actualValue,
  expectedValue,
  testInfo,
  page,
  isLast = false
) {
  await attachEvidence(testInfo, page, assertionTitle, `${assertionTitle} : ${actualValue} | ${expectedValue}`);
  assertion.notEqual(actualValue, expectedValue);
  if (isLast) assert.softAssertAll();
}

export async function verifyIfSpecificElementIsPresent(
  assertionTitle,
  elementsList,
  expectedValue,
  errorMessage,
  testInfo,
  page,
  isLast = false
) {
  assert.softContains(elementsList, expectedValue, errorMessage, []);
  await attachEvidence(testInfo, page, assertionTitle, `${assertionTitle} : ${elementsList} | ${expectedValue}`);
  if (isLast) assert.softAssertAll();
}

export function verifyTestDataIsNotExisting(testData, isLast = false) {
  assertion.fail(`${testData} not present in the homepage`);
  if (isLast) assert.softAssertAll();
}