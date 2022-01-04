import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material'
import React, { Fragment } from 'react'

const LeaveCalender = () => {

    const data = [
        {
            slno: 1,
            leaveType: "Holidays",
            Allowed: 4,
            Credited: 4,
            Taken: 4,
            Balance: 5
        },
        {
            slno: 2,
            leaveType: "Casual Leave",
            Allowed: 4,
            Credited: 4,
            Taken: 4,
            Balance: 5
        },
        {
            slno: 3,
            leaveType: "Sick Leave",
            Allowed: 4,
            Credited: 4,
            Taken: 4,
            Balance: 5
        },
        {
            slno: 4,
            leaveType: "Earn leave",
            Allowed: 4,
            Credited: 4,
            Taken: 4,
            Balance: 5
        },
        {
            slno: 5,
            leaveType: "Compansatory Off",
            Allowed: 4,
            Credited: 4,
            Taken: 4,
            Balance: 5
        },
    ]

    return (
        <Fragment>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Allowed Leave Type</TableCell>
                            <TableCell align="right">Allowed</TableCell>
                            <TableCell align="right">Credited</TableCell>
                            <TableCell align="right">Taken</TableCell>
                            <TableCell align="right">Balance</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            data && data.map((val) => {
                                return < TableRow
                                    key={val.slno}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {val.leaveType}
                                    </TableCell>
                                    <TableCell align="right">{val.Allowed}</TableCell>
                                    <TableCell align="right">{val.Credited}</TableCell>
                                    <TableCell align="right">{val.Taken}</TableCell>
                                    <TableCell align="right">{val.Balance}</TableCell>
                                </TableRow>
                            })
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </Fragment >
    )
}

export default LeaveCalender
