import React, { useState } from 'react';
import Buttons from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Grid from '@mui/material/Grid';

import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';
import { Stack } from 'react-bootstrap';
import { DateField, LocalizationProvider } from '@mui/x-date-pickers';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { userServices } from '../services/user-services';


const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function TransitionLeft(props) {
    return <Slide {...props} direction="left" />;
}


function AddStudentDialog(props) {

    const [open, setOpen] = useState(false);
    const [transition, setTransition] = useState(undefined);
    const [dob, setDob] = useState();
    const user = JSON.parse(localStorage.getItem('user'));
    const [image, setImage] = useState("");

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };
    const handleHide = () => {
        // Additional cleanup when the modal is hidden
        setImage(null);
        props.onHide();
    };

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


    const handleFileChange = (e) => {
        const image = e.target.files[0];

        if (image) {
            const reader = new FileReader();
            reader.readAsDataURL(image);
            reader.onload = () => {
                //const aBuffer = event.target.result;
                // console.log(reader.result);
                setImage(reader.result);
                // Convert ArrayBuffer to Blob
                // const blob = new Blob([aBuffer], { type: image.type });


                // Create a data URL from the Blob
                //const dataURL = URL.createObjectURL(blob);
                //setImageSrc(dataURL);

            };
            //reader.readAsArrayBuffer(image);
        }

    };
    const PostStudent = async () => {

        if (dob !== null) {
            formData.dob = dob;
        }

        const formDataToSend = new FormData();

        // Append form data fields
        for (const key in formData) {
            formDataToSend.append(key, formData[key]);
        }

        // Append image
        formDataToSend.append("image", image);
        try {
            userServices.postStudent(formDataToSend).then((res) => {
                //console.log(res);
                setTransition(() => TransitionLeft);
                setOpen(true);
                if (res.data) {
                    props.savedStudent(res.data);
                }
                props.onHide();
            });
        }
        catch (e) {
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
                scrollable={true}
                size="lg"
                onHide={handleHide}
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

                            <label htmlFor='input-file'>
                                <Avatar src={image} sx={{ m: 1, bgcolor: 'secondary.main', width: 150, height: 150, objectFit: 'contain' }} />
                            </label>
                            <input hidden id='input-file' onChange={handleFileChange} type='file' name='image' accept='.jpg,.png,.jpeg' />


                            <Grid container spacing={3} sx={{ mt: 4 }}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required={true}
                                        id="studentid"
                                        name="studentid" 
                                        size='small'
                                        label="Student ID" 
                                        onChange={handleChange}
                                        fullWidth autoFocus
                                        autoComplete="student-id"
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id="firstName" 
                                        size='small'
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
                                        size='small'
                                        name="mname"
                                        label="Middle name" 
                                        onChange={handleChange}
                                        fullWidth
                                        autoComplete="middle-name"
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id="lastName" size='small'
                                        name="lname"
                                        label="Last name" onChange={handleChange}
                                        fullWidth
                                        autoComplete="last-name"
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>

                                    <FormControl fullWidth variant="outlined" size='small' >
                                        <InputLabel required id="demo-simple-select-standard-label">Gender</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-standard-label"
                                            id="demo-simple-select-standard"
                                            onChange={handleChange}
                                            name="gender"
                                            label="Gender" >
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
                                    <Box sx={{ mt: -1 }}>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DemoContainer components={['DateField']}>
                                                <DateField
                                                    label="DOB" size="small"
                                                    name="dob"
                                                    fullWidth
                                                    onChange={(newValue => setDob(newValue))}
                                                    format="DD-MM-YYYY"
                                                />
                                            </DemoContainer>
                                        </LocalizationProvider>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id="phone"
                                        name="phonenumber" 
                                        onChange={handleChange}
                                        label="Phone"
                                        fullWidth size='small'
                                        autoComplete="cell-phone"
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id="email"
                                        name="email"
                                        onChange={handleChange} size='small'
                                        label="Email"
                                        fullWidth
                                        autoComplete="email-address"
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField required
                                        id="address"
                                        name="address" 
                                        onChange={handleChange}
                                        label="Address"
                                        fullWidth
                                        autoComplete="address-line1" 
                                        size='small'
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id="city"
                                        name="city" 
                                        onChange={handleChange}
                                        label="City" 
                                        size='small'
                                        fullWidth
                                        autoComplete="address-city"
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        id="state" 
                                        onChange={handleChange}
                                        name="state"
                                        label="State/Province/Region"
                                        fullWidth 
                                        size='small'
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required 
                                        size='small'
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
                                        size='small'
                                        name="country"
                                        label="Country"
                                        fullWidth
                                        autoComplete="country"
                                        variant="outlined"
                                    />
                                </Grid>

                                <Grid sx={{ '& button': { mt: 2, p: 1 } }} item sm={4}>

                                </Grid>
                            </Grid>
                        </Box>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Stack direction='horizontal' gap={3}>
                        <Buttons onClick={PostStudent} style={{ width: '10vh' }}>Save</Buttons>
                        <Buttons onClick={handleHide} style={{ width: '10vh' }} autoFocus >Cancel</Buttons>
                    </Stack>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default AddStudentDialog;