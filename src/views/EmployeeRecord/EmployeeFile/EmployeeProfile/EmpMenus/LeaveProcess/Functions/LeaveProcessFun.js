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
        message: '', //Message
        categoryStatus: 0,// Category is not Equal ( 0 -> not equal 1 -> equal)
        processedStatus: true, // if '0' no need to process if '1' need to process and process button needs to enable
        leaveData: [], //Processed Leave data status and process data,
        newProcess: false, // if it is a new process or not , false --> not new processs, true 
        //new process -->  ( new process means no data in 'hrm_process_table' table or no Active data in 'hrm_process_table')
        dateExceed: false // //Next updation date is exceed the current date
    }

    const { em_category, ecat_cl, ecat_el, ecat_nh, ecat_fh, ecat_lop, ecat_sl, ecat_mate, ecat_confere } = category;
    const { lv_process_slno, category_slno, hrm_clv, hrm_ern_lv, hrm_hld, hrm_cmn,
        hrm_calcu, hrm_process_status, next_updatedate } = leaveProcess;

    const nextUpdateDate = moment(next_updatedate).isValid() ? moment(next_updatedate) : '0000-00-00';

    if (em_category !== category_slno) {
        return processedObj = {
            ...processedObj,
            categoryStatus: 0,
            message: 'Category Changed ! Do Process',
            processedStatus: false,
            newProcess: false,
            dateExceed: false
        }
    } else if (compareAsc(new Date(), new Date(nextUpdateDate)) === 1) { //Next updation date is exceed the current date
        return processedObj = {
            ...processedObj,
            categoryStatus: 1, // Category is not Equal
            message: 'Date Exceeded ! Do Process',
            processedStatus: false,
            newProcess: false,
            dateExceed: true
        }
    } else {
        const leaveData = [
            { name: 'Casual Leave', value: hrm_clv },
            { name: 'Earn Leave', value: hrm_ern_lv },
            { name: 'Holiday', value: hrm_hld },
            { name: 'Common', value: hrm_cmn },
            // { name: 'credited', value: hrm_calcu }
        ]
        return processedObj = {
            ...processedObj,
            categoryStatus: 1,
            leaveData: leaveData,
            message: 'Leave process completed',
            processedStatus: true,
            newProcess: false,
            dateExceed: false
        }
    }

}

// 1 -> Checking for the employee is in contract

export const checkContractStatus = async (contrctEndDate, contractStatus) => {
    if (contractStatus === 1) {
        if (moment(contrctEndDate).isValid()) {
            if (new Date(contrctEndDate) > new Date()) {
                return {
                    message: 'Contract Date Not Exceeded',
                    status: true
                }
            } else {
                return {
                    message: 'Employee Is under Contract But not Renewed || Closed',
                    status: false
                }
            }
        } else {
            return {
                message: 'Contract End Date Showing is a Invalid Date, Please Contract HRD',
                status: false
            }
        }
    } else {
        return {
            message: 'Employee not under contract',
            status: true
        }
    }
}


//for new employee primary data for inserting the the "hrm_emp_processs" table
export const newProcessedEmployeeData = async (category, processSlno) => {

}