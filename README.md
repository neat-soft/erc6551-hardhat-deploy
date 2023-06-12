# Hardhat Deploy ERC6551

This project demonstrates an advanced Hardhat use case, integrating other tools commonly used alongside Hardhat in the ecosystem.

The project comes with a sample contract, a test for that contract, a sample script that deploys that contract, and an example of a task implementation, which simply lists the available accounts. It also comes with a variety of other tools, preconfigured to work with the project code.

Try running some of the following tasks:

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
npx hardhat help
npx hardhat coverage
npx hardhat run scripts/deploy.js
node scripts/deploy.js
```

## Installation


Install the dependencies:

```bash
npm install
```

Set the environment variables:

```bash
cp .env.example .env

# open .env and modify the environment variables (private key)
```

## Deploy contract

```shell
npx hardhat run --network goerli scripts/deploy.js

# You can see two contract addresses in console
```
