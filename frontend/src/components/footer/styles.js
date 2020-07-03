import styled from 'styled-components';

export const StyledFooter = styled.footer`
    font-size: 1.1rem;
    font-weight: 100;
    height: 50px;
    width: 100vw;
    text-align: center;
    background-color: ${props => props.theme.mainColor};
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    a {
        color: white;
        font-weight: bolder;
        text-decoration: underline;
        &:visited {
            color: inherit;
        }
    }
`;
