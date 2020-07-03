import gql from 'graphql-tag';
import { perPage } from '../../config';

export const SIGNUP_MUTATION = gql`
    mutation SIGNUP_MUTATION($email: String!, $name: String!, $password: String!) {
        signup(email: $email, name: $name, password: $password) {
            id
            email
            name
        }
    }
`;

export const SIGNIN_MUTATION = gql`
    mutation SIGNIN_MUTATION($email: String!, $password: String!) {
        signin(email: $email, password: $password) {
            id
            email
            name
        }
    }
`;

export const SIGNOUT_MUTATION = gql`
    mutation SIGNOUT_MUTATION {
        signout {
            message
        }
    }
`;

export const CURRENT_USER_QUERY = gql`
    query CURRENT_USER_QUERY { 
        me {
            id
            email
            name
            permissions
            cart {
                id
                quantity
                product {
                    id
                    price
                    title
                    image
                    description
                }
            }
        }
    }
`;

export const REQUEST_PASSWORD_RESET_MUTATION = gql`
    mutation REQUEST_PASSWORD_RESET_MUTATION($email: String!) {
        requestPasswordReset(email: $email) {
            message
        }
    }
`;

export const RESET_PASSWORD_MUTATION = gql`
    mutation RESET_PASSWORD_MUTATION($resetToken: String!, $password: String!, $confirmPassword: String!) {
        resetPassword(resetToken: $resetToken, password: $password, confirmPassword: $confirmPassword) {
            id
            name
            email
        }
    }
`;

export const HAS_PERMISSION_QUERY = gql`
    query { 
        users {
            id
            email
            name
            permissions
        }
    }
`;

export const ALL_USERS_QUERY = gql`
    query ALL_USERS_QUERY($skip: Int = 0, $first: Int = ${perPage}) { 
        users(first: $first, skip: $skip, orderBy: name_ASC) {
            id
            email
            name
            permissions
        }
    }
`;

export const USERS_PAGINATION_QUERY = gql`
    query USERS_PAGINATION_QUERY {
        usersConnection {
            aggregate {
                count
            }
        }
    }
`;

export const ALL_PERMISSIONS_QUERY = gql`
    query { 
        permissions {
          id
          permission
          description
        }
    }
`;

export const UPDATE_USER_PERMISSIONS_MUTATION = gql`
    mutation UPDATE_USER_PERMISSIONS_MUTATION($id: ID! $permissions: [Permission]) {
        updateUserPermissions(id: $id permissions: $permissions) {
            id
            email
            name
            permissions
        }
    }
`;
