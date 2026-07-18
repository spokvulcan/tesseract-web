const puppeteer = require("puppeteer-core");

(async () => {
  const browser = await puppeteer.launch({
    executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  });
  const page = await browser.newPage();

  // header mark, dark + light
  for (const theme of ["dark", "light"]) {
    await page.setViewport({ width: 1440, height: 400, deviceScaleFactor: 2 });
    await page.goto("http://localhost:3100/", { waitUntil: "networkidle0" });
    await page.evaluate((t) => {
      localStorage.setItem("theme", t);
      document.documentElement.classList.toggle("dark", t === "dark");
    }, theme);
    await page.reload({ waitUntil: "networkidle0" });
    await new Promise((r) => setTimeout(r, 600));
    const header = await page.$("header");
    await header.screenshot({ path: `.shots/logo-header-${theme}.png` });
  }

  // the favicon file itself, blown up and at tab size
  await page.setViewport({ width: 400, height: 400, deviceScaleFactor: 2 });
  await page.goto("http://localhost:3100/icon.svg", { waitUntil: "networkidle0" });
  await page.screenshot({ path: ".shots/logo-favicon-large.png" });
  await page.setViewport({ width: 64, height: 64, deviceScaleFactor: 1 });
  await page.goto("http://localhost:3100/icon.svg", { waitUntil: "networkidle0" });
  await page.screenshot({ path: ".shots/logo-favicon-small.png" });

  await browser.close();
})();
