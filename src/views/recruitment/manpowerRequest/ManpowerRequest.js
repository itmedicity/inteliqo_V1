import { Box } from '@mui/joy'
import React from 'react'
import CustmTypog from 'src/views/Component/MuiCustomComponent/CustmTypog'

const ManpowerRequest = () => {
    return (
        <Box sx={{ width: "100%" }}>
            <CustmTypog title={'Manpower Requisition Form'} />
            <Box sx={{ display: 'flex' }}>
                <Box>Job Tittle</Box>

            </Box>
        </Box>
    )
}

export default ManpowerRequest
