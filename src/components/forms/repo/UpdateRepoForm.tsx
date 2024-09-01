import { ResultType } from '../../../types/resultEnum'
import { VisibilityLevel, RepoType, useGetBranchCommitsLazyQuery, useUpdateRepoMutation } from '../../../types/composition-functions'
import { useState, useEffect } from 'react';
import isValidLogin from '../../../utils/isValidLogin'
import DefaultInput from '../primitives/DefaultInput'
import Spinner from '../primitives/Spinner'
import ResultQuery from '../primitives/ResultQuery'
import '../form.css'

interface CreateRepoFormProps {
    currentRepoData: RepoType;
}

export default function UpdateRepoForm({ currentRepoData }: CreateRepoFormProps) {

    const [currentRepoState, setCurrentRepoState] = useState(currentRepoData)
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

    useEffect(
        () => {
            setCurrentRepoState({
                ...currentRepoData,
                defaultBranch: currentRepoData.defaultBranch === null ? currentRepoData.branches[0] : currentRepoData.defaultBranch
            })
        }, [currentRepoData]
    )

    useEffect(() => {
        console.log(currentRepoState)
        if (currentRepoState.defaultBranch){
            getBranchCommits({
                variables: {
                    uuid: currentRepoState.uuid,
                    repoBranch: currentRepoState.defaultBranch,
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
    }, [currentRepoState.defaultBranch, currentRepoState.isAutoUpdateRepo]);

    const handleUpdateRepo = () => {
        setIsLoaderActive(true)
        setResultData({
            ...resultData,
            message: null
        })

        updateRepoMutation({
            variables: currentRepoState
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

    function getCommitSummary(tag: undefined | null | string, commit: string, summary: string){
        let tagName = tag === null || tag === undefined ? '' : tag
        if (tagName.length != 0){
            tagName += ' - '
        }
        const length = 29 - tagName.length
        const name = summary.length <= length ? summary : summary.slice(0, length) + '...' 
        return tagName + commit.slice(0, 7) + ': ' + name 
    }

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
                        value={currentRepoState.name}
                        validateState={currentRepoState.name}
                        onChange={(e) => setCurrentRepoState({
                                ...currentRepoState,
                                name: e
                            }
                        )}
                        validateFunc={isValidLogin}
                        setIsErrorExist={(hasError) => updateErrorState('name', hasError)}
                        setResultData={setResultData}
                    />
                    <select id='base_enum' value={currentRepoState.visibilityLevel} onChange={(e) => 
                            setCurrentRepoState({
                                ...currentRepoState,
                                visibilityLevel: e.target.value as VisibilityLevel
                            })
                        }
                    >
                        <option value={VisibilityLevel.Public}>Public</option>
                        <option value={VisibilityLevel.Internal}>Internal</option>
                        <option value={VisibilityLevel.Private}>Private</option>
                    </select>

                    <select id='base_enum' value={currentRepoState.defaultBranch === null ? currentRepoState.branches[0] : currentRepoState.defaultBranch} onChange={(e) => {
                            setCurrentRepoState(
                                {
                                    ...currentRepoState,
                                    defaultBranch: e.target.value
                                }
                            )
                        }}
                    >
                        {   
                            currentRepoState.branches.map(
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
                                checked={currentRepoState.isAutoUpdateRepo}
                                onChange={(e) => setCurrentRepoState({
                                            ...currentRepoState,
                                            isAutoUpdateRepo: e.target.checked,
                                            isOnlyTagUpdate:  e.target.checked === false ? e.target.checked : currentRepoState.isOnlyTagUpdate
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
                        currentRepoState.isAutoUpdateRepo ? (
                            <div className='toggle_container'>
                            <label className="toggle">
                                <input 
                                    type="checkbox" 
                                    checked={currentRepoState.isOnlyTagUpdate}
                                    onChange={(e) => setCurrentRepoState({
                                                ...currentRepoState,
                                                isOnlyTagUpdate: e.target.checked,
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
                            <select id='base_enum' value={currentRepoState.defaultCommit === null ? '' : currentRepoState.defaultCommit} onChange={(e) => {
                                setCurrentRepoState({
                                    ...currentRepoState,
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