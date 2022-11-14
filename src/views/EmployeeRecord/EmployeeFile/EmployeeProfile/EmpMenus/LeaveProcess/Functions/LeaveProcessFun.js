import { compareAsc, getYear, lastDayOfYear, startOfYear } from 'date-fns'
import moment from 'moment'
import { axioslogin } from 'src/views/Axios/Axios'
import { employeeNumber } from 'src/views/Constant/Constant'

//Employee Category from employee mAster
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
    categoryStatus: 0, // Category is not Equal ( 0 -> not equal 1 -> equal)
    processedStatus: true, // if '0' no need to process if '1' need to process and process button needs to enable
    leaveData: [], //Processed Leave data status and process data,
    newProcess: false, // if it is a new process or not , false --> not new processs, true
    //new process -->  ( new process means no data in 'hrm_process_table' table or no Active data in 'hrm_process_table')
    dateExceed: false, // //Next updation date is exceed the current date
  }

  const {
    em_category,
    ecat_cl,
    ecat_el,
    ecat_nh,
    ecat_fh,
    ecat_lop,
    ecat_sl,
    ecat_mate,
    ecat_confere,
  } = category
  const {
    lv_process_slno,
    category_slno,
    hrm_clv,
    hrm_ern_lv,
    hrm_hld,
    hrm_cmn,
    hrm_calcu,
    hrm_process_status,
    next_updatedate,
  } = leaveProcess

  const nextUpdateDate = moment(next_updatedate).isValid() ? moment(next_updatedate) : '0000-00-00'

  if (em_category !== category_slno) {
    return (processedObj = {
      ...processedObj,
      categoryStatus: 0,
      message: 'Category Changed ! Do Process',
      processedStatus: false,
      newProcess: false,
      dateExceed: false,
    })
  } else if (compareAsc(new Date(), new Date(nextUpdateDate)) === 1) {
    //Next updation date is exceed the current date
    return (processedObj = {
      ...processedObj,
      categoryStatus: 1, // Category is not Equal
      message: 'Date Exceeded ! Do Process',
      processedStatus: false,
      newProcess: false,
      dateExceed: true,
    })
  } else {
    // get the current Active leave process table data

    const leaveData = [
      { name: 'Casual Leave', value: hrm_clv },
      { name: 'Earn Leave', value: hrm_ern_lv },
      { name: 'Holiday', value: hrm_hld },
      { name: 'Common', value: hrm_cmn },
      // { name: 'credited', value: hrm_calcu }
    ]
    return (processedObj = {
      ...processedObj,
      categoryStatus: 1,
      leaveData: leaveData,
      message: 'Leave process completed',
      processedStatus: true,
      newProcess: false,
      dateExceed: false,
    })
  }
}

// 1 -> Checking for the employee is in contract

export const checkContractStatus = async (
  em_cont_start,
  em_cont_end,
  contract_status,
  em_doj,
  em_prob_end_date,
  des_type,
  emp_type,
) => {
  /***
   * designation type ->Probation ->1,training->2,Confirmation -> 3 (des_type)
   * employee type -> Regular -> 1, contract -> 2 (emp_type)
   */

  const contrctEndDate = moment(em_cont_end).isValid() ? moment(em_cont_end):  0;
  const contractStartDate = moment(em_cont_start).isValid() ? moment(em_cont_start):  0;
  const dateOfJoin = moment(em_doj).isValid() ? moment(em_doj):  0;
  const probationEndDate = moment(em_prob_end_date).isValid() ? moment(em_prob_end_date):  0;

  if (contract_status === 1) {
    if (moment(contrctEndDate).isValid()) {
      if (new Date(contrctEndDate) > new Date()) {
        return {
          message: 'Contract Date Not Exceeded',
          status: true,
        }
      } else {
        return {
          message: 'Employee Is under Contract But not Renewed',
          status: false,
        }
      }
    } else {
      return {
        message: 'Contract End Date Showing is a Invalid Date, Please Contract HRD',
        status: false,
      }
    }
  } else {
    return {
      message: 'Employee is in permanent Category',
      status: true,
    }
  }
}

//for new employee primary data for inserting the the "hrm_emp_processs" table
export const newProcessedEmployeeData = async (category, processSlno, employeeIDs) => {
  const {
    ecat_cl,
    ecat_el,
    ecat_nh,
    ecat_fh,
    ecat_esi_allow,
    ecat_lop,
    ecat_mate,
    ecat_sl,
    ecat_cont,
    em_contract_end_date,
    ecat_prob,
    em_prob_end_date,
  } = category

  return {
    lv_process_slno: processSlno,
    em_no: employeeIDs.em_id,
    category_slno: category.em_category,
    process_user: employeeNumber(),
    em_id: employeeIDs.em_no,
    hrm_clv: ecat_cl === 1 ? 0 : 2,
    hrm_ern_lv: ecat_el === 1 ? 0 : 2,
    hrm_hld: ecat_nh === 1 || ecat_fh === 1 ? 0 : 2,
    hrm_cmn:
      ecat_esi_allow === 1 || ecat_el === 1 || ecat_lop === 1 || ecat_mate === 1 || ecat_sl === 1
        ? 0
        : 2,
    hrm_calcu: 0,
    hrm_process_status: 'A',
    next_updatedate:
      ecat_cont === 1
        ? em_contract_end_date
        : ecat_prob === 1
        ? em_prob_end_date
        : moment(lastDayOfYear(new Date())).format('YYYY-MM-DD'),
  }
}

//function for new object for "hrm_emp_processs" table for category change

export const categoryChangedNewObject = async (
  category,
  leaveProcess,
  processSlno,
  employeeIDs,
) => {
  const {
    ecat_cl,
    ecat_cont,
    ecat_el,
    ecat_esi_allow,
    ecat_fh,
    ecat_lop,
    ecat_mate,
    ecat_nh,
    ecat_prob,
    ecat_sl,
    em_category,
    em_contract_end_date,
    em_prob_end_date,
  } = category

  const { hrm_calcu, hrm_clv, hrm_cmn, hrm_ern_lv, hrm_hld, lv_process_slno, category_slno } =
    leaveProcess

  return {
    lv_process_slno: processSlno,
    em_no: employeeIDs.em_id,
    category_slno: em_category,
    process_user: employeeNumber(),
    em_id: employeeIDs.em_no,
    hrm_clv:
      hrm_clv === 1 && ecat_cl === 1
        ? 1
        : hrm_clv === 0 && ecat_cl === 1
        ? 0
        : hrm_clv === 2 && ecat_cl === 1
        ? 0
        : 2,
    hrm_ern_lv:
      hrm_ern_lv === 1 && ecat_el === 1
        ? 1
        : hrm_ern_lv === 0 && ecat_el === 1
        ? 0
        : hrm_ern_lv === 2 && ecat_el === 1
        ? 0
        : 2,
    hrm_hld:
      (ecat_nh === 1 || ecat_fh === 1) && hrm_hld === 1
        ? 1
        : (ecat_nh === 1 || ecat_fh === 1) && hrm_hld === 2
        ? 0
        : (ecat_nh === 1 || ecat_fh === 1) && hrm_hld === 0
        ? 0
        : ecat_nh === 0 && ecat_fh === 0
        ? 2
        : 2,
    hrm_cmn:
      hrm_cmn !== 2
        ? hrm_cmn
        : ecat_esi_allow === 1 ||
          ecat_el === 1 ||
          ecat_lop === 1 ||
          ecat_mate === 1 ||
          ecat_sl === 1
        ? 0
        : 2,
    hrm_calcu: 0,
    hrm_process_status: 'A',
    next_updatedate:
      ecat_cont === 1
        ? em_contract_end_date
        : ecat_prob === 1
        ? em_prob_end_date
        : moment(lastDayOfYear(new Date())).format('YYYY-MM-DD'),
    // "next_updatedate"  if employee is in contract "contract end date" : if is in probation "probation end date" other wise last day of year
  }
}

/***
 * 2 --> Inactive the All credited leaves ( Casual leace, holidays, earn Leave )
 * if only inactive the following criteria
 * if previous category have the CL but the current category dont have the CL
 * then inactive all the credited CL Leaves
 *
 **/

export const updateInactiveLeaves = async (category, leaveProcess) => {
  const { ecat_cl, ecat_nh, ecat_fh, ecat_el } = category
  const { hrm_clv, hrm_hld, hrm_ern_lv, lv_process_slno } = leaveProcess

  const leaveProcessSlnoObj = {
    oldprocessslno: lv_process_slno,
  }

  let resultObj = {
    success: 1, // 1 --> success 2 --> error
    error: 0,
  }

  /*
        Update the all leaves inactive as value "1" / this data consider for the carry forward
        Update casual leave inactive (as "1" ) // inactive status --> "1" consider for the leave carry forward

        ecat_cl === 0 -> Means Casual Leave in Catgory is inactive
        hrm_clv === 1 -> Means Casual Leave in old process table (Before process) is active 
        then inactive all the credited casual leave as inactive
    */
  if (ecat_cl === 0 && hrm_clv === 1) {
    let casualLeaveUpdation = await axioslogin.post(
      '/yearleaveprocess/updatecasualleaveupdateslno',
      leaveProcessSlnoObj,
    )
    const { success } = casualLeaveUpdation.data
    if (success === 2 || success === 1) {
      let resultObj = { ...resultObj }
    } else {
      let resultObj = { ...resultObj, error: 1 }
    }
  }
  //    holiday leaves update
  if ((ecat_nh === 0 || ecat_fh === 0) && hrm_hld === 1) {
    const holidayLeaveUpdation = await axioslogin.post(
      '/yearleaveprocess/updateholidayupdateslno',
      leaveProcessSlnoObj,
    )
    const { success } = holidayLeaveUpdation.data
    if (success === 2 || success === 1) {
      let resultObj = { ...resultObj }
    } else {
      let resultObj = { ...resultObj, error: 1 }
    }
  }
  // earn leave update
  if (ecat_el === 0 && hrm_ern_lv === 1) {
    const earnLeaveUpdation = await axioslogin.post(
      '/yearleaveprocess/updateeanleaveupdate',
      leaveProcessSlnoObj,
    )
    const { success } = earnLeaveUpdation.data
    if (success === 2 || success === 1) {
      let resultObj = { ...resultObj }
    } else {
      let resultObj = { ...resultObj, error: 1 }
    }
  }

  return resultObj
}

//update the old leave processed table data

export const updateOldLeaveProcessedData = async (leaveProcess) => {
  const { lv_process_slno } = leaveProcess
  let oldLeaveProcessSLno = {
    lv_process_slno: lv_process_slno,
  }

  const inactiveOldLeaveProcessData = await axioslogin.patch(
    '/yearleaveprocess/',
    oldLeaveProcessSLno,
  )
  const { message, success } = inactiveOldLeaveProcessData.data
  if (success === 2 || success === 1) {
    return { success: 1, message: message }
  } else {
    return { success: 0, message: message }
  }
}

// insert new data into the 'hrm_leave_process' table function
export const insertNewLeaveProcessData = async (newObj) => {
  const { em_id, em_no } = newObj ?? 0

  const yearlyProcessTableData = {
    em_id: em_id,
    em_no: em_no,
    processUser: employeeNumber(),
    currentYear: moment(startOfYear(new Date())).format('YYYY-MM-DD'),
  }

  const result = await axioslogin.post('/yearleaveprocess/create', newObj)
  const { message, success } = result.data
  if (success === 1) {
    // get the Yearly Or Annual Leave process data inserted into the 'yearly_leave_process' table

    const getYearlyLeaveProcessData = await axioslogin.post(
      '/yearleaveprocess/select_yearlyprocess',
      yearlyProcessTableData,
    )
    // console.log(getYearlyLeaveProcessData)
    const { successStatus } = getYearlyLeaveProcessData.data

    if (successStatus === 1) {
      //No Record
      const insertYearlyLeaveProcessTableData = await axioslogin.post(
        '/yearleaveprocess/insertyearly',
        yearlyProcessTableData,
      )
      // console.log(insertYearlyLeaveProcessTableData)
      // const { success } = insertYearlyLeaveProcessTableData.data;
    }

    return { success: 1, message: message }
  } else if (success === 0) {
    return { success: 0, message: message }
  } else {
    return { success: 2, message: message }
  }
}

// CONTRACT AND REGULAR EMPLOYEE START AND END DATE FOR LEAVE PROCESS

export const getEmployeeProcessStartAndEndDate = async (empCategoryProcessDetl) => {
  //employee category and contract detailed based on after hrm_leave_process
  const {
    date_of_join,
    em_conf_end_date,
    em_cont_end,
    em_cont_start,
    is_under_contract,
    is_under_probation,
    probation_end_date,
    em_gender,
  } = empCategoryProcessDetl

  /****
   * 1==> contract 
   * 1:1 ==> contract + traiing 
   * 1:2 ==> contract + probation
   * 1:3 ==> contract + confirmation
   * 
   * 2==> permanent
   * 2:1 ==> permanent + traiing 
   * 2:2 ==> permanent + probation
   * 2:3 ==> permanent + confirmation
   * 
   */

  if(is_under_contract === 1){
    //employee under contract
    if(is_under_probation === 1){
      // employee under probation or training in Contract
    }else{
      // employee is contract + confirmation 
    }
  }else{
    // employee is permanent
    if(is_under_probation === 1){
      // employee under probation or training in Permanent
    }else{

    }

  }

}
