import React from 'react'
import { memo } from 'react'
import { Button, Paper } from '@mui/material'
import { Box } from '@mui/system'
import TextField from '@mui/material/TextField'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import moment from 'moment'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { useState } from 'react'
import DeptSelectByRedux from 'src/views/MuiComponents/DeptSelectByRedux'
import DeptSecSelectByRedux from 'src/views/MuiComponents/DeptSecSelectByRedux'
import SendIcon from '@mui/icons-material/Send'
import { useReducer } from 'react'
import { addDays, lastDayOfMonth } from 'date-fns/esm'
import { dutyPlanInitialState, dutyPlanReducer, planInitialState } from './DutyPlanFun/DutyPlanFun'

const DutyPlanTopCard = () => {
    const { FROM_DATE, TO_DATE, DEPT_NAME, DEPT_SEC_NAME } = planInitialState

    const setDepartment = (deptSlno) => dispatch({ type: DEPT_NAME, deptSlno })
    const setDepartSecName = (deptSecSlno) => dispatch({ type: DEPT_SEC_NAME, deptSecSlno })

    const [planState, dispatch] = useReducer(dutyPlanReducer, dutyPlanInitialState)
    const { fromDate, toDate, deptName, deptSecName } = planState

    const calanderMaxDate = lastDayOfMonth(new Date(fromDate))

    return (
        <Paper
            square
            variant="outlined"
            sx={{ display: 'flex', flex: 1, flexDirection: 'row', p: 0.5, alignItems: 'center', mb: 0.5 }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flex: {
                        xs: 4,
                        sm: 4,
                        md: 4,
                        lg: 4,
                        xl: 3,
                    },
                    flexDirection: 'row',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        mt: 0.5,
                        px: 0.3,
                        // width: { sm: 100, md: 100, lg: 100 },
                    }}
                >
                    <LocalizationProvider dateAdapter={AdapterMoment}>
                        <DatePicker
                            views={['day']}
                            // maxDate={moment(calanderMaxDate)}
                            inputFormat="DD-MM-YYYY"
                            value={fromDate}
                            onChange={(date) =>
                                dispatch({ type: FROM_DATE, from: moment(date).format('YYYY-MM-DD') })
                            }
                            renderInput={(params) => (
                                <TextField {...params} helperText={null} size="small" sx={{ display: 'flex' }} />
                            )}
                        />
                    </LocalizationProvider>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        mt: 0.5,
                        px: 0.3,
                        // width: { sm: , md: 100, lg: 100 },
                    }}
                >
                    <LocalizationProvider dateAdapter={AdapterMoment}>
                        <DatePicker
                            views={['day']}
                            minDate={moment(fromDate)}
                            maxDate={moment(calanderMaxDate)}
                            inputFormat="DD-MM-YYYY"
                            value={toDate}
                            onChange={(date) =>
                                dispatch({ type: TO_DATE, to: moment(date).format('YYYY-MM-DD') })
                            }
                            renderInput={(params) => (
                                <TextField {...params} helperText={null} size="small" sx={{ display: 'flex' }} />
                            )}
                        />
                    </LocalizationProvider>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        mt: 0.5,
                        px: 0.3,
                    }}
                >
                    <DeptSelectByRedux setValue={setDepartment} value={deptName} />
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        mt: 0.5,
                        px: 0.3,
                    }}
                >
                    <DeptSecSelectByRedux dept={deptName} setValue={setDepartSecName} value={deptSecName} />
                </Box>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flex: {
                        xs: 0,
                        sm: 0,
                        md: 0,
                        lg: 0,
                        xl: 1,
                    },
                }}
            >
                <Button variant="outlined" startIcon={<SendIcon />}>
                    Process
                </Button>
            </Box>
        </Paper>
    )
}

export default memo(DutyPlanTopCard)
