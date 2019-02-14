const OverledgerSDK = require("@quantnetwork/overledger-sdk").default;

//  ---------------------------------------------------------
//  -------------- BEGIN VARIABLES TO UPDATE ----------------
//  ---------------------------------------------------------
const mappId = 'network.quant.onehundredonedreamcars';

// From script number 1
const insuranceAddress = '0x43Cf40c19A71DA810E37DbccE0199cc09789C60B';
const dvlaAddress = 'rsNze7gZYkxAXPPjVgBZLpQQ79iZCqs9Hr';

// From script number 2
const shopAccountEthereum = { 
  address: '0x3EE0778D7a2be8E91c0e62C74621Cb7622F5987e',
  privateKey: '0x28bfd56677735aa4b910ab33a3721de439297c3eb568cf2d92584938516577db'
};
const shopAccountRipple =  { 
  address: 'rwMEJqXfTyuQprZBLbMiaU8tfTGArkdnrZ',
  privateKey: 'snTHzDZFnUowc1zhdy1E8NUXE9VUr'
 };

// From script number 3
const buyerTransactionHash = 'c60e415fd6045e56ab643ba484fc9fe1cc927c241112a43a21fa9ab8d7645d77';
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
    overledger.dlts.ethereum.setAccount(shopAccountEthereum.privateKey);
    overledger.dlts.ripple.setAccount(shopAccountRipple.privateKey);

    console.log('TRANSACTION FOUND!');

    const signedTransactions = await overledger.sign([
      {
        dlt: 'ethereum',
        toAddress: insuranceAddress,
        message: `Bought car from transaction: ${buyerTransactionHash}, transaction.message`, // TODO: Make that dynamic
        options: {
          amount: 1,
          feeLimit: 2100000,
          feePrice: 21000,
          sequence: 0,
        }
      },
      {
        dlt: 'ripple',
        toAddress: dvlaAddress,
        message: `Bought car from transaction: ${buyerTransactionHash}, VRN: QNT-123`,
        options: {
          sequence: 1,
          amount: '1',
          feePrice: '0.000012',
          maxLedgerVersion: 4294967295,
        }
      }
    ]);
    console.log(signedTransactions);

    console.log('Purchase insurance and dvla:');
    const result = (await overledger.send(signedTransactions)).data;
    console.log(JSON.stringify(result, null, 2));
  } catch (e) {
    console.error('error', e);
  }
})();
