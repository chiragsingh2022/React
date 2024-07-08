import React, { useEffect, useState } from 'react';
import '../css/MainCss.css';
//import 'w3-css/w3.css';
import { useNavigate } from 'react-router-dom';
import { Stack, Table } from 'react-bootstrap';
import api_URL from '../Helper';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import AddUserDialog from '../Dialogs/AddUserDialog';
import UpdateUserDialog from '../Dialogs/UpdateUserDialog';
import Cookies from 'js-cookie';

import AddIcon from '@mui/icons-material/Add';
import useYesNoDialog from '../CustomHooks/useYesNoDialog';

const UserRegistration = () => {
    const token = Cookies.get('token');
    const userData = Cookies.get('user');
    let user = null;
    if(userData){
        user = JSON.parse(userData);
    }    

    const navigate = useNavigate();
    const [userList, setUserList] = useState([]);
    const [selectedUser, setSelectedUser] = useState([]);
    const [updateUser, setUpdateUser] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const [updateModalShow, setUpdateModalShow] = useState(false);


    useEffect(() => {
        GetUser();
    }, []);

    const GetUser = () => {
        try {
            fetch(`${api_URL}/api/user`, {
                method: 'GET',
                headers: {
                    'authorization': `Bearer ${token}`
                }
            }).then((result) => {
                result.json().then((res) => {
                    if (Array.isArray(res)) {
                        setUserList(res)
                    } else {
                        //localStorage.clear();
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
    const { showYesNoDialog, YesNoDialogComponent } = useYesNoDialog();
    const deleteUser = async (_id) => {
        const confirmed = await showYesNoDialog("Delete Record!", "Are you sure you want to delete?");
        //const confirmed = window.confirm("Are you sure ?");
        if (confirmed) {
            console.log("Yes clicked");
            try {
                if (user._id !== _id) {
                    let deleteUser = await fetch(`${api_URL}/api/user/${_id}`, {
                        method: 'DELETE',
                        headers: {
                            'authorization': `Bearer ${token}`
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

    const updateUser_ButtonClick = (item) => {        
        setSelectedUser(item);
        setUpdateUser(true);
    }

    const updateUserList = (updatedData) => {
        //console.log(updatedData);
        const updatedIndex = userList.findIndex((s) => s._id === updatedData._id);
        // If the student is found, update the array
        if (updatedIndex !== -1) {
            const updatedUserList = [...userList];
            updatedUserList[updatedIndex] = updatedData;
            setUserList(updatedUserList);
        }
    }

    return (
        <>
        <div className="rss-grid-container">
                <div className="rss-rows">
                    <div className=" teacher-table-header rss-header-text">
                        <h4>Manage User's</h4>
                        <div>
                            <Tooltip title='Add' placement="top">
                                <IconButton onClick={() => setModalShow(true)} sx={{ '&:hover': { color: 'blue' } }} aria-label="delete" size="large">
                                    <AddIcon fontSize="large" />
                                </IconButton>
                            </Tooltip>
                        </div>
                    </div>
                    <div className="rss-table">
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
                                                    <Stack direction='horizontal' gap={0}>
                                                        <Tooltip title='Delete' placement='top'>
                                                            <IconButton sx={{ '&:hover': { boxShadow: 4, color: 'red' } }} onClick={() => deleteUser(item._id)} aria-label="delete" size="small">
                                                                <DeleteIcon fontSize="small" />
                                                            </IconButton>
                                                        </Tooltip>
                                                        <Tooltip title='Update' placement="top">
                                                            <IconButton sx={{ '&:hover': { boxShadow: 4, color: 'green' } }} onClick={() => updateUser_ButtonClick(item)} aria-label="update" size="small">
                                                                <EditIcon fontSize="small" />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </Stack>
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
                    </div>
                </div>
            </div>
            <AddUserDialog show={modalShow} onHide={() => setModalShow(false)} />
            <UpdateUserDialog show={updateUser} 
            onHide={() => {
                setUpdateUser(false);
                setSelectedUser([]);
            }} 
            userdata={selectedUser} 
            updateList={updateUserList}/>
            {YesNoDialogComponent}
        </>
    );
}

export default UserRegistration;
