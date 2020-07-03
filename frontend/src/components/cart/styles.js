import styled from 'styled-components';

export const CartStyle = styled.div`
    padding: 20px;
    position: relative;
    background: white;
    position: fixed;
    height: 100%;
    top: 0;
    right: -10px;
    width: 40%;
    min-width: 500px;
    bottom: 0;
    transform: translateX(100%);
    transition: all 0.3s;
    box-shadow: 0 0 10px 3px rgba(0, 0, 0, 0.2);
    z-index: 5;
    display: grid;
    grid-template-rows: auto 1fr auto;
    ${props => props.open && 'transform: translateX(0);'};
    div {
        text-align: center;
        button {
            border-radius: 4px;
            background-color: red;
            border: none;
            color: #FFFFFF;
            text-align: center;
            text-transform: uppercase;
            font-size: 1.1rem;
            padding: 5px;
            width: 100px;
            transition: all .6s;
            cursor: pointer;
            &:disabled {
            background-color: #adadad;
            cursor: not-allowed;
            }
        }
    }
    @media(max-width:600px) {
        min-width: 90vw;
    }
    header {
        border-bottom: 5px solid ${props => props.theme.black};
        margin-bottom: 2rem;
        padding-bottom: 2rem;
    }
    footer {
        border-top: 10px double ${props => props.theme.black};
        margin-top: 2rem;
        padding-top: 2rem;
        display: grid;
        grid-template-rows: auto auto;
        align-items: center;
        font-size: 3rem;
        font-weight: 900;
        @media(max-width:400px) {
            font-size: 1.5rem;
        }
        p {
            margin: 0;
        }
        div {
            display: grid;
            justify-content: space-between;
            align-items: center;
            grid-template-columns: auto auto;
            button {
                border-radius: 4px;
                background-color: #67b26b;
                border: none;
                color: #FFFFFF;
                text-align: center;
                text-transform: uppercase;
                font-size: 22px;
                padding: 20px;
                width: 200px;
                transition: all .6s;
                cursor: pointer;
                &:disabled {
                    background-color: #adadad;
                    cursor: not-allowed;
                }
            }
        }
    }
    ul {
        margin: 0;
        padding: 0;
        list-style: none;
        overflow-x: hidden;
    }
`;

export const CloseButton = styled.button`
    background: ${props => props.theme.red};
    color: white;
    font-size: 3rem;
    border: 0;
    position: absolute;
    z-index: 2;
    right: 10px;
    width: 35px;
    height: 35px;
`;

export const Supreme = styled.h3`
    background: ${props => props.theme.mainColor};
    color: white;
    display: inline-block;
    padding: 4px 5px;
    transform: skew(-3deg);
    margin: 0;
    font-size: 4rem;
`;

export const CartProductStyle = styled.li`
    padding: 1rem 0;
    border-bottom: 1px solid ${props => props.theme.lightGrey};
    display: grid;
    align-items: center;
    grid-template-columns: auto 1fr auto;
    img {
        margin-right: 10px;
    }
    h3, p {
        margin: 0;
    }
`;

export const RemoveButton = styled.button`
    font-size: 3rem;
    background: none;
    border: 0;
    &:hover {
        color: ${props => props.theme.red};
        cursor: pointer;
    }
`;

export const CountAnimation = styled.span`
    position: relative;
    .count {
        display: block;
        position: relative;
        transition: all 0.4s;
        backface-visibility: hidden;
    }
    /* Initial State of the entered Dot */
    .count-enter {
        transform: rotateX(0.5turn);
    }
    .count-enter-active {
        transform: rotateX(0);
    }
    .count-exit {
        top: 0;
        position: absolute;
        transform: rotateX(0);
    }
    .count-exit-active {
        transform: rotateX(0.5turn);
    }
`;

export const Dot = styled.div`
    background: ${props => props.theme.mainColor};
    color: white;
    border-radius: 50%;
    padding: 0.5rem;
    line-height: 2rem;
    min-width: 3rem;
    margin-left: 1rem;
    font-weight: 100;
    font-feature-settings: 'tnum';
    font-variant-numeric: tabular-nums;
`;
