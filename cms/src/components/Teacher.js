import { IconButton, Tooltip } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Stack, Table } from "react-bootstrap";
import { userServices } from "../services/user-services";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import AddTeacherDialog from '../Dialogs/AddTeacherDialog';
import { format } from "date-fns";
import UpdateTeacherDialog from "../Dialogs/UpdateTeacherDialog";
import useYesNoDialog from "../CustomHooks/useYesNoDialog";

const Teacher = () => {
    const [teacher, setTeacher] = useState([]);
    const [modalShow, setModalShow] = useState(false);
    const [updateModalShow, setUpdateModalShow] = useState(false);
    const [selectedItem, setSelectedItem] = useState([]);
    const { showYesNoDialog, YesNoDialogComponent } = useYesNoDialog();
    useEffect(() => {
        userServices.getTeacher()
            .then((res) => {
                //console.log(res.data);
                setTeacher(res.data)
            })
            .catch((error) => console.log(error));
    }, []);

    const deleteTeacher = async (_id) => {
        var confirmed = await showYesNoDialog("Delete Record!", "Are you sure you want to delete?");
        if (confirmed) {
            userServices.deleteTeacher(_id)
                .then((res) => {
                    //alert("Successfully deleted");
                    setTeacher(prevTeacherList => prevTeacherList.filter(usr => usr._id !== _id));
                })
                .catch((error) => console.log(error));
        }
    }

    const handleUpdate = (item) => {
        //console.log(item);
        setSelectedItem(item);
        setUpdateModalShow(true);
    }

    return (
        <>
            <div className="rss-grid-container">
                <div className="rss-rows">
                    <div className=" teacher-table-header rss-header-text">
                        <h4>Teacher's List</h4>
                        <div>
                            <Tooltip title='Add' placement="top">
                                <IconButton onClick={() => setModalShow(true)} sx={{ '&:hover': { color: 'blue' } }} aria-label="delete" size="large">
                                    <AddIcon fontSize="large" />
                                </IconButton>
                            </Tooltip>
                        </div>
                    </div>
                    <div className="rss-table">
                        <Table responsive hover>
                            <thead >
                                <tr>
                                    <th>Sr. No.</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone Number</th>
                                    <th>Gender</th>
                                    <th>Qualification</th>
                                    <th>DOB</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    teacher.map((item, i) => (

                                        <tr key={i}>
                                            <td>{i + 1}</td>
                                            <td>{item.firstName} {item.lastName}</td>
                                            <td>{item.email}</td>
                                            <td>{item.phoneNumber}</td>
                                            <td>{item.gender}</td>
                                            <td>{item.qualification}</td>
                                            <td>{item.dob ? format(new Date(item.dob), 'dd-MM-yyyy') : ''}</td>
                                            <td>
                                                <Stack direction='horizontal' gap={0}>

                                                    <Tooltip title='Delete' placement="top">
                                                        <IconButton sx={{ '&:hover': { boxShadow: 4, color: 'red' } }} onClick={() => deleteTeacher(item._id)} aria-label="delete" size="small">
                                                            <DeleteIcon fontSize="small" />
                                                        </IconButton>
                                                    </Tooltip>


                                                    <Tooltip title='Update' placement="top">
                                                        <IconButton onClick={() => handleUpdate(item)} sx={{ '&:hover': { boxShadow: 4, color: 'green' } }} aria-label="update" size="small">
                                                            <EditIcon fontSize="small" />
                                                        </IconButton>
                                                    </Tooltip>
                                                </Stack>
                                            </td>

                                        </tr>
                                    ))
                                }
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>
            {YesNoDialogComponent}
            <AddTeacherDialog show={modalShow} onHide={() => setModalShow(false)} />
            <UpdateTeacherDialog tData={selectedItem} show={updateModalShow} onHide={() => setUpdateModalShow(false)} />
        </>
    );
}

export default Teacher;