# Replacing Proxy-Based Scraping with Bright Data's Scraping Browser

This repository showcases a transition from proxy-based web scraping using Puppeteer to leveraging Bright Data's Scraping Browser for simplified and scalable data collection.

## Usage

### 1. Install Dependencies

Ensure all dependencies are installed:

```bash
npm install
```

### 2. Proxy-Based Scraper

Run the proxy-based scraping example:

```bash
node proxy-scraper.js
```

### 3. Bright Data Scraping Browser

Replace `YOUR_BRIGHT_DATA_WS_ENDPOINT` in `brightdata-scraper.js` with your Bright Data Scraping Browser WebSocket endpoint, then run:

```bash
node brightdata-scraper.js
```

### 4. Express.js API

Start the scraping API server:

```bash
node server.js
```

Test the API:

```bash
curl -X POST http://localhost:3000/scrape \
-H 'Content-Type: application/json' \
-d '{"baseUrl": "https://books.toscrape.com/catalogue/page-"}'
```

## Notes

- Proxy rotation logic is in `proxy-scraper.js`.
- Bright Data simplifies scraping with built-in proxy management and anti-bot handling.
