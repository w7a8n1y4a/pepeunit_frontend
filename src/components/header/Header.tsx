import { useGetTokenLazyQuery } from '../../types/composition-functions'
import BaseModal from '../modal/BaseModal'
import logo from '/images/logo_32_32.png'
import signin from '/images/signin.svg'
import { useState } from 'react'

export default function Header(){

    const [isModalSignInOpen, setIsModalSignInOpen] = useState(false)
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')

    function openModalSignIn(){
        setIsModalSignInOpen(!isModalSignInOpen)
    }

    const [
        getToken,
        { data }
    ] = useGetTokenLazyQuery({
        variables: {
            credentials: login,
            password: password,
        },
    });

    console.log(data)

    if (data !== undefined && data !== null){
        localStorage.removeItem('token');
        localStorage.setItem('token', data.getToken);
        console.log(localStorage.getItem('token'))
    }

    return (
        <header>
            <div>
                <a href='/'>
                    <img src={logo} alt="Icon"/>
                </a>
            </div>
            <div>
                <span>Search</span>
                <a href='https://pepeunit.com/' target="_blank">
                    <span>Docs</span>
                </a>
            </div>
            <div>
                <button className="signin" onClick={openModalSignIn}>
                    <img src={signin} width="32" height="32" alt="Signin"/>
                </button>
                <BaseModal open={isModalSignInOpen}>
                    <form>
                        <input
                            id='login'
                            type='text'
                            placeholder='Login'
                            value={login}
                            onChange={(e) => setLogin(e.target.value)}
                        />
                        <input
                            id='password'
                            type='password'
                            placeholder='Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </form>
                    <button className="signin" onClick={() => getToken()}>
                        Войти
                    </button>
                </BaseModal>
            </div>
        </header>
    )
}
