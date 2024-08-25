import { VisibilityLevel } from '../../../types/composition-functions'
import { useState } from 'react';
import '../form.css'

export default function UpdateRepoForm() {
    const [repoName, setRepoName] = useState('');
    const [repoVisibilityLevel, setRepoVisibilityLevel] = useState(VisibilityLevel.Public);
    const [isAutoUpdateRepository, setAutoUpdateRepository] = useState(false);
    const [isOnlyTagUpdateRepository, setOnlyTagUpdateRepository] = useState(false);
    
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
                        ) : (<></>)
                    }
                </form>
            </div>
            <button className="button_main_action">
                Установить
            </button>
        </>
    );
}