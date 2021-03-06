import styled from 'styled-components';


export const MintNFTSection = styled.div`
    height: 100vh;
    width: 100%;
    margin-top: 10%;
    color: rgb(39, 39, 39);
    align-items: center;
    margin-bottom: 30%;
    position: relative;
    z-index:3;
    font-family: Eu Alonira;
`

export const MintContainer = styled.div`
    background-color: #d69c8a;
    position: relative;
    padding: 5%;
    width: 60%;
    // height: 100%;
    margin: auto;
    
    word-spacing: 10px;
    letter-spacing: 1px;
    text-align: left;
    box-shadow: none;
    transition: box-shadow 200ms ease 0s, transform 200ms ease 0s;
 

    &:hover{
        transform: translate(-10px, 10px);
        box-shadow: 20px -20px 0 #50372f;
    }
`
export const MintHeader = styled.h1`
    text-decoration: underline;
`;

export const SubHeading = styled.h2`
    text-decoration: underline;
`;

export const InputContainer = styled.div`
    margin: 2%;
    font-family: Eu Alonira;
`;
export const Info = styled.p`

`;


