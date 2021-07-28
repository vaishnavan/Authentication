import React from 'react'
import Navbar from '../Navbar/Navbar';
import './home.scss';

function Home() {

    const myLoginUserData = JSON.parse(localStorage.getItem("auth"));
    console.log(myLoginUserData.user.username);

    return (
        <div>
            <Navbar />
            <div className="home-welcomeGreet">
                <h3>welcome, {myLoginUserData.user.username}</h3>
            </div>
        </div>
    )
}

export default Home
