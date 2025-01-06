import micro from '/images/micro.svg'
import BaseModal from '../modal/baseModal'
import CreateRepoForm from '../forms/repo/createRepoForm'
import './rightMenu.css'

import { useModalStore } from '@stores/baseStore';
import useModalHandlers from '@handlers/useModalHandlers';

export default function RightMenu() {
    const { openModal } = useModalHandlers();
    const { activeModal } = useModalStore();

    return (
        <div className='right_menu_base'>
            <button className="signin_button" onClick={() => openModal('createRepo')}>
                <img src={micro} width="32" height="32" alt="AddRepoImg" />
            </button>
            <BaseModal modalName='Create Repo' open={activeModal === 'createRepo'}>
                <CreateRepoForm/>
            </BaseModal>
        </div>
    )
}
