import { Link, NavLink, useNavigate } from "react-router-dom";
import '../css/Navbar.css'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Button, Col, NavDropdown, Row } from "react-bootstrap";
//const LocalData = JSON.parse(localStorage.getItem('user'));
const NavBar = () => {
    const userName = JSON.parse(localStorage.getItem('user'));
    //console.log(userName.userid);
    const navigate = useNavigate();
    const Logout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        navigate('/');
    }
    return (
        <>
            <Navbar expand="lg" collapseOnSelect className="nav-bar" bg="primary" data-bs-theme="dark">
                <Navbar.Brand style={{ marginLeft: 20 }} ><NavLink className="nav-bar-link" to="/">SMSDC</NavLink></Navbar.Brand>
                <Nav className="me-auto" >
                    {
                        userName && userName.userType === 'Admin' ? (
                            <>

                                <Nav.Link ><NavLink className="nav-bar-link" to="/contact">Contact</NavLink></Nav.Link>
                                <Nav.Link ><NavLink className="nav-bar-link" to="/student">Student</NavLink></Nav.Link>
                                <Nav.Link ><NavLink className="nav-bar-link" to="/userRegistration">Registration</NavLink></Nav.Link>
                                <Nav.Link ><NavLink className="nav-bar-link" to="/rss">RSS</NavLink></Nav.Link>
                                <Nav.Link ><NavLink className="nav-bar-link" to="/studentattendance">Attendance</NavLink></Nav.Link>

                            </>
                        ) : userName && userName.userType === 'Other' ? (
                            <>
                                <Nav.Link ><NavLink className="nav-bar-link" to="/contact">Contact</NavLink></Nav.Link>
                                <Nav.Link ><NavLink className="nav-bar-link" to="/student">Student</NavLink></Nav.Link>
                            </>
                        ) :
                            <>
                                <Nav.Link ><NavLink className="nav-bar-link" to="/login">Login</NavLink></Nav.Link>
                            </>
                    }
                </Nav>

                {
                    localStorage.getItem('user') ?
                        <Nav style={{ marginRight: 20 }}>
                            <NavDropdown title={userName && userName.userid}>
                                <NavDropdown.Item >Profile</NavDropdown.Item>
                                <NavDropdown.Item onClick={Logout}>Logout</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        : null
                }

            </Navbar>

        </>
    );
}

export default NavBar;