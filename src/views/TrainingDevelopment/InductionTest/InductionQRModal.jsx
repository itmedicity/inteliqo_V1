import React, { Fragment, memo, useCallback, useMemo } from 'react'
import { Modal, ModalClose, ModalDialog } from '@mui/joy';
import { Paper } from '@mui/material';
import { QRCodeSVG } from 'qrcode.react';
import { QR_URL } from '../../Constant/Static'

const InductionQRModal = ({ QRdata, QRmodal, setQRmodal, em_id }) => {

    const EmId = parseInt(em_id)
    const data = useMemo(() => QRdata, [QRdata])
    const { topic_slno, schedule_slno, topic_post, topic_pre } = data;

    const handleClose = useCallback(() => {
        setQRmodal(false);
    }, [setQRmodal]);

    const loginpage = `${QR_URL}/InductLogInpage/${topic_slno}/${schedule_slno}`

    console.log(loginpage);

    const feedback = `${QR_URL}/FeedbackPageWithoutTest/${topic_slno}/${schedule_slno}/${EmId}`
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
                            // value={loginpage}
                            value={topic_pre === 1 && topic_post === 1 ? loginpage : feedback}
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
