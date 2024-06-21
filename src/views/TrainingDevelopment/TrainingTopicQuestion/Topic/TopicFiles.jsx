import React, { Fragment, memo, useCallback } from 'react'
import { Modal, ModalClose, ModalDialog } from '@mui/joy';
import { Paper } from '@mui/material';

const TopicFiles = ({ setopen, open, uploads, reset }) => {

    const handleClose = useCallback(() => {
        setopen(false);
        reset();
    }, [reset, setopen]);

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
                        <embed
                            id="pdf-embed"
                            src={uploads}
                            type="application/pdf"
                            height={500}
                            width="100%" />
                    </Paper>
                </ModalDialog>
            </Modal>
        </Fragment>
    );
};

export default memo(TopicFiles)

