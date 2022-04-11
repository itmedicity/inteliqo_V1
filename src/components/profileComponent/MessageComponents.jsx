import { Dialog, DialogContent, Typography } from '@material-ui/core'
import React, { Fragment } from 'react'

const MessageComponents = ({ open, handleClosee, msglist }) => {
    return (
        <Fragment>
            <Dialog
                open={open}
                onClose={handleClosee}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                maxWidth="xl"
            >
                <DialogContent >
                    <Typography id="modal-modal-title" variant="button" component="h2" align="center" >
                        {msglist}
                    </Typography>
                </DialogContent>
            </Dialog>
        </Fragment>
    )
}

export default MessageComponents