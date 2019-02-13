const OverledgerSDK = require("@quantnetwork/overledger-sdk").default;
//  ---------------------------------------------------------
//  -------------- BEGIN VARIABLES TO UPDATE ----------------
//  ---------------------------------------------------------
const mappId = 'iwomm.one';
//  ---------------------------------------------------------
//  -------------- END VARIABLES TO UPDATE ------------------
//  ---------------------------------------------------------

; (async () => {
  try {
    const overledger = new OverledgerSDK(mappId, "DkucSXHTIKsNoT7EX9kfpvkVyorhSoa4odHLnYS-3f0", {
      dlts: [{ dlt: "bitcoin" }, { dlt: 'ethereum' }, { dlt: 'ripple' }],
      network: 'testnet',
    });

    console.log('Shop:');
    const shopBitcoinAccount = overledger.dlts.bitcoin.createAccount();
    const shopEthereumAccount = overledger.dlts.ethereum.createAccount();
    const shopRippleAccount = overledger.dlts.ripple.createAccount();

    overledger.dlts.bitcoin.setAccount(shopBitcoinAccount.privateKey);
    overledger.dlts.ethereum.setAccount(shopEthereumAccount.privateKey);
    overledger.dlts.ripple.setAccount(shopRippleAccount.privateKey);

    console.log('SHOP bitcoin address: ', overledger.dlts.bitcoin.account);
    console.log('SHOP ethereum address: ', overledger.dlts.ethereum.account);
    console.log('SHOP ripple address: ', overledger.dlts.ripple.account);

    // FAUCET
    console.log('Bitcoin faucet: ', (await overledger.dlts.bitcoin.fundAccount()).data);
    console.log('Ethereum faucet: ', (await overledger.dlts.ethereum.fundAccount()).data);
    console.log('Ripple faucet: ', (await overledger.dlts.ripple.fundAccount()).data);

  } catch (e) {
    console.error('error', e);
  }
})();
