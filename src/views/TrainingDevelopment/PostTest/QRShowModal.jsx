import { Button, Modal, ModalDialog } from '@mui/joy';
import { Box, Paper, Typography } from '@mui/material';
import React, { Fragment, memo, useCallback } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const QRShowModal = ({ open, tslno }) => {

    const topic_slno = tslno;

    const history = useHistory()

    const GotoLogin = useCallback(() => {
        history.push(`/PreLogInpage/${topic_slno}`)
    }, [history, topic_slno])

    return (
        <Fragment>
            <Modal
                aria-labelledby="modal-title"
                aria-describedby="modal-desc"
                open={open}
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
                <ModalDialog size="lg">
                    <Paper elevation={0} sx={{ size: 'lg', fontWeight: "bold", width: "100%", textAlign: "center", p: 1 }}>
                        <Typography sx={{ size: 'lg', color: "#186F65", fontWeight: "bold" }}>Good Luck</Typography>
                        <Typography sx={{ color: "steelblue", mt: 1 }}>Training Successfully completed</Typography>

                        <Box sx={{ mt: 1 }}>
                            <Button sx={{ backgroundColor: "blue", color: "white", p: 1 }} onClick={GotoLogin} >
                                OK
                            </Button>
                        </Box>

                    </Paper>
                </ModalDialog>
            </Modal>
        </Fragment>
    );
}

export default memo(QRShowModal)
