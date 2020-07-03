import styled from 'styled-components';

const BaseMessage = styled.div`
    padding: 2rem;
    background: white;
    margin: 2rem 0;
    border: 1px solid rgba(0, 0, 0, 0.05);
    border-left: 5px solid red;
    p {
        margin: 0;
        font-weight: 100;
    }
    strong {
        margin-right: 1rem;
    }
`;

export const ConfirmationMessageStyle = styled(BaseMessage)`
    border-left: 5px solid green;
`;

export const WarningMessageStyle = styled(BaseMessage)`
    border-left: 5px solid yellow;
`;

export const ErrorMessageStyle = styled(BaseMessage)`
    border-left: 5px solid red;
`;
