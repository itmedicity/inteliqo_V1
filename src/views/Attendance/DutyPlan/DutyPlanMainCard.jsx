import React from 'react'
import { memo } from 'react'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { Box } from '@mui/system'
import CustomLayout from 'src/views/Component/MuiCustomComponent/CustomLayout'
import DutyPlanTopCard from './DutyPlanTopCard'
import { eachDayOfInterval } from 'date-fns'
import { dutyPlanInitialState, dutyPlanReducer } from './DutyPlanFun/DutyPlanFun'
import moment from 'moment'
import { useReducer } from 'react'
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';

const DutyPlanMainCard = () => {

    const duty = [
        { name: 'Ajith Arjunan' },
        { name: 'Ajith Arjunan' },
        { name: 'Ajith Arjunan' },
        { name: 'Ajith Arjunan' },
        { name: 'Ajith Arjunan dfsfsdfdsf' },
        { name: 'Ajith Arjunan' },
        { name: 'Ajith Arjunansdfdsfsdfdsf' },
        { name: 'Ajith Arjunan' },
        { name: 'Ajith Arjunansdfsdfsdf' },
        { name: 'Ajith Arjunan' },
        { name: 'Ajith Arjunan' },
        { name: 'Ajith Arjunan' },
        { name: 'Ajith Arjunan' },
        { name: 'Ajith Arjunan' },
        { name: 'Ajith Arjunan' },
        { name: 'Ajith Arjunan' },
        { name: 'Ajith Arjunan' },
        { name: 'Ajith Arjunan' },
        { name: 'Ajith Arjunan' },
        { name: 'Ajith Arjunan dfsfsdfdsf' },
        { name: 'Ajith Arjunan' },
        { name: 'Ajith Arjunansdfdsfsdfdsf' },
        { name: 'Ajith Arjunan' },
        { name: 'Ajith Arjunansdfsdfsdf' },
        { name: 'Ajith Arjunan' },
        { name: 'Ajith Arjunan' },
        { name: 'Ajith Arjunan' },
        { name: 'Ajith Arjunan' },
        { name: 'Ajith Arjunan' },
        { name: 'Ajith Arjunan' },
    ]

    const [planState, dispatch] = useReducer(dutyPlanReducer, dutyPlanInitialState);
    const { fromDate, toDate, deptName, deptSecName } = planState;

    const dateRange = eachDayOfInterval({ start: new Date('2022-11-01'), end: new Date('2022-11-30') })
    const newDateFormat = dateRange.map((val) => { return { date: moment(val).format('MMM-D-dd'), sunday: moment(val).format('d') } })

    console.log(planState)



    console.log('render 2 ')
    return (
        <CustomLayout title="Duty Planning" >
            <Box sx={{ display: 'flex', flex: 1, px: 0.5, flexDirection: 'column', }} >
                <DutyPlanTopCard />
                <Paper square variant='outlined' sx={{ display: 'flex', p: 0.5, flex: 1 }} >
                    {/* employee Name Section */}
                    <Box sx={{ minWidth: 200 }}>
                        <TableContainer>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ p: 0 }}>Name</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {duty.map((row, index) => (
                                        <TableRow
                                            key={index}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row" key={index} sx={{ p: 0 }}>
                                                {row.name}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                    {/* shift selecction section */}
                    <Box sx={{ minWidth: 600, maxWidth: 1423 }} >
                        <TableContainer component={Paper} >
                            <Table size="small" sx={{ minWidth: 600, maxWidth: 800 }} >
                                <TableHead>
                                    <TableRow>
                                        {newDateFormat.map((val, index) => (
                                            <TableCell key={index} sx={{ p: 0 }}>
                                                <Box sx={{ width: 100 }} >
                                                    {val.date}
                                                </Box>
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {newDateFormat.map((row, index) => (
                                        <TableRow
                                            key={index}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            {newDateFormat.map((val, index) => (
                                                <TableCell key={index} sx={{ p: 0 }}>
                                                    <Box sx={{ width: 100 }} >
                                                        {val.date}
                                                    </Box>
                                                </TableCell>
                                            ))}
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

export default memo(DutyPlanMainCard)