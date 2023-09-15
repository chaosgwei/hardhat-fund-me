<a name="readme-top"></a>

<!-- PROJECT SHIELDS -->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]



<!-- PROJECT INFO -->
<br />
<div align="center">
  <a href="https://github.com/chaosrei/hardhat-fund-me"></a>

<h3 align="center">hardhat-fund-me</h3>

  <p align="center">
    This project was designed to test the FundMe smart contract in a hardhat environment
    <br />
    <br />
    <a href="https://github.com/chaosrei/hardhat-fund-me/issues">Report Bug</a>
    ·
    <a href="https://github.com/chaosrei/hardhat-fund-me/issues">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#requirements">Requirements</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#deployment-to-a-testnet-or-mainnet">Deployment to a testnet or mainnet</a></li>
    <li><a href="#estimate-gas">Estimate gas</a></li>
    <li><a href="#license">License</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

This project was designed to test the FundMe smart contract in a hardhat environment. 

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

* [![Solidity][Solidity]][Solidity-url]
* [![Node][Node.js]][Node-url]
* [![Yarn][Yarn]][Yarn-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

### Requirements

- [git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- [Nodejs](https://nodejs.org/en/)
- [Yarn](https://yarnpkg.com/getting-started/install) instead of `npm`

### Installation

#### Quickstart
   ```sh
   git clone https://github.com/chaosrei/hardhat-fund-me.git
   cd hardhat-fund-me
   yarn
   ```
#### Setup environment variables

1. Create new app on the Sepolia network at [https://www.alchemy.com](https://www.alchemy.com) and copy HTTPS in the `API key` tab
2. Create an account at [https://etherscan.io/register](https://etherscan.io/register) to get the API key
3. Sign up for a free Developer Portal account at [https://pro.coinmarketcap.com](https://pro.coinmarketcap.com/)
4. Register new [Metamask](https://metamask.io/) account to test this smart contract on the Sepolia network. Save the private key in `.env` file
4. Enter your APIs in `.env`
   ```shell
    SEPOLIA_RPC_URL = your_alchemy_app_https
    PRIVATE_KEY = your_metamask_private_key
    ETHERSCAN_API_KEY = your_etherscan_api_key
    COINMARKETCAP_API_KEY = your_coinmarketcap_api_key
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

### Deploy
```shell
yarn hardhat deploy
```

### Unit test
```shell
yarn hardhat test
```
or
```shell
yarn test
```

### Staging test
```shell
yarn hardhat test --network sepolia
```
or
```shell
yarn test:staging
```

### Test Coverage
```shell
yarn hardhat coverage
```
or
```shell
yarn coverage
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- DEPLOYMENT -->
## Deployment to a testnet or mainnet

1. Setup environment variables. Detailed instructions [here.](#setup-environment-variables)

2. Get testnet ETH

Head over to [faucets.chain.link](https://faucets.chain.link/) and get some tesnet ETH. You should see the ETH show up in your metamask.

3. Deploy

```
yarn hardhat deploy --network sepolia
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ESTIMATE GAS -->
## Estimate gas

You can estimate how much gas things cost by running:
```shell
yarn hardhat test
```
or
```shell
yarn test
```
And you'll see and output file called `gas-report.txt`

### Estimate gas cost in USD

To get a USD estimation of gas cost, you'll need a `COINMARKETCAP_API_KEY` environment variable. You can get one for free from [pro.coinmarketcap.com](https://pro.coinmarketcap.com/).

To turn off the cost of gas in USD simply comment out the line `coinmarketcap: COINMARKETCAP_API_KEY,` in `hardhat.config.json`.

Here's an example:
```js
gasReporter: {
        enabled: true,
        outputFile: "gas-report.txt",
        noColors: true,
        currency: "USD",
        // coinmarketcap: COINMARKETCAP_API_KEY,
        token: "ETH",
    },
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
[contributors-shield]: https://img.shields.io/github/contributors/chaosrei/hardhat-fund-me.svg?style=for-the-badge
[contributors-url]: https://github.com/chaosrei/hardhat-fund-me/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/chaosrei/hardhat-fund-me.svg?style=for-the-badge
[forks-url]: https://github.com/chaosrei/hardhat-fund-me/network/members
[stars-shield]: https://img.shields.io/github/stars/chaosrei/hardhat-fund-me.svg?style=for-the-badge
[stars-url]: https://github.com/chaosrei/hardhat-fund-me/stargazers
[issues-shield]: https://img.shields.io/github/issues/chaosrei/hardhat-fund-me.svg?style=for-the-badge
[issues-url]: https://github.com/chaosrei/hardhat-fund-me/issues
[license-shield]: https://img.shields.io/github/license/chaosrei/hardhat-fund-me.svg?style=for-the-badge
[license-url]: https://github.com/chaosrei/hardhat-fund-me/blob/master/LICENSE.txt
[Solidity]: https://img.shields.io/badge/Solidity-%23363636.svg?style=for-the-badge&logo=solidity&logoColor=white
[Solidity-url]: https://docs.soliditylang.org/
[Node.js]: https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white
[Node-url]: https://nodejs.org/
[Yarn]: https://img.shields.io/badge/yarn-%232C8EBB.svg?style=for-the-badge&logo=yarn&logoColor=white
[Yarn-url]: https://yarnpkg.com/