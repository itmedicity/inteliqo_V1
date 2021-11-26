import { CSpinner } from '@coreui/react'
import { LinearProgress } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import './Loader.css'
import Spinner from '../assets/brand/BlueSpinner.gif'

const FullPageloader = () => {
    return (
        <div className="loader-container" >
            <div className="loader">
                {/* <CSpinner color="info" /> */}
                <img src={Spinner} />
            </div>
        </div>
        // <Box sx={{ width: '100%' }}>
        //     <LinearProgress />
        // </Box>
    )
}

export default FullPageloader
