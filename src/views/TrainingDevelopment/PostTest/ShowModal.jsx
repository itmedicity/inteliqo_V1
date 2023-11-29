import { Modal, ModalClose, ModalDialog } from '@mui/joy';
import { Box, Paper, Typography } from '@mui/material';
import React, { Fragment, memo, useCallback } from 'react'
import { Button } from 'react-bootstrap';

const ShowModal = ({ open, setopen, setOpen }) => {

    const handleClose = useCallback(() => {
        setopen(false);
    }, [setopen]);

    const BtnClose = useCallback(() => {
        setopen(false);
        setOpen(false);
    }, [setopen, setOpen]);
    return (
        <Fragment>
            <Modal
                aria-labelledby="modal-title"
                aria-describedby="modal-desc"
                open={open}
                onClose={handleClose}
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
                <ModalDialog size="lg">
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
                    <Paper elevation={0} sx={{ size: 'lg', fontWeight: "bold", width: "100%", textAlign: "center", p: 1 }}>
                        <Typography sx={{ size: 'lg', color: "#186F65", fontWeight: "bold" }}>Good Luck</Typography>
                        <Typography sx={{ color: "steelblue", mt: 1 }}>Training Successfully completed</Typography>

                        <Box sx={{ mt: 1 }}>
                            <Button onClick={BtnClose}>
                                OK
                            </Button>
                        </Box>
                    </Paper>
                </ModalDialog>
            </Modal>
        </Fragment>
    );
}

export default memo(ShowModal)
