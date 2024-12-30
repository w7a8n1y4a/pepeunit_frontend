import back_img from '/images/back.svg'
import './searchMenu.css'

import { useSearchNodeStore, useReloadBaseGraphDataStore, useNodeStore } from '@stores/baseStore';
import useModalHandlers from '@handlers/useModalHandlers';



export default function SearchMenu() {
    const { openModal } = useModalHandlers();

    const { setCurrentNodeData } = useNodeStore();
    const { currentSearchNodeData } = useSearchNodeStore();
    const { reloadState, setReloadState } = useReloadBaseGraphDataStore();

    return (
        <>
            <div className="search-div">
                <button aria-label="Search" className="search-button" onClick={() => openModal('graphSearch')}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" width="20" height="20">
                        <path d="M11 4a7 7 0 1 1 0 14a7 7 0 0 1 0-14zm0-2a9 9 0 1 0 6.219 15.546l4.396 4.395l1.414-1.414l-4.395-4.396A9 9 0 0 0 11 2z" fill="currentColor"/>
                    </svg>
                    Search
                </button>
            </div>

            {
                currentSearchNodeData && (
                    <div className="search-mod-menu">
                        <button className="search-button" onClick={() => {setReloadState(!reloadState)}}>
                            <img src={back_img} width="20" height="20" alt="Back"/>
                        </button>
                        <button className="search-button" onClick={() => {
                                setCurrentNodeData(currentSearchNodeData)
                                openModal(currentSearchNodeData.__typename.toLowerCase().slice(0,-4) + 'Menu')
                            }}>
                            {currentSearchNodeData.name || currentSearchNodeData.login}
                        </button>
                    </div>
                )
            }
        </>
    )
}
