import { Typography } from '@material-ui/core'
import { Alert, Stack } from '@mui/material'
import React, { Fragment } from 'react'

const ResignationComponent = () => {
    return (
        <Fragment>
            <Stack sx={{ width: '100%', height: '10px' }} spacing={2}>
                <Alert severity="error" >HR Policy Is Applicable For 24-Hour Resignation</Alert>
            </Stack>
        </Fragment >
    )
}

export default ResignationComponent
