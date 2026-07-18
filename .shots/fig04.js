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
    // scroll through everything first so whileInView animations trigger
    await page.evaluate(async () => {
      const h = document.body.scrollHeight;
      for (let y = 0; y <= h; y += 450) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 100));
      }
    });
    await new Promise((r) => setTimeout(r, 1500));
    // center fig. 04 in the viewport
    await page.evaluate(() => {
      document
        .querySelector('[aria-label^="A belief card"]')
        .scrollIntoView({ block: "center" });
    });
    await new Promise((r) => setTimeout(r, 2000));
    await page.screenshot({ path: `.shots/fig04-${theme}.png` });
    await page.close();
  }

  await browser.close();
})();
