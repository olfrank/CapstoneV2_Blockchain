// import('hardhat/config').HardhatUserConfig;
require("dotenv").config();

import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-web3"
import "hardhat-gas-reporter";
import "@nomiclabs/hardhat-etherscan";
import { HardhatUserConfig } from 'hardhat/config';


const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.4",
  },

  networks:{
    rinkeby:{ // npx hardhat run --network rinkeby scripts/deploy.ts
      url: `${process.env.INFURA_KEY}`,
      accounts: [`${process.env.PRIVATE_KEY}`],
      chainId: 4,
      gas: 10000000,
    },
  },

  etherscan: {
    apiKey: `${process.env.ETHERSCAN_API_KEY}`,
  },

};
                                                            
export default config;
