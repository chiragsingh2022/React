import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { Navigate, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import { format } from 'date-fns';
import api_URL from "../Helper";

const Student = () => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));

    const [student, setStudent] = useState([]);
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
                    navigate(res.result);
                }
            });
        });
    }

    const DeleteStudent = (_id) => {
        var confirmed = window.confirm("Do you want do delete ?")
        if (confirmed) {
            fetch(`${api_URL}/api/student/${_id}`, {
                method: 'DELETE',
                headers: {
                    'authorization': `Bearer ${localStorage.getItem('token')}`
                }
            }).then((res) => {
                res.json().then((result) => {

                    FetchDataList();
                })
            })
        }
    }

    const UpdateStudent = (item) => {

        navigate(`/updatestudent`, { state: { studentData: item } });
    }
    return (
        <>
            <NavBar />
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
                                                    <Button variant="outline-danger" onClick={() => DeleteStudent(item._id)}>Delete</Button>&nbsp;

                                                    <Button variant="outline-success" onClick={() => UpdateStudent(item)} >Update</Button>
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