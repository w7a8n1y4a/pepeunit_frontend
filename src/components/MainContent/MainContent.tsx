import { ResultType } from '../../types/resultEnum'
import { NodeType } from '../../types/nodeTypeEnum'
import { getNodeColor } from '../../utils/getNodeColor'
import { useGetReposLazyQuery, useGetUnitsLazyQuery, useUpdateLocalRepoMutation, useUpdateUnitsFirmwareMutation, useDeleteRepoMutation, useBulkUpdateMutation, useGetBaseMetricsLazyQuery, BaseMetricsType } from '../../types/composition-functions'
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
  const [displayWidth, setDisplayWidth] = useState(window.innerWidth);
  const [displayHeight, setDisplayHeight] = useState(window.innerHeight);

  const [currentDomainData, setCurrentDomainData] = useState<UnitType | null>(null)
  const [baseMetrics, setBaseMetrics] = useState<BaseMetricsType | null>(null)
  const [isLoaderActive, setIsLoaderActive] = useState(false)
  const [resultData, setResultData] = useState<{ type: ResultType; message: string | null }>({
    type: ResultType.Happy,
    message: null
  });
  
  type GraphDataType = {
    nodes: Array<{
      id: string | number;
      type: string;
      color: string; 
      data: any | RepoType; 
    }>,
    links: Array<{
      source: string;
      target: string; 
    }>
  }; 
  const [graphData, setGraphData] = useState<GraphDataType>(
    {
      nodes: [
        {
          id: import.meta.env.VITE_INSTANCE_NAME,
          type: NodeType.Domain,
          color: getNodeColor(NodeType.Domain),
          data: {
            name: import.meta.env.VITE_INSTANCE_NAME
          }
        }
      ],
      links: []
    }
  )

  const forceData = useMemo(() => test(), [graphData])

  useEffect(() => {
    getRepos().then(reposData => {
      if (reposData.data?.getRepos){
        getUnits().then(unitsData => {
          if (unitsData.data?.getUnits && reposData.data?.getRepos){
            setGraphData({
                nodes: [
                  ...graphData.nodes,
                  ...reposData.data.getRepos.map((repo) => ({
                    id: repo.uuid,
                    type: NodeType.Repo,
                    color: getNodeColor(NodeType.Repo),
                    data: repo
                  }
                )),
                  ...unitsData.data.getUnits.map((unit) => ({
                    id: unit.uuid,
                    type: NodeType.Unit,
                    color: getNodeColor(NodeType.Unit),
                    data: unit
                  }
                ))],
                links: [
                  ...graphData.links,
                  ...reposData.data.getRepos.map((all) => ({source: import.meta.env.VITE_INSTANCE_NAME, target: all.uuid})),
                  ...unitsData.data.getUnits.map((all) => ({source: all.repoUuid, target: all.uuid}))
                ]
              }
            )
          }
        })
      }
    })
    getBaseMetrics().then(metrics => {
      if (metrics.data?.getBaseMetrics){
        setBaseMetrics(metrics.data.getBaseMetrics)
      }
    })
  }, []);

  // function test() {
  //   console.log(graphData)
  //   return {
  //     nodes: [{id: 0, data: {name: 'kek'}}, {id: 1, data: {name: 'kekb'}}],
  //     links: [{source: 0, target: 1}]
  //   }
  // }

  function test() {
    console.log(graphData)
    return {
      nodes: graphData.nodes,
      links: graphData.links
    }
  }

  const [getRepos] = useGetReposLazyQuery();
  const [getUnits] = useGetUnitsLazyQuery();
  const [updateLocalRepo] = useUpdateLocalRepoMutation();
  const [updateUnitsFirmware] = useUpdateUnitsFirmwareMutation()
  const [bulkUpdate] = useBulkUpdateMutation()
  const [getBaseMetrics] = useGetBaseMetricsLazyQuery()
  const [deleteRepo] = useDeleteRepoMutation()

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
          console.log(currentUnitData)
          setIsLoaderActive(false)
          setResultData({ type: ResultType.Happy, message: "Запрос обновления связанных Unit отправлен"})
        }
      }).catch(error => {
        setIsLoaderActive(false)
        setResultData({ type: ResultType.Angry, message: error.graphQLErrors[0].message.slice(4)})
      })
    }
  };

  const handleBulkUpdate = () => {
    setIsLoaderActive(true)
    setResultData({
      ...resultData,
      message: null
    })

    bulkUpdate().then(result => {
      if (result.data){
        console.log(result.data)
        setIsLoaderActive(false)
        setResultData({ type: ResultType.Happy, message: "Запрос обновления Repo и Unit отправлен"})
      }
    }).catch(error => {
      setIsLoaderActive(false)
      setResultData({ type: ResultType.Angry, message: error.graphQLErrors[0].message.slice(4)})
    })
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
    if (node.type == NodeType.Domain) {
      openModal("domainMenu")
      setCurrentDomainData(node.data)
    }
    if (node.type == NodeType.Repo) {
      console
      openModal("repoMenu")
      setCurrentRepoData(node.data)
    }
    if (node.type == NodeType.Unit) {
      openModal("unitMenu")
      setCurrentUnitData(node.data)
    }
  }

  window.addEventListener('resize', () => {
    setDisplayWidth(window.innerWidth);
    setDisplayHeight(window.innerHeight);
  });

  return (
    <>
      <ForceGraph3D
        backgroundColor='rgba(10,10,10, 20)'
        width={displayWidth}
        height={displayHeight}
        graphData={forceData}
        enableNodeDrag={false}
        nodeThreeObject={(node: any) => {
          const sprite = new SpriteText(node.data.name) as any;
          sprite.color = "#fff";
          sprite.textHeight = 4;
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
      <BaseModal
        modalName={'' + currentDomainData?.name}
        open={activeModal === 'domainMenu'}
        closeModal={closeModal}
      >
        <div className="modal_menu_content">
          {
            isLoaderActive && (<Spinner/>)
          }
          <button className="button_open_alter" onClick={() => openModal('statistics')}>
            Статистики
          </button>
          <button className="button_open_alter" onClick={handleBulkUpdate}>
            Обновить все Repo и связанные Unit
          </button>
          <ResultQuery
            resultData={resultData}
          />
        </div>
      </BaseModal>
      <BaseModal modalName='Метрики' open={activeModal === 'statistics'} closeModal={closeModal} openModal={openModal} openModalType='domainMenu'>
          <div>
            <div>
              Число User: {baseMetrics?.userCount}
            </div>
            <div>
              Число Repo: {baseMetrics?.repoCount}
            </div>
            <div>
              Число Unit: {baseMetrics?.unitCount}
            </div>
            <div>
              Число UnitNode: {baseMetrics?.unitNodeCount}
            </div>
            <div>
              Число UnitNodeEdge: {baseMetrics?.unitNodeEdgeCount}
            </div>
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
