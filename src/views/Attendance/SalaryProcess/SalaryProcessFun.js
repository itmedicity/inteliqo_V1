import { addDays, subDays } from "date-fns";

const weekOffPolicyCountMax = 6;
const weekOffPolicyCountMin = 4;
const holidayPolicyCount = 1

export const calculateDutyDesc = async (element) => {
    console.log(element)
    //calculate the holiday policy
    //calcualte the week off policy
    const oldDutyDesc = element.data;
    const newDutyDesc = oldDutyDesc?.map(async (e, idx, array) => {
        const findHolidayStatus = await holidayStatus(e, array);
        const findWeekOffStatus = await weekOffStatus(e, array);
        // console.log()
        console.log(e.duty_day, findHolidayStatus)
    })



    return {
        em_no: element.em_no,
        duty_desc: [],
        lvereq_desc: []
    }
}

//FIND AND CHECK THE HOLIDAY STATUS 
const holidayStatus = async (e, array) => {
    if (e.duty_desc === 'H') {
        const holidayFIlterArray = await array.filter((val) => subDays(new Date(val.duty_day), holidayPolicyCount) <= new Date(e.duty_day) && addDays(new Date(val.duty_day), holidayPolicyCount) >= new Date(e.duty_day))?.map((r) => r.duty_desc)
        //for checking absent -> A H A
        const Absent = await holidayFIlterArray?.filter((m) => m === 'A').length
        // for checking LWP -> LWP H LWP
        const lwp = await holidayFIlterArray?.filter((m) => m === 'LWP').length
        // for checking ESI -> ESI H ESI
        const ESI = await holidayFIlterArray?.filter((m) => m === 'ESI').length
        //both absent and lwp -> LWP H A || A H LWP
        const absentlwp = await holidayFIlterArray?.filter((m) => m === 'A' || m === 'LWP' || m === 'ESI').length
        console.log(Absent, lwp, absentlwp)
        return await Absent === 2 ? 'A' : lwp === 2 ? 'A' : absentlwp === 2 ? 'A' : ESI === 2 ? 'A' : 'H'
    } else {
        return e.duty_desc
    };
}

//FIND AND CHECK THE WEEK OFF STATUS
const weekOffStatus = async (e, array) => {

}