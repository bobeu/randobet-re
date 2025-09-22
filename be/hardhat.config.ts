import { config as dotconfig } from "dotenv";
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-deploy";
import "@nomiclabs/hardhat-web3";
import "@nomicfoundation/hardhat-viem";

dotconfig();

const config: HardhatUserConfig = {
  paths: {
    deploy: 'deploy',
    deployments: 'deployments',
    imports: 'imports'
  },
  networks: {
     sepolia: {
      // url: "https://sepolia-forno.celo-testnet.org",
      url: "https://forno.celo-sepolia.celo-testnet.org",
      accounts: [`${process.env.P_KEY_0xD7c}`],
      chainId: 11142220,
    },
    celo: {
      chainId: 42220,
      accounts: [`${process.env.P_KEY_far}`],
      url: 'https://forno.celo.org',
    },
  },

  namedAccounts: {
    deployer: {
      default: 0,
      11142220: `privatekey://${process.env.P_KEY_0xD7c}`,
      42220: `privatekey://${process.env.P_KEY_far}`
    },
    escapeAddr: {
      default: 1,
      11142220: `privatekey://${process.env.P_KEY_0xD7c}`,
      42220: `privatekey://${process.env.P_KEY_0x84F}`
    },
    usd : {
      default: 1,
      44787: "0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1",
      11142220: "0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1",
      42220: "0x765de816845861e75a25fca122bb6898b8b1282a ",
    },
     identityVerificationHub: {
      default: 2,
      44787: '0x68c931C9a534D37aa78094877F46fE46a49F1A51',
      11142220: '0x68c931C9a534D37aa78094877F46fE46a49F1A51', ///
      42220: '0xe57F4773bd9c9d8b6Cd70431117d353298B9f5BF'
    },
  },

  solidity: {
    version: "0.8.28",
    settings: {          // See the solidity docs for advice about optimization and evmVersion
      optimizer: {
        enabled: true,
        runs: 200,
      },
      evmVersion: "constantinople"
      }
    },
};

export default config;
