import { useAsyncHandler } from '@handlers/useAsyncHandler';
import { VisibilityLevel, useGetBranchCommitsLazyQuery, useUpdateUnitMutation, useGetRepoLazyQuery, RepoType, useGetAvailablePlatformsLazyQuery, RepositoryRegistryType, useGetRepositoryRegistryLazyQuery } from '@rootTypes/compositionFunctions'
import { useState, useEffect } from 'react';
import { getCommitSummary } from '@utils/getCommitSummary';
import isValidLogin from '@utils/isValidLogin'
import DefaultInput from '@primitives/defaultInput'
import Spinner from '@primitives/spinner'
import '../form.css'

import { useNodeStore } from '@stores/baseStore';
import { useErrorStore } from '@stores/errorStore';


export default function UpdateUnitForm() {
    const { setHappy } = useErrorStore();
    const { isLoaderActive, runAsync } = useAsyncHandler();

    const { currentNodeData, setCurrentNodeData } = useNodeStore();
    const [ currentRepositoryRegistryData, setCurrentRepositoryRegistryData ] = useState<RepositoryRegistryType | null>(null);
    const [ currentRepoData, setCurrentRepoData ] = useState<RepoType | null>(null);

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

    const [errorState, setErrorState] = useState({
        name: false,
    });

    const [getBranchCommits] = useGetBranchCommitsLazyQuery();
    const [updateUnitMutation] = useUpdateUnitMutation();
    const [getAvailablePlatforms] = useGetAvailablePlatformsLazyQuery();
    const [getRepositoryRegistry] = useGetRepositoryRegistryLazyQuery();
    const [getRepo] = useGetRepoLazyQuery();

    useEffect(() => {
        runAsync(async () => {
            if (currentNodeData.repoBranch){

                let repo = await getRepo({
                variables: {
                    uuid: currentNodeData.repoUuid
                }
                })
                if (repo.data?.getRepo){
                    let result = await getBranchCommits({
                        variables: {
                            uuid: repo.data?.getRepo.repositoryRegistryUuid,
                            repoBranch: currentNodeData.repoBranch,
                            onlyTag: false,
                            limit: 100,
                            offset: 0
                        }
                    })
                    
                    if (result.data?.getBranchCommits){
                        setRepoAvailableCommits(result.data.getBranchCommits)
                    }
                }
            }
        })
    }, [currentNodeData.repoBranch, currentNodeData.isAutoUpdateFromRepoUnit]);

    useEffect(() => {
        runAsync(async () => {
            setCurrentRepoData(null)
            let repo_result = await getRepo(
                {
                    variables: {
                        uuid: currentNodeData.repoUuid
                    }
                }
            )
            if (repo_result.data?.getRepo){

                let repo = repo_result.data.getRepo
                setCurrentRepoData(repo)
                setRepoAvailablePlatforms(null)

                if (repo.isCompilableRepo){
                    let commit = null

                    if (!currentNodeData.isAutoUpdateFromRepoUnit && currentNodeData.repoCommit){
                        commit = currentNodeData.repoCommit
                    }
                    getAvailablePlatforms({
                        variables: {
                            uuid: currentNodeData.repoUuid,
                            targetCommit: commit
                        }
                    }).then(availablePlatforms => {
                            if (availablePlatforms.data?.getAvailablePlatforms){
                                setRepoAvailablePlatforms(availablePlatforms.data.getAvailablePlatforms)
                            }
                        }
                    )
                }

                setCurrentRepositoryRegistryData(null)
                if (currentRepoData != null) {
                    let repo_registry = await getRepositoryRegistry(
                        {
                            variables: {
                                uuid: currentRepoData.repositoryRegistryUuid
                            }
                        }
                    )
                    if (repo_registry.data?.getRepositoryRegistry){
                        setCurrentRepositoryRegistryData(repo_registry.data.getRepositoryRegistry)
                    }
                }
            }
        })
    }, [currentNodeData]);

    const handleUpdateUnit = () => {
        runAsync(async () => {
            let updateUnitData = await updateUnitMutation({
                variables: currentNodeData
            })
            if (updateUnitData.data){
                setHappy("Unit success update")
            }
        })
    };

    const updateErrorState = (field: keyof typeof errorState, hasError: boolean) => {
        setErrorState(prevState => ({
            ...prevState,
            [field]: hasError
        }));
    };

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
                        value={currentNodeData.name}
                        validateState={currentNodeData.name}
                        onChange={(e) => setCurrentNodeData({
                            ...currentNodeData,
                            name: e
                        }
                    )}
                        validateFunc={isValidLogin}
                        setIsErrorExist={(hasError) => updateErrorState('name', hasError)}
                    />
                    <select id='base_enum' value={currentNodeData.visibilityLevel} onChange={(e) => 
                            setCurrentNodeData({
                                ...currentNodeData,
                                visibilityLevel: e.target.value as VisibilityLevel
                            })
                        }
                    >
                        <option value={VisibilityLevel.Public}>Public</option>
                        <option value={VisibilityLevel.Internal}>Internal</option>
                        <option value={VisibilityLevel.Private}>Private</option>
                    </select>
                    <div className='toggle_container'>
                        <label className="toggle">
                            <input 
                                type="checkbox" 
                                checked={currentNodeData.isAutoUpdateFromRepoUnit}
                                onChange={(e) => {
                                        setCurrentNodeData({
                                                ...currentNodeData,
                                                isAutoUpdateFromRepoUnit: e.target.checked,
                                                repoBranch: e.target.checked === false ? null : currentNodeData.repoBranch,
                                                repoCommit: e.target.checked === false ? null : currentNodeData.repoCommit,
                                            }
                                        )
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
                        !currentNodeData.isAutoUpdateFromRepoUnit && (
                            <div>
                                <select
                                    id='base_enum'
                                    value={currentNodeData.repoBranch === null ? '' : currentNodeData.repoBranch}
                                    onChange={(e) => {
                                        setCurrentNodeData({
                                                ...currentNodeData,
                                                repoBranch: e.target.value,
                                            }
                                        )
                                    }}
                                >
                                    <option value="" disabled selected>Pick branch</option>
                                    {   
                                        currentRepositoryRegistryData?.branches.map(
                                            item => (
                                                <option value={item}>
                                                    {item}
                                                </option>
                                            )
                                        )
                                    }
                                </select>
                                <select
                                    id='base_enum'
                                    value={currentNodeData.repoCommit === null ? '' : currentNodeData.repoCommit}
                                    onChange={(e) => {
                                        setCurrentNodeData({
                                                ...currentNodeData,
                                                repoCommit: e.target.value,
                                            }
                                        )
                                    }}
                                >   
                                    <option value="" disabled selected>Pick commit</option>
                                    {   
                                        repoAvailableCommits?.map(
                                            item => (
                                                <option value={item.commit}>
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
                        currentRepoData && currentRepoData.isCompilableRepo && currentNodeData.repoUuid == currentRepoData.uuid && (
                            <div>
                                <select
                                    id='base_enum'
                                    value={
                                        currentNodeData.targetFirmwarePlatform === null ? '' : currentNodeData.targetFirmwarePlatform
                                    }
                                    onChange={(e) => {
                                            setCurrentNodeData({
                                                ...currentNodeData,
                                                targetFirmwarePlatform: e.target.value,
                                            }
                                        )
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
                            </div>
                        )
                    }
                </form>
            </div>
            <button className="button_main_action" onClick={handleUpdateUnit} disabled={Object.values(errorState).some(isError => isError)}>
                Update
            </button>
        </>
    );
}