# IWOMM Developing on the Blockchain

> *Wednesday, 13th February 2019, 18:30 to 21:30, Lexis House, 30 Farringdon St, London*

<center>
    <img src="images/iwomm_blockchain_quant.jpeg">
</center>

## Introduction

An introduction to exploring the blockchain using [Quant Network's](https://www.quant.network) Overledger SDK. Kindly sponsored by [101Ways](https://www.101ways.com/) and [LexisNexis](http://www.lexisnexis.co.uk/en-uk/home.page).

Quant's Overledger is a platform that facilitates the development of decentralised, multi-chain applications which allows you build on the blockchain more quickly and efficiently.

During the next 101 minutes we will build the skeleton of a multi-chain application backend for a distributed commerce application: **101 Dream Cars**.

## Running order

1. Short presentation about Overledger
2. What you will be building **101 Dream Cars**
3. Setting up the environment
4. Application flow / outline

## 101 Dream Cars

<center>
    <img src="images/donkervoort-d8-gto-40-3-web.jpg" width="200" height="100">
    <img src="images/spycker_c8-Preliator.jpg" width="200" height="100">
    <img src="images/camaro-ss.jpg" width="200" height="100">
</center>

**101 Dream Cars** is a one stop shop for dCommerce of unique motor vehicles. It prides itself on facilitating a single transaction where a buyer can:

* Purchase a car with *101 Cars* using **Bitcoin**
* Register a car with the *DVLA* using **Ripple**
* Insure a car with *Specialist Insurers* using **Ethereum**

In order to do this it utilises an online shop where it transacts with the buyer, and integrates with third party services. The transactions are recorded immutable on the respective blockchains as used by each of the services.

> In order to keep this demonstration practical we will focus on the integration with the blockchain opposed to building a nice front-end.

## Setting up the environment

> This session will focus on a JavaScript application.

Only one dependency is required [@quantnetwork/overledger-sdk](https://www.npmjs.com/package/@quantnetwork/overledger-sdk):

```sh
# npm
npm install @quantnetwork/overledger-sdk

# yarn
yarn add @quantnetwork/overledger-sdk
```

Link to [Quant Overledger SDK JavaScript](https://github.com/quantnetwork/overledger-sdk-javascript) for some guidance and information.

### Quant Developer Portal registration

> **PLEASE NOTE** To make best use of the time for this event we've disabled the checking for a MappId & BpiKey. As such you can choose your own version for those keys.

|attribute|suggestion|
|---|---|
|MappId|Unique identifier for the application, in this case the 101 Dream Cars shop. Suggest you use your email in reverse dot notation; i.e. `network.quant.dejong.jean-paul`|
|BpiKey|Specific key that can be updated an revoked by environment. You can use anything; i.e. `mybpikey`|

