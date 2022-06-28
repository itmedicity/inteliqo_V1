import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Skeleton } from '@mui/material'
import React, { Fragment, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const LeaveCalender = ({ count }) => {
    const [data, setData] = useState([])
    const [status, setstatus] = useState(false)
    const state = useSelector((state) => {
        return state.getPrifileDateEachEmp.empLeaveData;
    })
    useEffect(() => {
        const { leaveData, apiStatus } = state
        setData(leaveData)
        setstatus(apiStatus)
    }, [state, count])
    return (
        <Fragment>
            {status === false ? <Skeleton animation="wave" variant="rectangular" /> :
                <TableContainer component={Paper}>

                    <Table sx={{ minWidth: 500 }} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Allowed Leave Type</TableCell>
                                <TableCell align="right">Credited</TableCell>
                                <TableCell align="right">Taken</TableCell>
                                <TableCell align="right">Balance</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {
                                data && data.map((val) => {
                                    return < TableRow
                                        key={val.typeleve}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {val.typeleve}
                                        </TableCell>
                                        <TableCell align="right">{val.credited}</TableCell>
                                        <TableCell align="right">{val.taken}</TableCell>
                                        <TableCell align="right">{val.balance}</TableCell>
                                    </TableRow>
                                })
                            }
                        </TableBody>

                    </Table>

                </TableContainer>
            }
        </Fragment >
    )
}

export default LeaveCalender
