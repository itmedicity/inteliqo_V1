import { axioslogin } from 'src/views/Axios/Axios';
import { Actiontypes } from '../constants/action.type'
const { LOGIN_EMP_DEPTSECT } = Actiontypes;

export const setempDeptSect = (em_id) => async (dispatch) => {
    const result = await axioslogin.get(`/authorization/data/${em_id}`)
    const { success, data } = result.data
    if (success === 1) {
        dispatch({ type: LOGIN_EMP_DEPTSECT, payload: data, loadingStatus: true })
    } else {
        dispatch({ type: LOGIN_EMP_DEPTSECT, payload: data, loadingStatus: true })
    }
}