import React, {useState} from 'react';
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
  Connect,
  ConnectButton
 } from './AppElements.js';




function App() {
  const [errMessage, setErrMessage] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [connectButtonText, setConnectButtonText] = useState("Connect");


  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);

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
  }

  return (
    <Body>
      <Connect>
        <ConnectButton onClick={connectWalletHandler}>{connectButtonText}</ConnectButton>
        {errMessage}
      </Connect>

      <HeroSection>
          <HeroTitle class = "animate__animated animate__fadeInLeft">
              zk properties.
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
                how it works.
              </ExplainHeader>
              <ExplainP>
                Our available listings are on opensea, an open source NFT marketplace. 
                Through the use zkSNARKS we are able securely prove the ownership of a 
                property without the need for a third party intermediary. Making the 
                process cheaper.
              </ExplainP>
          </ExplainContainer>
      </ExplainSection>

      <MintSection>
        <MintContainer>

        </MintContainer>
      </MintSection>



    </Body>
  );
}

export default App;
