// import { useEffect, useState } from "react";
// import NavBar from "./NavBar";
// import { useLocation, useNavigate, useParams } from "react-router-dom";
// import api_URL from "../Helper";


// const UpdateStudent = () => {
//     // const useparams = useParams();
//     // const { item } = useparams;
//     const location = useLocation();
//     const { studentData } = location.state;
//     const navigate = useNavigate();

//     useEffect(() => {
//         // Here you can access and work with the studentData object
//         studentData.dob = studentData.dob ? new Date(studentData.dob).toISOString().split('T')[0] : ''
//         setFormData(studentData);
//     }, [studentData]);

//     const [formData, setFormData] = useState({
//         studentid: "",
//         fname: "",
//         mname: "",
//         lname: "",
//         dob: "",
//         gender: "",
//         phonenumber: "",
//         email: "",
//         address: "",
//         city: "",
//         state: "",
//     });

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({ ...formData, [name]: value });
//     };

//     const PatchStudent = async () => {
//         try {
//            const response = await fetch(`${api_URL}/api/student/${studentData._id}`, {
//                 method: 'PATCH',
//                 headers: {
//                     'Accept': 'application/json',
//                     'Content-Type': 'application/json',
//                     'authorization': `Bearer ${localStorage.getItem('token')}`
//                 },
//                 body: JSON.stringify(formData)
//             });
//             if (response.ok) {
//                 // Request was successful (status code 200-299)
//                 alert("Record Updated Successfully!");
//                 navigate("/student");
//             } else {
//                 // Request was not successful, handle the error
//                 alert("Something went wrong.");
//             }
//         }
//         catch (e) {
//             alert("Network error: " + e.message);
//         }
//     }

//     return (
//         <>
//             <NavBar />

//             <div style={{ margin: 50, height: "500px" }} className="w3-card-4">

//                 <div style={{ padding: 5 }} className="w3-container w3-green">
//                     <h2 style={{ padding: 5, marginLeft: 10 }}>Update Student Details</h2>
//                 </div>

//                 <div style={{ padding: 10 }} className="w3-row-padding">
//                     <div className="w3-half">
//                         <input className="w3-input w3-round w3-border" type="text" placeholder="StudentID" value={formData.studentid} name="studentid" onChange={handleChange} required />
//                     </div>
//                     <div className="w3-half">
//                         <input className="w3-input w3-round w3-border" type="text" placeholder="First Name" value={formData.fname} name="fname" onChange={handleChange} />
//                     </div>
//                 </div>
//                 <div style={{ padding: 10 }} className="w3-row-padding">
//                     <div className="w3-half">
//                         <input className="w3-input w3-round w3-border" type="text" placeholder="Middle Name" value={formData.mname} name="mname" onChange={handleChange} />
//                     </div>
//                     <div className="w3-half">
//                         <input className="w3-input w3-round w3-border" type="text" placeholder="Last Name" value={formData.lname} name="lname" onChange={handleChange} />
//                     </div>
//                 </div>
//                 <div style={{ padding: 10 }} className="w3-row-padding">
//                     <div className="w3-half">
//                         <select className="w3-select w3-round w3-border" placeholder="Gender" value={formData.gender} name="gender" onChange={handleChange}>
//                             <option value="" disabled selected>Gender</option>
//                             <option value="Male">Male</option>
//                             <option value="Female">Female</option>
//                             <option value="Other">Other</option>
//                         </select>
//                     </div>
//                     <div className="w3-half">
//                         <input className="w3-input w3-round w3-border" type="date" placeholder="DOB" value={formData.dob} name="dob" onChange={handleChange} />
//                     </div>
//                 </div>
//                 <div style={{ padding: 10 }} className="w3-row-padding">
//                     <div className="w3-half">
//                         <input className="w3-input w3-round w3-border" type="text" placeholder="Phone" value={formData.phonenumber} name="phonenumber" onChange={handleChange} />
//                     </div>
//                     <div className="w3-half">
//                         <input className="w3-input w3-round w3-border" type="email" placeholder="Email" value={formData.email} name="email" onChange={handleChange} />
//                     </div>
//                 </div>
//                 <div style={{ padding: 10 }} className="w3-row-padding">
//                     <div className="w3-half">
//                         <input className="w3-input w3-round w3-border" type="text" placeholder="Address" value={formData.address} name="address" onChange={handleChange} />
//                     </div>
//                     <div className="w3-half">
//                         <input className="w3-input w3-round w3-border" type="text" placeholder="State" value={formData.state} name="state" onChange={handleChange} />
//                     </div>
//                 </div>
//                 <div style={{ padding: 10 }} className="w3-row-padding">
//                     <div className="w3-half">
//                         <input className="w3-input w3-round w3-border" type="text" placeholder="City" value={formData.city} name="city" onChange={handleChange} />
//                     </div>

//                 </div>
//                 <button style={{ marginRight: 18, marginTop: 20, float: "right", width: "10%" }} className="w3-btn w3-blue w3-round w3-hover" onClick={PatchStudent}>Update</button>

//             </div>

//         </>
//     );
// }

// export default UpdateStudent;