import { defineConfig } from "@playwright/test";
import waits from "./utils/waits.json";
import path from "path";


export default defineConfig({
  testDir: "./test",
   globalSetup: path.join(__dirname, 'config/globalSetup.js'),
  timeout: waits.maxTimeout,  // max time for each test
  retries: 0,
  reporter: [
    ["list"],                       // prints results in terminal
    ["html", { open: "never" }],    // HTML report (screenshots + logs go here)
  ],
  use: {
    headless: false,                // run headed if you want to see the browser
    screenshot: "only-on-failure",  // Playwright screenshots (your custom ones also attach)
    trace: "retain-on-failure",     // trace viewer on failures
    video: "retain-on-failure",
    baseURL: "https://backoffice.shuftipro.com", // optional default URL
    storageState:  path.join(__dirname, 'storage.json'),
  },
//   workers: 1,                       // forces one worker → one browser instance
  fullyParallel: true,             // do not shard spec files across workers
  reporterTimeout: 30000,
});