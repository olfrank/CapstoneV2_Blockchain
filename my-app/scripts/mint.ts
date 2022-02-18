import {ethers, BigNumber} from 'ethers';
import dotenv from 'dotenv';
import SolnSquareVerifier from '../artifacts/contracts/SolnSquareVerifier.sol/SolnSquareVerifier.json'
import Proof1 from '../zokrates/code/square/first/proof.json';
import Proof2 from '../zokrates/code/square/second/proof.json';
import Proof3 from '../zokrates/code/square/third/proof.json';
import Proof4 from '../zokrates/code/square/fourth/proof.json';
import Proof5 from '../zokrates/code/square/fifth/proof.json';
import Proof6 from '../zokrates/code/square/sixth/proof.json';
import Proof7 from '../zokrates/code/square/seventh/proof.json';
import Proof8 from '../zokrates/code/square/eighth/proof.json';
import Proof9 from '../zokrates/code/square/ninth/proof.json';
import Proof10 from '../zokrates/code/square/tenth/proof.json';
dotenv.config();

const allProofs = [Proof1, Proof2, Proof3, Proof4, Proof5, Proof6, Proof7, Proof8, Proof9, Proof10];

const NFTCA = process.env.NFT_CONTRACT_ADDRESS;
const owner = process.env.OWNER_ADDRESS;
const SolnSquareAbi = SolnSquareVerifier.abi;

const getProvider = () =>{
    const infuraProvider = new ethers.providers.InfuraProvider(process.env.INFURA_KEY)
    return infuraProvider;
}

const getProof = (getProofData: any) => {
    return {
        a: [
            new BigNumber(16, getProofData.proof.a[0]).toNumber(),
            new BigNumber(16, getProofData.proof.a[1]).toNumber()
        ],
        b:[
            [
                new BigNumber(16, getProofData.proof.b[0][0]).toNumber(),
                new BigNumber(16, getProofData.proof.b[0][1]).toNumber()
            ],
            [
                new BigNumber(16, getProofData.proof.b[1][0]).toNumber(),
                new BigNumber(16, getProofData.proof.b[1][1]).toNumber()
            ]

        ],
        c: [
            new BigNumber(16, getProofData.proof.c[0]).toNumber(),
            new BigNumber(16, getProofData.proof.c[1]).toNumber()
        ],
        inputs: [
            new BigNumber(16, getProofData.inputs[0]).toNumber(),
            new BigNumber(16, getProofData.inputs[1]).toNumber(),
        ]
    }
}




const run = async () => {
    
const provider = getProvider();
const wallet = new ethers.Wallet(`${process.env.PRIVATE_KEY}`, provider);

const contract = new ethers.Contract(
    `${NFTCA}`,
    SolnSquareAbi,
    wallet
)

try{
    console.log("addSolution started");
    for(let i = 0; i< allProofs.length; i++){
        let proofData = getProof(allProofs[i]);
        let txn = await contract.addSolution(proofData.a, proofData.b, proofData.c, proofData.inputs);
        let tx = await txn.wait();
        let event = tx.events[0];
        let [value1, value2] = event.args;
        console.log({
            txn, 
            tx, 
            value1, 
            value2
        })
    }

}catch(error){
    console.log(error.message);
}

try{
    console.log("minting started");
    for(let i = 0; i< allProofs.length; i++){
        let proofData = getProof(allProofs[i]);
        let txn = await contract.mintNewNFT(proofData.inputs, owner);
        let tx = await txn.wait();
        let event = tx.events[0];
        let [value1, value2] = event.args;
        console.log({
            txn, 
            tx, 
            value1, 
            value2
        })
    }
    

}catch(error){
    console.log(error.message);
}

};

(async () => {
  try {
    await run();
  } catch (err) {
    // eslint-disable-next-line
    console.log("err: ", err);
    process.exit(1);
  }
  process.exit(0);
})();