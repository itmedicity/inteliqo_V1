import { Button, Modal, ModalDialog } from '@mui/joy';
import { Box, Paper, Typography } from '@mui/material';
import React, { Fragment, memo, useCallback, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const SubmitModal = ({ open, Empdatas }) => {

    const history = useHistory()

    const [data, setData] = useState({
        topic_slno: 0,
        schedule_no: 0,
        induct_detail_date: '',
        trainers: [],
        em_id: 0,
    });

    const { topic_slno, schedule_no, em_id } = data;

    useEffect(() => {
        if (Object.keys(Empdatas).length !== 0) {
            const { topic_slno, schedule_no, induct_detail_date, trainers, em_id } = Empdatas;
            const obj = {
                topic_slno: topic_slno,
                schedule_no: schedule_no,
                induct_detail_date: induct_detail_date,
                trainers: trainers,
                em_id: em_id,
            }
            setData(obj);
        }
    }, [Empdatas, setData])

    const GotoLogin = useCallback(() => {
        history.push(`/FeedbackPage/${topic_slno}/${schedule_no}/${em_id}`)
    }, [history, topic_slno, schedule_no, em_id])

    return (
        <Fragment>
            <Paper>
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
                {/* {fedbk_flag === 1 ? < FeedbackPage fedbk_flag={fedbk_flag} modalData={modalData} SetmodalData={SetmodalData} SetFedbk_flag={SetFedbk_flag} /> : null} */}
            </Paper>
        </Fragment>
    );
}

export default memo(SubmitModal)
