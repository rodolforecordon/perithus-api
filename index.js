const express = require('express')
const app = express()
const path = require('path')
const port = 4000

const apiBCB = require('./lib/api.bcb')

app.set('view engine','ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
    res.send('<h1>Exchange Rates - Home</h1>')
})

app.get('/currency-codes-bcb', async(req, res) => {
    let currencies = await apiBCB.moedasBCB()
    currencies = JSON.stringify(currencies)
    res.render('currencies', { currencies })
})

app.get('/exchange-rates-bcb/:date', async(req, res) => {
    let date = req.params.date
    let exchangeRates = await apiBCB.todasCotacoes(date)
    exchangeRates = JSON.stringify(exchangeRates)
    res.render('exchange-rates', { exchangeRates })
})

app.listen(port, err => err ? console.error(err) : console.log(`listening on port ${port}`))