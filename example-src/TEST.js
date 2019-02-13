// import OverledgerSDK from "@quantnetwork/overledger-sdk";
const OverledgerSDK = require("@quantnetwork/overledger-sdk").default;
const util = require('util');

// const OverledgerSDK = require('@quantnetwork/overledger-sdk').default;
// const privateKey = 'cTkWZXBcNreH2T7k4SrhQ.....';

/*
const bitcoinAccount = overledger.dlts.bitcoin.createAccount();
console.log(bitcoinAccount);
overledger.dlts.bitcoin.setAccount(bitcoinAccount.privateKey);
console.log(overledger.dlts.bitcoin);

const ethereumAccount = overledger.dlts.ethereum.createAccount();
console.log(ethereumAccount);
overledger.dlts.ethereum.setAccount(ethereumAccount.privateKey);
console.log(overledger.dlts.ethereum);

const rippleAccount = overledger.dlts.ripple.createAccount();
console.log(rippleAccount);
overledger.dlts.ripple.setAccount(rippleAccount.privateKey);
console.log(overledger.dlts.ripple);

 */


; (async () => {
  try {
    const overledger = new OverledgerSDK("network.quant.multichainexplorer", "DkucSXHTIKsNoT7EX9kfpvkVyorhSoa4odHLnYS-3f0", {
      dlts: [{ dlt: "bitcoin" }, { dlt: 'ethereum' }, { dlt: 'ripple' }],
      network: 'testnet',
    });


    console.log('Quant:');
    const quantDVLAPrivateKey = 'sn2tYtDw63PkaNtsCue4vNyVaZqYz';
    const quantInsurancePrivateKey = '0xe51eac2639e8d7deae3115dd68cda267cd17d408e2dff4e7a44a79373357e6ab';

    console.log('Shop:');
    const shopBitcoinAccount = overledger.dlts.bitcoin.createAccount();
    const shopEthereumAccount = overledger.dlts.ethereum.createAccount();
    const shopRippleAccount = overledger.dlts.ripple.createAccount();


    overledger.dlts.bitcoin.setAccount(shopBitcoinAccount.privateKey);
    overledger.dlts.ethereum.setAccount(shopEthereumAccount.privateKey);
    overledger.dlts.ripple.setAccount(shopRippleAccount.privateKey);

    console.log(overledger.dlts.bitcoin.account.address);
    console.log(overledger.dlts.ethereum.account.address);
    console.log(overledger.dlts.ethereum.account.address);

    // FAUCET
    console.log((await overledger.dlts.bitcoin.fundAccount()).data);
    console.log((await overledger.dlts.ethereum.fundAccount()).data);
    console.log((await overledger.dlts.ripple.fundAccount()).data);

    // GET BALANCE
    const shopRippleBalance = (await overledger.dlts.ripple.getBalance()).data;
    console.log((await overledger.dlts.ethereum.getBalance()).data);
    // console.log(await overledger2.dlts.bitcoin.getBalance()); // NOT IMPLEMENTED

    // GET TRANSACTION
    console.log((await overledger.dlts.ripple.getBalance()).data);
    console.log((await overledger.dlts.ethereum.getBalance()).data);
    // console.log(await overledger2.dlts.bitcoin.getBalance()); // NOT IMPLEMENTED




    const bitcoinPrivateKey = 'cV1JkkFboXfMFtPNS9EHbg13XuEM8LU4CaSyQCV2Qp8TZuVw4nwn';
    const ethereumPrivateKey = '0xe51eac2639e8d7deae3115dd68cda267cd17d408e2dff4e7a44a79373357e6ab';
    const ripplePrivateKey = 'sn2tYtDw63PkaNtsCue4vNyVaZqYz';



  } catch (e) {
    console.log(e);
  }

  process.exit(1);

})();


const overledger2 = new OverledgerSDK("network.quant.multichainexplorer", "DkucSXHTIKsNoT7EX9kfpvkVyorhSoa4odHLnYS-3f0", {
  dlts: [{ dlt: "bitcoin" }, { dlt: 'ethereum' }, { dlt: 'ripple' }],
  network: 'testnet',
});


const ripple = overledger2.dlts.ripple.createAccount();

overledger2.dlts.bitcoin.setAccount(bitcoinPrivateKey);
overledger2.dlts.ethereum.setAccount(ethereumPrivateKey);
overledger2.dlts.ripple.setAccount(ripplePrivateKey);

console.log(overledger2.dlts.bitcoin.account.address);
console.log(overledger2.dlts.ethereum.account.address);
console.log(overledger2.dlts.ethereum.account.address);

// FAUCET
// console.log((await overledger2.dlts.bitcoin.fundAccount()).data);
// console.log((await overledger2.dlts.ethereum.fundAccount()).data);
// console.log((await overledger2.dlts.ripple.fundAccount()).data);

// GET BALANCE
// console.log((await overledger2.dlts.ripple.getBalance()).data);
// console.log((await overledger2.dlts.ethereum.getBalance()).data);
// console.log(await overledger2.dlts.bitcoin.getBalance()); // NOT IMPLEMENTED
/*
// GET SEQUENCE
const sequence = await overledger2.search.getSequence({
  "mappId": "network.quant.software",
  "dltData": [
    {
      "dlt": "bitcoin",
      "fromAddress": overledger2.dlts.bitcoin.account.address,
    },
    {
      "dlt": "ethereum",
      "fromAddress": overledger2.dlts.ethereum.account.address,
    },
    {
      "dlt": "ripple",
      "fromAddress": overledger2.dlts.ripple.account.address,
    },
  ],
});

// SIGN
const bitcoinSignedTransaction = await overledger2.dlts.bitcoin.sign(overledger2.dlts.bitcoin.account.address, 'I am a quant test message', { sequence: 0, previousTransactionHash: 'fb6a48b006470f22c1badbeb6db3a7f769b421ee5e4e93d42a6940b3c73ac6c1', amount: 1 });
console.log(bitcoinSignedTransaction);
const ethereumSignedTransaction = await overledger2.dlts.ethereum.sign(overledger2.dlts.ethereum.account.address, 'I am a quant test message', { sequence: 42, amount: '1', feeLimit: '420000', feePrice: '42000' });
console.log(ethereumSignedTransaction);
const rippleSignedTransaction = await overledger2.dlts.ripple.sign(ripple.address, 'I am a quant test message', { sequence: 1, amount: '1', maxLedgerVersion: 100000000, feePrice: '2' });
console.log(rippleSignedTransaction);

// SEND
// console.log(util.inspect((await overledger2.dlts.bitcoin.send(bitcoinSignedTransaction)).data, {showHidden: false, depth: null}))
// console.log(util.inspect((await overledger2.dlts.ethereum.send(ethereumSignedTransaction)).data, {showHidden: false, depth: null}))
// console.log(util.inspect((await overledger2.dlts.ripple.send(rippleSignedTransaction)).data, {showHidden: false, depth: null}))

// SEND ALL
console.log(util.inspect((await overledger2.send([
  { 'dlt': 'bitcoin', signedTransaction: bitcoinSignedTransaction },
  { 'dlt': 'ethereum', signedTransaction: ethereumSignedTransaction },
  { 'dlt': 'ripple', signedTransaction: rippleSignedTransaction },
])).data, { showHidden: false, depth: null }))

return;
  }
 */
