import { addDays, addHours, addMinutes, differenceInHours, differenceInMinutes, format, isAfter, isBefore, isValid, max, min, subHours } from "date-fns";
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
        noff // night off SHIFT ID
    } = commonSettings; //COMMON SETTING
    //GET DUTY PLAN AND CHECK DUTY PLAN IS EXCIST OR NOT
    const getDutyPlan = await axioslogin.post("/attendCal/getDutyPlanBySection/", postData_getPunchData); //GET DUTY PLAN DAAT
    const { succes, shiftdetail } = getDutyPlan.data;
    if (succes === 1) {
        const dutyplanInfo = shiftdetail; //DUTY PLAN
        const dutyPlanSlno = dutyplanInfo?.map(e => e.plan_slno) //FIND THE DUTY PLAN SLNO
        const punch_master_data = await axioslogin.post("/attendCal/getPunchMasterDataSectionWise/", postData_getPunchData); //GET PUNCH MASTER DATA
        const { success, planData } = punch_master_data.data;
        if (success === 1 && planData?.length > 0) {
            const punchMasterData = planData; //PUNCHMSTER DATA
            return Promise.allSettled(
                punchMasterData?.map(async (data, index) => {
                    // console.log(data)
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
                            val.maximumLateInTime
                        )
                        return {
                            punch_slno: val.punch_slno,
                            punch_in: val.punch_in,
                            punch_out: val.punch_out,
                            hrs_worked: getLateInTime?.hrsWorked,
                            late_in: getLateInTime?.lateIn,
                            early_out: getLateInTime?.earlyOut,
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
                    // console.log(processedData)
                    const updatePunchMaster = await axioslogin.post("/attendCal/updatePunchMaster/", processedData);
                    const { success, message } = updatePunchMaster.data;
                    if (success === 1) {
                        // PUNCH MARKING HR TABLE UPDATION
                        // console.log(postData_getPunchData)
                        const updatePunchMarkingHR = await axioslogin.post("/attendCal/updatePunchMarkingHR/", postData_getPunchData);
                        const { sus } = updatePunchMarkingHR.data;
                        if (sus === 1) {
                            // DUTY PLAN UPDATION
                            // console.log(dutyPlanSlno)
                            const updateDutyPlanTable = await axioslogin.post("/attendCal/updateDutyPlanTable/", dutyPlanSlno);
                            const { susc, message } = updateDutyPlanTable.data;
                            if (susc === 1) {
                                return { status: 1, message: "Punch Master Updated SuccessFully", errorMessage: '' }
                            } else {
                                return { status: 0, message: "Error Updating Duty Plan ! contact IT", errorMessage: message }
                            }
                        } else {
                            return { status: 0, message: "Error Updating PunchMaster HR  ! contact IT", errorMessage: message }
                        }
                    } else {
                        return { status: 0, message: "Error Processing and Updating Punch Master ! contact IT", errorMessage: message }
                    }
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

const getAttendanceCalculation = async (
    punch_In, shift_in, punch_out, shift_out, cmmn_grace_period, getLateInTime, holidayStatus, shiftId, defaultShift, NAShift, NightOffShift, WoffShift, salaryLimit, maximumLateInTime
) => {
    const { hrsWorked, lateIn, earlyOut } = getLateInTime;
    //SHIFT ID CHECKING
    // ( !== default shift , !== not applicable shift , !== Night off , !== week off) 
    // if true ==> ( its a working shift ) 
    const checkShiftIdStatus = (shiftId !== defaultShift && shiftId !== NAShift && shiftId !== NightOffShift && shiftId !== WoffShift)
    //HALF DAY CALCULATION
    const totalShiftInMInits = differenceInMinutes(new Date(shift_out), new Date(shift_in))
    const halfDayInMinits = totalShiftInMInits / 2;
    const halfDayStartTime = addMinutes(shift_in, halfDayInMinits - 1)

    if (checkShiftIdStatus === true) {
        // This condition not included  ( !== default shift , !== not applicable shift , !== Night off , !== week off) 
        if (isValid(punch_In) === true && isValid(punch_out) === true) {
            // *****EMPLOYEE HAVE BOTH THE PUNCH******

            const isBeforeHafDayInTime = isBefore(punch_In, halfDayStartTime); //for check -> punch in before half day start in time
            const isAfterHalfDayOutTime = isAfter(punch_out, halfDayStartTime)

            const workingHours = differenceInHours(new Date(punch_out), new Date(punch_In)) > 6;
            const halfDayWorkingHour = differenceInHours(new Date(punch_out), new Date(punch_In)) >= 4;
            //  isBeforeHafDayInTime === true ==> punch in time greater than half in time (full day not half day)
            if (holidayStatus === 0) {
                // HOLIDAY === NO

                // { out time == 0 minit  ~~ intime <= 30 minits ~~  in time before half day in time === true  } 
                return earlyOut === 0 && lateIn <= maximumLateInTime && isBeforeHafDayInTime === true ?
                    { duty_status: 1, duty_desc: 'P', lvereq_desc: 'P', duty_remark: 'Present' } :

                    // { out time == 0 minit  ~~ intime greater than 30 minits ~~  in time before half day in time === true  } 
                    earlyOut === 0 && lateIn > maximumLateInTime && isBeforeHafDayInTime === true ?
                        { duty_status: 0.5, duty_desc: 'HD', lvereq_desc: 'LIHD', duty_remark: 'Late in half day after 30 minits' } :

                        // { out time == 0 minit  ~~ intime greater than 30 minits ~~  in time before half day in time === false  } 
                        earlyOut === 0 && lateIn > maximumLateInTime && isBeforeHafDayInTime === false ?
                            { duty_status: 0, duty_desc: 'A', lvereq_desc: 'A', duty_remark: 'Late in and punch in after half day limit' } :

                            // { out time greater than 0 minit  ~~ early out less than 30 minits ~~ intime lessthan or equal to 30  ~~ intime  and outtime should be before and after half day in time  } 
                            (earlyOut > 0 && earlyOut <= maximumLateInTime) && lateIn <= maximumLateInTime && isBeforeHafDayInTime === true && isAfterHalfDayOutTime === true ?
                                { duty_status: 0.5, duty_desc: 'HD', lvereq_desc: 'EGHD', duty_remark: 'Early going Half day' } :

                                // { outtime greater than 0 minit  ~~ early out less than 30 minits ~~ intime greater than 30  ~~ intime  and outtime should be before and after half day in time  } 
                                (earlyOut > 0 && earlyOut < maximumLateInTime) && lateIn > maximumLateInTime && isBeforeHafDayInTime === true && isAfterHalfDayOutTime === true && halfDayWorkingHour === true ?
                                    { duty_status: 0.5, duty_desc: 'HD', lvereq_desc: 'IEHD', duty_remark: 'Half day latein and late out' } :

                                    // { outtime greater than 0 minit  ~~ early out greater than 30 minits ~~ intime greater than or equal 30  ~~ intime  and outtime should be before and after half day in time  } 
                                    (earlyOut > 0 && earlyOut > maximumLateInTime) && lateIn <= maximumLateInTime && isBeforeHafDayInTime === true && isAfterHalfDayOutTime === true && halfDayWorkingHour === true ?
                                        { duty_status: 0.5, duty_desc: 'HD', lvereq_desc: 'EGHD', duty_remark: 'Early going Half day latein and late out' } :

                                        (earlyOut > 0 && earlyOut > maximumLateInTime) && lateIn > maximumLateInTime && isBeforeHafDayInTime === false ?
                                            { duty_status: 0, duty_desc: 'A', lvereq_desc: 'A', duty_remark: 'in and out less tha half day time' } :
                                            { duty_status: 0, duty_desc: 'A', lvereq_desc: 'LOP', duty_remark: 'Lose off Pay' }

            } else {
                // HOLIDAY === YES
                return earlyOut === 0 && lateIn <= maximumLateInTime && isBeforeHafDayInTime === true ?
                    { duty_status: salaryLimit === false ? 2 : 1, duty_desc: 'HP', lvereq_desc: 'HP', duty_remark: 'holiday Present' } :
                    earlyOut === 0 && lateIn > maximumLateInTime && isBeforeHafDayInTime === true ?
                        {
                            duty_status: salaryLimit === false && workingHours === true ? 2 : 1,// salary limit > 25000 and working hours should be > 6 hours
                            duty_desc: 'HHD',
                            lvereq_desc: 'HLIHD',
                            duty_remark: 'Late in half day after 30 minits'
                        } :
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
                                    duty_desc: 'HHD',
                                    lvereq_desc: 'HEGHD',
                                    duty_remark: 'Early going Half day'
                                } :
                                (earlyOut > 0 && earlyOut < maximumLateInTime) && lateIn > maximumLateInTime && isBeforeHafDayInTime === true && isAfterHalfDayOutTime === true && halfDayWorkingHour === true ?
                                    {
                                        duty_status: salaryLimit === false && workingHours === true ? 2 : 1,
                                        duty_desc: 'HD',
                                        lvereq_desc: 'IEHD',
                                        duty_remark: 'Half day latein and late out'
                                    } :
                                    // (earlyOut > 0 && earlyOut < maximumLateInTime) && lateIn > maximumLateInTime && isBeforeHafDayInTime === true ?
                                    (earlyOut > 0 && earlyOut > maximumLateInTime) && lateIn <= maximumLateInTime && isBeforeHafDayInTime === true && isAfterHalfDayOutTime === true && halfDayWorkingHour === true ?
                                        {
                                            duty_status: salaryLimit === false && workingHours === true ? 2 : 1, // salary limit > 25000 and working hours should be > 6 hours
                                            duty_desc: 'HHD',
                                            lvereq_desc: 'HEGHD',
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
        return shiftId === defaultShift ? { duty_status: 0, duty_desc: 'A', lvereq_desc: 'A', duty_remark: 'no duty plan' } :
            shiftId === WoffShift ? { duty_status: 1, duty_desc: 'WOFF', lvereq_desc: 'WOFF', duty_remark: 'week off' } :
                shiftId === NightOffShift ? { duty_status: 1, duty_desc: 'NOFF', lvereq_desc: 'NOFF', duty_remark: 'night off' } :
                    { duty_status: 0, duty_desc: 'A', lvereq_desc: 'A', duty_remark: 'no applicable' }
    }
}

//GET THE LATEIN 
const getLateInTimeIntervel = async (punch_In, shift_in, punch_out, shift_out) => {

    if (isValid(punch_In) === true && isValid(punch_out) === true) {
        //HOURS WORKED
        const hoursWorked = differenceInMinutes(punch_out, punch_In)
        if (isAfter(punch_In, shift_in) === true) {
            //GET LATE IN TIME
            const getLateInMinits = differenceInMinutes(punch_In, shift_in)
            return { hrsWorked: hoursWorked, lateIn: getLateInMinits, earlyOut: 0 }

        } else if (isBefore(punch_out, shift_out) === true) {
            // GET EARLY OUT TIME
            const getEarlyOutInMinits = differenceInMinutes(shift_out, punch_out)
            return { hrsWorked: hoursWorked, lateIn: 0, earlyOut: getEarlyOutInMinits }
        } else {
            return { hrsWorked: hoursWorked, lateIn: 0, earlyOut: 0 };
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


