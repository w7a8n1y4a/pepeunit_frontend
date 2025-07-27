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

export interface SearchNodeStore {
    currentSearchNodeData: any | null,
    setCurrentSearchNodeData: (unit: any | null) => void,
}

export const useSearchNodeStore = create<SearchNodeStore>((set) => ({
    currentSearchNodeData: null as any | null,
    setCurrentSearchNodeData: (node: any | null ) => set({ currentSearchNodeData: node }),
}));

export interface ReloadBaseGraphDataStore {
    reloadState: boolean,
    setReloadState: (state: boolean) => void,
}

export const useReloadBaseGraphDataStore = create<ReloadBaseGraphDataStore>((set) => ({
    reloadState: false,
    setReloadState: (state: boolean) => set({ reloadState:  state}),
}));

export interface PickRegistryStore {
    currentPickRegistryData: any | null,
    setCurrentPickRegistryData: (registry: any | null) => void,
}

export const usePickRegistryStore = create<PickRegistryStore>((set) => ({
    currentPickRegistryData: null as any | null,
    setCurrentPickRegistryData: (registry: any | null ) => set({ currentPickRegistryData: registry }),
}));