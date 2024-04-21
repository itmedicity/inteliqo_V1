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

export const getDepartmentShiftDetails = async (empData) => {
    const postData = {
        dept_id: empData?.deptID,
        sect_id: empData?.sectionID
    }
    const result = await axioslogin.post('/departmentshift/SectionShift', postData)
    const { success, data } = await result.data;
    if (success === 1) {
        const { shft_code } = data[0];
        const obj = JSON.parse(shft_code)
        //get shift timing
        const shiftSlno = await obj?.map(val => val.shiftcode)
        const shiftArray = await axioslogin.post('/departmentshift/getShiftTiming', shiftSlno);
        const { succ, result } = await shiftArray.data;
        if (succ === 1) {
            return { status: 1, deptShift: obj, shiftTime: result }
        } else {
            return { status: 0, deptShift: [], shiftTime: [] }
        }
    } else {
        return { status: 0, deptShift: [], shiftTime: [] }
    }
}