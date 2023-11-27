import React from 'react';
import Buttons from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
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
import api_URL from '../Helper';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';
import axios from 'axios';
import { userServices } from '../services/user-services';
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function TransitionLeft(props) {
    return <Slide {...props} direction="left" />;
}


function AddUserDialog(props) {

    const [open, setOpen] = React.useState(false);
    const [transition, setTransition] = React.useState(undefined);
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };
    const token = localStorage.getItem('token');
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        if (!data.get('userType') || !data.get('email') || !data.get('password') || !data.get('fname') || !data.get('lname') || !data.get('mobile')) {
            alert("Please fill in all required fields.");
            return;
        }
        const userData = {
            userType: data.get('userType'),
            userid: data.get('email'),
            password: data.get('password'),
            lname: data.get('lname'),
            fname: data.get('fname'),
            mobile: data.get('mobile'),
        }
       // console.log(userData,'userData');
        try {
            userServices.postUser(userData).then((res)=>{
                setTransition(() => TransitionLeft);
                setOpen(true);
                props.onHide();
            }).catch((error)=>{
                console.log(error);
            });
            // var saved = await axios.post(`${api_URL}/api/user/`,userData, {
            //     //method: 'POST',
            //     headers: {
            //         'Accept': 'application/json',
            //         //'Content-Type': 'application/json',
            //         //'Content-Type': 'multipart/form-data',
            //         'authorization': `Bearer ${token}`
            //     },
            //     //body: JSON.stringify(userData)
            // });

            // if (saved.status === 201) {
            //     // to added a snackbar
            //     setTransition(() => TransitionLeft);
            //     setOpen(true);
            //     props.onHide();
            //     // Update the userList state with the saved data
            //     //setUserList(prevUserList => [...prevUserList, savedData]);
            // }
            // else {
            //     //console.log(saved);
            //     //const error = await saved.json();
            //     //alert(error.error);
            //     console.log("Request was not successful. Status Code : " + saved.status)
            // }
        }
        catch (e) {
            alert(e.response.data.error);
            console.log(e)
        }
    };

    return (
        <>
            <Snackbar open={open} key={transition ? transition.name : ''} TransitionComponent={transition} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    User Successfully Created!
                </Alert>
            </Snackbar>
            <Modal
                {...props} backdrop="static"
                keyboard={false}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Add User
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container component="main" maxWidth="md">
                        <CssBaseline />
                        <Box
                            sx={{
                                marginTop: 4,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }} >
                            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                <LockOutlinedIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Sign up
                            </Typography>
                            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 6 }}>
                                <Grid container spacing={2} >
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
                                    sx={{ mt: 4, mb: 6, '&:hover': { boxShadow: 8 }}}
                                >
                                    Sign Up
                                </Button>
                                <Grid container justifyContent="flex-end">

                                </Grid>
                            </Box>
                        </Box>

                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Buttons onClick={props.onHide} style={{width:'10vh'}}>Close</Buttons>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default AddUserDialog;