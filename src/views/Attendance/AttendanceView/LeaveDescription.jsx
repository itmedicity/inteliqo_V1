import { Typography } from '@mui/joy'
import React, { memo } from 'react'

const LeaveDescription = ({ lvename, desc, color }) => {
    return (
        <Typography
            level="body-md"
            fontFamily="monospace"
            color={color}
            variant="solid"
            noWrap
            sx={{ borderRadius: 3, m: 0.5 }}
        > {lvename}-
            <Typography
                level="body-md"
                fontFamily="monospace"
                textColor='common.white'
                variant="plain"
            >
                {desc}
            </Typography>
        </Typography>
    )
}

export default memo(LeaveDescription) 