import { gql } from 'graphql-tag';

gql`
    query getBranchCommits(
        $uuid: UUID!
        $repoBranch: String!
        $onlyTag: Boolean!
        $offset: Int
        $limit: Int
    ) {
        getBranchCommits (
            uuid: $uuid
            filters: {
                repoBranch: $repoBranch
                onlyTag: $onlyTag
                offset: $offset
                limit: $limit
            }
        ) {
            commit
            summary
            tag
        }
    }
`