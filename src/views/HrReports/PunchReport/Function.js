import { axioslogin } from "src/views/Axios/Axios";

export const employeePunch = async (postdata) => {
    let dataObj = { status: 0, punchdata: [] }
    const result = await axioslogin.post("/payrollprocess/punchbiId", postdata);
    const { success, data } = result.data
    if (success === 1) {
        return { ...dataObj, status: 1, punchdata: data }
    } else {
        return { ...dataObj, status: 0, punchdata: [] }
    }
}