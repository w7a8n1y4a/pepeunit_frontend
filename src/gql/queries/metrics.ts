import { gql } from 'graphql-tag';

gql`
    query getBaseMetrics{
        getBaseMetrics{
            userCount
            repositoryRegistryCount
            repoCount
            unitCount
            unitNodeCount
            unitNodeEdgeCount
        }
    }
`