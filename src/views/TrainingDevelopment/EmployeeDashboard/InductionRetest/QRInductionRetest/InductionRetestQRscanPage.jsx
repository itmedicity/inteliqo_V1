
import React, { Fragment, memo, useCallback } from 'react'
import { Modal, ModalClose, ModalDialog } from '@mui/joy';
import { Paper } from '@mui/material';
import { QRCodeSVG } from 'qrcode.react';
import { QR_URL } from '../../../../Constant/Static'

const InductionRetestQRscanPage = ({ Selecteddata, opeQRCodeModal, setopeQRCodeModal }) => {

    const { re_topic, retest_em_no } = Selecteddata[0]

    const handleClose = useCallback(() => {
        setopeQRCodeModal(false);
    }, [setopeQRCodeModal]);

    const Questlink = `${QR_URL}/InductQREmpDetails/${retest_em_no}/${re_topic}`

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

export default memo(InductionRetestQRscanPage)



