import { gql } from 'graphql-tag';

gql`
    query getCurrentInstance {
        getCurrentInstance {
            schemaVersion
            name
            version
            description
            license
            swagger
            graphql
            grafana
            telegramBot
            featureFlags {
                puFfTelegramBotEnable
                puFfGrafanaIntegrationEnable
                puFfDatapipeEnable
                puFfDatapipeDefaultLastValueEnable
                puFfPrometheusEnable
                puFfFederationEnable
            }
            settings {
                puAuthTokenExpiration
                puMinIntervalSyncRepository
                puStateSendInterval
                puMaxExternalRepoSize
                puMaxCipherLength
                puHttpTimeout
                puHttpConnectTimeout
                puInstanceMaxStateSize
                puInstanceRetentionDays
                puUnitLogExpiration
                puMaxPaginationSize
                puAvailableTopicSymbols
                puAvailableNameEntitySymbols
                puTimeWindowSizes
                puMqttHost
                puMqttSecure
                puMqttPort
                puMqttKeepalive
                puMqttMaxClients
                puMqttMaxClientConnectionRate
                puMqttMaxClientIdLen
                puMqttClientMaxMessagesRate
                puMqttClientMaxBytesRate
                puMqttMaxPayloadSize
                puMqttMaxQos
                puMqttMaxTopicLevels
                puMqttMaxLenMessageQueue
                puMqttMaxTopicAlias
                puGrafanaLimitUnitNodePerOnePanel
            }
            state {
                instanceDatetime
                integrationTestsDatetime
                integrationTestsStatus
                integrationTestsSuccessPercentage
            }
            metrics {
                userCount
                repositoryRegistryCount
                repoCount
                unitCount
                unitNodeCount
                unitNodeEdgeCount
            }
            contacts {
                email
                telegram
            }
        }
    }

    query getInstances(
        $trustStatus: [InstanceTrustStatus!]
        $offset: Int
        $limit: Int
    ) {
        getInstances(
            filters: {
                trustStatus: $trustStatus
                offset: $offset
                limit: $limit
            }
        ) {
            totalCount
            instances {
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
    }

    query getInstancesUrls(
        $trustStatus: [InstanceTrustStatus!]
        $offset: Int
        $limit: Int
    ) {
        getInstancesUrls(
            filters: {
                trustStatus: $trustStatus
                offset: $offset
                limit: $limit
            }
        ) {
            totalCount
            urls
        }
    }

    query getInstancesRegistries(
        $trustStatus: [InstanceTrustStatus!]
        $offset: Int
        $limit: Int
    ) {
        getInstancesRegistries(
            filters: {
                trustStatus: $trustStatus
                offset: $offset
                limit: $limit
            }
        ) {
            totalCount
            registries {
                url
                platform
            }
        }
    }
`
