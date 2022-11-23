import React from 'react'
import { memo } from 'react'
import {
    Button,
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material'
import { Box } from '@mui/system'
import CustomLayout from 'src/views/Component/MuiCustomComponent/CustomLayout'
import DutyPlanTopCard from './DutyPlanTopCard'
import { eachDayOfInterval } from 'date-fns'
import { dutyPlanInitialState, dutyPlanReducer } from './DutyPlanFun/DutyPlanFun'
import moment from 'moment'
import { useReducer } from 'react'
import ShiftSelect from './DutyPlanFun/ShiftSelect'
import { ToastContainer } from 'react-toastify'
import { useSelector } from 'react-redux'
import _ from 'underscore'
import { useEffect } from 'react'

const DutyPlanMainCard = () => {

    const duty = []

    const [planState, dispatch] = useReducer(dutyPlanReducer, dutyPlanInitialState)
    const { fromDate, toDate, deptName, deptSecName } = planState


    const dateRange = eachDayOfInterval({
        start: new Date('2022-11-01'),
        end: new Date('2022-11-05'),
    })
    const newDateFormat = dateRange.map((val) => {
        // return { date: moment(val).format('MMM-D'), sunday: moment(val).format('ddd') }
        return {}
    })

    // console.log(planState)

    console.log('render 2 ')
    return (
        <CustomLayout title="Duty Planning">
            <ToastContainer />
            <Box sx={{ display: 'flex', flex: 1, px: 0.5, flexDirection: 'column' }}>
                <DutyPlanTopCard />
                <Paper square variant="outlined" sx={{ display: 'flex', p: 0.5, flex: 1 }}>
                    {/* employee Name Section */}
                    <Box sx={{ minWidth: 200 }}>
                        <TableContainer>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ p: 0, backgroundColor: '#f1faee' }}>
                                            <Box component={Grid} item sx={{ minHeight: 25, maxHeight: 25, p: 0.2 }}>
                                                Name
                                            </Box>
                                        </TableCell>
                                        <TableCell sx={{ p: 0, backgroundColor: '#f1faee' }}>
                                            <Box component={Grid} item sx={{ minHeight: 25, maxHeight: 25, p: 0.2 }}>
                                                ID #
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell sx={{ p: 0, backgroundColor: '#f1faee' }}>
                                            <Box component={Grid} item sx={{ minHeight: 25, maxHeight: 25, p: 0.2 }}>
                                                Days
                                            </Box>
                                        </TableCell>
                                        <TableCell sx={{ p: 0, backgroundColor: '#f1faee' }}></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {duty.map((row, index) => (
                                        <TableRow
                                            key={index}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell
                                                component="th"
                                                scope="row"
                                                sx={{ py: 0, px: 0.5, backgroundColor: '#f1faee', width: 100 }}
                                            >
                                                <Box
                                                    component={Grid}
                                                    item
                                                    sx={{
                                                        minHeight: 25,
                                                        maxHeight: 25,
                                                        p: 0.2,
                                                        fontWeight: 'normal',
                                                        textOverflow: 'ellipsis',
                                                        width: 100,
                                                    }}
                                                >
                                                    <Typography variant="body2" gutterBottom noWrap={true}>
                                                        {row.name}
                                                    </Typography>
                                                </Box>
                                            </TableCell>
                                            <TableCell
                                                component="th"
                                                scope="row"
                                                sx={{ py: 0, px: 0.5, backgroundColor: '#f1faee', width: 50 }}
                                            >
                                                <Box
                                                    component={Button}
                                                    variant="outlined"
                                                    sx={{
                                                        minHeight: 25,
                                                        maxHeight: 25,
                                                        p: 0.2,
                                                        fontWeight: 'normal',
                                                    }}
                                                >
                                                    12568
                                                    {/* <DataSaverOnIcon /> */}
                                                </Box>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                    {/* shift selecction section */}

                    {/* <Box sx={{ minWidth: 600, maxWidth: 1423 }} > */}
                    <Box
                        component={Grid}
                        container
                        item
                        xs={12}
                        sm={12}
                        md={12}
                        lg={12}
                        xl={12}
                        sx={{
                            display: 'flex',
                            overflow: 'auto',
                            '::-webkit-scrollbar': {
                                height: 8,
                            },
                            '::-webkit-scrollbar-track': {
                                boxShadow: 'inset 0 0 5px rgb(255, 251, 251)',
                                borderRadius: '0px',
                            },

                            '::-webkit-scrollbar-thumb': {
                                // background: '#077DFA',
                                borderRadius: '0px',
                            },

                            '::-webkit-scrollbar-thumb:hover': {
                                //   background: 'rgb(255, 251, 251)',
                            },
                        }}
                    >
                        <TableContainer
                            component={Grid}
                            item
                            xs={'auto'}
                            sm={'auto'}
                            md={'auto'}
                            lg={'auto'}
                            xl={'auto'}
                            sx={{
                                display: 'flex',
                            }}
                        >
                            {/* <Table size="small" sx={{ minWidth: 600, maxWidth: 800 }} > */}
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        {newDateFormat.map((val, index) => (
                                            <TableCell key={index} sx={{ p: 0, backgroundColor: '#f1faee' }}>
                                                <Box
                                                    component={Grid}
                                                    item
                                                    sx={{ minHeight: 25, maxHeight: 25, textAlign: 'center' }}
                                                >
                                                    {val.date}
                                                </Box>
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                    <TableRow>
                                        {newDateFormat.map((val, index) => (
                                            <TableCell key={index} sx={{ p: 0, backgroundColor: '#f1faee' }}>
                                                <Box
                                                    component={Grid}
                                                    item
                                                    sx={{ minHeight: 25, maxHeight: 25, textAlign: 'center' }}
                                                >
                                                    {val.sunday}
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
                                                    <Box
                                                        component={Grid}
                                                        item
                                                        sx={{ display: 'flex', minHeight: 25, maxHeight: 25 }}
                                                    >
                                                        <ShiftSelect />
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
