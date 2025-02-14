const puppeteer = require("puppeteer");

const proxies = [
  "proxy1.example.com:port",
  "proxy2.example.com:port",
  // Add more proxies here
];

(async () => {
  // Choose a random proxy
  const randomProxy = proxies[Math.floor(Math.random() * proxies.length)];

  // Launch Puppeteer with proxy
  const browser = await puppeteer.launch({
    headless: true,
    args: [
      `--proxy-server=http=${randomProxy}`,
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--ignore-certificate-errors",
    ],
  });

  const page = await browser.newPage();

  const baseUrl = "https://books.toscrape.com/catalogue/page-";
  const books = [];

  for (let i = 1; i <= 5; i++) {
    // Loop through the first 5 pages
    const url = `${baseUrl}${i}.html`;

    console.log(`Navigating to: ${url}`);

    // Navigate to the page
    await page.goto(url, { waitUntil: "networkidle0" });

    // Extract book data from the current page
    const pageBooks = await page.evaluate(() => {
      let books = [];
      document.querySelectorAll(".product_pod").forEach((item) => {
        let title = item.querySelector("h3 a")?.getAttribute("title") || "";
        let price = item.querySelector(".price_color")?.innerText || "";
        books.push({ title, price });
      });
      return books;
    });

    books.push(...pageBooks); // Append books from this page to the main list
  }

  console.log(`Using proxy: ${randomProxy}`);
  console.log(books); // Print the collected data

  await browser.close();
})();
