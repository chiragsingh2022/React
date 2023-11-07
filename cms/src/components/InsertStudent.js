import { useState } from "react";
import { Button } from "react-bootstrap";
import "../css/InputFields.css"
import NavBar from "./NavBar";
import api_URL from "../Helper"

const InsertStudent = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const [formData, setFormData] = useState({
        studentid: "",
        fname: "",
        mname: "",
        lname: "",
        dob: "",
        gender: "",
        phonenumber: "",
        email: "",
        address: "",
        city: "",
        state: "",
        createdby: user && user.userid,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };


    const PostStudent = async () => {

        try {
            var saved = await fetch(`${api_URL}/api/student/`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(formData)
            })
            if (saved.ok) {
                alert("Student Successfully Created")
            }
            else {
                alert("Something went wrong")
                console.log("Request was not successful. Status Code : " + saved.status)
            }
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <>
            <NavBar />

            <div style={{ margin: 50, height: "500px" }} className="w3-card-4">

                <div style={{ padding: 5 }} className="w3-container w3-green">
                    <h2 style={{ padding: 5, marginLeft: 10 }}>Add Student Details</h2>
                </div>

                <div style={{ padding: 10 }} className="w3-row-padding">
                    <div className="w3-half">
                        <input className="w3-input w3-round w3-border" type="text" placeholder="StudentID" value={formData.studentid} name="studentid" onChange={handleChange} />
                    </div>
                    <div className="w3-half">
                        <input className="w3-input w3-round w3-border" type="text" placeholder="First Name" value={formData.fname} name="fname" onChange={handleChange} />
                    </div>
                </div>
                <div style={{ padding: 10 }} className="w3-row-padding">
                    <div className="w3-half">
                        <input className="w3-input w3-round w3-border" type="text" placeholder="Middle Name" value={formData.mname} name="mname" onChange={handleChange} />
                    </div>
                    <div className="w3-half">
                        <input className="w3-input w3-round w3-border" type="text" placeholder="Last Name" value={formData.lname} name="lname" onChange={handleChange} />
                    </div>
                </div>
                <div style={{ padding: 10 }} className="w3-row-padding">
                    <div className="w3-half">
                        {/* <input className="w3-input w3-border" type="text" placeholder="Gender" value={formData.gender} name="gender" onChange={handleChange} /> */}
                        <select className="w3-select w3-round w3-border" placeholder="Gender" value={formData.gender} name="gender" onChange={handleChange}>
                            <option value="" disabled selected>Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div className="w3-half">
                        <input className="w3-input w3-round w3-border" type="date" placeholder="DOB" value={formData.dob} name="dob" onChange={handleChange} />
                    </div>
                </div>
                <div style={{ padding: 10 }} className="w3-row-padding">
                    <div className="w3-half">
                        <input className="w3-input w3-round w3-border" type="text" placeholder="Phone" value={formData.phonenumber} name="phonenumber" onChange={handleChange} />
                    </div>
                    <div className="w3-half">
                        <input className="w3-input w3-round w3-border" type="email" placeholder="Email" value={formData.email} name="email" onChange={handleChange} />
                    </div>
                </div>
                <div style={{ padding: 10 }} className="w3-row-padding">
                    <div className="w3-half">
                        <input className="w3-input w3-round w3-border" type="text" placeholder="Address" value={formData.address} name="address" onChange={handleChange} />
                    </div>
                    <div className="w3-half">
                        <input className="w3-input w3-round w3-border" type="text" placeholder="State" value={formData.state} name="state" onChange={handleChange} />
                    </div>
                </div>
                <div style={{ padding: 10 }} className="w3-row-padding">
                    <div className="w3-half">
                        <input className="w3-input w3-round w3-border" type="text" placeholder="City" value={formData.city} name="city" onChange={handleChange} />
                    </div>

                </div>
                <button style={{ marginRight: 18, marginTop: 20, float: "right", width: "10%" }} className="w3-btn w3-blue w3-round w3-hover" onClick={PostStudent}>Save</button>

            </div>

        </>
    );
}
export default InsertStudent;