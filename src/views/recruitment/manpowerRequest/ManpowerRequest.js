import { Box, } from '@mui/joy';
import React, { memo, lazy } from 'react'
import { useHistory } from 'react-router-dom';
import DasboardCustomLayout from 'src/views/MuiComponents/DasboardCustomLayout';
const ManpowerForm = lazy(() => import('./ManpowerForm'))

const ManpowerRequest = () => {
    const history = useHistory();
    const toRedirectToHome = () => {
        history.push('/Home');
    }
    return (
        <Box sx={{ display: 'flex', flex: 1, flexDirection: 'column', }} >
            <DasboardCustomLayout title={" Manpower Requisition Form"} displayClose={true} setClose={toRedirectToHome} >
                <Box sx={{ display: 'flex', flex: 1, py: 0.5, height: window.innerHeight - 120 }} >
                    <ManpowerForm />
                </Box>
            </DasboardCustomLayout>
        </Box>
    )
}

export default memo(ManpowerRequest)
