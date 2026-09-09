import { create } from 'zustand';

export interface FeatureFlags {
    pu_ff_telegram_bot_enable: boolean
    pu_ff_grafana_integration_enable: boolean
    pu_ff_datapipe_enable: boolean
    pu_ff_datapipe_default_last_value_enable: boolean
    pu_ff_prometheus_enable: boolean
    pu_ff_federation_enable: boolean
}

export const TELEGRAM_BOT_ENABLE_FLAG: keyof FeatureFlags = 'pu_ff_telegram_bot_enable';
export const GRAFANA_INTEGRATION_ENABLE_FLAG: keyof FeatureFlags = 'pu_ff_grafana_integration_enable';
export const DATAPIPE_ENABLE_FLAG: keyof FeatureFlags = 'pu_ff_datapipe_enable';

export interface CurrentInstanceSettings {
    pu_auth_token_expiration: number
    pu_min_interval_sync_repository: number
    pu_state_send_interval: number
    pu_max_external_repo_size: number
    pu_max_cipher_length: number
    pu_http_timeout: number
    pu_http_connect_timeout: number
    pu_instance_max_state_size: number
    pu_instance_retention_days: number
    pu_unit_log_expiration: number
    pu_max_pagination_size: number
    pu_available_topic_symbols: string
    pu_available_name_entity_symbols: string
    pu_time_window_sizes: number[]
    pu_mqtt_host: string
    pu_mqtt_secure: boolean
    pu_mqtt_port: number
    pu_mqtt_keepalive: number
    pu_mqtt_max_clients: number
    pu_mqtt_max_client_connection_rate: string
    pu_mqtt_max_client_id_len: number
    pu_mqtt_client_max_messages_rate: string
    pu_mqtt_client_max_bytes_rate: string
    pu_mqtt_max_payload_size: number
    pu_mqtt_max_qos: number
    pu_mqtt_max_topic_levels: number
    pu_mqtt_max_len_message_queue: number
    pu_mqtt_max_topic_alias: number
    pu_grafana_limit_unit_node_per_one_panel: number
}

export interface CurrentInstanceState {
    instance_datetime: string
    integration_tests_datetime: string | null
    integration_tests_status: string | null
    integration_tests_success_percentage: number | null
}

export interface CurrentInstanceMetrics {
    user_count: number
    repository_registry_count: number
    repo_count: number
    unit_count: number
    unit_node_count: number
    unit_node_edge_count: number
}

export interface CurrentInstanceContacts {
    email: string
    telegram: string
}

export interface BackendInfo {
    schema_version: string
    name: string
    version: string
    description: string
    license: string
    swagger?: string
    graphql?: string
    grafana?: string
    telegram_bot?: string
    feature_flags: FeatureFlags
    settings: CurrentInstanceSettings
    state: CurrentInstanceState
    metrics: CurrentInstanceMetrics
    contacts: CurrentInstanceContacts
}

interface BackendInfoStore {
    backendInfo: BackendInfo | null;
    loading: boolean;
    error: string | null;
    fetchBackendInfo: () => Promise<void>;
}

const getCurrentInstanceUri = () => {
    const backendUri = import.meta.env.VITE_BACKEND_URI || window.env.VITE_BACKEND_URI || '';
    return backendUri.replace(/\/graphql\/?$/, '/api/v1/instances/current');
};

export const isFeatureEnabled = (
    backendInfo: BackendInfo | null,
    flag: keyof FeatureFlags,
): boolean => {
    return backendInfo?.feature_flags?.[flag] !== false;
};

export const useBackendInfoStore = create<BackendInfoStore>((set, get) => ({
    backendInfo: null,
    loading: false,
    error: null,
    fetchBackendInfo: async () => {
        if (get().loading || get().backendInfo) return;

        const currentInstanceUri = getCurrentInstanceUri();

        if (!currentInstanceUri) {
            set({ error: 'Backend URI not configured' });
            return;
        }

        set({ loading: true, error: null });

        try {
            const response = await fetch(currentInstanceUri);

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }

            const backendInfo = await response.json() as BackendInfo;
            set({ backendInfo, loading: false });
        } catch (err) {
            set({
                error: err instanceof Error ? err.message : 'Failed to load backend info',
                loading: false,
            });
        }
    },
}));
