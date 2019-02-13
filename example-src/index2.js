const OverledgerSDK = require("@quantnetwork/overledger-sdk").default;

const overledger = new OverledgerSDK("mappid.sx", "bpikey", {
  dlts: [{ dlt: "bitcoin" }, { dlt: "ethereum" }, { dlt: "ripple" }],
  network: 'testnet'
});

overledger.dlts.ripple.setAccount("snYfL2ddtvWoKFFUpP1MSu3P78QZn");

async function send() {
  try {

    const signed = await overledger.dlts.ripple.sign("rhGsNQ1vMq8cRjzLdQwMFdV65x53nZRr5E", "test js sdk", {
      amount: '1', feePrice: '0.000012', sequence: 1, maxLedgerVersion: 100000000
    });

    const sent = await overledger.dlts.ripple.send(signed);

    console.log(sent.error);

    console.log("\n--------------------------------\n");
  } catch (e) {
    console.log(e);
  }
}

send();
