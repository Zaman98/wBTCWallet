const Web3 = require('web3')

// 0. Connect to the Ethereum client node
const web3 = new Web3('https://goerli.infura.io/v3/29568a5cdf1c476ead117b51bc7c7b95')

const fs = require('fs');
// 1. Ask user to set a password, this would be sotes in a 
const password = 'apples'
var keyStoreObject = {};

// 2. Create a new EOA on Ethereum and encrypt it with the password provided by the user
const accountCreation = () => {
    const account = web3.eth.accounts.create()
    const PK = account.privateKey
    keyStoreObject = web3.eth.accounts.encrypt(PK, password)
    //return keyStoreObject
}
accountCreation()

module.exports = { web3 }

const baseObject = {
    password, keyStoreObject
}


fs.writeFile('new.json', JSON.stringify(baseObject), function (err) {
    if (err) return console.log(err);
    console.log('check new.json, baseObject copied succesfully.');
});


