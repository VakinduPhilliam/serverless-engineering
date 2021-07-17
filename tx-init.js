var faker = require('faker');
const fs = require('fs')

function genTxs(num) {
    let txs = []
    for(let step=0; step <= num; step++) { txs.push(genTx(step)) }
    return writeTXs(txs)
} 

function genTx(id) {
    let countries = ["US", "NG", "SA", "BW", "GH"]
    let currencies = ["ETH", "BTC", "LTC", "USDT"]
    let seed = Math.random()

    return {
        id: String(id), 
        amount: faker.finance.amount(),
        country: countries[Math.floor(seed*countries.length)],
        createdAt: Date.now(),
        updatedAt: Date.now(),
        currency: currencies[Math.floor(seed*currencies.length)],
        bitcoinAddress: faker.finance.bitcoinAddress(),
        customerName: faker.name.findName(),
        customerEmail: faker.internet.email(),
        customerId: faker.internet.userName()
    }
}

function writeTXs(txs) {    
    try { return fs.writeFileSync('txs.json', JSON.stringify(txs)) } 
    catch (err) { console.error(err) }
}

(genTxs(30000))
