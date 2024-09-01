import add_repo_icon from '/images/add_repo_icon.svg'
import { RepoType } from './../../types/composition-functions'
import BaseModal from '../modal/BaseModal'
import CreateRepoForm from '../forms/repo/CreateRepoForm'
import './RightMenu.css'

interface RightMenuProps {
    activeModal: string | null
    setActiveModal: (show: string | null) => void
    openModal: (modalType: string) => void
    closeModal: () => void
    setCurrentRepoData: (repo: RepoType | null) => void;
}

export default function RightMenu({activeModal, setActiveModal, openModal, closeModal, setCurrentRepoData}: RightMenuProps) {
    return (
        <div className='right_menu_base'>
            <button className="signin_button" onClick={() => openModal('createRepo')}>
                <img src={add_repo_icon} width="32" height="32" alt="AddRepoImg" />
            </button>
            <BaseModal modalName='Создание Repo' open={activeModal === 'createRepo'} closeModal={closeModal}>
                <CreateRepoForm
                    setActiveModal={setActiveModal}
                    setCurrentRepoData={setCurrentRepoData}
                />
            </BaseModal>
        </div>
    )
}
