import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Skeleton } from '@mui/material'
import React, { Fragment, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const LeaveCalender = ({ count }) => {
    const [data, setData] = useState([])
    const [status, setstatus] = useState(false)
    const state = useSelector((state) => state.getPrifileDateEachEmp.empLeaveData)

    useEffect(() => {
        const { leaveData, apiStatus } = state
        setData(leaveData)
        setstatus(apiStatus)
    }, [state, count])

    return (
        <Fragment>
            {status === false ? <Skeleton animation="wave" variant="rectangular" /> :
                <TableContainer component={Paper}  >

                    <Table sx={{ minWidth: 500 }} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell style={{ fontWeight: 'bold', color: '#4f5d73', fontFamily: 'sans-serif' }} >Leave Type</TableCell>
                                <TableCell align="right" style={{ fontWeight: 'bold', color: '#4f5d73', fontFamily: 'sans-serif' }}>Allowed</TableCell>
                                <TableCell align="right" style={{ fontWeight: 'bold', color: '#4f5d73', fontFamily: 'sans-serif' }}>Credited</TableCell>
                                <TableCell align="right" style={{ fontWeight: 'bold', color: '#4f5d73', fontFamily: 'sans-serif' }}>Taken</TableCell>
                                <TableCell align="right" style={{ fontWeight: 'bold', color: '#4f5d73', fontFamily: 'sans-serif' }}>Balance</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {
                                data && data.map((val) => {
                                    const leaveType = val.typeleve;

                                    return < TableRow
                                        key={val.typeleve}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row" sx={{ textTransform: 'capitalize' }} >
                                            {leaveType.toLowerCase()}
                                        </TableCell>
                                        <TableCell align="right">{val.allowed}</TableCell>
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
