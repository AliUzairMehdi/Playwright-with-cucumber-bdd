import { defineConfig } from '@playwright/test';
import { devices } from '@playwright/test';

export default defineConfig({
    testDir: './test/UI/features',
    testMatch: /.*\.feature$/,
    outputDir: 'test-results',
    reporter: [['list'], ['html', { open: 'never' }]],
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
    ],
    use: {
        headless: false,
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        trace: 'on-first-retry',
    },
    // Note: Playwright config does not support a 'cucumber' property directly.
    // To use Cucumber, use @cucumber/cucumber with playwright-cucumber-steps or similar.
    // Run tests using the cucumber CLI, not `npx playwright test`.
});
