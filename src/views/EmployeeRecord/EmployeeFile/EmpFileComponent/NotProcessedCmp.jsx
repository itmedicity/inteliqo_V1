import { Alert, AlertTitle, Stack } from '@mui/material'
import React, { Fragment } from 'react'

const NotProcessedCmp = ({ name }) => {
    return (
        <Fragment>
            <Stack sx={{ height: '100%' }} >
                <Alert severity="info" sx={{ height: '100%' }}>
                    <AlertTitle>Not Processed</AlertTitle>
                    {name} Not Processed  — <strong>Do the Process For avail !</strong>
                </Alert>
            </Stack>
        </Fragment>
    )
}

export default NotProcessedCmp