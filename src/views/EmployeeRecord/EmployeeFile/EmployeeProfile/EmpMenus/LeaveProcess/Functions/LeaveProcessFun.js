import { addDays, compareAsc, differenceInDays, differenceInYears, eachMonthOfInterval, getYear, lastDayOfYear, startOfYear, subYears } from 'date-fns'
import moment from 'moment'
import { axioslogin } from 'src/views/Axios/Axios'
import { employeeNumber } from 'src/views/Constant/Constant'

const loggerUser = employeeNumber()

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
    // ecat_cl,
    // ecat_el,
    // ecat_nh,
    // ecat_fh,
    // ecat_lop,
    // ecat_sl,
    // ecat_mate,
    // ecat_confere,
  } = category
  const {
    // lv_process_slno,
    category_slno,
    hrm_clv,
    hrm_ern_lv,
    hrm_hld,
    hrm_cmn,
    // hrm_calcu,
    // hrm_process_status,
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
  // em_cont_start,
  em_cont_end,
  contract_status,
  // em_doj,
  em_prob_end_date,
  // des_type,
  // emp_type,
  ecat_prob,
  ecat_training,
  probation_status

) => {
  /***
   * designation type ->Probation ->1,training->2,Confirmation -> 3 (des_type)
   * employee type -> Regular -> 1, contract -> 2 (emp_type)
   */
  const contrctEndDate = moment(em_cont_end).isValid() ? moment(em_cont_end) : 0
  //const contractStartDate = moment(em_cont_start).isValid() ? moment(em_cont_start) : 0
  //const dateOfJoin = moment(em_doj).isValid() ? moment(em_doj) : 0
  const probationEndDate = moment(em_prob_end_date).isValid() ? moment(em_prob_end_date) : 0

  if (contract_status === 1 && probation_status === 0) {
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
  }
  // else if (probation_status === 1) {
  //   if (moment(probationEndDate).isValid() && moment(contrctEndDate).isValid()) {
  //     if (new Date(probationEndDate) > new Date() && new Date(contrctEndDate) > new Date()) {
  //       return {
  //         message: 'Contract Date Not Exceeded',
  //         status: true,
  //       }
  //     }
  //     else {
  //       return {
  //         message: 'Probation end Date Exceeded Please Do the Probation Conformation',
  //         status: false,
  //       }
  //     }
  //   } else {
  //     return {
  //       message: 'Contract End Date Showing is a Invalid Date, Please Contract HRD',
  //       status: false,
  //     }
  //   }

  // }
  else if ((ecat_prob === 1 || ecat_training === 1) && ((moment(probationEndDate).isValid()) && new Date(probationEndDate) < new Date())) {
    return {
      message: 'Probation || Training Confirmation Pending,Do the Process First',
      status: false,
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
    em_doj,
    ecat_esi_allow,
    ecat_lop,
    ecat_mate,
    ecat_sl,
    ecat_cont,
    em_contract_end_date,
    ecat_prob,
    ecat_holiday,
    em_prob_end_date,
    ecat_training
  } = category

  return {
    lv_process_slno: processSlno,
    em_no: employeeIDs.em_id,
    category_slno: category.em_category,
    process_user: employeeNumber(),
    em_id: employeeIDs.em_no,
    hrm_clv: ecat_cl === 1 ? 0 : 2,
    hrm_ern_lv: ecat_el === 1 && new Date(em_doj) < addDays(startOfYear(new Date()), 14) ? 0 : 2,
    //hrm_hld: ecat_nh === 1 || ecat_fh === 1 ? 0 : 2,
    hrm_hld: ecat_holiday === 1 ? 0 : 2,
    hrm_cmn:
      ecat_esi_allow === 1 || ecat_el === 1 || ecat_lop === 1 || ecat_mate === 1 || ecat_sl === 1
        ? 0
        : 2,
    hrm_calcu: 0,
    hrm_process_status: 'A',
    next_updatedate:
      ((ecat_cont === 1) && (moment(em_contract_end_date) <= moment(lastDayOfYear(new Date())))) ? em_contract_end_date :
        ((ecat_cont === 1) && (moment(em_contract_end_date) >= moment(lastDayOfYear(new Date())))) ? moment(lastDayOfYear(new Date())).format('YYYY-MM-DD') :
          ((ecat_prob === 1) && (moment(em_prob_end_date) <= moment(lastDayOfYear(new Date())))) ? em_prob_end_date :
            ((ecat_prob === 1) && (moment(em_prob_end_date) >= moment(lastDayOfYear(new Date())))) ? moment(lastDayOfYear(new Date())).format('YYYY-MM-DD') :
              ((ecat_training === 1) && (moment(em_prob_end_date) <= moment(lastDayOfYear(new Date())))) ? em_prob_end_date :
                ((ecat_training === 1) && (moment(em_prob_end_date) >= moment(lastDayOfYear(new Date())))) ? moment(lastDayOfYear(new Date())).format('YYYY-MM-DD') :
                  moment(lastDayOfYear(new Date())).format('YYYY-MM-DD'),
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
    // ecat_fh,
    ecat_lop,
    ecat_mate,
    //ecat_nh,
    ecat_holiday,
    ecat_prob,
    ecat_sl,
    em_category,
    em_contract_end_date,
    em_prob_end_date,
    ecat_training
  } = category

  const {
    hrm_clv,
    hrm_cmn,
    hrm_ern_lv,
    hrm_hld,
  } =
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
      (ecat_holiday === 1) && hrm_hld === 1
        ? 1
        : (ecat_holiday === 1) && hrm_hld === 2
          ? 0
          : (ecat_holiday === 1) && hrm_hld === 0
            ? 0
            : ecat_holiday === 0
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
      ((ecat_cont === 1) && (moment(em_contract_end_date) <= moment(lastDayOfYear(new Date())))) ? em_contract_end_date :
        ((ecat_cont === 1) && (moment(em_contract_end_date) >= moment(lastDayOfYear(new Date())))) ? moment(lastDayOfYear(new Date())).format('YYYY-MM-DD') :
          ((ecat_prob === 1) && (moment(em_prob_end_date) <= moment(lastDayOfYear(new Date())))) ? em_prob_end_date :
            ((ecat_prob === 1) && (moment(em_prob_end_date) >= moment(lastDayOfYear(new Date())))) ? moment(lastDayOfYear(new Date())).format('YYYY-MM-DD') :
              ((ecat_training === 1) && (moment(em_prob_end_date) <= moment(lastDayOfYear(new Date())))) ? em_prob_end_date :
                ((ecat_training === 1) && (moment(em_prob_end_date) >= moment(lastDayOfYear(new Date())))) ? moment(lastDayOfYear(new Date())).format('YYYY-MM-DD') :
                  moment(lastDayOfYear(new Date())).format('YYYY-MM-DD'),
    // (ecat_cont === 1 && (moment(em_contract_end_date) <= moment(lastDayOfYear(new Date())))) ? em_contract_end_date :
    //   (ecat_prob === 1 && (moment(em_prob_end_date) <= moment(lastDayOfYear(new Date())))) ? em_prob_end_date :
    //     moment(lastDayOfYear(new Date())).format('YYYY-MM-DD'),
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
  const { ecat_cl, ecat_holiday, ecat_el } = category
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
      resultObj = { ...resultObj }
    } else {
      resultObj = { ...resultObj, error: 1 }
    }
  }
  //    holiday leaves update
  if ((ecat_holiday === 0) && hrm_hld === 1) {
    const holidayLeaveUpdation = await axioslogin.post(
      '/yearleaveprocess/updateholidayupdateslno',
      leaveProcessSlnoObj,
    )
    const { success } = holidayLeaveUpdation.data
    if (success === 2 || success === 1) {
      resultObj = { ...resultObj }
    } else {
      resultObj = { ...resultObj, error: 1 }
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
      resultObj = { ...resultObj }
    } else {
      resultObj = { ...resultObj, error: 1 }
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
    year: moment().format('YYYY')
  }

  const lastYearDate = subYears(new Date(), 1);
  const lastYear = getYear(lastYearDate);

  const getProcessDataObj = {
    em_no: em_no,
    year: lastYear
  }

  const result = await axioslogin.post('/yearleaveprocess/create', newObj)
  const { message, success } = result.data
  if (success === 1) {

    /*** ANNUAL PROCESS TABLE DATA INSERT
     * 1-> After inserting the "hrm_leave_process" table 
     * 2-> Then check the yearl_process_table has the annual process data 
     * 3-> if "no" then insert into a new data based on current year()
     */

    const getYearlyLeaveProcessData = await axioslogin.post('/yearleaveprocess/select_yearlyprocess', yearlyProcessTableData,)
    const { successStatus } = getYearlyLeaveProcessData.data;
    if (successStatus === 1) {
      //No Record yearly data 
      await axioslogin.post('/yearleaveprocess/insertyearly', yearlyProcessTableData)
    }

    /**** ANNUAL PROCESS TABLE DATA INSERT AND PREVOUS DATA DEACTIVATE
     * 1-> check any leave process data in "hrm_leave_process" table with ('A') active status with Previous Year;
     * 2-> if Yes -> then inactive that data
     * 3-> then inactive all active previous year CL,HLDAY,COMNLEV,EARN_LEVE credit_status === 1
     * 4-> if no nothing happends
     */
    const getProcessDataLastYear = await axioslogin.post('/yearleaveprocess/getLeaveProccedData', getProcessDataObj);
    const { success, msge } = getProcessDataLastYear.data;
    if (success === 1) {
      const { lv_process_slno } = msge;
      const procSlno = {
        lv_process_slno: lv_process_slno
      }
      //update status as 'N'
      const inactiveLastYearProcessData = await axioslogin.post('/yearleaveprocess/inactiveLastYearProcessData', procSlno);
      const { success } = inactiveLastYearProcessData;
      if (success === 1) {
        try {

          //inactive casual leave
          await axioslogin.post('/yearleaveprocess/inactiveCasualLeave', getProcessDataObj);
          //inactive earn leave
          await axioslogin.post('/yearleaveprocess/inactiveEarnLeave', getProcessDataObj);
          //inactive holiday leave
          await axioslogin.post('/yearleaveprocess/inactiveHoliday', getProcessDataObj);
          //inactive common leave
          await axioslogin.post('/yearleaveprocess/inactiveCommonLeave', getProcessDataObj);

        } catch (err) {

        }
      }
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
    //em_conf_end_date,
    em_cont_end,
    em_cont_start,
    is_under_contract,
    is_under_probation,
    probation_end_date,
    // em_gender,
  } = empCategoryProcessDetl

  //if date is invalid defaultDate is supply - 2000-01-01
  const defaultDate = moment(new Date('2000-01-01')).format('YYYY-MM-DD')

  const startOfYears = moment(startOfYear(new Date())).format('YYYY-MM-DD') // Current year First Day eg '01-01-YYYY'
  const endOfYears = moment(lastDayOfYear(new Date())).format('YYYY-MM-DD') // Current year Last Day eg '31-12-YYYY'

  const dateOfJoin =
    moment(date_of_join).isValid() === true
      ? moment(date_of_join).format('YYYY-MM-DD')
      : moment(new Date('2000-01-01')).format('YYYY-MM-DD') // date of join
  const contactStart =
    moment(em_cont_start).isValid() === true
      ? moment(em_cont_start).format('YYYY-MM-DD')
      : moment(new Date('2000-01-01')).format('YYYY-MM-DD') // Contract Start date
  const contractEnd =
    moment(em_cont_end).isValid() === true
      ? moment(em_cont_end).format('YYYY-MM-DD')
      : moment(new Date('2000-01-01')).format('YYYY-MM-DD') // Contract End date
  const probationEndDate =
    moment(probation_end_date).isValid() === true
      ? moment(probation_end_date).format('YYYY-MM-DD')
      : moment(new Date('2000-01-01')).format('YYYY-MM-DD') // Training || Probation end Date Contract || Regular Employee

  // const dateOfJoin = moment(new Date('2021-12-12')).format('YYYY-MM-DD');
  // const contactStart = moment(new Date('2022-06-12')).format('YYYY-MM-DD');
  // const contractEnd = moment(new Date('2023-06-12')).format('YYYY-MM-DD');
  // const probationEndDate = moment(new Date('2023-03-12')).format('YYYY-MM-DD');

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

  // 0 --> not default dates / start and end dates are correct
  // 1 --> start or end dates is default date

  const processDates = {
    startDate: defaultDate,
    endDate: defaultDate,
    status: 0,
    message: 'noError',
  }

  // check the sontract start and wnd dateis valid ( not equal to "2000-01-01" )
  if (is_under_contract === 1 && contactStart !== defaultDate && contractEnd !== defaultDate) {
    //employee under contract
    // if (is_under_probation === 1) {
    //   // employee under probation or training in Contract
    //   if (
    //     startOfYears <= contactStart &&
    //     contactStart <= probationEndDate &&
    //     probationEndDate <= endOfYears &&
    //     probationEndDate <= contractEnd
    //   ) {
    //     return { ...processDates, startDate: contactStart, endDate: probationEndDate, status: 1 }
    //   } else if (
    //     startOfYears >= contactStart &&
    //     contactStart <= probationEndDate &&
    //     probationEndDate <= endOfYears &&
    //     probationEndDate <= contractEnd &&
    //     probationEndDate <= endOfYears
    //   ) {
    //     return { ...processDates, startDate: startOfYears, endDate: probationEndDate, status: 1 }
    //   } else if (
    //     contactStart >= startOfYears &&
    //     contactStart <= probationEndDate &&
    //     probationEndDate >= endOfYears &&
    //     contractEnd >= endOfYears
    //   ) {
    //     return { ...processDates, startDate: contactStart, endDate: endOfYears, status: 1 }
    //   } else {
    //     return { ...processDates, message: 'inside contract & inside probation' }
    //   }
    // } else {
    // employee is contract + confirmation
    if (
      startOfYears <= contactStart &&
      contactStart <= contractEnd &&
      contractEnd <= endOfYears
    ) {
      return { ...processDates, startDate: contactStart, endDate: contractEnd, status: 1 }
    } else if (
      startOfYears >= contactStart &&
      contactStart <= contractEnd &&
      contractEnd <= endOfYears
    ) {
      return { ...processDates, startDate: startOfYears, endDate: contractEnd, status: 1 }
    } else if (
      contactStart >= startOfYears &&
      contactStart <= endOfYears &&
      contactStart <= contractEnd
    ) {
      return { ...processDates, startDate: contactStart, endDate: endOfYears, status: 1 }
    }
    return { ...processDates, message: 'inside contract' }
    // }
  } else if (is_under_contract === 0) {
    // employee is permanent
    if (is_under_probation === 1) {
      // employee under probation or training in Permanent
      if (
        startOfYears <= dateOfJoin &&
        dateOfJoin <= probationEndDate &&
        dateOfJoin <= endOfYears &&
        probationEndDate <= endOfYears &&
        dateOfJoin !== defaultDate
      ) {
        return { ...processDates, startDate: dateOfJoin, endDate: probationEndDate, status: 1 }
      } else if (
        startOfYears >= dateOfJoin &&
        startOfYears <= probationEndDate &&
        dateOfJoin <= probationEndDate &&
        probationEndDate <= endOfYears &&
        dateOfJoin !== defaultDate
      ) {
        return { ...processDates, startDate: startOfYears, endDate: probationEndDate, status: 1 }
      } else if (
        startOfYears <= dateOfJoin &&
        dateOfJoin <= endOfYears &&
        dateOfJoin <= probationEndDate &&
        endOfYears <= probationEndDate &&
        dateOfJoin !== defaultDate
      ) {
        return { ...processDates, startDate: dateOfJoin, endDate: endOfYears, status: 1 }
      }

      return { ...processDates, message: 'inside regular & probation' }
    } else {
      if (startOfYears <= dateOfJoin && dateOfJoin <= endOfYears && dateOfJoin !== defaultDate) {
        return { ...processDates, startDate: dateOfJoin, endDate: endOfYears, status: 1 }
      } else if (startOfYears >= dateOfJoin && startOfYears <= endOfYears) {
        return { ...processDates, startDate: startOfYears, endDate: endOfYears, status: 1 }
      }
      return { ...processDates, message: 'inside regular' }
    }
  }
  return { ...processDates, message: 'default error !end of the function' }
}

//Update Casual Leave Based on process

export const updateCasualLeave = async (calulatedProcessDate, lv_process_slno, em_id, em_no) => {

  const { startDate, endDate } = calulatedProcessDate

  let casualLeaveDateRange = eachMonthOfInterval({
    start: new Date(startDate),
    end: new Date(endDate),
  })

  let processedCasualLeaveList = casualLeaveDateRange && casualLeaveDateRange.map((value, index) => {
    const today = moment().format('YYYY-MM');
    const checkDate = moment(value).format('YYYY-MM');

    const leaveDay = moment(value).format('YYYY-MM-DD');

    // if (checkDate >= today) {
    return (checkDate >= today) && {
      em_no: em_no,
      em_id: em_id,
      cl_lv_mnth: leaveDay,
      cl_lv_year: leaveDay,
      cl_lv_allowed: 1,
      cl_lv_credit: 1,
      cl_lv_taken: 0,
      lv_process_slno: lv_process_slno,
      update_user: loggerUser,
    }
    // }
    // return casualLeveList
  }).filter((val) => val !== false)
  return processedCasualLeaveList
}

//Casual Leave Insert Function

export const casualLeaveInsertFun = async (value, lv_process_slno) => {

  let returnMessage = { status: 0, message: '' }
  const lv_process = {
    lv_proce: lv_process_slno
  }
  const result = await axioslogin.post('/yearleaveprocess/insert', value);
  const { success, message } = result.data

  if (success === 1) {
    //After insert the Casual Leave data to the Table then updated the currespoding leave process table updation
    const casualLeaveStatusUpdation = await axioslogin.patch('/yearleaveprocess/updatecasualleave', lv_process)
    if (casualLeaveStatusUpdation.data.success === 2) {
      return {
        ...returnMessage,
        status: 1,
        message: 'Casual Leave Updated SuccessFully'
      }
    }
  } else {
    let errorMsg = message?.sqlMessage;
    return {
      ...returnMessage,
      status: 0,
      message: errorMsg ?? 'Error Updating Casual Leave! Contact EDP, line-696',
    }
  }

}


//update holiday based on saved Holiday

export const updateHolidayLeaves = async (calulatedProcessDate, lv_process_slno, em_id, em_no, em_doj) => {
  // const { startDate, endDate } = calulatedProcessDate;
  let messages = { status: 0, data: [] }
  const holidayList = await axioslogin.get('/yearleaveprocess/year/holiday');
  const { success, data } = holidayList.data;
  if (success === 2) {
    return { ...messages, status: 0 }
  } else {
    let holidayList = data.map((val) => {
      const today = moment().format('YYYY-MM-DD');
      const holidayDate = moment(val.hld_date).format('YYYY-MM-DD');

      return (holidayDate >= today && holidayDate >= em_doj) ? {
        em_no: em_no,
        hd_slno: val.hld_slno,
        hl_lv_year: val.hld_date,
        hl_date: val.hld_date,
        hl_lv_credit: 1,
        hl_lv_taken: 0,
        hl_lv_allowed: 1,
        lv_process_slno: lv_process_slno,
        update_user: loggerUser,
        em_id: em_id
      } : null;
    }).filter((val) => val !== null)

    return { ...messages, status: 1, data: holidayList }
  }
}

//insert Holiday 

export const insertHolidayFun = async (data, lv_process_slno) => {
  let returnMessage = { status: 0, message: '' }
  const lv_processdta = {
    lv_proce: lv_process_slno
  }
  const resultinsrtholiday = await axioslogin.post('/yearleaveprocess/insertholiday', data);
  const { success, message } = resultinsrtholiday.data;
  // if data inserted update process table
  if (success === 1) {
    const resultupdateholiday = await axioslogin.patch('/yearleaveprocess/updateholiday', lv_processdta)
    if (resultupdateholiday.data.success === 2) {
      return {
        ...returnMessage,
        status: 1,
        message: resultupdateholiday.data.message
      }
    }
  } else {
    let errorMsg = message?.sqlMessage;
    return {
      ...returnMessage,
      status: 0,
      message: errorMsg ?? 'Error Updating Holiday Leave! Contact EDP, line-760',
    }
  }
}

//Update Common Leaves 
export const updateCommonLeaves = async (lv_process_slno, em_id, em_no, em_gender, statutory_esi, category) => {
  const { ecat_sl } = category;
  const result = await axioslogin.get('/yearlyleaves/get/getcommonleave');
  const { successcommonleave, messagecommonleave } = result.data;
  let commonLeaveMessage = { status: 0, data: [] }
  if (successcommonleave === 1) {
    //const today = new Date();
    const result = startOfYear(new Date())
    const res = differenceInDays(new Date(), result)
    const obj = {
      leave_credit_policy_count: 365 - res
    }

    const arr = messagecommonleave.map((item) => item.lvetype_slno === 6 ? { ...item, ...obj } : item);
    // Filter the Maternity For the Male Employee
    const filterCommonArray = arr.filter((val) => val.lvetype_slno !== 2);
    const newCommonArray = em_gender === 1 ? filterCommonArray : arr;
    let commondata = newCommonArray.map((val) => {
      const commonleave = {
        em_no: em_no,
        llvetype_slno: val.lvetype_slno,
        cmn_lv_allowedflag: statutory_esi === 1 ? 1 : 0,
        cmn_lv_allowed: val.leave_credit_policy_count,
        cmn_lv_taken: 0,
        cmn_lv_balance: val.leave_credit_policy_count,
        Iv_process_slno: lv_process_slno,
        update_user: loggerUser,
        em_id: em_id,
        cmn_lv_year: moment().format('YYYY-MM-DD')
      }
      return commonleave
    }).filter((val) => statutory_esi === 0 && val.llvetype_slno !== 6 ||
      statutory_esi === 1 && val.llvetype_slno !== 7)
    if (ecat_sl === 0) {
      const list = commondata.filter((val) => val.llvetype_slno !== 7)
      return { ...commonLeaveMessage, status: 1, data: list }
    } else {
      return { ...commonLeaveMessage, status: 1, data: commondata }
    }
  } else {
    return { ...commonLeaveMessage, status: 0, data: [] }
  }
}

//insert Common Leaves

export const insertCommonLeaves = async (data, lv_process_slno) => {
  let returnMessage = { status: 0, message: '' }
  const lv_processdta = {
    lv_proce: lv_process_slno
  }
  const resultcommonleave = await axioslogin.post('/yearleaveprocess/insertCommonleave', data);
  const { success, message } = resultcommonleave.data;
  if (success === 1) {
    // if updated casula leave table update process table
    const resultupdatcommonleave = await axioslogin.patch('/yearleaveprocess/updatecommon', lv_processdta)

    if (resultupdatcommonleave.data.success === 2) {
      // succesNofity(resultupdatcommonleave.data.message)
      return {
        ...returnMessage,
        status: 1,
        message: resultupdatcommonleave.data.message
      }
    }
  }
  else {
    let errorMsg = message?.sqlMessage;
    return {
      ...returnMessage,
      status: 0,
      message: errorMsg ?? 'Error Updating Common Leave! Contact EDP, line-834',
    }
  }
}

//update Earn Leaves
export const updateEarnLeaves = async (calulatedProcessDate, lv_process_slno, em_id, em_no) => {
  const { startDate, endDate } = calulatedProcessDate;

  let earnLeaveDateRange = eachMonthOfInterval({
    start: new Date(startDate),
    end: new Date(endDate),
  })

  let processedEarnLeaveList = earnLeaveDateRange && earnLeaveDateRange.map((value, index) => {
    const today = moment().format('YYYY-MM');
    const checkDate = moment(value).format('YYYY-MM');

    const leaveDay = moment(value).format('YYYY-MM-DD');

    return (checkDate >= today) && {
      em_no: em_no,
      ernlv_mnth: leaveDay,
      ernlv_year: leaveDay,
      ernlv_allowed: 1,
      ernlv_credit: 0,
      ernlv_taken: 0,
      lv_process_slno: lv_process_slno,
      update_user: loggerUser,
      em_id: em_id
    }

  }).filter((val) => val !== false)
  return processedEarnLeaveList;
}

//insert Earn Leaves
export const insertEarnLeaves = async (dateRange, lv_process_slno, em_doj, em_no) => {
  let returnMessage = { status: 0, message: '' }

  const lv_process = {
    lv_proce: lv_process_slno
  }

  const lastYearDate = subYears(new Date(), 1);
  const lastYear = getYear(lastYearDate);
  const currentYear = getYear(new Date());

  const yearDiffrence = differenceInYears(new Date(), new Date(em_doj))

  let data = {
    currentYear: currentYear,
    creditYear: lastYear,
    em_no: em_no
  }

  //Update previous year earn leaves
  if (yearDiffrence >= 1) {
    await axioslogin.post('/yearleaveprocess/creditPrivilegeLeave', data);
  }

  const result = await axioslogin.post('/yearleaveprocess/insertearnleave', dateRange);
  const { success, message } = result.data
  if (success === 1) {

    // if updated Earn leave table update process table
    const resultupdatcasualleave = await axioslogin.patch('/yearleaveprocess/updateearnleave', lv_process);
    if (resultupdatcasualleave.data.success === 2) {
      return {
        ...returnMessage,
        status: 1,
        message: 'Earn Leave Updated SuccessFully'
      }
    }

  } else {
    let errorMsg = message?.sqlMessage;
    return {
      ...returnMessage,
      status: 0,
      message: errorMsg ?? 'Error Updating Earn Leave! Contact EDP, line-915',
    }
  }
}