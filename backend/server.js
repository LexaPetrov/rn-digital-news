const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const path = require("path");
const fs = require('fs')

const {
    init
} = require('./fetch.js')

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

let filepath = path.resolve('./fetch.json');
let fetchFile = require('./fetch.json')

const app = express()
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cors())

app.get('/', (req, res) => {
    res.send('Hi')
})

app.get('/api/news', (req, response) => {
    response.send(fetchFile)
})

fs.watchFile('./fetch.json', (curr, prev) => {
    delete require.cache[filepath];
    fetchFile = require('./fetch.json');
    console.log(`${'fetch'} file Changed`);
});

setInterval(() => {
    init('force')
}, 36000000)

app.listen(4000, () => {
    console.log('Server listening on 4000');
})