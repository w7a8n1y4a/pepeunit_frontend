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
        $filters: InstanceFilterInput!
    ) {
        getInstances(
            filters: $filters
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
        $filters: InstanceFilterInput!
    ) {
        getInstancesUrls(
            filters: $filters
        ) {
            totalCount
            urls
        }
    }

    query getInstancesRegistries(
        $filters: InstanceFilterInput!
    ) {
        getInstancesRegistries(
            filters: $filters
        ) {
            totalCount
            registries {
                url
                platform
            }
        }
    }
`
