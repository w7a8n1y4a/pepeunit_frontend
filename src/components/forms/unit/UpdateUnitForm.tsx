import { ResultType } from '@rootTypes/resultEnum'
import { VisibilityLevel, UnitType, useGetBranchCommitsLazyQuery, useUpdateUnitMutation, useGetRepoLazyQuery } from '@rootTypes/composition-functions'
import { useState, useEffect } from 'react';
import { getCommitSummary } from '@utils/getCommitSummary';
import isValidLogin from '@utils/isValidLogin'
import DefaultInput from '../primitives/DefaultInput'
import Spinner from '../primitives/Spinner'
import ResultQuery from '../primitives/ResultQuery'
import '../form.css'

import { useRepoStore } from '@stores/baseStore';

interface UpdateUnitFormProps {
    currentUnitData: UnitType;
    setCurrentUnitData: (repo: UnitType | null) => void;
}

export default function UpdateUnitForm({ currentUnitData, setCurrentUnitData }: UpdateUnitFormProps) {
    const { currentRepoData, setCurrentRepoData } = useRepoStore();

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
    const [updateUnitMutation] = useUpdateUnitMutation();
    const [getRepo] = useGetRepoLazyQuery();

    useEffect(() => {
        console.log(currentUnitData)
        if (currentUnitData.repoBranch){
            getBranchCommits({
                variables: {
                    uuid: currentUnitData.repoUuid,
                    repoBranch: currentUnitData.repoBranch,
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
    }, [currentUnitData.repoBranch, currentUnitData.isAutoUpdateFromRepoUnit]);

    useEffect(() => {
        getRepo(
            {
                variables: {
                    uuid: currentUnitData.repoUuid
                }
            }
        ).then(repoData => {
                if (repoData.data?.getRepo){
                    console.log(repoData.data.getRepo)
                    setCurrentRepoData(repoData.data.getRepo) 
                }
            }
        )
    }, []);

    const handleUpdateUnit = () => {
        setIsLoaderActive(true)
        setResultData({
            ...resultData,
            message: null
        })

        updateUnitMutation({
            variables: currentUnitData
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
                        value={currentUnitData.name}
                        validateState={currentUnitData.name}
                        onChange={(e) => setCurrentUnitData({
                            ...currentUnitData,
                            name: e
                        }
                    )}
                        validateFunc={isValidLogin}
                        setIsErrorExist={(hasError) => updateErrorState('name', hasError)}
                        setResultData={setResultData}
                    />
                    <select id='base_enum' value={currentUnitData.visibilityLevel} onChange={(e) => 
                            setCurrentUnitData({
                                ...currentUnitData,
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
                                checked={currentUnitData.isAutoUpdateFromRepoUnit}
                                onChange={(e) => {
                                        setCurrentUnitData({
                                                ...currentUnitData,
                                                isAutoUpdateFromRepoUnit: e.target.checked,
                                                repoBranch: e.target.checked === false ? null : currentUnitData.repoBranch,
                                                repoCommit: e.target.checked === false ? null : currentUnitData.repoCommit,
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
                        !currentUnitData.isAutoUpdateFromRepoUnit && (
                            <div>
                                <select
                                    id='base_enum'
                                    value={currentUnitData.repoBranch === null ? '' : currentUnitData.repoBranch}
                                    onChange={(e) => {
                                        setCurrentUnitData({
                                                ...currentUnitData,
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
                                    value={currentUnitData.repoCommit === null ? '' : currentUnitData.repoCommit}
                                    onChange={(e) => {
                                        setCurrentUnitData({
                                                ...currentUnitData,
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