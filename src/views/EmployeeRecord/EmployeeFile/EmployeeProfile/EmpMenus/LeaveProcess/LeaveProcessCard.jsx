import { Button } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { memo } from 'react'
import CustomTypoTwo from 'src/views/Component/MuiCustomComponent/CustomTypoTwo'

const LeaveProcessCard = ({ title }) => {
    return (
        <Box sx={{ display: 'flex', p: 0.3, height: 30, }}>
            <CustomTypoTwo title={title} bgColor='#dfe6e9' />
            <Box sx={{ display: 'flex', height: 25, width: '30%', pt: 0.05 }} >
                <Button variant="outlined" sx={{ mx: 0.5, flex: 1, mt: 0.01 }} >
                    Process
                </Button>
            </Box>
        </Box>
    )
}

export default memo(LeaveProcessCard)