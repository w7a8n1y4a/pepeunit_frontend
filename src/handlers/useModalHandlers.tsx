import { useCallback } from 'react';
import { useModalStore } from '@stores/baseStore';
import { useErrorStore } from '@stores/errorStore';

const useModalHandlers = () => {
  const { setActiveModal, previousModal } = useModalStore();
  const { clearError } = useErrorStore();

  const toggleModal = useCallback((modalType: string | null) => {
    clearError();
    setActiveModal(modalType);
  }, [setActiveModal]);

  return {
    openModal: (modalType: string) => toggleModal(modalType),
    closeModal: () => toggleModal(null),
    previousModal,
  };
};

export default useModalHandlers;
