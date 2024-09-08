import { gql } from 'graphql-tag';

gql`
    query getBaseMetrics{
        getBaseMetrics{
            userCount
            repoCount
            unitCount
            unitNodeCount
            unitNodeEdgeCount
        }
    }
`