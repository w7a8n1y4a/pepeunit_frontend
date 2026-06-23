import { create } from 'zustand';

export const TELEGRAM_BOT_ENABLE_FLAG = 'pu_ff_telegram_bot_enable';

export interface BackendInfo {
    name: string
    version: string
    description: string
    license: string
    swagger?: string
    graphql?: string
    grafana?: string
    telegram_bot?: string
    feature_flags?: Record<string, boolean>
}

interface BackendInfoStore {
    backendInfo: BackendInfo | null;
    loading: boolean;
    error: string | null;
    fetchBackendInfo: () => Promise<void>;
}

const getBackendInfoUri = () => {
    return (import.meta.env.VITE_BACKEND_URI || window.env.VITE_BACKEND_URI || '').replace(/\/graphql$/, '');
};

export const useBackendInfoStore = create<BackendInfoStore>((set, get) => ({
    backendInfo: null,
    loading: false,
    error: null,
    fetchBackendInfo: async () => {
        if (get().loading || get().backendInfo) return;

        const backendUri = getBackendInfoUri();

        if (!backendUri) {
            set({ error: 'Backend URI not configured' });
            return;
        }

        set({ loading: true, error: null });

        try {
            const response = await fetch(backendUri);

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
