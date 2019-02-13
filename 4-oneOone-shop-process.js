const OverledgerSDK = require("@quantnetwork/overledger-sdk").default;

//  ---------------------------------------------------------
//  -------------- BEGIN VARIABLES TO UPDATE ----------------
//  ---------------------------------------------------------
const mappId = 'iwoom.one';

// From script number 1
const insuranceAddress = '0x11Ae09e9751A21C28ffBa3b118B62f11664E5BcC';
const DVLAAddress = 'rhHQwHVaX1qW2V8xzbsGDZknUuFxuvtteU';

// From script number 2
const shopAccountEthereum = { address: '0xA72a14Cdca45D51326d394B2ddAFb408270Ae101',
privateKey:
 '0x95011ad4543e17a2debbd990ad8b7a1c2a7a927f48e62d2f068a50983f2b09b3' };
const shopAccountRipple =  { privateKey: 'sncVkJpFZGjfHkahGeXVM4d3fXZTU',
address: 'rhv4SEev5sxcfUW2tDAboT1o7AKww8MAe3' };

// From script number 3
const buyerTransactionHash = '14b3186a932e39bd4eaff495052b18e05431b7cabf4a45720ef2645d3b98c6d9';
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
        toAddress: DVLAAddress,
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
