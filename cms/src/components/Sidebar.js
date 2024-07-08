import React, { useEffect, useState } from "react";
import { FaBars, FaHome, FaLock, FaMoneyBill, FaUser } from "react-icons/fa";
import '../css/Sidebar.css';
import { motion, AnimatePresence } from 'framer-motion';
import { NavLink } from "react-router-dom";
import SidebarMenu from "./Sidebar/SidebarMenu";
import { HiOutlineLogout } from "react-icons/hi";
import Cookies from "js-cookie";
import { Tooltip } from "@mui/material";



const Sidebar = ({children, routes }) => {

    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const toggle = () => setIsSidebarOpen(!isSidebarOpen);
   
    const user = Cookies.get('user');
    let userName = "";
    if(user) {
        userName = JSON.parse(user);
    }
    
    const updateWindowWidth = () => {
        setIsSidebarOpen(window.innerWidth >= 768);
    };

    useEffect(() => {
        // Set the initial state based on window width
        updateWindowWidth();

        // Add event listener for window resize
        window.addEventListener("resize", updateWindowWidth);

        // Clean up the event listener when the component is unmounted to prevent memory leaks
        return () => {
            window.removeEventListener("resize", updateWindowWidth);
        };
    }, []);

    const logout_click = () => {
        localStorage.clear();
        Cookies.remove('user');
        Cookies.remove('token');
        //to clear the cookie immediate from browser
        window.location.href = '/';
        //navigate('/');
    }

    const inputAnimation = {
        hidden: {
            width: 0,
            padding: 0,
            transition: {
                duration: 0.2,
            },
        },
        show: {
            width: "140px",
            padding: "5px 15px",
            transition: {
                duration: 0.2,
            },
        },
    };

    const showAnimation = {
        hidden: {
            width: 0,
            opacity: 0,
            transition: {
                duration: 0.5,
            },
        },
        show: {
            opacity: 1,
            width: "auto",
            transition: {
                duration: 0.5,
            },
        },
    };

    return (
        <>
           <div className="main-container">
              
                <div>
                    <motion.div
                        animate={{
                            width: isSidebarOpen ? "260px" : "50px",

                            transition: {
                                duration: 0.5,
                                type: "spring",
                                damping: 10,
                            },
                        }}
                        className={`sidebar `}
                    >

                        <header className="sidebar-header">
                            <div className="bars">
                                <FaBars onClick={toggle} />
                            </div>
                            <AnimatePresence>
                                {isSidebarOpen && (
                                    <motion.h1
                                        variants={showAnimation}
                                        initial="hidden"
                                        animate="show"
                                        exit="hidden"
                                        className="logo-name"
                                    >
                                        SMSDC
                                    </motion.h1>
                                )}
                            </AnimatePresence>
                        </header>
                       
                        <section className="sidebar-routes">
                            {routes.map((route, index) => {
                                if (route.subRoutes) {
                                    return (
                                        <SidebarMenu
                                            setIsOpen={setIsSidebarOpen}
                                            route={route}
                                            showAnimation={showAnimation}
                                            isOpen={isSidebarOpen}
                                        />
                                    );
                                }

                                return (
                                    <NavLink
                                        to={route.path}
                                        key={index}
                                        className="link"
                                        activeClassName="active"
                                    >
                                        <div className="icon">{route.icon}</div>
                                        <AnimatePresence>
                                            {isSidebarOpen && (
                                                <motion.div
                                                    variants={showAnimation}
                                                    initial="hidden"
                                                    animate="show"
                                                    exit="hidden"
                                                    className="link_text"
                                                >
                                                    {route.name}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </NavLink>
                                );
                            })}
                        </section>
                        <footer className="sidebar-footer">
                            <Tooltip title="Logout"><button onClick={logout_click} className="logout-button"><HiOutlineLogout/></button></Tooltip>
                            {isSidebarOpen && (
                                <motion.p>
                                    {userName.fname} {userName.lname}
                                </motion.p>
                            )}
                        </footer>
                    </motion.div>
                </div>
                <main className="sidebar-children">{children}</main>
            </div>
        </>
    );
}

export default Sidebar;
