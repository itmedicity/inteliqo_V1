
import React, { Fragment, memo, useCallback } from 'react'
import { Modal, ModalClose, ModalDialog } from '@mui/joy';
import { Paper } from '@mui/material';
import { QRCodeSVG } from 'qrcode.react';
import { QR_URL } from '../../Constant/Static'

const RetestQRscanPage = ({ Selecteddata, opeQRCodeModal, setopeQRCodeModal }) => {

    const { retest_topic, candidate_em_no
    } = Selecteddata[0]

    const handleClose = useCallback(() => {
        setopeQRCodeModal(false);
    }, [setopeQRCodeModal]);

    const Questlink = `${QR_URL}/RetestEmpDetails/${candidate_em_no}/${retest_topic}`

    return (
        <Fragment>
            <Modal
                aria-labelledby="modal-title"
                aria-describedby="modal-desc"
                open={opeQRCodeModal}
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
                            size={300}
                            level='Q'
                        />
                    </Paper>
                </ModalDialog>
            </Modal>
        </Fragment>
    )
}

export default memo(RetestQRscanPage)
