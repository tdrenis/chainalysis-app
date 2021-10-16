import { React, useEffect, useState } from 'react'
import axios from "axios"

import btcLogo from './assets/img/btc.png'
import ethLogo from './assets/img/eth.png'

// Styling
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Table from 'react-bootstrap/Table'

const App = () => {

  const [lastUpdated, setLastUpdated] = useState("")

  const [btcBidBinance, setBtcBidBinance] = useState(0)
  const [btcAskBinance, setBtcAskBinance] = useState(0)
  const [ethBidBinance, setEthBidBinance] = useState(0)
  const [ethAskBinance, setEthAskBinance] = useState(0)

  const [btcBidCoinbase, setBtcBidCoinbase] = useState(0)
  const [btcAskCoinbase, setBtcAskCoinbase] = useState(0)
  const [ethBidCoinbase, setEthBidCoinbase] = useState(0)
  const [ethAskCoinbase, setEthAskCoinbase] = useState(0)

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  })

  const updatePrices = () => { 
    axios.get("/api/binance/btc")
      .then((response) => { 
        setBtcBidBinance(response.data.bidPrice)
        setBtcAskBinance(response.data.askPrice)
      })
      .catch((err) => console.log(err))

    axios.get("/api/coinbase/btc")
      .then((response) => { 
        setBtcBidCoinbase(response.data.bid)
        setBtcAskCoinbase(response.data.ask)
      })
      .catch((err) => console.log(err))

    axios.get("/api/binance/eth")
      .then((response) => { 
        setEthBidBinance(response.data.bidPrice)
        setEthAskBinance(response.data.askPrice)
      })
      .catch((err) => console.log(err))

    axios.get("/api/coinbase/eth")
      .then((response) => { 
        setEthBidCoinbase(response.data.bid)
        setEthAskCoinbase(response.data.ask)
      })
      .catch((err) => console.log(err))

    setLastUpdated(new Date().toLocaleTimeString())
  }

  useEffect(() => {
    updatePrices()
    setInterval(updatePrices, 30000)
  }, [])

  return (
    <div className="App">

      <h1>Chainalysis App</h1>
      <p>Updates every 30 seconds</p>
      <p className="updatedTime">Last updated at {lastUpdated}</p>

      <div className="btc">
        <h4><img src={btcLogo} className="btcLogo" alt="" />Bitcoin</h4>
        <Table className="btcTable" striped bordered variant="dark">
        <thead>
          <tr>
            <th> </th>
            <th>Binance</th>
            <th>Coinbase</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Buy</td>
            <td style={{color: btcBidBinance < btcBidCoinbase ? 'lightgreen' : 'white'}}>{ formatter.format(btcBidBinance) }</td>
            <td style={{color: btcBidCoinbase < btcBidBinance ? 'lightgreen' : 'white'}}>{ formatter.format(btcBidCoinbase) }</td>
          </tr>
          <tr>
            <td>Sell</td>
            <td style={{color: btcAskBinance > btcAskCoinbase ? 'lightgreen' : 'white'}}>{ formatter.format(btcAskBinance) }</td>
            <td style={{color: btcAskCoinbase > btcAskBinance ? 'lightgreen' : 'white'}}>{ formatter.format(btcAskCoinbase) }</td>
          </tr>
        </tbody>
      </Table>
      </div>

      <div className="eth">
        <h4><img src={ethLogo} className="ethLogo" alt="" />Ethereum</h4>
        <Table className="ethTable" striped bordered variant="dark">
        <thead>
          <tr>
            <th> </th>
            <th>Binance</th>
            <th>Coinbase</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Buy</td>
            <td style={{color: ethBidBinance < ethBidCoinbase ? 'lightgreen' : 'white'}}>{ formatter.format(ethBidBinance) }</td>
            <td style={{color: ethBidCoinbase < ethBidBinance ? 'lightgreen' : 'white'}}>{ formatter.format(ethBidCoinbase) }</td>
          </tr>
          <tr>
            <td>Sell</td>
            <td style={{color: ethAskBinance > ethAskCoinbase ? 'lightgreen' : 'white'}}>{ formatter.format(ethAskBinance) }</td>
            <td style={{color: ethAskCoinbase > ethAskBinance ? 'lightgreen' : 'white'}}>{ formatter.format(ethAskCoinbase) }</td>
          </tr>
        </tbody>
      </Table>
      </div>

    </div>
  )
}

export default App
