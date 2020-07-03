import gql from 'graphql-tag';
import { perPage } from '../../config';

export const SINGLE_ORDER_QUERY = gql`
    query SINGLE_ORDER_QUERY($id: ID!) {
        order(id: $id) {
            id
            charge
            total
            createdAt
            user {
                id
            }
            products {
                id
                title
                description
                price
                image
                quantity
            }
        }
    }
`;

export const USER_ORDERS_QUERY = gql`
    query USER_ORDERS_QUERY($skip: Int = 0, $first: Int = ${perPage}) { 
        orders(first: $first, skip: $skip, orderBy: createdAt_DESC) {
            id
            total
            createdAt
            products {
                id
                title
                price
                description
                quantity
                image
            }
        }
    }
`;

export const USER_ORDERS_PAGINATION_QUERY = gql`
    query USER_ORDERS_PAGINATION_QUERY($userId: ID!) {
        ordersConnection(where: {user: {id: $userId}}) {
            aggregate {
                count
            }
        }
    }
`;
