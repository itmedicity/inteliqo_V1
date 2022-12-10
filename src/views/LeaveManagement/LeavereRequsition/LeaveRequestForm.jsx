import { Button, Checkbox, CssVarsProvider } from '@mui/joy'
import { Box, Paper, TextField } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import React from 'react'
import { useState } from 'react'
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import CommonLeaveOptionCmp from './Func/CommonLeaveOptionCmp'
import { getCommonLeaveData } from 'src/redux/actions/LeaveReqst.action'
import { useDispatch } from 'react-redux'

const LeaveRequestForm = () => {
    const dispatch = useDispatch()
    const [checkBx, setCheckBx] = useState(false)
    const [sgleCheck, setSgleCheck] = useState(false)

    const singleLeaveTypeCheckOption = (e) => {
        setSgleCheck(e.target.checked)
        dispatch(getCommonLeaveData());
    }

    return (
        <Paper variant="outlined" sx={{ display: "flex", flex: 1, p: 0.5, mb: 0.5, alignItems: 'center' }} >
            <Box sx={{ display: "flex", px: 1 }} >
                <CssVarsProvider>
                    <Checkbox
                        color="danger"
                        label="Date Range"
                        size="lg"
                        variant="outlined"
                        checked={checkBx}
                        onChange={(e) => setCheckBx(e.target.checked)}
                    />
                </CssVarsProvider>
            </Box>
            <Box sx={{ display: "flex", p: 0.5 }} >
                <LocalizationProvider dateAdapter={AdapterMoment}>
                    <DatePicker
                        views={['day']}
                        inputFormat="DD-MM-YYYY"
                        // value={fromDate}
                        // onChange={(date) =>
                        //     dispatch({ type: FROM_DATE, from: moment(date).format('YYYY-MM-DD') })
                        // }
                        renderInput={(params) => (
                            <TextField {...params} helperText={null} size="small" sx={{ display: 'flex', pt: 0.5 }} />
                        )}
                    />
                </LocalizationProvider>
            </Box>
            {
                checkBx && <Box sx={{ display: "flex", p: 0.5 }} >
                    <LocalizationProvider dateAdapter={AdapterMoment}>
                        <DatePicker
                            views={['day']}
                            inputFormat="DD-MM-YYYY"
                            // value={fromDate}
                            // onChange={(date) =>
                            //     dispatch({ type: FROM_DATE, from: moment(date).format('YYYY-MM-DD') })
                            // }
                            renderInput={(params) => (
                                <TextField {...params} helperText={null} size="small" sx={{ display: 'flex', pt: 0.5 }} />
                            )}
                        />
                    </LocalizationProvider>
                </Box>
            }
            <Box sx={{ display: "flex", px: 1 }} >
                <CssVarsProvider>
                    <Checkbox
                        color="danger"
                        label="Leave Type"
                        size="lg"
                        variant="outlined"
                        checked={sgleCheck}
                        onChange={(e) => singleLeaveTypeCheckOption(e)}
                    />
                </CssVarsProvider>
            </Box>
            <Box sx={{ display: "flex", flex: 1, px: 1 }} >
                <CommonLeaveOptionCmp active={sgleCheck} />
            </Box>
            <Box sx={{ display: "flex", p: 0.2 }} >
                <CssVarsProvider>
                    <Button aria-label="Like" variant="outlined" color="neutral" onClick={() => { }} sx={{
                        color: '#90caf9'
                    }} >
                        <PublishedWithChangesIcon />
                    </Button>
                </CssVarsProvider>
            </Box>
        </Paper >
    )
}

export default LeaveRequestForm