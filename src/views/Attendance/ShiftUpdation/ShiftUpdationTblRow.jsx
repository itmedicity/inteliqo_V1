import { TableCell, TableRow } from '@mui/material'
import { isValid } from 'date-fns';
import moment from 'moment'
import React, { Fragment } from 'react'
import { getHoursWorked, getTotalMinitsWorked, getTotalShiftHours } from 'src/views/CommonCode/Commonfunc';

const ShiftUpdationTblRow = ({ val }) => {

    const checkInTime = moment(val.checkin).isValid() ? moment(val.checkin).format("HH:mm:ss") : '00:00:00';
    const checkOutTime = moment(val.checkout).isValid() ? moment(val.checkout).format("HH:mm:ss") : '00:00:00';

    const shiftInTime = moment(val.shiftin).isValid() ? moment(val.shiftin).format("HH:mm:ss") : '00:00:00';
    const shiftOutTime = moment(val.shiftout).isValid() ? moment(val.shiftout).format("HH:mm:ss") : '00:00:00';

    const x = moment(val.checkin);
    const y = moment(val.checkout);

    //Get the Hours Worked 
    const hoursWorked = getHoursWorked(x, y)

    //Get Total minits worked
    const totalMinitsWorked = getTotalMinitsWorked(x, y);

    // Get the Total Hours in the Shift
    const shiftIn = moment(val.shiftin);
    const shiftOut = moment(val.shiftout);

    const totalShiftInMinits = getTotalShiftHours(shiftIn, shiftOut);

    // Get Extra Working Minits
    const getExtraWrkMints = (totalShiftInMinits, totalMinitsWorked) => {
        const totalExtraMint = totalMinitsWorked - totalShiftInMinits
        return totalExtraMint >= 0 && totalExtraMint >= 60 ? totalExtraMint : 0;
    }
    const extraWorked = getExtraWrkMints(totalShiftInMinits, totalMinitsWorked)

    // console.log(totalShiftInMinits, totalMinitsWorked)

    return (
        <Fragment>
            <TableRow
                hover={true}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <TableCell align="center" component="th" scope="row">{val.date}</TableCell>
                <TableCell align="center">{shiftInTime}</TableCell>
                <TableCell align="center">{shiftOutTime}</TableCell>
                <TableCell align="center">{checkInTime}</TableCell>
                <TableCell align="center">{checkOutTime}</TableCell>
                <TableCell align="right">{hoursWorked}</TableCell>
                <TableCell align="center">{val.status}</TableCell>
                <TableCell align="center">{extraWorked}</TableCell>
                <TableCell align="center">{val.lateIn}</TableCell>
                <TableCell align="center">{val.lateOut}</TableCell>
            </TableRow>
        </Fragment>
    )
}

export default ShiftUpdationTblRow
