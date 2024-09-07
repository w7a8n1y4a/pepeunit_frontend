import { ResultType } from '../../types/resultEnum'
import { useGetReposLazyQuery, useUpdateLocalRepoMutation, useUpdateUnitsFirmwareMutation, useDeleteRepoMutation } from '../../types/composition-functions'
import BaseModal from '../modal/BaseModal'
import { ForceGraph3D } from 'react-force-graph';
import CreateUnitForm from '../forms/unit/CreateUnitForm';
import UpdateRepoForm from '../forms/repo/UpdateRepoForm';
import UpdateRepoCredentialsForm from '../forms/repo/UpdateRepoCredentialsForm'
import { RepoType, UnitType } from '../../types/composition-functions'
import SpriteText from 'three-spritetext';
import { useState, useMemo, useCallback, useEffect } from 'react';
import Spinner from '../forms/primitives/Spinner'
import ResultQuery from '../forms/primitives/ResultQuery'

interface MainContentProps {
  activeModal: string | null
  setActiveModal: (show: string | null) => void;
  currentRepoData: RepoType | null
  setCurrentRepoData: (repo: RepoType | null) => void;
  currentUnitData: UnitType | null
  setCurrentUnitData: (repo: UnitType | null) => void;
}

export default function MainContent({activeModal, setActiveModal, currentRepoData, setCurrentRepoData, currentUnitData, setCurrentUnitData}: MainContentProps){
  const [reposData, setReposData] = useState(Array);
  const [displayWidth, setDisplayWidth] = useState(window.innerWidth);
  const [displayHeight, setDisplayHeight] = useState(window.innerHeight);

  const [isLoaderActive, setIsLoaderActive] = useState(false)
  const [resultData, setResultData] = useState<{ type: ResultType; message: string | null }>({
    type: ResultType.Happy,
    message: null
});
  
  const [getRepos] = useGetReposLazyQuery();
  const [updateLocalRepo] = useUpdateLocalRepoMutation();
  const [updateUnitsFirmware] = useUpdateUnitsFirmwareMutation()
  const [deleteRepo] = useDeleteRepoMutation()

  const forceData = useMemo(() => test(), [reposData])

  const handleUpdateLocalRepo = () => {
    setIsLoaderActive(true)
    setResultData({
      ...resultData,
      message: null
    })

    if (currentRepoData){
      updateLocalRepo(
        {
          variables: {
            uuid: currentRepoData.uuid
          }
        }
      ).then(result => {
        if (result.data){
          setIsLoaderActive(false)
          setResultData({ type: ResultType.Happy, message: "Запрос обновления отправлен"})
        }
      }).catch(error => {
        setIsLoaderActive(false)
        setResultData({ type: ResultType.Angry, message: error.graphQLErrors[0].message.slice(4)})
      })
    }
  };

  const handleUpdateUnitsFirmware = () => {
    setIsLoaderActive(true)
    setResultData({
      ...resultData,
      message: null
    })

    if (currentRepoData){
      updateUnitsFirmware(
        {
          variables: {
            uuid: currentRepoData.uuid
          }
        }
      ).then(result => {
        if (result.data){
          setIsLoaderActive(false)
          setResultData({ type: ResultType.Happy, message: "Запрос обновления связанных Unit отправлен"})
        }
      }).catch(error => {
        setIsLoaderActive(false)
        setResultData({ type: ResultType.Angry, message: error.graphQLErrors[0].message.slice(4)})
      })
    }
  };

  const handleDeleteRepo = () => {
    setIsLoaderActive(true)
    setResultData({
      ...resultData,
      message: null
    })

    if (currentRepoData){
      deleteRepo(
        {
          variables: {
            uuid: currentRepoData.uuid
          }
        }
      ).then(result => {
        if (result.data){
          setIsLoaderActive(false)
          setActiveModal(null)
        }
      }).catch(error => {
        setIsLoaderActive(false)
        setResultData({ type: ResultType.Angry, message: error.graphQLErrors[0].message.slice(4)})
      })
    }
  };

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
  console.log(currentUnitData)

  return (
    <>
      <ForceGraph3D
        backgroundColor='rgba(10,10,10, 1)'
        width={displayWidth}
        height={displayHeight}
        graphData={forceData}
        nodeThreeObject={(node: any) => {
          const sprite = new SpriteText(node.data.name) as any;
          sprite.color = "#fff";
          sprite.textHeight = 6;
          sprite.position.y = 10;
          return sprite;
        }}
        nodeThreeObjectExtend={true}
        showNavInfo={false}
        onNodeClick={(node) => kek(node)}
      />
      <BaseModal
        modalName={'Repo ' + currentRepoData?.name}
        open={activeModal === 'repoMenu'}
        closeModal={closeModal}
      >
        <div className="modal_menu_content">
          {
            isLoaderActive && (<Spinner/>)
          }
          <button className="button_open_alter" onClick={() => openModal('createUnit')}>
            Создать Unit
          </button>
          <button className="button_open_alter" onClick={() => openModal('repoSettingsMenu')}>
            Настройки
          </button>
          <button className="button_open_alter" onClick={handleUpdateLocalRepo}>
            Обновить доступные версии
          </button>
          <button className="button_open_alter" onClick={handleUpdateUnitsFirmware}>
            Обновить связанные Unit
          </button>
          <ResultQuery
            resultData={resultData}
          />
        </div>

      </BaseModal>
      <BaseModal modalName='Создание Unit' open={activeModal === 'createUnit'} closeModal={closeModal} openModal={openModal} openModalType='repoMenu'>
        {
          currentRepoData && (
            <CreateUnitForm
              setActiveModal={setActiveModal}
              currentRepoData={currentRepoData}
              setCurrentUnitData={setCurrentUnitData}
            />
          )
        }
      </BaseModal>
      <BaseModal
        modalName='Настройки'
        open={activeModal === 'repoSettingsMenu'}
        closeModal={closeModal}
        openModal={openModal} 
        openModalType='repoMenu'
        >
        <div className="modal_menu_content">
          {
            isLoaderActive && (<Spinner/>)
          }
          <button className="button_open_alter" onClick={() => openModal('updateRepo')}>
            Параметры
          </button>
          {
            currentRepoData && !currentRepoData.isPublicRepository && (
              <button className="button_open_alter" onClick={() => openModal('changeCredentials')}>
                Авторизация GIT
              </button>
            )
          }
          <button className="button_open_alter" onClick={handleDeleteRepo}>
            Удалить
          </button>
          <ResultQuery
            resultData={resultData}
          />
        </div>
      </BaseModal>
      <BaseModal
        modalName='Параметры Repo'
        open={activeModal === 'updateRepo'}
        closeModal={closeModal}
        openModal={openModal} 
        openModalType='repoSettingsMenu'  
      >
        {
          currentRepoData && (
            <UpdateRepoForm
              currentRepoData={currentRepoData}
              setCurrentRepoData={setCurrentRepoData}
            />
          )
        }
      </BaseModal>
      <BaseModal
        modalName='Авторизация GIT'
        open={activeModal === 'changeCredentials'}
        closeModal={closeModal}
        openModal={openModal} 
        openModalType='repoSettingsMenu'
      >
        {
          currentRepoData && (
            <UpdateRepoCredentialsForm
              currentRepoData={currentRepoData}
            />
          )
        }
      </BaseModal>
    </>
  )
}
