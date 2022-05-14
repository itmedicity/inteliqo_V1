import { axioslogin } from 'src/views/Axios/Axios';
import { Actiontypes } from '../constants/action.type'
const { FETCH_PROFFESSIONAL_TAX } = Actiontypes;

export const setProTaxList = () => async (dispatch) => {
    const result = await axioslogin.get('/proftax/protax/list');
    const { success, data } = result.data;
    if (success === 1) {
        dispatch({ type: FETCH_PROFFESSIONAL_TAX, payload: data })
    }
}
