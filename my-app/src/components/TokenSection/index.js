import React, {useState } from 'react';

import {TokenContainer, TokenInfoSection, TokenHeader, InputContainer, DropMenuTokens} from './tokenSectionElements'


const TokenSection = () =>{
  const [tokenBalance, setTokenBalance] = useState(0);
  const [tokenOwner, setTokenOwner] = useState();

  const [ownedTokens, setOwnedTokens] = useState([]);
  const [tokenitem, setTokenItem] = useState();

  async function getOwner(){
    var owner = await contract.getOwner();
    setContractOwner(owner);
  }

  async function getTokenOwnerInfo(){
    var balance = await contract.balanceOf(tokenOwner);
    setTokenBalance(balance);

    var ownedTokens = await contract._tokensOfOwner(tokenOwner);
    setOwnedTokens(ownedTokens);
  }

  async function getTokenInfo(){
    
  }

    return(
      <TokenInfoSection>
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
      </TokenInfoSection>
    )
}

export default TokenSection;