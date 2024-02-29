import React, { Fragment, memo, useCallback } from 'react'
import { Modal, ModalClose, ModalDialog } from '@mui/joy';
import { Paper } from '@mui/material';
import { QRCodeSVG } from 'qrcode.react';
import { QR_URL } from '../../Constant/Static'

const InductionQRModal = ({ QRdata, QRmodal, setQRmodal }) => {

    const { topic_slno, slno } = QRdata[0]

    const handleClose = useCallback(() => {
        setQRmodal(false);
    }, [setQRmodal]);

    const loginpage = `${QR_URL}/InductLogInpage/${topic_slno}/${slno}`
    return (
        <Fragment>
            <Modal
                aria-labelledby="modal-title"
                aria-describedby="modal-desc"
                open={QRmodal}
                onClose={handleClose}
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
                <ModalDialog size='lg'>
                    <ModalClose
                        variant="outlined"
                        sx={{
                            top: 'calc(-1/4 * var(--IconButton-size))',
                            right: 'calc(-1/4 * var(--IconButton-size))',
                            boxShadow: '0 2px 12px 0 rgba(0 0 0 / 0.2)',
                            borderRadius: '50%',
                            bgcolor: 'background.body',
                        }}
                    />
                    <Paper sx={{ px: 1, p: 2 }}>
                        <QRCodeSVG
                            value={loginpage}
                            size={200}
                            level='Q'
                            style={{ marginLeft: 7 }}
                        />
                    </Paper>
                </ModalDialog>
            </Modal>
        </Fragment>
    )
}


export default memo(InductionQRModal)
