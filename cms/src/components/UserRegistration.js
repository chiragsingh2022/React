import React, { useEffect, useState } from 'react';
import '../css/MainCss.css';
//import 'w3-css/w3.css';
import NavBar from './NavBar';
import { useNavigate } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import api_URL from '../Helper';
import Grid from '@mui/material/Grid';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { Tooltip } from '@mui/material';

const UserRegistration = () => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));

    const navigate = useNavigate();
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

    // const handleSubmit = async (event) => {
    //     event.preventDefault();
    //     const data = new FormData(event.currentTarget);

    //     if (!data.get('userType') || !data.get('email') || !data.get('password') || !data.get('fname') || !data.get('lname') || !data.get('mobile')) {
    //         alert("Please fill in all required fields.");
    //         return;
    //     }
    //     const userData = {
    //         userType: data.get('userType'),
    //         userid: data.get('email'),
    //         password: data.get('password'),
    //         lname: data.get('lname'),
    //         fname: data.get('fname'),
    //         mobile: data.get('mobile'),
    //     }
    //     try {
    //         var saved = await fetch(`${api_URL}/api/user/`, {
    //             method: 'POST',
    //             headers: {
    //                 'Accept': 'application/json',
    //                 'Content-Type': 'application/json',
    //                 'authorization': `Bearer ${token}`
    //             },
    //             body: JSON.stringify(userData)
    //         });

    //         if (saved.ok) {
    //             const savedData = await saved.json();
    //             // to added a snackbar
    //             setTransition(() => TransitionLeft);
    //             setOpen(true);
    //             // Update the userList state with the saved data
    //             setUserList(prevUserList => [...prevUserList, savedData]);
    //         }
    //         else {
    //             const error = await saved.json();
    //             alert(error.error);
    //             console.log("Request was not successful. Status Code : " + saved.status)
    //         }
    //     }
    //     catch (e) {
    //         console.log(e)
    //     }
    // };

    const DeleteUser = async (_id) => {
        const confirmed = window.confirm("Are you sure ?");
        if (confirmed) {
            try {
                if (user._id !== _id) {
                    let deleteUser = await fetch(`${api_URL}/api/user/${_id}`, {
                        method: 'DELETE',
                        headers: {
                            'authorization': `Bearer ${localStorage.getItem('token')}`
                        }
                    })
                    if (deleteUser.ok) {
                        setUserList(prevUserList => prevUserList.filter(usr => usr._id !== _id));
                    }
                }
                else {
                    alert("LoggedIn username can't be delete");
                }
            }
            catch (e) {
                console.log(e);

            }
        }
    }

    return (
        <>
            <NavBar />

            <Grid p={4} container spacing={3} sx={{ minHeight: '100vh' }}>
                <Grid item xs={12} sm={12}>
                    <div style={{ borderRadius: 8 }} >
                        <Table responsive hover>
                            <thead>
                                <tr>
                                    <th>
                                        Sr No.
                                    </th>
                                    <th>
                                        Role
                                    </th>
                                    <th>
                                        Name
                                    </th>
                                    <th>
                                        Mobile
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
                                                {item.fname} {item.lname}
                                            </td>
                                            <td>
                                                {item.mobile}
                                            </td>
                                            <td>
                                                {item.userid}
                                            </td>
                                            <td>{
                                                user._id !== item._id ?
                                                    <Tooltip title='Delete' placement='top'>
                                                        <IconButton sx={{ '&:hover': { boxShadow: 4, color: 'red' } }} onClick={() => DeleteUser(item._id)} aria-label="delete" size="small">
                                                            <DeleteIcon fontSize="small" />
                                                        </IconButton>
                                                    </Tooltip>
                                                    :
                                                    <h5>Logged In</h5>
                                            }
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </Table>
                    </div>
                </Grid>
                {/* <Grid item xs={12} sm={4}>

                    <div style={{borderRadius:8}} className="w3-card-4 w3-container" >
                        <Container component="main" maxWidth="md">
                            <CssBaseline />
                            <Box
                                sx={{
                                    marginTop: 4,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                }}
                            >
                                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                    <LockOutlinedIcon />
                                </Avatar>
                                <Typography component="h1" variant="h5">
                                    Sign up
                                </Typography>
                                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 6 }}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={6}>
                                            <FormControl fullWidth variant="outlined" >
                                                <InputLabel required id="demo-simple-select-standard-label">Role</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-outlined-label"
                                                    id="demo-simple-select-outlined"
                                                    name="userType"
                                                    label="Role"
                                                >
                                                    <MenuItem value="">
                                                        <em>None</em>
                                                    </MenuItem>
                                                    <MenuItem value="Admin">Admin</MenuItem>
                                                    <MenuItem value="Teacher">Teacher</MenuItem>
                                                    <MenuItem value="Other">Other</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                autoComplete="user-mobile"
                                                name="mobile"
                                                required
                                                fullWidth
                                                id="mobile"
                                                label="Mobile"
                                                autoFocus
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                autoComplete="given-name"
                                                name="fname"
                                                required
                                                fullWidth
                                                id="firstName"
                                                label="First Name"
                                                autoFocus
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                required
                                                fullWidth
                                                id="lastName"
                                                label="Last Name"
                                                name="lname"
                                                autoComplete="family-name"
                                            />
                                        </Grid>

                                        <Grid item xs={12}>
                                            <TextField
                                                required
                                                fullWidth
                                                id="email"
                                                label="Email Address"
                                                name="email"
                                                autoComplete="email"
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                required
                                                fullWidth
                                                name="password"
                                                label="Password"
                                                type="password"
                                                id="password"
                                                autoComplete="new-password"
                                            />
                                        </Grid>

                                    </Grid>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 4, mb: 6 }}
                                    >
                                        Sign Up
                                    </Button>
                                    <Grid container justifyContent="flex-end">

                                    </Grid>
                                </Box>
                            </Box>

                        </Container>

                    </div>

                </Grid> */}
            </Grid>
        </>
    );
}

export default UserRegistration;
