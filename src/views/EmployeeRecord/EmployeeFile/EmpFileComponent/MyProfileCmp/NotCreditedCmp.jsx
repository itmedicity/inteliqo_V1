import { Alert, AlertTitle, Stack } from '@mui/material'
import React, { Fragment } from 'react'
const NotCreditedCmp = ({ name }) => {
    return (
        <Fragment>
            <Stack sx={{ height: '100%' }} >
                <Alert severity="warning" sx={{ height: '100%' }}>
                    <AlertTitle>Not Credited</AlertTitle>
                    {name}
                </Alert>
            </Stack>
        </Fragment>
    )
}

export default NotCreditedCmp