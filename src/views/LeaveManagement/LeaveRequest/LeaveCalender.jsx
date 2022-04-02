import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material'
import React, { Fragment, useEffect, useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'

const LeaveCalender = ({ em_id }) => {
    const [data, setData] = useState([])
    useEffect(() => {
        const getLeave = async () => {
            if (em_id !== '') {
                const result = await axioslogin.get(`/leaveRequestType/leavesetdata/${em_id}`)
                const { success, data } = result.data
                if (success === 1) {
                    setData(data[0])
                }
            }
        }
        getLeave()
    }, [em_id])
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
                                    key={val.typeleve}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {val.typeleve}
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
        </Fragment >
    )
}

export default LeaveCalender
