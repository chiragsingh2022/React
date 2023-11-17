import { format } from 'date-fns';
import React, { useState, useEffect } from 'react';
import { Button, ButtonGroup, Form, FormCheck, Navbar, Table } from 'react-bootstrap';
import api_URL from '../Helper';
//import axios from 'axios';
import Grid from '@mui/material/Grid';
import NavBar from './NavBar';
import { Checkbox } from '@mui/material';

const StudentAttendance = () => {
    const [students, setStudents] = useState([]);
    const currentDate = new Date();
    const dateHeaders = [];
    const date = new Date().toLocaleDateString();
    // for (let i = 0; i < 7; i++) {
    //     const date = new Date();
    //     date.setDate(currentDate.getDate() - i);
    //     dateHeaders.push(date.toLocaleDateString()); // Format the date as needed
    // }

    const [attendanceCheckboxes, setAttendanceCheckboxes] = useState({});
    const [checked, setChecked] = React.useState(false);

    const handleChange = (studentId, isChecked) => {
        setAttendanceCheckboxes(prevState => ({ ...prevState, [studentId]: isChecked }));
        console.log(attendanceCheckboxes)
    };


    // Fetch student data and attendance from your API
    useEffect(() => {
        fetch(`${api_URL}/api/student`, {
            method: 'GET',
            headers: {
                'authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }) // Replace with your API endpoint
            .then((result) => {
                result.json().then((res) => {
                    //console.log(res);
                    if (Array.isArray(res)) {
                        setStudents(res);
                        //console.log(res);
                    }
                    else {
                        // localStorage.clear();
                        // navigate(res.result);
                    }
                });
            });
    }, []);

    return (
        <>
            <NavBar />
            <Grid container component="main" sx={{ height: '100vh' }}>
                <div>
                    <h1>Student Attendance</h1>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>{date}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                students.map((student) => (
                                    <tr key={student._id}>
                                        <td>{student.fname} {student.lname}</td>
                                        <td>
                                            <Checkbox
                                                checked={attendanceCheckboxes[student._id]}
                                                onChange={(e) => handleChange(student._id, e.target.checked)}
                                                inputProps={{ 'aria-label': 'controlled' }}
                                            />
                                        </td>

                                    </tr>
                                ))
                            }

                        </tbody>
                        <tfoot>
                            <tr>
                                <td>

                                </td>
                                <td>
                                    <Button>Click</Button>
                                </td>
                            </tr>

                        </tfoot>
                        {/* <tbody>
                    {students.map((student) => (
                        <tr key={student._id}>
                            <td>{student.fname} {student.lname}</td>
                            {dateHeaders.map((date, index) => {
                                const attendanceEntry = student.attendance.find(
                                    (attendance) => attendance.date ? format(new Date(attendance.date),'dd/MM/yyyy'):'' === date
                                );
                                return (
                                    <td key={index}>{attendanceEntry ? attendanceEntry.status : 'N/A'}</td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody> */}
                    </Table>
                </div>
            </Grid>
        </>
    );
};



export default StudentAttendance;
