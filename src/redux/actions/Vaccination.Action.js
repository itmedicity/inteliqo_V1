import { axioslogin } from 'src/views/Axios/Axios';
import { Actiontypes } from '../constants/action.type'
const { FETCH_EMP_VACCINATION_DETAILS } = Actiontypes;

export const setVaccination = (em_no) => async (dispatch) => {
// console.log("fdgh");
    /** to get institution type no, name from database */
    const result = await axioslogin.get(`/Vaccination/getVaccination/${em_no}`);

    const { success, data } = result.data;
    if (success === 1) {
        // console.log(data);
        dispatch({ type: FETCH_EMP_VACCINATION_DETAILS, payload: data, loadingStatus: true })
    } else {
        dispatch({ type: FETCH_EMP_VACCINATION_DETAILS, payload: [], loadingStatus: false })
    }
}
