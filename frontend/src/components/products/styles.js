import styled from 'styled-components';

export const ProductsList = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 60px;
    max-width: ${props => props.theme.maxWidth};
    margin: 0 auto;

    @media (min-width: ${props => props.theme.maxWidth}) {
        grid-template-columns: 1fr 1fr;
    }
`;

export const Title = styled.h3`
    margin: 0 1rem;
    text-align: center;
    transform: skew(-5deg) rotate(-1deg);
    margin-top: -3rem;
    text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.1);
    a {
        background: ${props => props.theme.mainColor};
        display: inline;
        line-height: 1.3;
        font-size: 4rem;
        text-align: center;
        color: white;
        padding: 0 1rem;
    }
`;

export const PriceTag = styled.span`
    background: ${props => props.theme.mainColor};
    transform: rotate(10deg);
    color: white;
    font-weight: 600;
    padding: 5px;
    line-height: 1;
    font-size: 3rem;
    display: inline-block;
    position: absolute;
    z-index: 1;
    right: -15px;
`;

export const ProductStyle = styled.div`
    background: white;
    border: 1px solid ${props => props.theme.offWhite};
    box-shadow: ${props => props.theme.boxShadow};
    position: relative;
    display: flex;
    flex-direction: column;
    img {
        width: 100%;
        height: 400px;
        object-fit: cover;
    }
    p {
        font-size: 12px;
        line-height: 2;
        font-weight: 300;
        flex-grow: 1;
        padding: 0 3rem;
        font-size: 1.5rem;
    }
    .buttonList {
        display: grid;
        height: 50px;
        width: 100%;
        border-top: 1px solid ${props => props.theme.lightGrey};
        grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
        grid-gap: 1px;
        background: ${props => props.theme.lightGrey};
        & > * {
            background: white;
            border: 0;
            font-family: 'Work Sans', sans-serif;
            font-size: 1.3rem;
            padding: .6rem;
        }
        a {
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            align-items: center;
        }
    }
`;

export const ProductExtendedViewStyle = styled.div`
    max-width: 1200px;
    margin: 2rem auto;
    display: grid;
    grid-auto-columns: 1fr;
    grid-auto-flow: column;
    justify-content: space-around;
    grid-gap: 20px;
    min-height: 690px;

    @media(max-width: 700px) {
        display: flex;
        flex-direction: column;
    }

    .cell {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
    }
    .relative {
        position: relative;
    }

    img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
    .details {
        background-color: white;
        box-shadow: ${props => props.theme.boxShadow};
        padding: 20px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        font-size: 2rem;
        min-height: 550px;
    }
`;

export const PaginationStyle = styled.div`
    text-align: center;
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
    }
    a[aria-disabled='true'] {
        color: grey;
        pointer-events: none;
    }
`;
