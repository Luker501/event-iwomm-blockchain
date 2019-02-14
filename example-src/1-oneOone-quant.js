const OverledgerSDK = require("@quantnetwork/overledger-sdk").default;

//  ---------------------------------------------------------
//  -------------- BEGIN VARIABLES TO UPDATE ----------------
//  ---------------------------------------------------------
const mappId = 'network.quant.onehundredonedreamcars';
//  ---------------------------------------------------------
//  -------------- END VARIABLES TO UPDATE ------------------
//  ---------------------------------------------------------

; (async () => {
  try {
    const overledger = new OverledgerSDK(mappId, "DkucSXHTIKsNoT7EX9kfpvkVyorhSoa4odHLnYS-3f0", {
      dlts: [{ dlt: "bitcoin" }, { dlt: 'ethereum' }, { dlt: 'ripple' }],
      network: 'testnet',
    });

    console.log('Third party services:');
    const insuranceEthereumAccount = overledger.dlts.ethereum.createAccount();
    const dvlaRippleAccount = overledger.dlts.ripple.createAccount();

    overledger.dlts.ethereum.setAccount(insuranceEthereumAccount.privateKey);
    overledger.dlts.ripple.setAccount(dvlaRippleAccount.privateKey);

    console.log('INSURANCE ethereum address: ', overledger.dlts.ethereum.account.address);
    console.log('INSURANCE ethereum privateKey: ', overledger.dlts.ethereum.account.privateKey);
    console.log('DVLA ripple address: ', overledger.dlts.ripple.account.address);
    console.log('DVLA ripple privateKey: ', overledger.dlts.ripple.account.privateKey);

    // FAUCET
    console.log('Ethereum faucet: ', (await overledger.dlts.ethereum.fundAccount()).data);
    console.log('Ripple faucet: ', (await overledger.dlts.ripple.fundAccount()).data);

  } catch (e) {
    console.error('error', e);
  }
})();
