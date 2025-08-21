# Generate Open Graph Image Instructions

## Quick Method (Using Browser)

1. Open `/assets/og-image-generator.html` in Chrome or Firefox
2. Set browser window to exactly 1200x630 pixels
3. Take a screenshot (Cmd+Shift+4 on Mac)
4. Save as `og-image.jpg` in the `/assets` folder

## Professional Method (Using Puppeteer)

```bash
npm install puppeteer
```

Create `generate-og.js`:

```javascript
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 630 });
  await page.goto('file:///Users/jaytarzwell/LastAlgoWeb/assets/og-image-generator.html');
  await page.screenshot({ path: 'assets/og-image.jpg', quality: 90 });
  await browser.close();
  console.log('OG image generated successfully!');
})();
```

Run: `node generate-og.js`

## Alternative: Online Tool

Use https://htmlcsstoimage.com/ to convert the HTML to an image:
1. Copy the HTML from `og-image-generator.html`
2. Paste into the tool
3. Generate and download as 1200x630
4. Save as `og-image.jpg`