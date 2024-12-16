import { ResultType } from '@rootTypes/resultEnum'
import { VisibilityLevel, RepoType, useGetBranchCommitsLazyQuery, useUpdateRepoMutation } from '@rootTypes/compositionFunctions'
import { useState, useEffect } from 'react';
import { getCommitSummary } from '@utils/getCommitSummary';
import isValidLogin from '@utils/isValidLogin'
import DefaultInput from '@primitives/defaultInput'
import Spinner from '@primitives/spinner'
import ResultQuery from '@primitives/resultQuery'
import '../form.css'

interface UpdateRepoFormProps {
    currentNodeData: RepoType;
    setCurrentNodeData: (repo: RepoType | null) => void;
}

export default function UpdateRepoForm({ currentNodeData, setCurrentNodeData }: UpdateRepoFormProps) {

    const [repoAvailableCommits, setRepoAvailableCommits] = useState<Array<{
        __typename?: "CommitType";
        commit: string;
        summary: string;
        tag?: string | null;
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
    const [updateRepoMutation] = useUpdateRepoMutation();

    useEffect(() => {
        console.log(currentNodeData)
        if (currentNodeData.defaultBranch){
            getBranchCommits({
                variables: {
                    uuid: currentNodeData.uuid,
                    repoBranch: currentNodeData.defaultBranch,
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
    }, [currentNodeData.defaultBranch, currentNodeData.isAutoUpdateRepo]);

    const handleUpdateRepo = () => {
        setIsLoaderActive(true)
        setResultData({
            ...resultData,
            message: null
        })

        updateRepoMutation({
            variables: currentNodeData
        }).then(UpdateRepoData =>{
            if (UpdateRepoData.data){
                setIsLoaderActive(false)
                setResultData({ type: ResultType.Happy, message: "Repo успешно обновлён"})
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
            {
                currentNodeData.defaultBranch === null && (
                    <ResultQuery
                        resultData={{
                            type: ResultType.Angry,
                            message: 'Заполните ветку по умолчанию'
                        }}
                    />
                )
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

                    <select id='base_enum' value={currentNodeData.defaultBranch === null ? '' : currentNodeData.defaultBranch} onChange={(e) => {
                            setCurrentNodeData(
                                {
                                    ...currentNodeData,
                                    defaultBranch: e.target.value
                                }
                            )
                        }}
                    >
                        <option value="" disabled selected>Выберите ветку</option>
                        {   
                            currentNodeData.branches?.map(
                                item => (
                                    <option value={item}>
                                        {item}
                                    </option>
                                )
                            )
                        }
                    </select>

                    <div className='toggle_container'>
                        <label className="toggle">
                            <input 
                                type="checkbox" 
                                checked={currentNodeData.isCompilableRepo}
                                onChange={(e) => { setCurrentNodeData({
                                        ...currentNodeData,
                                        isCompilableRepo: e.target.checked,
                                    })
                                }} 
                            />
                            <span className="slider"></span>
                        </label>
                        <div className="toggle_text">
                            Компилируемый ?
                        </div>
                    </div>

                    <div className='toggle_container'>
                        <label className="toggle">
                            <input 
                                type="checkbox" 
                                checked={currentNodeData.isAutoUpdateRepo}
                                onChange={(e) => setCurrentNodeData({
                                            ...currentNodeData,
                                            isAutoUpdateRepo: e.target.checked,
                                            isOnlyTagUpdate: currentNodeData.isCompilableRepo ? true : e.target.checked === false ? e.target.checked : currentNodeData.isOnlyTagUpdate
                                        }
                                    )
                                } 
                            />
                            <span className="slider"></span>
                        </label>
                        <div className="toggle_text">
                            Автообновляемый ?
                        </div>
                    </div>
                    {
                        currentNodeData.isAutoUpdateRepo ? (
                            <div className='toggle_container'>
                            <label className="toggle">
                                <input 
                                    type="checkbox" 
                                    checked={currentNodeData.isOnlyTagUpdate}
                                    onChange={(e) => setCurrentNodeData({
                                                ...currentNodeData,
                                                isOnlyTagUpdate: currentNodeData.isCompilableRepo ? true : e.target.checked,
                                            }
                                        )
                                    } 
                                />
                                <span className="slider"></span>
                            </label>
                            <div className="toggle_text">
                                Только Теги ?
                            </div>
                        </div>
                        ) : (
                            <select id='base_enum' value={currentNodeData.defaultCommit === null ? '' : currentNodeData.defaultCommit} onChange={(e) => {
                                setCurrentNodeData({
                                    ...currentNodeData,
                                    defaultCommit: e.target.value
                                })
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
                        )
                    }
                </form>
            </div>
            <button className="button_main_action" onClick={handleUpdateRepo} disabled={Object.values(errorState).some(isError => isError)}>
                Обновить
            </button>
            <ResultQuery
                resultData={resultData}
            />
        </>
    );
}