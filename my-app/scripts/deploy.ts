import {ethers} from 'hardhat';


const main = async()=>{

    const name = "zkProperties";
    const symbol = "ZKP";
    const baseTokenURI = "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/";

    const [deployer] = await ethers.getSigners();
    const bal = (await deployer.getBalance()).toString();
    console.log(`Deploying contracts with ${deployer.address}`);
    console.log(`Account balance of ${deployer.address}: ${bal}`);

    const Verifier = await ethers.getContractFactory("Verifier");
    const verifier = await Verifier.deploy();

    console.log(`verifier contract address is: ${verifier.address}`);

    const SolnSquareVerifier = await ethers.getContractFactory("SolnSquareVerifier");
    const solnSquareVerifier = await SolnSquareVerifier.deploy(verifier.address, name, symbol, baseTokenURI);
    console.log(`SolnSquareVerifier contract address is: ${solnSquareVerifier.address}`);


}

main()
    .then(()=> process.exit(0))
    .catch(error=>{
        console.log(error)
        process.exit(1)
})
