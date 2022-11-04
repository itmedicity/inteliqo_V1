import { compareAsc } from "date-fns";
import moment from "moment";
import { axioslogin } from "src/views/Axios/Axios";

//Employee Category
export const getEmployeeCurrentCategoryInfom = async (em_id) => {
    return await axioslogin.get(`/common/getannprocess/${em_id}`)
}

//Employee Current Leave process Table
export const getEmployeeCurrentLeaveProcessInfom = async (em_id) => {
    return await axioslogin.post('/yearleaveprocess/', em_id)
}

//Processed Leave Based On category after checking
export const processedLeaveList = async (category, leaveProcess) => {

    /**
     * 1 -> Checking for category change
     * 2 -> Checking for next updated date 
     * 3 -> check all the leaves is process or not both condition will return the object
     */
    let processedObj = {
        message: '',
        category: 0,
        processedStatus: 0,
        leaveData: []
    }

    const { em_category, ecat_cl, ecat_el, ecat_nh, ecat_fh, ecat_lop, ecat_sl, ecat_mate, ecat_confere } = category;
    const { lv_process_slno, category_slno, hrm_clv, hrm_ern_lv, hrm_hld, hrm_cmn,
        hrm_calcu, hrm_process_status, next_updatedate } = leaveProcess;

    const nextUpdateDate = moment(next_updatedate).isValid() ? moment(next_updatedate) : '0000-00-00';

    if (em_category !== category_slno) {
        return processedObj = {
            categoryChek: 0, // Category is not Equal
            message: 'Employee Category Changed'
        }
    } else if (compareAsc(new Date(), new Date(next_updatedate)) === 1) {

    } else {
        const leaveData = [
            { name: 'Casual Leave', value: hrm_clv },
            { name: 'Earn Leave', value: hrm_ern_lv },
            { name: 'Holiday', value: hrm_hld },
            { name: 'Common', value: hrm_cmn },
            // { name: 'credited', value: hrm_calcu }
        ]
        return processedObj = { ...processedObj, leaveData: leaveData }
    }

} 