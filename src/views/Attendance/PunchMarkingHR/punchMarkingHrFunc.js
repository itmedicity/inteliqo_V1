import { addDays, addHours, addMinutes, differenceInHours, differenceInMinutes, format, isAfter, isBefore, isEqual, isValid, max, min, subDays, subHours } from "date-fns";
import { axioslogin } from "src/views/Axios/Axios";

export const processPunchMarkingHrFunc = async (
    postData_getPunchData,
    punchaData, //PUNCH DATA
    empList, // EMPLOYEE LIST SECTION WISE
    shiftInformation, // SHIFT INFORMATION
    commonSettings, // COMMON SETTINGS
    holidayList, // HOLIDAY LIST
    empSalary // EMPLOYEE_SALARY
) => {
    const {
        cmmn_early_out, // Early going time interval
        cmmn_grace_period, // common grace period for late in time
        cmmn_late_in, //Maximum Late in Time for punch in after that direct HALF DAY 
        salary_above, //Salary limit for calculating the holiday double wages
        week_off_day, // week off SHIFT ID
        notapplicable_shift, //not applicable SHIFT ID
        default_shift, //default SHIFT ID
        noff, // night off SHIFT ID,
        holiday_policy_count, //HOLIDAY PRESENT AND ABSENT CHECKING COUNT 
        weekoff_policy_max_count, // WEEK OFF ELIGIBLE MAX DAY COUNT
        weekoff_policy_min_count,
        halfday_time_count
    } = commonSettings; //COMMON SETTING

    //GET DUTY PLAN AND CHECK DUTY PLAN IS EXCIST OR NOT
    const getDutyPlan = await axioslogin.post("/attendCal/getDutyPlanBySection/", postData_getPunchData); //GET DUTY PLAN DAAT
    const { succes, shiftdetail } = getDutyPlan.data;
    if (succes === 1 && shiftdetail?.length > 0) {
        const dutyplanInfo = shiftdetail; //DUTY PLAN
        const dutyPlanSlno = dutyplanInfo?.map(e => e.plan_slno) //FIND THE DUTY PLAN SLNO
        const { fromDate, toDate } = postData_getPunchData;
        const punch_master_data = await axioslogin.post("/attendCal/getPunchMasterDataSectionWise/", postData_getPunchData); //GET PUNCH MASTER DATA
        const { success, planData } = punch_master_data.data;
        if (success === 1 && planData?.length > 0) {
            const punchMasterFilterData = await planData?.filter((e) => new Date(fromDate) <= new Date(e.duty_day) && new Date(e.duty_day) <= new Date(toDate))
            const punchMasterData = punchMasterFilterData; //PUNCHMSTER DATA
            return Promise.allSettled(
                punchMasterData?.map(async (data, index) => {
                    const sortedShiftData = shiftInformation?.find((e) => e.shft_slno === data.shift_id)// SHIFT DATA
                    const sortedSalaryData = empSalary?.find((e) => e.em_no === data.em_no) //SALARY DATA
                    const shiftMergedPunchMaster = {
                        ...data,
                        shft_chkin_start: sortedShiftData?.shft_chkin_start,
                        shft_chkin_end: sortedShiftData?.shft_chkin_end,
                        shft_chkout_start: sortedShiftData?.shft_chkout_start,
                        shft_chkout_end: sortedShiftData?.shft_chkout_end,
                        shft_cross_day: sortedShiftData?.shft_cross_day,
                        gross_salary: sortedSalaryData?.gross_salary,
                        earlyGoingMaxIntervl: cmmn_early_out,
                        gracePeriodInTime: cmmn_grace_period,
                        maximumLateInTime: cmmn_late_in,
                        salaryLimit: salary_above,
                        woff: week_off_day,
                        naShift: notapplicable_shift,
                        defaultShift: default_shift,
                        noff: noff,
                        holidayStatus: sortedShiftData?.holiday_status
                    }
                    const employeeBasedPunchData = punchaData?.filter((e) => e.emp_code == data.em_no)
                    //FUNCTION FOR MAPPING THE PUNCH IN AND OUT 
                    return await punchInOutMapping(shiftMergedPunchMaster, employeeBasedPunchData)
                })
            ).then((data) => {
                const punchMasterMappedData = data?.map((e) => e.value)
                return Promise.allSettled(
                    punchMasterMappedData?.map(async (val) => {
                        const holidayStatus = val.holiday_status;
                        const punch_In = val.punch_in === null ? null : new Date(val.punch_in);
                        const punch_out = val.punch_out === null ? null : new Date(val.punch_out);

                        const shift_in = new Date(val.shift_in);
                        const shift_out = new Date(val.shift_out);

                        //SALARY LINMIT
                        const salaryLimit = val.gross_salary > val.salaryLimit ? true : false;

                        const getLateInTime = await getLateInTimeIntervel(punch_In, shift_in, punch_out, shift_out)

                        const getAttendanceStatus = await getAttendanceCalculation(
                            punch_In,
                            shift_in,
                            punch_out,
                            shift_out,
                            cmmn_grace_period,
                            getLateInTime,
                            holidayStatus,
                            val.shift_id,
                            val.defaultShift,
                            val.naShift,
                            val.noff,
                            val.woff,
                            salaryLimit,
                            val.maximumLateInTime,
                            halfday_time_count
                        )
                        return {
                            em_no: val.em_no,
                            duty_day: val.duty_day,
                            punch_slno: val.punch_slno,
                            punch_in: val.punch_in,
                            punch_out: val.punch_out,
                            hrs_worked: (val.shift_id === week_off_day || val.shift_id === noff || val.shift_id === notapplicable_shift || val.shift_id === default_shift) ? 0 : getLateInTime?.hrsWorked,
                            late_in: (val.shift_id === week_off_day || val.shift_id === noff || val.shift_id === notapplicable_shift || val.shift_id === default_shift) ? 0 : getLateInTime?.lateIn,
                            early_out: (val.shift_id === week_off_day || val.shift_id === noff || val.shift_id === notapplicable_shift || val.shift_id === default_shift) ? 0 : getLateInTime?.earlyOut,
                            duty_status: getAttendanceStatus?.duty_status,
                            holiday_status: val.holiday_status,
                            leave_status: val.leave_status,
                            lvereq_desc: getAttendanceStatus?.lvereq_desc,
                            duty_desc: getAttendanceStatus?.duty_desc,
                            lve_tble_updation_flag: val.lve_tble_updation_flag
                        }
                    })
                ).then(async (element) => {
                    // REMOVE LEAVE REQUESTED DATA FROM THIS DATA

                    const elementValue = element?.map((e) => e.value);
                    const processedData = elementValue?.filter((v) => v.lve_tble_updation_flag === 0)
                    const punchMaterDataBasedOnPunchSlno = processedData?.map((e) => e.punch_slno)
                    // PUNCH MASTER UPDATION
                    const filterAndAdditionPlanData = await planData?.map((el) => {
                        return {
                            ...el,
                            duty_desc: processedData?.find((e) => e.punch_slno === el.punch_slno)?.duty_desc ?? el.duty_desc, // filter and update deuty_desc
                            lvereq_desc: processedData?.find((e) => e.punch_slno === el.punch_slno)?.duty_desc ?? el.duty_desc // same as updation in lvereq_desc 
                        }
                    })

                    /**** CALCUALETE HOLIDAY CHEKING AND WEEKLY OFF CHECKING *****/

                    //FILTER EMPLOYEE NUMBER FROM PUNCHMASTER DATA
                    const filteredEmNoFromPunMast = [...new Set(filterAndAdditionPlanData?.map((e) => e.em_no))];

                    const punchMasterFilterData = filteredEmNoFromPunMast?.map((emno) => {
                        return {
                            em_no: emno,
                            data: filterAndAdditionPlanData?.filter((l) => l.em_no === emno)?.sort((a, b) => b.duty_day - a.duty_day)
                        }
                    })

                    // CALCULATION BASED ON WEEEK OF AND HOLIDAY 
                    return Promise.allSettled(
                        punchMasterFilterData?.flatMap((ele) => {
                            return ele?.data?.map(async (e, idx, array) => {
                                let weekDayStat = e.duty_desc === 'WOFF' ? await weekOffStatus(e, idx, array, weekoff_policy_max_count, weekoff_policy_min_count, fromDate) : e.duty_desc;

                                return {
                                    ...e,
                                    lvereq_desc: e.duty_desc === 'WOFF' ? weekDayStat : e.duty_desc,
                                    duty_desc: e.duty_desc === 'WOFF' ? weekDayStat : e.duty_desc
                                }
                            })
                        })

                    ).then(async (results) => {
                        const arr = punchMasterFilterData.map(filterObj => {
                            let key = filterObj.em_no;
                            return {
                                em_no: key,
                                data: results.filter(obj => obj.value.em_no === key)?.map((e) => e.value)
                            }
                        });

                        return Promise.allSettled(
                            arr?.flatMap((ele) => {
                                return ele?.data?.map(async (e, idx, array) => {
                                    let holidayStat = e.duty_desc === 'H' ? await holidayStatus(e, array, holiday_policy_count) : e.duty_desc;

                                    return {
                                        ...e,
                                        lvereq_desc: e.duty_desc === 'H' ? holidayStat : e.duty_desc,
                                        duty_desc: e.duty_desc === 'H' ? holidayStat : e.duty_desc

                                    }
                                })
                            })

                        ).then(async (results) => {
                            const PunchMAsterPolicyBasedFilterResult = results?.map((e) => e.value)
                            const processedPostData = PunchMAsterPolicyBasedFilterResult?.filter((e) => punchMaterDataBasedOnPunchSlno?.some((el) => el === e.punch_slno))
                            const updatePunchMaster = await axioslogin.post("/attendCal/updatePunchMaster/", processedPostData);
                            const { success, message } = updatePunchMaster.data;
                            if (success === 1) {
                                // PUNCH MARKING HR TABLE UPDATION
                                const updatePunchMarkingHR = await axioslogin.post("/attendCal/updatePunchMarkingHR/", postData_getPunchData);
                                const { sus } = updatePunchMarkingHR.data;
                                if (sus === 1) {
                                    // DUTY PLAN UPDATION
                                    const updateDutyPlanTable = await axioslogin.post("/attendCal/updateDutyPlanTable/", dutyPlanSlno);
                                    const { susc, message } = updateDutyPlanTable.data;
                                    if (susc === 1) {
                                        return { status: 1, message: "Punch Master Updated SuccessFully", errorMessage: '', dta: postData_getPunchData }
                                    } else {
                                        return { status: 0, message: "Error Updating Duty Plan ! contact IT", errorMessage: message }
                                    }
                                } else {
                                    return { status: 0, message: "Error Updating PunchMaster HR  ! contact IT", errorMessage: message }
                                }
                            } else {
                                return { status: 0, message: "Error Processing and Updating Punch Master ! contact IT", errorMessage: message }
                            }

                        }).catch((error) => {
                            return { status: 0, message: "Error Processing and Updating Punch Master ! contact IT", errorMessage: error } // if no return all updation
                        })
                    }).catch((error) => {
                        return { status: 0, message: "Error Processing and Updating Punch Master ! contact IT", errorMessage: error } // if no return all updation
                    })
                }).catch((error) => {
                    return { status: 0, message: "Error Processing and Updating Punch Master ! contact IT", errorMessage: error }// if no return all updation
                })
                // return { status: 1, message: "result", data: e }
            })
        } else {
            return { status: 0, message: "Punch Master Data Not Found ! contact IT", errorMessage: '' }
        }
    } else {
        return { status: 0, message: "Duty Plan Not Done! contact IT", errorMessage: '' }
    }
}

export const getAttendanceCalculation = async (
    punch_In, shift_in, punch_out, shift_out, cmmn_grace_period, getLateInTime,
    holidayStatus, shiftId, defaultShift, NAShift, NightOffShift, WoffShift,
    salaryLimit, maximumLateInTime, halfday_time_count
) => {
    const {
        // hrsWorked, 
        lateIn,
        earlyOut } = getLateInTime;

    //SHIFT ID CHECKING
    // ( !== default shift , !== not applicable shift , !== Night off , !== week off) 
    // if true ==> ( its a working shift ) 
    const checkShiftIdStatus = (shiftId !== defaultShift && shiftId !== NAShift && shiftId !== NightOffShift && shiftId !== WoffShift)
    //HALF DAY CALCULATION
    const totalShiftInMInits = differenceInMinutes(new Date(shift_out), new Date(shift_in))
    const halfDayInMinits = totalShiftInMInits / 2;
    const halfDayStartTime = addMinutes(shift_in, halfDayInMinits)

    if (checkShiftIdStatus === true) {
        // This condition not included  ( !== default shift , !== not applicable shift , !== Night off , !== week off) 
        if (isValid(punch_In) === true && isValid(punch_out) === true) {
            // *****EMPLOYEE HAVE BOTH THE PUNCH******

            const isBeforeHafDayInTime = isBefore(punch_In, halfDayStartTime) || isEqual(punch_In, halfDayStartTime); //for check -> punch in before half day start in time
            const isAfterHalfDayOutTime = isAfter(punch_out, halfDayStartTime) || isEqual(punch_out, halfDayStartTime);

            const workingHours = differenceInHours(new Date(punch_out), new Date(punch_In)) >= 6;
            const halfDayWorkingHour = differenceInHours(new Date(punch_out), new Date(punch_In)) >= halfday_time_count;
            //  isBeforeHafDayInTime === true ==> punch in time greater than half in time (full day not half day)
            if (holidayStatus === 0) {
                // HOLIDAY === NO

                // { out time == 0 minit  ~~ intime <= 30 minits ~~  in time before half day in time === true  } 
                return earlyOut === 0 && (lateIn === 0 || lateIn <= cmmn_grace_period) && isBeforeHafDayInTime === true ?
                    { duty_status: 1, duty_desc: 'P', lvereq_desc: 'P', duty_remark: 'Present' } :

                    earlyOut === 0 && lateIn > cmmn_grace_period && lateIn <= maximumLateInTime && isBeforeHafDayInTime === true ?
                        { duty_status: 1, duty_desc: 'LC', lvereq_desc: 'LC', duty_remark: 'Late Coming' } :

                        // { out time == 0 minit  ~~ intime greater than 30 minits ~~  in time before half day in time === true  } 
                        earlyOut === 0 && lateIn > maximumLateInTime && isBeforeHafDayInTime === true ?
                            { duty_status: 0.5, duty_desc: 'HD', lvereq_desc: 'HD', duty_remark: 'Late in half day after 30 minits' } :

                            // { out time == 0 minit  ~~ intime greater than 30 minits ~~  in time before half day in time === false  } 
                            earlyOut === 0 && lateIn > maximumLateInTime && isBeforeHafDayInTime === false ?
                                { duty_status: 0, duty_desc: 'A', lvereq_desc: 'A', duty_remark: 'Late in and punch in after half day limit' } :

                                // { out time greater than 0 minit  ~~ early out less than 30 minits ~~ intime lessthan or equal to 30  ~~ intime  and outtime should be before and after half day in time  } 
                                (earlyOut > 0 && earlyOut <= maximumLateInTime) && lateIn <= maximumLateInTime && isBeforeHafDayInTime === true && isAfterHalfDayOutTime === true ?
                                    { duty_status: 0.5, duty_desc: 'HD', lvereq_desc: 'EGHD', duty_remark: 'Early going Half day' } :

                                    // { outtime greater than 0 minit  ~~ early out less than 30 minits ~~ intime greater than 30  ~~ intime  and outtime should be before and after half day in time  } 
                                    (earlyOut >= 0 && earlyOut < maximumLateInTime) && lateIn > maximumLateInTime && isBeforeHafDayInTime === true && isAfterHalfDayOutTime === true && halfDayWorkingHour === true ?
                                        { duty_status: 0.5, duty_desc: 'HD', lvereq_desc: 'HD', duty_remark: 'Half day latein and late out' } :

                                        // { outtime greater than 0 minit  ~~ early out greater than 30 minits ~~ intime greater than or equal 30  ~~ intime  and outtime should be before and after half day in time  } 
                                        (earlyOut > 0 && earlyOut > maximumLateInTime) && lateIn <= maximumLateInTime && isBeforeHafDayInTime === true && isAfterHalfDayOutTime === true && halfDayWorkingHour === true ?
                                            { duty_status: 0.5, duty_desc: 'HD', lvereq_desc: 'EGHD', duty_remark: 'Early going Half day latein and late out' } :

                                            (earlyOut > 0 && earlyOut > maximumLateInTime) && lateIn > maximumLateInTime && isBeforeHafDayInTime === false ?
                                                { duty_status: 0, duty_desc: 'A', lvereq_desc: 'A', duty_remark: 'in and out less tha half day time' } :
                                                { duty_status: 0, duty_desc: 'A', lvereq_desc: 'A', duty_remark: 'Lose off Pay' }

            } else {
                // HOLIDAY === YES
                return workingHours === true && isBeforeHafDayInTime === true && isAfterHalfDayOutTime === true ? // new Entry by Ajith on  April 24th 2024, 6:31:15 pm
                    {
                        duty_status: salaryLimit === false ? 2 : 1,
                        duty_desc: 'HP',
                        lvereq_desc: salaryLimit === false ? 'HP' : 'H',
                        duty_remark: 'holiday Present'
                    }// new Entry by Ajith on  April 24th 2024, 6:31:15 pm
                    : earlyOut === 0 && (lateIn === 0 || lateIn <= cmmn_grace_period) && isBeforeHafDayInTime === true ?
                        {
                            duty_status: salaryLimit === false ? 2 : 1,
                            duty_desc: 'HP',
                            lvereq_desc: salaryLimit === false ? 'HP' : 'H',
                            duty_remark: 'holiday Present'
                        } :
                        earlyOut === 0 && lateIn > cmmn_grace_period && lateIn < maximumLateInTime ?
                            {
                                duty_status: salaryLimit === false ? 2 : 1,
                                duty_desc: 'HP',
                                lvereq_desc: salaryLimit === false ? 'HP' : 'H',
                                duty_remark: 'Late Coming'
                            } :
                            earlyOut > 0 && lateIn > 0 && isBeforeHafDayInTime === true && isAfterHalfDayOutTime === true && workingHours === true ?
                                {
                                    duty_status: salaryLimit === false ? 2 : 1,
                                    duty_desc: 'HP',
                                    lvereq_desc: salaryLimit === false ? 'HP' : 'H',
                                    duty_remark: 'working hours more than six hours so holiday present'
                                } :
                                earlyOut > 0 && lateIn > 0 && isBeforeHafDayInTime === true && isAfterHalfDayOutTime === true && workingHours === false ?
                                    {
                                        duty_status: salaryLimit === false ? 1 : 1,
                                        duty_desc: 'H',
                                        lvereq_desc: 'H',
                                        duty_remark: 'working hours less than six hours so holiday only'
                                    } :
                                    earlyOut === 0 && lateIn > maximumLateInTime && isBeforeHafDayInTime === true && workingHours === false ?
                                        {
                                            duty_status: salaryLimit === false && workingHours === true ? 2 : 1,// salary limit > 25000 and working hours should be > 6 hours
                                            duty_desc: 'H',
                                            lvereq_desc: 'H',
                                            duty_remark: 'Late in half day after 30 minits and working hours less than 6 hours'
                                        } :
                                        // new entry addeded by AJITH on Wednesday, April 24, 2024 12:46:09 PM start
                                        earlyOut === 0 && lateIn > maximumLateInTime && isBeforeHafDayInTime === true && workingHours === true ?
                                            {
                                                duty_status: salaryLimit === false && workingHours === true ? 2 : 1,// salary limit > 25000 and working hours should be > 6 hours
                                                duty_desc: 'HP',
                                                lvereq_desc: salaryLimit === false ? 'HP' : 'H',
                                                duty_remark: 'Late in half day after 30 minits and working hours greater than 6 hours'
                                            } :
                                            // new entry addeded by AJITH on Wednesday, April 24, 2024 12:46:09 PM end
                                            earlyOut === 0 && lateIn > maximumLateInTime && isBeforeHafDayInTime === false ?
                                                {
                                                    duty_status: salaryLimit === false ? 1 : 1,
                                                    duty_desc: 'H',
                                                    lvereq_desc: 'H',
                                                    duty_remark: 'Late in and punch in after half day limit'
                                                } :
                                                // (earlyOut > 0 && earlyOut < maximumLateInTime) && lateIn <= maximumLateInTime && isBeforeHafDayInTime === true ?
                                                (earlyOut > 0 && earlyOut <= maximumLateInTime) && lateIn <= maximumLateInTime && isBeforeHafDayInTime === true && isAfterHalfDayOutTime === true ?
                                                    {
                                                        duty_status: salaryLimit === false && workingHours === true ? 2 : 1, // salary limit > 25000 and working hours should be > 6 hours
                                                        duty_desc: 'H',
                                                        lvereq_desc: 'H',
                                                        duty_remark: 'Early going Half day'
                                                    }
                                                    :
                                                    (earlyOut > 0 && earlyOut < maximumLateInTime) && lateIn > maximumLateInTime && isBeforeHafDayInTime === true && isAfterHalfDayOutTime === true && halfDayWorkingHour === true ?
                                                        {
                                                            duty_status: salaryLimit === false && workingHours === true ? 2 : 1,
                                                            duty_desc: 'H',
                                                            lvereq_desc: 'H',
                                                            duty_remark: 'Half day latein and late out'
                                                        } :
                                                        // (earlyOut > 0 && earlyOut < maximumLateInTime) && lateIn > maximumLateInTime && isBeforeHafDayInTime === true ?
                                                        (earlyOut > 0 && earlyOut > maximumLateInTime) && lateIn <= maximumLateInTime && isBeforeHafDayInTime === true && isAfterHalfDayOutTime === true && halfDayWorkingHour === true ?
                                                            {
                                                                duty_status: salaryLimit === false && workingHours === true ? 2 : 1, // salary limit > 25000 and working hours should be > 6 hours
                                                                duty_desc: 'H',
                                                                lvereq_desc: 'H',
                                                                duty_remark: 'Early going Half day latein and late out'
                                                            } :
                                                            (earlyOut > 0 && earlyOut > maximumLateInTime) && lateIn > maximumLateInTime && isBeforeHafDayInTime === false ?
                                                                {
                                                                    duty_status: salaryLimit === false ? 1 : 1,
                                                                    duty_desc: 'H',
                                                                    lvereq_desc: 'H',
                                                                    duty_remark: 'in and out less tha half day time'
                                                                } :
                                                                { duty_status: salaryLimit === false ? 1 : 1, duty_desc: 'H', lvereq_desc: 'H', duty_remark: 'Holiday' }
            }
        } else {
            return holidayStatus === 1 ?
                { duty_status: 1, duty_desc: 'H', lvereq_desc: 'H', duty_remark: 'holiday' } :
                { duty_status: 0, duty_desc: 'A', lvereq_desc: 'A', duty_remark: 'Absent' }
        }
    } else {
        return shiftId === defaultShift && holidayStatus === 0 ? { duty_status: 0, duty_desc: 'A', lvereq_desc: 'A', duty_remark: 'no duty plan' } :
            shiftId === WoffShift ? { duty_status: 1, duty_desc: 'WOFF', lvereq_desc: 'WOFF', duty_remark: 'week off' } :
                shiftId === NightOffShift ? { duty_status: 1, duty_desc: 'NOFF', lvereq_desc: 'NOFF', duty_remark: 'night off' } :
                    shiftId === defaultShift && holidayStatus === 1 ? { duty_status: 1, duty_desc: 'H', lvereq_desc: 'H', duty_remark: 'holiday' } :
                        { duty_status: 0, duty_desc: 'A', lvereq_desc: 'A', duty_remark: 'no applicable' }
    }
}

//GET THE LATEIN 
export const getLateInTimeIntervel = async (punch_In, shift_in, punch_out, shift_out) => {

    if ((punch_In !== null && punch_In !== undefined && isValid(punch_In) === true) && (punch_out !== null && punch_out !== undefined && isValid(punch_out) === true)) {
        //HOURS WORKED
        const hoursWorked = differenceInMinutes(punch_out, punch_In)
        if (isAfter(punch_In, shift_in) === true) {
            //GET LATE IN TIME
            const getLateInMinits = differenceInMinutes(punch_In, shift_in)

            const getEarlyOutInMinits = differenceInMinutes(shift_out, punch_out)

            return { hrsWorked: hoursWorked, lateIn: getLateInMinits <= 0 ? 0 : getLateInMinits, earlyOut: getEarlyOutInMinits <= 0 ? 0 : getEarlyOutInMinits }

        } else if (isBefore(punch_out, shift_out) === true) {
            // GET EARLY OUT TIME
            const getEarlyOutInMinits = differenceInMinutes(shift_out, punch_out)
            const getLateInMinits = differenceInMinutes(punch_In, shift_in)
            return { hrsWorked: hoursWorked, lateIn: getLateInMinits <= 0 ? 0 : getLateInMinits, earlyOut: getEarlyOutInMinits <= 0 ? 0 : getEarlyOutInMinits }
        } else {
            const getEarlyOutInMinits = differenceInMinutes(shift_out, punch_out)
            const getLateInMinits = differenceInMinutes(punch_In, shift_in)

            return { hrsWorked: hoursWorked, lateIn: getLateInMinits <= 0 ? 0 : getLateInMinits, earlyOut: getEarlyOutInMinits <= 0 ? 0 : getEarlyOutInMinits };
        }
    } else {
        return { hrsWorked: 0, lateIn: 0, earlyOut: 0 };
    }
}

//PUNCH IN OUT MARKING SETTINGS
const punchInOutMapping = async (shiftMergedPunchMaster, employeeBasedPunchData) => {

    const crossDay = shiftMergedPunchMaster?.shft_cross_day;
    const shiftInTime = `${format(new Date(shiftMergedPunchMaster?.duty_day), 'yyyy-MM-dd')} ${format(new Date(shiftMergedPunchMaster?.shift_in), 'HH:mm')}`;
    const shiftOutTime = crossDay === 0 ? `${format(new Date(shiftMergedPunchMaster?.duty_day), 'yyyy-MM-dd')} ${format(new Date(shiftMergedPunchMaster?.shift_out), 'HH:mm')}` :
        `${format(addDays(new Date(shiftMergedPunchMaster?.duty_day), crossDay), 'yyyy-MM-dd')} ${format(new Date(shiftMergedPunchMaster?.shift_out), 'HH:mm')}`;

    //SHIFT MASTER DATA    
    const shiftIn = new Date(shiftMergedPunchMaster?.shift_in);
    const shiftOut = new Date(shiftMergedPunchMaster?.shift_out);
    const shiftInStart = new Date(shiftMergedPunchMaster?.shft_chkin_start);
    const shiftInEnd = new Date(shiftMergedPunchMaster?.shft_chkin_end);
    const shiftOutStart = new Date(shiftMergedPunchMaster?.shft_chkout_start);
    const shiftOutEnd = new Date(shiftMergedPunchMaster?.shft_chkout_end);

    //Diffrence in Check IN time Intervel in Hours
    const shiftInStartDiffer = differenceInHours(shiftIn, shiftInStart);
    const shiftInEndDiffer = differenceInHours(shiftInEnd, shiftIn);

    //Diffrence in Check OUT time Intervel in Hours
    const shiftOutStartDiffer = differenceInHours(shiftOut, shiftOutStart);
    const shiftOutEndDiffer = differenceInHours(shiftOutEnd, shiftOut);

    const checkInTIme = new Date(shiftInTime);
    const checkOutTime = new Date(shiftOutTime);

    const checkInStartTime = subHours(checkInTIme, shiftInStartDiffer);
    const checkInEndTime = addHours(checkInTIme, shiftInEndDiffer);

    const checkOutStartTime = subHours(checkOutTime, shiftOutStartDiffer)
    const checkOutEndTime = addHours(checkOutTime, shiftOutEndDiffer);

    const empPunchData = employeeBasedPunchData?.map((e) => new Date(e.punch_time));

    const inTimesArray = empPunchData?.filter((e) => (e >= checkInStartTime && e <= checkInEndTime))
    const outTimeArray = empPunchData?.filter((e) => (e >= checkOutStartTime && e <= checkOutEndTime))
    const inPunch = min(inTimesArray)
    const outPunch = max(outTimeArray)
    return {
        ...shiftMergedPunchMaster,
        punch_in: isValid(inPunch) === true ? format(inPunch, 'yyyy-MM-dd HH:mm') : null,
        punch_out: isValid(outPunch) === true ? format(outPunch, 'yyyy-MM-dd HH:mm') : null,
        shift_in: checkInTIme,
        shift_out: checkOutTime,
        shiftInStart: checkInStartTime,
        shiftInEnd: checkInEndTime,
        shiftOutStart: checkOutStartTime,
        shiftOutEnd: checkOutEndTime
    }
}

// F

export const processShiftPunchMarkingHrFunc = async (
    postData_getPunchData,
    punchaData, //PUNCH DATA
    empList, // EMPLOYEE LIST SECTION WISE
    shiftInformation, // SHIFT INFORMATION
    commonSettings, // COMMON SETTINGS
    holidayList, // HOLIDAY LIST
    empSalary // EMPLOYEE_SALARY
) => {
    const {
        cmmn_early_out, // Early going time interval
        cmmn_grace_period, // common grace period for late in time
        cmmn_late_in, //Maximum Late in Time for punch in after that direct HALF DAY 
        salary_above, //Salary limit for calculating the holiday double wages
        week_off_day, // week off SHIFT ID
        notapplicable_shift, //not applicable SHIFT ID
        default_shift, //default SHIFT ID
        noff, // night off SHIFT ID,
        max_late_day_count,
        halfday_time_count
    } = commonSettings; //COMMON SETTING
    //GET DUTY PLAN AND CHECK DUTY PLAN IS EXCIST OR NOT
    const getDutyPlan = await axioslogin.post("/attendCal/getDutyPlanBySection/", postData_getPunchData); //GET DUTY PLAN DAAT
    const { succes, shiftdetail } = getDutyPlan.data;
    if (succes === 1 && shiftdetail?.length > 0) {
        const dutyplanInfo = shiftdetail; //DUTY PLAN
        const dutyPlanSlno = dutyplanInfo?.map(e => e.plan_slno) //FIND THE DUTY PLAN SLNO
        const punch_master_data = await axioslogin.post("/attendCal/getPunchMasterDataSectionWise/", postData_getPunchData); //GET PUNCH MASTER DATA
        const { success, planData } = punch_master_data.data;
        if (success === 1 && planData?.length > 0) {
            const punchMasterData = planData; //PUNCHMSTER DATA
            return Promise.allSettled(
                punchMasterData?.map(async (data, index) => {
                    const sortedShiftData = shiftInformation?.find((e) => e.shft_slno === data.shift_id)// SHIFT DATA
                    const sortedSalaryData = empSalary?.find((e) => e.em_no === data.em_no) //SALARY DATA
                    const shiftMergedPunchMaster = {
                        ...data,
                        shft_chkin_start: sortedShiftData?.shft_chkin_start,
                        shft_chkin_end: sortedShiftData?.shft_chkin_end,
                        shft_chkout_start: sortedShiftData?.shft_chkout_start,
                        shft_chkout_end: sortedShiftData?.shft_chkout_end,
                        shft_cross_day: sortedShiftData?.shft_cross_day,
                        gross_salary: sortedSalaryData?.gross_salary,
                        earlyGoingMaxIntervl: cmmn_early_out,
                        gracePeriodInTime: cmmn_grace_period,
                        maximumLateInTime: cmmn_late_in,
                        salaryLimit: salary_above,
                        woff: week_off_day,
                        naShift: notapplicable_shift,
                        defaultShift: default_shift,
                        noff: noff,
                        holidayStatus: sortedShiftData?.holiday_status
                    }
                    const employeeBasedPunchData = punchaData?.filter((e) => e.emp_code == data.em_no)
                    //FUNCTION FOR MAPPING THE PUNCH IN AND OUT 
                    return await punchInOutMapping(shiftMergedPunchMaster, employeeBasedPunchData)
                })
            ).then((data) => {
                const punchMasterMappedData = data?.map((e) => e.value)
                return Promise.allSettled(
                    punchMasterMappedData?.map(async (val) => {
                        const holidayStatus = val.holiday_status;
                        const punch_In = val.punch_in === null ? null : new Date(val.punch_in);
                        const punch_out = val.punch_out === null ? null : new Date(val.punch_out);

                        const shift_in = new Date(val.shift_in);
                        const shift_out = new Date(val.shift_out);

                        //SALARY LINMIT
                        const salaryLimit = val.gross_salary > val.salaryLimit ? true : false;

                        const getLateInTime = await getLateInTimeIntervel(punch_In, shift_in, punch_out, shift_out)

                        const getAttendanceStatus = await getAttendanceCalculation(
                            punch_In,
                            shift_in,
                            punch_out,
                            shift_out,
                            cmmn_grace_period,
                            getLateInTime,
                            holidayStatus,
                            val.shift_id,
                            val.defaultShift,
                            val.naShift,
                            val.noff,
                            val.woff,
                            salaryLimit,
                            val.maximumLateInTime,
                            halfday_time_count
                        )
                        return {
                            punch_slno: val.punch_slno,
                            punch_in: val.punch_in,
                            punch_out: val.punch_out,
                            hrs_worked: (val.shift_id === week_off_day || val.shift_id === noff || val.shift_id === notapplicable_shift || val.shift_id === default_shift) ? 0 : getLateInTime?.hrsWorked,
                            late_in: (val.shift_id === week_off_day || val.shift_id === noff || val.shift_id === notapplicable_shift || val.shift_id === default_shift) ? 0 : getLateInTime?.lateIn,
                            early_out: (val.shift_id === week_off_day || val.shift_id === noff || val.shift_id === notapplicable_shift || val.shift_id === default_shift) ? 0 : getLateInTime?.earlyOut,
                            duty_status: getAttendanceStatus?.duty_status,
                            holiday_status: val.holiday_status,
                            leave_status: val.leave_status,
                            lvereq_desc: getAttendanceStatus?.lvereq_desc,
                            duty_desc: getAttendanceStatus?.duty_desc,
                            lve_tble_updation_flag: val.lve_tble_updation_flag
                        }
                    })
                ).then(async (element) => {
                    // REMOVE LEAVE REQUESTED DATA FROM THIS DATA
                    const processedData = element?.map((e) => e.value)?.filter((v) => v.lve_tble_updation_flag === 0)

                    // PUNCH MASTER UPDATION
                    const postDataForUpdatePunchMaster = {
                        postData_getPunchData: postData_getPunchData,
                        processedData: processedData,
                        max_late_day_count: max_late_day_count
                    }
                    const updatePunchMaster = await axioslogin.post("/attendCal/monthlyUpdatePunchMaster/", postDataForUpdatePunchMaster);
                    const { success, message, data } = updatePunchMaster.data;
                    if (success === 1) {
                        return { status: 1, message: "Punch Master Updated SuccessFully", errorMessage: '', punchMastData: data }
                    } else {
                        return { status: 0, message: "Error Processing and Updating Punch Master ! contact IT", errorMessage: message, punchMastData: [] }
                    }
                })
                // return { status: 1, message: "result", data: e }
            })
        } else {
            return { status: 0, message: "Punch Master Data Not Found ! contact IT", errorMessage: '', punchMastData: [] }
        }
    } else {
        return { status: 0, message: "Duty Plan Not Done! contact IT", errorMessage: '', punchMastData: [] }
    }
}

//FIND AND CHECK THE HOLIDAY STATUS 
const holidayStatus = async (e, array, holiday_policy_count) => {
    const sortedArray = array.sort((a, b) => new Date(a.duty_day) - new Date(b.duty_day))
    if (e.duty_desc === 'H') {
        const holidayFIlterArray = sortedArray.filter((val) => subDays(new Date(val.duty_day), holiday_policy_count) <= new Date(e.duty_day) && addDays(new Date(val.duty_day), holiday_policy_count) >= new Date(e.duty_day))?.map((r) => r.duty_desc)
        //for checking absent -> A H A
        const Absent = holidayFIlterArray?.filter((m) => m === 'A').length
        // for checking LWP -> LWP H LWP
        const lwp = holidayFIlterArray?.filter((m) => m === 'LWP').length
        // for checking ESI -> ESI H ESI
        const ESI = holidayFIlterArray?.filter((m) => m === 'ESI').length
        //both absent and lwp -> LWP H A || A H LWP
        const absentlwp = holidayFIlterArray?.filter((m) => m === 'A' || m === 'LWP' || m === 'ESI' || m === 'LOP').length
        return await Absent === 2 ? 'A' : lwp === 2 ? 'A' : absentlwp === 2 ? 'A' : ESI === 2 ? 'A' : 'H'
    } else {
        return e.duty_desc
    };
}


const weekOffStatus = async (e, idx, array, weekoff_policy_max_count, weekoff_policy_min_count, fromDate) => {
    const sortedArray = array.sort((a, b) => new Date(a.duty_day) - new Date(b.duty_day))
    if (fromDate <= e.duty_day && e.duty_desc === 'WOFF') {
        const policyLimit = weekoff_policy_max_count - weekoff_policy_min_count;
        const toIndex = idx - 1;
        const fromIndex = idx - weekoff_policy_max_count;
        const FilterArray = sortedArray.filter((val, index) => fromIndex <= index && index <= toIndex)?.map((e) => e.duty_desc)
        const filterBasedOnDutyDesc = FilterArray?.filter((dutydesc) => dutydesc === 'LWP' || dutydesc === 'A' || dutydesc === 'ESI' || dutydesc === 'LOP' || dutydesc === 'WOFF' || dutydesc === 'ML').length
        return await filterBasedOnDutyDesc > policyLimit ? 'A' : 'WOFF'
    } else {
        return e.duty_desc
    }
}

export const punchInOutChecking = async (shiftMergedPunchMaster, employeeBasedPunchData) => {

    const crossDay = shiftMergedPunchMaster?.shft_cross_day;
    const shiftInTime = `${format(new Date(shiftMergedPunchMaster?.duty_day), 'yyyy-MM-dd')} ${format(new Date(shiftMergedPunchMaster?.shift_in), 'HH:mm')}`;
    const shiftOutTime = crossDay === 0 ? `${format(new Date(shiftMergedPunchMaster?.duty_day), 'yyyy-MM-dd')} ${format(new Date(shiftMergedPunchMaster?.shift_out), 'HH:mm')}` :
        `${format(addDays(new Date(shiftMergedPunchMaster?.duty_day), crossDay), 'yyyy-MM-dd')} ${format(new Date(shiftMergedPunchMaster?.shift_out), 'HH:mm')}`;

    //SHIFT MASTER DATA    
    const shiftIn = new Date(shiftMergedPunchMaster?.shift_in);
    const shiftOut = new Date(shiftMergedPunchMaster?.shift_out);
    const shiftInStart = new Date(shiftMergedPunchMaster?.shft_chkin_start);
    const shiftInEnd = new Date(shiftMergedPunchMaster?.shft_chkin_end);
    const shiftOutStart = new Date(shiftMergedPunchMaster?.shft_chkout_start);
    const shiftOutEnd = new Date(shiftMergedPunchMaster?.shft_chkout_end);

    //Diffrence in Check IN time Intervel in Hours
    const shiftInStartDiffer = differenceInHours(shiftIn, shiftInStart);
    const shiftInEndDiffer = differenceInHours(shiftInEnd, shiftIn);

    //Diffrence in Check OUT time Intervel in Hours
    const shiftOutStartDiffer = differenceInHours(shiftOut, shiftOutStart);
    const shiftOutEndDiffer = differenceInHours(shiftOutEnd, shiftOut);

    const checkInTIme = new Date(shiftInTime);
    const checkOutTime = new Date(shiftOutTime);

    const checkInStartTime = subHours(checkInTIme, shiftInStartDiffer);
    const checkInEndTime = addHours(checkInTIme, shiftInEndDiffer);

    const checkOutStartTime = subHours(checkOutTime, shiftOutStartDiffer)
    const checkOutEndTime = addHours(checkOutTime, shiftOutEndDiffer);

    const empPunchData = employeeBasedPunchData?.map((e) => new Date(e.punch_time));

    const inTimesArray = empPunchData?.filter((e) => (e >= checkInStartTime && e <= checkInEndTime))
    const outTimeArray = empPunchData?.filter((e) => (e >= checkOutStartTime && e <= checkOutEndTime))
    const inPunch = min(inTimesArray)
    const outPunch = max(outTimeArray)

    return {
        ...shiftMergedPunchMaster,
        punch_in: isValid(inPunch) === true ? format(inPunch, 'yyyy-MM-dd HH:mm') : null,
        punch_out: isValid(outPunch) === true ? format(outPunch, 'yyyy-MM-dd HH:mm') : null,
        shift_in: checkInTIme,
        shift_out: checkOutTime,
        shiftInStart: checkInStartTime,
        shiftInEnd: checkInEndTime,
        shiftOutStart: checkOutStartTime,
        shiftOutEnd: checkOutEndTime
    }
}

export const attendanceViewPunchFunc = async (
    postData_getPunchData,
    punchaData, //PUNCH DATA
    empList, // EMPLOYEE LIST SECTION WISE
    shiftInformation, // SHIFT INFORMATION
    commonSettings, // COMMON SETTINGS
    holidayList, // HOLIDAY LIST
    empSalary // EMPLOYEE_SALARY
) => {
    const {
        cmmn_early_out, // Early going time interval
        cmmn_grace_period, // common grace period for late in time
        cmmn_late_in, //Maximum Late in Time for punch in after that direct HALF DAY 
        salary_above, //Salary limit for calculating the holiday double wages
        week_off_day, // week off SHIFT ID
        notapplicable_shift, //not applicable SHIFT ID
        default_shift, //default SHIFT ID
        noff, // night off SHIFT ID,
        max_late_day_count,
        halfday_time_count
    } = commonSettings; //COMMON SETTING
    //GET DUTY PLAN AND CHECK DUTY PLAN IS EXCIST OR NOT
    const getDutyPlan = await axioslogin.post("/attendCal/getDutyPlanBySection/", postData_getPunchData); //GET DUTY PLAN DAAT
    const { succes, shiftdetail } = getDutyPlan.data;
    if (succes === 1 && shiftdetail?.length > 0) {
        const dutyplanInfo = shiftdetail; //DUTY PLAN
        const dutyPlanSlno = dutyplanInfo?.map(e => e.plan_slno) //FIND THE DUTY PLAN SLNO
        const punch_master_data = await axioslogin.post("/attendCal/getPunchMasterDataSectionWise/", postData_getPunchData); //GET PUNCH MASTER DATA
        const { success, planData } = punch_master_data.data;
        if (success === 1 && planData?.length > 0) {
            const punchMasterData = planData; //PUNCHMSTER DATA
            return Promise.allSettled(
                punchMasterData?.map(async (data, index) => {
                    const sortedShiftData = shiftInformation?.find((e) => e.shft_slno === data.shift_id)// SHIFT DATA
                    const sortedSalaryData = empSalary?.find((e) => e.em_no === data.em_no) //SALARY DATA
                    const shiftMergedPunchMaster = {
                        ...data,
                        shft_chkin_start: sortedShiftData?.shft_chkin_start,
                        shft_chkin_end: sortedShiftData?.shft_chkin_end,
                        shft_chkout_start: sortedShiftData?.shft_chkout_start,
                        shft_chkout_end: sortedShiftData?.shft_chkout_end,
                        shft_cross_day: sortedShiftData?.shft_cross_day,
                        gross_salary: sortedSalaryData?.gross_salary,
                        earlyGoingMaxIntervl: cmmn_early_out,
                        gracePeriodInTime: cmmn_grace_period,
                        maximumLateInTime: cmmn_late_in,
                        salaryLimit: salary_above,
                        woff: week_off_day,
                        naShift: notapplicable_shift,
                        defaultShift: default_shift,
                        noff: noff,
                        holidayStatus: sortedShiftData?.holiday_status
                    }
                    const employeeBasedPunchData = punchaData?.filter((e) => e.emp_code == data.em_no)
                    //FUNCTION FOR MAPPING THE PUNCH IN AND OUT 
                    return await punchInOutMapping(shiftMergedPunchMaster, employeeBasedPunchData)
                })
            ).then((data) => {
                const punchMasterMappedData = data?.map((e) => e.value)
                return Promise.allSettled(
                    punchMasterMappedData?.map(async (val) => {
                        const holidayStatus = val.holiday_status;
                        const punch_In = val.punch_in === null ? null : new Date(val.punch_in);
                        const punch_out = val.punch_out === null ? null : new Date(val.punch_out);

                        const shift_in = new Date(val.shift_in);
                        const shift_out = new Date(val.shift_out);

                        //SALARY LINMIT
                        const salaryLimit = val.gross_salary > val.salaryLimit ? true : false;

                        const getLateInTime = await getLateInTimeIntervel(punch_In, shift_in, punch_out, shift_out)

                        const getAttendanceStatus = await getAttendanceCalculation(
                            punch_In,
                            shift_in,
                            punch_out,
                            shift_out,
                            cmmn_grace_period,
                            getLateInTime,
                            holidayStatus,
                            val.shift_id,
                            val.defaultShift,
                            val.naShift,
                            val.noff,
                            val.woff,
                            salaryLimit,
                            val.maximumLateInTime,
                            halfday_time_count
                        )
                        return {
                            punch_slno: val.punch_slno,
                            punch_in: val.punch_in,
                            punch_out: val.punch_out,
                            hrs_worked: (val.shift_id === week_off_day || val.shift_id === noff || val.shift_id === notapplicable_shift || val.shift_id === default_shift) ? 0 : getLateInTime?.hrsWorked,
                            late_in: (val.shift_id === week_off_day || val.shift_id === noff || val.shift_id === notapplicable_shift || val.shift_id === default_shift) ? 0 : getLateInTime?.lateIn,
                            early_out: (val.shift_id === week_off_day || val.shift_id === noff || val.shift_id === notapplicable_shift || val.shift_id === default_shift) ? 0 : getLateInTime?.earlyOut,
                            duty_status: getAttendanceStatus?.duty_status,
                            holiday_status: val.holiday_status,
                            leave_status: val.leave_status,
                            lvereq_desc: getAttendanceStatus?.lvereq_desc,
                            duty_desc: getAttendanceStatus?.duty_desc,
                            lve_tble_updation_flag: val.lve_tble_updation_flag
                        }
                    })
                ).then(async (element) => {
                    // REMOVE LEAVE REQUESTED DATA FROM THIS DATA
                    const processedData = element?.map((e) => e.value)?.filter((v) => v.lve_tble_updation_flag === 0)

                    const updatePunchMaster = await axioslogin.post("/attendCal/updatePunchMaster/", processedData);
                    const { success, message } = updatePunchMaster.data;
                    if (success === 1) {

                        const punch_data = await axioslogin.post("/attendCal/getPunchReportLCCount/", postData_getPunchData); // added on 27/06/2024 10:00 PM (Ajith)
                        const { success: lcSuccess, data: lcData } = punch_data.data;

                        if (lcSuccess === 1 && lcData !== null && lcData !== undefined && lcData.length > 0) {

                            const filterEMNO = [...new Set(lcData?.map((e) => e.em_no))]
                            // calculate and update the calculated LOP count 
                            let lcCount = 0;
                            const filterLcData = filterEMNO
                                ?.map((el) => {
                                    return {
                                        emNo: el,
                                        lcArray: lcData?.filter((e) => e.em_no === el)
                                    }
                                })
                                ?.filter((e) => e.lcArray?.length > 3)
                                ?.map((val) => {
                                    const newArray = {
                                        emno: val.emNo,
                                        punMasterArray: val.lcArray?.map(item => {
                                            if (item.duty_desc === "LC" && lcCount < max_late_day_count) {
                                                lcCount++;
                                                return item;
                                            } else if (item.duty_desc === "LC" && lcCount >= max_late_day_count) {
                                                return { ...item, lvereq_desc: "HD" };
                                            } else {
                                                return item;
                                            }
                                        })
                                    }
                                    lcCount = 0
                                    return newArray
                                })
                                ?.map((e) => e.punMasterArray)
                                ?.flat()
                                ?.filter((e) => e.lvereq_desc === 'HD' && e.duty_desc === 'LC')
                                ?.map((e) => e.punch_slno)

                            //console.log(filterLcData)
                            //UPDATE IN TO PUNCH MASTER TABLE 
                            if (filterLcData !== null && filterLcData !== undefined && filterLcData?.length > 0) {
                                const result = await axioslogin.post("/attendCal/updateLCPunchMaster/", filterLcData); // added on 27/06/2024 10:00 PM (Ajith)
                                const { success } = result.data;
                                if (success === 1) {
                                    const punch_master_data = await axioslogin.post("/attendCal/getPunchMasterDataSectionWise/", postData_getPunchData); //GET PUNCH MASTER DATA
                                    const { success, planData } = punch_master_data.data;
                                    if (success === 1) {
                                        return { status: 1, message: "Punch Master Updated SuccessFully", errorMessage: '', punchMastData: planData }
                                    } else {
                                        return { status: 0, message: "Error Processing and Updating Punch Master ! contact IT", errorMessage: message, punchMastData: [] }
                                    }
                                } else {
                                    return { status: 0, message: "Error Processing and Updating Punch Master ! contact IT", errorMessage: message }
                                }
                            }
                            else {
                                const punch_master_data = await axioslogin.post("/attendCal/getPunchMasterDataSectionWise/", postData_getPunchData); //GET PUNCH MASTER DATA
                                const { success, planData } = punch_master_data.data;
                                if (success === 1) {
                                    return { status: 1, message: "Punch Master Updated SuccessFully", errorMessage: '', punchMastData: planData }
                                } else {
                                    return { status: 0, message: "Error Processing and Updating Punch Master ! contact IT", errorMessage: message, punchMastData: [] }
                                }
                            }

                        } else {
                            const punch_master_data = await axioslogin.post("/attendCal/getPunchMasterDataSectionWise/", postData_getPunchData); //GET PUNCH MASTER DATA
                            const { success, planData } = punch_master_data.data;
                            if (success === 1) {
                                return { status: 1, message: "Punch Master Updated SuccessFully", errorMessage: '', punchMastData: planData }
                            } else {
                                return { status: 0, message: "Error Processing and Updating Punch Master ! contact IT", errorMessage: message, punchMastData: [] }
                            }
                        }
                    } else {
                        return { status: 0, message: "Error Processing and Updating Punch Master ! contact IT", errorMessage: message }
                    }
                })
                // return { status: 1, message: "result", data: e }
            })
        } else {
            return { status: 0, message: "Punch Master Data Not Found ! contact IT", errorMessage: '', punchMastData: [] }
        }
    } else {
        return { status: 0, message: "Duty Plan Not Done! contact IT", errorMessage: '', punchMastData: [] }
    }
}