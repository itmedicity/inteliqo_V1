import { Box, Paper, TableContainer } from '@mui/material'
import React from 'react'
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

const HolidayLeaveCard = ({ title, id, processStat }) => {
    const [hlData, sethlData] = useState([])
    const [loding, setLoding] = useState(false)

    useEffect(() => {
        setLoding(true)
        const getLeaveData = async () => {
            const result = await axioslogin.get(`/common/getleaveholiday/${id}`)
            const { success, data } = result.data;
            if (success === 1) {
                sethlData(data)
            } else {
                sethlData([])
            }
            setLoding(false)
        }
        processStat && getLeaveData()
        return (() => sethlData([]))
    }, [id, processStat])

    return (
        <Paper square sx={{ flex: 1, height: 250 }}>
            {/* <CustmTypog title={title} /> */}
            <Box>
                {loding && <LinearProgreeBar />}
                <TableContainer sx={{ maxHeight: 200 }} >
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
                            {hlData && hlData.map((row, index) => {
                                let holiday = row.hld_desc.toLowerCase()
                                return <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell component="th" scope="row" sx={{ textTransform: 'capitalize' }} >{holiday}</TableCell>
                                    <TableCell align="right">{row.hl_lv_credit}</TableCell>
                                    <TableCell align="right">{row.hl_lv_taken}</TableCell>
                                    <TableCell align="right">{row.hl_lv_credit - row.hl_lv_taken}</TableCell>
                                </TableRow>
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Paper>
    )
}

export default memo(HolidayLeaveCard)