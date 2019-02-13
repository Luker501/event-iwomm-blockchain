const OverledgerSDK = require("@quantnetwork/overledger-sdk").default;

//  ---------------------------------------------------------
//  -------------- BEGIN VARIABLES TO UPDATE ----------------
//  ---------------------------------------------------------
const mappId = 'iwoom.one';
//  ---------------------------------------------------------
//  -------------- END VARIABLES TO UPDATE ------------------
//  ---------------------------------------------------------

; (async () => {
  try {
    const overledger = new OverledgerSDK(mappId, "DkucSXHTIKsNoT7EX9kfpvkVyorhSoa4odHLnYS-3f0", {
      dlts: [{ dlt: "bitcoin" }, { dlt: 'ethereum' }, { dlt: 'ripple' }],
      network: 'testnet',
    });

    const result = (await overledger.readTransactionsByMappId()).data;
    console.log(JSON.stringify(result, null, 2));
  } catch (e) {
    console.error('error', e);
  }
})();
