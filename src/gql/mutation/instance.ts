import { gql } from 'graphql-tag';

gql`
    mutation createInstance(
        $url: String!
    ) {
        createInstance (
            instance: {
                url: $url
            }
        ){
            uuid
            url
            trustStatus
            lastPing
            lastCollectionStatus
            lastSuccessDatetime
            lastAttemptDatetime
            consecutiveSuccessCount
            lastCollectionError
            state
            createDatetime
        }
    }

    mutation updateInstance(
        $uuid: UUID!
        $trustStatus: InstanceTrustStatus!
    ) {
        updateInstance (
            uuid: $uuid
            instance: {
                trustStatus: $trustStatus
            }
        ){
            uuid
            url
            trustStatus
            lastPing
            lastCollectionStatus
            lastSuccessDatetime
            lastAttemptDatetime
            consecutiveSuccessCount
            lastCollectionError
            state
            createDatetime
        }
    }

    mutation deleteInstance(
        $uuid: UUID!
    ) {
        deleteInstance (
            uuid: $uuid
        ){
            isNone
        }
    }

    mutation scanInstances {
        scanInstances {
            isNone
        }
    }

    mutation scanInstance(
        $uuid: UUID!
    ) {
        scanInstance (
            uuid: $uuid
        ){
            isNone
        }
    }

    mutation runIntegrationTests {
        runIntegrationTests {
            isNone
        }
    }
`
