import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
import { DateField, LocalizationProvider } from '@mui/x-date-pickers';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { userServices } from '../services/user-services';
import { Button, Typography } from '@mui/material';
import countryList from 'react-select-country-list';
import dayjs from 'dayjs';
import Sessions from "./CustomFunctions";



const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function TransitionLeft(props) {
    return <Slide {...props} direction="left" />;
}


const UpdateStudent = () => {

    const [open, setOpen] = useState(false);
    const [transition, setTransition] = useState(undefined);
    const [dob, setDob] = useState();
    const [image, setImage] = useState("");
    const [countries, setCountries] = useState([]);
    const [sessions, setSessions] = useState([]);
    const [imageBuffer, setImageBuffer] = useState(null);
    // const useparams = useParams();
    // const { item } = useparams;
    const location = useLocation();
    const { studentData } = location.state;
    const navigate = useNavigate();
    //const options = useMemo(() => countryList().getData(), [])
    const Classes = ["BA", "BSC"];
    const Semesters = ["1", "2", "3", "4", "5", "6", "7", "8"];
    const currentYear = new Date().getFullYear();
    const startYear = 2010;

    const years = [];
    for (let year = currentYear; year >= startYear; year--) {
        years.push(year);
    }

    //#region UseEffect

    useEffect(() => {
        //setCountries(options);
        const sessionsMemoized = Sessions();
        setSessions(sessionsMemoized);
        // Here you can access and work with the studentData object
        if (studentData && studentData.dob) {
            setDob(studentData.dob);
            setFormData(studentData);
            if (studentData.fileAttachment && studentData.fileAttachment.data) {
                setImageBuffer(new Uint8Array(studentData?.fileAttachment?.data?.data));
            }
        }

    }, [studentData]);
    //#endregion

    //#region  FormDataState
    const [formData, setFormData] = useState({
        session: "",
        wrNumber: "",
        course: "",
        semester: "",
        enrollmentNumber: "",
        admissionNumber: "",
        fname: "",
        mname: "",
        lname: "",
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
        metricSubject: "",
        metricSchoolName: "",
        interBoard: "",
        interYear: "",
        interObtainedMark: "",
        interTotalMark: "",
        interPercent: "",
        interSchoolName: "",
        interStatus: "",
        interRollNumber: "",
        interSubject: "",
        graduationBoard: "",
        graduationCollegeName: "",
        graduationCourse: "",
        graduationObtainedMark: "",
        graduationPercent: "",
        graduationStatus: "",
        graduationTotalMark: "",
        graduationYear: "",
        graduationRollNumber: "",
        graduationSubject: "",
    });
    //#endregion
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const handleChange = useMemo(() => (e) => {
        const { name, value } = e.target;
        setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
    }, [setFormData]);


    const handleFileChange = (e) => {
        const file = e.target.files[0];
        console.log(file);
        if (file) {
            if (file.size > 200 * 1024) {
                alert("File size exceeds the maximum allowed size (200 KB).");
                e.value = "";
                setImage("");
                return;
            }
            else {
                setImage(file);
            }
            const reader = new FileReader();

            reader.onload = (e) => {
                // Convert the result to a buffer
                const imageBuffer = e.target.result;

                // Set the buffer in the state
                setImageBuffer(imageBuffer);
            }
            reader.readAsArrayBuffer(file);
        }
    };

    const PatchStudent = async () => {
        try {
            if (dob !== null) {
                formData.dob = dob;
            }

            const studentResponse = await userServices.patchStudent(studentData._id, formData);

            if (studentResponse.status === 201) {
                if (studentData.fileAttachment && image) {
                    const formData = new FormData();
                    formData.append("image", image);
                    const fileAttachmentId = studentData.fileAttachment._id;
                    const fileResponse = await userServices.patchAttachment(fileAttachmentId, formData);
                }
                else if (image) {
                    const formData = new FormData();
                    formData.append("image", image);
                    formData.append("studentId", studentResponse.data._id);
                    const fileResponse = await userServices.postAttachment(formData);
                }
                setTransition(() => TransitionLeft);
                setOpen(true);
                navigate("/student");
            } else {
                // Request was not successful, handle the error
                alert("Something went wrong.");
            }
        }
        catch (e) {
            alert("Network error: " + e.message);
        }
    }

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

                    <Typography sx={{ textDecoration: 'underline', color: 'green' }} variant="h3">Update Student</Typography>
                    <Grid container spacing={1.3} sx={{ mt: 1, mb: 6 }}>
                        <Grid item xs={12}><Typography variant="h6">Personal Details</Typography></Grid>
                        <Grid item xs={12} sm={1.7}>
                            <label htmlFor='input-file' style={{ width: '100%', height: '100%', maxHeight: 190 }}>
                                <Avatar src={URL.createObjectURL(new Blob([imageBuffer], { type: 'image/jpeg' }))} sx={{ bgcolor: 'secondary.main', width: '100%', height: '100%', maxHeight: 184, objectFit: 'contain', borderRadius: 0 }} />
                            </label>
                            <input hidden id='input-file' onChange={handleFileChange} type='file' name='image' accept='.jpg,.png,.jpeg' />
                        </Grid>

                        <Grid item xs={12} sm={10.3}>
                            <Grid container spacing={1.3}>
                                <Grid item xs={12} sm={3}>
                                    <FormControl fullWidth variant="outlined" size='small' >
                                        <InputLabel required id="session">Session</InputLabel>
                                        <Select
                                            labelId="session"
                                            id="session" autoFocus
                                            value={formData.session}
                                            onChange={handleChange}
                                            name="session"
                                            label="Session" >
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                            {sessions.map((session) => (
                                                <MenuItem key={session} value={session}>
                                                    {session}
                                                </MenuItem>
                                            ))}

                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <TextField
                                        required={true}
                                        id="wrnumber"
                                        name="wrNumber"
                                        size='small'
                                        label="WRN"
                                        defaultValue={formData.wrNumber}
                                        onChange={handleChange}
                                        fullWidth
                                        autoComplete="wrnumber"
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <TextField
                                        required={true}
                                        id="enrollmentnumber"
                                        name="enrollmentNumber"
                                        value={formData.enrollmentNumber}
                                        size='small'
                                        label="Enrollment No."
                                        onChange={handleChange}
                                        fullWidth
                                        autoComplete="enrollmentnumber"
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <TextField
                                        required={true}
                                        id="admissionnumber"
                                        name="admissionNumber"
                                        size='small'
                                        value={formData.admissionNumber}
                                        label="Admission No."
                                        onInput={handleChange}
                                        fullWidth
                                        autoComplete="admissionnumber"
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={1.5}>
                                    <FormControl fullWidth variant="outlined" size='small' >
                                        <InputLabel required id="course">Course</InputLabel>
                                        <Select
                                            labelId="course"
                                            id="course"
                                            onChange={handleChange}
                                            value={formData.course}
                                            name="course"
                                            label="Course" >
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                            {Classes.map((cls) => (
                                                <MenuItem key={cls} value={cls}>
                                                    {cls}
                                                </MenuItem>
                                            ))}

                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={1.5}>
                                    <FormControl fullWidth variant="outlined" size='small' >
                                        <InputLabel required id="semester">Semester</InputLabel>
                                        <Select
                                            labelId="semester"
                                            id="semester"
                                            onChange={handleChange}
                                            name="semester"
                                            value={formData.semester}
                                            label="Semester" >
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                            {Semesters.map((Semester) => (
                                                <MenuItem key={Semester} value={Semester}>
                                                    {Semester}
                                                </MenuItem>
                                            ))}

                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <TextField
                                        required
                                        id="firstName"
                                        size='small'
                                        value={formData.firstName}
                                        name="firstName"
                                        label="First name"
                                        fullWidth onChange={handleChange}
                                        autoComplete="given-name"
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <TextField

                                        id="middleName"
                                        size='small'
                                        value={formData.middleName}
                                        name="middleName"
                                        label="Middle name"
                                        onChange={handleChange}
                                        fullWidth
                                        autoComplete="middle-name"
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <TextField
                                        required
                                        id="lastName" size='small'
                                        name="lastName"
                                        label="Last name"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        fullWidth
                                        autoComplete="last-name"
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={3}>

                                    <FormControl fullWidth variant="outlined" size='small' >
                                        <InputLabel required id="gender">Gender</InputLabel>
                                        <Select
                                            labelId="gender"
                                            id="gender"
                                            value={formData.gender}
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
                                <Grid item xs={12} sm={3}>
                                    <Box sx={{ mt: -1 }}>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DemoContainer components={['DateField']}>
                                                <DateField
                                                    label="DOB"
                                                    size="small"
                                                    name="dob"
                                                    timezone='Asia/Kolkata'
                                                    required
                                                    fullWidth
                                                    value={dayjs(dob)}
                                                    onChange={(newValue => setDob(newValue))}
                                                    format="DD-MM-YYYY"
                                                />
                                            </DemoContainer>
                                        </LocalizationProvider>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <TextField
                                        required
                                        id="phone"
                                        name="phoneNumber"
                                        value={formData.phoneNumber}
                                        onChange={handleChange}
                                        label="Phone"
                                        fullWidth size='small'
                                        autoComplete="cell-phone"
                                        variant="outlined"

                                    />
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <TextField
                                        required
                                        id="adhaar"
                                        value={formData.aadharNumber}
                                        name="aadharNumber"
                                        onChange={handleChange} size='small'
                                        label="Adhaar no."
                                        fullWidth
                                        autoComplete="adhaar"
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <TextField
                                        required
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        size='small'
                                        label="Email"
                                        fullWidth
                                        autoComplete="email-address"
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <TextField
                                        required
                                        id="fathername"
                                        name="fatherName"
                                        value={formData.fatherName}
                                        onChange={handleChange}
                                        label="Father's Name"
                                        fullWidth size='small'
                                        autoComplete="father-name"
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <TextField
                                        required
                                        id="fatherphone"
                                        name="fatherPhone"
                                        value={formData.fatherPhone}
                                        onChange={handleChange}
                                        label="Father's Phone"
                                        fullWidth size='small'
                                        autoComplete="fatherphone"
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <TextField
                                        id="fatheroccupation"
                                        name="fatherOccupation"
                                        value={formData.fatherOccupation}
                                        onChange={handleChange}
                                        label="Father's Occupation"
                                        fullWidth size='small'
                                        autoComplete="father-occupation"
                                        variant="outlined"
                                    />
                                </Grid>
                            </Grid>
                        </Grid>


                        <Grid item xs={12} sm={3}>
                            <TextField
                                required
                                id="fatherincome"
                                name="fatherIncome"
                                value={formData.fatherIncome}
                                onChange={handleChange}
                                label="Father's Income"
                                fullWidth size='small'
                                autoComplete="father-income"
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <TextField
                                required
                                id="mothername"
                                name="motherName"
                                value={formData.motherName}
                                onChange={handleChange}
                                label="Mother's Name"
                                fullWidth size='small'
                                autoComplete="mother-name"
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <TextField
                                required
                                id="motherphone"
                                name="motherPhone"
                                value={formData.motherPhone}
                                onChange={handleChange}
                                label="Mother's Phone"
                                fullWidth size='small'
                                autoComplete="mother-phone"
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <TextField

                                id="motheroccupation"
                                name="motherOccupation"
                                value={formData.motherOccupation}
                                onChange={handleChange}
                                label="Mother's Occupation"
                                fullWidth size='small'
                                autoComplete="mother-occupation"
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <TextField
                                required
                                id="motherincome"
                                name="motherIncome"
                                value={formData.motherIncome}
                                onChange={handleChange}
                                label="Mother's Income"
                                fullWidth size='small'
                                autoComplete="motherincome"
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField required
                                id="address"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                label="Address"
                                fullWidth
                                autoComplete="address"
                                size='small'
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <TextField
                                required
                                id="city"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                label="City"
                                size='small'
                                fullWidth
                                autoComplete="address-city"
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <TextField
                                required
                                size='small'
                                id="zip"
                                value={formData.zip}
                                onChange={handleChange}
                                name="zip"
                                label="Zip / Postal code"
                                fullWidth
                                autoComplete="postal-code"
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <TextField
                                id="state"
                                value={formData.state}
                                onChange={handleChange}
                                name="state"
                                label="State/Province/Region"
                                fullWidth
                                size='small'
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <TextField
                                id="country"
                                name="country"
                                value={formData.country}
                                onChange={handleChange}
                                label="Country"
                                fullWidth
                                size='small'
                                variant="outlined"
                            />
                        </Grid>


                        <Grid item xs={12} sm={12}>
                            <Grid container spacing={1}>
                                <Grid item xs={12} sm={4}>
                                    <fieldset className='abcde'>
                                        <legend>10th Details</legend>
                                        <Grid container spacing={1.2}>
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    disabled
                                                    id="studentid"

                                                    size='small'
                                                    label="Class"
                                                    value="X"
                                                    fullWidth autoFocus

                                                    variant="outlined"
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <FormControl fullWidth variant="outlined" size='small' >
                                                    <InputLabel required id="demo-simple-select-standard-label">Year</InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-standard-label"
                                                        id="demo-simple-select-standard"
                                                        onChange={handleChange}
                                                        name="metricYear"
                                                        value={formData.metricYear}
                                                        label="Year" >
                                                        <MenuItem value="">
                                                            <em>None</em>
                                                        </MenuItem>
                                                        {years.map((year) => (
                                                            <MenuItem key={year} value={year}>
                                                                {year}
                                                            </MenuItem>
                                                        ))}

                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <FormControl fullWidth variant="outlined" size='small' >
                                                    <InputLabel required id="metricstatus">Status</InputLabel>
                                                    <Select
                                                        labelId="metricstatus"
                                                        id="metricstatus"
                                                        value={formData.metricStatus}
                                                        onChange={handleChange}
                                                        name="metricStatus"
                                                        label="Status" >
                                                        <MenuItem value="">
                                                            <em>None</em>
                                                        </MenuItem>
                                                        <MenuItem value="Pass">Pass</MenuItem>
                                                        <MenuItem value="Fail">Fail</MenuItem>
                                                        <MenuItem value="Pursuing">Pursuing</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    required
                                                    id="metricrollnumber"
                                                    size='small'
                                                    name="metricRollNumber"
                                                    label="Roll Number"
                                                    value={formData.metricRollNumber}
                                                    onChange={handleChange}
                                                    fullWidth
                                                    autoComplete="metric-roll-number"
                                                    variant="outlined"
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    required
                                                    id="metrictotalmarks"
                                                    size='small'
                                                    name="metricTotalMarks"
                                                    label="Mark Total"
                                                    value={formData.metricTotalMarks}
                                                    onChange={handleChange}
                                                    fullWidth
                                                    autoComplete="metric-totalmarks"
                                                    variant="outlined"
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    required
                                                    id="metricobtainedmarks"
                                                    size='small'
                                                    name="metricObtainedMarks"
                                                    label="Obtained"
                                                    value={formData.metricObtainedMarks}
                                                    onChange={handleChange}
                                                    fullWidth
                                                    autoComplete="metric-obtained-marks"
                                                    variant="outlined"
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField

                                                    id="metricpercent"
                                                    size='small'
                                                    name="metricPercent"
                                                    label="Percent %"
                                                    value={formData.metricPercent}
                                                    onChange={handleChange}
                                                    fullWidth
                                                    autoComplete="metric-percent"
                                                    variant="outlined"
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField

                                                    id="metricsubject"
                                                    size='small'
                                                    name="metricSubject"
                                                    label="Subjects"
                                                    value={formData.metricSubject}
                                                    onChange={handleChange}
                                                    fullWidth
                                                    autoComplete="metric-subject"
                                                    variant="outlined"
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    required
                                                    id="metricboard"
                                                    size='small'
                                                    name="metricBoard"
                                                    label="Board"
                                                    value={formData.metricBoard}
                                                    onChange={handleChange}
                                                    fullWidth
                                                    autoComplete="metric-board"
                                                    variant="outlined"
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    required
                                                    id="metricschoolname"
                                                    size='small'
                                                    name="metricSchoolName"
                                                    label="Xth School Name"
                                                    value={formData.metricSchoolName}
                                                    onChange={handleChange}
                                                    fullWidth
                                                    autoComplete="metric-school-name"
                                                    variant="outlined"
                                                />
                                            </Grid>

                                        </Grid>
                                    </fieldset>
                                </Grid>

                                <Grid item xs={12} sm={4}>
                                    <fieldset className='abcde'>
                                        <legend>12th Details</legend>
                                        <Grid container spacing={1.2}>
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    disabled
                                                    id="studentid"

                                                    size='small'
                                                    label="Class"
                                                    value="XII"
                                                    fullWidth autoFocus

                                                    variant="outlined"
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <FormControl fullWidth variant="outlined" size='small' >
                                                    <InputLabel required id="interyear">Year</InputLabel>
                                                    <Select
                                                        labelId="interyear"
                                                        id="interyear"
                                                        value={formData.interYear}
                                                        onChange={handleChange}
                                                        name="interYear"
                                                        label="Year" >
                                                        <MenuItem value="">
                                                            <em>None</em>
                                                        </MenuItem>
                                                        {years.map((year) => (
                                                            <MenuItem key={year} value={year}>
                                                                {year}
                                                            </MenuItem>
                                                        ))}

                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <FormControl fullWidth variant="outlined" size='small' >
                                                    <InputLabel required id="demo-simple-select-standard-label">Status</InputLabel>
                                                    <Select
                                                        labelId="interstatus"
                                                        id="interstatus"
                                                        value={formData.interStatus}
                                                        onChange={handleChange}
                                                        name="interStatus"
                                                        label="Status" >
                                                        <MenuItem value="">
                                                            <em>None</em>
                                                        </MenuItem>
                                                        <MenuItem value="Pass">Pass</MenuItem>
                                                        <MenuItem value="Fail">Fail</MenuItem>
                                                        <MenuItem value="Pursuing">Pursuing</MenuItem>

                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    required
                                                    id="interrollnumber"
                                                    size='small'
                                                    name="interRollNumber"
                                                    label="Roll Number"
                                                    value={formData.interRollNumber}
                                                    onChange={handleChange}
                                                    fullWidth
                                                    autoComplete="inter-roll-number"
                                                    variant="outlined"
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    required
                                                    id="intertotalmark"
                                                    size='small'
                                                    name="interTotalMark"
                                                    label="Mark Total"
                                                    value={formData.interTotalMark}
                                                    onChange={handleChange}
                                                    fullWidth
                                                    autoComplete="inter-total-mark"
                                                    variant="outlined"
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    required
                                                    id="interobtainedmark"
                                                    size='small'
                                                    name="interObtainedMark"
                                                    label="Obtained"
                                                    value={formData.interObtainedMark}
                                                    onChange={handleChange}
                                                    fullWidth
                                                    autoComplete="inter-obtained-mark"
                                                    variant="outlined"
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField

                                                    id="interpercent"
                                                    size='small'
                                                    name="interPercent"
                                                    label="Percent %"
                                                    value={formData.interPercent}
                                                    onChange={handleChange}
                                                    fullWidth
                                                    autoComplete="inter-percent"
                                                    variant="outlined"
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    id="intersubject"
                                                    size='small'
                                                    name="interSubject"
                                                    label="Subjects"
                                                    value={formData.interSubject}
                                                    onChange={handleChange}
                                                    fullWidth
                                                    autoComplete="inter-subject"
                                                    variant="outlined"
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    required
                                                    id="interboard"
                                                    size='small'
                                                    name="interBoard"
                                                    label="Board"
                                                    value={formData.interBoard}
                                                    onChange={handleChange}
                                                    fullWidth
                                                    autoComplete="inter-board"
                                                    variant="outlined"
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    required
                                                    id="interschoolname"
                                                    size='small'
                                                    name="interSchoolName"
                                                    label="12th School Name"
                                                    value={formData.interSchoolName}
                                                    onChange={handleChange}
                                                    fullWidth
                                                    autoComplete="inter-school-name"
                                                    variant="outlined"
                                                />
                                            </Grid>
                                        </Grid>
                                    </fieldset>
                                </Grid>

                                <Grid item xs={12} sm={4}>
                                    <fieldset className='abcde'>
                                        <legend>Graduation Details</legend>
                                        <Grid container spacing={1.2}>
                                            <Grid item xs={12} sm={6}>
                                                <FormControl fullWidth variant="outlined" size='small' >
                                                    <InputLabel id="graduationcourse">Class</InputLabel>
                                                    <Select
                                                        labelId="graduationcourse"
                                                        id="graduationcourse"
                                                        value={formData.graduationCourse}
                                                        onChange={handleChange}
                                                        name="graduationCourse"
                                                        label="Course" >
                                                        <MenuItem value="">
                                                            <em>None</em>
                                                        </MenuItem>
                                                        <MenuItem value="BA">BA</MenuItem>
                                                        <MenuItem value="BSC">BSC</MenuItem>
                                                        <MenuItem value="Other">Other</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <FormControl fullWidth variant="outlined" size='small' >
                                                    <InputLabel id="graduationyear">Year</InputLabel>
                                                    <Select
                                                        labelId="graduationyear"
                                                        id="graduationYear"
                                                        value={formData.graduationYear}
                                                        onChange={handleChange}
                                                        name="graduationYear"
                                                        label="Year" >
                                                        <MenuItem value="">
                                                            <em>None</em>
                                                        </MenuItem>
                                                        {years.map((year) => (
                                                            <MenuItem key={year} value={year}>
                                                                {year}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <FormControl fullWidth variant="outlined" size='small' >
                                                    <InputLabel id="graduationstatus">Status</InputLabel>
                                                    <Select
                                                        labelId="graduationstatus"
                                                        id="graduationstatus"
                                                        value={formData.graduationStatus}
                                                        onChange={handleChange}
                                                        name="graduationStatus"
                                                        label="Status" >
                                                        <MenuItem value="">
                                                            <em>None</em>
                                                        </MenuItem>
                                                        <MenuItem value="Pass">Pass</MenuItem>
                                                        <MenuItem value="Fail">Fail</MenuItem>
                                                        <MenuItem value="Pursuing">Pursuing</MenuItem>

                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    required
                                                    id="graduationrollnumber"
                                                    size='small'
                                                    name="graduationRollNumber"
                                                    label="Roll Number"
                                                    value={formData.graduationRollNumber}
                                                    onChange={handleChange}
                                                    fullWidth
                                                    autoComplete="graduation-roll-number"
                                                    variant="outlined"
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    id="graduationtotalmark"
                                                    size='small'
                                                    name="graduationTotalMark"
                                                    label="Mark Total"
                                                    value={formData.graduationTotalMark}
                                                    onChange={handleChange}
                                                    fullWidth
                                                    autoComplete="graduationtotalmark"
                                                    variant="outlined"
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    id="graduationobtainedmark"
                                                    size='small'
                                                    name="graduationObtainedMark"
                                                    label="Obtained"
                                                    value={formData.graduationObtainedMark}
                                                    onChange={handleChange}
                                                    fullWidth
                                                    autoComplete="graduation-obtained-mark"
                                                    variant="outlined"
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField

                                                    id="graduationpercent"
                                                    size='small'
                                                    name="graduationPercent"
                                                    label="Percent %"
                                                    value={formData.graduationPercent}
                                                    onChange={handleChange}
                                                    fullWidth
                                                    autoComplete="graduation-percent"
                                                    variant="outlined"
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField

                                                    id="graduationsubject"
                                                    size='small'
                                                    name="graduationSubject"
                                                    label="Subjects"
                                                    value={formData.graduationSubject}
                                                    onChange={handleChange}
                                                    fullWidth
                                                    autoComplete="graduation-subject"
                                                    variant="outlined"
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField

                                                    id="graduationboard"
                                                    size='small'
                                                    name="graduationBoard"
                                                    label="Board / University"
                                                    value={formData.graduationBoard}
                                                    onChange={handleChange}
                                                    fullWidth
                                                    autoComplete="graduation-board"
                                                    variant="outlined"
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField

                                                    id="graduationcollegename"
                                                    size='small'
                                                    name="graduationCollegeName"
                                                    label="College Name"
                                                    value={formData.graduationCollegeName}
                                                    onChange={handleChange}
                                                    fullWidth
                                                    autoComplete="graduation-college-name"
                                                    variant="outlined"
                                                />
                                            </Grid>

                                        </Grid>
                                    </fieldset>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <Grid container justifyContent="flex-end" sx={{ mt: 4 }}>
                                <Button onClick={PatchStudent} sx={{ width: '11rem', height: '5rem' }} variant='contained'>Update</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </Container>

            <Snackbar open={open} key={transition ? transition.name : ''} TransitionComponent={transition} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Student Successfully Created!
                </Alert>
            </Snackbar>
        </>

    );
}

export default UpdateStudent;