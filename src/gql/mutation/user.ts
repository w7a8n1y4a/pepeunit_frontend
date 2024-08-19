import { gql } from 'graphql-tag';

gql`
    mutation createUser(
        $login: String!
        $password: String!
    ) {
        createUser (user: { login: $login, password: $password }){
            uuid
            role
            status
            login
            createDatetime
        }
    }
    mutation updateUser(
        $login: String
        $password: String
    ) {
        updateUser (user: {login: $login, password: $password }){
            uuid
            role
            status
            login
            createDatetime
        }
    }
`