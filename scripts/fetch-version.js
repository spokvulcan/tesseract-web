const https = require("https");

const GITHUB_API = "https://api.github.com/repos/spokvulcan/tesseract/releases/latest";

function fetchJSON(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, { headers: { "User-Agent": "node.js" } }, (res) => {
        if (res.statusCode === 301 || res.statusCode === 302) {
          return fetchJSON(res.headers.location).then(resolve, reject);
        }
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => {
          try {
            resolve(JSON.parse(data));
          } catch (err) {
            reject(err);
          }
        });
      })
      .on("error", reject);
  });
}

async function main() {
  try {
    const release = await fetchJSON(GITHUB_API);
    const version = release.tag_name.replace(/^v/, "");
    const fs = require("fs");
    const path = require("path");
    const outputPath = path.join(process.cwd(), "public", "version.json");
    fs.writeFileSync(outputPath, JSON.stringify({ version }, null, 2));
    console.log(`✓ Version fetched: ${version}`);
  } catch (err) {
    console.error("Failed to fetch version:", err.message);
    process.exit(1);
  }
}

main();
