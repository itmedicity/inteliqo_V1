import { axioslogin } from "../Axios/Axios";
import { API_URL, PUBLIC_NAS_FOLDER } from "./Static";

// export const API_URL = 'http://192.168.10.132:5000/api';

// export const API_URL = 'http://192.168.10.170:5000/api';

export const employeeNumber = () => {

    const userinfo = sessionStorage.getItem('userDetl');
    const employeNumber = userinfo ? JSON.parse(sessionStorage.getItem('userDetl')).empno : 0;
    return employeNumber;
};

export const getSerialnumberempid = async () => {
    const result = await axioslogin.get('/common/getSerialno')
    const { success } = result.data;
    if (success === 1) {
        const [serial_current] = result.data.data
        return serial_current.serial_current
    }
}

export const getSerialnumberempnumber = async () => {
    const result = await axioslogin.get('/common/getSerialnoempno')
    const { success } = result.data;
    const [serial_current] = result.data.data
    if (success === 1) {
        return serial_current.serial_current
    }
}

export const getProcessserialnum = async () => {
    const result = await axioslogin.get('/common/getprocess')
    const { success } = result.data;
    const [serial_current] = result.data.data
    if (success === 1) {
        return serial_current.serial_current
    }
}

export const SELECT_CMP_STYLE = {
    minHeight: 10, maxHeight: 27, paddingTop: 0, paddingBottom: 4
}

export const CARD_HEADER_COLOR = {
    backgroundColor: '#757575', color: "white"
}

export const CARD_SUB_HEADER_COLOR = {
    backgroundColor: '#a4a4a4'
}

export const TEXT_MUTED = "#c7c7c7"
export const TEXT_DARK = "#000000"

export const getFineSlno = async () => {
    const result = await axioslogin.get('/common/getFineSlno')
    const { success } = result.data;
    const [serial_current] = result.data.data
    if (success === 1) {
        return serial_current.serial_current
    }
}

export const getleaverequest = async () => {
    const result = await axioslogin.get('/common/getleaverequwestslno')
    const { success } = result.data;
    const [serial_current] = result.data.data
    if (success === 1) {

        return serial_current.serial_current
    }
}

// export const PUBLIC_NAS_FOLDER = "http://192.168.10.170/NAS/"


//GET ASSINED MENU LIST

export const getMenuSlno = async () => {
    const result = await axioslogin.get(`/common/getempid/${employeeNumber()}`)
    const { success, data } = result.data
    if (success === 1) {
        const { emp_id } = data[0]
        const results = await axioslogin.get(`/grprights/${emp_id}`)
        const { resdata } = results.data;
        return resdata;
    }
}

//URL EXSIT CHECK FUNCTION

export const urlExist = (url, callBack) => {
    const img = new Image();
    img.src = JSON.parse(url);

    if (img.complete) {
        callBack(true);
    } else {
        img.onload = () => {
            callBack(true);
        };

        img.onerror = () => {
            callBack(false);
        };
    }
}