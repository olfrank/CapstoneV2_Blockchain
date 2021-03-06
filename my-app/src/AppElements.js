import styled from 'styled-components';
import whiteHouse from './images/houseWhite.jpeg';


export const Body = styled.div`
    height: 120%;
    width: 100%;
    margin: 0;
    font-family: Eu Alonira;
    background-color: #9cbdd2;
`;

export const HeroBg = styled.div`
        
    height: 160vh;
    background-image: url(${whiteHouse}); 
    background-repeat: no-repeat;
    background-position: top;
    background-size: cover;
    overflow: hidden;
    position: fixed;
    width: 100%;
    
`;


export const HeroSection = styled.div`
    display: flex;
    position: fixed;
    justify-content: center;
    align-items: center;
    font-family: Eu Alonira;
    height: 100vh;
    width: 100%;
    background-attachment: fixed;
    z-index: 1;
`;

export const HeroTitle = styled.div`
    width: 100vw; 
    height: 100vh;
    margin-top: 10%;
    text-align: center;
    font-size: 9vh;
    transform-origin: center top;
    color: #3c313d;
`;

export const HeroSubheading = styled.div`
    font-size: 2.9vh;
    margin-top: -4%;
    color: #3d3138;
    

`;

export const Connect = styled.div`
    display: flex;
    position: fixed;
    float: right;
    z-index: 3;
    margin-top: 13%;
    margin-left: 2%;

`;

export const ConnectButton = styled.button`
    border: none;
    background-color: #8ad1d6;
    color: rgb(39, 39, 39);
    padding: 8px;
    width: 11em;
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
    height: 60%;
    width: 60%;
    padding: 5%;
    background-color: #c7ae9d;
    margin: auto;
    word-spacing: 10px;
    letter-spacing: 1px;
    position: relative;
    z-index: 4;

    transition: box-shadow 200ms ease 0s, transform 200ms ease 0s;

    &:hover{
        transform: translate(10px, 10px);
        box-shadow: -20px -20px 0 #5c5149;
    }
`;

export const IntroHeader = styled.h2`
    font-size: 2em;
    position: relative;
    text-decoration: underline;
`;

export const IntroP = styled.p`
    text-align: left;
    font-size: 1.3em;
    position: relative;

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
    padding: 10%;
    width: 60%;
    height: 60%;
    margin: auto;
    word-spacing: 10px;
    letter-spacing: 1px;
    text-align: left;

    transition: box-shadow 200ms ease 0s, transform 200ms ease 0s;
 

    &:hover{
        transform: translate(-10px, 10px);
        box-shadow: 30px -30px 0 #585543;
    }
`

export const ExplainHeader = styled.h2`
    font-size: 2em;
    text-decoration: underline;
`
export const ExplainP = styled.p`
    font-size: 1.3em;
`


