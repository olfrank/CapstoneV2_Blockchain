import React from 'react';

import {MintContainer, MintHeader, MintSection} from './mintSectionElements'


const TokenSection = () =>{

    return(
      <TokenSection>
        <TokenContainer>
          <TokenHeader>tokenInformation.</TokenHeader>
          <InputContainer>
            <label>Contract Owner</label>
            <input type="text" class = "token-input" id="contractOwner" value={contractOwner} disabled="true"/>
            <button onClick={getOwner} class = "btn btn-contract-owner" >Get Contract Owner</button>
          </InputContainer>

          <InputContainer>
            <label>Token Owner</label>
            <input class = "token-input" type="text"  onChange={e => setTokenOwner(e.target.value)}/>
            <button onClick={getTokenOwnerInfo} class = "btn btn-contract-owner">Get Token Information</button>
          </InputContainer>

          <InputContainer>
          <label>Token Balance</label>
          <input type="text" class = "token-input" value={tokenBalance} disabled="true"/>
          </InputContainer>

          <DropMenuTokens>
            <label>Owned Tokens</label>
            <select id = "owned-tokens" class = "token-input" onChange={e =>setTokenItem(e.target.value)} >
              {ownedTokens.map(item =>{
                return(<option value={item}>{item}</option>)
              })}
            </select>
          </DropMenuTokens>

          <InputContainer>
            <label>Token ID</label>
            <input  type="text" class = "token-input" id="tokenId" value={tokenitem} disabled="true"/>
          </InputContainer>
          <InputContainer>
            <label>Token URI</label>
            <input type="text" class = "token-input" id="tokenURI" disabled="true"/>
          </InputContainer>
        </TokenContainer>
      </TokenSection>
    )
}

export default TokenSection;