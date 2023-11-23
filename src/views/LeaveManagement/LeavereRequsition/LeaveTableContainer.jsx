import { Paper } from '@mui/material'
import React, { memo } from 'react'
import LeaveCalanderEmp from './Func/LeaveCalanderEmp'
import RequestedLeaveTable from './Func/RequestedLeaveTable'

const LeaveTableContainer = () => {
    return (
        <Paper variant="outlined" sx={{ display: "flex", flex: 1, p: 0.3, mb: 0.5 }} >
            <LeaveCalanderEmp />
            <RequestedLeaveTable />
        </Paper>
    )
}

export default memo(LeaveTableContainer) 