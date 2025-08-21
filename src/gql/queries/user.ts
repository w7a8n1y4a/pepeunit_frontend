import { gql } from 'graphql-tag';

gql`
    query getToken(
        $credentials: String!
        $password: String!
    ) {
        getToken (data: { credentials: $credentials, password: $password })
    }

    query getGrafanaToken{
        getGrafanaToken
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

    query getUsers(
        $uuids: [UUID!]
        $searchString: String
        $role: [UserRole!]
        $status: [UserStatus!]
        $orderByCreateDate: OrderByDate
        $offset: Int
        $limit: Int
    ) {
        getUsers (
            filters: {
                uuids: $uuids
                searchString: $searchString
                role: $role
                status: $status
                orderByCreateDate: $orderByCreateDate
                offset: $offset
                limit: $limit
            }        
        ){
            count
            users {
                uuid
                role
                status
                login
                createDatetime
            }   
        }
    }

    query getVerificationUser{
        getVerificationUser
    }
`