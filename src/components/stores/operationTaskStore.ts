import { create } from 'zustand';

interface OperationTaskStore {
    runningCount: number;
    refreshNonce: number;
    setRunningCount: (count: number) => void;
    notifyTaskStarted: () => void;
}

export const useOperationTaskStore = create<OperationTaskStore>((set) => ({
    runningCount: 0,
    refreshNonce: 0,
    setRunningCount: (count) => set({ runningCount: count }),
    notifyTaskStarted: () => set((state) => ({ refreshNonce: state.refreshNonce + 1 })),
}));
