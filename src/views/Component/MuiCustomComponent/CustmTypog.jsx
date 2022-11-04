import { CssVarsProvider, Typography } from '@mui/joy'
import React from 'react'
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { Paper } from '@mui/material';

const CustmTypog = ({ title }) => {
    return (
        <Paper square sx={{ backgroundColor: '#e8eaf6' }} >
            <CssVarsProvider>
                <Typography
                    startDecorator={<ArrowRightIcon />}
                    textColor="neutral.600" sx={{ display: 'flex', }} >
                    {title}
                </Typography>
            </CssVarsProvider>
        </Paper>
    )
}

export default CustmTypog