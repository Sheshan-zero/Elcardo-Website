const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.log('BROWSER CONSOLE ERROR:', msg.text());
    }
  });

  page.on('pageerror', err => {
    console.log('PAGE ERROR:', err.message);
  });

  try {
    console.log('Navigating to page...');
    await page.goto('http://localhost:5173/Elcardo-Website/#/companies', { waitUntil: 'networkidle0' });
    console.log('Done waiting.');
  } catch (e) {
    console.log('Navigation error:', e);
  }

  await browser.close();
})();
