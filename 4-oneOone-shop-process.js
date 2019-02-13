const OverledgerSDK = require("@quantnetwork/overledger-sdk").default;

//  ---------------------------------------------------------
//  -------------- BEGIN VARIABLES TO UPDATE ----------------
//  ---------------------------------------------------------
const mappId = 'iwoom.one';

// From script number 1
const insuranceAddress = '0x7431197dae6479ED236040173FD8c14cc37ECa0B';
const DVLAAddress = 'rJq1Y7BZwA1CW3auib2BgyWncJjithNG2N';

// From script number 2
const shopAccountEthereum = { address: '0xd7F21e003F87AE2e163A3fAe6271AF1d78B7ce1B',
privateKey:
 '0x7179f076dacf3683218763db74c0b0ff35620550d4002cf8dc154ce5a6518257' };
const shopAccountRipple =  { privateKey: 'snNEcr1Ba1xsV3odueaWx5MQAAFTu',
address: 'rPceAuq3Dv5jcEeyPEeVxHS5mq8priaphZ' };

// From script number 3
const buyerTransactionHash = 'c548a3ab1aeff33ba50d294c68121ba881b6e18e02c7d0e7fbd5daa9a97e17c8';
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
