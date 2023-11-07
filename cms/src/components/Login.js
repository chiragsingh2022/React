import React, { useState } from 'react';
import '../css/MainCss.css'
import 'w3-css/w3.css';
import NavBar from './NavBar';
import { useNavigate } from 'react-router-dom';
import api_URL from '../Helper';

const Login = () => {
    const navigate = useNavigate();
    const [userType, setUserType] = useState("");
    const [userid, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const PostUser = async () => {
        const userData = { userid, password, userType }

        try {
            var saved = await fetch(`${api_URL}/api/login/`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            })
            if (saved.status === 200) {
                const response = await saved.json();
                //alert("User Successfully Created")
                //console.log(response.user)
                localStorage.setItem('user', JSON.stringify(response.user)); // Use setItem to store data
                localStorage.setItem('token', response.auth); // Use setItem to store data
                navigate('/')
            }
            else if (saved.status === 401) {
                // Handle the case of incorrect credentials
                alert("Wrong credentials");
            }
            else if (saved.status === 404) {
                // Handle the case of Not found
                alert("User Not Registered");
            }
            else {
                alert(saved.statusText)
                console.log("Request was not successful. Status Code : " + saved.status)
            }
        } catch (e) {
            console.log(e)
        }
    }

    // const UserLogin = () => {
    //     let item = { userid, password };
    //     localStorage.setItem('user', JSON.stringify(item)); // Use setItem to store data
    //     navigate('/')
    // }

    return (
        <>
            <NavBar />
            <div className="user-login">
                <div style={{ width: "200%", height: "100%" }} className="w3-card-4" >

                    <div style={{ padding: 10 }} className="w3-container w3-green">
                        <h2>Login</h2>
                    </div>

                    <div className="w3-container">

                        <label>User Role</label>
                        <label>User Role</label>
                        <label>User Role</label>
                        <select className="w3-select" value={userType} name='userType' onChange={(e) => setUserType(e.target.value)}>
                            <option value="" disabled selected>User Role</option>
                            <option value="Admin">Admin</option>
                            <option value="Other">Other</option>
                        </select><br /><br />

                        <label>Last Name</label>
                        <input className="w3-input" type="text" name={userid} placeholder="Username" onChange={(e) => setUserName(e.target.value)} /><br />

                        <label>Password</label>
                        <input className="w3-input" type="password" name={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} /><br />

                        <button style={{ width: '30%' }} className='w3-btn w3-right w3-round-large w3-blue w3-ripple' onClick={PostUser}>Login</button><br /><br />

                    </div>

                </div>
            </div>
        </>
    );
}

export default Login;
