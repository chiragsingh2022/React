import axios from "axios";
import { master, StudentData, postUserData, FileAttachment, Attendance, Teacher } from "../utils/constants";
import Cookies from "js-cookie";

export class userServices {
    static postUser(data) {
        const token = Cookies.get('token');
        const httpOptions = {
            headers: {
                'Accept': 'application/json',
                'authorization': `Bearer ${token}`
            }
        };

        return axios.post(`${postUserData}`, data, httpOptions);
    };

    static postStudent(data) {
        const token = Cookies.get('token');
        const httpOptions = {
            headers: {
                'authorization': `Bearer ${token}`
            }
        };
        return axios.post(`${StudentData}`, data, httpOptions);
    };

    static patchStudent(_id, data) {
        const token = Cookies.get('token');
        const httpOptions = {
            headers: {
                'authorization': `Bearer ${token}`
            }
        };
        return axios.patch(`${StudentData}/${_id}`, data, httpOptions);
    };

    static deleteStudent(_id) {
        const token = Cookies.get('token');
        const httpOptions = {
            headers: {
                'authorization': `Bearer ${token}`
            }
        };
        return axios.delete(`${StudentData}/${_id}`, httpOptions);
    }

    static getStudentByClass(session,semester,course){
        const token =Cookies.get('token');
        const httpOptions = {
            headers: {
                'authorization' : `Bearer ${token}`
            }
        }
        console.log("Getting");
        return axios.get(`${StudentData}/filterByClass?session=${session}&semester=${semester}&course=${course}`, httpOptions);
    }

    static postAttachment(data) {
        const token = Cookies.get('token');
        const httpOptions = {
            headers: {
                'authorization': `Bearer ${token}`
            }
        };
        return axios.post(`${FileAttachment}`, data, httpOptions);
    };

    static patchAttachment(_id, data) {
        const token = Cookies.get('token');
        const httpOptions = {
            headers: {
                'authorization': `Bearer ${token}`
            }
        };
        return axios.patch(`${FileAttachment}/${_id}`, data, httpOptions);
    };
    static deleteAttachment(_id) {
        const token = Cookies.get('token');
        const httpOptions = {
            headers: {
                'authorization': `Bearer ${token}`
            }
        };
        return axios.delete(`${FileAttachment}/${_id}`, httpOptions);
    };

    static GetAllStudent() {
        const token = Cookies.get('token');
        const httpOptions = {
            headers: {
                'authorization': `Bearer ${token}`
            }
        };
        return axios.get(`${StudentData}`, httpOptions);
    }

    static postSession(data) {
        const token = Cookies.get('token');
        const httpOptions = {
            headers: {
                'authorization': `Bearer ${token}`
            }
        };
        return axios.post(`${master}session/`, data, httpOptions);
    }

    static getSession() {
        const token = Cookies.get('token');
        const httpOptions = {
            headers: {
                'authorization': `Bearer ${token}`
            }
        };
        return axios.get(`${master}session/`, httpOptions);
    }

    static deleteSession(_id) {
        const token = Cookies.get('token');
        const httpOptions = {
            headers: {
                'authorization': `Bearer ${token}`
            }
        };
        return axios.delete(`${master}session/${_id}`, httpOptions);
    }

    static postAttendance(data) {
        const token = Cookies.get('token');
        const httpOptions = {
            headers: {
                'authorization': `Bearer ${token}`
            }
        };
        return axios.post(`${Attendance}`, data, httpOptions);
    };

    static getAttendanceBySubject(subjectId,semester) {
        const token = Cookies.get('token');
        const httpOptions = {
            headers: {
                'authorization': `Bearer ${token}`
            }
        };
        return axios.get(`${Attendance}/${subjectId}/${semester}`, httpOptions);
    }

    static getSubject() {
        const token = Cookies.get('token');
        const httpOptions = {
            headers: {
                'authorization': `Bearer ${token}`
            }
        };
        return axios.get(`${master}subject/`, httpOptions);
    }

    static getTeacher() {
        const token = Cookies.get('token');
        const httpOptions = {
            headers: {
                'authorization': `Bearer ${token}`
            }
        };
        return axios.get(`${Teacher}`, httpOptions);
    }

    static postTeacher(data) {
        //console.log(data);
        const token = Cookies.get('token');
        const httpOptions = {
            headers: {
                'authorization': `Bearer ${token}`
            }
        };
        return axios.post(`${Teacher}`, data, httpOptions);
    };

    static patchTeacher(_id, data) {
        const token = Cookies.get('token');
        const httpOptions = {
            headers: {
                'authorization': `Bearer ${token}`
            }
        };
        return axios.patch(`${Teacher}${_id}`, data, httpOptions);
    };

    static deleteTeacher(_id) {
        //console.log(_id);
        const token = Cookies.get('token');
        const httpOptions = {
            headers: {
                'authorization': `Bearer ${token}`
            }
        };
        return axios.delete(`${Teacher}${_id}`, httpOptions);
    }

}