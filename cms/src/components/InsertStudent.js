import { useState } from "react";
import React from "react";
import "../css/InputFields.css"
import NavBar from "./NavBar";
import api_URL from "../Helper"
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function TransitionLeft(props) {
    return <Slide {...props} direction="left" />;
}

const InsertStudent = () => {

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
console.log(formData);
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
            <NavBar />
            <div style={{ minHeight: "80vh", margin: 20 }}>
                <Snackbar open={open} key={transition ? transition.name : ''} TransitionComponent={transition} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                        Student Successfully Created!
                    </Alert>
                </Snackbar>

                <Typography variant="h6" gutterBottom>
                    Add Student
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="studentid"
                            name="studentid"
                            label="Student ID" onChange={handleChange}
                            fullWidth
                            autoComplete="student-id"
                            variant="standard"
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
                            variant="standard"
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
                            variant="standard"
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
                            variant="standard"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        
                        <FormControl fullWidth variant="standard" >
                            <InputLabel required id="demo-simple-select-standard-label">Gender</InputLabel>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                onChange={handleChange} name="gender"
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
                            variant="standard"
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
                            variant="standard"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="email"
                            name="email" onChange={handleChange}
                            label="Email"
                            fullWidth
                            autoComplete="email-address"
                            variant="standard"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="address"
                            name="address" onChange={handleChange}
                            label="Address" 
                            fullWidth 
                            autoComplete="address-line1"
                            variant="standard"
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
                            variant="standard"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            id="state" onChange={handleChange}
                            name="state"
                            label="State/Province/Region"
                            fullWidth
                            variant="standard"
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
                            variant="standard"
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
                            variant="standard"
                        />
                    </Grid>
                    <Grid item xs={12} sm={4} />                
                   
                    <Grid sx={{ '& button': { mt: 2,p: 1 } }} item sm={4}>
                    <Button onClick={PostStudent}  fullWidth variant="contained">Save</Button>
                    </Grid>
                </Grid>
            </div>
        </>
    );
}
export default InsertStudent;