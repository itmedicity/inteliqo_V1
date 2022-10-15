import { Alert } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { memo } from 'react'
import CustomBtnProcess from 'src/views/Component/MuiCustomComponent/CustomBtnProcess'

const LeaveProcessRenderComp = ({ message }) => {
    return (
        <Box sx={{ flex: 5, p: 0.2 }} >
            <Alert
                variant="outlined"
                severity="error"
                sx={{ py: 0, display: 'flex', justifyContent: 'center' }}
                action={
                    <CustomBtnProcess style={{ p: 0.3 }} />
                }
            >
                {message}
            </Alert>
        </Box>
    )
}

export default memo(LeaveProcessRenderComp)