import React, { useEffect, useState } from 'react';
import Buttons from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Stack from 'react-bootstrap/Stack'
import Grid from '@mui/material/Grid';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import DeleteIcon from '@mui/icons-material/Delete';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';
import { userServices } from '../services/user-services';
import { Table } from 'react-bootstrap';
import { IconButton, Tooltip } from '@mui/material';
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function TransitionLeft(props) {
    return <Slide {...props} direction="left" />;
}


function NewSessionDialog(props) {

    const [open, setOpen] = React.useState(false);
    const [transition, setTransition] = React.useState(undefined);
    const [session, setSession] = useState([]);
    const [dialogOpened, setDialogOpened] = useState(false);

    useEffect(() => {
        if (dialogOpened) {
            try {
                userServices.getSession().then((res) => {
                    //console.log(res)
                    setSession(res.data);
                }).catch((error) => {
                    console.log(error);
                });
            }
            catch (e) {
                alert(e.response.data.error);
                console.log(e)
            }
        }

        return(()=>{
            setFormData("");
            setDialogOpened(false);
        });
    }, [dialogOpened])

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const postSession = async () => {

        if (!formData.session) {
            alert("Please fill in all required fields.");
            return;
        }
        console.log(formData.session);

        try {
            userServices.postSession(formData).then((res) => {
                setTransition(() => TransitionLeft);
                setOpen(true);
                props.onHide();
            }).catch((error) => {
                console.log(error);
            });
        }
        catch (e) {
            alert(e.response.data.error);
            console.log(e)
        }
    };
    const [formData, setFormData] = useState({
        session: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const DeleteSession = (_id) => {
        try {
            userServices.deleteSession(_id).then((res) => { }).catch((err) => { console.log(err) })
        }
        catch (e) {
            console.log(e);
        }
    }
    const onpagehide = () =>{
        props.onHide();
        setDialogOpened(false);
    }
    return (
        <>
            <Snackbar open={open} key={transition ? transition.name : ''} TransitionComponent={transition} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Session Successfully Added!
                </Alert>
            </Snackbar>
            <Modal
                {...props} 
                size="sm" onShow={()=>{setDialogOpened(true)}}
                aria-labelledby="contained-modal-title-vcenter"
                centered >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Add Session
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }} >
                            <Grid container spacing={3} justifyContent='center'>

                                <Grid item xs={12} sm={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="session"
                                        label="Session"
                                        value={formData.session}
                                        onChange={handleChange}
                                        placeholder='20xx-20xx'
                                        name="session"
                                        autoComplete="session"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                    <Table responsive hover>
                                        <thead>
                                            <tr>
                                                <th>Sr.</th>
                                                <th>Session</th>
                                                <th>Delete</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                session.map((sess, i) => (
                                                    <tr key={sess._id}>
                                                        <td>{i + 1}</td>
                                                        <td>{sess.session}</td>
                                                        <td> <Tooltip title='Delete' placement="top">
                                                            <IconButton sx={{ '&:hover': { boxShadow: 4, color: 'red' } }} onClick={() => DeleteSession(sess._id)} aria-label="delete" size="small">
                                                                <DeleteIcon fontSize="small" />
                                                            </IconButton>
                                                        </Tooltip></td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </Table>
                                </Grid>

                            </Grid>
                        </Box>

                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Stack direction='horizontal' gap={3}>
                        <Buttons onClick={postSession} style={{ width: '10vh' }}>Save</Buttons>
                        <Buttons onClick={props.onHide} style={{ width: '10vh' }}>Close</Buttons>
                    </Stack>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default NewSessionDialog;