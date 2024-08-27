import { useGetReposLazyQuery } from '../../types/composition-functions'
import BaseModal from '../modal/BaseModal'
import { ForceGraph3D } from 'react-force-graph';
import UpdateRepoForm from '../forms/repo/UpdateRepoForm';
import UpdateRepoCredentialsForm from '../forms/repo/UpdateRepoCredentialsForm'
import { RepoType } from '../../types/composition-functions'
import { useState, useMemo, useCallback, useEffect } from 'react';

export default function MainContent(){
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [reposData, setReposData] = useState(Array);
  const [currentRepoData, setCurrentRepoData] = useState<RepoType | null>(null)
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
    setCurrentRepoData(node.data)
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
      <BaseModal modalName={'Repo ' + currentRepoData?.name} open={activeModal === 'repoMenu'} closeModal={closeModal}>
        <div className="modal_menu_content">
          <button className="button_open_alter" onClick={() => openModal('createUnit')}>
            Создать Unit
          </button>
          <button className="button_open_alter" onClick={() => openModal('repoSettingsMenu')}>
            Настройки
          </button>
          <button className="button_open_alter" onClick={() => openModal('updateLocalRepo')}>
            Обновить доступные версии
          </button>
          <button className="button_open_alter" onClick={() => openModal('updateUnitsFirmware')}>
            Обновить связанные Unit
          </button>
        </div>
      </BaseModal>
      <BaseModal modalName='Настройки' open={activeModal === 'repoSettingsMenu'} closeModal={closeModal}>
        <div className="modal_menu_content">
          <button className="button_open_alter" onClick={() => openModal('updateRepo')}>
            Параметры
          </button>
          <button className="button_open_alter" onClick={() => openModal('changeCredentials')}>
            Авторизация GIT
          </button>
        </div>
      </BaseModal>
      <BaseModal modalName='Параметры' open={activeModal === 'updateRepo'} closeModal={closeModal}>
        <UpdateRepoForm
          currentRepoData={currentRepoData}
        />
      </BaseModal>
      <BaseModal modalName='Авторизация GIT' open={activeModal === 'changeCredentials'} closeModal={closeModal}>
        <UpdateRepoCredentialsForm/>
      </BaseModal>
    </>
  )
}
