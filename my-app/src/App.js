import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <>
      <div class = "heroSection ">
          <div id= "expandable" class = "animate__animated animate__fadeInLeft">
              zk properties.
          </div>
      </div>

      <div class = "introSection">

          <div class = "introContainer">
              {/* <img src="./client/images/buildingsStreet.jpeg" alt=""> */}
              <h2><u>about.</u> </h2>

              <p>zk properties is a decentralised property listing application backed by the ethereum blockchain. we tokenise property listing, making the purchasing of an asset fast, secure, and with fewer hidden costs.</p>    
              {/* <p>through the use zkSNARKS we are able to securely prove ownership of a property without the need for a third party intermediary. Making the process less expensive for you.</p> */}
          </div>

      </div>

      <div class = "explainSection">
          <div class = "explainContainer">
              <h2><u>how it works. </u> </h2>

              <p>our available listing are on opensea, an open source NFT marketplace. 
                  through the use zkSNARKS we are able securely prove the ownership of a property without the need for a third party intermediary. Making the process cheaper.</p>
          </div>

      </div>
    </>
  );
}

export default App;
