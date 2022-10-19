import { CssVarsProvider } from '@mui/joy'
import React from 'react'
import IconButton from '@mui/joy/IconButton';
import SyncIcon from '@mui/icons-material/Sync';
import { memo } from 'react';

const CustomBtnProcess = ({ style, size, inactive, onClick }) => {

    return (
        <CssVarsProvider>
            <IconButton disabled={inactive} onClick={() => onClick()} variant="outlined" size='xs' sx={{ ...style, display: 'flex', color: '#1a7d36', }}  >
                <SyncIcon color='primary' />
            </IconButton >
        </CssVarsProvider>
    )
}

export default memo(CustomBtnProcess)