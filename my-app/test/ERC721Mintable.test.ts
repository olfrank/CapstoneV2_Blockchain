import { ethers } from "hardhat";
import { expect } from "chai";
import { Contract, BigNumber } from "ethers";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

describe("ERC721Mintable", async()=>{
    let owner: SignerWithAddress;
    let accountOne: SignerWithAddress;
    let accountTwo: SignerWithAddress;
    let ercMintable: Contract;
    const zeroAddress = "0x0000000000000000000000000000000000000000";
    const tokenName = "Test_Token";
    const tokenSymbol = "TT";
    const uri = "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/";

    before(async()=>{

        const ErcMintable = await ethers.getContractFactory("ERC721Mintable");
        [owner, accountOne, accountTwo] = await ethers.getSigners();
        // console.log(`owner = ${owner.address}, accountOne =  ${accountOne.address}, accountTwo =  ${accountTwo.address}`)

        ercMintable = await ErcMintable.deploy(tokenName, tokenSymbol, uri);
    });

    describe("Init", ()=>{
        it("should initialise", async()=>{
            expect(ercMintable).to.be.ok;
        });
    });




    describe("Ownable contract", async()=>{

        it("should have made contract deployer the owner", async()=>{
            expect(await ercMintable.getOwner()).to.eq(owner.address);
        });

        it("should NOT allow for unauthorised to transfer ownership",async()=>{

            await expect( 
                ercMintable.connect(accountOne).transferOwnership(accountOne.address)
                ).to.be.revertedWith(
                    "You must be the owner of the contract to enter this function"
                    )
        });

        it("should revert when calling onlyOwner functions", async()=>{
            await expect(
                ercMintable.connect(accountOne).mint(accountOne.address, 1)
                ).to.be.revertedWith(
                "You must be the owner of the contract to enter this function"
                    )
            await expect(
                ercMintable.connect(accountOne).setPauseStatus(true)
                ).to.be.revertedWith(
                "You must be the owner of the contract to enter this function"
                    )
        });

        it("should transfer ownership of contract correctly", async()=>{
            await ercMintable.transferOwnership(accountOne.address);

            expect(await ercMintable.getOwner()).to.eq(accountOne.address);

            await ercMintable.connect(accountOne).transferOwnership(owner.address);

        });
    });

    describe("Pausable", async()=>{
        it("should allow for contract owner to pause the contract", async()=>{
            

            await expect(
                ercMintable.setPauseStatus(true)
                ).to.emit(
                    ercMintable, "Paused"
                    ).withArgs( 
                        true
                        )

            expect(await ercMintable.getPauseStatus()).to.eq(true);
        });

        it("should NOT allow for non-contract owner to pause the contract", async()=>{
            await expect(
                ercMintable.connect(accountOne).setPauseStatus(false)
            ).to.be.revertedWith(
                "You must be the owner of the contract to enter this function"
                )
        });

        it("should NOT allow the contract owner to set it to the existing value", async()=>{
            await expect(
                ercMintable.setPauseStatus(true)
            ).to.be.revertedWith(
                "You must initialise a different value"
                )
        });

        
    })




    describe("Matches erc721 spec", async()=>{
        let tokenIDs = [11, 22];

        it('should return correct name', async () =>{ 
            expect(await ercMintable.getName()).to.eq(tokenName)
        });

        it('should return correct symbol', async () =>{ 
            expect(await ercMintable.getSymbol()).to.eq(tokenSymbol)
        });

        it('should return the correct uri', async()=>{
            expect(await ercMintable.getBaseTokenURI()).to.eq(uri)
        });

        it('should return total supply', async () =>{ 
            await ercMintable.mint(accountOne.address, tokenIDs[0])
            expect(await ercMintable.totalSupply()).to.eq(1);
        });

        it('should get token balance', async () =>{ 
            expect(await ercMintable.balanceOf(accountOne.address)).to.eq(1);
        });

        // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
        it('should return token uri', async () =>{ 
            expect(await ercMintable.tokenURI(tokenIDs[0])).to.eq(`${uri}${tokenIDs[0]}`)
        });

        it('should approve a token for transfer', async function () { 
            await ercMintable.connect(accountOne).approve(accountTwo.address, tokenIDs[0]);
            expect(await ercMintable.getApproved(tokenIDs[0])).to.eq(accountTwo.address);
        });

        it("should transfer a token from one account to another", async()=>{
            await ercMintable.connect(accountOne).transferFrom(accountOne.address, accountTwo.address, tokenIDs[0])
            expect(await ercMintable.ownerOf(tokenIDs[0])).to.eq(accountTwo.address);
        });

        it("should approve contract to sell a token on a users behalf", async()=>{
            await ercMintable.mint(accountTwo.address, tokenIDs[1]);
            await ercMintable.connect(accountTwo).approve(owner.address, tokenIDs[1]);
            await ercMintable.transferFrom(accountTwo.address, accountOne.address, tokenIDs[1]);

            expect(await ercMintable.ownerOf(tokenIDs[1])).to.eq(accountOne.address);
            expect(await ercMintable.balanceOf(accountOne.address)).to.eq(1);
            expect(await ercMintable.totalSupply()).to.eq(2);
            expect(await ercMintable.tokenURI(tokenIDs[1])).to.eq(`${uri}${tokenIDs[1]}`)
        });

        it("should revert when transfering a token without approval", async()=>{
            await expect(
                ercMintable.connect(accountTwo).transferFrom(accountOne.address, accountTwo.address, tokenIDs[1])
                ).to.be.revertedWith(
                    "You must be the owner or approved by the owner of this token"
                    );
            expect(await ercMintable.balanceOf(accountTwo.address)).to.eq(1);
        });

        it("should not allow a transfer to a zero address",async()=>{
            await expect(
                ercMintable.connect(accountTwo).transferFrom(accountTwo.address, zeroAddress, tokenIDs[0])
                ).to.be.revertedWith(
                    "Must be a valid to address"
                    );
        })
    })
        
    

})