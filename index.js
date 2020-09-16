var ethUtil = require('ethereumjs-util')
var sigUtil = require('eth-sig-util')
var Eth = require('ethjs')
window.Eth = Eth
console.log('new V2')
var fs = require('fs')
var terms = fs.readFileSync(__dirname + '/terms.txt').toString()

connectButton.addEventListener('click', function () {
  connect()
})

function connect () {
  if (typeof BinanceChain !== 'undefined') {
    BinanceChain.enable()
    .catch(console.error)
  }
}

ethSignButton.addEventListener('click', function(event) {
  event.preventDefault()
  var msg = 'hello world'
  BinanceChain.request({method: "eth_requestAccounts"}).then((addresses) => {
    var from = addresses[0]
    if (!from) return connect()
    BinanceChain.request({method: "eth_sign", params: [from, msg]}).then((sig) => {
      console.log('SIGNED:' + sig)
    })
  })
})

bnbSignButton.addEventListener('click', function(event) {
  event.preventDefault()
  var msg = 'hello world'
  BinanceChain.request({method: "eth_requestAccounts"}).then((addresses) => {
    var from = addresses[0]
    if (!from) return connect()
    BinanceChain.bnbSign(from, msg).then((sig) => {
      console.log('SIGNED:' + JSON.stringify(sig))
    })
  })
})
