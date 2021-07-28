import React, { useState } from 'react';
import { postRegisterData } from '../../services/user.service';
import { Link } from 'react-router-dom';
import './register.scss';

const initialstate={
    username:'',
    email:'',
    password:'',
    confirmpassword:'',
}

function Register() {
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
            username:'',
            email:'',
            password:'',
            confirmpassword:'',
        })
        postRegisterData(userData)
        .then((res) => {
            console.log(res.data);
        })
    }




    return (
        <>
            <div className="register-header">
                <div className="register-main-path">
                    <div className="register-title">
                        <h3>REGISTER</h3>
                    </div>
                    <form>
                        <div className="input-forms">
                            <input type="text" value={userData.username} placeholder="Username" name="username" onChange={handleChange} />
                        </div>
                        <div className="input-forms">
                            <input type="email" value={userData.email} placeholder="Email" name="email" onChange={handleChange} />
                        </div>
                        <div className="input-forms">
                            <input type="password" value={userData.password} placeholder="Password" name="password" onChange={handleChange} />
                        </div>
                        <div className="input-forms">
                            <input type="password" value={userData.confirmpassword} placeholder="Confirm Password" name="confirmpassword" onChange={handleChange} />
                        </div>
                        <button onClick={handleSubmit} type="submit">SignUp</button>
                        <span>Already signup? <Link to="/login">Login</Link></span>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Register
