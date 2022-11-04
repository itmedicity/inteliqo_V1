import { CssVarsProvider, Typography } from '@mui/joy'
import { Paper } from '@mui/material'
import React from 'react'
import { memo } from 'react'

const CustomTypoTwo = ({ title, bgColor, style }) => {
    return (
        <Paper sx={{
            ...style,
            display: 'flex',
            alignItems: 'center',
            px: 1,
            flex: 1,
            backgroundColor: bgColor,
            height: 25
        }} >
            <CssVarsProvider>
                <Typography
                    textColor="neutral.600" sx={{ display: 'flex', p: 0, m: 0 }} >
                    {title}
                </Typography>
            </CssVarsProvider>
        </Paper>
    )
}

export default memo(CustomTypoTwo)