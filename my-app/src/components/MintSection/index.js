import { Contract } from 'ethers';
import React, { useState } from 'react';

import {MintContainer, MintHeader, MintNFTSection, InputContainer, SubHeading, Info} from './mintSectionElements'


const MintSection = (contract) =>{
  const [solution, setSolution] = useState({
    proofA1: "",
    proofA2: "",
    proofB1: "",
    proofB2: "",
    proofB3: "",
    proofB4: "",
    proofC1: "",
    proofC2: "",
  })

  async function addSolution(){
    await contract.addSolution(
      solution.proofA1,
      solution.proofA2,
      solution.proofB1,
      solution.proofB2,
      solution.proofB3,
      solution.proofB4,
      solution.proofC1,
      solution.proofC2,
    )
  }


    return(
        <MintNFTSection>
        <MintContainer>
          <MintHeader>mintNFT</MintHeader>
          <Info>
            To mint an NFT with a zero knowledge proof, first you must fire up ZoKrates, 
            A zkSNARKs tool to generate proof, by following the steps shown in here: 
            Then you copy the proofs thats are generated and input them respective to their 
            order. Once done, click 'addSolution' and proceed to mintNFT.

          </Info>
          <SubHeading>stepOne... addSolution</SubHeading>
          <InputContainer>
          <label>proof A (One)</label>
          <input type="text" placeholder={"0x5f28e8a..."} onChange={e => setSolution.proofA1(e.target.value)}/>
          <br/>
          <label>proof A (Two)</label>
          <input type="text" placeholder={"0x5f28e8a..."} onChange={e => setSolution.proofA2(e.target.value)}/>
          </InputContainer>

          <InputContainer>
          <label>proof B (One)</label>
          <input type="text" placeholder={"0x5f28e8a..."} onChange={e => setSolution.proofB1(e.target.value)}/>
          <br/>
          <label>proof B (Two)</label>
          <input type="text" placeholder={"0x5f28e8a..."} onChange={e => setSolution.proofB2(e.target.value)}/>
          <br/>
          <label>proof B (Three)</label>
          <input type="text" placeholder={"0x5f28e8a..."} onChange={e => setSolution.proofB3(e.target.value)}/>
          <br/>
          <label>proof B (Four)</label>
          <input type="text" placeholder={"0x5f28e8a..."} onChange={e => setSolution.proofB4(e.target.value)} />
          </InputContainer>

          <InputContainer>
          <label>proof C (One)</label>
          <input type="text" placeholder={"0x5f28e8a..."} onChange={e => setSolution.proofC1(e.target.value)}/>
          <br/>
          <label>proof C (Two)</label>
          <input type="text" placeholder={"0x5f28e8a..."} onChange={e => setSolution.proofC2(e.target.value)}/>
          <button onClick={addSolution}>addSolution</button>
          </InputContainer>


          <SubHeading>stepTwo... mintNFT</SubHeading>
          <Info>
            All you have to do here is input the numbers you inputed during the generation 
            of your proof, stepOne, and the address you wish to mint to. In most cases it would be your own. 

          </Info>
          <InputContainer>
          <label>inputOne</label>
          <input type="text" />
          <br/>
          <label>inputTwo</label>
          <input type="text" />
          <br/>
          <label>addressOfRecipient</label>
          <input type="text" />
          <button>mintNFT</button>
          </InputContainer>
        </MintContainer>
      </MintNFTSection>
    )
}

export default MintSection;