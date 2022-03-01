
import './App.css';

import { 
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
 } from './AppElements.js';




function App() {
  return (
    <>
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
                our available listings are on opensea, an open source NFT marketplace. 
                through the use zkSNARKS we are able securely prove the ownership of a 
                property without the need for a third party intermediary. Making the 
                process cheaper.
              </ExplainP>
          </ExplainContainer>
      </ExplainSection>



    </>
  );
}

export default App;
