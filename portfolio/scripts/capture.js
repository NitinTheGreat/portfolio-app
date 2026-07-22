const { chromium } = require("playwright")

const url = process.argv[2] || "http://localhost:3131/"
const out = process.argv[3] || "/tmp/shot.png"

;(async () => {
  const browser = await chromium.launch({
    args: [
      "--enable-webgl",
      "--use-gl=angle",
      "--use-angle=swiftshader",
      "--enable-unsafe-swiftshader",
      "--ignore-gpu-blocklist",
    ],
  })
  const page = await browser.newPage({ viewport: { width: 1400, height: 760 } })
  const logs = []
  page.on("console", (m) => logs.push(`[${m.type()}] ${m.text()}`))
  page.on("pageerror", (e) => logs.push(`[pageerror] ${e.message}`))
  page.on("requestfailed", (r) => logs.push(`[requestfailed] ${r.url()} ${r.failure()?.errorText}`))

  await page
    .goto(url, { waitUntil: "domcontentloaded", timeout: 30000 })
    .catch((e) => logs.push("goto: " + e.message))

  await page.waitForTimeout(6000)
  await page.screenshot({ path: out }).catch((e) => logs.push("screenshot: " + e.message))

  console.log("=== CONSOLE / ERRORS ===")
  console.log(logs.length ? logs.join("\n") : "no console messages")
  await browser.close()
})()
