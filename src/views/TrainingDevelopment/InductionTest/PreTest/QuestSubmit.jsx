import { Modal, ModalDialog } from '@mui/joy';
import { Box, Paper, Typography } from '@mui/material';
import React, { Fragment, memo, useCallback, useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import JoyCheckbox from 'src/views/MuiComponents/JoyComponent/JoyCheckbox';
import { useHistory } from 'react-router'
import { axioslogin } from 'src/views/Axios/Axios';
import { warningNofity } from 'src/views/CommonCode/Commonfunc';

const QuestSubmit = ({ data, id, emId, open, tslno, setopen }) => {

    const history = useHistory()

    const [offline, Setoffline] = useState(0);
    const [datas, setDatas] = useState({
        online_status: false,
        offline_status: false,
        both_status: false,
    });
    const topic_slno = tslno;
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

    const BtnClose = useCallback(async () => {
        const patchData = {
            online_mode: online_status === true ? 1 : 0,
            offline_mode: offline_status === true ? 1 : 0,
            slno: parseInt(id)
        }
        if (online_status === true) {
            const result = await axioslogin.patch('/InductionTest/update_online', patchData)
            const { success } = result.data
            if (success === 1) {
                history.push(`/InductOnlineTraining/${id}/${emId}`)
                setopen(false);
            }
            else {
                warningNofity("Not updated")

            }
        }
        else if (offline_status === true) {
            const result = await axioslogin.patch('/InductionTest/update_offline', patchData)
            const { success } = result.data
            if (success === 1) {
                history.push(`/InductLogInpage/${topic_slno}/${id}`)
            }
            else {
                warningNofity("Not updated")
                Setoffline(0)
            }
        }
    }, [online_status, Setoffline, offline_status, history, topic_slno, id, emId, setopen]);

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
                        {
                            offline === 1 ?
                                <Box sx={{ mt: 1 }}>
                                    <button style={{ backgroundColor: "blue", color: "white", p: 1 }} >OK</button>
                                </Box>

                                :
                                <Box sx={{ mt: 1 }}>
                                    <Button sx={{ backgroundColor: "blue", color: "white", p: 1 }} onClick={BtnClose}>
                                        OK
                                    </Button>
                                </Box>
                        }
                    </Paper>
                </ModalDialog>
            </Modal>
        </Fragment >
    );
}
export default memo(QuestSubmit)


