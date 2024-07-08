
import { Avatar, Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import '../css/StudentDetails.css';
import { useLocation } from "react-router-dom";
import { format } from "date-fns";
import { useReactToPrint } from "react-to-print";


const StudentDetails = () => {

    const [imageBuffer, setImageBuffer] = useState(null);
    const location = useLocation();
    const { studentData } = location.state;
    //#region  FormDataState
    const [formData, setFormData] = useState({
        session: "",
        wrNumber: "",
        course: "",
        semester: "",
        enrollmentNumber: "",
        admissionNumber: "",
        firstName: "",
        middleName: "",
        lastName: "",
        dob: "",
        gender: "",
        phoneNumber: "",
        aadharNumber: "",
        email: "",
        fatherName: "",
        fatherIncome: "",
        fatherPhone: "",
        fatherOccupation: "",
        motherName: "",
        motherIncome: "",
        motherOccupation: "",
        motherPhone: "",
        address: "",
        zip: "",
        city: "",
        state: "",
        country: "",
        metricYear: "",
        metricStatus: "",
        metricRollNumber: "",
        metricBoard: "",
        metricTotalMarks: "",
        metricObtainedMarks: "",
        metricPercent: "",
        metricSchoolName: "",
        interBoard: "",
        interYear: "",
        interObtainedMark: "",
        interTotalMark: "",
        interPercent: "",
        interSchoolName: "",
        interStatus: "",
        interRollNumber: "",
        graduationBoard: "",
        graduationCollegeName: "",
        graduationCourse: "",
        graduationObtainedMark: "",
        graduationPercent: "",
        graduationStatus: "",
        graduationTotalMark: "",
        graduationYear: "",
        graduationRollNumber: "",
    });
    //#endregion

    //#region UseEffect

    useEffect(() => {
        console.log("Student Details Page");
        // Here you can access and work with the studentData object
        if (studentData && studentData.dob) {
            setFormData(studentData);
            if (studentData.fileAttachment && studentData.fileAttachment.data) {
                setImageBuffer(new Uint8Array(studentData?.fileAttachment?.data?.data));
            }
        }

    }, [studentData]);
    //#endregion

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: "SMSDC",
        pageStyle: "print",
    });

    return (
        <>
            <Container maxWidth='xl'>
                <Box
                    sx={{
                        marginTop: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }} >

                    {/* <Typography sx={{ textDecoration: 'underline', color: 'green' }} variant="h4">Details</Typography> */}
                    <Box mt={2} mb={4} ref={componentRef}>
                        <Typography justifyContent='center' textAlign='center' sx={{ textDecoration: 'underline', color: 'green' }} variant="h4">Shree Malkhan Singh Mahavidhyalaya Thulai Jahangirpur Hathras</Typography>
                        <fieldset className='abcde'>
                            <legend>Personal Details</legend>
                            <Grid container spacing={1} sx={{ mt: 1, mb: 1 }}>
                                <Grid item xs={12} sm={1.7}>
                                    <label style={{ width: '100%', height: '100%', maxHeight: 190 }}>
                                        <Avatar src={URL.createObjectURL(new Blob([imageBuffer], { type: 'image/jpeg' }))} sx={{ bgcolor: 'secondary.main', width: '100%', height: '100%', maxHeight: 184, objectFit: 'contain', borderRadius: 0 }} />
                                    </label>
                                </Grid>

                                <Grid sx={{ ml: 1 }} item xs={12} sm={10.2}>
                                    <Grid container spacing={1}>
                                        <Grid item xs={12} sm={3}>
                                            <Typography variant="h6">Session</Typography>
                                            <Typography variant="body1">{formData.session}</Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={3}>
                                            <Typography variant="h6">WRN #</Typography>
                                            <Typography variant="body1">{formData.wrNumber}</Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={3}>
                                            <Typography variant="h6">Enrollment #</Typography>
                                            <Typography variant="body1">{formData.enrollmentNumber}</Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={3}>
                                            <Typography variant="h6">Admission #</Typography>
                                            <Typography variant="body1">{formData.admissionNumber}</Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={3}>
                                            <Typography variant="h6">Course / Semester</Typography>
                                            <Typography variant="body1">{formData.course} / {formData.semester}</Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={3}>
                                            <Typography variant="h6">Full Name</Typography>
                                            <Typography variant="body1">{formData.firstName} {formData.middleName} {formData.lastName}</Typography>
                                        </Grid>

                                        <Grid item xs={12} sm={3}>
                                            <Typography variant="h6">Gender</Typography>
                                            <Typography variant="body1">{formData.gender}</Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={3}>
                                            <Typography variant="h6">DOB</Typography>
                                            <Typography variant="body1">{formData.dob ? format(new Date(formData.dob), "dd-MM-yyyy") : ""}</Typography>
                                        </Grid>

                                        <Grid item xs={12} sm={3}>
                                            <Typography variant="h6">Adhaar Number</Typography>
                                            <Typography variant="body1">{formData.aadharNumber}</Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={3}>
                                            <Typography variant="h6">Phone</Typography>
                                            <Typography variant="body1">{formData.phoneNumber}</Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Typography variant="h6">Email</Typography>
                                            <Typography variant="body1">{formData.email}</Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>


                                <Grid item xs={12} sm={3}>
                                    <Typography variant="h6">Father's Name</Typography>
                                    <Typography variant="body1">{formData.fatherName}</Typography>
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <Typography variant="h6">Father's Phone</Typography>
                                    <Typography variant="body1">{formData.fatherPhone}</Typography>
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <Typography variant="h6">Father's Occupation</Typography>
                                    <Typography variant="body1">{formData.fatherOccupation}</Typography>
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <Typography variant="h6">Father's Income</Typography>
                                    <Typography variant="body1">{formData.fatherIncome}</Typography>
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <Typography variant="h6">Mother's Name</Typography>
                                    <Typography variant="body1">{formData.motherName}</Typography>
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <Typography variant="h6">Mother's Phone</Typography>
                                    <Typography variant="body1">{formData.motherPhone}</Typography>
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <Typography variant="h6">Mother's Occupation</Typography>
                                    <Typography variant="body1">{formData.motherOccupation}</Typography>
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <Typography variant="h6">Mother's Income</Typography>
                                    <Typography variant="body1">{formData.motherIncome}</Typography>
                                </Grid>

                                <Grid item xs={12} sm={3}>
                                    <Typography variant="h6">City</Typography>
                                    <Typography variant="body1">{formData.city}</Typography>
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <Typography variant="h6">zip</Typography>
                                    <Typography variant="body1">{formData.zip}</Typography>
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <Typography variant="h6">State</Typography>
                                    <Typography variant="body1">{formData.state}</Typography>
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <Typography variant="h6">Country</Typography>
                                    <Typography variant="body1">{formData.country}</Typography>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Typography variant="h6">Address</Typography>
                                    <Typography variant="body1">{formData.address}</Typography>
                                </Grid>
                            </Grid>
                        </fieldset>

                        <Grid item xs={12} sm={12}>
                            <Grid container spacing={1}>
                                <Grid item xs={12} sm={12}>
                                    <fieldset className='abcde'>
                                        <legend>10th Details</legend>
                                        <Grid container spacing={1}>
                                            <Grid item xs={12} sm={3}>
                                                <Typography variant="h6">Class</Typography>
                                                <Typography variant="h6">X</Typography>
                                            </Grid>
                                            <Grid item xs={12} sm={3}>
                                                <Typography variant="h6">Year</Typography>
                                                <Typography variant="body1">{formData.metricYear}</Typography>
                                            </Grid>
                                            <Grid item xs={12} sm={3}>
                                                <Typography variant="h6">Status</Typography>
                                                <Typography variant="body1">{formData.metricStatus}</Typography>
                                            </Grid>
                                            <Grid item xs={12} sm={3}>
                                                <Typography variant="h6">Roll Number</Typography>
                                                <Typography variant="body1">{formData.metricRollNumber}</Typography>
                                            </Grid>
                                            <Grid item xs={12} sm={3}>
                                                <Typography variant="h6">Mark Total</Typography>
                                                <Typography variant="body1">{formData.metricTotalMarks}</Typography>
                                            </Grid>
                                            <Grid item xs={12} sm={3}>
                                                <Typography variant="h6">Mark Obtained</Typography>
                                                <Typography variant="body1">{formData.metricObtainedMarks}</Typography>
                                            </Grid>
                                            <Grid item xs={12} sm={3}>
                                                <Typography variant="h6">Percent</Typography>
                                                <Typography variant="body1">{formData.metricPercent}</Typography>
                                            </Grid>
                                            <Grid item xs={12} sm={3}>
                                                <Typography variant="h6">Subjects</Typography>
                                                <Typography variant="body1">{formData.metricSubject}</Typography>
                                            </Grid>
                                            <Grid item xs={12} sm={3}>
                                                <Typography variant="h6">Board</Typography>
                                                <Typography variant="body1">{formData.metricBoard}</Typography>
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <Typography variant="h6">School Name</Typography>
                                                <Typography variant="body1">{formData.metricSchoolName}</Typography>
                                            </Grid>

                                        </Grid>
                                    </fieldset>
                                </Grid>

                                <Grid item xs={12} sm={12}>
                                    <fieldset className='abcde'>
                                        <legend>12th Details</legend>
                                        <Grid container spacing={1}>
                                            <Grid item xs={12} sm={3}>
                                                <Typography variant="h6">Class</Typography>
                                                <Typography variant="h6">XII</Typography>
                                            </Grid>
                                            <Grid item xs={12} sm={3}>
                                                <Typography variant="h6">Year</Typography>
                                                <Typography variant="body1">{formData.interYear}</Typography>
                                            </Grid>
                                            <Grid item xs={12} sm={3}>
                                                <Typography variant="h6">Status</Typography>
                                                <Typography variant="body1">{formData.interStatus}</Typography>
                                            </Grid>
                                            <Grid item xs={12} sm={3}>
                                                <Typography variant="h6">Roll Number</Typography>
                                                <Typography variant="body1">{formData.interRollNumber}</Typography>
                                            </Grid>
                                            <Grid item xs={12} sm={3}>
                                                <Typography variant="h6">Mark Total</Typography>
                                                <Typography variant="body1">{formData.interTotalMark}</Typography>
                                            </Grid>
                                            <Grid item xs={12} sm={3}>
                                                <Typography variant="h6">Mark Obtained</Typography>
                                                <Typography variant="body1">{formData.interObtainedMark}</Typography>
                                            </Grid>
                                            <Grid item xs={12} sm={3}>
                                                <Typography variant="h6">Percent</Typography>
                                                <Typography variant="body1">{formData.interPercent}</Typography>
                                            </Grid>
                                            <Grid item xs={12} sm={3}>
                                                <Typography variant="h6">Subjects</Typography>
                                                <Typography variant="body1">{formData.interSubject}</Typography>
                                            </Grid>
                                            <Grid item xs={12} sm={3}>
                                                <Typography variant="h6">Board</Typography>
                                                <Typography variant="body1">{formData.interBoard}</Typography>
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <Typography variant="h6">School Name</Typography>
                                                <Typography variant="body1">{formData.interSchoolName}</Typography>
                                            </Grid>

                                        </Grid>
                                    </fieldset>
                                </Grid>

                                <Grid item xs={12} sm={12}>
                                    <fieldset className='abcde'>
                                        <legend>Graduation Details</legend>
                                        <Grid container spacing={1}>
                                            <Grid item xs={12} sm={3}>
                                                <Typography variant="h6">Class</Typography>
                                                <Typography variant="body1">{formData.graduationCourse}</Typography>
                                            </Grid>
                                            <Grid item xs={12} sm={3}>
                                                <Typography variant="h6">Year</Typography>
                                                <Typography variant="body1">{formData.graduationYear}</Typography>
                                            </Grid>
                                            <Grid item xs={12} sm={3}>
                                                <Typography variant="h6">Status</Typography>
                                                <Typography variant="body1">{formData.graduationStatus}</Typography>
                                            </Grid>
                                            <Grid item xs={12} sm={3}>
                                                <Typography variant="h6">Roll Number</Typography>
                                                <Typography variant="body1">{formData.graduationRollNumber}</Typography>
                                            </Grid>
                                            <Grid item xs={12} sm={3}>
                                                <Typography variant="h6">Mark Total</Typography>
                                                <Typography variant="body1">{formData.graduationTotalMark}</Typography>
                                            </Grid>
                                            <Grid item xs={12} sm={3}>
                                                <Typography variant="h6">Mark Obtained</Typography>
                                                <Typography variant="body1">{formData.graduationObtainedMark}</Typography>
                                            </Grid>
                                            <Grid item xs={12} sm={3}>
                                                <Typography variant="h6">Percent</Typography>
                                                <Typography variant="body1">{formData.graduationPercent}</Typography>
                                            </Grid>
                                            <Grid item xs={12} sm={3}>
                                                <Typography variant="h6">Subjects</Typography>
                                                <Typography variant="body1">{formData.graduationSubject}</Typography>
                                            </Grid>
                                            <Grid item xs={12} sm={3}>
                                                <Typography variant="h6">Board / University</Typography>
                                                <Typography variant="body1">{formData.graduationBoard}</Typography>
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <Typography variant="h6">College Name</Typography>
                                                <Typography variant="body1">{formData.graduationCollegeName}</Typography>
                                            </Grid>

                                        </Grid>
                                    </fieldset>
                                </Grid>
                            </Grid>
                        </Grid>


                    </Box>

                    <Grid container justifyContent="flex-end" sx={{ mt: 2, mb: 4 }}>
                        <Button onClick={handlePrint} sx={{ width: '11rem', height: '5rem' }} variant='contained'>Print</Button>
                    </Grid>

                </Box>
            </Container>
        </>
    );
}

export default StudentDetails;