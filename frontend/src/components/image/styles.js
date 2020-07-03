import styled from 'styled-components';

export const ImgArea = styled.span`
    position: relative;
    width: ${props => `${props.naturalWidth}`};
    height: ${props => `${props.naturalHeight}`};
    max-width: 100%;
    max-height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;

    div {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
`;
