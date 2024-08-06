import { Typography } from '@mui/joy'
import React, { Fragment, memo } from 'react'

const ResignationComponent = () => {
    return (
        <Fragment>
            <Typography
                color="danger"
                level="body-sm"
                variant="outlined"
                sx={{ p: 0.8, borderRadius: 5 }}
            >
                HR Policy Applicable For 24-Hour Resignation Process
            </Typography>
        </Fragment >
    )
}

export default memo(ResignationComponent)
