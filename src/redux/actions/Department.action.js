import { axioslogin } from 'src/views/Axios/Axios';
import { Actiontypes } from '../constants/action.type'

const { FETCH_DEPARTMENT_LIST } = Actiontypes;

export const setDepartment = () => async (dispatch) => {
    const result = await axioslogin.get('/common/getdept');
    const { data } = result.data;
    dispatch({ type: FETCH_DEPARTMENT_LIST, payload: data })
}



