import { TableCell, TableRow, Avatar } from '@mui/material'
import { isValid } from 'date-fns';
import moment from 'moment'
import React, { Fragment, memo } from 'react'
import { getHoursWorked, getTotalMinitsWorked, getTotalShiftHours } from 'src/views/CommonCode/Commonfunc';
import { deepOrange, deepPurple } from '@mui/material/colors';

const ShiftUpdationTblRow = ({ val }) => {

    const { duty_day, early_out, em_no, emp_id, hrs_worked, late_in,
        name, ot_request_flag, over_time, punch_in, punch_out,
        punch_slno, shift_id, shift_in, shift_out } = val;


    const checkInTime = punch_in !== null ? punch_in : '00:00';
    const checkOutTime = punch_out !== null ? punch_out : '00:00';

    // const shiftInTime = moment(shift_in).isValid() ? moment(shift_in).format("HH:mm:ss") : '00:00:00';
    // const shiftOutTime = moment(shift_out).isValid() ? moment(shift_out).format("HH:mm:ss") : '00:00:00';

    // const x = moment(val.checkin);
    // const y = moment(val.checkout);

    //Get the Hours Worked 
    // const hoursWorked = getHoursWorked(x, y);

    //Get Total minits worked
    // const totalMinitsWorked = getTotalMinitsWorked(x, y);

    // Get the Total Hours in the Shift
    // const shiftIn = moment(val.shiftin);
    // const shiftOut = moment(val.shiftout);

    // const totalShiftInMinits = getTotalShiftHours(shiftIn, shiftOut);

    // Get Extra Working Minits
    // const getExtraWrkMints = (totalShiftInMinits, totalMinitsWorked) => {
    //     const totalExtraMint = totalMinitsWorked - totalShiftInMinits
    //     return totalExtraMint >= 0 && totalExtraMint >= 60 ? totalExtraMint : 0;
    // }
    // const extraWorked = getExtraWrkMints(totalShiftInMinits, totalMinitsWorked);

    // Get The Late Comming in minits
    // const getLateComing = (shiftInTime, checkInTime) => {
    //     //Convert Shift In and Check In time as String First And Pass to this Function For Get the Minits
    //     const shiftInMints = moment.duration(shiftInTime).asMinutes();
    //     const checkInMints = moment.duration(checkInTime).asMinutes();
    //     const diffrence = checkInMints - shiftInMints;
    //     if (diffrence >= 0) {
    //         return diffrence;
    //     }
    //     return 0;
    // }

    // const lateComeIn = getLateComing(shiftInTime, checkInTime);

    //Get The Early Going in minits
    // const earlyGoing = (shiftOut, checkOut) => {
    //     //Convert Shift Out and Check Out time as String First And Pass to this Function For Get the Minits
    //     const shiftOutMints = moment.duration(shiftOut).asMinutes();
    //     const checkOutMints = moment.duration(checkOut).asMinutes();
    //     const diffrence = shiftOutMints - checkOutMints;
    //     if (diffrence >= 0) {
    //         return diffrence;
    //     }
    //     return 0;
    // }

    // const earlyGo = earlyGoing(shiftOutTime, checkOutTime)

    return (
        <Fragment>
            <TableRow
                hover={true}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <TableCell align="center" component="th" scope="row">{duty_day}</TableCell>
                <TableCell align="center">{em_no}</TableCell>
                <TableCell align="center">{shift_in}</TableCell>
                <TableCell align="center">{shift_out}</TableCell>
                <TableCell align="center">{checkInTime}</TableCell>
                <TableCell align="center">{checkOutTime}</TableCell>
                <TableCell align="center">{hrs_worked}</TableCell>
                <TableCell align="center">{over_time}</TableCell>
                <TableCell align="center">{late_in}</TableCell>
                <TableCell align="center">{early_out}</TableCell>
                <TableCell align="center">
                    <Avatar sx={{ bgcolor: deepOrange[500], width: 24, height: 24, fontSize: 10 }}>
                        NAA
                    </Avatar>
                </TableCell>
                <TableCell align="center">
                    <Avatar sx={{ bgcolor: deepOrange[500], width: 24, height: 24, fontSize: 10 }}>
                        NAA
                    </Avatar>
                </TableCell>
            </TableRow>
        </Fragment>
    )
}

export default memo(ShiftUpdationTblRow)
