# Platzi Web3 Exercise

## Goal

Create a DApp that allows people to vote on a (binary) proposal. Each ethereum address should be allowed to vote only once and the vote should cost 0.01 ETH.

When a user opens the page, it should see the result so far (number of positive votes vs. number of negative votes). Real-time updating is a bonus, but not required.

The app should consist only of a frontend. It should work in Görli and with MetaMask.

The contract is already deployed at `0xacfc7725527ba2ee4311574f65e5d76f9f9585e9`. You can see it [here](https://goerli.etherscan.io/address/0xacfc7725527ba2ee4311574f65e5d76f9f9585e9#code).


## Stack and tools

The only two requirements are:
1. Use React for the frontend
2. Use [web3.js](https://web3js.readthedocs.io/) and [ethers.js](https://docs.ethers.io/). The user should be able to switch between the two libraries and everything should work the same.

Everything else is up to you. We recommend using [web3-react](https://github.com/NoahZinsmeister/web3-react), but it's not required.

You can get Görli ether [here](https://faucet.paradigm.xyz/).
