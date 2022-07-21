import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import { HardhatUserConfig } from "hardhat/config";
import "hardhat-gas-reporter";
import "solidity-coverage";

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.9",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    hardhat: {
      gas: 15000000,
      gasPrice: 875000000,
      blockGasLimit: 15000000,
      allowUnlimitedContractSize: true,
    },
    coverage: {
      url: "http://127.0.0.1:8555", // Coverage launches its own ganache-cli client
    },
  },
  mocha: {
    timeout: 100000000,
  },
};

export default config;
