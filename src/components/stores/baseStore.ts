import { create } from 'zustand';
import { RepoType, UnitType } from '@rootTypes/composition-functions';

export interface ModalStore {
    activeModal: string | null;
    setActiveModal: (show: string | null) => void;
}

export const useModalStore = create<ModalStore>((set) => ({
    activeModal: null as string | null,
    setActiveModal: (show: string | null) => set({ activeModal: show }),
}));

export interface RepoStore {
    currentRepoData: RepoType | null;
    setCurrentRepoData: (repo: RepoType | null) => void;
}

export const useRepoStore = create<RepoStore>((set) => ({
    currentRepoData: null as RepoType | null,
    setCurrentRepoData: (repo: RepoType | null) => set({ currentRepoData: repo }),
}));

export interface UnitStore {
    currentUnitData: UnitType | null,
    setCurrentUnitData: (unit: UnitType | null) => void,
}

export const useUnitStore = create<UnitStore>((set) => ({
    currentUnitData: null as UnitType | null,
    setCurrentUnitData: (unit: UnitType | null) => set({ currentUnitData: unit }),
}));

export interface DomainStore {
    currentDomainData: UnitType | null,
    setCurrentDomainData: (unit: UnitType | null) => void,
}

export const useDomainStore = create<DomainStore>((set) => ({
    currentDomainData: null as UnitType | null,
    setCurrentDomainData: (unit: UnitType | null) => set({ currentDomainData: unit }),
}));