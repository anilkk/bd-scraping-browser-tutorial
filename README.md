# Web scraping with Bright Data's Scraping Browser

This repository showcases web scraping using Puppeteer to leveraging Bright Data's Scraping Browser for simplified and scalable data collection.

## Usage

### 1. Install Dependencies

Ensure all dependencies are installed:

```bash
npm install
```

### 2. Bright Data Scraping Browser

Create a `.env` file and add your Scraping Browser endpoint (replace YOUR_BRIGHT_DATA_WS_ENDPOINT with your Bright Data Scraping Browser WebSocket endpoint):
```
SBR_WS_ENDPOINT=YOUR_BRIGHT_DATA_WS_ENDPOINT
```

Example:
```
SBR_WS_ENDPOINT=wss://brd-customer-ab_3abcd12e-zone-scraping_browser1:t45abcdefgh1@brd.superproxy.io:9222
```

Then run:
```bash
node brightdata-scraper.js
```