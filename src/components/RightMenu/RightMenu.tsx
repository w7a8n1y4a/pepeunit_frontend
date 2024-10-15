import add_repo_icon from '/images/add_repo_icon.svg'
import { RepoType } from '@rootTypes/composition-functions'
import BaseModal from '../modal/BaseModal'
import CreateRepoForm from '../forms/repo/CreateRepoForm'
import './RightMenu.css'

import { useModalStore } from '@stores/baseStore';
import useModalHandlers from '@handlers/useModalHandlers';

interface RightMenuProps {
    setCurrentRepoData: (repo: RepoType | null) => void;
}

export default function RightMenu({setCurrentRepoData}: RightMenuProps) {
    const { openModal } = useModalHandlers();
    const { activeModal } = useModalStore();

    return (
        <div className='right_menu_base'>
            <button className="signin_button" onClick={() => openModal('createRepo')}>
                <img src={add_repo_icon} width="32" height="32" alt="AddRepoImg" />
            </button>
            <BaseModal modalName='Создание Repo' open={activeModal === 'createRepo'}>
                <CreateRepoForm
                    setCurrentRepoData={setCurrentRepoData}
                />
            </BaseModal>
        </div>
    )
}
