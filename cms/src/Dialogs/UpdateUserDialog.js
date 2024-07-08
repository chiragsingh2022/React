import React from "react";
import { useEffect, useState } from "react";

import Modal from 'react-bootstrap/Modal';
import Grid from '@mui/material/Grid';
import Buttons from 'react-bootstrap/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import api_URL from '../Helper';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';
import { Stack } from 'react-bootstrap';
import Switch from '@mui/material/Switch';
import Cookies from "js-cookie";
import { FormControlLabel, Typography } from "@mui/material";

const UpdateUserDialog = (props) => {

    //const userData = props.userdata;
    const [image, setImage] = useState("");

    useEffect(() => {
        if (props.userdata) {
            setFormData({
                mobile: props.userdata.mobile || "", // replace with correct key
                fname: props.userdata.fname || "",
                lname: props.userdata.lname || "",
                userType: props.userdata.userType || "", // replace with correct key
                userid: props.userdata.userid || "",
                password: props.userdata.password || "",
                image: props.userdata.image || "",
                canviewstudent: props.userdata.canviewstudent || false,
                canupdatestudent: props.userdata.canupdatestudent || false,
                candeletestudent: props.userdata.candeletestudent || false,
                canviewrss: props.userdata.canviewrss || false,
                canviewregistration: props.userdata.canviewregistration || false,
                canviewsettings: props.userdata.canviewsettings || false,
                canviewstaff: props.userdata.canviewstaff || false,
            });
            setImage(props.userdata.image);
        }
    }, [props.userdata]);

    const [formData, setFormData] = useState({
        mobile: "",
        fname: "",
        lname: "",
        userType: "",
        userid: "",
        password: "",
        image: "",
        canviewstudent: false,
        canupdatestudent: false,
        candeletestudent: false,
        canviewrss: false,
        canviewregistration: false,
        canviewsettings: false,
        canviewstaff: false,
    });

    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     setFormData({ ...formData, [name]: value });
    // };
    const handleChange = (e) => {
        const { name, type, checked, value } = e.target;
        const switchType = type === 'checkbox';

        setFormData((prevData) => ({
            ...prevData,
            [name]: switchType ? checked : value,
        }));
    };

    const patchUser = async () => {
        try {
            if (image !== null) {
                formData.image = image;
            }
            const response = await fetch(`${api_URL}/api/user/${props.userdata._id}`, {
                method: 'PATCH',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${Cookies.get('token')}`
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
                keyboard={false}
                scrollable={true}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Update User
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
                                <Grid item xs={12} sm={3}>
                                    <FormControl fullWidth variant="outlined" size='small' >
                                        <InputLabel required id="demo-simple-select-standard-label">Role</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-standard-label"
                                            id="demo-simple-select-standard"
                                            onChange={handleChange}
                                            name="userType" value={formData.userType}
                                            label="Role" >
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                            <MenuItem value="Admin">Admin</MenuItem>
                                            <MenuItem value="Teacher">Teacher</MenuItem>
                                            <MenuItem value="Other">Other</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <TextField
                                        autoComplete="user-mobile"
                                        name="mobile"
                                        required
                                        value={formData.mobile}
                                        onChange={handleChange}
                                        fullWidth
                                        id="mobile"
                                        label="Mobile" size='small'
                                        autoFocus
                                    />
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <TextField
                                        autoComplete="given-name"
                                        name="fname"
                                        required
                                        fullWidth
                                        value={formData.fname} size='small'
                                        onChange={handleChange}
                                        id="firstName"
                                        label="First Name"
                                        autoFocus
                                    />
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <TextField
                                        required
                                        fullWidth
                                        value={formData.lname}
                                        onChange={handleChange} size='small'
                                        id="lastName"
                                        label="Last Name"
                                        name="lname"
                                        autoComplete="family-name"
                                    />
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        value={formData.userid}
                                        onChange={handleChange}
                                        id="email" size='small'
                                        label="Email Address"
                                        name="userid"
                                        autoComplete="email"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth

                                        onChange={handleChange}
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password" size='small'
                                        autoComplete="new-password"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="body1">Permissions</Typography>
                                </Grid>

                                <Grid item xs={12} sm={4} >
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={formData.candeletestudent}
                                                name="candeletestudent"
                                                onChange={handleChange}
                                            />}
                                        label="Delete Student" />
                                </Grid>
                                <Grid item xs={12} sm={4} >
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={formData.canupdatestudent}
                                                name="canupdatestudent"
                                                onChange={handleChange}
                                            />}
                                        label="Update Student" />
                                </Grid>
                                <Grid item xs={12} sm={4} >
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={formData.canviewstudent}
                                                name="canviewstudent"
                                                onChange={handleChange}
                                            />}
                                        label="View Student" />
                                </Grid>
                                <Grid item xs={12} sm={4} >
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={formData.canviewrss}
                                                name="canviewrss"
                                                onChange={handleChange}
                                            />}
                                        label="RSS" />
                                </Grid>
                                <Grid item xs={12} sm={4} >
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={formData.canviewregistration}
                                                name="canviewregistration"
                                                onChange={handleChange}
                                            />}
                                        label="show users" />
                                </Grid>
                                <Grid item xs={12} sm={4} >
                                    <FormControlLabel
                                        control={
                                            <Switch
                                            checked={formData.canviewsettings}
                                                name="canviewsettings"
                                                onChange={handleChange}
                                            />}
                                        label="View Settings" />
                                </Grid>
                                <Grid item xs={12} sm={4} >
                                    <FormControlLabel
                                        control={
                                            <Switch
                                            checked={formData.canviewstaff}
                                                name="canviewstaff"
                                                onChange={handleChange}
                                            />}
                                        label="View Staff" />
                                </Grid>

                                <Grid sx={{ '& button': { mt: 2, p: 1 } }} item sm={4}>

                                </Grid>
                            </Grid>
                        </Box>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Stack direction='horizontal' gap={3}>
                        <Buttons onClick={patchUser} style={{ width: '10vh' }}>Save</Buttons>
                        <Buttons onClick={props.onHide} style={{ width: '10vh' }} autoFocus >Cancel</Buttons>
                    </Stack>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default UpdateUserDialog;