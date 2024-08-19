import { gql } from 'graphql-tag';

gql`
    query getToken(
        $credentials: String!
        $password: String!
    ) {
        getToken (data: { credentials: $credentials, password: $password })
    }

    query getUser(
        $uuid: UUID!
    ) {
        getUser (uuid: $uuid){
            uuid
            role
            status
            login
            createDatetime
        }
    }

    query getVerificationUser{
        getVerificationUser
    }
`