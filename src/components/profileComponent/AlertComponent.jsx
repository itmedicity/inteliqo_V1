import React, { Fragment } from 'react'
import styled from '@emotion/styled';
import Backdrop from '@mui/material/Backdrop'
import { Dialog, DialogContent } from '@mui/material';
import { Typography } from '@mui/joy';
const AlertComponent = ({ open, handleClosee, alertmsg }) => {
    return (
        <Fragment>
            <Dialog
                open={open}
                onClose={handleClosee}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                BackdropComponent={styled(Backdrop, {
                    name: 'MuiModal', slot: 'Backdrop',
                    overridesResolver: (props, styles) => { return styles.backdrop; },
                })({ zIndex: -1, })}
            >
                <DialogContent>
                    <Typography id="modal-modal-title" variant="overline" component="h2">
                        {alertmsg}
                    </Typography>
                </DialogContent>
            </Dialog>
        </Fragment>
    )
}

export default AlertComponent