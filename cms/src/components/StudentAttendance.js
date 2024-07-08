
import React, { useState, useEffect } from 'react';
import { userServices } from '../services/user-services';
import { Box, Button, Checkbox, Container, FormControl, Grid, InputAdornment, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import '../css/MainCss.css';
import { Table } from 'react-bootstrap';
import Sessions from './CustomFunctions';

const StudentAttendance = () => {
    const [students, setStudents] = useState([]);
    const [subjectId, setSubjectId] = useState();
    const [semester, setSemester] = useState();
    const [attendanceData, setAttendanceData] = useState([]);
    const [attendanceSubject, setAttendanceSubject] = useState(null);
    const [subject, setSubject] = useState([]);
    const [sessions, setSessions] = useState([]);
    const Classes = ["BA", "BSC"];
    const Semesters = ["1", "2", "3", "4", "5", "6", "7", "8"];

    useEffect(() => {
        const sessionsMemoized = Sessions();
        setSessions(sessionsMemoized);
        // Fetch the list of students from your API

    }, []);


    const handleAttendanceChange = (studentId, isPresent, subjectId) => {
        if (subjectId === null) {
            alert('Please select subject first');
            return;
        }
        //console.log(studentId,isPresent);
        setAttendanceData(prevAttendanceData => {
            const updatedData = prevAttendanceData.map(item =>
                item.studentId === studentId ? { ...item, isPresent, subjectId } : item
            );
            return updatedData;
        });
    };

    const handleMarkAllPresent = () => {
        setAttendanceData(prevAttendanceData =>
            prevAttendanceData.map(item => ({ ...item, isPresent: true }))
        );
    };

    const handleMarkAllAbsent = () => {
        setAttendanceData(prevAttendanceData =>
            prevAttendanceData.map(item => ({ ...item, isPresent: false }))
        );
    };

    const handleSaveAttendance = () => {
        // Make an API call to save attendance for all students
        userServices.postAttendance(attendanceData)
            .then(response => console.log(response.data))
            .catch(error => console.error('Error marking attendance:', error));
    };

    useEffect(() => {
        userServices.getSubject().then(res => {
            setSubject(res.data);
            //console.log(res.data);
        }).catch(error => console.log(error));

    }, []);

    const SearchBySubject = () => {
                userServices.getAttendanceBySubject(subjectId, semester)
                .then(response => {
                // const initialAttendanceData = response.data.map(student => ({
                //     studentId: student._id,
                //     isPresent: false, // Assuming all students are initially marked present
                // }));
                console.log(response.data);
                // setStudents(response.data);
                // setAttendanceData(initialAttendanceData);
            })
            .catch(error => console.error('Error fetching students:', error));
    }

    return (
        <>
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
                                            name="gender"
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
                                            onChange={(e) => setSemester(e.target.value)}
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
                                    <FormControl fullWidth variant="outlined" size='small' >
                                        <InputLabel required id="subject">Subject</InputLabel>
                                        <Select
                                            labelId="subject"
                                            id="subject"
                                            name="subject"
                                            onChange={(e) => setSubjectId(e.target.value)}
                                            label="Subject" >
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                            {subject.map((Sub) => (
                                                <MenuItem key={Sub._id} value={Sub._id}>
                                                    {Sub.description}
                                                </MenuItem>
                                            ))}

                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={2}>
                                    <Grid container justifyContent='flex-end' gap={2}>
                                        <Button variant='contained' onClick={() => SearchBySubject()}>Search</Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Box>
                    </Container>
                </header>
                <section className="student-section-container" >
                    <div className="rss-rows">
                        <div className="rss-table-header">
                            <h2>Student Attendance Register</h2>
                            <Grid container sx={{ p: .5 }} rowGap={1} columnGap={1} justifyContent="flex-end">
                                <Grid item xs={12} sm={3}>
                                    <FormControl fullWidth variant="filled" size='small' >
                                        <InputLabel sx={{ color: "smokewhite" }} required >Subject</InputLabel>
                                        <Select
                                            name="subject"
                                            value={attendanceSubject}
                                            onChange={(e) => setAttendanceSubject(e.target.value)}
                                            label="Subject" >
                                            {subject.map((sub) => (
                                                <MenuItem value={sub._id}>{sub.description}</MenuItem>
                                            ))}

                                        </Select>
                                    </FormControl>
                                </Grid>
                                {/* <Grid item xs={12} sm={2}>
                                    <TextField fullWidth
                                        label="Search"
                                        size='small'
                                        name="search"
                                        
                                        variant="filled"
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <SearchIcon />
                                                </InputAdornment>
                                            ),
                                        }}>
                                    </TextField>
                                </Grid> */}

                            </Grid>
                        </div>
                        <div style={{ paddingTop: '10px' }} >
                            <Table responsive hover>
                                <thead>
                                    <tr>
                                        <th>Sr.No.</th>
                                        <th>Admission No.</th>
                                        <th>Student Name</th>
                                        <th>Attendance</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {students.map((student, index) => (
                                        <tr key={student._id}>
                                            <td>{index + 1}</td>
                                            <td>{student.admissionNumber}</td>
                                            <td>{student.firstName} {student.lastName}</td>
                                            <td>
                                                <Checkbox sx={{ p: 0 }}
                                                    checked={attendanceData.find(item => item.studentId === student._id)?.isPresent || false}
                                                    onChange={(e) => handleAttendanceChange(student._id, e.target.checked, attendanceSubject)}
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                        <div className='table-footer'>
                            <Button variant='contained' type="button" onClick={handleSaveAttendance}>Save</Button>
                        </div>
                    </div>
                </section>
            </div>

            {/* <Container>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}>
                    <h2>Mark Attendance</h2>
                    <Grid Container>
                        <Button variant='contained' onClick={handleMarkAllPresent}>Mark All Present</Button>
                        <Button variant='contained' onClick={handleMarkAllAbsent}>Mark All Absent</Button>
                       
                    </Grid>
                    <Button type="button" onClick={handleSaveAttendance}>Save Attendance</Button>
                </Box>
            </Container> */}
        </>
    );
};

export default StudentAttendance;