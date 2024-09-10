import { axioslogin } from "src/views/Axios/Axios"
import { Actiontypes } from "../constants/action.type";
const { FETCH_SKILLS } = Actiontypes;

/** to get education id,name from database */
export const setSkills = () => async (dispatch) => {
    const result = await axioslogin.get('/common/getSkillData');
    const { success, data } = result.data

    if (success === 1) {
        dispatch({ type: FETCH_SKILLS, payload: data, loadingStatus: true })
    }
    else {
        dispatch({ type: FETCH_SKILLS, payload: [], loadingStatus: false })
    }
}
