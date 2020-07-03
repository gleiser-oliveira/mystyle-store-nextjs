import styled from 'styled-components';

export const OrderStyle = styled.div`
    background-color: white;
    max-width: 1000px;
    margin: 0 auto;
    border: 1px solid ${props => props.theme.offWhite};
    box-shadow: ${props => props.theme.boxShadow};
    padding: 2rem;
    border-top: 10px solid ${props => props.theme.mainColor};
    & > p {
        display: grid;
        grid-template-columns: 1fr 5fr;
        margin: 0;
        border-bottom: 1px solid ${props => props.theme.offWhite};
        span {
            padding: 1rem;
            &:first-child {
                font-weight: 900;
                text-align: right;
            }
        }
    }
    .order-item {
        border-bottom: 1px solid ${props => props.theme.offWhite};
        display: grid;
        grid-template-columns: 300px 1fr;
        align-items: center;
        grid-gap: 2rem;
        margin: 2rem 0;
        padding-bottom: 2rem;
        img {
            width: 100%;
            object-fit: cover;
        }
    }
`;

export const OrderListStyle = styled.div`
    display: grid;
    grid-gap: 4rem;
    grid-template-columns: repeat(auto-fit, minmax(40%, 1fr));
`;

export const OrderItemStyle = styled.li`
    background-color: white;
    box-shadow: ${props => props.theme.boxShadow};
    list-style: none;
    padding: 2rem;
    border: 1px solid ${props => props.theme.offWhite};
    h2 {
        border-bottom: 2px solid red;
        margin-top: 0;
        margin-bottom: 2rem;
        padding-bottom: 2rem;
    }

    .images {
        display: grid;
        grid-gap: 10px;
        grid-template-columns: repeat(auto-fit, minmax(0, 1fr));
        margin-top: 1rem;
        img {
            height: 200px;
            object-fit: cover;
            width: 100%;
        }
    }
    .order-meta {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(20px, 1fr));
        display: grid;
        grid-gap: 1rem;
        text-align: center;
        & > * {
            margin: 0;
            background: rgba(0, 0, 0, 0.03);
            padding: 1rem 0;
        }
        strong {
            display: block;
            margin-bottom: 1rem;
        }
    }
`;
