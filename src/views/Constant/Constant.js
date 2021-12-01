import { axioslogin } from "../Axios/Axios";

export const API_URL = 'http://192.168.10.170:5000/api';
// export const API_URL = 'http://localhost:5000/api';

export const employeeNumber = () => {

    const userinfo = sessionStorage.getItem('userDetl');
    const employeNumber = userinfo ? JSON.parse(sessionStorage.getItem('userDetl')).empno : 0;
    return employeNumber;
};

export const getSerialnumberempid = async () => {
    const result = await axioslogin.get('/common/getSerialno')
    const { success } = result.data;
    const [serial_current] = result.data.data
    if (success === 1) {
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
