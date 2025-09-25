import { Before, After, AfterStep, ITestStepHookParameter } from "@cucumber/cucumber";
import { chromium, firefox, webkit } from "playwright";
import CustomWorld from "./world";
import { setDefaultTimeout } from "@cucumber/cucumber";

let browserType: any;

setDefaultTimeout(60 * 1000);
Before(async function () {
  const headless = process.env.HEADLESS !== "false"; // default true
  const browserName = process.env.BROWSER || "chromium";

  switch (browserName) {
    case "firefox":
      browserType = firefox;
      break;
    case "webkit":
      browserType = webkit;
      break;
    default:
      browserType = chromium;
  }

  this.browser = await browserType.launch({ headless });
  this.context = await this.browser.newContext();
  this.page = await this.context.newPage();
});

AfterStep(async function (this: CustomWorld, step: ITestStepHookParameter) {
  if (!this.page) return;

  const stepText = step.pickleStep.text;
  const stepStatus = step.result?.status;
  const stepDuration = step.result?.duration?.seconds
    ? `${step.result.duration.seconds}s`
    : "N/A";

  console.log(`➡️ Step: ${stepText} [${stepStatus}]`);

  // 📸 Capture screenshot after every step
  const screenshot = await this.page.screenshot();

  // 📝 Attach screenshot + metadata
  this.attach(
    JSON.stringify(
      {
        step: stepText,
        status: stepStatus,
        duration: stepDuration,
      },
      null,
      2
    ),
    "application/json"
  );
  this.attach(screenshot, "image/png");
});

After(async function (this: CustomWorld, scenario) {
  console.log(
    `✅ Finished scenario: ${scenario.pickle.name} with status: ${scenario.result?.status}`
  );

  if (scenario.result?.status === "FAILED" && this.page) {
    // Extra context on failure
    const html = await this.page.content();
    this.attach(html, "text/html");

    const logs = await this.page.evaluate(() =>
      JSON.stringify(console, Object.getOwnPropertyNames(console))
    );
    this.attach(logs, "application/json");
  }

  await this.closeBrowser();
});
