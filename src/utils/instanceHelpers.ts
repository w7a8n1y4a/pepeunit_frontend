export function instanceDomain(url: string): string {
    try {
        return new URL(url).host;
    } catch {
        return url;
    }
}

export function instanceOrigin(url: string): string {
    try {
        return new URL(url).origin;
    } catch {
        return url;
    }
}

export function enumToLabel(input: string | null | undefined): string {
    if (!input) return '—';
    return input
        .split('_')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
}

export function settingLabel(key: string): string {
    return enumToLabel(key.replace(/^pu_ff_/, '').replace(/^pu_/, ''));
}

function asRecord(value: unknown): Record<string, unknown> | null {
    if (typeof value === 'string') {
        try {
            return asRecord(JSON.parse(value));
        } catch {
            return null;
        }
    }
    if (value && typeof value === 'object' && !Array.isArray(value)) {
        return value as Record<string, unknown>;
    }
    return null;
}

function asString(value: unknown): string | undefined {
    return typeof value === 'string' && value.trim() ? value : undefined;
}

function asNumber(value: unknown): number | null {
    if (typeof value === 'number' && !Number.isNaN(value)) return value;
    if (typeof value === 'string' && value.trim() !== '') {
        const parsed = Number(value);
        if (!Number.isNaN(parsed)) return parsed;
    }
    return null;
}

function asBoolean(value: unknown): boolean | undefined {
    return typeof value === 'boolean' ? value : undefined;
}

function pickString(obj: Record<string, unknown> | null, keys: string[]): string | undefined {
    if (!obj) return undefined;
    for (const key of keys) {
        const value = asString(obj[key]);
        if (value !== undefined) return value;
    }
    return undefined;
}

function pickNumber(obj: Record<string, unknown> | null, keys: string[]): number | null {
    if (!obj) return null;
    for (const key of keys) {
        const value = asNumber(obj[key]);
        if (value !== null) return value;
    }
    return null;
}

export type ParsedInstanceState = {
    name?: string
    version?: string
    description?: string
    license?: string
    swagger?: string
    graphql?: string
    grafana?: string
    telegramBot?: string
    email?: string
    telegram?: string
    userCount: number | null
    repositoryRegistryCount: number | null
    repoCount: number | null
    unitCount: number | null
    unitNodeCount: number | null
    unitNodeEdgeCount: number | null
    integrationTestsStatus?: string
    integrationTestsSuccessPercentage: number | null
    integrationTestsDatetime?: string
    instanceDatetime?: string
    featureFlags: Array<{ key: string, enabled: boolean }>
    schemaVersion?: string
    settings: Array<{ key: string, value: string }>
}

export function parseInstanceState(state: unknown): ParsedInstanceState | null {
    const root = asRecord(state);
    if (!root) return null;

    const metrics = asRecord(root.metrics);
    const contacts = asRecord(root.contacts);
    const nestedState = asRecord(root.state);
    const flags = asRecord(root.feature_flags) ?? asRecord(root.featureFlags);
    const settingsObj = asRecord(root.settings);

    const featureFlags: Array<{ key: string, enabled: boolean }> = [];
    if (flags) {
        for (const [key, value] of Object.entries(flags)) {
            const enabled = asBoolean(value);
            if (enabled !== undefined) {
                featureFlags.push({ key, enabled });
            }
        }
    }

    const settings: Array<{ key: string, value: string }> = [];
    if (settingsObj) {
        for (const [key, value] of Object.entries(settingsObj)) {
            settings.push({ key, value: formatSettingValue(value) });
        }
    }

    return {
        name: pickString(root, ['name']),
        version: pickString(root, ['version']),
        description: pickString(root, ['description']),
        license: pickString(root, ['license']),
        swagger: pickString(root, ['swagger']),
        graphql: pickString(root, ['graphql']),
        grafana: pickString(root, ['grafana']),
        telegramBot: pickString(root, ['telegram_bot', 'telegramBot']),
        email: pickString(contacts, ['email']),
        telegram: pickString(contacts, ['telegram']),
        userCount: pickNumber(metrics, ['user_count', 'userCount']),
        repositoryRegistryCount: pickNumber(metrics, ['repository_registry_count', 'repositoryRegistryCount']),
        repoCount: pickNumber(metrics, ['repo_count', 'repoCount']),
        unitCount: pickNumber(metrics, ['unit_count', 'unitCount']),
        unitNodeCount: pickNumber(metrics, ['unit_node_count', 'unitNodeCount']),
        unitNodeEdgeCount: pickNumber(metrics, ['unit_node_edge_count', 'unitNodeEdgeCount']),
        integrationTestsStatus: pickString(nestedState, ['integration_tests_status', 'integrationTestsStatus']),
        integrationTestsSuccessPercentage: pickNumber(nestedState, ['integration_tests_success_percentage', 'integrationTestsSuccessPercentage']),
        integrationTestsDatetime: pickString(nestedState, ['integration_tests_datetime', 'integrationTestsDatetime']),
        instanceDatetime: pickString(nestedState, ['instance_datetime', 'instanceDatetime']),
        featureFlags,
        schemaVersion: pickString(root, ['schema_version', 'schemaVersion']),
        settings,
    };
}

function formatSettingValue(value: unknown): string {
    if (typeof value === 'boolean') return value ? '✓' : '✗';
    if (Array.isArray(value)) return value.join(', ');
    if (value == null) return '—';
    return String(value);
}

export function formatPing(lastPing: number | null | undefined): string {
    if (lastPing == null) return '—';
    return `${Math.round(lastPing)} ms`;
}

export function formatCount(value: number | null | undefined): string {
    return value == null ? '—' : String(value);
}
