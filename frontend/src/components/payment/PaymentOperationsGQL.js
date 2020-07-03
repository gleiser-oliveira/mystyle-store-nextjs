import gql from 'graphql-tag';

export const CREATE_ORDER_MUTATION = gql`
    mutation CREATE_ORDER_MUTAION($token: String!) {
        createOrder(token: $token){
            id
            charge
            total
            products {
                id
                title
            }
        }
    }
`;
