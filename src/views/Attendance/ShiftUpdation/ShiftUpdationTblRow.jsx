import { TableCell, TableRow, Avatar } from '@mui/material'
import React, { Fragment, memo, useEffect } from 'react'
import { deepOrange, deepPurple, green, brown, cyan } from '@mui/material/colors';
import { blueGrey, teal } from '@material-ui/core/colors';
const ShiftUpdationTblRow = ({ val, count }) => {
    const { duty_day, early_out, em_no, hrs_worked, late_in, duty_status,
        lvreq_type, over_time, punch_in, punch_out,
        shift_in, shift_out, shift_id } = val;

    const checkInTime = punch_in !== null ? punch_in : '00:00';
    const checkOutTime = punch_out !== null ? punch_out : '00:00';

    useEffect(() => {


    }, [count])
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
                    <Avatar sx={{
                        bgcolor: (punch_in !== null && punch_out !== null) && duty_status === 1 ? green[500] :
                            shift_id == 5 ? blueGrey[200] :
                                duty_status === 0.5 ? deepPurple[500] :
                                    lvreq_type != 0 && duty_status !== 0 ? cyan[500] :
                                        duty_status === 0 ? deepOrange[500] :
                                            green[500]
                        , width: 25, height: 25, fontSize: 10
                    }}>
                        {(punch_in !== null && punch_out !== null) && duty_status === 1 ? 'P' :
                            shift_id == 5 ? 'WOF' :
                                duty_status === 0.5 ? 'HLP' :
                                    lvreq_type != 0 && duty_status !== 0 ? lvreq_type :
                                        duty_status === 0 ? 'LOP' : 'P'
                        }
                    </Avatar>
                </TableCell>
                <TableCell align="center">
                    <Avatar sx={{
                        bgcolor: (late_in !== 0 || early_out !== 0) ? brown[500] :
                            (punch_in !== null && punch_out !== null) && duty_status === 1 ? green[500] : shift_id == 5 ? blueGrey[200] :
                                duty_status === 0.5 ? deepPurple[500] :
                                    duty_status === 0 ? deepOrange[500] : lvreq_type != null ? lvreq_type : green[500]




                        , width: 24, height: 24, fontSize: 10
                    }}>
                        {(late_in !== 0 || early_out !== 0) ? 'L/E' :
                            (punch_in !== null && punch_out !== null) && duty_status === 1 ? 'P' : shift_id == 5 ? 'WOF' :
                                duty_status === 0.5 ? 'HLP' :
                                    duty_status === 0 ? 'LOP' : lvreq_type != null ? lvreq_type : 'P'
                        }
                    </Avatar>
                </TableCell>
            </TableRow>
        </Fragment>
    )
}

export default memo(ShiftUpdationTblRow)
