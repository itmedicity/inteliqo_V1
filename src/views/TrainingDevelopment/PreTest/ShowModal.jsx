import { Modal, ModalClose, ModalDialog } from '@mui/joy';
import { Box, Paper, Typography } from '@mui/material';
import React, { Fragment, memo, useCallback, useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import JoyCheckbox from 'src/views/MuiComponents/JoyComponent/JoyCheckbox';
import { useHistory } from 'react-router'

const ShowModal = ({ data, open, setopen, setOpen }) => {

    const history = useHistory()
    const handleClose = useCallback(() => {
        setopen(false);
    }, [setopen]);

    const [datas, setDatas] = useState({
        online_status: false,
        offline_status: false,
        both_status: false
    });

    const { online_status, offline_status, both_status } = datas;
    useEffect(() => {
        if (Object.keys(data).length !== 0) {
            const { online_status, offline_status, both_status } = data[0];
            const obj = {
                online_status: online_status === 1 ? true : false,
                offline_status: offline_status === 1 ? true : false,
                both_status: both_status === 1 ? true : false
            }
            setDatas(obj);
        }
    }, [data, setDatas])

    const OnlineSection = useCallback((e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setDatas({ ...datas, [e.target.name]: value })
    }, [datas])

    const OfflineSection = useCallback((e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setDatas({ ...datas, [e.target.name]: value })
    }, [datas])

    const BtnClose = useCallback(() => {
        if (online_status === true) {
            history.push('/Home/OnlineTraining')
            setopen(false);
            setOpen(false);
        }
        else if (offline_status === true) {
            setopen(false);
            setOpen(false);
        }

    }, [online_status, history, offline_status, setopen, setOpen]);


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
                        <Typography sx={{ size: 'lg', color: "#186F65", fontWeight: "bold" }}>Good attempt!</Typography>
                        {online_status === true ?
                            <Typography sx={{ color: "steelblue", mt: 1 }}>Your next section will be held Online</Typography>
                            : null}

                        {offline_status === true ?
                            <Typography sx={{ color: "steelblue", mt: 1 }}>Your next section will be held Offline</Typography>
                            : null}

                        {both_status === true ?
                            <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                                <Box>
                                    <JoyCheckbox
                                        label='Online'
                                        checked={online_status}
                                        name="online_status"
                                        sx={{}}
                                        onchange={(e) => OnlineSection(e)}
                                    />

                                </Box>
                                <Box>
                                    <JoyCheckbox
                                        label='Offline'
                                        checked={offline_status}
                                        name="offline_status"
                                        onchange={(e) => OfflineSection(e)}
                                    />

                                </Box>
                            </Box>
                            : null}
                        <Box sx={{ mt: 1 }}>
                            <Button onClick={BtnClose}>
                                OK
                            </Button>
                        </Box>
                    </Paper>
                </ModalDialog>
            </Modal>
        </Fragment >
    );
}
export default memo(ShowModal)
