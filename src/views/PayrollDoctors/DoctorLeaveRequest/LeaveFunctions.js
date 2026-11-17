import { axioslogin } from "src/views/Axios/Axios";

export const getDoctorLeaveData = async (lve_uniq_no) => {
    const result = await axioslogin.get(`/DoctorsProcess/getDoctorLeaveDetail/${lve_uniq_no}`);
    const { success, data } = await result.data;
    if (success === 1) {
        return data;
    } else {
        return []
    }
}