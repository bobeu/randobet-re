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
    bsct: {
      url: "https://bsc-testnet-rpc.publicnode.com",
      accounts: [`${process.env.P_KEY_0xD7c}`],
      chainId: 97,
    },
    bscm: {
      url: "https://bsc-dataseed1.binance.org/",
      accounts: [`${process.env.P_KEY_0xD7c}`],
      chainId: 56,
    },
     alfajores: {
      url: "https://alfajores-forno.celo-testnet.org",
      accounts: [`${process.env.P_KEY_0xC0F}`],
      chainId: 44787,
    },
    celo: {
      chainId: 42220,
      accounts: [`${process.env.P_KEY_farc}`],
      url: 'https://forno.celo.org',
    },
  },

  namedAccounts: {
    deployer: {
      default: 0,
      44787: `privatekey://${process.env.P_KEY_0xC0F}`,
      42220: `privatekey://${process.env.P_KEY_farc}`
    },
    usd : {
      default: 1,
      44787: "0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1",
      42220: "0x765de816845861e75a25fca122bb6898b8b1282a ",
    },
     identityVerificationHub: {
      default: 2,
      44787: '0x68c931C9a534D37aa78094877F46fE46a49F1A51',
      11142220: '0x68c931C9a534D37aa78094877F46fE46a49F1A51', ///
      42220: '0xe57F4773bd9c9d8b6Cd70431117d353298B9f5BF'
    },

    vrf: {
      default: 3,
      44787: '',
      42220: ''
    },
    forwarder: {
      default: 2,
      97: "0x511996ac76E72b8B30a8dAE70dEbb150927f531E",
      // 56: ""
    }
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
