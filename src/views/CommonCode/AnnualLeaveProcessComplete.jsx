import React, { Fragment, memo } from 'react'
import DialogContentText from '@mui/material/DialogContentText';

const AnnualLeaveProcessComplete = ({ name }) => {
    return (
        <Fragment>
            <DialogContentText id="alert-dialog-slide-descriptiona">
                {name}  Already Processed

            </DialogContentText>


        </Fragment>
    )
}

export default memo(AnnualLeaveProcessComplete)
