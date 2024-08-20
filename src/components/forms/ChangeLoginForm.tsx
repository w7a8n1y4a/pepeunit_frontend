import { useState } from 'react';
import { useUpdateUserMutation } from '../../types/composition-functions';
import isValidLogin from '../../utils/isValidLogin'

interface ChangeLoginFormProps {
    setActiveModal: (show: string | null) => void;
}

export default function ChangeLoginForm({ setActiveModal }: ChangeLoginFormProps) {
    const [login, setLogin] = useState('');
    
    const [updateUserMutation] = useUpdateUserMutation();

    const handleChangeLogin = () => {
        if (!isValidLogin(login)) {
            alert("Неверный формат логина!");
            return;
        }

        updateUserMutation({
            variables: {
                login: login
            }
        }).then(updateUserData => {
            if (updateUserData.data) { 
                localStorage.setItem('user', JSON.stringify(updateUserData.data.updateUser));
                setActiveModal(null)
            } else {
                console.error('Ошибка обновления логина:', updateUserData.errors);
            }
        })

    };

    return (
        <>
            <div>
                <form>
                    <input
                        id='login_change'
                        type='text'
                        placeholder='New Login'
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
                    />
                </form>
            </div>
            <button className="register" onClick={handleChangeLogin}>
                Изменить Логин
            </button>
        </>
    );
}