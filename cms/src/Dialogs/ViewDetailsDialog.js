import { useEffect, useState, useRef } from "react";
import Modal from 'react-bootstrap/Modal';
import Grid from '@mui/material/Grid';
import Buttons from 'react-bootstrap/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import api_URL from '../Helper';
import { Stack } from 'react-bootstrap';
import ReactToPrint, { useReactToPrint } from "react-to-print";
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateField } from "@mui/x-date-pickers";
import { format } from "date-fns";

const ViewDetailsDialog = (props) => {

    const studentData = props.studentdata;
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: "SMSDC",
        pageStyle:"print"
      });
    useEffect(() => {
        if (studentData && studentData.dob) {
            //const formattedDob = format(new Date(studentData.dob), 'dd/MM/yyyy');
            //studentData.dob = dayjs(studentData.dob)
            setDob(studentData.dob);
            setFormData(studentData);
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

    return (
        <>

            <Modal
                {...props}
                scrollable={true}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                    {formData.fname} {formData.mname} {formData.lname}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Box ref={componentRef}
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }} >

                            <Avatar src={formData.image} sx={{ m: 1, bgcolor: 'secondary.main', width: 150, height: 150, objectFit: 'contain' }} />

                            <Grid container spacing={3} sx={{ mt: 2 }}>
                                <Grid item xs={12} sm={6}>
                                    <Typography fontSize={12}>StudentID</Typography>
                                    <Typography >{formData.studentid}</Typography>

                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Typography fontSize={12}>Full Name</Typography>
                                    <Typography>{formData.fname} {formData.mname} {formData.lname}</Typography>
                                </Grid>
                                {/* <Grid item xs={12} sm={6}>
                                    <Typography>Middle name</Typography>
                                    <Typography>{formData.mname}</Typography>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Typography>Last name</Typography>
                                    <Typography>{formData.lname}</Typography>
                                </Grid> */}
                                <Grid item xs={12} sm={6}>
                                    <Typography fontSize={12}>Gender</Typography>
                                    <Typography>{formData.gender}</Typography>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Typography fontSize={12}>DOB</Typography>
                                    <Typography> {formData.dob ? format(new Date(formData.dob), "dd-MM-yyyy") : ""}</Typography>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Typography fontSize={12}>Phone</Typography>
                                    <Typography>{formData.phonenumber}</Typography>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Typography fontSize={12}>Email</Typography>
                                    <Typography>{formData.email}</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography fontSize={12}>Address</Typography>
                                    <Typography>{formData.address}</Typography>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Typography fontSize={12}>City</Typography>
                                    <Typography>{formData.city}</Typography>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Typography fontSize={12}>State/Province/Region</Typography>
                                    <Typography>{formData.state}</Typography>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Typography fontSize={12}>Zip/Postal code</Typography>
                                    <Typography>{formData.zip}</Typography>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Typography fontSize={12}>Country</Typography>
                                    <Typography>{formData.country}</Typography>
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
                        <Buttons onClick={handlePrint} style={{ width: '10vh' }}>Print</Buttons>
                        <Buttons onClick={props.onHide} style={{ width: '10vh' }} autoFocus >Cancel</Buttons>
                    </Stack>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ViewDetailsDialog;