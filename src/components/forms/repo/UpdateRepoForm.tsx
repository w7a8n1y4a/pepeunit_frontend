import { VisibilityLevel, RepoType, useGetBranchCommitsLazyQuery, useUpdateRepoMutation, UpdateRepoMutationVariables } from '../../../types/composition-functions'
import { useState, useEffect } from 'react';
import '../form.css'

interface CreateRepoFormProps {
    currentRepoData: RepoType;
}

export default function UpdateRepoForm({ currentRepoData }: CreateRepoFormProps) {
    const [repoName, setRepoName] = useState(currentRepoData.name);
    const [repoVisibilityLevel, setRepoVisibilityLevel] = useState(VisibilityLevel.Public);
    const [targetBranch, setTargetBranch] = useState<string | null>(null);
    const [targetCommit, setTargetCommit] = useState<string | null>(null);
    const [isAutoUpdateRepository, setAutoUpdateRepository] = useState(false);
    const [isOnlyTagUpdateRepository, setOnlyTagUpdateRepository] = useState(false);
    const [repoAvailableCommits, setRepoAvailableCommits] = useState<Array<{
        __typename?: "CommitType";
        commit: string;
        summary: string;
        tag?: string | null;
      }> | null>(null);

    const [getBranchCommits] = useGetBranchCommitsLazyQuery();

    useEffect(() => {
        if (targetBranch && currentRepoData){
            getBranchCommits({
                variables: {
                    uuid: currentRepoData?.uuid,
                    repoBranch: targetBranch,
                    onlyTag: false,
                    limit: 100,
                    offset: 0
                }
            }).then(availableCommits => {
            if (availableCommits.data?.getBranchCommits){
                setRepoAvailableCommits(availableCommits.data.getBranchCommits)
                console.log(availableCommits.data.getBranchCommits)
            }
            })
        }
      }, [targetBranch, currentRepoData]);

    const [updateRepoMutation] = useUpdateRepoMutation();

    const handleUpdateRepo = () => {

        if (currentRepoData){
            let repoVariables: UpdateRepoMutationVariables = {
                uuid: currentRepoData.uuid,
                visibilityLevel: repoVisibilityLevel,
                name: repoName,
                isAutoUpdateRepo: isAutoUpdateRepository,
                isOnlyTagUpdate: isOnlyTagUpdateRepository,
                defaultBranch: targetBranch,
                defaultCommit: targetCommit
            }
    
            console.log(repoVariables)
            
            updateRepoMutation({
                variables: repoVariables
            }).then(UpdateRepoData =>{
                if (UpdateRepoData.data){
                    console.log('Repo обновлён', UpdateRepoData.data)
                }
            })

        }
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

    return (
        <>
            <div>
                <form>
                    <input
                        id='name_change'
                        type='text'
                        placeholder='Name'
                        value={repoName}
                        onChange={(e) => setRepoName(e.target.value)}
                    />
                    <select id='base_enum' value={repoVisibilityLevel} onChange={(e) => {
                            setRepoVisibilityLevel(e.target.value as VisibilityLevel); 
                        }}
                    >
                        <option value={VisibilityLevel.Public}>Public</option>
                        <option value={VisibilityLevel.Internal}>Internal</option>
                        <option value={VisibilityLevel.Private}>Private</option>
                    </select>

                    <select id='base_enum' value={targetBranch === null ? currentRepoData?.branches[0] : targetBranch} onChange={(e) => {
                            setTargetBranch(e.target.value); 
                        }}
                    >
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
                    <div className='toggle_container'>
                        <label className="toggle">
                            <input 
                                type="checkbox" 
                                checked={isAutoUpdateRepository}
                                onChange={(e) => {
                                    setAutoUpdateRepository(e.target.checked)
                                    if (!e.target.checked){
                                        setOnlyTagUpdateRepository(e.target.checked)
                                    }
                                }} 
                            />
                            <span className="slider"></span>
                        </label>
                        <div className="toggle_text">
                            Автообновляемый ?
                        </div>
                    </div>
                    {
                        isAutoUpdateRepository ? (
                            <div className='toggle_container'>
                            <label className="toggle">
                                <input 
                                    type="checkbox" 
                                    checked={isOnlyTagUpdateRepository}
                                    onChange={(e) => setOnlyTagUpdateRepository(e.target.checked)} 
                                />
                                <span className="slider"></span>
                            </label>
                            <div className="toggle_text">
                                Только Теги ?
                            </div>
                        </div>
                        ) : (
                            <select id='base_enum' value={currentRepoData.branches[0]} onChange={(e) => {
                                setTargetCommit(e.target.value); 
                            }}
                        >
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
            <button className="button_main_action" onClick={handleUpdateRepo}>
                Обновить
            </button>
        </>
    );
}