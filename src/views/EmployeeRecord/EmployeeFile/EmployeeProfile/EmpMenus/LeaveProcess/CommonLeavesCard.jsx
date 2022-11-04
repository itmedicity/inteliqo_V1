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

const CommonLeavesCard = ({ title, id }) => {
    const [cmData, setcmData] = useState([])
    const [loding, setLoding] = useState(false)

    useEffect(() => {
        setLoding(true)
        const getLeaveData = async () => {
            const result = await axioslogin.get(`/common/getleavecommon/${id}`)
            const { success, data } = result.data;
            if (success === 1) {
                setcmData(data)
            } else {
                setcmData([])
            }
            setLoding(false)
        }
        getLeaveData()
        return (() => setcmData([]))
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
                        {cmData && cmData.map((row, index) => {
                            let commnLeave = row.lvetype_desc.toLowerCase()
                            return (<TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row" sx={{ textTransform: 'capitalize' }} >{commnLeave}</TableCell>
                                <TableCell align="right">{row.cmn_lv_allowed}</TableCell>
                                <TableCell align="right">{row.cmn_lv_taken}</TableCell>
                                <TableCell align="right">{row.cmn_lv_balance}</TableCell>
                            </TableRow>)
                        })}
                    </TableBody>
                </Table>
            </Box>
        </Paper>
    )
}

export default memo(CommonLeavesCard)