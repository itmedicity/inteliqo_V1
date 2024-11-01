import { axioslogin } from 'src/views/Axios/Axios';
import { Actiontypes } from '../constants/action.type'
const { FETCH_DEPARTMENT_LIST } = Actiontypes;

export const setDepartment = () => async (dispatch) => {
    const result = await axioslogin.get('/common/getdept');
    const { success, data } = result.data;
    if (success === 1) {
        dispatch({ type: FETCH_DEPARTMENT_LIST, payload: data, loadingStatus: true })
    }
    else {
        dispatch({ type: FETCH_DEPARTMENT_LIST, payload: [], loadingStatus: false })
    }
}


export const getAllDeptList = async () => {
    return await axioslogin.get('/common/getdept').then((res) => {
        const { success, data } = res.data
        if (success === 1) {
            return data
        } else return []
    })
}

