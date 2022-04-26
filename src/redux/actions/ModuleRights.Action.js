import { axioslogin } from 'src/views/Axios/Axios';
import { Actiontypes } from '../constants/action.type'
const { GET_MODULE_RIGHTS } = Actiontypes;

export const setModuleRightsList = (emp_id) => async (dispatch) => {
    const results = await axioslogin.get(`/grprights/${emp_id}`)
    const { status, resdata } = results.data;
    if (status === 1) {
        dispatch({ type: GET_MODULE_RIGHTS, payload: resdata[0] })
    }
}
