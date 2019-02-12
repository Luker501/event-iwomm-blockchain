// import OverledgerSDK from "@quantnetwork/overledger-sdk";
const OverledgerSDK = require("@quantnetwork/overledger-sdk").default;
const shopAddress = 'mx5rrpTmxpYkeZhWQBQAVviSZxvMrHdm56';

const carsAvailable = [
  { name: 'camaro-ss', amount: 142000 },
  { name: 'donkervoort-d8-gto-40-e-ss', amount: 120000 },
  { name: 'spycker-c8-preliator', amount: 27000 },
];

const selectedCar = 1;

; (async () => {
  try {
    const overledger = new OverledgerSDK("buyer.iwoom", "DkucSXHTIKsNoT7EX9kfpvkVyorhSoa4odHLnYS-3f0", {
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
    const previousTransactionHash = JSON.parse(buyerFaucetResult.message).txnHash;

    console.log('TTT', 1e8);

    // SIGNED
    console.log(carsAvailable[selectedCar].amount);
    const params = {
      sequence: 0,
      previousTransactionHash: previousTransactionHash,
      amount: carsAvailable[selectedCar].amount,
      value: 100000000, // TODO make it dynamic
      feePrice: 1e5,
    };
    console.log((parseInt(params.value - params.amount - 546 - params.feePrice)).toString());
    const signedTransaction = await overledger.dlts.bitcoin.sign(shopAddress, `Buying: ${carsAvailable[selectedCar].name} for ${carsAvailable[selectedCar].amount} btc`, params);



    // options.value - options.amount - this.NON_DUST_AMOUNT - options.feePrice

    console.log('signedTransaction', signedTransaction);

    const result = (await overledger.dlts.bitcoin.send(signedTransaction)).data;
    console.log(JSON.stringify(result, null, 2));

  } catch (e) {
    console.log(e);
  }
})();
