import { gql } from 'graphql-tag';

gql`
    mutation setCredentials(
        $uuid: UUID!
        $data: CredentialsInput!
    ) {
        setCredentials (
            uuid: $uuid
            data: $data
        ){
            isNone
        }
    }
    mutation updateLocalRepository(
        $uuid: UUID!
    ) {
        updateLocalRepository (
            uuid: $uuid
        ){
            isNone
        }
    }
`