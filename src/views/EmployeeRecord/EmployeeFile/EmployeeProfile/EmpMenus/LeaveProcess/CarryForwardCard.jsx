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
import { axioslogin } from 'src/views/Axios/Axios';
import { useEffect } from 'react';
import LinearProgreeBar from 'src/views/Component/MuiCustomComponent/LinearProgreeBar';

const CarryForwardCard = ({ title, id }) => {
    const [cfData, setcfData] = useState([])
    const [loding, setLoding] = useState(false)

    useEffect(() => {
        setLoding(true)
        const getLeaveData = async () => {
            const result = await axioslogin.get(`/common/carry/getcarryleave/${id}`)
            const { success, data } = result.data;
            if (success === 1) {
                setcfData(data)
            } else {
                setcfData([])
            }
            setLoding(false)
        }
        getLeaveData()
        return (() => setcfData([]))
    }, [id])

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
                        {cfData && cfData.map((row, index) => (
                            <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row">{row.name}</TableCell>
                                <TableCell align="right">{row.Credited}</TableCell>
                                <TableCell align="right">{row.Taken}</TableCell>
                                <TableCell align="right">{row.Credited - row.Taken}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Box>
        </Paper>
    )
}

export default memo(CarryForwardCard)