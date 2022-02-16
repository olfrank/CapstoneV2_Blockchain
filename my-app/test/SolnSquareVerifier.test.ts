import { ethers } from "hardhat";
import { expect } from "chai";
import { Contract, BigNumber } from "ethers";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import verifierProof from '../zokrates/code/square/proof.json';

describe("SolnSquareVerifier", async()=>{
    
    let verifier: Contract;
    let squareVerifier: Contract;
    let owner: SignerWithAddress;
    let accountOne: SignerWithAddress;
    let accountTwo: SignerWithAddress;
    const name = "Test_Token";
    const symbol = "TT";
    const baseURI = "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/";
    

    before(async()=>{
        let Verifier = await ethers.getContractFactory("Verifier");
        let SolnSquareVerifier = await ethers.getContractFactory("SolnSquareVerifier");

        [owner, accountOne, accountTwo] = await ethers.getSigners();

        verifier = await Verifier.deploy();
        squareVerifier = await SolnSquareVerifier.deploy(verifier.address, name, symbol, baseURI);

        
    });

    describe("Init", ()=>{
        it("should initialise", async()=>{
            expect(verifier).to.be.ok;
            expect(squareVerifier).to.be.ok;
        })
    })

    describe("SolnSquareVerifier", async()=>{

        it("should not allow an incorrect solution to be added", async()=>{
            await expect(squareVerifier.connect(accountTwo).addSolution(
                verifierProof.proof.a,
                verifierProof.proof.b,
                verifierProof.proof.c, 
                [6,1]
            )).to.be.revertedWith("Transaction could not be verified with given arguments")
        })

        it("should add a new solution and emit event", async()=>{
            await expect(squareVerifier.connect(accountOne).addSolution(
                verifierProof.proof.a,
                verifierProof.proof.b,
                verifierProof.proof.c, 
                verifierProof.inputs
                )
            ).to.emit(
                squareVerifier, 
                "SolutionAdded"
                ).withArgs(
                    0, 
                    accountOne.address
                    );
        })

        it("should mint a new NFT and adjust balance of minter", async()=>{
            let balBefore = await squareVerifier.balanceOf(accountOne.address);

            await expect(squareVerifier.mintNewNFT(
                verifierProof.inputs, 
                accountOne.address)
                ).to.emit(
                    squareVerifier,
                    "MintedSolution"
                ).withArgs(
                    0, 
                    accountOne.address
                    );

            let balAfter = await squareVerifier.balanceOf(accountOne.address);
            expect(balBefore).to.eq(0);
            expect(balAfter).to.eq(1);
            expect(await squareVerifier.ownerOf(0)).to.eq(accountOne.address);
        })

        

        it("should not allow a solution that already exists to be added", async()=>{
            await expect(squareVerifier.connect(accountOne).addSolution(
                verifierProof.proof.a,
                verifierProof.proof.b,
                verifierProof.proof.c, 
                verifierProof.inputs
                )).to.be.revertedWith("This solution already exists")
        })
        
    })


})