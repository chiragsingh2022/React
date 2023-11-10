import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import api_URL from "../Helper";
import { Table } from "react-bootstrap";
import Grid from '@mui/material/Grid';

const Rss = () =>{

const token = localStorage.getItem('token');
    const [rss, setRss] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        if (!token) {
            navigate('/login');
        }
        else {
            FetchDataList();
        }
    }, []);

    const FetchDataList = async () => {
        await fetch(`${api_URL}/api/rss`, {
            method: 'GET',
            headers: {
                'authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }).then((result) => {
            result.json().then((res) => {
                if (Array.isArray(res)) {
                    res.sort((a, b) => a.voterno - b.voterno);
                    setRss(res);
                }
                else {
                    localStorage.clear();
                    navigate(res.result);
                }
            });
        });
    }

    return(
        <>
        <NavBar />

        <div style={{ margin: "10px 10px 100px 10px", minHeight:"100vh"}}>
            <Table hover>
                <thead>
                    <tr>
                        <th>Sr. No.</th>
                        <th>Voter No.</th>
                        <th>Village No.</th>
                        <th>Voter's Name</th>
                        <th>Father's Name</th>
                        <th>Category</th>
                        <th>Address</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        rss.map((item, i) => (

                            <tr key={i}>
                                <td>{i + 1}</td>
                                <td>{item.voterno}</td>
                                <td>{item.villageno}</td>
                                <td>{item.votersname}</td>
                                <td>{item.fathersname}</td>
                                <td>{item.category}</td>
                                <td>{item.address}</td>
                                
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        </div>
    </>
        );
}
export default Rss;