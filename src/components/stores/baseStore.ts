import { create } from 'zustand';

export interface ModalStore {
    activeModal: string | null;
    setActiveModal: (show: string | null) => void;
}

export const useModalStore = create<ModalStore>((set) => ({
    activeModal: null as string | null,
    setActiveModal: (show: string | null) => set({ activeModal: show }),
}));


export interface NodeStore {
    currentNodeData: any | null,
    setCurrentNodeData: (unit: any | null) => void,
}

export const useNodeStore = create<NodeStore>((set) => ({
    currentNodeData: null as any | null,
    setCurrentNodeData: (node: any | null ) => set({ currentNodeData: node }),
}));