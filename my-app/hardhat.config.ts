// import('hardhat/config').HardhatUserConfig;

import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-web3"
import "hardhat-gas-reporter";

const infuraKey = process.env.INFURA_KEY;
const privateKey = process.env.PRIVATE_KEY;

// npx hardhat run scripts/deploy.ts --network rinkeby


module.exports = {
  solidity: {
    version: "0.8.4",
  },
  networks:{
    // rinkeby:{
    //   url: `https://rinkeby.infura.io/v3/${infuraKey}`,
    //   accounts: [`${privateKey}`]
    // }
  } 
};
