import { Box } from '@mui/material'
import React, { memo } from 'react'
import CustomLayout from 'src/views/Component/MuiCustomComponent/CustomLayout'

const ManualRequestMain = () => {
    return (
        <CustomLayout title="Manual Request" displayClose={true} >
            <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>


            </Box>

        </CustomLayout>
    )
}

export default memo(ManualRequestMain) 