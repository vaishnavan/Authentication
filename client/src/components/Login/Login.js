import React, { useState } from 'react';
import { postLoginData } from '../../services/user.service';
import { Link } from 'react-router-dom';
import '../Register/register.scss';

const initialstate={
    email:'',
    password:''
}

function Login() {
    const [userData, setUserData] = useState(initialstate);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setUserData({
            ...userData,
            [name]:value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(userData);
        setUserData({
            email:'',
            password:'',
        })
        postLoginData(userData)
        .then((res) => {
            console.log(res.data);
        })
    }

    return (
        <>
            <div className="register-header">
                <div className="register-main-path">
                    <div className="register-title">
                        <h3>LOGIN</h3>
                    </div>
                    <form>
                        <div className="input-forms">
                            <input type="email" value={userData.email} placeholder="Email" name="email" onChange={handleChange} />
                        </div>
                        <div className="input-forms">
                            <input type="password" value={userData.password} placeholder="Password" name="password" onChange={handleChange} />
                        </div>
                        <button onClick={handleSubmit} type="submit">Login</button>
                        <span>Didn't SignUp? <Link to="/register">Register</Link></span>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login;
