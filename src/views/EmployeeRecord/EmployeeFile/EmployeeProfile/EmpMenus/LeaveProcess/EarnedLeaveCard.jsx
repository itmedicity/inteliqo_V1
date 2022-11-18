import { Box, Paper } from '@mui/material'
import React from 'react'
import CustmTypog from 'src/views/Component/MuiCustomComponent/CustmTypog'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { memo } from 'react';
import { useState } from 'react';
import LinearProgreeBar from 'src/views/Component/MuiCustomComponent/LinearProgreeBar';
import { axioslogin } from 'src/views/Axios/Axios';
import { useEffect } from 'react';

const EarnedLeaveCard = ({ title, id, processStat }) => {
    const [elData, setelData] = useState([])
    const [loding, setLoding] = useState(false)

    useEffect(() => {
        setLoding(true)
        const getLeaveData = async () => {
            const result = await axioslogin.get(`/common/getearnleave/${id}`)
            const { success, data } = result.data;
            if (success === 1) {
                setelData(data)
            } else {
                setelData([])
            }
            setLoding(false)
        }
        processStat && getLeaveData()
        return (() => setelData([]))
    }, [id, processStat])

    return (
        <Paper square sx={{ flex: 1 }}>
            <CustmTypog title={title} />
            <Box>
                {loding && <LinearProgreeBar />}
                <Table size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow sx={{ height: 5 }} >
                            <TableCell variant='body' sx={{ fontWeight: 550 }} >Name</TableCell>
                            <TableCell variant='body' sx={{ fontWeight: 550 }} align="right">Credited</TableCell>
                            <TableCell variant='body' sx={{ fontWeight: 550 }} align="right">Taken</TableCell>
                            <TableCell variant='body' sx={{ fontWeight: 550 }} align="right">Balance</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {elData && elData.map((row, index) => (
                            <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row">{row.ernlv_mnth + ` - ` + row.year}</TableCell>
                                <TableCell align="right">{row.ernlv_credit}</TableCell>
                                <TableCell align="right">{row.ernlv_taken}</TableCell>
                                <TableCell align="right">{row.ernlv_credit - row.ernlv_taken}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Box>
        </Paper>
    )
}

export default memo(EarnedLeaveCard)