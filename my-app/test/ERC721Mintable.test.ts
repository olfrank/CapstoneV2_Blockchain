import { ethers } from "hardhat";
import { expect } from "chai";
import { Contract, BigNumber } from "ethers";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

describe("ERC721Mintable", async()=>{
    let owner: SignerWithAddress;
    let accountOne: SignerWithAddress;
    let accountTwo: SignerWithAddress;
    let ercMintable: Contract;

    beforeEach(async()=>{

        const ErcMintable = await ethers.getContractFactory("ERC721Mintable");
        
        [owner, accountOne, accountTwo] = await ethers.getSigners();

        let name: "Test_Token"
        let symbol: "TT"
        // let uri: "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/"

        ercMintable = await ErcMintable.deploy(name, symbol, {from: owner});
    })

    describe("Init", ()=>{
        it("should initialise", async()=>{
            expect(ercMintable).to.be.ok;
        })
    });

    describe("Ownable contract", async()=>{
        it("should have made contract deployer the owner", async()=>{
            expect(await ercMintable.getOwner()).to.eq(owner);
        })
        
    })
        
    

})