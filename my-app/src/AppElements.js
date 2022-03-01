import styled from 'styled-components'



export const HeroSection = styled.div`
    display: flex;
    position: relative;
    justify-content: center;
    align-items: center;
    font-family: Eu Alonira;
    height: 100vh;
    background-image: url('./images/houseWhite.jpeg'); 
    background-repeat: no-repeat;
    background-position: top;
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


export const ExplainSection = styled.div`
    height: 100vh;
    width: 100%;
    margin-top: 10%;
    color: rgb(39, 39, 39);
    /* margin-top: 0rem; */
    align-items: center;
    overflow: hidden;
    position: relative;
    z-index:3;
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
    margin-right: 15%;
    text-decoration: underline;
`
export const ExplainP = styled.p`
    font-size: 1.3em;
    margin-right: 7%;
    margin-left: 30%;
`

export const IntroSection = styled.div`
    height: 100vh;
    width: 100%;
    float: right;
    /* background: transparent; */
    /* background-image: url('./client/images/buildingsStreet.jpeg'); 
    background-repeat: no-repeat;
    background-position: bottom;
    background-size: cover;
    overflow: hidden; */
    color: #000;
    margin-top: 0rem;
    align-items: center;
    float: left;
    /* overflow: hidden; */
    position: relative;
    z-index:3;
    margin-bottom: 10%;
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
    margin-top: 15%;
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