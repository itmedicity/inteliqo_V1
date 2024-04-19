import { getCreditedCasualLeave, getCreditedEarnLeave, getCreitedCommonLeave, getCreitedCompansatoryOffLeave, getCreitedHolidayLeave } from "src/redux/actions/LeaveReqst.action";
import { getannualleave } from "src/redux/actions/Profile.action";
import { axioslogin } from "src/views/Axios/Axios";

export const fetchleaveInformationFun = async (dispatch, em_id) => {
    const data = { em_id: em_id }
    dispatch(getCreditedCasualLeave(em_id));
    dispatch(getCreitedCommonLeave(data));
    dispatch(getCreitedHolidayLeave(em_id));
    dispatch(getCreitedCompansatoryOffLeave(em_id));
    dispatch(getCreditedEarnLeave(em_id));
    dispatch(getannualleave(em_id))
}


export const getDepartmentSectionBasedHod = async (em_id) => {
    const result = await axioslogin.get(`/common/getAutharisedDepartmentSection/${em_id}`);
    const { su, data } = await result.data;
    if (su === 1) {
        return data;
    } else {
        return []
    }
}


export const getEmployeeArraySectionArray = async (filterSectionId) => {
    const getEmpBySection = await axioslogin.post(`/common/getEmployeeArraySectionArray/`, filterSectionId);
    const { success, data } = getEmpBySection.data;
    if (success === 1) {
        return data;
    } else {
        return []
    }
}