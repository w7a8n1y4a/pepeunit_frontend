import { useCallback } from 'react';
import { useModalStore } from '@stores/baseStore';

const useModalHandlers = () => {
    const { setActiveModal } = useModalStore();

    const toggleModal = useCallback((modalType: string | null) => {
        setActiveModal(modalType);
    }, [setActiveModal]);

    return {
        openModal: (modalType: string) => toggleModal(modalType),
        closeModal: () => toggleModal(null),
    };
};

export default useModalHandlers;
