import React, { useState } from 'react';
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
import { Stack } from 'react-bootstrap';


const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function TransitionLeft(props) {
    return <Slide {...props} direction="left" />;
}


function AddStudentDialog(props) {

    const [open, setOpen] = React.useState(false);
    const [transition, setTransition] = React.useState(undefined);
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const user = JSON.parse(localStorage.getItem('user'));
    const [formData, setFormData] = useState({
        studentid: "",
        fname: "",
        mname: "",
        lname: "",
        dob: "",
        gender: "",
        phonenumber: "",
        email: "",
        address: "",
        city: "",
        state: "",
        createdby: user && user.userid,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const PostStudent = async () => {
        try {
            var saved = await fetch(`${api_URL}/api/student/`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(formData)
            })
            if (saved.ok) {
                setTransition(() => TransitionLeft);
                setOpen(true);
            }
            else {
                alert("Something went wrong")
                console.log("Request was not successful. Status Code : " + saved.status)
            }
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <>
            <Snackbar open={open} key={transition ? transition.name : ''} TransitionComponent={transition} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Student Successfully Created!
                </Alert>
            </Snackbar>
            <Modal
                {...props} backdrop="static"
                keyboard={false}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Add Student
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Box
                            sx={{
                                marginTop: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }} >
                            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                {/* <LockOutlinedIcon /> */}
                            </Avatar>
                            {/* <Typography component="h1" variant="h5">
                                Sign up
                            </Typography> */}
                            <Grid container spacing={3} sx={{ mt: 4}}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id="studentid"
                                        name="studentid"
                                        label="Student ID" onChange={handleChange}
                                        fullWidth autoFocus
                                        autoComplete="student-id"
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id="firstName"
                                        name="fname"
                                        label="First name"
                                        fullWidth onChange={handleChange}
                                        autoComplete="given-name"
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id="middleName"
                                        name="mname"
                                        label="Middle name" onChange={handleChange}
                                        fullWidth
                                        autoComplete="middle-name"
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id="lastName"
                                        name="lname"
                                        label="Last name" onChange={handleChange}
                                        fullWidth
                                        autoComplete="last-name"
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>

                                    <FormControl fullWidth variant="outlined" >
                                        <InputLabel required id="demo-simple-select-standard-label">Gender</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-standard-label"
                                            id="demo-simple-select-standard"
                                            onChange={handleChange}
                                            name="gender"
                                            label="Gender"
                                        >
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                            <MenuItem value="Male">Male</MenuItem>
                                            <MenuItem value="Female">Female</MenuItem>
                                            <MenuItem value="Other">Other</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id="dob" onChange={handleChange}
                                        name="dob"
                                        label="DOB (DD/MM/YYYY)"
                                        fullWidth
                                        autoComplete="birth-date"
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id="phone"
                                        name="phonenumber" onChange={handleChange}
                                        label="Phone"
                                        fullWidth
                                        autoComplete="cell-phone"
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id="email"
                                        name="email"
                                        onChange={handleChange}
                                        label="Email"
                                        fullWidth
                                        autoComplete="email-address"
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField required
                                        id="address"
                                        name="address" onChange={handleChange}
                                        label="Address"
                                        fullWidth
                                        autoComplete="address-line1"
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id="city"
                                        name="city" onChange={handleChange}
                                        label="City"
                                        fullWidth
                                        autoComplete="address-city"
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        id="state" onChange={handleChange}
                                        name="state"
                                        label="State/Province/Region"
                                        fullWidth
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id="zip"
                                        name="zip"
                                        label="Zip / Postal code"
                                        fullWidth
                                        autoComplete="postal-code"
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id="country"
                                        name="country"
                                        label="Country"
                                        fullWidth
                                        autoComplete="country"
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4} />

                                <Grid sx={{ '& button': { mt: 2, p: 1 } }} item sm={4}>

                                </Grid>
                            </Grid>
                        </Box>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Stack direction='horizontal' gap={3}>
                        <Buttons onClick={PostStudent} style={{width:'10vh'}}>Save</Buttons>
                        <Buttons onClick={props.onHide} style={{width:'10vh'}} autoFocus >Cancel</Buttons>
                    </Stack>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default AddStudentDialog;