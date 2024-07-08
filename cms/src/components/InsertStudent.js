import React, { useEffect, useMemo, useState } from 'react';
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
import Cookies from 'js-cookie';
import { Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import '../css/MainCss.css';
import Sessions from './CustomFunctions';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function TransitionLeft(props) {
    return <Slide {...props} direction="left" />;
}



const InsertStudent = () => {

    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [transition, setTransition] = useState(undefined);
    const [dob, setDob] = useState();
    const [imageBuffer, setImageBuffer] = useState(null);
    const [image, setImage] = useState(null);
    const userName = Cookies.get('user');
    const [countries, setCountries] = useState([]);
    const [sessions, setSessions] = useState([]);
    let user = "";

    if (userName) {
        user = JSON.parse(userName);
    } else {
        navigate("/login");
    }

    //const countriesList = useMemo(() => countryList().getData(), [])
    //setCountries(options);
    // useEffect(() => {
    //     setCountries(countriesList);
    // }, [countriesList]);

    useEffect(() => {
        const sessionsMemoized = Sessions();
        setSessions(sessionsMemoized);
    }, []);
    //fetch countries 
    // const fetchCountries = async () => {
    //     try {
    //         const response = await fetch('https://restcountries.com/v3.1/all');
    //         const countries = await response.json();
    //         const sortedCountries = countries.sort((a, b) =>
    //             a.name.common.localeCompare(b.name.common)
    //         );

    //         setCountries(sortedCountries);
    //         //console.log(countries);
    //     } catch (error) {
    //         console.error('Error fetching countries:', error);
    //     }
    // };
    const Classes = ["BA", "BSC"];
    const Semesters = ["1", "2", "3", "4", "5", "6", "7", "8"];
    const currentYear = useMemo(() => new Date().getFullYear(), []);
    const startYear = 2015;

    const years = useMemo(() => {
        const result = [];
        for (let year = currentYear; year >= startYear; year--) {
            result.push(year);
        }
        return result;
    }, [currentYear, startYear]);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };
    // console.log("rendring");
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
        createdby: user && user.userid,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
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

    const handleSubmit = async (event) => {

        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const userData = {
            admissionNumber: data.get('admissionNumber'),
            wrNumber: data.get('wrNumber'),
            course: data.get('course'),
            semester: data.get('semester'),
            enrollmentNumber: data.get('enrollmentNumber'),
            firstName: data.get('firstName'),
            middleName: data.get('middleName'),
            lastName: data.get('lastName'),
            dob: dob,
            gender: data.get('gender'),
            phoneNumber: data.get('phoneNumber'),
            aadharNumber: data.get('aadharNumber'),
            email: data.get('email'),
            fatherName: data.get('fatherName'),
            fatherIncome: data.get('fatherIncome'),
            fatherPhone: data.get('fatherPhone'),
            fatherOccupation: data.get('fatherOccupation'),
            motherName: data.get('motherName'),
            motherIncome: data.get('motherIncome'),
            motherOccupation: data.get('motherOccupation'),
            motherPhone: data.get('motherPhone'),
            address: data.get('address'),
            zip: data.get('zip'),
            city: data.get('city'),
            state: data.get('state'),
            country: data.get('country'),
            metricYear: data.get('metricYear'),
            metricStatus: data.get('metricStatus'),
            metricRollNumber: data.get('metricRollNumber'),
            metricBoard: data.get('metricBoard'),
            metricTotalMarks: data.get('metricTotalMarks'),
            metricObtainedMarks: data.get('metricObtainedMarks'),
            metricPercent: data.get('metricPercent'),
            metricSchoolName: data.get('metricSchoolName'),
            interBoard: data.get('interBoard'),
            interYear: data.get('interYear'),
            interObtainedMark: data.get('interObtainedMark'),
            interTotalMark: data.get('interTotalMark'),
            interPercent: data.get('interPercent'),
            interSchoolName: data.get('interSchoolName'),
            interStatus: data.get('interStatus'),
            interRollNumber: data.get('interRollNumber'),
            graduationBoard: data.get('graduationBoard'),
            graduationCollegeName: data.get('graduationCollegeName'),
            graduationCourse: data.get('graduationCourse'),
            graduationObtainedMark: data.get('graduationObtainedMark'),
            graduationPercent: data.get('graduationPercent'),
            graduationStatus: data.get('graduationStatus'),
            graduationTotalMark: data.get('graduationTotalMark'),
            graduationYear: data.get('graduationYear'),
            graduationRollNumber: data.get('graduationRollNumber'),

        }
        console.log(userData);
        try {
            const studentResponse = await userServices.postStudent(userData);

            // Check if the student was successfully saved and there is image data
            if (studentResponse.status === 201) {
                if (image) {
                    const formData = new FormData();
                    formData.append("image", image);
                    formData.append("studentId", studentResponse.data._id);

                    //console.log(fileResponse);
                }
                setTransition(() => TransitionLeft);
                setOpen(true);
            }
            else {
                console.log("Student not saved.");
            }
        } catch (e) {
            console.log(e);
        }
    }


    return (
        <>
            <Snackbar open={open} key={transition ? transition.name : ''} TransitionComponent={transition} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Student Successfully Created!
                </Alert>
            </Snackbar>
            <Box component="form" noValidate onSubmit={handleSubmit}>
                <Container maxWidth='xl'>
                    <Box
                        sx={{
                            marginTop: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }} >

                        <Typography sx={{ textDecoration: 'underline', color: 'green' }} variant="h3">Add Student</Typography>
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
                                            required
                                            id="wrnumber"
                                            name="wrNumber"
                                            size='small'
                                            label="WRN"
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
                                            size='small'
                                            label="Enrollment No."
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

                                            label="Admission No."

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

                                                name="semester"

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

                                            name="firstName"
                                            label="First name"
                                            fullWidth

                                            autoComplete="given-name"
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={3}>
                                        <TextField

                                            id="middleName"
                                            size='small'

                                            name="middleName"
                                            label="Middle name"

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
                                    <Grid item xs={12} sm={3}>
                                        <TextField
                                            required
                                            id="phone"
                                            name="phoneNumber"

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

                                            name="aadharNumber"
                                            size='small'
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
                                                        autoComplete="metric-class"
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
                                                            name="metricyear"
                                                            value={formData.metricyear}
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
                                                            value={formData.metricstatus}
                                                            onChange={handleChange}
                                                            name="metricstatus"
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
                                                        name="metricrollnumber"
                                                        label="Roll Number"
                                                        value={formData.metricrollnumber}
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
                                                        name="metrictotalmarks"
                                                        label="Mark Total"
                                                        value={formData.metrictotalmarks}
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
                                                        name="metricobtainedmarks"
                                                        label="Obtained"
                                                        value={formData.metricobtainedmarks}
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
                                                        name="metricpercent"
                                                        label="Percent %"
                                                        value={formData.metricpercent}
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
                                                        name="metricsubject"
                                                        label="Subjects"
                                                        value={formData.metricsubject}
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
                                                        name="metricboard"
                                                        label="Board"
                                                        value={formData.metricboard}
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
                                                        name="metricschoolname"
                                                        label="Xth School Name"
                                                        value={formData.metricschoolname}
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
                                                            value={formData.interyear}
                                                            onChange={handleChange}
                                                            name="interyear"
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
                                                            value={formData.interstatus}
                                                            onChange={handleChange}
                                                            name="interstatus"
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
                                                        name="interrollnumber"
                                                        label="Roll Number"
                                                        value={formData.interrollnumber}
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
                                                        name="mintertotalmarkname"
                                                        label="Mark Total"
                                                        value={formData.intertotalmark}
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
                                                        name="interobtainedmark"
                                                        label="Obtained"
                                                        value={formData.interobtainedmark}
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
                                                        name="interpercent"
                                                        label="Percent %"
                                                        value={formData.interpercent}
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
                                                        name="intersubject"
                                                        label="Subjects"
                                                        value={formData.intersubject}
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
                                                        name="interboard"
                                                        label="Board"
                                                        value={formData.interboard}
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
                                                        name="interschoolname"
                                                        label="12th School Name"
                                                        value={formData.interschoolname}
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
                                                            value={formData.graduationcourse}
                                                            onChange={handleChange}
                                                            name="graduationcourse"
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
                                                            id="graduationyear"
                                                            value={formData.graduationyear}
                                                            onChange={handleChange}
                                                            name="graduationyear"
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
                                                            value={formData.graduationstatus}
                                                            onChange={handleChange}
                                                            name="graduationstatus"
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
                                                        name="graduationrollnumber"
                                                        label="Roll Number"
                                                        value={formData.graduationrollnumber}
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
                                                        name="graduationtotalmark"
                                                        label="Mark Total"
                                                        value={formData.graduationtotalmark}
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
                                                        name="graduationobtainedmark"
                                                        label="Obtained"
                                                        value={formData.graduationobtainedmark}
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
                                                        name="graduationpercent"
                                                        label="Percent %"
                                                        value={formData.graduationpercent}
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
                                                        name="graduationsubject"
                                                        label="Subjects"
                                                        value={formData.graduationsubject}
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
                                                        name="graduationboard"
                                                        label="Board / University"
                                                        value={formData.graduationboard}
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
                                                        name="graduationcollegename"
                                                        label="College Name"
                                                        value={formData.graduationcollegename}
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
                                    <Button type='submit' sx={{ width: '11rem', height: '5rem' }} variant='contained'>Save</Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Box>
                </Container>
            </Box>
        </>
    );
}
export default InsertStudent;