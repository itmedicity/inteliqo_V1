import { CssVarsProvider, Typography } from '@mui/joy'
import { Paper } from '@mui/material'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { memo } from 'react'

const CustomTypoTwo = ({ title, style, updateStatus }) => {
    const [description, setDescription] = useState(title)
    useEffect(() => {
        setDescription(title)
    }, [updateStatus, title])
    return (
        <Paper sx={{
            ...style,
            display: 'flex',
            alignItems: 'center',
            px: 1,
            flex: 1,
            backgroundColor: updateStatus === true ? '#c8e6c9' : '#ffcdd2',
            height: 25
        }} >
            <CssVarsProvider>
                <Typography
                    // textColor="neutral.600"
                    textColor={'#212121'}
                    sx={{ display: 'flex', p: 0, m: 0 }}
                >
                    {description}
                </Typography>
            </CssVarsProvider>
        </Paper>
    )
}

export default memo(CustomTypoTwo)