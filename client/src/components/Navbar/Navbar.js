import React from 'react';
import { useHistory } from 'react-router-dom';
import './navbar.scss';

function Navbar() {

    let history = useHistory();

    const handleToken = () => {
        localStorage.removeItem("auth");
        history.push("/login");
    }
    return (
        <div>
            <div className="navbar-main">
                <div className="navbar-logo">
                    <h3>MERN-CURD App</h3>
                </div>
                <div className="navbar-logout">
                    <button onClick={handleToken}>LogOut</button>
                </div>
            </div>
        </div>
    )
}

export default Navbar
