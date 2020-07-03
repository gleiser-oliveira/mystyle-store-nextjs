import styled from 'styled-components';

export const StyledPage = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background: url('/static/memphis-mini.png');
    color: ${props => props.theme.black};
    overflow: hidden;
    min-height: 100vh;
`;

export const Inner = styled.div`
    width: 100%;
    max-width: ${props => props.theme.maxWidth};
    margin: 0 auto;
    padding: 2rem;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`;
