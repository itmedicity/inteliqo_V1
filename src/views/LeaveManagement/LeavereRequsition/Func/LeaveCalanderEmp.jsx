import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Skeleton, Box, Alert } from '@mui/material'
import React, { Fragment, useEffect, useState } from 'react'
import { memo } from 'react'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import _ from 'underscore'

const LeaveCalanderEmp = () => {
    const [data, setData] = useState([])
    const [status, setstatus] = useState(false)

    const state = useSelector((state) => state.getPrifileDateEachEmp.empLeaveData, _.isEqual);
    const allowedLeaveData = useMemo(() => state, [state]);

    useEffect(() => {
        const { leaveData, apiStatus } = allowedLeaveData;
        setData(leaveData)
        setstatus(apiStatus)
    }, [allowedLeaveData])

    return (
        <Box sx={{ flex: 1, p: 0.5 }} >
            {
                status === false ? <Skeleton variant="rounded" height={40} /> :
                    <TableContainer component={Paper}  >
                        <Table sx={{}} size="small" aria-label="a dense table">
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
                                    data?.map((val) => {
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
        </Box>
    )
}

export default memo(LeaveCalanderEmp)