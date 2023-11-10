import { Link, NavLink, useNavigate } from "react-router-dom";
import '../css/Navbar.css'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Button, NavDropdown } from "react-bootstrap";
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
        <Navbar collapseOnSelect expand="lg" bg="primary" data-bs-theme="dark">
            <Navbar.Brand style={{ marginLeft: 20 }}><NavLink className="nav-bar-link" to="/">SMSDC</NavLink></Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav style={{ marginLeft: 20 }} className="me-auto" >
                    {
                        userName && userName.userType === 'Admin' ? (
                            <>

                                <Nav.Link ><NavLink className="nav-bar-link" to="/contact">Contact</NavLink></Nav.Link>
                                <NavDropdown title={"Student"} id="nav-dropdown" >
                                    <NavDropdown.Item onClick={() => navigate("/student")} >View Student</NavDropdown.Item>
                                    <NavDropdown.Item onClick={() => navigate("/poststudent")} >Add Student</NavDropdown.Item>
                                </NavDropdown>
                                {/* <Nav.Link ><NavLink className="nav-bar-link" to="/student">Student</NavLink></Nav.Link> */}
                                <Nav.Link ><NavLink className="nav-bar-link" to="/userRegistration">Registration</NavLink></Nav.Link>
                                <Nav.Link ><NavLink className="nav-bar-link" to="/rss">RSS</NavLink></Nav.Link>
                                <Nav.Link ><NavLink className="nav-bar-link" to="/studentattendance">Attendance</NavLink></Nav.Link>

                            </>
                        ) : userName && userName.userType === 'Other' ? (
                            <>
                                <Nav.Link ><NavLink className="nav-bar-link" to="/contact">Contact</NavLink></Nav.Link>
                                <Nav.Link ><NavLink className="nav-bar-link" to="/student">Student</NavLink></Nav.Link>
                            </>
                        ) : null
                        // <>
                        //     <Nav.Link ><NavLink className="nav-bar-link" to="/login">Login</NavLink></Nav.Link>
                        // </>
                    }
                </Nav>

                {
                    localStorage.getItem('user') ?
                        <Nav style={{ marginLeft: 20, marginRight: 20 }}>
                            <NavDropdown title={userName && userName.userid} id="collapsible-nav-dropdown">
                                <NavDropdown.Item >Profile</NavDropdown.Item>
                                <NavDropdown.Item onClick={Logout}>Logout</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        :
                        <>
                            <Nav.Link style={{ marginLeft: 20, marginRight: 20 }} ><NavLink className="nav-bar-link" to="/login">Login</NavLink></Nav.Link>
                        </>
                }

                {/* <Nav className="me-auto">
                <Nav.Link href="#features">Features</Nav.Link>
                <Nav.Link href="#pricing">Pricing</Nav.Link>
                <NavDropdown title="Dropdown" id="collapsible-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">
                    Separated link
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav> */}
                {/* <Nav>
                <Nav.Link href="#deets">More deets</Nav.Link>
                <Nav.Link eventKey={2} href="#memes">
                  Dank memes
                </Nav.Link>
              </Nav> */}
            </Navbar.Collapse>
        </Navbar>

    );
}

export default NavBar;