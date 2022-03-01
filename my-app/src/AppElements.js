import styled from 'styled-components';
import whiteHouse from './images/houseWhite.jpeg';


export const Body = styled.div`
    height: 100%;
    width: 100%;
    margin: 0;
    font-family: Eu Alonira;
    background-color: #9cbdd2;
`;


export const HeroSection = styled.div`
    display: flex;
    position: fixed;
    justify-content: center;
    align-items: center;
    font-family: Eu Alonira;
    height: 100vh;
    background-image: url(${whiteHouse}); 
    background-repeat: no-repeat;
    background-position: fixed;
    background-size: cover;
    overflow: hidden;
    width: 100%;
    font-size: 1.2em;
    background-attachment: fixed;
    z-index: 1;
`;

export const HeroTitle = styled.div`
    width: 100vw; 
    height: 100vh;
    text-align: center;
    position: fixed;
    font-size: 5vw;
    transform-origin: center top;
`;






export const IntroSection = styled.div`
    height: 100vh;
    width: 100%;
    float: right;
    background-repeat: no-repeat;
    background-position: bottom;
    background-size: cover;
    overflow: hidden;
    color: #000;
    margin-top: 0rem;
    align-items: center;
    float: left;
    position: relative;
    z-index:3;
    margin-top: 53%;
    margin-bottom: 20%;

    font-family: Eu Alonira;
`;

export const IntroContainer = styled.div`
    height: 100vh;
    width: 100%;
    background-color: #c7ae9d;
    /* margin: 0%; */
    word-spacing: 10px;
    letter-spacing: 1px;
    position: relative;
    float: right;
    z-index: 4;
    margin: 10%;
`;

export const IntroHeader = styled.h2`
    font-size: 2em;
    position: relative;
    margin-top: 5%;
    margin-left: 15%;
    text-decoration: underline;
`;

export const IntroP = styled.p`
    text-align: left;
    font-size: 1.3em;
    width: 50%;
    position: relative;
    margin-left: 15%;
`;






export const ExplainSection = styled.div`
    height: 100vh;
    width: 100%;
    margin-top: 10%;
    color: rgb(39, 39, 39);
    align-items: center;
    overflow: hidden;
    position: relative;
    z-index:3;
    font-family: Eu Alonira;
    margin-bottom: 20%;
`

export const ExplainContainer = styled.div`
    background-color: #c1ba95;
    padding:10%;
    width: 80%;
    height: 80%;
    margin: 10%;
    word-spacing: 10px;
    letter-spacing: 1px;
    text-align: right;
`

export const ExplainHeader = styled.h2`
    font-size: 2em;
    margin-right: 5%;
    text-decoration: underline;
`
export const ExplainP = styled.p`
    font-size: 1.3em;
    margin-right: 7%;
    margin-left: 30%;
`

export const MintSection = styled.div`
    height: 100vh;
    width: 100%;
    margin-top: 10%;
    color: rgb(39, 39, 39);
    align-items: center;
    overflow: hidden;
    position: relative;
    z-index:3;
    font-family: Eu Alonira;
`

export const MintContainer = styled.div`
    background-color: #9fc195;
    position: relative;
    float: right;
    padding:10%;
    width: 80%;
    height: 80%;
    margin: 10%;
    word-spacing: 10px;
    letter-spacing: 1px;
    text-align: left;
`

export const Connect = styled.div`
    display: flex;
    position: fixed;
    float: right;
    z-index: 3;
    margin-top: 13%;
    margin-left: 10%;

`;

export const ConnectButton = styled.button`
    border: none;
    background-color: #8ad1d6;
    color: rgb(39, 39, 39);
    padding: 20px;
`;