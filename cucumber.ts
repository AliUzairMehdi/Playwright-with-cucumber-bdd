import {
  loadConfiguration,
  loadSupport,
  runCucumber,
} from "@cucumber/cucumber/api";
import path from "path";
import reporter from "cucumber-html-reporter";
import fs from "fs";

async function run() {
  const args = process.argv.slice(2);

  const flows: string[] = [];
  let headed = false;
  let browser: string = "chromium"; // default

  // 🔹 Parse CLI args
  for (const arg of args) {
    const lower = arg.toLowerCase();
    if (lower === "headed") {
      headed = true;
    } else if (["chrome", "chromium", "firefox", "webkit"].includes(lower)) {
      browser = lower === "chrome" ? "chromium" : lower;
    } else {
      flows.push(arg); // treat as feature file name
    }
  }

  // 🔹 Set env variables for hooks/world
  process.env.HEADLESS = headed ? "false" : "true";
  process.env.BROWSER = browser;

  // 🔹 Clean and recreate report directory
  const reportDir = path.join(process.cwd(), "report");
  if (fs.existsSync(reportDir)) {
    fs.rmSync(reportDir, { recursive: true, force: true });
  }
  fs.mkdirSync(reportDir, { recursive: true });

  const execute = async (featurePath: string, featureName: string) => {
    console.log(`\n🚀 Running in ${browser} (${headed ? "headed" : "headless"}) on: ${featurePath}`);

    const jsonFile = path.join(reportDir, `cucumber_report_${featureName}.json`);
    const htmlFile = path.join(reportDir, `cucumber_report_${featureName}.html`);

    // ✅ Dynamically resolve step file for this feature
    const stepFile = path.join("test", "UI", "stepDefinitions", `${featureName}.steps.ts`);

    const { runConfiguration } = await loadConfiguration({
      provided: {
        paths: [featurePath],
        require: [stepFile, "config/**/*.ts"],
        format: [
          "progress",
          `"json":"${jsonFile}"`,
        ],
        timeout: 60000,
      } as any,
    });

    const support = await loadSupport(runConfiguration);

    await runCucumber({
      sources: runConfiguration.sources,
      support,
      runtime: runConfiguration.runtime,
      formats: runConfiguration.formats,
    });

    // ✅ Generate HTML report
    reporter.generate({
      theme: "bootstrap",
      jsonFile,
      output: htmlFile,
      reportSuiteAsScenarios: true,
      launchReport: false,
      metadata: {
        "App Version": "1.0.0",
        "Test Environment": "STAGING",
        Browser: browser,
        Headless: headed ? "false" : "true",
        Platform: process.platform,
      },
    });
  };

  if (flows.length === 0) {
    // Run all features
    const featuresDir = path.join("test", "UI", "features");
    const featureFiles = fs.readdirSync(featuresDir).filter(f => f.endsWith(".feature"));

    for (const feature of featureFiles) {
      const featurePath = path.join(featuresDir, feature);
      const featureName = path.basename(feature, ".feature");
      await execute(featurePath, featureName);
    }
  } else {
    // Run only specified features
    for (const flow of flows) {
      const featurePath = path.join("test", "UI", "features", `${flow}.feature`);
      await execute(featurePath, flow);
    }
  }
}

run();
