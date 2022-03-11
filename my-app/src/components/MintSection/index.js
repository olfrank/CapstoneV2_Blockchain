import React from 'react';

import {MintContainer, MintHeader, MintNFTSection, InputContainer, SubHeading} from './mintSectionElements'


const MintSection = () =>{

    return(
        <MintNFTSection>
        <MintContainer>
          <MintHeader>mintNFT</MintHeader>
          <SubHeading>addSolution</SubHeading>
          <InputContainer>
          <label>Proof A (One)</label>
          <input type="text" placeholder="0x5f28e8a..."/>

          <label>Proof A (Two)</label>
          <input type="text" placeholder="0x5f28e8a..."/>
          </InputContainer>

          <InputContainer>
          <label>Proof B (One)</label>
          <input type="text" placeholder="0x5f28e8a..."/>

          <label>Proof B (Two)</label>
          <input type="text" placeholder="0x5f28e8a..."/>

          <label>Proof B (Three)</label>
          <input type="text" placeholder="0x5f28e8a..."/>

          <label>Proof B (Four)</label>
          <input type="text" placeholder="0x5f28e8a..."/>
          </InputContainer>

          <InputContainer>
          <label>Proof C (One)</label>
          <input type="text" placeholder="0x5f28e8a..."/>

          <label>Proof C (Two)</label>
          <input type="text" placeholder="0x5f28e8a..."/>
          </InputContainer>

          <InputContainer>
          </InputContainer>
        </MintContainer>
      </MintNFTSection>
    )
}

export default MintSection;