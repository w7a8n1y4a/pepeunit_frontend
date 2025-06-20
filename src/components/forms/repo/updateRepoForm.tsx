import { useAsyncHandler } from '@handlers/useAsyncHandler';
import { NodeType } from '@rootTypes/nodeTypeEnum'
import { getNodeColor } from '@utils/getNodeColor'
import { VisibilityLevel, useGetBranchCommitsLazyQuery, useUpdateRepoMutation } from '@rootTypes/compositionFunctions'
import { useState, useEffect } from 'react';
import { getCommitSummary } from '@utils/getCommitSummary';
import isValidLogin from '@utils/isValidLogin'
import DefaultInput from '@primitives/defaultInput'
import Spinner from '@primitives/spinner'
import '../form.css'

import { useGraphStore } from '@stores/graphStore';
import { useModalStore } from '@stores/baseStore';
import { useNodeStore } from '@stores/baseStore';
import { useErrorStore } from '@stores/errorStore';


export default function UpdateRepoForm() {
    const { setHappy, setAngry, clearError } = useErrorStore();
    const { isLoaderActive, runAsync } = useAsyncHandler();

    const { activeModal } = useModalStore();

    const { currentNodeData, setCurrentNodeData } = useNodeStore();

    const { graphData, setGraphData } = useGraphStore();

    const [repoAvailableCommits, setRepoAvailableCommits] = useState<Array<{
        __typename?: "CommitType";
        commit: string;
        summary: string;
        tag?: string | null;
    }> | null>(null);

    const [errorState, setErrorState] = useState({
        name: false,
    });

    const [getBranchCommits] = useGetBranchCommitsLazyQuery();
    const [updateRepoMutation] = useUpdateRepoMutation();

    useEffect(() => {
        runAsync(async () => {
            if (currentNodeData.defaultBranch){

                let result = await getBranchCommits({
                    variables: {
                        uuid: currentNodeData.uuid,
                        repoBranch: currentNodeData.defaultBranch,
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
    }, [currentNodeData.defaultBranch, currentNodeData.isAutoUpdateRepo]);

    const handleUpdateRepo = () => {
        runAsync(async () => {
            let updateRepoData = await updateRepoMutation({
                variables: currentNodeData
            })

            if (updateRepoData.data){
                let updateRepo = updateRepoData.data.updateRepo
                
                const newNode = {
                    id: updateRepo.uuid,
                    type: NodeType.Repo,
                    color: getNodeColor(NodeType.Repo),
                    data: updateRepo
                };
            
                const newLink = {
                    source: import.meta.env.VITE_INSTANCE_NAME || window.env.VITE_INSTANCE_NAME,
                    target: updateRepo.uuid,
                    value: 1
                };

                setGraphData({
                    nodes: [...graphData.nodes, newNode],
                    links: [...graphData.links, newLink],
                });

                setHappy("Repo success update")
            }

        })
    };

    const updateErrorState = (field: keyof typeof errorState, hasError: boolean) => {
        setErrorState(prevState => ({
            ...prevState,
            [field]: hasError
        }));
    };

    useEffect(() => {
        if (activeModal == 'updateRepo' && currentNodeData.defaultBranch === null){
            setAngry('Fill in the default branch')
        } else {
            clearError()
        }
    }, [activeModal, currentNodeData]);

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

                    <select id='base_enum' value={currentNodeData.defaultBranch === null ? '' : currentNodeData.defaultBranch} onChange={(e) => {
                            setCurrentNodeData(
                                {
                                    ...currentNodeData,
                                    defaultBranch: e.target.value
                                }
                            )
                        }}
                    >
                        <option value="" disabled selected>Pick branch</option>
                        {
                            currentNodeData.__typename == 'RepoType' && !(currentNodeData.branches.includes(currentNodeData.defaultBranch)) && (
                                <option value={currentNodeData.defaultBranch}>
                                    {currentNodeData.defaultBranch}
                                </option>
                            )
                        }
                        {   
                            currentNodeData.branches?.map(
                                (item: string) => (
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
                            Compilable ?
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
                            Auto-update ?
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
                                Tags only ?
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
                        )
                    }
                </form>
            </div>
            <button className="button_main_action" onClick={handleUpdateRepo} disabled={Object.values(errorState).some(isError => isError)}>
                Update
            </button>
        </>
    );
}