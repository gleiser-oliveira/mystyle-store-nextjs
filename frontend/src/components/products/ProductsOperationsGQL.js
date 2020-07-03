import gql from 'graphql-tag';
import { perPage } from '../../config';

export const ALL_PRODUCTS_QUERY = gql`
    query ALL_PRODUCTS_QUERY($skip: Int = 0, $first: Int = ${perPage}) {
        products(first: $first, skip: $skip, orderBy: createdAt_DESC) {
            id
            title
            price
            description
            image
            largeImage
            user {
                id
            }
        }
    }
`;

export const SINGLE_PRODUCT_QUERY = gql`
    query SINGLE_PRODUCT_QUERY($id: ID!) {
        product(where: { id: $id }) {
            id
            title
            description
            price
            image
            largeImage
            user {
                id
            }
        }
    }
`;

export const CREATE_PRODUCT_MUTATION = gql`
    mutation CREATE_PRODUCT_MUTATION (
        $title: String!
        $description: String!
        $price: Int!
        $image: String
        $largeImage: String
    ) {
        createProduct (
            title: $title 
            description: $description 
            price: $price
            image: $image
            largeImage: $largeImage
        ) {
            id
        }
    }
`;

export const UPDATE_PRODUCT_MUTATION = gql`
    mutation UPDATE_PRODUCT_MUTATION (
        $id: ID!
        $title: String
        $description: String
        $price: Int
    ) {
        updateProduct (
            id: $id
            title: $title 
            description: $description 
            price: $price
        ) {
            id
        }
    }
`;

export const DELETE_PRODUCT_MUTATION = gql`
    mutation DELETE_PRODUCT_MUTATION($id: ID!) {
        deleteProduct(id: $id) {
            id
        }
    }
`;

export const PRODUCTS_PAGINATION_QUERY = gql`
  query PRODUCTS_PAGINATION_QUERY {
    productsConnection {
      aggregate {
        count
      }
    }
  }
`;
