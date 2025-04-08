const puppeteer = require("puppeteer");
require('dotenv').config();

// Helper function to scrape a single page
async function scrapePage(url) {
  // Create a new browser session for each page
  const browser = await puppeteer.connect({
    browserWSEndpoint: process.env.SBR_WS_ENDPOINT,
  });

  try {
    const page = await browser.newPage();
    console.log(`Navigating to: ${url}`);
    
    // Navigate to the page
    await page.goto(url, { 
      waitUntil: "networkidle0",
      timeout: 60000 
    });

    // Extract book data from the current page
    const books = await page.evaluate(() => {
      let books = [];
      document.querySelectorAll(".product_pod").forEach((item) => {
        let title = item.querySelector("h3 a")?.getAttribute("title") || "";
        let price = item.querySelector(".price_color")?.innerText || "";
        books.push({ title, price });
      });
      return books;
    });

    return books;
  } finally {
    // Always close the browser session
    await browser.close();
  }
}

(async () => {
  const baseUrl = "https://books.toscrape.com/catalogue/page-";
  const allBooks = [];

  // Scrape each page in a separate session
  for (let i = 1; i <= 5; i++) {
    const url = `${baseUrl}${i}.html`;
    
    try {
      const pageBooks = await scrapePage(url);
      allBooks.push(...pageBooks);
      console.log(`Successfully scraped ${pageBooks.length} books from page ${i}`);
      
      // Add a small delay between sessions
      if (i < 5) {
        console.log('Waiting 2 seconds before next session...');
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    } catch (error) {
      console.error(`Error scraping page ${i}:`, error);
    }
  }

  console.log('Scraping completed. Total books found:', allBooks.length);
  console.log(allBooks);
})();
