import React, { useEffect, useState } from "react";
import { Stack, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import { format } from 'date-fns';
import api_URL from "../Helper";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Tooltip from '@mui/material/Tooltip';
import InfoIcon from '@mui/icons-material/Info';
import UpdateStudentDialog from "../Dialogs/UpdateStudentDialog";
import ViewDetailsDialog from "../Dialogs/ViewDetailsDialog";

const Student = () => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    const [updateStudentModel, setUpdateStudentModel] = React.useState(false);
    const [viewStudentModel, setViewStudentModel] = useState(false);
    const [student, setStudent] = useState([]);
    const [selectStudent, setSelectStudent] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate('/login');
        }
        else {
            FetchDataList();
        }
    }, []);

    const FetchDataList = async () => {
        await fetch(`${api_URL}/api/student`, {
            method: 'GET',
            headers: {
                'authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }).then((result) => {
            result.json().then((res) => {
                //console.log(res);
                if (Array.isArray(res)) {
                    setStudent(res);
                }
                else {
                    localStorage.clear();
                    navigate(res.redirect);
                }
            });
        });
    }

    const DeleteStudent = (_id) => {
        var confirmed = window.confirm("Do you want do delete ?")
        if (confirmed) {
            try {
                fetch(`${api_URL}/api/student/${_id}`, {
                    method: 'DELETE',
                    headers: {
                        'authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                }).then((res) => {
                    res.json().then((result) => {
                        setStudent(prevStudentList => prevStudentList.filter(usr => usr._id !== _id));
                        //FetchDataList();
                    })
                })
            }
            catch (e) {
                console.log(e);
            }
        }
    }

    const UpdateStudent = (item) => {
        setSelectStudent(item);
        setUpdateStudentModel(true);
        //navigate(setUpdateStudentModel(true), { state: { studentData: item } });
    }
    const ViweDetails = (item) => {
        setSelectStudent(item);
        setViewStudentModel(true);
        //navigate(setUpdateStudentModel(true), { state: { studentData: item } });
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
    return (
        <>
            <NavBar />
            <UpdateStudentDialog show={updateStudentModel}
                onHide={() => {
                    setUpdateStudentModel(false); setSelectStudent([]); // Reset the array of objects when the dialog is closed
                }} StudentData={selectStudent} updateList={updateStudentList} />

            <ViewDetailsDialog show={viewStudentModel} onHide={() => {
                setViewStudentModel(false); setSelectStudent([]); // Reset the array of objects when the dialog is closed
            }} studentdata={selectStudent} />
            <div style={{ minHeight: "100vh" }}>
                <div style={{ margin: "10px 10px 10px 10px" }}>
                    <Table responsive hover>
                        <thead>
                            <tr>
                                <th>Sr. No.</th>
                                <th>StudentID</th>
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
                                        <td>{item.studentid}</td>
                                        <td>{item.fname} {item.lname}</td>
                                        <td>{item.dob ? format(new Date(item.dob), 'dd-MM-yyyy') : ''}</td>
                                        <td>{item.phonenumber}</td>
                                        <td>{item.email}</td>
                                        <td>
                                            {
                                                user.userType === 'Admin' ? (<>
                                                    <Stack direction='horizontal' gap={0}>
                                                        <Tooltip title='Delete' placement="top">
                                                            <IconButton sx={{ '&:hover': { boxShadow: 4, color: 'red' } }} onClick={() => DeleteStudent(item._id)} aria-label="delete" size="small">
                                                                <DeleteIcon fontSize="small" />
                                                            </IconButton>
                                                        </Tooltip>
                                                        <Tooltip title='Update' placement="top">
                                                            <IconButton sx={{ '&:hover': { boxShadow: 4, color: 'green' } }} onClick={() => UpdateStudent(item)} aria-label="update" size="small">
                                                                <EditIcon fontSize="small" />
                                                            </IconButton>
                                                        </Tooltip>
                                                        <Tooltip title='View' placement="top">
                                                            <IconButton sx={{ '&:hover': { boxShadow: 4, color: '#007BFF' } }} onClick={() => ViweDetails(item)} aria-label="View" size="small">
                                                                <InfoIcon fontSize="small" />
                                                            </IconButton>
                                                        </Tooltip></Stack>
                                                </>)
                                                    :
                                                    null
                                            }
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </Table>
                </div>
            </div>
        </>
    );
}

export default Student;