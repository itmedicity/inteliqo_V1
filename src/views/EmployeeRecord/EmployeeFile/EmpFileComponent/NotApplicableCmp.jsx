import { Alert, AlertTitle, Stack } from '@mui/material'
import React, { Fragment } from 'react'

const NotApplicableCmp = ({ name }) => {
    return (
        <Fragment>
            <Stack sx={{ height: '100%' }} >
                <Alert severity="warning" sx={{ height: '100%' }}>
                    <AlertTitle>Not Applicable</AlertTitle>
                    {name} Is Not Applicable For Current Employee <strong>Category</strong>
                </Alert>
            </Stack>
        </Fragment>
    )
}

export default NotApplicableCmp