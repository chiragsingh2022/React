import { format } from 'date-fns';
import React, { useState, useEffect } from 'react';
import { Button, ButtonGroup, Form, FormCheck, Table } from 'react-bootstrap';
import api_URL from '../Helper';
//import axios from 'axios';

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

    const [attendanceCheckboxes, setAttendanceCheckboxes] = useState(false);

    // Fetch student data and attendance from your API
    useEffect(() => {
        fetch(`${api_URL}/api/student`, {
            method: 'GET'
        }) // Replace with your API endpoint
            .then((result) => {
                result.json().then((res) => {
                    //console.log(res);
                    if (Array.isArray(res)) {
                        setStudents(res);

                    }
                    else {
                        // localStorage.clear();
                        // navigate(res.result);
                    }
                });
            });
    }, []);

    const handleCheckboxChange = (e, _id) => {
        let abc = e.target.checked;
        console.log(abc, _id)
    };
    return (
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
                                    <ButtonGroup>
                                        <Button variant='outline-danger'>A</Button>&nbsp;
                                        <Button variant='outline-success'>P</Button>
                                    </ButtonGroup>
                                </td>

                            </tr>
                        ))
                    }
                </tbody>
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
    );
};



export default StudentAttendance;
