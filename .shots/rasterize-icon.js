// Rasterizes app/icon.svg into public/icon-64x64.png (favicon fallback
// for browsers without SVG favicon support). Run with next start on :3100.
const puppeteer = require("puppeteer-core");

(async () => {
  const browser = await puppeteer.launch({
    executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  });
  const page = await browser.newPage();
  await page.emulateMediaFeatures([
    { name: "prefers-color-scheme", value: "light" },
  ]);
  await page.setViewport({ width: 64, height: 64, deviceScaleFactor: 1 });
  await page.goto("http://localhost:3100/icon.svg", { waitUntil: "networkidle0" });
  await page.screenshot({ path: "public/icon-64x64.png", omitBackground: true });
  await browser.close();
})();
