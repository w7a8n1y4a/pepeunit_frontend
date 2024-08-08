import { gql } from 'graphql-tag';

gql`
    query getToken(
        $credentials: String!
        $password: String!
    ) {
        getToken (data: { credentials: $credentials, password: $password })
    }
`