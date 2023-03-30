import { getCreditedCasualLeave, getCreditedEarnLeave, getCreitedCommonLeave, getCreitedCompansatoryOffLeave, getCreitedHolidayLeave } from "src/redux/actions/LeaveReqst.action";
import { getannualleave } from "src/redux/actions/Profile.action";

export const fetchleaveInformationFun = async (dispatch, em_id) => {
    const data = { em_id: em_id }
    dispatch(getCreditedCasualLeave(em_id));
    dispatch(getCreitedCommonLeave(data));
    dispatch(getCreitedHolidayLeave(em_id));
    dispatch(getCreitedCompansatoryOffLeave(em_id));
    dispatch(getCreditedEarnLeave(em_id));
    dispatch(getannualleave(em_id))
}