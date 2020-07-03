import styled, { keyframes } from 'styled-components';

const loading = keyframes`
    from {
        background-position: 0 0;
    }

    to {
        background-position: 100% 100%;
    }
`;

export const Center = styled.div`
    text-align: center;
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.05);
    background: rgba(255, 255, 255, 0.5);
    border: 5px solid white;
    padding: 20px;
    font-size: 1.5rem;
    line-height: 1.5;
    font-weight: 600;

    @media(min-height: 800px) {
        min-height: 500px;
    }
    label {
        display: block;
        margin-bottom: 1rem;
    }
    input, textarea, select {
        width: 100%;
        padding: 0.5rem;
        font-size: 1rem;
        border: 1px solid black;
        &:focus {
            outline: 0;
            border-color: ${props => props.theme.mainColor};
        }
    }
    button, input[type='submit'] {
        width: auto;
        background: ${props => props.theme.mainColor};
        color: white;
        border: 0;
        font-size: 2rem;
        font-weight: 600;
        padding: 0.5rem 1.2rem;
    }
    fieldset {
        border: 0;
        padding: 0;
        display: contents;
        &[disabled] {
            opacity: 0.5;
        }
        &::before {
            height: 10px;
            content: '';
            display: block;
            background-image: linear-gradient(to right, #088600 0%, #ededed 50%, #088600 100%);
        }
        &[aria-busy='true']::before {
            background-size: 50% auto;
            animation: ${loading} 0.5s linear infinite;
        }
    }
    a {
        font-size: 1.2rem;
        color: #759aad;
    }
`;

export const Columns = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    grid-gap: 20px;
    grid-template-rows: repeat(auto-fit, minmax(450px, 1fr));
`;

export const Table = styled.table`
    border-spacing: 0;
    width: 100%;
    border: 1px solid ${props => props.theme.offWhite};
    thead {
        font-size: 10px;
    }
    td, th {
        border-bottom: 1px solid ${props => props.theme.offWhite};
        border-right: 1px solid ${props => props.theme.offWhite};
        padding: 5px;
        position: relative;
        &:last-child {
            border-right: none;
            width: 150px;
            button {
                width: 100%;
            }
        }
        label {
            padding: 10px 5px;
            display: block;
        }
    }
    tr {
        &:hover {
            background: ${props => props.theme.offWhite};
        }
    }
`;
