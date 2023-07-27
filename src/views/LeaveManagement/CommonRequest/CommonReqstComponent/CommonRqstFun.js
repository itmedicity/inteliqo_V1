// import { addHours, addMinutes, isBefore } from "date-fns";
// import { axioslogin } from "src/views/Axios/Axios";



// export const CalculationFun = async (punchDetl, checkinBox, checkoutBox, punchInTime, punchOutTime) => {

//     console.log(checkinBox, checkoutBox);
//     console.log(punchDetl);
//     console.log(punchInTime, punchOutTime);
//     const punchTimeData = punchDetl?.map(val => new Date(val.punch_time))
//     const houradded = addHours(new Date(punchInTime), 1)
//     const gracePeriod = await axioslogin.get('/commonsettings')
//     const { data } = gracePeriod.data
//     const { cmmn_late_in_grace, cmmn_early_out_grace } = data[0]
//     console.log(cmmn_late_in_grace, cmmn_early_out_grace);
//     const minuteadded = addMinutes(new Date(houradded), cmmn_late_in_grace)
//     console.log(minuteadded);
//     const CheckEarlyOut = isBefore(new Date(minuteadded), new Date(punchInTime))// true correct punch
//     console.log(CheckEarlyOut);
// }