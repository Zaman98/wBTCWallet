const Web3 = require('web3')

// 0. Connect to the Ethereum client node
const web3 = new Web3('https://goerli.infura.io/v3/29568a5cdf1c476ead117b51bc7c7b95')

const fs = require('fs');

// Import baseObject from new.json
const baseObject = require('./new.json')

// Store the password and KeystoreObject, to retreive PrivateKeys for signing transactions.
const password = baseObject.password;
const keyStoreObject = baseObject.keyStoreObject;

// 1. and 2. are in setup.js

// 3. This function decrypts the keyStoreObject with the user password to return the privateKey, 
//    which can then be used to sign transactions.

const returnPK = async () => {
    const retreiveKey = await web3.eth.accounts.decrypt(keyStoreObject, password)
    return retreiveKey.privateKey
}

// 4. This function returns the address of the EOA, to receive payments. 
const address = () => {
    const retreiveKey = web3.eth.accounts.decrypt(keyStoreObject, password)
    return retreiveKey.address
}

// 5. Create a transaction object and Sign transaction i.e send money
const Tx = {}
const createTx = (receiversAddress, valueToBeSent) => {
    Tx.to = receiversAddress
    if (valueToBeSent) {
        Tx.value = valueToBeSent
    }
    Tx.gas = 21000
    return Tx;
}

const SignTx = async (receiversAddress, valueToBeSent) => {
    const signPromise = await web3.eth.accounts.signTransaction(createTx(receiversAddress, valueToBeSent), await returnPK())
    console.log(signPromise)
}

// Returns account balance
const balance = async () => {
    let balanceAc = await web3.eth.getBalance(await address())
    console.log(`the current account addreess is ${await address()} 
    and the balance is ${balanceAc}`)
}
