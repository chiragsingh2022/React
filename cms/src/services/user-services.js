import axios from "axios";
import { postStudentData, postUserData } from "../utils/constants";

export class userServices {
    static postUser(data) {
        const token = localStorage.getItem('token');
        const httpOptions = {
            headers: {
                'Accept': 'application/json',
                //'Content-Type': 'application/json',
                //'Content-Type': 'multipart/form-data',
                'authorization': `Bearer ${token}`
            }
        };

        return axios.post(`${postUserData}`, data, httpOptions);
    };

    static postStudent(data) {
        const token = localStorage.getItem('token');
        const httpOptions = {
            headers: {
                'authorization': `Bearer ${token}`
            }
        };
        return axios.post(`${postStudentData}`, data, httpOptions);
    };
}