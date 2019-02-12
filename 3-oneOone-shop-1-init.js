const OverledgerSDK = require("@quantnetwork/overledger-sdk").default;

; (async () => {
  try {
    const overledger = new OverledgerSDK("shop.iwoom", "DkucSXHTIKsNoT7EX9kfpvkVyorhSoa4odHLnYS-3f0", {
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

    console.log('bitcoin address: ', overledger.dlts.bitcoin.account);
    console.log('ethereum address: ', overledger.dlts.ethereum.account);
    console.log('ripple address: ', overledger.dlts.ripple.account);

    // FAUCET
    console.log((await overledger.dlts.bitcoin.fundAccount()).data);
    console.log((await overledger.dlts.ethereum.fundAccount()).data);
    console.log((await overledger.dlts.ripple.fundAccount(250)).data);

  } catch (e) {
    console.error('error', e);
  }
})();
