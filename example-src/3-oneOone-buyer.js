// import OverledgerSDK from "@quantnetwork/overledger-sdk";
const OverledgerSDK = require("@quantnetwork/overledger-sdk").default;

//  ---------------------------------------------------------
//  -------------- BEGIN VARIABLES TO UPDATE ----------------
//  ---------------------------------------------------------
const mappId = 'iwoom.one';
const carsAvailable = [
  { name: 'camaro-ss', amount: 142000 },
  { name: 'donkervoort-d8-gto-40-e-ss', amount: 120000 },
  { name: 'spycker-c8-preliator', amount: 27000 },
];
// From script number 2
const shopAddress = 'mtPoCC7W9VCXLFtYq3A3X85U7bVVyrDY39';
//  ---------------------------------------------------------
//  -------------- END VARIABLES TO UPDATE ------------------
//  ---------------------------------------------------------


const selectedCar = 1;

; (async () => {
  try {
    const overledger = new OverledgerSDK(mappId, "DkucSXHTIKsNoT7EX9kfpvkVyorhSoa4odHLnYS-3f0", {
      dlts: [{ dlt: "bitcoin" } ],
      network: 'testnet',
    });

    console.log('Buyer:');
    const buyerBitcoinAccount = overledger.dlts.bitcoin.createAccount();

    overledger.dlts.bitcoin.setAccount(buyerBitcoinAccount.privateKey);

    console.log(overledger.dlts.bitcoin.account.address);

    // FAUCET
    const buyerFaucetResult = (await overledger.dlts.bitcoin.fundAccount()).data;
    console.log(buyerFaucetResult);
    const faucetMessage = JSON.parse(buyerFaucetResult.message);

    // SIGNED
    console.log(carsAvailable[selectedCar].amount);
    const params = {
      sequence: faucetMessage.vout,
      previousTransactionHash: faucetMessage.txnHash,
      amount: carsAvailable[selectedCar].amount,
      value: faucetMessage.amount * 1e8, // TODO make it dynamic
      feePrice: 1e5,
    };
    const signedTransaction = await overledger.dlts.bitcoin.sign(shopAddress, `Buying: ${carsAvailable[selectedCar].name} for ${carsAvailable[selectedCar].amount} btc`, params);

    console.log('signedTransaction', signedTransaction);

    const result = (await overledger.dlts.bitcoin.send(signedTransaction)).data;
    console.log(JSON.stringify(result, null, 2));
    console.log('Buyer transaction hash: ', result.dltData[0].transactionHash);

  } catch (e) {
    console.log(e);
  }
})();
