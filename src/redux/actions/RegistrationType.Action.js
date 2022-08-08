import { axioslogin } from 'src/views/Axios/Axios';
import { Actiontypes } from '../constants/action.type'
const { FETCH_EMP_REGISTRATION_TYPE } = Actiontypes;

export const setRegistrationType = () => async (dispatch) => {
    const result = await axioslogin.get('/RegistrationTypeReport/getRegType');
    const { success, data } = result.data;
    if (success === 1) {
        dispatch({ type: FETCH_EMP_REGISTRATION_TYPE, payload: data, loadingStatus: true })
    }
    else {
        dispatch({ type: FETCH_EMP_REGISTRATION_TYPE, payload: [], loadingStatus: false })
    }
}



