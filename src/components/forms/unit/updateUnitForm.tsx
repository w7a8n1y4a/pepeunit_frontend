import { useResultHandler } from '@rootTypes/useResultHandler';
import { useAsyncHandler } from '@rootTypes/useAsyncHandler';
import { VisibilityLevel, UnitType, useGetBranchCommitsLazyQuery, useUpdateUnitMutation, useGetRepoLazyQuery, RepoType, useGetAvailablePlatformsLazyQuery } from '@rootTypes/compositionFunctions'
import { useState, useEffect } from 'react';
import { getCommitSummary } from '@utils/getCommitSummary';
import isValidLogin from '@utils/isValidLogin'
import DefaultInput from '@primitives/defaultInput'
import Spinner from '@primitives/spinner'
import ResultQuery from '@primitives/resultQuery'
import '../form.css'


interface UpdateUnitFormProps {
    currentNodeData: UnitType;
    setCurrentNodeData: (repo: UnitType | null) => void;
}

export default function UpdateUnitForm({ currentNodeData, setCurrentNodeData }: UpdateUnitFormProps) {
    const { resultData, setResultData, handleError, handleSuccess } = useResultHandler();
    const { isLoaderActive, runAsync } = useAsyncHandler(handleError);

    const [currentRepoData, setCurrentRepoData] = useState<RepoType | null>(null);

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
    const [getRepo] = useGetRepoLazyQuery();

    useEffect(() => {
        runAsync(async () => {
            if (currentNodeData.repoBranch){
                let result = await getBranchCommits({
                    variables: {
                        uuid: currentNodeData.repoUuid,
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
        })
    }, [currentNodeData.repoBranch, currentNodeData.isAutoUpdateFromRepoUnit]);

    useEffect(() => {
        runAsync(async () => {
            setCurrentRepoData(null)
            let result = await getRepo(
                {
                    variables: {
                        uuid: currentNodeData.repoUuid
                    }
                }
            )
            if (result.data?.getRepo){

                let repo = result.data.getRepo
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
            }
        })
    }, [currentNodeData]);

    const handleUpdateUnit = () => {
        runAsync(async () => {
            let updateUnitData = await updateUnitMutation({
                variables: currentNodeData
            })
            if (updateUnitData.data){
                handleSuccess("Unit success update")
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
                        setResultData={setResultData}
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
                            Автообновляемый ?
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
                                    <option value="" disabled selected>Выберите ветку</option>
                                    {   
                                        currentRepoData?.branches.map(
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
                                    <option value="" disabled selected>Выберите коммит</option>
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
                        currentRepoData && currentRepoData.isCompilableRepo && (
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
                                    <option value="" disabled selected>Выберите платформу</option>
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
                Обновить
            </button>
            <ResultQuery
                resultData={resultData}
            />
        </>
    );
}