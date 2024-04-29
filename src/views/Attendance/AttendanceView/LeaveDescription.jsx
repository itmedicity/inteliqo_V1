import { Typography } from '@mui/joy'
import React, { memo } from 'react'

const LeaveDescription = ({ lvename, desc }) => {
    return (
        <Typography
            level="body-md"
            fontFamily="monospace"
            color="success"
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