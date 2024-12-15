import { ResultType } from '@rootTypes/resultEnum'
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
    const [isLoaderActive, setIsLoaderActive] = useState(false)
    const [resultData, setResultData] = useState<{ type: ResultType; message: string | null }>({
        type: ResultType.Happy,
        message: null
    });

    const [getBranchCommits] = useGetBranchCommitsLazyQuery();
    const [updateUnitMutation] = useUpdateUnitMutation();
    const [getAvailablePlatforms] = useGetAvailablePlatformsLazyQuery();
    const [getRepo] = useGetRepoLazyQuery();

    useEffect(() => {
        console.log(currentNodeData)
        if (currentNodeData.repoBranch){
            getBranchCommits({
                variables: {
                    uuid: currentNodeData.repoUuid,
                    repoBranch: currentNodeData.repoBranch,
                    onlyTag: false,
                    limit: 100,
                    offset: 0
                }
            }).then(availableCommits => {
                    if (availableCommits.data?.getBranchCommits){
                        setRepoAvailableCommits(availableCommits.data.getBranchCommits)
                        console.log(availableCommits.data.getBranchCommits)
                    }
                }
            )
        }
    }, [currentNodeData.repoBranch, currentNodeData.isAutoUpdateFromRepoUnit]);

    useEffect(() => {
        getRepo(
            {
                variables: {
                    uuid: currentNodeData.repoUuid
                }
            }
        ).then(repoData => {
                if (repoData.data?.getRepo){
                    setCurrentRepoData(repoData.data.getRepo) 
                }
            }
        )
    }, [currentNodeData]);

    useEffect(() => {
        if (currentRepoData && currentRepoData?.isCompilableRepo){
            let tag = null

            if (!currentNodeData.isAutoUpdateFromRepoUnit && currentNodeData.repoCommit){
                tag = JSON.parse(currentNodeData.repoCommit).tag
            }
            getAvailablePlatforms({
                variables: {
                    uuid: currentNodeData.repoUuid,
                    targetTag: tag
                }
            }).then(availablePlatforms => {
                    if (availablePlatforms.data?.getAvailablePlatforms){
                        console.log(availablePlatforms.data.getAvailablePlatforms)
                        setRepoAvailablePlatforms(availablePlatforms.data.getAvailablePlatforms)
                    }
                }
            )
        }
    }, [currentNodeData.repoCommit, currentNodeData.isAutoUpdateFromRepoUnit]);

    const handleUpdateUnit = () => {
        setIsLoaderActive(true)
        setResultData({
            ...resultData,
            message: null
        })

        let targetRepoCommit = null
        if (currentNodeData.repoCommit){
            try {
                targetRepoCommit = JSON.parse(currentNodeData.repoCommit).commit
            } catch (e) {
                targetRepoCommit = currentNodeData.repoCommit
            }
        }

        currentNodeData = {
            ...currentNodeData,
            repoCommit: targetRepoCommit
        }

        updateUnitMutation({
            variables: currentNodeData
        }).then(UpdateUnitData =>{
            if (UpdateUnitData.data){
                setIsLoaderActive(false)
                setResultData({ type: ResultType.Happy, message: "Unit успешно обновлён"})
            }
        }).catch(error => {
            setIsLoaderActive(false)
            setResultData({ type: ResultType.Angry, message: error.graphQLErrors[0].message.slice(4)})
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