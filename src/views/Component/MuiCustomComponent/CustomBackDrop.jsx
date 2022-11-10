import { Backdrop, CircularProgress } from '@mui/material'
import React from 'react'
import { memo } from 'react'

const CustomBackDrop = ({ open }) => {
    return (
        <Backdrop
            sx={{ color: '#f8dcfa', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={open}
        >
            <CircularProgress sx={{ color: '#ed7af5' }} />
        </Backdrop>
    )
}

export default memo(CustomBackDrop)