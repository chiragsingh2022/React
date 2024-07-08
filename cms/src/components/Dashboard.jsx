import React, { useEffect, useState } from "react";

import '../css/Dashboard.css';
import classes from '../Icons/flow-chart-256.png';
import teachers from '../Icons/conference-256.png';
import { userServices } from "../services/user-services";

const Dashboard = () => {

    const [studentCount, setStudentCount] = useState(0);
    const [teacherCount, setTeacherCount] = useState(0);

    const StudentCount = () => {
        userServices.GetAllStudent().then((res) => {
            const sCount = res.data.length;
            setStudentCount(sCount);
        }).catch((error) => {
            console.error(error);
        });
    }
    const TeacherCount = () => {
        userServices.getTeacher().then((res) => {
            const TCount = res.data.length;
            setTeacherCount(TCount);
        }).catch((error) => {
            console.error(error);
        });
    }
    useEffect(() => {
        StudentCount();
        TeacherCount();
    }, []);



    return (
        <>
            <div className="dashboard-container" >
                <header className="dashboard-header">
                    <h1>Dashboard</h1>
                    <p>Shree Malkhan Singh Mahavidhyalaya, Thulai Jahangirpur Hathras</p>
                    
                </header>

                <div className="content-grid">
                    <div className="card-button">
                        <img style={{ height: '120px' }} src={classes}></img>
                        <div className="card-button-class">
                            <h4>6</h4>
                            <p>Registered Classes</p>
                        </div>
                    </div>
                    <div className="card-button">
                        <img style={{ height: '120px' }} src={teachers}></img>
                        <div className="card-button-class">
                            <h4>{teacherCount}</h4>
                            <p>Registered Teachers</p>
                        </div>
                    </div>
                    <div className="card-button">
                        <div className="img-student"></div>
                        <div className="card-button-class">
                            <h4>{studentCount}</h4>
                            <p>Registered Students</p>
                        </div>
                    </div>
                    <div className="card-button">
                    <div className="img-student"></div>
                        <div className="card-button-class">
                            <h4>{studentCount}</h4>
                            <p>Registered Subjects</p>
                        </div>
                    </div>
                    <div className="card-button">

                    </div>
                    <div className="card-button">

                    </div>
                    <div className="card-button">
                    </div>
                    <div className="card-button">

                    </div>
                    <div className="card-button">

                    </div>


                </div>
            </div>
        </>
    );
}

export default Dashboard;