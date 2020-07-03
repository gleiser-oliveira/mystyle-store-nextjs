import styled from 'styled-components';

export const AdminView = styled.div`
    display: flex;
    flex-direction: column;
`;

export const PermissionsGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 5fr;
    grid-template-rows: 60px 50vh;
    @media (max-width: 700px) {
      font-size: .9rem;
    }
    @media (max-height: 700px) {
        grid-template-rows: 60px 40vh;
    }
    .col {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        &-u {
            background-color: greenyellow;
        }
        &-p {
            background-color: #d4d4d4;
        }
    }
    .user {
        display:flex;
        flex-direction: column;
        justify-content: space-evenly;
        height: 100%;
        border-top: 1px solid;
        text-align: right;
        padding-right: 5px;
    }

    .perms {
        display:flex;
        flex-direction: row;
        justify-content: space-evenly;
        height: 100%;
        
        text-align: center;
    }

    .perm {
        display:flex;
        flex-direction: column;
        justify-content: space-around;
        height: 100%;
        width: 100%;
        border-left: 1px solid;
        border-top: 1px solid;
        vertical-align: middle;
        font-size: 1rem;
        padding: 5px;

        label {
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            height: 100%;
            margin: auto;
        }

        &:hover {
            background-color: #909090;
        }
    }
`;
