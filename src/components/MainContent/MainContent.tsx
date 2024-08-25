import { useGetReposLazyQuery } from '../../types/composition-functions'
import BaseModal from '../modal/BaseModal'
import { ForceGraph3D } from 'react-force-graph';
import { useState, useMemo, useCallback, useEffect } from 'react';

export default function MainContent(){
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [reposData, setReposData] = useState(Array);
  const [displayWidth, setDisplayWidth] = useState(window.innerWidth);
  const [displayHeight, setDisplayHeight] = useState(window.innerHeight);
  const [getRepos] = useGetReposLazyQuery();
  const forceData = useMemo(() => test(), [reposData])

  const openModal = useCallback((modalType: string) => {
    setActiveModal(modalType);
  }, []);

  const closeModal = useCallback(() => {
      setActiveModal(null);
  }, []);


  function kek(node: any){
    openModal("repoMenu")
    console.log(node.data)
  }

  window.addEventListener('resize', () => {
    setDisplayWidth(window.innerWidth);
    setDisplayHeight(window.innerHeight);
  });

  useEffect(() => {
    getRepos().then(reposData => {
      if (reposData.data?.getRepos){
        setReposData(reposData.data.getRepos)
      }
    })
  }, []);
  
  function test() {
    return {
      nodes: reposData !== null ? reposData.map((all, i) => ({id:i, data: all})) : [],
      links: []
    }
  }

  return (
    <>
      <ForceGraph3D
        backgroundColor='rgba(10,10,10, 1)'
        width={displayWidth}
        height={displayHeight}
        graphData={forceData}
        showNavInfo={false}
        onNodeClick={(node) => kek(node)}
      />
      <BaseModal modalName='Меню' open={activeModal === 'repoMenu'} closeModal={closeModal}>
        <div className="modal_menu_content">
            <button className="button_open_alter" onClick={() => openModal('verification')}>
                Верификация в Telegram
            </button>
            <button className="button_open_alter" onClick={() => openModal('changeLogin')}>
                Изменить
            </button>
            <button className="button_open_alter" onClick={() => openModal('changePass')}>
                Создать Unit
            </button>
        </div>
      </BaseModal>
    </>
  )
}
