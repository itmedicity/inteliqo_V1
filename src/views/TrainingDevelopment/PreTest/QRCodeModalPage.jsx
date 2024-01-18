import React, { Fragment, memo, useCallback } from 'react'
import { Modal, ModalClose, ModalDialog } from '@mui/joy';
import { Paper } from '@mui/material';
import { QRCodeSVG } from 'qrcode.react';

const QRCodeModalPage = ({ QRdata, QRmodal, setQRmodal }) => {

    const { question_count, topic_slno, slno, em_id
    } = QRdata[0]

    const handleClose = useCallback(() => {
        setQRmodal(false);
    }, [setQRmodal]);

    const Questlink = `http://192.168.22.3:3000/OnlinePreTest/${slno}/${em_id}/${topic_slno}/${question_count}`


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
                            value={Questlink}
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

export default memo(QRCodeModalPage)
