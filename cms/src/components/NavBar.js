import { Link, NavLink, useNavigate } from "react-router-dom";
import React from "react";
import '../css/Navbar.css'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Button, NavDropdown } from "react-bootstrap";
import { useEffect, useState } from "react";
import Cookies from "../Cookies";
import AddUserDialog from "../Dialogs/AddUserDialog";
import AddStudentDialog from "../Dialogs/AddStudentDialog";
import api_URL from "../Helper";


const NavBar = () => {
    const [modalShow, setModalShow] = React.useState(false);
    const [addStudentModel, setAddStudentModel] = React.useState(false);
    const userName = JSON.parse(localStorage.getItem('user'));
    //console.log(userName.userid);
    const navigate = useNavigate();
    const Logout = () => {
        localStorage.clear();
        Cookies.clear();
        //to clear the cookie immediate from browser
        window.location.href = '/';
        //navigate('/');
    }

// return (
//     <>
//         <Navbar expand="lg" collapseOnSelect className="nav-bar" bg="primary" data-bs-theme="dark">
//             <Navbar.Brand style={{ marginLeft: 20 }} ><NavLink className="nav-bar-link" to="/">SMSDC</NavLink></Navbar.Brand>
// <Nav className="me-auto" >
//     {
//         userName && userName.userType === 'Admin' ? (
//             <>

//                 <Nav.Link ><NavLink className="nav-bar-link" to="/contact">Contact</NavLink></Nav.Link>
//                 <Nav.Link ><NavLink className="nav-bar-link" to="/student">Student</NavLink></Nav.Link>
//                 <Nav.Link ><NavLink className="nav-bar-link" to="/userRegistration">Registration</NavLink></Nav.Link>
//                 <Nav.Link ><NavLink className="nav-bar-link" to="/rss">RSS</NavLink></Nav.Link>
//                 <Nav.Link ><NavLink className="nav-bar-link" to="/studentattendance">Attendance</NavLink></Nav.Link>

//             </>
//         ) : userName && userName.userType === 'Other' ? (
//             <>
//                 <Nav.Link ><NavLink className="nav-bar-link" to="/contact">Contact</NavLink></Nav.Link>
//                 <Nav.Link ><NavLink className="nav-bar-link" to="/student">Student</NavLink></Nav.Link>
//             </>
//         ) :
//             <>
//                 <Nav.Link ><NavLink className="nav-bar-link" to="/login">Login</NavLink></Nav.Link>
//             </>
//     }
// </Nav>

// {
//     localStorage.getItem('user') ?
//         <Nav style={{ marginRight: 20 }}>
//             <NavDropdown title={userName && userName.userid}>
//                 <NavDropdown.Item >Profile</NavDropdown.Item>
//                 <NavDropdown.Item onClick={Logout}>Logout</NavDropdown.Item>
//             </NavDropdown>
//         </Nav>
//         : null
// }

//         </Navbar>

//     </>
// );

return (
    <>
        <AddUserDialog show={modalShow} onHide={() => setModalShow(false)} />
        <AddStudentDialog show={addStudentModel} onHide={() => setAddStudentModel(false)} />

        <Navbar collapseOnSelect expand="lg" bg="primary" data-bs-theme="dark">
            <Navbar.Brand style={{ marginLeft: 20 }}><NavLink className="nav-bar-link" to="/">SMSDC</NavLink></Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav style={{ marginLeft: 20 }} className="me-auto" >
                    {
                        userName && userName.canviewstudent ? (
                            <>

                                <Nav.Link ><NavLink className="nav-bar-link" to="/contact">Contact</NavLink></Nav.Link>
                                <NavDropdown title={"Student"} id="nav-dropdown" >
                                    <NavDropdown.Item onClick={() => navigate("/student")} >View Student</NavDropdown.Item>
                                    <NavDropdown.Item onClick={() => setAddStudentModel(true)} >Add Student</NavDropdown.Item>
                                </NavDropdown>
                               
                                <NavDropdown title={"Registration"} id="nav-dropdown" >
                                    <NavDropdown.Item onClick={() => navigate("/userRegistration")} >View User</NavDropdown.Item>
                                    <NavDropdown.Item onClick={() => setModalShow(true)} >Add User</NavDropdown.Item>
                                </NavDropdown>
                                
                                <Nav.Link ><NavLink className="nav-bar-link" to="/rss">RSS</NavLink></Nav.Link>
                                <Nav.Link ><NavLink className="nav-bar-link" to="/studentattendance">Attendance</NavLink></Nav.Link>

                            </>
                        ) : userName && userName.userType === 'Other' ? (
                            <>
                                <Nav.Link ><NavLink className="nav-bar-link" to="/contact">Contact</NavLink></Nav.Link>
                                <Nav.Link ><NavLink className="nav-bar-link" to="/student">Student</NavLink></Nav.Link>
                            </>
                        ) : null
                       
                    }
                </Nav>

                {
                    localStorage.getItem('user') ?
                        <Nav style={{ marginLeft: 20, marginRight: 20 }}>
                            <NavDropdown title={userName && `${userName.fname} ${userName.lname}`} id="collapsible-nav-dropdown">
                                <NavDropdown.Item >Profile</NavDropdown.Item>
                                <NavDropdown.Item onClick={Logout}>Logout</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        :
                        <>
                            <Nav.Link style={{ marginLeft: 20, marginRight: 20 }} ><NavLink className="nav-bar-link" to="/login">Login</NavLink></Nav.Link>
                        </>
                }

            </Navbar.Collapse>
        </Navbar>
    </>
);
}

export default NavBar;