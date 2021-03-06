import styled, { keyframes } from 'styled-components';

export const DropDown = styled.div`
    position: absolute;
    width: 100%;
    z-index: 2;
    border: 1px solid ${props => props.theme.lightGrey};
`;

export const DropDownProduct = styled.div`
    border-bottom: 1px solid ${props => props.theme.lightGrey};
    background: ${props => (props.highlighted ? '#f7f7f7' : 'white')};
    padding: 1rem;
    transition: all 0.2s;
    ${props => (props.highlighted ? 'padding-left: 2rem;' : null)};
    display: flex;
    align-items: center;
    border-left: 10px solid ${props => (props.highlighted ? props.theme.lightGrey : 'white')};
    img {
        margin-right: 10px;
    }
`;

const glow = keyframes`
    from {
        box-shadow: 0 0 0px yellow;
    }

    to {
        box-shadow: 0 0 10px 1px yellow;
    }
`;

export const SearchArea = styled.div`
    position: relative;
    input {
        width: 100%;
        padding: 10px;
        border: 0;
        font-size: 2rem;
        &.loading {
            animation: ${glow} 0.5s ease-in-out infinite alternate;
        }
    }
`;
