import React, { Fragment, memo, useCallback } from 'react'
import { Modal, ModalClose, ModalDialog } from '@mui/joy';
import { Paper } from '@mui/material';

const FileopenModal = ({ setopen, open, uploads, Reset }) => {

    const handleClose = useCallback(() => {
        setopen(false);
        Reset();
    }, [setopen, Reset]);

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
                    <Paper>
                        <img
                            src={uploads}
                            height={400}
                            alt='Error'
                            style={{ maxWidth: '100%', maxHeight: '100%' }}
                        />
                    </Paper>
                </ModalDialog>
            </Modal>
        </Fragment>
    );
};

export default memo(FileopenModal);
