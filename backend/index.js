const puppeteer = require('puppeteer');
const fs = require('fs')
let file = {}
let lastlength = 0
let link = 'https://digital.orb.ru/sobytiya/';

const parseNews = async () => {
    try {
        let output = []
        let i = 1
        while (true) {
            console.log('step', i);
            let browser = await puppeteer.launch({ headless: true, slowMo: 100, devtools: true });
            let page = await browser.newPage();
            await page.setViewport({ width: 1199, height: 900 });
            await page.goto(link + `?PAGEN_1=${i}`, { waitUntil: 'domcontentloaded' });
            let news = await page.evaluate(async () => {
                let res = []
                let div = document.querySelectorAll('article.news-short');
                let pagination = document.querySelector('a.pagination__next');
                
                div.forEach(item => {
                    let date = item.querySelector('div.news-short__date').innerText
                    let title = item.querySelector('a.news-short__link').innerText
                    let link = item.querySelector('a.news-short__link').href
                    let img = item.querySelector('div.news-short__image > a > img').src
                    res.push({
                        date,
                        title,
                        link,
                        img
                    })
                })

                if (pagination === null) {
                    res.push({ isNUll: true })
                }
                return res;
            });
            for (let j = 0; j < news.length; j++) {
                //https://stackoverflow.com/questions/46293216/crawling-multiple-url-in-a-loop-using-puppeteer
                if (j !== 4) {
                    let url = `${news[j].link}`
                    await page.goto(url, { waitUntil: 'domcontentloaded' });
                    news[j].text = await page.evaluate(async () => {
                        let t = document.querySelector('div.news-full__text').innerText
                        return t
                    })
                }
            }

            if (news.length === 5) {
                output.push(news)
                await browser.close();
                break
            } else {
                output.push(news)
                await browser.close();
                i++;
            }

        }
        console.log('Length - ', output.length);
        let l = { length: output.length }
        fs.writeFile("last__length.json", JSON.stringify(l), function (err) {
            if (err) throw err;
            console.log("Saved last__length file");
        });
        fs.writeFile("output.json", JSON.stringify(output), function (err) {
            if (err) throw err;
            console.log("Saved!");
        });

    } catch (err) {
        console.log('Err - ', err);
        await browser.close();
    }
}

try {
    file = require('./output.json')
    lastlength = require('./last__length.json')
    if (lastlength.length !== file.length) {
        console.log('Количество новостей не совпадет, начинаем парсинг');
        parseNews()
    } else {
        console.log('Количество новостей совпадет');
    }
} catch {
    console.log('Начинаем парсинг новостей');
    parseNews()
}


