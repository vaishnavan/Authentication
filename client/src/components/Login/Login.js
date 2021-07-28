import React, { useState } from 'react';
import { postLoginData } from '../../services/user.service';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../Register/register.scss';

const initialstate={
    email:'',
    password:''
}

function Login() {
    const [userData, setUserData] = useState(initialstate);

    let history = useHistory();
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
        postLoginData(userData)
        .then((res) => {
            // console.log(res.data);
            localStorage.setItem("auth", JSON.stringify(res.data));
            toast.success("Login successfully")
            setUserData({
                email:'',
                password:'',
            })
            history.push("/home");
        })
        .catch((err) => {
            toast.error(err.response.data.message);
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
