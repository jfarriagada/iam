import React from 'react'
import { Link } from 'react-router-dom'


const Header = ({onAuth, onLogout, user}) => {
    
    function renderAuthButton(){
        return (
            <div className="navbar-item" onClick={onAuth}><Link to='/'> Entrar </Link></div>
        )
    }

    function renderLogoutButton(){
        return (
            <div className="navbar-start">
                <div className="navbar-item">{user.displayName}</div>
                <div className="navbar-item" onClick={onLogout}><Link to='/'> Salir </Link></div>
            </div>
        )
    }


    return (
        <div className="navbar is-info" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <a className="navbar-item"> I'am </a>
                <div className="navbar-burger" data-target="navMenu">
                        <span></span>
                        <span></span>
                        <span></span>
                </div>
            </div>
            <div className="navbar-menu" id="navMenu">
                <div className="navbar-start">
                    {user ? renderLogoutButton() : renderAuthButton()}
                </div>
            </div>
        </div>
    )
}


export default Header
