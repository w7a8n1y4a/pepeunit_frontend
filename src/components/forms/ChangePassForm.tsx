import { useState } from 'react';
import { useUpdateUserMutation } from '../../types/composition-functions';
import isValidPassword from '../../utils/isValidPassword'

interface ChangePassFormProps {
    setActiveModal: (show: string | null) => void;
}

export default function ChangePassForm({ setActiveModal }: ChangePassFormProps) {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
    const [updateUserMutation] = useUpdateUserMutation();

    const handleChangeLogin = () => {
        if (password !== confirmPassword) {
            alert('Пароли не совпадают!');
            return;
        }

        if (!isValidPassword(password)) {
            alert("Неверный формат пароля!");
            return;
        }

        updateUserMutation({
            variables: {
                password: password
            }
        }).then(updateUserData => {
            if (updateUserData.data) { 
                localStorage.setItem('user', JSON.stringify(updateUserData.data.updateUser));
                setActiveModal(null)
            } else {
                console.error('Ошибка обновления пароля:', updateUserData.errors);
            }
        })

    };

    return (
        <>
            <div>
                <form>
                <input
                    id='password_new_reg'
                    type='password'
                    placeholder='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input
                    id='confirm_password_new_reg'
                    type='password'
                    placeholder='Confirm Password'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                </form>
            </div>
            <button className="register" onClick={handleChangeLogin}>
                Изменить Логин
            </button>
        </>
    );
}