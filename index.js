const express = require('express')
const app = express()
const path = require('path')
const port = 4000

const apiBCB = require('./lib/api.bcb')

app.set('view engine','ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')))

app.get('/exchange-rates-bcb/:date', async(req, res) => {
    let date = req.params.date
    let currencies = await apiBCB.todasCotacoes(date)
    currencies = JSON.stringify(currencies)
    res.render('currencies', { currencies })
})

app.listen(port, err => err ? console.error(err) : console.log(`listening on port ${port}`))