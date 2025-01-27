const express = require("express");
const puppeteer = require("puppeteer");

const app = express();
const PORT = 3000;

// Needed to parse JSON bodies:
app.use(express.json());

// Your Bright Data Scraping Browser WebSocket endpoint
const SBR_WS_ENDPOINT = "YOUR_BRIGHT_DATA_WS_ENDPOINT";

/**
 * POST /scrape
 * Body example:
 * {
 *   "baseUrl": "https://books.toscrape.com/catalogue/page-"
 * }
 */
app.post("/scrape", async (req, res) => {
  const { baseUrl } = req.body;

  if (!baseUrl) {
    return res.status(400).json({
      success: false,
      error: 'Missing "baseUrl" in request body.',
    });
  }

  try {
    // Connect to the existing Bright Data (Luminati) Scraping Browser
    const browser = await puppeteer.connect({
      browserWSEndpoint: SBR_WS_ENDPOINT,
    });

    const page = await browser.newPage();
    const books = [];

    // Example scraping 5 pages of the base URL
    for (let i = 1; i <= 5; i++) {
      const url = `${baseUrl}${i}.html`;
      console.log(`Navigating to: ${url}`);

      await page.goto(url, { waitUntil: "networkidle0" });

      const pageBooks = await page.evaluate(() => {
        const data = [];
        document.querySelectorAll(".product_pod").forEach((item) => {
          const title = item.querySelector("h3 a")?.getAttribute("title") || "";
          const price = item.querySelector(".price_color")?.innerText || "";
          data.push({ title, price });
        });
        return data;
      });

      books.push(...pageBooks);
    }

    // Close the browser connection
    await browser.close();

    // Return JSON with the scraped data
    return res.json({
      success: true,
      books,
    });
  } catch (error) {
    console.error("Scraping error:", error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
