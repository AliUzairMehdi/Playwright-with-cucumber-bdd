import waits from './waits.json'

const minutes = waits.maxTimeout / 60000;


export async function getElement(page, selector) {
    if (selector.startsWith('//') || selector.startsWith('(')) {
        return await page.locator(`xpath=${selector}`);
    } else {
        return await page.locator(selector);
    }
}

// ---------- Text Input ----------
export async function clearText(page, selector) {
  const element = await getElement(page,selector);;
  await element.click({ clickCount: 3 });
  await element.press('Backspace');
}

export async function enterText(page, selector, value) {
  const element = await getElement(page,selector);;
  await element.fill('');
  await element.type(value);
}

// ---------- Wait ----------
export async function waitUntilRemoved(page, selector) {
  const element = await getElement(page,selector);;
  await element.waitFor({ state: 'detached', timeout: waits.maxTimeout });
}

// ---------- Click ----------
export async function clickElement(page, selector, elementName) {
  const element = await getElement(page,selector);;
  await element.waitFor({
    state: 'visible',
    timeout: waits.maxTimeout,
  });
  await element.scrollIntoViewIfNeeded();
  await page.waitForTimeout(waits.littleWait);
  await element.click();
}

export async function forceClick(page, selector, elementName) {
  const element = await getElement(page,selector);;
  await element.waitFor({ state: 'visible', timeout: waits.maxTimeout });
  await element.click({ force: true });
}

export async function clickElementByIndex(page, selector, index) {
  const element = await getElement(page,selector).nth(index - 1);
  await element.click({ force: true });
}

// ---------- Hover ----------
export async function hoverElement(page, selector, elementName) {
  const element = await getElement(page,selector);;
  await element.waitFor({ state: 'visible', timeout: waits.maxTimeout });
  await element.scrollIntoViewIfNeeded();
  await element.hover();
}

export async function hoverElementByIndex(page, selector, index) {
  const element = await getElement(page,selector).nth(index - 1);
  await element.scrollIntoViewIfNeeded();
  await element.hover();
}

// ---------- Text & HTML ----------
export async function getAllTexts(page, selector) {
  return await getElement(page,selector).allTextContents();
}

export async function getText(page, selector) {
  return (await getElement(page,selector).textContent()) ?? '';
}

export async function getHTML(page, selector) {
  return await getElement(page,selector).innerHTML();
}

export async function getAllHTML(page, selector) {
  const elements = await getElement(page,selector).all();
  return Promise.all(elements.map(el => el.innerHTML()));
}

// ---------- Attributes ----------
export async function getAttribute(page, selector, attribute) {
  return await getElement(page,selector).getAttribute(attribute);
}

export async function getAllAttributes(page, selector, attribute) {
  const elements = await getElement(page,selector).all();
  return Promise.all(elements.map(el => el.getAttribute(attribute)));
}

export async function getAttributeByIndex(page, selector, index, attribute) {
  return await getElement(page,selector).nth(index - 1).getAttribute(attribute);
}

// ---------- Scrolling ----------
export async function scrollToElement(page, selector) {
  const element = await getElement(page,selector);;
  await element.scrollIntoViewIfNeeded();
}

export async function scrollToElementByIndex(page, selector, index) {
  const element = await getElement(page,selector).nth(index - 1);
  await element.scrollIntoViewIfNeeded();
}

// ---------- Tabs ----------
export async function switchToNextTab(page) {
  const context = page.context();
  const allPages = context.pages();
  return allPages.at(-1);
}

export async function openNewTab(page) {
  const context = page.context();
  return await context.newPage();
}

export async function closeCurrentTab(page) {
  const context = page.context();
  const allPages = context.pages();
  const currentIndex = allPages.indexOf(page);
  await page.close();
  return allPages[currentIndex - 1];
}

// ---------- Specific ----------
export async function getSpecificElementHTML(page, selector, index) {
  const elements = await getElement(page,selector);
  if (index !== undefined) {
    return await elements.nth(index).innerHTML();
  }
  const allElements = await elements.all();
  return Promise.all(allElements.map(el => el.innerHTML()));
}

