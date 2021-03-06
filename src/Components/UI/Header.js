import React from 'react'
import { Link } from 'react-router-dom'


const Header = ({onAuth, onLogout, user}) => {
    
    function renderAuthButton(){
        return (
            <div className="navbar-start">
                <div className="navbar-item" onClick={onAuth}><Link to='/'> Login </Link></div>
                <div className="navbar-item" onClick={onAuth}><Link to='/'> Registrarse </Link></div>
            </div>
        )
    }

    function renderLogoutButton(){
        return (
            <div className="navbar-start">
                <div className="navbar-item"><Link to={`/${user.email}`}>{user.displayName}</Link></div>
                <div className="navbar-item"><Link to='/'>Home</Link></div>
                <div className="navbar-item"><Link to='/post/create'>Create Post</Link></div>
                <div className="navbar-item" onClick={onLogout}><Link to='/'> Logout </Link></div>
            </div>
        )
    }


    return (
        <div className="navbar" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <a href="/" className="navbar-item">I'am</a>
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
