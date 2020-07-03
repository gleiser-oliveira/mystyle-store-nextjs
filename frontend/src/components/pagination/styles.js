import styled from 'styled-components';

export const PaginationStyle = styled.div`
    text-align: center;
    background-color: white;
    display: inline-grid;
    grid-template-columns: repeat(4, auto);
    align-items: stretch;
    justify-content: center;
    align-content: center;
    margin: 2rem 0;
    border: 1px solid ${props => props.theme.lightGrey};
    border-radius: 10px;
    & > * {
        margin: 0;
        padding: 15px 30px;
        border-right: 1px solid ${props => props.theme.lightGrey};
        &:last-child {
            border-right: 0;
        }
        @media (max-width: 700px) {
            padding: 8px;
            font-size: 1.4rem;
        }
    }
    a[aria-disabled='true'] {
        color: grey;
        pointer-events: none;
    }
`;
