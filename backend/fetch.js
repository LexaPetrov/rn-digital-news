const axios = require('axios')
const cheerio = require('cheerio')
const fs = require('fs')
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
let link = 'http://digital.orb.ru/sobytiya/';
let file = {}
let lastlength = 0
const parseNews = async () => {
    try {
        let arr = []
        let i = 1
        let flag = false
        while (true) {
            await axios.get(link + `?PAGEN_1=${i}`)
                .then(res => res.data)
                .then(res => {
                    let html = res
                    $ = cheerio.load(html)
                    let pagination = $('a.pagination__next').html();
                    $(html).find('article.news-short').each(function (index, element) {
                        let item = {
                            date: $(element).find('div.news-short__date').text(),
                            title: $(element).find('a.news-short__link').text(),
                            link: 'https://digital.orb.ru' + $(element).find('a.news-short__link').attr('href'),
                            img: 'https://digital.orb.ru' + $(element).find('div.news-short__image > a > img').attr('src')
                        }
                        arr.push(item)
                    });
                    if (pagination === null) {
                        flag = true
                    }
                })
                .catch(err => console.log(err))
            console.log(1, i);
            if (flag) {
                for (let i = 0; i < arr.length; i++) {
                    console.log(2, i);
                    await axios.get(arr[i].link)
                        .then(res => res.data)
                        .then(res => {
                            let html = res
                            $ = cheerio.load(html)
                            let text = $('div.news-full__text').text()
                            arr[i]['text'] = text
                        })
                        .catch(err => console.log(err))
                }
                break
            }
            i++
        }
        fs.writeFile("fetch.json", JSON.stringify(arr), function (err) {
            if (err) throw err;
            console.log("Saved fetch.json");
        });
        let l = { length: arr.length }
        console.log('Всего новостей найдено -', l);
        fs.writeFile("last.json", JSON.stringify(l), function (err) {
            if (err) throw err;
            console.log("Saved last.json");
        });
        return arr
    } catch (err) {
        console.log('Err - ', err);
    }
}

const init = (param) => {
    if (param === 'force') {
        console.log('Плановое обновление новостей');
        parseNews()
    } else {
        try {
            file = require('./fetch.json')
            lastlength = require('./last.json')
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
    }
}

module.exports = {
    init
}


