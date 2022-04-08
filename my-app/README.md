# zkProperties 

<br>

# Decentralised Property Listing Application 

<br>

## Overview

<br>

### The Project
- This project is a decentralised property listing application on Ethereum. It solves the problem of using paper-based property titles which has created the opportunity for errors and fraud. 

- Any identified defects in titles makes it illegal to transfer a property title to a buyer. Resultantly, owners often incur high legal fees to ensure authenticity and accuracy of their property titles.

- The solution is to leverage blockchain to build an immutable digital record of land titles for greater transparency which will help to reduce the risk of title fraud and the need for additional insurance. 

- This projects uses zkSNARKs (Zero Succinct Non-Interactive Arguments of Knowledge) to verify a buyer’s title to a property without revealing sensitive information.  

- Before a user mints a token, they must verify the ownership of a property. In order to do so, they must provide a solution to a problem that only the owner would know. The problem used in this application is a square root function. Only the owner knows the input and the answer so this should prove as a simple but effective method of verification. 

- To make this application more applicable to a real world scenario, instead of a square root function, the owner could hash  valid documentation and compared its value to a corresponding hash value on record. This would provide a truth/false validation of ones ownership to a property title. 

### zkSNARKs
- zkSNARKs allows you to verify, with cryptographic certainty, that someone else has computed a value and that they’ve done so by a process which you can verify all without having to witness the actual computation. Its a way to quickly prove something, without interacting with anyone else, in a way that is difficult to hack, can’t be replicated, and can be done without you needing to tell anyone what you’re trying to prove.  

- In this project, zkSNARKs has been implemented using ZoKrates, a toolbox for zkSNARKs on Ethereum. ZoKrates provides a higher level programming language which compiles down to the underlying constraint system. Docker has also been used to intialise and setup ZoKrates. 

### OpenSea
- Property tokens are listed on OpenSea, a decentralised marketplace used for selling digital assets on Ethereum. 

<br>

# Deployed Contracts
### Contracts deployed to the rinkeby test network and verified on Etherscan
- Verifier Contract Address: `0x8Db6F39A64266Eb4F3f973dA55771Cc821a64DF3` @ txn `0x075d42e4506199ba272ba979a951db2d5bc8708756de1990f7ceb5e2d8b6752b`

- SolnSquareVerifier Contract Address: `0x6cffb27E4da96624146EC10f565EB547C87150d4` @ txn `0x6751ad1a6d21f7efa715971f215889511d9c06af481879270e5bd367a8f21a80`

- OpenSea collection: https://testnets.opensea.io/collection/zkproperties

- Minting tx's: `
0x4827bb466d968c12c9a31b7a9a4ab5e8f78f68ec0b2e3a56cfd1a967262e5fa7
0x4044d8731b489549eb96d572f527f4499897b0e9216cc43148d9f4b2d3402bf4
0x39f261f6fc537880d8276c83274bf5e83b9c76bc0986d1ddbc98cec4563ae865
0x31259e5ab857256b6da32d296444f7d6bebaed976969fec73266dd97bb9f9091
0x5c37b16cbf31137325edcb5ad5e7cff7051500029c9554b1bbb848475a8989fe
0x499eaf836e2a6e50603877fb79c3976b09faf1d86b8e1341f45b354d195af6b6
0x7cec2880f8319c20f0eaca0d7780ecf711804eab5c3afc9b9f0e4c1cb6dfa039
0x3a8fbb84dba5a5d211e43afef51caf1f41908f985ec0c0fd11e0b9d0018437a4
0xe4cca5d2a52ffb7e31dc0c342eeb5ae3ce0b12b433e759b7004724082433ad72
0x4196e594ede91c3d84213648fd57d026381710adeb5965023a7f62700c98c53d`

- Buying tx's: `
0x3dd3b794cf2310c8fd03e1f0e0235f75e07605ad36ed3e0c09c14d77fc69814d 0xae1449f55fbbb3bf1702e9dcac628671e61ca219a01a216b21b5120a483b5852 0x85ee625a4ba48ca55516778c664bf7592516a6c2d8b388a5a3aeaceff0f69e2c 
0xc6c6a35bfba56d9c95f6e938091918c170c78840b9767ce8624bacffe79cafcf
0x84ed4ddb95784989db439143d82b17f1330fa967e0deda6fa5b559ae3191ce80
`


# Smart Contracts and Testing
<!-- ![](./images/tests.png =50x10) -->
<img src="images/tests.png" width="50%">
<br>

### Smart Contracts 
- `ERC721Mintable.sol`
- `ProvableAPI.sol`
- `SolnSquareVerifier`
- `Verifier.sol`

### Testing
- Test cases have been written in TypeScript.
- [Chai](https://www.chaijs.com/): BDD / TDD assertion library for node.
- [Mocha](https://mochajs.org/): JS test framework running on Node.js and in the browser for asynchronous testing.
- [Waffle](https://ethereum-waffle.readthedocs.io/en/latest/index.html): Library for writing and testing smart contracts.
- [Hardhat plugins](https://hardhat.org/plugins/nomiclabs-hardhat-ethers.html): hardhat/ethers (plugin for integration with ethers.js). 
<br>

### Dev Libraries and Tools
- [React.js](https://reactjs.org/): (create-react-app) a free and open-source front-end JavaScript library for building user interfaces based on UI components.
- [Hardhat](https://hardhat.org/): Ethereum development environment.
- [ethers.js](https://docs.ethers.io/v5/): JS/TS library for interacting with the Ethereum blockchain and its ecosystem.
- [OpenZeppelin](https://openzeppelin.com/): provides security products to build, automate, and operate decentralized applications.
- [Docker](https://www.docker.com/)
- [ZoKrates](https://zokrates.github.io/)

<br>

# Generating Proof from ZoKrates
1. Navigate to project folder: `cd CapstoneV2/my-app/zokrates/code/`

2. Make sure Docker is running

3. Run the ZoKrates docker image: `docker run -v <path to your project folder>:/home/zokrates/code -ti zokrates/zokrates /bin/bash`

4. `cd code/square`

5. Compile the program `zokrates compile -i square.code`

6. Generate the trusted setup `zokrates setup`

7. Compute witness for your chosen pair of numbers. The project already contains proof for [3,9] so replace 3 9 for two different numbers. `zokrates compute-witness -a 3 9`

8. Generate proof `zokrates generate-proof`

9. Export verifier.sol `zokrates export-verifier`

10. Generated Files are: `abi.json out proof.json proving.key verification.key verifier.sol witness`


