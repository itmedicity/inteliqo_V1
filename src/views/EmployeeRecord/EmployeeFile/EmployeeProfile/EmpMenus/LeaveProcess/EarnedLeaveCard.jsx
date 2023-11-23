import { Box, Paper, TableContainer } from '@mui/material'
import React from 'react'
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

    console.log(processStat);

    useEffect(() => {

        setLoding(true)
        const getLeaveData = async () => {

            const result = await axioslogin.get(`/common/getearnleave/${id}`)
            const { success, data } = result.data;
            console.log(result.data);
            if (success === 1) {
                console.log("fgd");
                console.log(data);
                setelData(data)
            } else {
                setelData([])
            }
            setLoding(false)
        }
        processStat && getLeaveData(id)
        return (() => setelData([]))
    }, [id, processStat])
    console.log(elData);
    console.log(loding);
    return (
        <Paper square sx={{ flex: 1, }}>
            {/* <CustmTypog title={title} /> */}
            <Box>
                {loding && <LinearProgreeBar />}
                <TableContainer sx={{ maxHeight: 200 }} >
                    <Table stickyHeader={false} size="small" aria-label="a sticky dense table"  >
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
                                <TableRow hover key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell component="th" scope="row">{row.ernlv_mnth + ` - ` + row.year}</TableCell>
                                    <TableCell align="right">{row.ernlv_credit}</TableCell>
                                    <TableCell align="right">{row.ernlv_taken}</TableCell>
                                    <TableCell align="right">{row.ernlv_credit - row.ernlv_taken}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Paper>
    )
}

export default memo(EarnedLeaveCard)