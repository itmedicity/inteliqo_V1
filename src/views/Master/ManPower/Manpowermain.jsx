import { Box } from '@mui/joy';
import React, { memo, lazy } from 'react'
import MasterLayout from '../MasterComponents/MasterLayout';

const Manpowersearch = lazy(() => import('./Manpowersearch'))

const Manpowermain = () => {


    return (

        <Box sx={{ display: 'flex', flex: 1, flexDirection: 'column', height: window.innerHeight - 85, }} >
            <MasterLayout title={"ManPower Planning"} displayClose={true}>
                <Box sx={{ display: 'flex', flex: 1, py: 0.5, }} >
                    <Manpowersearch />
                </Box>
            </MasterLayout>
        </Box>
    )
}

export default memo(Manpowermain) 