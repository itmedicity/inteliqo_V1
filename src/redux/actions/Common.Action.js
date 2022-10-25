import { axioslogin } from "src/views/Axios/Axios";
import { Actiontypes } from "../constants/action.type";

const { FETCH_COMMON_SETTING } = Actiontypes;

export const setCommonSetting = () => async (dispatch) => {
    const result = await axioslogin.get('/commonsettings');
    const { success, data } = result.data;
    if (success === 1) {
        dispatch({ type: FETCH_COMMON_SETTING, payload: data[0] })
    }
}