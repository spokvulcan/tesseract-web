const puppeteer = require("puppeteer-core");

(async () => {
  const browser = await puppeteer.launch({
    executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    headless: "new",
  });

  for (const theme of ["dark", "light"]) {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 1100 });
    await page.evaluateOnNewDocument((t) => localStorage.setItem("theme", t), theme);
    await page.goto("http://localhost:3100/", { waitUntil: "networkidle0" });
    // let the cube settle and the pills fade in
    await new Promise((r) => setTimeout(r, 2500));
    await page.screenshot({ path: `.shots/fig01-${theme}.png` });
    await page.close();
  }

  // mobile sanity check: the figure sits below the copy there
  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844 });
  await page.evaluateOnNewDocument((t) => localStorage.setItem("theme", t), "dark");
  await page.goto("http://localhost:3100/", { waitUntil: "networkidle0" });
  await new Promise((r) => setTimeout(r, 2500));
  await page.evaluate(() => document.querySelector("canvas").scrollIntoView({ block: "center" }));
  await new Promise((r) => setTimeout(r, 800));
  await page.screenshot({ path: ".shots/fig01-mobile-dark.png" });
  await page.close();

  await browser.close();
})();
