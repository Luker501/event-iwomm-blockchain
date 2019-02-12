const OverledgerSDK = require("@quantnetwork/overledger-sdk").default;

const insuranceAddress = '0xc649a789D0e5aAD359d0a92B2AA32Ab721Bae9f0';
const DVLAAddress = 'rwBViSeW9fKC8NYGt9KSGcMEe6kr3ob63K';


const buyerTransactionHash = '5bbf261cf3333b78240f6586f68a427845b82a4d2e1f53adec05e404db383e2a';

; (async () => {
  try {
    const overledger = new OverledgerSDK("shop.iwoom", "DkucSXHTIKsNoT7EX9kfpvkVyorhSoa4odHLnYS-3f0", {
      dlts: [{ dlt: "bitcoin" }, { dlt: 'ethereum' }, { dlt: 'ripple' }],
      network: 'testnet',
    });

    const result = (await overledger.readTransactionsByMappId()).data;
    console.log(JSON.stringify(result, null, 2));
  } catch (e) {
    console.error('error', e);
  }
})();
