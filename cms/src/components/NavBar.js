import { NavLink, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import '../css/Navbar.css'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavDropdown } from "react-bootstrap";
import AddUserDialog from "../Dialogs/AddUserDialog";
import Cookies from "js-cookie";
import { FaHome } from "react-icons/fa";

const NavBar = () => {
    const [modalShow, setModalShow] = React.useState(false);
    const userData = (Cookies.get('user'));
    let userName = null;

    if (userData) {
        try {
            userName = JSON.parse(userData);
        } catch (error) {
            console.error('Error parsing user data:', error);
            // Handle the error as needed (e.g., set userName to a default value)
        }
    }

    // console.log(JSON.parse(userName));
    const navigate = useNavigate();
    const logout = () => {
        localStorage.clear();
        Cookies.remove('user');
        Cookies.remove('token');
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


            <Navbar className="navbar-class" collapseOnSelect expand="lg" bg="primary" data-bs-theme="dark">
                {userData ? (
                    <Navbar.Brand style={{ marginLeft: 20 }}><NavLink className="nav-bar-link" to="/dashboard"><i>Shre Malkhan Singh Degree College</i></NavLink></Navbar.Brand>
                ) : <Navbar.Brand style={{ marginLeft: 20 }}><NavLink className="nav-bar-link" to="/"><FaHome /></NavLink></Navbar.Brand>
                }
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav style={{ marginLeft: 20 }} className="me-auto" >
                        {
                            userName && userName.canviewstudent && (
                                <>
                                    <Nav.Link ><NavLink className="nav-bar-link" to="/student">Student</NavLink></Nav.Link>
                                    {/* <Nav.Link ><NavLink className="nav-bar-link" to="/studentattendance">Attendance</NavLink></Nav.Link> */}
                                </>
                            )}

                        {userName && userName.canviewregistration && (
                            <>
                                <NavDropdown title={"User"} id="nav-dropdown" >
                                    <NavDropdown.Item onClick={() => navigate("/userRegistration")} >View User</NavDropdown.Item>
                                    <NavDropdown.Item onClick={() => setModalShow(true)} >Add User</NavDropdown.Item>
                                </NavDropdown>
                            </>
                        )}

                        {userName && userName.canviewrss && (
                            <>
                                <Nav.Link><NavLink className="nav-bar-link" to="/rss">RSS</NavLink></Nav.Link>
                            </>
                        )}
                        {userName && userName.canviewsettings && (
                            <>
                                <Nav.Link ><NavLink className="nav-bar-link" to="/settings">Settings</NavLink></Nav.Link>
                            </>
                        )}
                        {userName && userName.canviewstaff && (
                            <>
                                <Nav.Link ><NavLink className="nav-bar-link" to="/staff">Staff</NavLink></Nav.Link>
                            </>
                        )}

                    </Nav>

                    {
                        Cookies.get('user') ?
                            <Nav style={{ marginLeft: 20, marginRight: 20 }}>
                                <NavDropdown title={userName && `${userName.fname} ${userName.lname}`} id="collapsible-nav-dropdown">
                                    <NavDropdown.Item >Profile</NavDropdown.Item>
                                    <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                            :
                            <>
                                <Nav.Link style={{ marginLeft: 20, marginRight: 20 }} ><NavLink className="nav-bar-link" to="/login">ERP Login</NavLink></Nav.Link>
                            </>
                    }

                </Navbar.Collapse>
            </Navbar>
        </>
    );
}

export default NavBar;