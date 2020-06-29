const puppeteer = require('puppeteer');
const axios = require('axios')
const cheerio = require('cheerio')
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
// (async () => {
//     let browser = await puppeteer.launch({ headless: true, slowMo: 100, devtools: true });
//     let page = await browser.newPage();
//     await page.setViewport({ width: 1199, height: 900 });
//     await page.goto('https://');
//     await page.screenshot({path: 'test.png'})
//     await browser.close()
// })();


