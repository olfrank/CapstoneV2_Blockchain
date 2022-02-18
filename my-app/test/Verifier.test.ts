import { ethers } from "hardhat";
import { expect } from "chai";
import { Contract } from "ethers";
// import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import verifierProof from '../zokrates/code/square/first/proof.json';

describe("Verifier", async()=>{
    let verifier: Contract;

    before(async()=>{
        let Verifier = await ethers.getContractFactory("Verifier");
        verifier = await Verifier.deploy();
    });

    describe("Init", ()=>{
        it("should initialise", async()=>{
            expect(verifier).to.be.ok;
        });
    });

    describe("verifier", async()=>{
        it("should verify a transaction as true", async()=>{
            expect(
                await verifier.verifyTx(
                    verifierProof.proof.a,
                    verifierProof.proof.b,
                    verifierProof.proof.c,
                    verifierProof.inputs
                )
            ).to.eq(true);
        

            // let receipt = await tx.wait();
            // console.log(receipt.events?.filter((x)=>{return x.event == "TxVerified"}))

        });

        // it("should emit TxVerfied event", async()=>{
        //     await expect(
        //         verifier.verifyTx(
        //             verifierProof.proof.a,
        //             verifierProof.proof.b,
        //             verifierProof.proof.c,
        //             verifierProof.inputs
        //         )).to.emit(
        //             verifier, 
        //             "TxVerified"
        //             ).withArgs(
        //                 "Transaction verified"
        //                 );
        // });


        it("should return false when incorrect proof is provided",async()=>{
            expect(
                await verifier.verifyTx(
                    verifierProof.proof.a,
                    verifierProof.proof.b,
                    verifierProof.proof.a,
                    verifierProof.inputs
                )
            ).to.eq(false);
        });

        it("should return false when incorrect input is provided", async()=>{
            expect(await verifier.verifyTx(
                    verifierProof.proof.a,
                    verifierProof.proof.b,
                    verifierProof.proof.c,
                    [18, 1]
            )).to.eq(false);
        });
    });
});