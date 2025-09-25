import { IWorldOptions, setWorldConstructor, World } from "@cucumber/cucumber";
import { Browser, BrowserContext, Page, chromium, firefox, webkit } from "playwright";

export default class CustomWorld extends World {
  browser!: Browser;
  context!: BrowserContext;
  page!: Page;
  logs: string[] = [];

  constructor(options: IWorldOptions) {
    super(options);
  }

  async launchBrowser() {
    const browserName = process.env.BROWSER || "chromium";
    const headless = process.env.HEADED === "true" ? false : true;

    switch (browserName) {
      case "firefox":
        this.browser = await firefox.launch({ headless });
        break;
      case "webkit":
        this.browser = await webkit.launch({ headless });
        break;
      default:
        this.browser = await chromium.launch({ headless });
    }

    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();

    // 🔹 Capture browser console logs
    this.page.on("console", (msg) => {
      const logMessage = `[Browser Console] ${msg.type().toUpperCase()}: ${msg.text()}`;
      this.logs.push(logMessage);
      console.log(logMessage);
    });

    // 🔹 Capture page errors
    this.page.on("pageerror", (err) => {
      const logMessage = `[Page Error] ${err.message}`;
      this.logs.push(logMessage);
      console.error(logMessage);
    });

    // 🔹 Capture failed requests
    this.page.on("requestfailed", (req) => {
      const logMessage = `[Request Failed] ${req.url()} - ${req.failure()?.errorText}`;
      this.logs.push(logMessage);
      console.error(logMessage);
    });
  }

  async closeBrowser() {
    if (this.browser) {
      await this.browser.close();
    }
  }
}

setWorldConstructor(CustomWorld);
