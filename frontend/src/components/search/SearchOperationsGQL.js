import gql from 'graphql-tag';

export const SEARCH_PRODUCTS_QUERY = gql`
    query SEARCH_PRODUCTS_QUERY($searchTerm: String!) {
        products(where: { searchableText_contains: $searchTerm } ) {
            id
            image
            title
        }
    }
`;
