const express = require('express')
const axios = require('axios')
const path = require('path')

const app = express()
const port = process.env.PORT || 5000

app.use(express.static(path.join(__dirname, 'chainalysis/build')))

const binanceBtcURL = 'https://api.binance.com/api/v3/ticker/bookTicker?symbol=BTCUSDT'
const binanceEthURL = 'https://api.binance.com/api/v3/ticker/bookTicker?symbol=ETHUSDT'
const coinbaseBtcURL = 'https://api.exchange.coinbase.com/products/BTC-USD/ticker'
const coinbaseEthURL = 'https://api.exchange.coinbase.com/products/ETH-USD/ticker'

app.get('/api/binance/btc', (_, res) => {
  axios.get(binanceBtcURL)
    .then((response) => { 
      res.send(response.data)
    })
    .catch((err) => console.log(err))
})

app.get('/api/coinbase/btc', (_, res) => {
  axios.get(coinbaseBtcURL)
    .then((response) => { 
      res.send(response.data)
    })
    .catch((err) => console.log(err))
})

app.get('/api/binance/eth', (_, res) => {
  axios.get(binanceEthURL)
    .then((response) => { 
      res.send(response.data)
    })
    .catch((err) => console.log(err))
})

app.get('/api/coinbase/eth', (_, res) => {
  axios.get(coinbaseEthURL)
    .then((response) => { 
      res.send(response.data)
    })
    .catch((err) => console.log(err))
})

app.listen(port, () => console.log(`Listening on port ${port}`))
