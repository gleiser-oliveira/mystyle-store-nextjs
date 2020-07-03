import gql from 'graphql-tag';

export const ADD_PRODUCT_TO_CART_MUTATION = gql`
    mutation ADD_PRODUCT_TO_CART_MUTATION($id: ID!){
        addProductToCart(id: $id) {
            id
            quantity
        }
    }
`;

export const REMOVE_CART_PRODUCT_MUTATION = gql`
    mutation REMOVE_CART_PRODUCT_MUTATION($id: ID!) {
        removeCartProduct(id: $id) {
            id
        }
    }
`;

export const REMOVE_PRODUCT_FROM_CART_MUTATION = gql`
    mutation REMOVE_PRODUCT_FROM_CART_MUTATION($id: ID!) {
        removeProductFromCart(id: $id) {
            id
            quantity
        }
    }
`;

export const CLEAR_CART_MUTATION = gql`
    mutation CLEAR_CART_MUTATION {
        removeAllProductsFromUserCart {
            count
        }
    }
`;
