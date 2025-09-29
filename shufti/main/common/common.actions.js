import * as browserActions from '../../utils/browserActions.js';

export async function processSelectors(page, selectors) {
    const results = [];

    for (const key of Object.keys(selectors)) {
        const selector = selectors[key];
        const locator = await browserActions.getElement(page, selector);

        const count = await locator.count();

        for (let i = 0; i < count; i++) {
            const element = locator.nth(i);
            const text = await element.innerText().catch(() => null);
            if (text) results.push(text);
            const isVisible = await element.isVisible().catch(() => false);
            const isEnabled = await element.isEnabled().catch(() => false);

            if (isVisible && isEnabled) {
                try {
                    await element.click();
                } catch {
                    continue;
                }
            }
        }
    }

    return results;
}