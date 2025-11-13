import { NodeType } from '@rootTypes/nodeTypeEnum'
import { useAsyncHandler } from '@handlers/useAsyncHandler';
import { getNodeColor } from '@utils/getNodeColor'
import {
    useCreateUnitMutation,
    useGetBranchCommitsLazyQuery,
    VisibilityLevel,
    CreateUnitMutationVariables,
    useGetAvailablePlatformsLazyQuery,
    RepositoryRegistryType,
    useGetRepositoryRegistryLazyQuery
} from '@rootTypes/compositionFunctions'
import { useState, useEffect } from 'react';
import { getCommitSummary } from '@utils/getCommitSummary';
import isValidLogin from '@utils/isValidLogin'
import DefaultInput from '@primitives/defaultInput'
import Spinner from '@primitives/spinner'
import '../form.css'

import { useGraphStore } from '@stores/graphStore';
import { useErrorStore } from '@stores/errorStore';
import { useModalStore, useNodeStore } from '@stores/baseStore';


export default function CreateUnitForm() {
    const { isLoaderActive, runAsync } = useAsyncHandler();

    const { activeModal, setActiveModal } = useModalStore();
    const { setAngry, clearError } = useErrorStore();
    const { currentNodeData, setCurrentNodeData } = useNodeStore();

    const [repoAvailableCommits, setRepoAvailableCommits] = useState<Array<{
        __typename?: "CommitType";
        commit: string;
        summary: string;
        tag?: string | null;
    }> | null>(null);

    const [repoAvailablePlatforms, setRepoAvailablePlatforms] = useState<Array<{
        __typename?: "PlatformType";
        name: string;
        link: string;
    }> | null>(null);

    const [repoName, setRepoName] = useState('');
    const [unitVisibilityLevel, setUnitVisibilityLevel] = useState(VisibilityLevel.Public);
    const [isAutoUpdateFromRepoUnit, setIsAutoUpdateFromRepoUnit] = useState(true);
    const [repoBranch, setRepoBranch] = useState<string | null>(null);
    const [repoCommit, setRepoCommit] = useState<string | null>(null);
    const [targetPlatform, setTargetPlatform] = useState<string | null>(null);
    const [ currentRepositoryRegistryData, setCurrentRepositoryRegistryData ] = useState<RepositoryRegistryType | null>(null);
    

    const [errorState, setErrorState] = useState({
        name: true,
        repoBranch: false,
        repoCommit: false
    });

    const { graphData, setGraphData } = useGraphStore();
    
    const updateErrorState = (field: keyof typeof errorState, hasError: boolean) => {
        setErrorState(prevState => ({
            ...prevState,
            [field]: hasError
        }));
    };
    
    const [getBranchCommits] = useGetBranchCommitsLazyQuery();
    const [getAvailablePlatforms] = useGetAvailablePlatformsLazyQuery();
    const [createUnitMutation] = useCreateUnitMutation();
    const [getRepositoryRegistry] = useGetRepositoryRegistryLazyQuery();

    const handleCreateUnit = () => {
        runAsync(async () => {
            let unitVariables: CreateUnitMutationVariables = {
                repoUuid: currentNodeData.uuid,
                visibilityLevel: unitVisibilityLevel,
                name: repoName,
                isAutoUpdateFromRepoUnit: isAutoUpdateFromRepoUnit
            }

            if (currentNodeData.isCompilableRepo){
                unitVariables.targetFirmwarePlatform = targetPlatform
            }
            
            if (!isAutoUpdateFromRepoUnit){
                unitVariables.repoBranch = repoBranch
                unitVariables.repoCommit = repoCommit ? JSON.parse(repoCommit).commit : null
            }
            
            let result = await createUnitMutation({
                variables: unitVariables
            })
            if (result.data){
                let newUnit = result.data.createUnit

                const newNode = {
                    id: newUnit.uuid,
                    type: NodeType.Unit,
                    color: getNodeColor(NodeType.Unit),
                    data: newUnit
                };
            
                const newLink = {
                    source: newUnit.repoUuid,
                    target: newUnit.uuid,
                    value: 1
                };

                setGraphData({
                    nodes: [...graphData.nodes, newNode],
                    links: [...graphData.links, newLink],
                });
                setCurrentNodeData(result.data.createUnit)
                setActiveModal('UnitMenu')
            }
        })
    };

    useEffect(() => {
        if (repoBranch && !isAutoUpdateFromRepoUnit){
            runAsync(async () => {
                let result = await getBranchCommits({
                    variables: {
                        uuid: currentNodeData.repositoryRegistryUuid,
                        repoBranch: repoBranch,
                        onlyTag: false,
                        limit: 100,
                        offset: 0
                    }
                })

                if (result.data?.getBranchCommits){
                    setRepoAvailableCommits(result.data.getBranchCommits)
                }
            })
        }
    }, [repoBranch, isAutoUpdateFromRepoUnit]);

    useEffect(() => {
        if (currentNodeData.isCompilableRepo){
            runAsync(async () => {
                let tag = null

                if (!isAutoUpdateFromRepoUnit && repoCommit){
                    tag = JSON.parse(repoCommit).tag
                }

                let result = await getAvailablePlatforms({
                    variables: {
                        uuid: currentNodeData.uuid,
                        targetTag: tag
                    }
                })
                
                if (result.data?.getAvailablePlatforms){
                    setRepoAvailablePlatforms(result.data.getAvailablePlatforms)
                }
            })
        }
    }, [currentNodeData, repoCommit, isAutoUpdateFromRepoUnit]);

    useEffect(() => {
        if (currentNodeData.__typename == "RepoType"){
            runAsync(async () => {
                setCurrentRepositoryRegistryData(null)
                if (currentNodeData != null) {
                    let repo_registry = await getRepositoryRegistry(
                        {
                            variables: {
                                uuid: currentNodeData.repositoryRegistryUuid
                            }
                        }
                    )
                    if (repo_registry.data?.getRepositoryRegistry){
                        setCurrentRepositoryRegistryData(repo_registry.data.getRepositoryRegistry)
                    }
                }
            })
        }
    }, [currentNodeData]);

    useEffect(() => {
        if (activeModal == 'createUnit' && isAutoUpdateFromRepoUnit && currentNodeData.defaultBranch === null){
            setAngry('Fill in the default branch for Repo - you can\'t make Unit auto-update without it')
        } else {
            clearError()
        }
    }, [
        activeModal,
        isAutoUpdateFromRepoUnit,
        currentNodeData,
    ]);

    return (
        <>  
            {
                isLoaderActive && (<Spinner/>)
            }
            <div>
                <form>
                    <DefaultInput
                        id="name_set"
                        type="text"
                        placeholder="Name"
                        value={repoName}
                        validateState={repoName}
                        onChange={setRepoName}
                        validateFunc={isValidLogin}
                        setIsErrorExist={(hasError) => updateErrorState('name', hasError)}
                    />
                    <select id='base_enum' value={unitVisibilityLevel} onChange={(e) => {
                        setUnitVisibilityLevel(e.target.value as VisibilityLevel); 
                    }}
                    >
                        <option value={VisibilityLevel.Public}>Public</option>
                        <option value={VisibilityLevel.Internal}>Internal</option>
                        <option value={VisibilityLevel.Private}>Private</option>
                    </select>
                    <div className='toggle_container'>
                        <label className="toggle">
                            <input 
                                type="checkbox" 
                                checked={isAutoUpdateFromRepoUnit}
                                onChange={(e) => { setIsAutoUpdateFromRepoUnit(e.target.checked)
                                        if (!e.target.checked) { 
                                            setErrorState(
                                                {
                                                    ...errorState,
                                                    repoBranch: false,
                                                    repoCommit: false
                                                }
                                            )

                                            setRepoBranch(null)
                                            setRepoCommit(null)
                                        }
                                    }
                                } 
                            />
                            <span className="slider"></span>
                        </label>
                        <div className="toggle_text">
                            Auto-update ?
                        </div>
                    </div>
                    {
                        !isAutoUpdateFromRepoUnit && (
                            <div>
                                <select id='base_enum' value={repoBranch === null ? '' : repoBranch} onChange={(e) => {
                                        setRepoBranch(e.target.value)
                                    }}
                                >
                                    <option value="" disabled selected>Pick branch</option>
                                    {   
                                        currentNodeData.__typename == 'RepoType' && currentRepositoryRegistryData && currentRepositoryRegistryData.branches.map(
                                            (item: string) => (
                                                <option value={item}>
                                                    {item}
                                                </option>
                                            )
                                        )
                                    }
                                </select>
                                <select id='base_enum' value={repoCommit === null ? '' : repoCommit} onChange={(e) => {
                                        setRepoCommit(e.target.value)
                                    }}
                                >   
                                    <option value="" disabled selected>Pick commit</option>
                                    {   
                                        repoAvailableCommits?.map(
                                            item => (
                                                <option value={JSON.stringify({commit: item.commit, tag: item.tag})}>
                                                    {getCommitSummary(item.tag, item.commit, item.summary)}
                                                </option>
                                            )
                                        )
                                    }
                                </select>
                            </div>
                        )
                    }

                    {
                        currentNodeData.isCompilableRepo && (
                            <select id='base_enum' value={targetPlatform === null ? '' : targetPlatform} onChange={(e) => {
                                    setTargetPlatform(e.target.value)
                                }}
                            >   
                                <option value="" disabled selected>Pick platform</option>
                                {   
                                    repoAvailablePlatforms?.map(
                                        item => (
                                            <option value={item.name}>
                                                {item.name}
                                            </option>
                                        )
                                    )
                                }
                            </select>
                        )
                    }
                </form>
            </div>
            <button className="button_main_action" onClick={handleCreateUnit} disabled={Object.values(errorState).some(isError => isError)}>
                Create
            </button>
        </>
    );
}