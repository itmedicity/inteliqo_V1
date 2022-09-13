import { axioslogin } from 'src/views/Axios/Axios';
import { Actiontypes } from '../constants/action.type'

const { FETCH_EMP_USERRIGHTS } = Actiontypes;

export const setEmpUserRights = () => async (dispatch) => {
    const result = await axioslogin.get('/performanceappriasalrights/userrights');
    const { success, data } = result.data;
    if (success === 1) {
        dispatch({ type: FETCH_EMP_USERRIGHTS, payload: data, loadingStatus: true })
    }
    else {
        dispatch({ type: FETCH_EMP_USERRIGHTS, payload: [], loadingStatus: false })
    }
}