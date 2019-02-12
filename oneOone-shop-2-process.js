const OverledgerSDK = require("@quantnetwork/overledger-sdk").default;

const insuranceAccount = { address: '0xd6c3026b9c61B5b329590293d071a057bc71f321',
privateKey:
 '0xe0438be94b4d3886a67ea25ee45f792455fd4353a3f81e0f910ba6d9a0bc418d' };
const DVLAAccount = { privateKey: 'ssxsxwwPFTjft9EtReWP7mcS1fkFK',
address: 'rBBrFJMAyFDgbjESboYAGPDmHot3Ha8aNo' };

const buyerTransactionHash = 'cacda20e6fda3288b8eb134ee01de7593fd287fcf3e92e93f67972181713d571';

; (async () => {
  try {
    const overledger = new OverledgerSDK("shop.iwoom", "DkucSXHTIKsNoT7EX9kfpvkVyorhSoa4odHLnYS-3f0", {
      dlts: [{ dlt: "bitcoin" }, { dlt: 'ethereum' }, { dlt: 'ripple' }],
      network: 'testnet',
    });

    console.log('Shop:');
    overledger.dlts.ethereum.setAccount(insuranceAccount.privateKey);
    overledger.dlts.ripple.setAccount(DVLAAccount.privateKey);

    console.log('TRANSACTION FOUND!');

    const signedTransactions = await overledger.sign([
      {
        dlt: 'ethereum',
        toAddress: insuranceAccount.address,
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
        toAddress: DVLAAccount.address,
        message: `Bought car from transaction: ${buyerTransactionHash}, VRN: QNT-123`,
        options: {
          sequence: 1,
          amount: '1',
          feePrice: '2',
          maxLedgerVersion: 100000000,
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
