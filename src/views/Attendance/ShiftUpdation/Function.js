import {
    addDays, addHours, addMinutes, differenceInHours, differenceInMinutes, format, formatDuration, intervalToDuration,
    isAfter, isBefore, isEqual, isValid, max, min, subDays, subHours, subMinutes
} from "date-fns";
import moment from "moment";
import { axioslogin } from "src/views/Axios/Axios";
import { getPunchMasterData } from "src/redux/actions/Common.Action";


const CaluculatePunchinandOut = async (punchData, shiftdetail, holidaydata, cmmn_early_out, cmmn_grace_period, cmmn_late_in,
    //cmmn_late_in_grace, cmmn_early_out_grace,
    gross_salary, punchMaster, InsertedPunchMasterData, shiftData, salary_above,
    week_off_day, notapplicable_shift, default_shift, noff) => {

    const punchTimeData = punchData?.map(val => new Date(val.punch_time))

    const result = await punchMaster?.map((val) => {
        //FIND THE CROSS DAY
        const crossDay = shiftData?.find(shft => shft.shft_slno === val.shift_id);
        const crossDayStat = crossDay?.shft_cross_day ?? 0;
        //SHIFT TIME IN / OUT
        let shiftIn = `${format(new Date(val.duty_day), 'yyyy-MM-dd')} ${format(new Date(val.shift_in), 'HH:mm')}`;
        let shiftOut = crossDayStat === 0 ? `${format(new Date(val.duty_day), 'yyyy-MM-dd')} ${format(new Date(val.shift_out), 'HH:mm')}` :
            `${format(addDays(new Date(val.duty_day), 1), 'yyyy-MM-dd')} ${format(new Date(val.shift_out), 'HH:mm')}`;

        let checkinStart = `${format(new Date(shiftIn), 'yyyy-MM-dd')} ${format(new Date(crossDay?.shft_chkin_start), 'HH:mm')}`;
        let checkinEnd = `${format(new Date(shiftIn), 'yyyy-MM-dd')} ${format(new Date(crossDay?.shft_chkin_end), 'HH:mm')}`;

        let checkOutStart = `${format(new Date(shiftOut), 'yyyy-MM-dd')} ${format(new Date(crossDay?.shft_chkout_start), 'HH:mm')}`;
        let checkOutEnd = `${format(new Date(shiftOut), 'yyyy-MM-dd')} ${format(new Date(crossDay?.shft_chkout_end), 'HH:mm')}`;

        const checkInTimeVale = format(new Date(checkinStart), 'HH')
        const incheckStart = checkInTimeVale > 20
        const checkinStartTime = `${format(subDays(new Date(val.duty_day), 1), 'yyyy-MM-dd')} ${format(new Date(checkinStart), 'HH:mm')}`

        const checkoutTimeVale = format(new Date(checkOutStart), 'HH')
        const outcheckStart = checkoutTimeVale > 20
        const checkoutStartTime = `${format(subDays(new Date(val.duty_day), 1), 'yyyy-MM-dd')} ${format(new Date(checkOutStart), 'HH:mm')}`

        const inTimeVale = format(new Date(checkinEnd), 'HH')
        const incheck = inTimeVale < 8
        const checkinEndTime = `${format(addDays(new Date(val.duty_day), 1), 'yyyy-MM-dd')} ${format(new Date(checkinEnd), 'HH:mm')}`

        const endTimeVale = format(new Date(checkOutEnd), 'HH')
        const check = endTimeVale < 8
        const checkOutEndTime = `${format(addDays(new Date(val.duty_day), 1), 'yyyy-MM-dd')} ${format(new Date(checkOutEnd), 'HH:mm')}`

        const punchIn = incheck === true ? punchTimeData?.find(val => new Date(val) >= new Date(checkinStart) && new Date(val) <= new Date(checkinEndTime)) :
            incheckStart === true ? punchTimeData?.find(val => new Date(val) >= new Date(checkinStartTime) && new Date(val) <= new Date(checkinEnd)) :
                punchTimeData?.find(val => new Date(val) >= new Date(checkinStart) && new Date(val) <= new Date(checkinEnd))


        const punchOut = check === true ? punchTimeData?.findLast(val => new Date(val) >= new Date(checkOutStart) && new Date(val) <= new Date(checkOutEndTime))
            : outcheckStart === true ? punchTimeData?.findLast(val => new Date(val) >= new Date(checkoutStartTime) && new Date(val) <= new Date(checkOutEnd))
                : punchTimeData?.findLast(val => new Date(val) >= new Date(checkOutStart) && new Date(val) <= new Date(checkOutEnd))

        // GET THE HOURS WORKED IN MINITS
        let interVal = intervalToDuration({
            start: isValid(new Date(punchIn)) ? new Date(punchIn) : 0,
            end: isValid(new Date(punchOut)) ? new Date(punchOut) : 0
        })

        // CALCULATE THE LATE AND EARLY GO TIME 
        const CaluculateLateInOut = (isValid(new Date(shiftIn)) && isValid(new Date(shiftOut))) && (isValid(new Date(punchIn)) && isValid(new Date(punchOut))) ?
            { lateIn: differenceInMinutes(new Date(punchIn), new Date(shiftIn)), earlyOut: differenceInMinutes(new Date(shiftOut), new Date(punchOut)) }
            : { lateIn: 0, earlyOut: 0 };

        const HoliDay = holidaydata.find((holi) => holi.hld_date === val.duty_day)


        //Grace period calculation
        const relaxTime = format(addMinutes(new Date(shiftIn), cmmn_grace_period), 'yyyy-MM-dd H:mm:ss')
        const lateCommon = format(addMinutes(new Date(shiftIn), cmmn_late_in), 'yyyy-MM-dd H:mm:ss')

        //checking punch in before 30 minute and grace period
        const CheckGraceIn = isEqual(new Date(relaxTime), new Date(punchIn)) ||
            isBefore(new Date(punchIn), new Date(relaxTime)) ? 1 :
            isAfter(new Date(punchIn), new Date(relaxTime)) &&
                isBefore(new Date(punchIn), new Date(lateCommon)) ? 2 :
                isAfter(new Date(punchIn), new Date(lateCommon)) ? 3 : 0

        //for early punch out before shift out
        const earlyGo = format(subMinutes(new Date(shiftOut), cmmn_early_out), 'yyyy-MM-dd H:mm')
        const PunchOutOnlyMM = format(new Date(val.punch_out), 'yyyy-MM-dd H:mm')

        const early = isEqual(new Date(earlyGo), new Date(PunchOutOnlyMM)) ||
            isAfter(new Date(punchOut), new Date(earlyGo)) ? 1
            : isValid(new Date(punchOut)) && isBefore(new Date(punchOut), new Date(earlyGo)) ? 2 : 0

        // if (val.shift_id === week_off_day) {
        //     const calculateNoWorkday = async (duty_day, wDay, emno, punch_slno) => {
        //         const getpunchFromTo = {
        //             fromDate: wDay,
        //             toDate: duty_day,
        //             em_no: emno
        //         }
        //         const punchmastdata = await axioslogin.post("/attendCal/getPunchMastDataCheckWoff/", getpunchFromTo);
        //         const { success, punchCheckdata } = punchmastdata.data;

        //         if (success === 1) {
        //             const presentdata = punchCheckdata?.filter(val => val.duty_status === 1)
        //             const count = presentdata.length
        //             if (count < 4) {

        //                 const postdata = {
        //                     punch_slno: punch_slno,
        //                     duty_status: 0,
        //                     duty_desc: "A"
        //                 }
        //                 await axioslogin.post("/attendCal/updatePunchMasWoff/", postdata);
        //             }
        //         }
        //     }

        //     const weekDay = subDays(new Date(val.duty_day), 6)
        //     const wDay = format(new Date(weekDay), 'yyyy-MM-dd')
        //     calculateNoWorkday(val.duty_day, wDay, val.em_no, val.punch_slno);
        // }

        return {
            duty_day: val.duty_day,
            em_no: val.em_no,
            emp_id: val.emp_id,
            hrs_worked: isValid(new Date(punchIn)) && isValid(new Date(punchOut)) ? differenceInMinutes(new Date(punchOut), new Date(punchIn)) : 0,
            minitsInWrkd: formatDuration({ hours: interVal.hours, minutes: interVal.minutes }),
            punch_in: isValid(new Date(punchIn)) ? format(new Date(punchIn), 'yyyy-MM-dd HH:mm') : null,
            punch_out: isValid(new Date(punchOut)) ? format(new Date(punchOut), 'yyyy-MM-dd HH:mm') : null,
            punch_slno: val.punch_slno,
            shift_id: val.shift_id,
            shift_in: (val.shift_id === default_shift || val.shift_id === notapplicable_shift || val.shift_id === week_off_day) ? crossDay?.shft_desc : moment(shiftIn).format('DD-MM-YYYY HH:mm'),
            shift_out: (val.shift_id === default_shift || val.shift_id === notapplicable_shift || val.shift_id === week_off_day) ? crossDay?.shft_desc : moment(shiftOut).format('DD-MM-YYYY HH:mm'),
            lateIn: CaluculateLateInOut.lateIn > 0 ? CaluculateLateInOut.lateIn : 0,
            earlyOut: CaluculateLateInOut.earlyOut > 0 ? CaluculateLateInOut.earlyOut : 0,
            duty_status: CheckGraceIn === 1 && early === 1 && HoliDay !== undefined && gross_salary <= salary_above ? 2 :
                CheckGraceIn === 1 && early === 1 && HoliDay !== undefined && gross_salary > salary_above ? 1 :
                    CheckGraceIn === 3 && early === 1 && HoliDay !== undefined ? 1 :
                        CheckGraceIn === 1 && early === 1 && HoliDay === undefined ? 1 :
                            CheckGraceIn === 1 && early === 0 && HoliDay === undefined ? 0 :
                                CheckGraceIn === 2 && early === 0 && HoliDay === undefined ? 0 :
                                    CheckGraceIn === 3 && early === 0 && HoliDay === undefined ? 0 :
                                        CheckGraceIn === 0 && early === 1 && HoliDay === undefined ? 0.5 :
                                            CheckGraceIn === 1 && early === 2 && HoliDay === undefined ? 0.5 :
                                                early === 1 && CheckGraceIn === 2 && HoliDay === undefined ? 0.5 :
                                                    early === 1 && CheckGraceIn === 3 && HoliDay === undefined ? 0.5 :
                                                        HoliDay !== undefined ? 1 : val.shift_id === week_off_day ? 1 :
                                                            val.shift_id === noff ? 1 :
                                                                0,
            // duty_status: CaluculateLateInOut.lateIn >= cmmn_grace_period || CaluculateLateInOut.earlyOut > cmmn_early_out ? 0.5 :
            //     HoliDay !== undefined || val.shift_id === week_off_day ? 1 :
            //         CaluculateLateInOut.lateIn <= cmmn_late_in &&
            //             CaluculateLateInOut.earlyOut === 0 ? 1 :
            //             val.shift_id === noff ? 1 :
            //                 0,
            duty_desc: CheckGraceIn === 1 && early === 1 && HoliDay !== undefined ? "HP" :
                CheckGraceIn === 3 && early === 1 && HoliDay !== undefined ? "P" :
                    CheckGraceIn === 1 && early === 1 && HoliDay === undefined ? "P" :
                        CheckGraceIn === 1 && early === 0 && HoliDay === undefined ? "A" :
                            CheckGraceIn === 2 && early === 0 && HoliDay === undefined ? "A" :
                                CheckGraceIn === 3 && early === 0 && HoliDay === undefined ? "A" :
                                    CheckGraceIn === 0 && early === 1 && HoliDay === undefined ? "HFD" :
                                        CheckGraceIn === 1 && early === 2 && HoliDay === undefined ? "EHFD" :
                                            CheckGraceIn === 2 && early === 1 && HoliDay === undefined ? "LC" :
                                                early === 1 && CheckGraceIn === 3 && HoliDay === undefined ? "HFD" :
                                                    HoliDay !== undefined ? "H" : val.shift_id === week_off_day ? "OFF" :
                                                        val.shift_id === noff ? "NOFF" :
                                                            "A",
            // duty_desc: HoliDay !== undefined ? "H" : val.shift_id === week_off_day ? "OFF" :
            //     CaluculateLateInOut.lateIn > cmmn_late_in ? "LC" :
            //         CaluculateLateInOut.earlyOut > cmmn_early_out ? "EG" :
            //             CaluculateLateInOut.lateIn >= cmmn_grace_period || CaluculateLateInOut.earlyOut > cmmn_early_out ? "HFD" :
            //                 val.shift_id === noff ? "NOFF" : "A",
            holiday_slno: HoliDay !== undefined ? HoliDay.hld_slno : 0,
            holiday_status: HoliDay !== undefined ? 1 : 0,
            woff: val.shift_id === week_off_day ? 1 : 0
        }
    })

    const resultduty = InsertedPunchMasterData.map((val) => {

        const crossDay = shiftData?.find(shft => shft.shft_slno === val.shift_id);
        const crossDayStat = crossDay?.shft_cross_day ?? 0;
        let shiftIn = `${format(new Date(val.duty_day), 'yyyy-MM-dd')} ${format(new Date(val.shift_in), 'HH:mm')}`;
        let shiftOut = crossDayStat === 0 ? `${format(new Date(val.duty_day), 'yyyy-MM-dd')} ${format(new Date(val.shift_out), 'HH:mm:ss')}` :
            `${format(addDays(new Date(val.duty_day), 1), 'yyyy-MM-dd')} ${format(new Date(val.shift_out), 'HH:mm:ss')}`;

        let checkinStart = `${format(new Date(shiftIn), 'yyyy-MM-dd')} ${format(new Date(crossDay?.shft_chkin_start), 'HH:mm')}`;
        let checkinEnd = `${format(new Date(shiftIn), 'yyyy-MM-dd')} ${format(new Date(crossDay?.shft_chkin_end), 'HH:mm')}`;

        let checkOutStart = `${format(new Date(shiftOut), 'yyyy-MM-dd')} ${format(new Date(crossDay?.shft_chkout_start), 'HH:mm')}`;
        let checkOutEnd = `${format(new Date(shiftOut), 'yyyy-MM-dd')} ${format(new Date(crossDay?.shft_chkout_end), 'HH:mm')}`;

        const checkInTimeVale = format(new Date(checkinStart), 'HH')
        const incheckStart = checkInTimeVale > 20
        const checkinStartTime = `${format(subDays(new Date(val.duty_day), 1), 'yyyy-MM-dd')} ${format(new Date(checkinStart), 'HH:mm')}`

        const checkoutTimeVale = format(new Date(checkOutStart), 'HH')
        const outcheckStart = checkoutTimeVale > 20
        const checkoutStartTime = `${format(subDays(new Date(val.duty_day), 1), 'yyyy-MM-dd')} ${format(new Date(checkOutStart), 'HH:mm')}`

        const inTimeVale = format(new Date(checkinEnd), 'HH')
        const incheck = inTimeVale < 8
        const checkinEndTime = `${format(addDays(new Date(val.duty_day), 1), 'yyyy-MM-dd')} ${format(new Date(checkinEnd), 'HH:mm')}`

        const endTimeVale = format(new Date(checkOutEnd), 'HH')
        const check = endTimeVale < 8
        const checkOutEndTime = `${format(addDays(new Date(val.duty_day), 1), 'yyyy-MM-dd')} ${format(new Date(checkOutEnd), 'HH:mm')}`

        const punchIn = incheck === true ? punchTimeData?.find(val => new Date(val) >= new Date(checkinStart) && new Date(val) <= new Date(checkinEndTime)) :
            incheckStart === true ? punchTimeData?.find(val => new Date(val) >= new Date(checkinStartTime) && new Date(val) <= new Date(checkinEnd)) :
                punchTimeData?.find(val => new Date(val) >= new Date(checkinStart) && new Date(val) <= new Date(checkinEnd))

        const punchOut = check === true ? punchTimeData?.findLast(val => new Date(val) >= new Date(checkOutStart) && new Date(val) <= new Date(checkOutEndTime))
            : outcheckStart === true ? punchTimeData?.findLast(val => new Date(val) >= new Date(checkoutStartTime) && new Date(val) <= new Date(checkOutEnd))
                : punchTimeData?.findLast(val => new Date(val) >= new Date(checkOutStart) && new Date(val) <= new Date(checkOutEnd))

        //Grace period calculation
        const relaxTime = format(addMinutes(new Date(shiftIn), cmmn_grace_period), 'yyyy-MM-dd H:mm:ss')
        const lateCommon = format(addMinutes(new Date(shiftIn), cmmn_late_in), 'yyyy-MM-dd H:mm:ss')

        //checking punch in before 30 minute and grace period
        const CheckGraceIn = isEqual(new Date(relaxTime), new Date(punchIn)) ||
            isBefore(new Date(punchIn), new Date(relaxTime)) ? 1 :
            isAfter(new Date(punchIn), new Date(relaxTime)) &&
                isBefore(new Date(punchIn), new Date(lateCommon)) ? 2 :
                isAfter(new Date(punchIn), new Date(lateCommon)) ? 3 : 0

        //for early punch out before shift out
        const earlyGo = format(subMinutes(new Date(shiftOut), cmmn_early_out), 'yyyy-MM-dd H:mm')
        const PunchOutOnlyMM = format(new Date(val.punch_out), 'yyyy-MM-dd H:mm')

        const early = isEqual(new Date(earlyGo), new Date(PunchOutOnlyMM)) ||
            isAfter(new Date(punchOut), new Date(earlyGo)) ? 1
            : isValid(new Date(punchOut)) && isBefore(new Date(punchOut), new Date(earlyGo)) ? 2 : 0
        const HoliDay = holidaydata.find((holi) => holi.hld_date === val.duty_day)


        // CALCULATE THE LATE AND EARLY GO TIME 
        const CaluculateLateInOut = (isValid(new Date(shiftIn)) && isValid(new Date(shiftOut))) && (isValid(new Date(punchIn)) && isValid(new Date(punchOut))) ?
            { lateIn: differenceInMinutes(new Date(punchIn), new Date(shiftIn)), earlyOut: differenceInMinutes(new Date(shiftOut), new Date(punchOut)) }
            : { lateIn: 0, earlyOut: 0 };

        return {
            punch_slno: val.punch_slno,
            punch_in: isValid(new Date(punchIn)) ? format(new Date(punchIn), 'yyyy-MM-dd HH:mm') : null,
            punch_out: isValid(new Date(punchOut)) ? format(new Date(punchOut), 'yyyy-MM-dd HH:mm') : null,
            hrs_worked: isValid(new Date(punchIn)) && isValid(new Date(punchOut)) ? differenceInMinutes(new Date(punchOut), new Date(punchIn)) : 0,
            late_in: CaluculateLateInOut.lateIn > 0 ? CaluculateLateInOut.lateIn : 0,
            early_out: CaluculateLateInOut.earlyOut > 0 ? CaluculateLateInOut.earlyOut : 0,
            duty_status: CheckGraceIn === 1 && early === 1 && HoliDay !== undefined && gross_salary <= salary_above ? 2 :
                CheckGraceIn === 1 && early === 1 && HoliDay !== undefined && gross_salary > salary_above ? 1 :
                    CheckGraceIn === 3 && early === 1 && HoliDay !== undefined ? 1 :
                        CheckGraceIn === 1 && early === 1 && HoliDay === undefined ? 1 :
                            CheckGraceIn === 1 && early === 0 && HoliDay === undefined ? 0 :
                                CheckGraceIn === 2 && early === 0 && HoliDay === undefined ? 0 :
                                    CheckGraceIn === 3 && early === 0 && HoliDay === undefined ? 0 :
                                        CheckGraceIn === 0 && early === 1 && HoliDay === undefined ? 0.5 :
                                            CheckGraceIn === 1 && early === 2 && HoliDay === undefined ? 0.5 :
                                                early === 1 && CheckGraceIn === 2 && HoliDay === undefined ? 0.5 :
                                                    early === 1 && CheckGraceIn === 3 && HoliDay === undefined ? 0.5 :
                                                        HoliDay !== undefined ? 1 : val.shift_id === week_off_day ? 1 :
                                                            val.shift_id === noff ? 1 :
                                                                0,

            duty_desc: CheckGraceIn === 1 && early === 1 && HoliDay !== undefined ? "HP" :
                CheckGraceIn === 3 && early === 1 && HoliDay !== undefined ? "P" :
                    CheckGraceIn === 1 && early === 1 && HoliDay === undefined ? "P" :
                        CheckGraceIn === 1 && early === 0 && HoliDay === undefined ? "A" :
                            CheckGraceIn === 2 && early === 0 && HoliDay === undefined ? "A" :
                                CheckGraceIn === 3 && early === 0 && HoliDay === undefined ? "A" :
                                    CheckGraceIn === 0 && early === 1 && HoliDay === undefined ? "HFD" :
                                        CheckGraceIn === 1 && early === 2 && HoliDay === undefined ? "EHFD" :
                                            CheckGraceIn === 2 && early === 1 && HoliDay === undefined ? "LC" :
                                                early === 1 && CheckGraceIn === 3 && HoliDay === undefined ? "HFD" :
                                                    HoliDay !== undefined ? "H" : val.shift_id === week_off_day ? "OFF" :
                                                        val.shift_id === noff ? "NOFF" :
                                                            "A",
            holiday_slno: HoliDay !== undefined ? HoliDay.hld_slno : 0,
            holiday_status: HoliDay !== undefined ? 1 : 0,
        }
    })

    //UPDATE INTO THE PUNCH MASTER TABLE
    const updatePunchMaster = await axioslogin.post("/attendCal/updatePunchMasterData/", result);
    const { success, message } = updatePunchMaster.data;
    if (success === 1) {
        const updatePunchMastDuty = await axioslogin.post("/attendCal/updatePunchMastDuty/", resultduty);
        const { messagee } = updatePunchMastDuty.data;
        return { status: 1, message: messagee, resData: result }
    } else {
        return { status: 0, message: message, resData: [] }
    }
}

//GET AND UPDATE PUNCH IN / OUT DATA
export const getAndUpdatePunchingData = async (postData, holidaydata, cmmn_early_out, cmmn_grace_period, cmmn_late_in,
    //cmmn_late_in_grace, cmmn_early_out_grace,
    gross_salary, empInform, dispatch, salary_above, week_off_day, notapplicable_shift, default_shift, noff) => {

    // `RECIVE THE COMMON SETTING DATA SHIFT`
    /******
     * ######  PROCESS FLOW OF FUN #######
     * #-> CHECKING FOR ATTENDANCE MARKED OR NOT
     * #-> GET THE EMP CODE USING EMP ID --> ##
     * #-> GET THE PUNCH DATA FROM PUNCH_TABLE
     * #-> GET THE PUNCH MASTER DATA FROM TABLE
     * #-> FIND THE NOT UPDATED DATA FROM PUNCH MASTER TABLE
     * #-< CALCULATE THE IN / OUT DATA USING THE SHIFT TIME
     * #-< UPDATE THE PUNCH MASTER USING THE CORRECT IN/OUT DATA 
     * #-< AFTER UPDATE GET THE COMPLETE DATA BASED WITH CURRENT DATE ( FROM PUNCH MASTER DATA ) AND GIVE TO RETURN
     */

    //GET THE PUNCH IN / OUT INFORMATION
    const punch_data = await axioslogin.post("/attendCal/getPunchData/", postData);
    const { success, data } = punch_data.data;
    if (success === 1) {

        //get dutyplan data from hrm_duty_plan
        const Shift_data = await axioslogin.post("/attendCal/getDutyPlan/", postData);
        const { succes, shiftdetail } = Shift_data.data;
        if (succes === 1) {
            //GET THE DUTY PLAN PUCH MASTER FROM PUNCH_MASTER TABLE
            const punch_master_data = await axioslogin.post("/attendCal/getPunchMasterData/", postData);
            const { success, planData } = punch_master_data.data;
            if (success === 1) {
                //UPDATE IN AND OUT PUNCH IN PUNCH MASTER 
                const getShift = planData?.map(val => val.shift_id);
                //REMOVE DUPLICATES
                const shift = [...new Set(getShift)]
                //GET THE SHIFT DETAILS FROM DB
                const shift_master = await axioslogin.post("/attendCal/getShiftData/", shift);
                const { success, shiftData } = shift_master.data;
                if (success === 1) {
                    //FILTER THE null COLUMN (punch_in,punch_out) FROM THE PUNCH MASTER TABLE
                    const notUpdatedPunchMasterData = await planData?.filter((val) => val.punch_in === null || val.punch_out === null)

                    const InsertedPunchMasterData = await planData?.filter((val) => val.punch_in !== null || val.punch_out !== null)
                    //CALCULATE FUNCTION (IN PUNCH AND OUT PUNCH )
                    const dataResult = await CaluculatePunchinandOut(data, shiftdetail, holidaydata,
                        cmmn_early_out, cmmn_grace_period, cmmn_late_in,
                        //cmmn_late_in_grace, cmmn_early_out_grace, 
                        gross_salary, notUpdatedPunchMasterData, InsertedPunchMasterData,
                        shiftData, salary_above, week_off_day, notapplicable_shift, default_shift, noff);

                    // const dataResult = await CaluculatePunchinandOut(data, planData, shiftData);
                    // message, resData
                    const { status } = await dataResult;
                    if (status === 1) {
                        dispatch(getPunchMasterData(postData))
                        return { status: 1, message: "Attendance Data Updated SuccessFully", shift: shiftData, punch_data: data }
                    } else {
                        return { status: 0, message: "Err !, Update Attendance Data ,Contact HRD/IT", shift: shiftData, punch_data: data }
                    }
                }
            } else if (success === 2) {
                // DUTY PLAN NOT MARKED
                return { status: 2, message: "Duty not Planned" }
            } else {
                return { status: 0, message: "Error Getting Punch Master Data" }
            }
        }
        else if (success === 2) {
            // NO PUNCH DATA FOUND IN PUNCH MASTER TABLE
            return { status: 2, message: "Punch Data Not Found" }
        }
    } else if (success === 2) {
        // NO PUNCH DATA FOUND IN PUNCH MASTER TABLE
        return { status: 2, message: "Punch Data Not Found" }
    } else {
        //ERROR GETTING PUNCH DATA FROM TABLE 
        return { status: 0, message: "Error Getting Punch Data" }
    }
}

export const dailyPunchMarkingFunction = async (
    postData_getPunchData,
    punchaData, //PUNCH DATA
    shiftInformation, // SHIFT INFORMATION
    commonSettings, // COMMON SETTINGS
) => {
    console.log(commonSettings);
    const {
        cmmn_early_out, // Early going time interval
        cmmn_grace_period, // common grace period for late in time
        cmmn_late_in, //Maximum Late in Time for punch in after that direct HALF DAY 
        salary_above, //Salary limit for calculating the holiday double wages
        week_off_day, // week off SHIFT ID
        notapplicable_shift, //not applicable SHIFT ID
        default_shift, //default SHIFT ID
        noff, // night off SHIFT ID,
        halfday_time_count,
        doff,
        monthly_late_time_count
    } = commonSettings; //COMMON SETTING

    //GET DUTY PLAN AND CHECK DUTY PLAN IS EXCIST OR NOT
    const getDutyPlan = await axioslogin.post("/attendCal/getDutyPlanBySection/", postData_getPunchData); //GET DUTY PLAN DAAT
    const { succes, shiftdetail } = getDutyPlan.data;
    if (succes === 1 && shiftdetail?.length > 0) {
        const punch_master_data = await axioslogin.post("/attendCal/getPunchMasterDataSectionWise/", postData_getPunchData); //GET PUNCH MASTER DATA
        const { success, planData } = punch_master_data.data;
        console.log(planData);
        if (success === 1 && planData?.length > 0) {
            const punchMasterData = planData; //PUNCHMSTER DATA
            return Promise.allSettled(
                punchMasterData?.map(async (data, index) => {
                    const sortedShiftData = shiftInformation?.find((e) => e?.shft_slno === data?.shift_id)// SHIFT DATA
                    //const sortedSalaryData = empSalary?.find((e) => e.em_no === data.em_no) //SALARY DATA
                    const shiftMergedPunchMaster = {
                        ...data,
                        shft_chkin_start: sortedShiftData?.shft_chkin_start,
                        shft_chkin_end: sortedShiftData?.shft_chkin_end,
                        shft_chkout_start: sortedShiftData?.shft_chkout_start,
                        shft_chkout_end: sortedShiftData?.shft_chkout_end,
                        shft_cross_day: sortedShiftData?.shft_cross_day,
                        gross_salary: data?.gross_salary,
                        earlyGoingMaxIntervl: cmmn_early_out,
                        gracePeriodInTime: cmmn_grace_period,
                        maximumLateInTime: cmmn_late_in,
                        salaryLimit: salary_above,
                        woff: week_off_day,
                        naShift: notapplicable_shift,
                        defaultShift: default_shift,
                        noff: noff,
                        holidayStatus: sortedShiftData?.holiday_status,
                        doff: doff
                    }
                    const employeeBasedPunchData = punchaData?.filter((e) => parseInt(e?.emp_code) === parseInt(data.em_no))
                    console.log(employeeBasedPunchData);
                    //FUNCTION FOR MAPPING THE PUNCH IN AND OUT 
                    return await punchInOutMapping(shiftMergedPunchMaster, employeeBasedPunchData)
                })
            ).then((data) => {

                const punchMasterMappedData = data?.map((e) => e?.value)

                console.log(punchMasterMappedData);

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

                        const getAttendanceStatus = await getAttendnaceDescription(
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
                            halfday_time_count,
                            doff,
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
                        monthly_late_time_count: monthly_late_time_count
                    }
                    const updatePunchMaster = await axioslogin.post("/attendCal/dailyPunchMarking/", postDataForUpdatePunchMaster);
                    const { success, message, data } = updatePunchMaster.data;
                    if (success === 1) {
                        return { status: 1, message: "Punch Master Updated SuccessFully", errorMessage: '', punchMastData: data }
                    } else {
                        return { status: 0, message: "Error Processing and Updating Punch Master ! contact IT", errorMessage: message, punchMastData: [] }
                    }
                })
            })
        } else {
            return { status: 0, message: "Punch Master Data Not Found ! contact IT", errorMessage: '', punchMastData: [] }
        }
    } else {
        return { status: 0, message: "Duty Plan Not Done! contact IT", errorMessage: '', punchMastData: [] }
    }
}


export const attendanceViewDailyPunch = async (
    postData_getPunchData,
    punchaData, //PUNCH DATA
    shiftInformation, // SHIFT INFORMATION
    commonSettings, // COMMON SETTINGS
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
        halfday_time_count,
        doff,
        monthly_late_time_count
    } = commonSettings; //COMMON SETTING

    //GET DUTY PLAN AND CHECK DUTY PLAN IS EXCIST OR NOT
    const getDutyPlan = await axioslogin.post("/attendCal/getDutyPlanBySection/", postData_getPunchData); //GET DUTY PLAN DAAT
    const { succes, shiftdetail } = getDutyPlan.data;
    if (succes === 1 && shiftdetail?.length > 0) {
        const punch_master_data = await axioslogin.post("/attendCal/getPunchMasterDataSectionWise/", postData_getPunchData); //GET PUNCH MASTER DATA
        const { success, planData } = punch_master_data.data;
        console.log(planData);
        if (success === 1 && planData?.length > 0) {
            const punchMasterData = planData; //PUNCHMSTER DATA
            console.log(punchMasterData);
            return Promise.allSettled(
                punchMasterData?.map(async (data, index) => {
                    const sortedShiftData = shiftInformation?.find((e) => e?.shft_slno === data?.shift_id)// SHIFT DATA
                    //const sortedSalaryData = empSalary?.find((e) => e.em_no === data.em_no) //SALARY DATA
                    const shiftMergedPunchMaster = {
                        ...data,
                        shft_chkin_start: sortedShiftData?.shft_chkin_start,
                        shft_chkin_end: sortedShiftData?.shft_chkin_end,
                        shft_chkout_start: sortedShiftData?.shft_chkout_start,
                        shft_chkout_end: sortedShiftData?.shft_chkout_end,
                        shft_cross_day: sortedShiftData?.shft_cross_day,
                        gross_salary: data?.gross_salary,
                        earlyGoingMaxIntervl: cmmn_early_out,
                        gracePeriodInTime: cmmn_grace_period,
                        maximumLateInTime: cmmn_late_in,
                        salaryLimit: salary_above,
                        woff: week_off_day,
                        naShift: notapplicable_shift,
                        defaultShift: default_shift,
                        noff: noff,
                        holidayStatus: sortedShiftData?.holiday_status,
                        doff: doff
                    }
                    const employeeBasedPunchData = punchaData?.filter((e) => parseInt(e?.emp_code) === parseInt(data?.em_no))
                    //  console.log(employeeBasedPunchData);
                    //FUNCTION FOR MAPPING THE PUNCH IN AND OUT 
                    return await punchInOutMapping(shiftMergedPunchMaster, employeeBasedPunchData)
                })

            ).then((data) => {
                console.log(data);
                const punchMasterMappedData = data?.map((e) => e?.value)

                console.log(punchMasterMappedData);

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

                        const getAttendanceStatus = await getAttendnaceDescription(
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
                            halfday_time_count,
                            doff,
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
                            console.log(filterEMNO);
                            // calculate and update the calculated LOP count 
                            let lateInCount = 0;
                            const filterLcData = filterEMNO
                                ?.map((el) => {
                                    return {
                                        emNo: el,
                                        lcArray: lcData?.filter((e) => e.em_no === el)
                                    }
                                })
                                ?.map((val) => {
                                    const newArray = {
                                        emno: val.emNo,
                                        punMasterArray: val.lcArray?.map(item => {
                                            lateInCount = lateInCount + item.late_in;
                                            if (item.duty_desc === "LC" && lateInCount < monthly_late_time_count) {

                                                return item;
                                            } else if (item.duty_desc === "LC" && lateInCount >= monthly_late_time_count) {
                                                return { ...item, lvereq_desc: "HD" };
                                            } else {
                                                return item;
                                            }
                                        })
                                    }
                                    lateInCount = 0
                                    return newArray
                                })
                                ?.map((e) => e.punMasterArray)
                                ?.flat()
                                ?.filter((e) => e.lvereq_desc === 'HD' && e.duty_desc === 'LC')
                                ?.map((e) => e.punch_slno)

                            console.log(filterLcData);

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
            })
        } else {
            return { status: 0, message: "Punch Master Data Not Found ! contact IT", errorMessage: '', punchMastData: [] }
        }
    } else {
        return { status: 0, message: "Duty Plan Not Done! contact IT", errorMessage: '', punchMastData: [] }
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

export const getAttendnaceDescription = async (
    punch_In, shift_in, punch_out, shift_out, cmmn_grace_period, getLateInTime,
    holidayStatus, shiftId, defaultShift, NAShift, NightOffShift, WoffShift,
    salaryLimit, maximumLateInTime, halfday_time_count, doff,
) => {
    const { lateIn, earlyOut } = getLateInTime;

    //SHIFT ID CHECKING
    // ( !== default shift , !== not applicable shift , !== Night off , !== week off) 
    // if true ==> ( its a working shift ) 
    const checkShiftIdStatus = (shiftId !== defaultShift && shiftId !== NAShift && shiftId !== NightOffShift
        && shiftId !== WoffShift && shiftId !== doff)
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
                    shiftId === doff ? { duty_status: 1, duty_desc: 'DOFF', lvereq_desc: 'DOFF', duty_remark: 'Duty off' } :
                        shiftId === defaultShift && holidayStatus === 1 ? { duty_status: 1, duty_desc: 'H', lvereq_desc: 'H', duty_remark: 'holiday' } :
                            { duty_status: 0, duty_desc: 'A', lvereq_desc: 'A', duty_remark: 'no applicable' }
    }
}

