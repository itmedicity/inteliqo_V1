import { Paper } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { useMemo } from 'react';
import { memo } from 'react';
import LeaveCategoryInfo from './LeaveCategoryInfo';

const LeaveProcessComp = ({ empNumbers }) => {

    const emplyeeNumber = useMemo(() => empNumbers, [empNumbers])

    return (
        <Box sx={{ display: 'flex', flex: 1, mt: 0.2 }} >
            <Paper square sx={{ display: 'flex', flex: 1, }} >
                <Box sx={{ flex: 1, p: 0.3 }} >
                    {/* Leave category Information Box Start Here */}
                    <LeaveCategoryInfo empNumber={emplyeeNumber} />
                </Box>
            </Paper>
        </Box>
    )
}

export default memo(LeaveProcessComp)