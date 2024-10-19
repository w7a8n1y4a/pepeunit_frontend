import { ResultType } from '@rootTypes/resultEnum'
import { NodeType } from '@rootTypes/nodeTypeEnum'
import { getNodeColor } from '@utils/getNodeColor'
import { useCreateUnitMutation, useGetBranchCommitsLazyQuery, VisibilityLevel, CreateUnitMutationVariables, RepoType } from '@rootTypes/compositionFunctions'
import { useState, useEffect } from 'react';
import { getCommitSummary } from '@utils/getCommitSummary';
import isValidLogin from '@utils/isValidLogin'
import DefaultInput from '@primitives/defaultInput'
import Spinner from '@primitives/spinner'
import ResultQuery from '@primitives/resultQuery'
import '../form.css'

import { useGraphStore } from '@stores/graphStore';
import { useModalStore, useNodeStore } from '@stores/baseStore';

interface CreateRepoFormProps {
    currentNodeData: RepoType;
}

export default function CreateRepoForm({ currentNodeData }:CreateRepoFormProps) {
    const { setActiveModal } = useModalStore();
    const { setCurrentNodeData } = useNodeStore();

    const [repoAvailableCommits, setRepoAvailableCommits] = useState<Array<{
        __typename?: "CommitType";
        commit: string;
        summary: string;
        tag?: string | null;
    }> | null>(null);

    const [repoName, setRepoName] = useState('');
    const [unitVisibilityLevel, setUnitVisibilityLevel] = useState(VisibilityLevel.Public);
    const [isAutoUpdateFromRepoUnit, setIsAutoUpdateFromRepoUnit] = useState(true);
    const [repoBranch, setRepoBranch] = useState<string | null>(null);
    const [repoCommit, setRepoCommit] = useState<string | null>(null);

    const [errorState, setErrorState] = useState({
        name: true,
        repoBranch: false,
        repoCommit: false
    });
    const [isLoaderActive, setIsLoaderActive] = useState(false)
    const [resultData, setResultData] = useState<{ type: ResultType; message: string | null }>({
        type: ResultType.Happy,
        message: null
    });

    const { graphData, setGraphData } = useGraphStore();
    
    const updateErrorState = (field: keyof typeof errorState, hasError: boolean) => {
        setErrorState(prevState => ({
            ...prevState,
            [field]: hasError
        }));
    };
    
    const [getBranchCommits] = useGetBranchCommitsLazyQuery();
    const [createUnitMutation] = useCreateUnitMutation();

    const handleCreateUnit = () => {
        setIsLoaderActive(true)
        setResultData({
            ...resultData,
            message: null
        })

        let unitVariables: CreateUnitMutationVariables = {
            repoUuid: currentNodeData.uuid,
            visibilityLevel: unitVisibilityLevel,
            name: repoName,
            isAutoUpdateFromRepoUnit: isAutoUpdateFromRepoUnit
        }
        
        if (!isAutoUpdateFromRepoUnit){
            unitVariables.repoBranch = repoBranch
            unitVariables.repoCommit = repoCommit
        }
        
        createUnitMutation({
            variables: unitVariables
        }).then(CreateUnitData =>{
            if (CreateUnitData.data){
                console.log('Unit создан', CreateUnitData.data)

                let newUnit = CreateUnitData.data.createUnit

                const newNode = {
                    id: newUnit.uuid,
                    type: NodeType.Unit,
                    color: getNodeColor(NodeType.Unit),
                    data: newUnit
                  };
              
                  const newLink = {
                    source: newUnit.repoUuid,
                    target: newUnit.uuid,
                  };

                setGraphData({
                    nodes: [...graphData.nodes, newNode],
                    links: [...graphData.links, newLink],
                  });
                setCurrentNodeData(CreateUnitData.data.createUnit)
                setIsLoaderActive(false)
                setActiveModal(null)
            }
        }).catch(error => {
            setIsLoaderActive(false)
            setResultData({ type: ResultType.Angry, message: error.graphQLErrors[0].message.slice(4)})
        })
    };

    useEffect(() => {
        if (repoBranch && !isAutoUpdateFromRepoUnit){
            getBranchCommits({
                variables: {
                    uuid: currentNodeData.uuid,
                    repoBranch: repoBranch,
                    onlyTag: false,
                    limit: 100,
                    offset: 0
                }
            }).then(availableCommits => {
                    if (availableCommits.data?.getBranchCommits){
                        setRepoAvailableCommits(availableCommits.data.getBranchCommits)
                    }
                }
            )
        }
    }, [repoBranch, isAutoUpdateFromRepoUnit]);

    return (
        <>  
            {
                isLoaderActive && (<Spinner/>)
            }
            {
                isAutoUpdateFromRepoUnit && currentNodeData && currentNodeData.defaultBranch === null && (
                    <ResultQuery
                        resultData={{
                            type: ResultType.Angry,
                            message: 'Заполните ветку по умолчанию для Repo - без неё нельзя сделать Unit автообновляемым'
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
                        value={repoName}
                        validateState={repoName}
                        onChange={setRepoName}
                        validateFunc={isValidLogin}
                        setIsErrorExist={(hasError) => updateErrorState('name', hasError)}
                        setResultData={setResultData}
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
                            Автообновляемый ?
                        </div>
                    </div>
                    {
                        !isAutoUpdateFromRepoUnit && (
                            <div>
                                <select id='base_enum' value={repoBranch === null ? '' : repoBranch} onChange={(e) => {
                                        setRepoBranch(e.target.value)
                                    }}
                                >
                                    <option value="" disabled selected>Выберите ветку</option>
                                    {   
                                        currentNodeData.branches.map(
                                            item => (
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
            <button className="button_main_action" onClick={handleCreateUnit} disabled={Object.values(errorState).some(isError => isError)}>
                Создать
            </button>
            <ResultQuery
                resultData={resultData}
            />
        </>
    );
}