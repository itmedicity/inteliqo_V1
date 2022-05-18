import React, { memo } from 'react'
import { Stack, Alert } from '@mui/material';

const AnnualLeaveProcessComplete = ({ name }) => {
    return (
        <Stack sx={{ width: '100%', marginY: 0.3 }} spacing={2} direction="row" justifyContent="space-around" alignItems="center" >
            <Alert severity="success" style={{ paddingTop: 0, paddingBottom: 0, width: "100%" }} >{name} Process Completed </Alert>
        </Stack>
    )
}

export default memo(AnnualLeaveProcessComplete)
