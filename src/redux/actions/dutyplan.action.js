import { axioslogin } from "src/views/Axios/Axios";
import { Actiontypes } from "../constants/action.type";
const { FETCH_DEPT_SHIFT_DATA } = Actiontypes

export const getdeptShift = (postData) => async (dispatch) => {
    const result = await axioslogin.post('/departmentshift/shift', postData)
    const { success, data } = await result.data;
    if (success === 1) {
        const { shft_code } = data[0]
        const obj = JSON.parse(shft_code)
        dispatch({ type: FETCH_DEPT_SHIFT_DATA, payload: obj })
    }
    if (success === 0) {
        dispatch({ type: FETCH_DEPT_SHIFT_DATA, payload: 0 })
    }
}
