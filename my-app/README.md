# Capstone Project 
# Decentralised Property Listing Application 
## Overview
### The Project
- This project is a proof of property ownership layer which tokenises a users title to a property. Before a user mints a token, they must verify the ownership of a property. In order to do this, zk-SNARKS has been implemented to create a verification system. This system proves that the user has their title to the property without revealing specific/sensitive information about the property. 
### zkSNARKs
- In this project, zkSNARKs has been implemented using ZoKrates, a toolbox for zkSNARKs on Ethereum. ZoKrates provides a higher level programming language which compiles down to the underlying constraint system and thus allows programmers to write snarks much closer to how they are used to programming. Docker has also been used to intialise and setup ZoKrates. 
### OpenSea
- Property tokens are listed on OpenSea, a decentralised marketplace used for selling digital assets on Ethereum. 
<br>

# Deployed Contracts

# Smart Contracts and Testing
<!-- ![](./images/tests.png =50x10) -->
<img src="./images/tests.png =50x10" width="50%">

### Testing
- Chai: BDD / TDD assertion library for node.
- Mocha: JS test framework running on Node.js and in the browser for asynchronous testing.
- Waffle: Library for writing and testing smart contracts.
- Hardhat plugins: hardhat/ethers (plugin for integration with ethers.js). 

### Dev Libraries and Tools
- React.js: a free and open-source front-end JavaScript library for building user interfaces based on UI components.
- Hardhat: Ethereum development environment.
- ethers.js: JS/TS library for interacting with the Ethereum blockchain and its ecosystem.
- OpenZeppelin: provides security products to build, automate, and operate decentralized applications.


# Generating Proof from ZoKrates
1. Navigate to project folder: `cd CapstoneV2/my-app/zokrates/code/`

2. Make sure Docker is running

3. Run the ZoKrates docker image: `docker run -v /Users/OllieFrancis/Documents/UDACITYprojects/CapstoneV2/my-app/zokrates/code:/home/zokrates/code -ti zokrates/zokrates /bin/bash`

4. `cd code/square`

5. Compile the program `zokrates compile -i square.code`

6. Generate the trusted setup `zokrates setup`

7. Compute witness for your chosen pair of numbers. The project already contains proof for [3,9] so replace 3 9 for two different numbers. `zokrates compute-witness -a 3 9`

8. Generate proof `zokrates generate-proof`

9. Export verifier.sol `zokrates export-verifier`


