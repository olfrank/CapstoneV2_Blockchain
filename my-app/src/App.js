import React, {useState } from 'react';
import SolnSquare from './abis/SolnSquareVerifier.json'
import { ethers } from 'ethers';
import './App.css';

import { 
  Body,
  ExplainSection, 
  ExplainContainer, 
  IntroSection, 
  IntroContainer, 
  ExplainHeader, 
  IntroHeader, 
  ExplainP, 
  IntroP, 
  HeroSection,
  HeroTitle,
  MintSection,
  MintContainer,
  MintHeader,
  Connect,
  ConnectButton,
  TokenContainer,
  TokenSection,
  TokenHeader, 
  InputContainer,
  DropMenuTokens
 } from './AppElements.js';




function App() {

  const contractAddress = "0x6cffb27E4da96624146EC10f565EB547C87150d4";

  const [errMessage, setErrMessage] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [connectButtonText, setConnectButtonText] = useState("Connect");


  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [contractOwner, setContractOwner] = useState();


  const [tokenBalance, setTokenBalance] = useState(0);
  const [tokenOwner, setTokenOwner] = useState();

  const [tokenBal, setTokenBal] = useState();
  const [ownedTokens, setOwnedTokens] = useState([]);
  const [tokenitem, setTokenItem] = useState();
 
  const connectWalletHandler = () =>{
    if(window.ethereum){
       window.ethereum.request({method: 'eth_requestAccounts'})
       .then(res =>{
          accountChangedHandler(res[0]);
          
       })
    }else{
      setErrMessage("NEED TO INSTAll METAMASK")
    }
  }

  const accountChangedHandler = (newAccount) =>{
    setDefaultAccount(newAccount);
    setConnectButtonText(newAccount);
    updateEthers();
  }

  const updateEthers = ()=>{
    let tempProvider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(tempProvider);

    let tempSigner = tempProvider.getSigner();
    setSigner(tempSigner);

    let tempContract = new ethers.Contract(contractAddress, SolnSquare.abi, tempSigner);
    setContract(tempContract);
  }

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




  return (
    <Body>
      <Connect>
        <ConnectButton onClick={connectWalletHandler}>{connectButtonText}</ConnectButton>
        {errMessage}
      </Connect>

      <HeroSection>
          <HeroTitle class = "animate__animated animate__fadeInLeft">
              zkProperties.
          </HeroTitle>
      </HeroSection>

      

      <IntroSection>
          <IntroContainer>
              <IntroHeader>
                about.
              </IntroHeader>
              <IntroP>
                zk properties is a decentralised property listing application backed by 
                the ethereum blockchain. We tokenise property listing, making the 
                purchasing of an asset fast, secure, and with fewer hidden costs.
              </IntroP>    
              {/* <p>through the use zkSNARKS we are able to securely prove ownership of a property without the need for a third party intermediary. Making the process less expensive for you.</p> */}
          </IntroContainer>
      </IntroSection>


      <ExplainSection>
          <ExplainContainer>
              <ExplainHeader>
                howItWorks.
              </ExplainHeader>
              <ExplainP>
                Our available listings are on opensea, an open source NFT marketplace. 
                Through the use zkSNARKS we are able securely prove the ownership of your 
                property without the need for a third party intermediary. Making the 
                process cheaper, and quite frankly easier.
              </ExplainP>
          </ExplainContainer>
      </ExplainSection>

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

      <MintSection>
        <MintContainer>
          <MintHeader>mintNFT</MintHeader>

        </MintContainer>
      </MintSection>



    </Body>
  );
}

export default App;
