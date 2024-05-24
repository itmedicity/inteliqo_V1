import React, { memo, useCallback } from 'react'
import { Box, Modal, ModalDialog } from '@mui/joy'
import ModalClose from '@mui/joy/ModalClose';
import { QRCodeSVG } from 'qrcode.react';
import { Paper } from '@mui/material';
const Assesmentmodal = ({ setIsModalOpen, isModalOpen, }) => {
    const Questlink = `http://192.168.22.5:3000/Question/`
    const onClose = useCallback((e) => {
        setIsModalOpen(false)
    }, [setIsModalOpen])
    return (
        <Box>
            <Modal
                aria-labelledby="modal-title"
                aria-describedby="modal-desc"
                open={isModalOpen}
                onClose={onClose}
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
        </Box>
    )
}

export default memo(Assesmentmodal)