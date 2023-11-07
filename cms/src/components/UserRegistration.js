import React, { useEffect, useState } from 'react';
import '../css/MainCss.css';
import 'w3-css/w3.css';
import NavBar from './NavBar';
import { useNavigate } from 'react-router-dom';
import { Button, Table } from 'react-bootstrap';
import  api_URL  from '../Helper';
const token = localStorage.getItem('token');

const UserRegistration = () => {
    const user = JSON.parse(localStorage.getItem('user'));

    const navigate = useNavigate();
    const [userType, setUserType] = useState("");
    const [userid, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [userList, setUserList] = useState([]);

    useEffect(() => {
        GetUser();
    }, []);

    const GetUser = () => {
        try {
            fetch(`${api_URL}/api/user`, {
                method: 'GET',
                headers: {
                    'authorization': `Bearer ${localStorage.getItem('token')}`
                }
            }).then((result) => {
                result.json().then((res) => {
                    if (Array.isArray(res)) {
                        setUserList(res)
                    } else {
                        localStorage.clear();
                        navigate(res.result);
                    }
                })
            })
        }
        catch (e) {
            console.log(e)
        }
    }

    const PostUser = async () => {
        if (!userType) {
            alert("Please select a user role.");
            return;
        }

        if (!userid) {
            alert("Please enter a username.");
            return;
        }

        if (!password) {
            alert("Please enter a password.");
            return;
        }
        const userData = { userid, password, userType }
        try {
            var saved = await fetch(`${api_URL}/api/user/`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${token}`
                },
                body: JSON.stringify(userData)
            })
            if (saved.ok) {
                const response = await saved.json();
                alert("User Successfully Created")
                GetUser();
                //localStorage.setItem('user', JSON.stringify(response)); // Use setItem to store data
                //navigate('/')
            }
            else {
                alert(saved.statusText)
                console.log("Request was not successful. Status Code : " + saved.status)
            }
        } catch (e) {
            console.log(e)
        }
    }

    const DeleteUser = async (_id) => {
        if (user._id !== _id) {
            let deleteUser = await fetch(`${api_URL}/api/user/${_id}`, {
                method: 'DELETE',
                headers: {
                    'authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            if (deleteUser) {
                GetUser();
            }
        }
        else {
            alert("LoggedIn username can't be delete");
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
            <div className='user-list'>
                <table className="w3-table-all w3-card-4 w3-hoverable">
                    <thead >
                        <tr className='w3-green'>
                            <th>
                                Sr No.
                            </th>
                            <th>
                                User Role
                            </th>
                            <th>
                                User Name
                            </th>
                            <th>
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            userList.map((item, i) => (
                                <tr key={i}>
                                    <td>
                                        {i + 1}
                                    </td>
                                    <td>
                                        {item.userType}
                                    </td>
                                    <td>
                                        {item.userid}
                                    </td>
                                    <td>{
                                        user._id !== item._id ?
                                            <Button variant='outline-danger' onClick={() => DeleteUser(item._id)}>Delete</Button>
                                            :
                                            <h5>Logged In</h5>
                                    }
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            <div className="user-register">

                <div className="w3-card-4">

                    <div style={{ padding: 6 }} className="w3-container w3-green">
                        <h2>User Registration</h2>
                    </div>

                    <div className="w3-container">

                        <label>User Role</label>
                        <select className="w3-select" value={userType} name='userType' onChange={(e) => setUserType(e.target.value)} >
                            <option value="" disabled selected>Select User Role</option>
                            <option value="Admin" >Admin</option>
                            <option value="Other">Other</option>
                        </select><br /><br />

                        <label>Email</label>
                        <input className="w3-input" type="text" name={userid} placeholder="Username" onChange={(e) => setUserName(e.target.value)} /><br />

                        <label>Password</label>
                        <input className="w3-input" type="password" name={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} /><br />

                        <button style={{ width: '30%' }} className='w3-btn w3-round-large w3-blue w3-ripple' onClick={PostUser}>Submit</button><br /><br />

                    </div>

                </div>

                {/* <h1>Candidate Login</h1><br /><br /><br /><br />

                <input type="text" name={userType} placeholder="User Type" onChange={(e) => setUserType(e.target.value)} /><br /><br />
                <input type="text" name={userid} placeholder="Username" onChange={(e) => setUserName(e.target.value)} /><br /><br />
                <input type="password" name={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} /><br /><br />
                <button onClick={PostUser}>Login</button> */}
            </div>
        </>
    );
}

export default UserRegistration;
