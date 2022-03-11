import React, {useState } from 'react';

import {TokenContainer, TokenInfoSection, TokenHeader, InputContainer, DropMenuTokens} from './tokenSectionElements'


const TokenSection = (contract) =>{
  const [contractOwner, setContractOwner] = useState();
  const [tokenBalance, setTokenBalance] = useState(0);
  const [tokenOwner, setTokenOwner] = useState();

  const [ownedTokens, setOwnedTokens] = useState([]);
  const [tokenItem, setTokenItem] = useState();
  const [tokenURI, setTokenURI] = useState("");

  async function getContractOwner(){
    var owner = await contract.getOwner();
    setContractOwner(owner);
  }

  async function getTokenOwnerInfo(){
    var balance = await contract.balanceOf(tokenOwner);
    setTokenBalance(balance);

    var ownedTokens = await contract._tokensOfOwner(tokenOwner);
    setOwnedTokens(ownedTokens);
  }

  async function getTokenURI(){
    setTokenURI(await contract.tokenURI(tokenItem))
  }

    return(
      <TokenInfoSection>
        <TokenContainer>
          <TokenHeader>tokenInformation.</TokenHeader>
          <InputContainer>
            <label>Contract Owner</label>
            <input type="text" class = "token-input" id="contractOwner" value={contractOwner} disabled="true"/>
            <button onClick={getContractOwner} class = "btn btn-contract-owner" >Get Contract Owner</button>
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
                return(<option onClick={getTokenURI} value={item}>{item}</option>)
              })}
            </select>
          </DropMenuTokens>

          <InputContainer>
            <label>Token ID</label>
            <input  type="text" class = "token-input" id="tokenId" value={tokenItem} disabled="true"/>
          </InputContainer>
          <InputContainer>
            <label>Token URI</label>
            <input type="text" class = "token-input" id="tokenURI" value={tokenURI} disabled="true"/>
          </InputContainer>
        </TokenContainer>
      </TokenInfoSection>
    )
}

export default TokenSection;