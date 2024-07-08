import React, { useState } from 'react';
import Buttons from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Grid from '@mui/material/Grid';
import '../css/MainCss.css';
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
import { FormControlLabel, Switch } from '@mui/material';
import { userServices } from '../services/user-services';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField, DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { Stack } from 'react-bootstrap';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import 'dayjs/locale/en';
import { format } from 'date-fns';

dayjs.extend(utc);
dayjs.extend(timezone);
const timeZone = 'Asia/Kolkata';
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function TransitionLeft(props) {
    return <Slide {...props} direction="left" />;
}


function AddTeacherDialog(props) {

    const [open, setOpen] = React.useState(false);
    const [transition, setTransition] = React.useState(undefined);
    const [image, setImage] = useState("");
    const [imageBuffer, setImageBuffer] = useState(null);
    const [joinDate, setJoinDate] = useState(null);
    const [dob, setDob] = useState();

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        aadharNumber: "",
        dob: "",
        gender: "",
        qualification: "",
        joinDate: "",
        createdBy: "",
        address: {
            street: "",
            city: "",
            state: "",
            zip: "",
            country: "",
        }
    });

    const handleChange = (event) => {
        const { name, value } = event.target;

        if (name.startsWith("address.")) {
            const addressProperty = name.replace("address.", "");

            setFormData((prevFormData) => ({
                ...prevFormData,
                address: {
                    ...prevFormData.address,
                    [addressProperty]: value,
                },
            }));
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };


    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const handleSubmit = async () => {

        if(dob !== null){
            formData.dob = dob;
            //dayjs(dob.$d).tz('Asia/Kolkata').format('YYYY-MM-DDTHH:mm:ss.SSSZ');
        }
        if (joinDate !== null) {
            formData.joinDate = joinDate;
        }
       console.log(formData.dob);
        try {
            await userServices.postTeacher(formData)
                .then((res) => {
                    //console.log(res);
                    setTransition(() => TransitionLeft);
                    setOpen(true);
                    props.onHide();
                }).catch((error) => {
                    console.log(error);
                });
        }
        catch (e) {
            alert(e.response.data.error);
            console.log(e)
        }
    };

    const isFileValid = (file) => {
        if (file.size > 200 * 1024) {
            alert("File size exceeds the maximum allowed size (200 KB).");
            return false;
        }
        return true;
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if (file && isFileValid(file)) {
            setImage(file);

            const reader = new FileReader();
            reader.onload = (e) => {
                // Convert the result to a buffer
                const imageBuffer = e.target.result;
                setImageBuffer(imageBuffer);
            };
            reader.onerror = (error) => {
                console.error("Error reading file:", error);
            };
            reader.readAsArrayBuffer(file);
        }
    };


    return (
        <>
            <Snackbar open={open} key={transition ? transition.name : ''} TransitionComponent={transition} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Teacher Successfully Created!
                </Alert>
            </Snackbar>
            <Modal
                {...props}
                backdrop="static"
                keyboard={false}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Add Teacher
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Container maxWidth='xl'>
                        <Box
                            sx={{

                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }} >


                            <Grid container spacing={1.3} sx={{ mt: 1, mb: 6 }}>

                                <Grid item xs={12} sm={6}>
                                    <label htmlFor='input-file' style={{ width: '100%', height: '100%', maxHeight: 190 }}>
                                        <Avatar src={URL.createObjectURL(new Blob([imageBuffer], { type: 'image/jpeg' }))} sx={{ bgcolor: 'secondary.main', width: '100%', height: '100%', maxHeight: 184, objectFit: 'contain', borderRadius: 0 }} />
                                    </label>
                                    <input hidden id='input-file' onChange={handleFileChange} type='file' name='image' accept='.jpg,.png,.jpeg' />
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <Grid container spacing={1.3}>
                                        <Grid item xs={12} sm={12}>
                                            <Box sx={{ mt: -1 }}>
                                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                    <DemoContainer components={['DateField']}>
                                                        <DateField
                                                            label="Join Date"
                                                            size="small"
                                                            onChange={(newJoin => setJoinDate(newJoin))}
                                                            name="joinDate"
                                                            required
                                                            fullWidth
                                                            timezone='Asia/Kolkata'
                                                            format="DD-MM-YYYY"
                                                        />
                                                    </DemoContainer>
                                                </LocalizationProvider>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={12} sm={12}>
                                            <TextField
                                                required
                                                id="firstName"
                                                size='small'
                                                name="firstName"
                                                label="First name"
                                                fullWidth
                                                autoComplete="given-name"
                                                variant="outlined"
                                                value={formData.firstName}
                                                onInput={handleChange}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={12}>
                                            <TextField
                                                required
                                                id="lastName"
                                                size='small'
                                                name="lastName"
                                                label="Last name"
                                                fullWidth
                                                autoComplete="last-name"
                                                variant="outlined"
                                                value={formData.lastName}
                                                onInput={handleChange}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={12}>
                                            <FormControl fullWidth variant="outlined" size='small' >
                                                <InputLabel required id="gender">Gender</InputLabel>
                                                <Select
                                                    labelId="gender"
                                                    id="gender"
                                                    name="gender"
                                                    value={formData.gender}
                                                    onChange={handleChange}
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
                                    </Grid>
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <Box sx={{ mt: -1 }}>
                                        {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DemoContainer components={['DatePicker', 'DatePicker']}>
                                                <DatePicker className='MuiFormLabel-root-MuiInputLabel-root-Dob'
                                                     sx={{
                                                        '& .MuiInputLabel-root': {
                                                            marginTop: '-6px',
                                                        },
                                                        '& .MuiInputBase-root': {
                                                            height: '40px',
                                                            width:'100%', // Adjust the height as needed
                                                        },
                                                    }}
                                                    name="dob" 
                                                    format='DD/MM/YYYY'
                                                    required timezone='Asia/Kolkata'
                                                    onChange={(newValue) => {setDob(newValue)}}                                                
                                                    fullWidth 
                                                    label="DOB"
                                                    />

                                            </DemoContainer>
                                        </LocalizationProvider> */}
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DemoContainer components={['DateField']}>
                                                <DateField
                                                    label="DOB"
                                                    size="small"
                                                    name="dob"
                                                    required 
                                                    timezone='Asia/Kolkata'
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
                                        name="phoneNumber"
                                        label="Phone"
                                        fullWidth size='small'
                                        autoComplete="cell-phone"
                                        variant="outlined"
                                        value={formData.phoneNumber}
                                        onInput={handleChange}

                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id="adhaar"
                                        name="aadharNumber"
                                        size='small'
                                        label="Adhaar No."
                                        fullWidth
                                        autoComplete="adhaar"
                                        variant="outlined"
                                        value={formData.aadharNumber}
                                        onInput={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id="email"
                                        name="email"
                                        size='small'
                                        label="Email"
                                        fullWidth
                                        autoComplete="email-address"
                                        variant="outlined"
                                        value={formData.email}
                                        onInput={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id="qualification"
                                        name="qualification"
                                        label="Qualification"
                                        fullWidth size='small'
                                        autoComplete="qualification"
                                        variant="outlined"
                                        value={formData.qualification}
                                        onInput={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id="street"
                                        name="address.street"
                                        label="Street"
                                        fullWidth size='small'
                                        autoComplete="street"
                                        variant="outlined"
                                        value={formData.address.street}
                                        onInput={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        id="city"
                                        name="address.city"
                                        label="City"
                                        fullWidth size='small'
                                        autoComplete="city"
                                        variant="outlined"
                                        value={formData.address.city}
                                        onInput={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        autoComplete="state"
                                        name="address.state"
                                        required size='small'
                                        fullWidth
                                        id="state"
                                        label="State"
                                        value={formData.address.state}
                                        onInput={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        autoComplete="zip"
                                        name="address.zip"
                                        required
                                        size='small'
                                        fullWidth
                                        id="zip"
                                        label="Zip"
                                        value={formData.address.zip}
                                        onInput={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        size='small'
                                        fullWidth
                                        id="country"
                                        label="Country"
                                        name="address.country"
                                        autoComplete="country"
                                        value={formData.address.country}
                                        onInput={handleChange}
                                    />
                                </Grid>
                            </Grid>
                        </Box>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Stack direction='horizontal' gap={3}>
                        <Buttons onClick={handleSubmit} style={{ width: '10vh' }}>Save</Buttons>
                        <Buttons onClick={props.onHide} style={{ width: '10vh' }} autoFocus >Cancel</Buttons>
                    </Stack>
                </Modal.Footer>
            </Modal >
        </>
    );
}

export default AddTeacherDialog;