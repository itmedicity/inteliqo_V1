import {
    addDays, addMinutes, differenceInMinutes, format, formatDuration, intervalToDuration,
    isAfter, isBefore, isValid, subDays, subMinutes
} from "date-fns";
import moment from "moment";
import { axioslogin } from "src/views/Axios/Axios";
import { getPunchMasterData } from "src/redux/actions/Common.Action";


const CaluculatePunchinandOut = async (punchData, shiftdetail, holidaydata, cmmn_late_in_grace, cmmn_early_out_grace,
    gross_salary, punchMaster, InsertedPunchMasterData, shiftData) => {
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

        const punchIn = punchTimeData?.find(val => new Date(val) >= new Date(checkinStart) && new Date(val) <= new Date(checkinEnd)) ?? '0000-00-00 00:00';
        const punchOut = punchTimeData?.findLast(val => new Date(val) >= new Date(checkOutStart) && new Date(val) <= new Date(checkOutEnd)) ?? '0000-00-00 00:00';

        // GET THE HOURS WORKED IN MINITS
        let interVal = intervalToDuration({
            start: isValid(new Date(punchIn)) ? new Date(punchIn) : 0,
            end: isValid(new Date(punchOut)) ? new Date(punchOut) : 0
        })

        // CALCULATE THE LATE AND EARLY GO TIME 
        const CaluculateLateInOut = (isValid(new Date(shiftIn)) && isValid(new Date(shiftOut))) && (isValid(new Date(punchIn)) && isValid(new Date(punchOut))) ?
            { lateIn: differenceInMinutes(new Date(punchIn), new Date(shiftIn)), earlyOut: differenceInMinutes(new Date(shiftOut), new Date(punchOut)) }
            : { lateIn: 0, earlyOut: 0 };

        const HoliDay = holidaydata.find((holi) => {
            if (holi.hld_date === val.duty_day) {
                return holi
            }
        })
        if (val.shift_id === 3) {
            const calculateNoWorkday = async (duty_day, wDay, emno, punch_slno) => {
                const getpunchFromTo = {
                    fromDate: wDay,
                    toDate: duty_day,
                    em_no: emno
                }
                const punchmastdata = await axioslogin.post("/attendCal/getPunchMastDataCheckWoff/", getpunchFromTo);
                const { success, punchCheckdata } = punchmastdata.data;
                if (success === 1) {
                    const presentdata = punchCheckdata.filter(val => val.duty_desc === 'P')
                    const count = presentdata.length
                    if (count < 4) {

                        const postdata = {
                            punch_slno: punch_slno,
                            duty_status: 0,
                            duty_desc: "A"
                        }
                        await axioslogin.post("/attendCal/updatePunchMasWoff/", postdata);
                    }
                }
            }

            const weekDay = subDays(new Date(val.duty_day), 6)
            const wDay = format(new Date(weekDay), 'yyyy-MM-dd')
            calculateNoWorkday(val.duty_day, wDay, val.em_no, val.punch_slno);
        }
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
            shift_in: (val.shift_id === 1 || val.shift_id === 2 || val.shift_id === 3) ? crossDay?.shft_desc : moment(shiftIn).format('DD-MM-YYYY HH:mm'),
            shift_out: (val.shift_id === 1 || val.shift_id === 2 || val.shift_id === 3) ? crossDay?.shft_desc : moment(shiftOut).format('DD-MM-YYYY HH:mm'),
            lateIn: CaluculateLateInOut.lateIn > 0 ? CaluculateLateInOut.lateIn : 0,
            earlyOut: CaluculateLateInOut.earlyOut > 0 ? CaluculateLateInOut.earlyOut : 0,
            duty_status: CaluculateLateInOut.lateIn >= 30 || CaluculateLateInOut.earlyOut > 0 ? 0.5 :
                HoliDay !== undefined || val.shift_id === 3 ? 1 :
                    CaluculateLateInOut.lateIn <= cmmn_late_in_grace &&
                        CaluculateLateInOut.earlyOut === 0 ? 1 :
                        0,
            duty_desc: HoliDay !== undefined ? "H" : val.shift_id === 3 ? "OFF" :
                CaluculateLateInOut.lateIn > cmmn_late_in_grace ? "LC" :
                    CaluculateLateInOut.earlyOut > cmmn_early_out_grace ? "EG" :
                        CaluculateLateInOut.lateIn >= 30 || CaluculateLateInOut.earlyOut > 0 ? "HFD" : "P",
            holiday_slno: HoliDay !== undefined ? HoliDay.hld_slno : 0,
            holiday_status: HoliDay !== undefined ? 1 : 0,
            woff: val.shift_id === 3 ? 1 : 0
        }

    })

    const resultduty = InsertedPunchMasterData.map((val) => {

        const crossDay = shiftData?.find(shft => shft.shft_slno === val.shift_id);
        const crossDayStat = crossDay?.shft_cross_day ?? 0;
        let shiftIn = `${format(new Date(val.duty_day), 'yyyy-MM-dd')} ${format(new Date(val.shift_in), 'HH:mm')}`;
        let shiftOut = crossDayStat === 0 ? `${format(new Date(val.duty_day), 'yyyy-MM-dd')} ${format(new Date(val.shift_out), 'HH:mm')}` :
            `${format(addDays(new Date(val.duty_day), 1), 'yyyy-MM-dd')} ${format(new Date(val.shift_out), 'HH:mm')}`;

        let checkinStart = `${format(new Date(shiftIn), 'yyyy-MM-dd')} ${format(new Date(crossDay?.shft_chkin_start), 'HH:mm')}`;
        let checkinEnd = `${format(new Date(shiftIn), 'yyyy-MM-dd')} ${format(new Date(crossDay?.shft_chkin_end), 'HH:mm')}`;

        let checkOutStart = `${format(new Date(shiftOut), 'yyyy-MM-dd')} ${format(new Date(crossDay?.shft_chkout_start), 'HH:mm')}`;
        let checkOutEnd = `${format(new Date(shiftOut), 'yyyy-MM-dd')} ${format(new Date(crossDay?.shft_chkout_end), 'HH:mm')}`;

        const punchIn = punchTimeData?.find(val => new Date(val) >= new Date(checkinStart) && new Date(val) <= new Date(checkinEnd)) ?? '0000-00-00 00:00';
        const punchOut = punchTimeData?.findLast(val => new Date(val) >= new Date(checkOutStart) && new Date(val) <= new Date(checkOutEnd)) ?? '0000-00-00 00:00';

        //Grace period calculation
        const relaxTime = format(addMinutes(new Date(shiftIn), cmmn_late_in_grace), 'yyyy-MM-dd H:mm:ss')
        const CheckGraceIn = isAfter(new Date(relaxTime), new Date(val.punch_in))// true correct punch

        //Late Punch After 30 Min
        const LateTime = format(addMinutes(new Date(shiftIn), 30), 'yyyy-MM-dd H:mm:ss')
        const CheckLateIn = isAfter(new Date(LateTime), new Date(val.punch_in))// true correct punch
        // let shiftOut = `${format(new Date(val.duty_day), 'yyyy-MM-dd')} ${format(new Date(val.shift_out), 'HH:mm')}`;
        const earlyGo = format(subMinutes(new Date(shiftOut), cmmn_early_out_grace), 'yyyy-MM-dd H:mm:ss')
        const CheckEarlyOut = isBefore(new Date(earlyGo), new Date(val.punch_out))// true correct punch

        const HoliDay = holidaydata.find((holi) => {
            if (holi.hld_date === val.duty_day) {
                return holi
            }
        })
        // GET THE HOURS WORKED IN MINITS
        let interVal = intervalToDuration({
            start: isValid(new Date(punchIn)) ? new Date(punchIn) : 0,
            end: isValid(new Date(punchOut)) ? new Date(punchOut) : 0
        })
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
            duty_status: CheckGraceIn === true && CheckEarlyOut === true && HoliDay !== undefined && gross_salary < 25000 ? 2 :
                CheckGraceIn === true && CheckEarlyOut === true && HoliDay === undefined ? 1 :
                    HoliDay !== undefined ? 1 : 0.5,
            duty_desc: CheckGraceIn === true && CheckEarlyOut === true && HoliDay !== undefined ? "HP" :
                CheckGraceIn === true && CheckEarlyOut === true && HoliDay === undefined ? "P" :
                    CheckLateIn === false ? "HFD" : CheckGraceIn === false ? "HFD" :
                        CheckGraceIn === true && CheckEarlyOut === false ? "EG" : "LC",
            holiday_slno: HoliDay !== undefined ? HoliDay.hld_slno : 0,
            holiday_status: HoliDay !== undefined ? 1 : 0,
        }
    })


    //UPDATE INTO THE PUNCH MASTER TABLE 
    const updatePunchMaster = await axioslogin.post("/attendCal/updatePunchMasterData/", result);
    const { success, message } = updatePunchMaster.data;
    if (success === 1) {
        const updatePunchMastDuty = await axioslogin.post("/attendCal/updatePunchMastDuty/", resultduty);
        const { succes, messagee } = updatePunchMastDuty.data;
        return { status: 1, message: messagee, resData: result }
    } else {
        return { status: 0, message: message, resData: [] }
    }

}

//GET AND UPDATE PUNCH IN / OUT DATA
export const getAndUpdatePunchingData = async (postData, holidaydata, cmmn_late_in_grace, cmmn_early_out_grace,
    gross_salary, empInform, dispatch) => {

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
                    const dataResult = await CaluculatePunchinandOut(data, shiftdetail, holidaydata, cmmn_late_in_grace,
                        cmmn_early_out_grace, gross_salary, notUpdatedPunchMasterData, InsertedPunchMasterData,
                        shiftData);
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

