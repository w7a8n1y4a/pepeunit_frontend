import { gql } from 'graphql-tag';

gql`
    mutation createRepositoryRegistry(
        $platform: GitPlatform!
        $repositoryUrl: String!
        $isPublicRepository: Boolean!
        $credentials: CredentialsInput
    ) {
        createRepositoryRegistry (
            repositoryRegistry: {
                platform: $platform
                repositoryUrl: $repositoryUrl
                isPublicRepository: $isPublicRepository
                credentials: $credentials
            }
        ){
            uuid
            platform
            repositoryUrl
            isPublicRepository
            releasesData
            localRepositorySize
            syncStatus
            syncError
            syncLastDatetime
            createDatetime
            lastUpdateDatetime
            creatorUuid
            branches
        }
    }

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

    mutation deleteRepositoryRegistry(
        $uuid: UUID!
    ) {
        deleteRepositoryRegistry (
            uuid: $uuid
        ){
            isNone
        }
    }
`