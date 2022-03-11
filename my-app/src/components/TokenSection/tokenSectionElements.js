import styled from 'styled-components';

export const TokenInfoSection = styled.div`
    height: 100vh;
    width: 100%;
    margin-top: 10%;
    color: rgb(39, 39, 39);
    align-items: center;
    
    position: relative;
    z-index: 3;
    font-family: Eu Alonira;
`;

export const TokenContainer = styled.div`
    background-color: #9fc195;
    position: relative;
    justify-content: center;
    padding: 5%;
    width: 60%;
    height: 60%;
    margin: auto;
    
    word-spacing: 10px;
    letter-spacing: 1px;
    text-align: left;
    
    transition: box-shadow 200ms ease 0s, transform 200ms ease 0s;

    &:hover{
        transform: translate(10px, 10px);
        box-shadow: -20px -20px 0 #313c2e;
    }
`;

export const TokenHeader = styled.h1`
    text-decoration: underline;
`

export const InputContainer = styled.div`
    margin: 2%;
    font-family: Eu Alonira;
`;

export const DropMenuTokens = styled.div`
    margin: 2%;
    font-family: Eu Alonira;
`;
