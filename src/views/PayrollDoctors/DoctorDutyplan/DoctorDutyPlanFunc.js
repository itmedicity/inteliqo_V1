import { axioslogin } from "src/views/Axios/Axios";

//get employee details 
export const getDoctorList = async (postData) => {
    let dataObj = { status: 0, data: [] }
    const result = await axioslogin.post('/empmast/doctors/bysection', postData)
    const { success, data } = result.data
    if (success === 1) {
        return { ...dataObj, status: 1, data: data }
    } else {
        return { ...dataObj, status: 0, data: [] }
    }
}

export const getEmployeeRightsbasedDepartments = (em_id) => {


}