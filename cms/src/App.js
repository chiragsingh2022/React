import './App.css';
import Home from './components/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Student from './components/Student';
import Login from './components/Login';
import InsertStudent from './components/InsertStudent';
import Protected from './components/Protected';
import UserRegistration from './components/UserRegistration';
import UpdateStudent from './components/UpdateStudent';
import Rss from './components/Rss';
import StudentAttendance from './components/StudentAttendance';
import StaffPage from './components/StaffPage';
import Dashboard from './components/Dashboard';
import Settings from './components/Settings';
import { useEffect, useState } from 'react';
import Sidebar from './components/Sidebar';
import { FaHome, FaUser } from "react-icons/fa";
import { MdMessage } from "react-icons/md";
import { BiCog } from "react-icons/bi";
import Cookies from 'js-cookie';
import { FaChalkboardTeacher } from "react-icons/fa";
import { GrUserManager } from "react-icons/gr";
import { BsFillMortarboardFill } from "react-icons/bs";
import { HiUserAdd } from "react-icons/hi";
import { BiSolidUserDetail } from "react-icons/bi";
import StudentDetails from './components/StudentDetails';
import Teacher from './components/Teacher';

const routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: <FaHome />,
  },
  {
    path: "/userRegistration",
    name: "Users",
    icon: <FaUser />,
  },
  {
    path: "/messages",
    name: "Messages",
    icon: <MdMessage />,
  },
  {
    path: "/teacher",
    name: "Teacher",
    icon: <FaChalkboardTeacher />,
  },
  {
    path: "#",
    name: "Admission",
    icon: <BsFillMortarboardFill />,
    subRoutes: [
      {
        path: "/poststudent",
        name: "Add",
        icon: <HiUserAdd />,
      },
      {
        path: "/student",
        name: "Details",
        icon: <BiSolidUserDetail />,
      },

      // {
      //   path: "/updatestudent",
      //   name: "Update Student",
      //   icon: <FaUserEdit />,
      // },
    ]
  },


  {
    path: "#",
    name: "Attendance",
    icon: <BiCog />,
    exact: true,
    subRoutes: [
      {
        path: "/studentattendance",
        name: "Student ",
        icon: <FaUser />,
      },
      // {
      //   path: "/teacherattendance",
      //   name: "Teacher",
      //   icon: <FaLock />,
      // },

    ],
  },
  // {
  //   path: "/salary",
  //   name: "Salary",
  //   icon: <FaRupeeSign />,
  // },
  {
    path: "/rss",
    name: "RSS",
    icon: <GrUserManager />,
  },
];


function App() {

  const [isLoggedin, setLoggedIn] = useState(false);

  useEffect(() => {
    const user = Cookies.get('user');
    const token = Cookies.get('token');

    if (user && token) {
      setLoggedIn(true);
    }
  }, []);
  const handleLogin = () => {
    // Perform your login logic, and set the isLoggedIn state to true if login is successful
    setLoggedIn(true);
  };
  return (
    <>
      <BrowserRouter>
        {isLoggedin ? (<Sidebar routes={routes}>
          <Routes>
            <Route path="/" element={<Protected Cmp={Dashboard} />} />
            {/* <Route path="/home" element={<Home />} /> */}
            <Route path="/dashboard" element={<Protected Cmp={Dashboard} />} />
            <Route path="/staff" element={<Protected Cmp={StaffPage} />} />
            <Route path="/student" element={<Protected Cmp={Student} />}></Route>
            <Route path="/teacher" element={<Protected Cmp={Teacher} />}></Route>
            <Route path="student/studentdetails" element={<Protected Cmp={StudentDetails} />}></Route>
            <Route path="/studentattendance" element={<Protected Cmp={StudentAttendance} />}></Route>
            <Route path="/poststudent" element={<Protected Cmp={InsertStudent} />}></Route>
            <Route path="/updatestudent" element={<Protected Cmp={UpdateStudent} />}></Route>
            <Route path="/userRegistration" element={<Protected Cmp={UserRegistration} />}></Route>
            <Route path="/rss" element={<Protected Cmp={Rss} />}></Route>
            <Route path="/settings" element={<Protected Cmp={Settings} />}></Route>

          </Routes>
        </Sidebar>
        ) :
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />}></Route>
            {/* <Route path="*" element={<PageNotFound />}></Route> */}
          </Routes>
        }
      </BrowserRouter>
    </>
  );
}

export default App;
