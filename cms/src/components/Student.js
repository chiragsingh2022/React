import React, { useEffect, useState } from "react";
import { Button, Stack, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { format } from 'date-fns';
import api_URL from "../Helper";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Tooltip from '@mui/material/Tooltip';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { Box, Container, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import MessageDialog from "../Dialogs/MessageDialog";
import { userServices } from "../services/user-services";
import "../css/MainCss.css"
import Cookies from "js-cookie";
import Sessions from './CustomFunctions';
import useMessageDialog from "../CustomHooks/useMessageDialog";
import useYesNoMessageDialog from "../CustomHooks/useYesNoDialog";

const Student = () => {
    const navigate = useNavigate();
    const token = Cookies.get('token');
    const userCookies = Cookies.get('user');
    let user = "";
    if (userCookies && token) {
        user = JSON.parse(userCookies);
    }
    else {
        navigate("/login");
    }

    const [updateStudentModel, setUpdateStudentModel] = React.useState(false);
    const [viewStudentModel, setViewStudentModel] = useState(false);
    const [student, setStudent] = useState([]);
    const [selectStudent, setSelectStudent] = useState([]);
    const [errorMessageDialog, setErrorMessageDialog] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [searchBy, setSearchBy] = useState("");
    const [addStudentModel, setAddStudentModel] = React.useState(false);
    const [listVisibility, setListVisibility] = useState(false);
    const [showSessionModel, setShowSessionModel] = useState(false);
    const [sessions, setSessions] = useState([]);
    const [selectedSession, setSelectedSession] = useState("");
    const [selectedClass, setSelectedClass] = useState("");
    const [selectedSemester, setSelectedSemester] = useState("");
    const { showMessageDialog, DialogComponent } = useMessageDialog();
    const { showYesNoDialog, YesNoDialogComponent } = useYesNoMessageDialog();
    const Classes = ["BA", "BSC"];
    const Semesters = ["1", "2", "3", "4", "5", "6", "7", "8"];

    useEffect(() => {
        if (!token) {
            navigate('/login');
        }
        else {
            //FetchDataList();
            try {
                const sessions = Sessions();
                setSessions(sessions);
            }
            catch (e) {
                alert(e.response.data.error);
                console.log(e)
            }
        }
    }, []);

    const FetchDataList = async () => {
        await fetch(`${api_URL}/api/student`, {
            method: 'GET',
            headers: {
                'authorization': `Bearer ${token}`
            }
        }).then((result) => {
            result.json().then((res) => {
                //console.log(res);
                if (Array.isArray(res)) {
                    if (res.length > 0) {
                        setListVisibility(true);
                    }
                    setStudent(res);
                    //console.log(res);
                }
                else {
                    navigate(res.redirect);
                }
            });
        });
    }

    const DeleteStudent = async (_id) => {
        var confirmed = await showYesNoDialog("Delete Record!","Are you sure you want to delete?");
        if (confirmed) {
            try {

                const deletedStudent = await userServices.deleteStudent(_id);

                if (deletedStudent) {
                    await userServices.deleteAttachment(_id);
                    setStudent(prevStudentList => prevStudentList.filter(usr => usr._id !== _id));
                }
            }
            catch (e) {
                console.log(e);
            }
        }
    }

    const UpdateStudent = (item) => {
        setSelectStudent(item);
        setUpdateStudentModel(true);
        navigate('/updatestudent', { state: { studentData: item } });
    }
    const ViweDetails = (item) => {
        setSelectStudent(item);
        setViewStudentModel(true);
        navigate('studentdetails', { state: { studentData: item } });
    }
    const AddStudentList = (item) => {
        setStudent(prev => [...prev, item]);
    }

    const updateStudentList = (updatedData) => {
        //console.log(updatedData);
        const updatedIndex = student.findIndex((s) => s._id === updatedData._id);
        // If the student is found, update the array
        if (updatedIndex !== -1) {
            const updatedStudentList = [...student];
            updatedStudentList[updatedIndex] = updatedData;
            setStudent(updatedStudentList);
        }
    }

    const SearchRecord_KeyDown = async (e) => {
        if (e.key === 'Enter') {
            if (searchBy && e.target.value) {
                //console.log('searchBy is there');
                await fetch(`${api_URL}/api/student/filter?${searchBy}=${e.target.value}`, {
                    method: 'GET',
                    headers: {
                        'authorization': `Bearer ${token}`
                    }
                }).then((result) => {
                    result.json().then((res) => {

                        if (Array.isArray(res)) {
                            if (res.length >= 1) {
                                setStudent(res);
                            }
                            else {
                                setStudent([]);
                                setErrorMessage("No Record Found!");
                                setErrorMessageDialog(true);
                            }
                        }
                        else {
                            localStorage.clear();
                            navigate(res.redirect);
                        }
                    });
                });
            }
            else {
                FetchDataList();
            }
        }
    }

    const searchStudent = async (e) => {

        if (true) {
            userServices.getStudentByClass(selectedSession, selectedSemester, selectedClass)
                .then(async (result) => {
                    if (Array.isArray(result.data)) {

                        if (result.data.length >= 1) {

                            setStudent(result.data);
                        }
                        else {
                            setStudent([]);
                            await showMessageDialog("No Record!","No Record Found!");
                            // setErrorMessage("No Record Found!");
                            // setErrorMessageDialog(true);
                        }
                    }
                    else {
                        localStorage.clear();
                        //navigate(res.redirect);
                    }
                });
        }
    }

    return (
        <>
            {DialogComponent}
            {YesNoDialogComponent}
            <div className="studentDiv">
                <header className="student-header">
                    <Container maxWidth='xl'>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',

                        }}>
                            <Grid container spacing={3} justifyContent='center'>

                                <Grid item xs={12} sm={2}>
                                    <FormControl fullWidth variant="outlined" size='small' >
                                        <InputLabel required id="session">Session</InputLabel>
                                        <Select
                                            labelId="session"
                                            id="session"
                                            name="session"
                                            onChange={(e) => setSelectedSession(e.target.value)}
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
                                <Grid item xs={12} sm={2}>
                                    <FormControl fullWidth variant="outlined" size='small' >
                                        <InputLabel required id="demo-simple-select-standard-label">Class</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-standard-label"
                                            id="demo-simple-select-standard"
                                            name="gender" onChange={(e) => setSelectedClass(e.target.value)}
                                            label="Class" >
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
                                <Grid item xs={12} sm={2}>
                                    <FormControl fullWidth variant="outlined" size='small' >
                                        <InputLabel required id="semester">Semester</InputLabel>
                                        <Select
                                            labelId="semester"
                                            id="semester"
                                            name="semester"
                                            onChange={(e) => setSelectedSemester(e.target.value)}
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
                                <Grid item xs={12} sm={2}>
                                    <Grid container justifyContent='flex-end' gap={2}>
                                        <Button onClick={searchStudent} >Search</Button>
                                    </Grid>
                                </Grid>


                                {/* <Divider sx={{ bgcolor: '#000',height:'12.5rem',width:'4px' }}  orientation="vertical" flexItem /> */}
                            </Grid>
                        </Box>
                    </Container>
                </header>
                <section className="student-section-container" >
                    <div className="rss-rows">
                        <div className="rss-table-header">
                            <Grid container sx={{ p: .5 }} rowGap={1} columnGap={1} justifyContent="flex-end">
                                <Grid item xs={12} sm={2}>
                                    <FormControl fullWidth variant="filled" size='small' >
                                        <InputLabel sx={{ color: "smokewhite" }} required id="demo-simple-select-standard-label">Search By</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-standard-label"
                                            id="demo-simple-select-standard"
                                            name="searchby"
                                            value={searchBy}
                                            onChange={(e) => setSearchBy(e.target.value)}
                                            label="Search By" >
                                            <MenuItem value="studentid">Student ID</MenuItem>
                                            <MenuItem value="name">Name</MenuItem>
                                            <MenuItem value="email">Email</MenuItem>
                                            <MenuItem value="phonenumber">Phone</MenuItem>

                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={2}>
                                    <TextField fullWidth
                                        label="Search"
                                        size='small'
                                        name="search"
                                        onKeyDown={SearchRecord_KeyDown}
                                        variant="filled"
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <SearchIcon />
                                                </InputAdornment>
                                            ),
                                        }}>
                                    </TextField>
                                </Grid>

                            </Grid>
                        </div>
                        <div style={{ paddingTop: '10px' }} >
                            <Table responsive hover>
                                <thead>
                                    <tr>
                                        <th>Sr. No.</th>
                                        <th>Admission No.</th>
                                        <th>Name</th>
                                        <th>DOB</th>
                                        <th>Mobile</th>
                                        <th>Email</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        student.map((item, i) => (

                                            <tr key={i}>
                                                <td>{i + 1}</td>
                                                <td style={{ cursor: 'pointer' }} onClick={() => ViweDetails(item)}>{item.admissionNumber}</td>
                                                <td>{item.firstName} {item.middleName} {item.lastName}</td>
                                                <td>{item.dob ? format(new Date(item.dob), 'dd-MM-yyyy') : ''}</td>
                                                <td>{item.phoneNumber}</td>
                                                <td>{item.email}</td>
                                                <td>

                                                    <Stack direction='horizontal' gap={0}>
                                                        {user && user.candeletestudent && (
                                                            <Tooltip title='Delete' placement="top">
                                                                <IconButton sx={{ '&:hover': { boxShadow: 4, color: 'red' } }} onClick={() => DeleteStudent(item._id)} aria-label="delete" size="small">
                                                                    <DeleteIcon fontSize="small" />
                                                                </IconButton>
                                                            </Tooltip>
                                                        )}
                                                        {user && user.canupdatestudent && (
                                                            <Tooltip title='Update' placement="top">
                                                                <IconButton sx={{ '&:hover': { boxShadow: 4, color: 'green' } }} onClick={() => UpdateStudent(item)} aria-label="update" size="small">
                                                                    <EditIcon fontSize="small" />
                                                                </IconButton>
                                                            </Tooltip>
                                                        )}
                                                        {/* {user && user.canviewstudent && (
                                                            <Tooltip title='View' placement="top">
                                                                <IconButton sx={{ '&:hover': { boxShadow: 4, color: '#007BFF' } }} onClick={() => ViweDetails(item)} aria-label="View" size="small">
                                                                    <InfoIcon fontSize="small" />
                                                                </IconButton>
                                                            </Tooltip>
                                                        )} */}
                                                    </Stack>

                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </Table>
                        </div>
                    </div>
                </section>
            </div>

            <MessageDialog
                show={errorMessageDialog}
                onHide={() => setErrorMessageDialog(false)}
                message={errorMessage}
            />
        </>
    );
}

export default Student;