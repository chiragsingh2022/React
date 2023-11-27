import { useEffect, useState } from "react";

import { useLocation, useNavigate } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import Grid from '@mui/material/Grid';
import Buttons from 'react-bootstrap/Button';
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
import { format } from "date-fns";
import ReactToPrint from "react-to-print";
import { useRef } from "react";

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateField } from "@mui/x-date-pickers";

const UpdateStudentDialog = (props) => {
    // const useparams = useParams();
    // const { item } = useparams;
    //const location = useLocation();
    //const { studentData } = location.state;
    const studentData = props.StudentData;
    const navigate = useNavigate();
    const [image, setImage] = useState("");
    const componentRef = useRef();
    useEffect(() => {
        if (studentData && studentData.dob) {
            //const formattedDob = format(new Date(studentData.dob), 'dd/MM/yyyy');
            //studentData.dob = dayjs(studentData.dob)
            setDob(studentData.dob);
            setFormData(studentData);
            setImage(studentData.image);
        }
        // Here you can access and work with the studentData object
        //studentData.dob = studentData.dob ? format(new Date(studentData.dob), 'dd-MM-yyyy') : '';
        //setFormData(studentData);
    }, [studentData]);

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
        image: "",
    });

    const [dob, setDob] = useState();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const PatchStudent = async () => {
        try {
            if (dob !== null) {
                formData.dob = dob;
            }
            if (image !== null) {
                formData.image = image;
            }
            const response = await fetch(`${api_URL}/api/student/${studentData._id}`, {
                method: 'PATCH',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                const updatedData = await response.json();
                alert("Record Updated Successfully!");
                //navigate("/student");
                props.updateList(updatedData);
                props.onHide();
            } else {
                // Request was not successful, handle the error
                alert("Something went wrong.");
            }
        }
        catch (e) {
            alert("Network error: " + e.message);
        }
    }

    const handleFileChange = (e) => {
        const image = e.target.files[0];

        if (image) {
            if (image.size > 50 * 1024) {
                alert("File size exceeds the maximum allowed size (50 KB).");
                e.value = "";
                setImage("");
                return;
            }
            else {
                const reader = new FileReader();
                reader.readAsDataURL(image);
                reader.onload = () => {
                    setImage(reader.result);


                };
            }
        }

    };

    return (
        <>

            <Modal
                {...props} backdrop="static"
                keyboard={false} scrollable={true}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Update Student
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                    {/* <ReactToPrint trigger={() => <Buttons>Print this out!</Buttons>} 
                        content={() => componentRef.current}
                        documentTitle='newdocument' pageStyle="print"/> */}
                        <Box  ref={componentRef}
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
                                        required
                                        id="studentid" value={formData.studentid}
                                        name="studentid" size='small'
                                        label="Student ID" onChange={handleChange}
                                        fullWidth autoFocus
                                        autoComplete="student-id"
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id="firstName" size='small'
                                        name="fname" value={formData.fname}
                                        label="First name"
                                        fullWidth onChange={handleChange}
                                        autoComplete="given-name"
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id="middleName" size='small' value={formData.mname}
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
                                        id="lastName" size='small' value={formData.lname}
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
                                            name="gender" value={formData.gender}
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
                                                    value={dayjs(dob)} fullWidth
                                                    onChange={(newValue) => setDob(newValue)} name="dob"
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
                                        name="phonenumber" onChange={handleChange}
                                        label="Phone" value={formData.phonenumber}
                                        fullWidth size='small'
                                        autoComplete="cell-phone"
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id="email"
                                        name="email" value={formData.email}
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
                                        name="address" onChange={handleChange}
                                        label="Address" value={formData.address}
                                        fullWidth
                                        autoComplete="address-line1" size='small'
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id="city" value={formData.city}
                                        name="city" onChange={handleChange}
                                        label="City" size='small'
                                        fullWidth
                                        autoComplete="address-city"
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        id="state" onChange={handleChange}
                                        name="state" value={formData.state}
                                        label="State/Province/Region"
                                        fullWidth size='small'
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required size='small'
                                        id="zip" value={formData.zip}
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
                                        id="country" size='small'
                                        name="country" value={formData.country}
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
                        <Buttons onClick={PatchStudent} style={{ width: '10vh' }}>Save</Buttons>                        
                        <Buttons onClick={props.onHide} style={{ width: '10vh' }} autoFocus >Cancel</Buttons>
                    </Stack>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default UpdateStudentDialog;