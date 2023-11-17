import logo from './logo.svg';
//import './App.css';
import Home from './components/Home'
import NavBar from './components/NavBar';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Student from './components/Student';
import Login from './components/Login';
import InsertStudent from './components/InsertStudent';
import Protected from './components/Protected';
import UserRegistration from './components/UserRegistration';
import UpdateStudent from './components/UpdateStudent';
import Rss from './components/Rss';
import StudentAttendance from './components/StudentAttendance';
import { useEffect, useState } from 'react';

function App() {

  return (
    <div>
      <Header/>
      <BrowserRouter>
      
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/about" element={<Home/>} />
        <Route path="/contact" element={<Protected Cmp = {Home}/>}/>
        <Route path="/student" element={<Protected Cmp = {Student}/>}></Route>
        <Route path="/studentattendance" element={<Protected Cmp = {StudentAttendance}/>}></Route>
        <Route path="/poststudent" element={<Protected Cmp = {InsertStudent}/>}></Route>
        <Route path="/updatestudent" element={<Protected Cmp = {UpdateStudent}/>}></Route>
        <Route path="/userRegistration" element={<UserRegistration/>}></Route>
        <Route path="/rss" element={<Protected Cmp = {Rss}/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
      </Routes>
      </BrowserRouter>
      <Footer/>
    </div>
  );
}

export default App;
