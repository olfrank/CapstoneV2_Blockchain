import React, {useState } from 'react';
import SolnSquare from './abis/SolnSquareVerifier.json'
import { ethers } from 'ethers';
import './App.css';
import MintSection from './components/MintSection';
import TokenSection from './components/TokenSection';
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
  Connect,
  ConnectButton,
 } from './AppElements.js';


const contractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
const provider = new ethers.providers.Web3Provider(window.ethereum);
const contract = new ethers.Contract(contractAddress, SolnSquare.abi, provider);

function App() {

  const [errMessage, setErrMessage] = useState(null);
  const [connectButtonText, setConnectButtonText] = useState("Connect");
  
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
    setConnectButtonText(newAccount);
  }



  return (
    <Body>
      <Connect>
        <ConnectButton onClick={connectWalletHandler}>{connectButtonText.slice(0, 10)+'...'}</ConnectButton>
        {errMessage}
      </Connect>

      <HeroSection>
          <HeroTitle className = "animate__animated animate__fadeInLeft">
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
      <TokenSection contract = {contract}/>
      <MintSection contract = {contract}/>
    </Body>
  );
}

export default App;
