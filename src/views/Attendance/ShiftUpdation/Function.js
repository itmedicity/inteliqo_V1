import { addDays, differenceInMinutes, format, formatDuration, intervalToDuration, isValid } from "date-fns";
import moment from "moment";
import { axioslogin } from "src/views/Axios/Axios";
import { Actiontypes } from "src/redux/constants/action.type";
import { getPunchMasterData } from "src/redux/actions/Common.Action";

const { FETCH_PUNCH_MASTER_DATA } = Actiontypes;

const CaluculatePunchinandOut = async (punchData, punchMaster, shiftData) => {

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

        return {
            duty_day: val.duty_day,
            em_no: val.em_no,
            emp_id: val.emp_id,
            hrsWrkdInMints: isValid(new Date(punchIn)) && isValid(new Date(punchOut)) ? differenceInMinutes(new Date(punchOut), new Date(punchIn)) : 0,
            minitsInWrkd: formatDuration({ hours: interVal.hours, minutes: interVal.minutes }),
            punch_in: isValid(new Date(punchIn)) ? format(new Date(punchIn), 'yyyy-MM-dd HH:mm') : null,
            punch_out: isValid(new Date(punchOut)) ? format(new Date(punchOut), 'yyyy-MM-dd HH:mm') : null,
            punch_slno: val.punch_slno,
            shift_id: val.shift_id,
            shift_in: (val.shift_id === 1 || val.shift_id === 2 || val.shift_id === 3) ? crossDay?.shft_desc : moment(shiftIn).format('DD-MM-YYYY HH:mm'),
            shift_out: (val.shift_id === 1 || val.shift_id === 2 || val.shift_id === 3) ? crossDay?.shft_desc : moment(shiftOut).format('DD-MM-YYYY HH:mm'),
            lateIn: CaluculateLateInOut.lateIn > 0 ? CaluculateLateInOut.lateIn : 0,
            earlyOut: CaluculateLateInOut.earlyOut > 0 ? CaluculateLateInOut.earlyOut : 0
        }
    })

    //UPDATE INTO THE PUNCH MASTER TABLE 
    const updatePunchMaster = await axioslogin.post("/attendCal/updatePunchMasterData/", result);
    const { success, message } = updatePunchMaster.data;
    if (success === 1) {
        return { status: 1, message: message, resData: result }
    } else {
        return { status: 0, message: message, resData: [] }
    }
}


//GET AND UPDATE PUNCH IN / OUT DATA
export const getAndUpdatePunchingData = async (postData, empInform, dispatch) => {
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

    const { fromDate, preFromDate, toDate, preToDate, dept, section, empId } = postData;

    //GET THE PUNCH IN / OUT INFORMATION
    const punch_data = await axioslogin.post("/attendCal/getPunchData/", postData);
    const { success, data } = punch_data.data;
    if (success === 1) {

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
                // console.log(planData)
                //FILTER THE null COLUMN (punch_in,punch_out) FROM THE PUNCH MASTER TABLE
                const notUpdatedPunchMasterData = await planData?.filter((val) => val.punch_in === null || val.punch_out === null)
                //CALCULATE FUNCTION (IN PUNCH AND OUT PUNCH )
                const dataResult = await CaluculatePunchinandOut(data, notUpdatedPunchMasterData, shiftData);
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
    } else if (success === 2) {
        // NO PUNCH DATA FOUND IN PUNCH MASTER TABLE
        return { status: 2, message: "Punch Data Not Found" }
    } else {
        //ERROR GETTING PUNCH DATA FROM TABLE 
        return { status: 0, message: "Error Getting Punch Data" }
    }
}