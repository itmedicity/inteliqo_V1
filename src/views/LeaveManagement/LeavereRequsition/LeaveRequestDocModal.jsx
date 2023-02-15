import React from 'react'
import Box from '@mui/joy/Box';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import { memo } from 'react';

const LeaveRequestDocModal = ({ open, setOpen }) => {
    return (
        <Modal
            aria-labelledby="alert-dialog-modal-title"
            aria-describedby="alert-dialog-modal-description"
            open={open}
            onClose={() => setOpen(false)}
        >
            <ModalDialog variant="outlined" role="alertdialog">
                <Box sx={{ minHeight: 300, maxHeight: 600, minWidth: 300, maxWidth: 600 }} >
                    <img
                        height={600}
                        width={600}
                        // src="https://images.unsplash.com/photo-1502657877623-f66bf489d236"
                        // srcSet="https://images.unsplash.com/photo-1502657877623-f66bf489d236?auto=format&fit=crop&w=800&dpr=2 2x"
                        alt="Leave Request Documents"
                    />
                </Box>
            </ModalDialog>
        </Modal>
    )
}

export default memo(LeaveRequestDocModal)