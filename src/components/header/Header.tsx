import logo from '/images/logo_32_32.png'
import signin from '/images/signin.svg'

export default function Header(){
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
                <img src={signin} width="32" height="32" alt="Signin"/>
            </div>
        </header>
    )
}
