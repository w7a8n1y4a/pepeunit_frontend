import { create } from 'zustand';
import { NodeType } from '@rootTypes/nodeTypeEnum';
import { useSearchNodeStore, useNodeStore } from '@stores/baseStore';
import useModalHandlers from '@handlers/useModalHandlers';

interface Button {
    id: number;
    nodeType: NodeType;
    isActive: boolean;
    isVisible: boolean;
}

interface ButtonStore {
    buttons: Button[];
    initialize: (initialActiveIds: number[]) => void;
    toggleButtonState: (id: number) => void;
}

const useButtonStore = create<ButtonStore>((set) => ({
    buttons: [
        { id: 1, nodeType: NodeType.Domain, isActive: false, isVisible: false },
        { id: 2, nodeType: NodeType.User, isActive: false, isVisible: false },
        { id: 3, nodeType: NodeType.Repo, isActive: false, isVisible: false },
        { id: 4, nodeType: NodeType.Unit, isActive: false, isVisible: false },
        { id: 5, nodeType: NodeType.UnitNode, isActive: false, isVisible: false },
    ],

    initialize: (initialActiveIds) => set((state) => {
        const buttons = state.buttons.map((button) => {
            const isActive = initialActiveIds.includes(button.id);
            const isVisible = isActive || initialActiveIds.some((id) => Math.abs(id - button.id) === 1);
            return { ...button, isActive, isVisible };
        });
        return { buttons };
    }),

    toggleButtonState: (id) => set((state) => {
        const buttons = state.buttons.map((button) => {
            if (button.id === id) {
                const isActive = !button.isActive;
                return { ...button, isActive };
            }
            return button;
        });

        const updatedButtons = buttons.map((button) => {
            const isNeighbor = buttons.some(
                (b) => b.isActive && Math.abs(b.id - button.id) === 1
            );
            const isVisible = button.isActive || isNeighbor;
            return { ...button, isVisible };
        });

        return { buttons: updatedButtons };
    }),
}));

export const useButtonHandlers = () => {
    const { toggleButtonState } = useButtonStore();
    const { openModal } = useModalHandlers();
    const { setCurrentNodeData } = useNodeStore();
    const { currentSearchNodeData } = useSearchNodeStore();

    const toggleButton = (id: number) => {
        const button = useButtonStore.getState().buttons.find((btn) => btn.id === id);
        if (!button) return;

        console.log(button.nodeType, currentSearchNodeData.__typename.toLowerCase().slice(0, -4))

        if (button.nodeType === currentSearchNodeData.__typename.toLowerCase().slice(0, -4)) {
            setCurrentNodeData(currentSearchNodeData);
            openModal(currentSearchNodeData.__typename.toLowerCase().slice(0, -4) + 'Menu');
            return;
        }

        toggleButtonState(id);
    };

    return { toggleButton };
};

export default useButtonStore;
