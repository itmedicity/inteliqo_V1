import React, { memo, Fragment } from 'react'
import { Stack, Alert } from '@mui/material';

const ModelProcessCompleted = ({ name }) => {
    return (
        <Fragment>
            <Stack sx={{ width: '100%', marginY: 0.3 }} spacing={2} direction="row" justifyContent="space-around" alignItems="center" >
                <Alert severity="success" style={{ paddingTop: 0, paddingBottom: 0, width: "100%" }} >{name} Copied </Alert>
            </Stack>
        </Fragment>
    )
}

export default memo(ModelProcessCompleted)