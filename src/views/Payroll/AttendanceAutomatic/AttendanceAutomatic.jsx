import { Box, Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, } from '@mui/material'
import React, { useEffect, useMemo, useState } from 'react'
import CustomLayout from 'src/views/Component/MuiCustomComponent/CustomLayout'
import AutomaticToCard from './AutomaticToCard'
import _ from 'underscore'
import { useSelector } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import { CssVarsProvider, Typography } from '@mui/joy'
import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined';
import ViewTable from './ViewTable'

const AttendanceAutomatic = () => {

    const [plan, setPlan] = useState([])
    const [fromdate, setfromdate] = useState('')
    const [todate, setTodate] = useState('')
    const [empData, setEmpdata] = useState([0])

    const planData = useSelector((state) => state?.getShiftPlanDetl?.shiftData, _.isEqual);

    const shiftPlanData = useMemo(() => planData, [planData]);

    useEffect(() => {
        Object.keys(shiftPlanData).length > 0 ? setPlan(shiftPlanData) : setPlan([]);
    }, [shiftPlanData])

    console.log('h')

    return (
        <CustomLayout title="Attendance Marking - Automatic" displayClose={true} >
            <ToastContainer />
            <Box sx={{ display: 'flex', flex: 1, px: 0.5, flexDirection: 'column', width: '100%' }}>
                <AutomaticToCard setfromdate={setfromdate} setTodate={setTodate}
                    setEmpdata={setEmpdata} empData={empData} />
                <Paper square variant='outlined' elevation={0} sx={{ display: "flex", alignItems: "center", }}  >
                    <Box sx={{ flex: 1 }} >
                        <CssVarsProvider>
                            <Typography startDecorator={<DragIndicatorOutlinedIcon />} textColor="neutral.400" sx={{ display: 'flex', }} >
                                Attendance Details
                            </Typography>
                        </CssVarsProvider>
                    </Box>
                </Paper>

                <Paper square variant="outlined" sx={{ display: 'flex', p: 0.5, flex: 1 }}>
                    {/* employee Name Section */}
                    <Box sx={{ width: '100%' }}>
                        <TableContainer>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ p: 0, backgroundColor: '#F5F5F6', border: 0.1, borderColor: '#E1E6E1' }}>
                                            <Box component={Grid} item sx={{ minHeight: 25, maxHeight: 25, p: 0.2 }}>
                                                Name
                                            </Box>
                                        </TableCell>
                                        <TableCell sx={{ p: 0, backgroundColor: '#F5F5F6', border: 0.1, borderColor: '#E1E6E1' }}>
                                            <Box component={Grid} item sx={{ minHeight: 25, maxHeight: 25, p: 0.2 }}>
                                                ID #
                                            </Box>
                                        </TableCell>
                                        <TableCell sx={{ p: 0, backgroundColor: '#F5F5F6', border: 0.1, borderColor: '#E1E6E1' }}>
                                            <Box component={Grid} item sx={{ minHeight: 25, maxHeight: 25, p: 0.2 }}>
                                                Total Days
                                            </Box>
                                        </TableCell>
                                        <TableCell sx={{ p: 0, backgroundColor: '#F5F5F6', border: 0.1, borderColor: '#E1E6E1' }}>
                                            <Box component={Grid} item sx={{ minHeight: 25, maxHeight: 25, p: 0.2 }}>
                                                Actual Worked
                                            </Box>
                                        </TableCell>
                                        <TableCell sx={{ p: 0, backgroundColor: '#F5F5F6', border: 0.1, borderColor: '#E1E6E1' }}>
                                            <Box component={Grid} item sx={{ minHeight: 25, maxHeight: 25, p: 0.2 }}>
                                                Calculated Worked
                                            </Box>
                                        </TableCell>
                                        <TableCell sx={{ p: 0, backgroundColor: '#F5F5F6', border: 0.1, borderColor: '#E1E6E1' }}>
                                            <Box component={Grid} item sx={{ minHeight: 25, maxHeight: 25, p: 0.2 }}>
                                                OFF Days
                                            </Box>
                                        </TableCell>
                                        <TableCell sx={{ p: 0, backgroundColor: '#F5F5F6', border: 0.1, borderColor: '#E1E6E1' }}>
                                            <Box component={Grid} item sx={{ minHeight: 25, maxHeight: 25, p: 0.2 }}>
                                                Leaves
                                            </Box>
                                        </TableCell>
                                        <TableCell sx={{ p: 0, backgroundColor: '#F5F5F6', border: 0.1, borderColor: '#E1E6E1' }}>
                                            <Box component={Grid} item sx={{ minHeight: 25, maxHeight: 25, p: 0.2 }}>
                                                Leave Without Pay
                                            </Box>
                                        </TableCell>
                                        <TableCell sx={{ p: 0, backgroundColor: '#F5F5F6', border: 0.1, borderColor: '#E1E6E1' }}>
                                            <Box component={Grid} item sx={{ minHeight: 25, maxHeight: 25, p: 0.2 }}>
                                                Loss Of Pay
                                            </Box>
                                        </TableCell>
                                        <TableCell sx={{ p: 0, backgroundColor: '#F5F5F6', border: 0.1, borderColor: '#E1E6E1' }}>
                                            <Box component={Grid} item sx={{ minHeight: 25, maxHeight: 25, p: 0.2 }}>
                                                Calculated LOP
                                            </Box>
                                        </TableCell>
                                        <TableCell sx={{ p: 0, backgroundColor: '#F5F5F6', border: 0.1, borderColor: '#E1E6E1' }}>
                                            <Box component={Grid} item sx={{ minHeight: 25, maxHeight: 25, p: 0.2 }}>
                                                Holiday
                                            </Box>
                                        </TableCell>
                                        <TableCell sx={{ p: 0, backgroundColor: '#F5F5F6', border: 0.1, borderColor: '#E1E6E1' }}>
                                            <Box component={Grid} item sx={{ minHeight: 25, maxHeight: 25, p: 0.2 }}>
                                                Holiday Worked
                                            </Box>
                                        </TableCell>
                                        <TableCell sx={{ p: 0, backgroundColor: '#F5F5F6', border: 0.1, borderColor: '#E1E6E1' }}>
                                            <Box component={Grid} item sx={{ minHeight: 25, maxHeight: 25, p: 0.2 }}>
                                                Total Pay Day
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {plan.map((row, index) => (
                                        <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                            <TableCell component="th" scope="row" sx={{ py: 0, px: 0.5, backgroundColor: '#f1faee', width: 100, border: 0.1, borderColor: '#E1E6E1' }}>
                                                <Box component={Grid} item sx={{ minHeight: 25, maxHeight: 25, p: 0.2, fontWeight: 'normal', textOverflow: 'ellipsis', width: 100, }}>
                                                    <Typography variant="body2" gutterBottom noWrap={true}>
                                                        {row.em_name}
                                                    </Typography>
                                                </Box>
                                            </TableCell>
                                            <TableCell component="th" scope="row" sx={{ py: 0, px: 0.5, width: 100, border: 0.1, borderColor: '#E1E6E1' }}>
                                                <Box component={Grid} item sx={{ minHeight: 25, maxHeight: 25, p: 0.2, fontWeight: 'normal', textOverflow: 'ellipsis', width: 100, }}>
                                                    <Typography variant="body2" gutterBottom noWrap={true}>
                                                        {row.em_no}
                                                    </Typography>
                                                </Box>
                                            </TableCell>
                                            <ViewTable empid={row.em_id} fromdate={fromdate} todate={todate} salary={row.gross_salary} setEmpdata={setEmpdata} empData={empData} />
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                </Paper>
            </Box>
        </CustomLayout>
    )
}

export default AttendanceAutomatic