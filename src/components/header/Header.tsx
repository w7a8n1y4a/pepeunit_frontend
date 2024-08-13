import { useGetTokenLazyQuery } from '../../types/composition-functions'
import logo from '/images/logo_32_32.png'
import signin from '/images/signin.svg'

export default function Header(){
    const [
        getToken,
        { data }
    ] = useGetTokenLazyQuery({
        variables: {
            credentials: 'string',
            password: 'string',
        },
    });

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
                <button className="signin" onClick={() => getToken()}>
                    <img src={signin} width="32" height="32" alt="Signin"/>
                </button>
                <p>{data?.getToken}</p>
            </div>
        </header>
    )
}
