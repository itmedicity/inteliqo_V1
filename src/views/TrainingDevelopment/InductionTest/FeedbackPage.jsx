import { Box, Button, IconButton, Modal, ModalClose, ModalDialog, Textarea, Typography } from '@mui/joy'
import { Paper } from '@mui/material'
import React, { Fragment, memo, useCallback, useEffect, useState } from 'react'
import TagFacesIcon from '@mui/icons-material/TagFaces';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import MoodBadIcon from '@mui/icons-material/MoodBad';
import { succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';
import { axioslogin } from 'src/views/Axios/Axios';

const FeedbackPage = ({ open, Setopen, modalData, SetmodalData, SetFedbk_flag }) => {

    const [feedback, SetFeedback] = useState('');

    const [SelectedData, SetSelectedData] = useState({
        q1: 0,
        q2: 0,
        q3: 0,
        q4: 0,
    })

    const [data, setData] = useState({
        topic_slno: 0,
        schedule_no: 0,
        induct_detail_date: '',
        trainers: [],
        em_id: 0,
    });

    const { topic_slno, schedule_no, induct_detail_date, trainers, em_id } = data;

    useEffect(() => {
        if (Object.keys(modalData).length !== 0) {
            const { topic_slno, schedule_no, induct_detail_date, trainers, em_id } = modalData[0];
            const obj = {
                topic_slno: topic_slno,
                schedule_no: schedule_no,
                induct_detail_date: induct_detail_date,
                trainers: trainers,
                em_id: em_id,
            }
            setData(obj);
        }
    }, [modalData, setData])

    const HandleSelection1 = (e, questionNumber) => {

        const value = e.currentTarget.value !== 0 ? questionNumber : 0
        SetSelectedData({
            ...SelectedData,
            q1: value === 1 ? 1 : value === 2 ? 2 : value === 3 ? 3 : value === 4 ? 4 : value === 5 ? 5 : 0

        });
    };

    const HandleSelection2 = (e, questionNumber) => {

        const value = e.currentTarget.value !== 0 ? questionNumber : 0
        SetSelectedData({
            ...SelectedData,
            q2: value === 1 ? 1 : value === 2 ? 2 : value === 3 ? 3 : value === 4 ? 4 : value === 5 ? 5 : 0
        });
    };

    const HandleSelection3 = (e, questionNumber) => {

        const value = e.currentTarget.value !== 0 ? questionNumber : 0
        SetSelectedData({
            ...SelectedData,
            q3: value === 1 ? 1 : value === 2 ? 2 : value === 3 ? 3 : value === 4 ? 4 : value === 5 ? 5 : 0
        });
    };

    const HandleSelection4 = (e, questionNumber) => {

        const value = e.currentTarget.value !== 0 ? questionNumber : 0
        SetSelectedData({
            ...SelectedData,
            q4: value === 1 ? 1 : value === 2 ? 2 : value === 3 ? 3 : value === 4 ? 4 : value === 5 ? 5 : 0,
        });
    };

    const handleClose = useCallback(() => {
        Setopen(false);
        SetmodalData([])
    }, [Setopen, SetmodalData]);

    const handleSubmit = useCallback(async () => {
        const obj = {
            em_id: em_id,
            topic: topic_slno,
            schedule_no: schedule_no,
            induct_detail_date: induct_detail_date,
            trainers: trainers,
            feedback: feedback === '' ? null : feedback,
            create_user: em_id,
            ...SelectedData
        }
        const result = await axioslogin.post('/TrainingFeedback/inductfeedback', obj)
        const { success, message } = result.data
        if (success === 1) {
            succesNofity(message)
            Setopen(false)
            SetmodalData([])
            SetFedbk_flag(1)
        }
        else {
            warningNofity(message)
            Setopen(false)
            SetmodalData([])
            SetFedbk_flag(0)
        }
    }, [em_id, SelectedData, SetFedbk_flag, topic_slno, schedule_no, induct_detail_date, trainers, feedback, Setopen, SetmodalData])

    return (
        <Fragment>
            <Modal
                aria-labelledby="modal-title"
                aria-describedby="modal-desc"
                open={open}
                onClose={handleClose}
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
                    <Paper varient='outlined'>
                        <Box sx={{ p: 1 }}>
                            <Box>
                                <Typography level='6'>1.The Objectives of the training were clearly defined.</Typography>
                                <Box sx={{ display: "flex", flexDirection: "row", gap: 1, mt: 1 }}>
                                    <Box sx={{ flex: 1 }}>
                                        <Box sx={{ textAlign: "center" }}>
                                            <IconButton value={1} onClick={(e) => HandleSelection1(e, 1)} >
                                                <SentimentVeryDissatisfiedIcon style={{ color: SelectedData.q1 === 1 ? "#0A6847" : "#EF9C66", fontSize: 35 }} />
                                            </IconButton>
                                        </Box>
                                        <Box sx={{ textAlign: "center" }}><Typography sx={{ color: "#686D76", fontSize: 10 }}>Improvement</Typography></Box>
                                    </Box>
                                    <Box sx={{ flex: 1 }}>
                                        <Box sx={{ textAlign: "center" }}>
                                            <IconButton value={2} onClick={(e) => HandleSelection1(e, 2)}>
                                                <MoodBadIcon style={{ color: SelectedData.q1 === 2 ? "#0A6847" : "#EF9C66", fontSize: 35 }} /></IconButton>
                                        </Box>
                                        <Box sx={{ textAlign: "center" }}>
                                            <Typography sx={{ color: "#686D76", fontSize: 10 }}>Satisfactory</Typography>
                                        </Box>
                                    </Box>
                                    <Box sx={{ flex: 1 }}>
                                        <Box sx={{ textAlign: "center" }}>
                                            <IconButton value={3} onClick={(e) => HandleSelection1(e, 3)}>
                                                <SentimentSatisfiedIcon style={{ color: SelectedData.q1 === 3 ? "#0A6847" : "#EF9C66", fontSize: 35 }} />
                                            </IconButton>
                                        </Box>
                                        <Box sx={{ textAlign: "center" }}>
                                            <Typography sx={{ color: "#686D76", fontSize: 10 }}>Average</Typography>
                                        </Box>
                                    </Box>
                                    <Box sx={{ flex: 1 }}>
                                        <Box sx={{ textAlign: "center" }}>
                                            <IconButton value={4} onClick={(e) => HandleSelection1(e, 4)}>
                                                <SentimentSatisfiedAltIcon style={{ color: SelectedData.q1 === 4 ? "#0A6847" : "#EF9C66", fontSize: 35 }} />
                                            </IconButton>
                                        </Box>
                                        <Box sx={{ textAlign: "center" }}>
                                            <Typography sx={{ color: "#686D76", fontSize: 10 }}>Good</Typography>
                                        </Box>
                                    </Box>
                                    <Box sx={{ flex: 1 }}>
                                        <Box sx={{ textAlign: "center" }}>
                                            <IconButton value={5} onClick={(e) => HandleSelection1(e, 5)}>
                                                <TagFacesIcon style={{ color: SelectedData.q1 === 5 ? "#0A6847" : "#EF9C66", fontSize: 35 }} />
                                            </IconButton>
                                        </Box>
                                        <Box sx={{ textAlign: "center" }}>
                                            <Typography sx={{ color: "#686D76", fontSize: 10 }}>Excellent</Typography>
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>

                            <Box sx={{ mt: 0.5, p: 0.5 }}>
                                <Typography level='6'>2.The content was organised and easy to follow.</Typography>
                                <Box sx={{ display: "flex", flexDirection: "row", gap: 1, mt: 1 }}>
                                    <Box sx={{ flex: 1 }}>
                                        <Box sx={{ textAlign: "center" }}>
                                            <IconButton value={1} onClick={(e) => HandleSelection2(e, 1)} >
                                                <SentimentVeryDissatisfiedIcon style={{ color: SelectedData.q2 === 1 ? "#0A6847" : "#EF9C66", fontSize: 35 }} />
                                            </IconButton>
                                        </Box>
                                        <Box sx={{ textAlign: "center" }}><Typography sx={{ color: "#686D76", fontSize: 10 }}>Improvement</Typography></Box>
                                    </Box>
                                    <Box sx={{ flex: 1 }}>
                                        <Box sx={{ textAlign: "center" }}>
                                            <IconButton value={2} onClick={(e) => HandleSelection2(e, 2)}>
                                                <MoodBadIcon style={{ color: SelectedData.q2 === 2 ? "#0A6847" : "#EF9C66", fontSize: 35 }} /></IconButton>
                                        </Box>
                                        <Box sx={{ textAlign: "center" }}>
                                            <Typography sx={{ color: "#686D76", fontSize: 10 }}>Satisfactory</Typography>
                                        </Box>
                                    </Box>
                                    <Box sx={{ flex: 1 }}>
                                        <Box sx={{ textAlign: "center" }}>
                                            <IconButton value={3} onClick={(e) => HandleSelection2(e, 3)}>
                                                <SentimentSatisfiedIcon style={{ color: SelectedData.q2 === 3 ? "#0A6847" : "#EF9C66", fontSize: 35 }} />
                                            </IconButton>
                                        </Box>
                                        <Box sx={{ textAlign: "center" }}>
                                            <Typography sx={{ color: "#686D76", fontSize: 10 }}>Average</Typography>
                                        </Box>
                                    </Box>
                                    <Box sx={{ flex: 1 }}>
                                        <Box sx={{ textAlign: "center" }}>
                                            <IconButton value={4} onClick={(e) => HandleSelection2(e, 4)}>
                                                <SentimentSatisfiedAltIcon style={{ color: SelectedData.q2 === 4 ? "#0A6847" : "#EF9C66", fontSize: 35 }} />
                                            </IconButton>
                                        </Box>
                                        <Box sx={{ textAlign: "center" }}>
                                            <Typography sx={{ color: "#686D76", fontSize: 10 }}>Good</Typography>
                                        </Box>
                                    </Box>
                                    <Box sx={{ flex: 1 }}>
                                        <Box sx={{ textAlign: "center" }}>
                                            <IconButton value={5} onClick={(e) => HandleSelection2(e, 5)}>
                                                <TagFacesIcon style={{ color: SelectedData.q2 === 5 ? "#0A6847" : "#EF9C66", fontSize: 35 }} />
                                            </IconButton>
                                        </Box>
                                        <Box sx={{ textAlign: "center" }}>
                                            <Typography sx={{ color: "#686D76", fontSize: 10 }}>Excellent</Typography>
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>

                            <Box sx={{ mt: 0.5, p: 0.5 }}>
                                <Typography level='6'>3.Training Facilities were adequate.</Typography>
                                <Box sx={{ display: "flex", flexDirection: "row", gap: 1, mt: 1 }}>
                                    <Box sx={{ flex: 1 }}>
                                        <Box sx={{ textAlign: "center" }}>
                                            <IconButton value={1} onClick={(e) => HandleSelection3(e, 1)} >
                                                <SentimentVeryDissatisfiedIcon style={{ color: SelectedData.q3 === 1 ? "#0A6847" : "#EF9C66", fontSize: 35 }} />
                                            </IconButton>
                                        </Box>
                                        <Box sx={{ textAlign: "center" }}><Typography sx={{ color: "#686D76", fontSize: 10 }}>Improvement</Typography></Box>
                                    </Box>
                                    <Box sx={{ flex: 1 }}>
                                        <Box sx={{ textAlign: "center" }}>
                                            <IconButton value={2} onClick={(e) => HandleSelection3(e, 2)}>
                                                <MoodBadIcon style={{ color: SelectedData.q3 === 2 ? "#0A6847" : "#EF9C66", fontSize: 35 }} /></IconButton>
                                        </Box>
                                        <Box sx={{ textAlign: "center" }}>
                                            <Typography sx={{ color: "#686D76", fontSize: 10 }}>Satisfactory</Typography>
                                        </Box>
                                    </Box>
                                    <Box sx={{ flex: 1 }}>
                                        <Box sx={{ textAlign: "center" }}>
                                            <IconButton value={3} onClick={(e) => HandleSelection3(e, 3)}>
                                                <SentimentSatisfiedIcon style={{ color: SelectedData.q3 === 3 ? "#0A6847" : "#EF9C66", fontSize: 35 }} />
                                            </IconButton>
                                        </Box>
                                        <Box sx={{ textAlign: "center" }}>
                                            <Typography sx={{ color: "#686D76", fontSize: 10 }}>Average</Typography>
                                        </Box>
                                    </Box>
                                    <Box sx={{ flex: 1 }}>
                                        <Box sx={{ textAlign: "center" }}>
                                            <IconButton value={4} onClick={(e) => HandleSelection3(e, 4)}>
                                                <SentimentSatisfiedAltIcon style={{ color: SelectedData.q3 === 4 ? "#0A6847" : "#EF9C66", fontSize: 35 }} />
                                            </IconButton>
                                        </Box>
                                        <Box sx={{ textAlign: "center" }}>
                                            <Typography sx={{ color: "#686D76", fontSize: 10 }}>Good</Typography>
                                        </Box>
                                    </Box>
                                    <Box sx={{ flex: 1 }}>
                                        <Box sx={{ textAlign: "center" }}>
                                            <IconButton value={5} onClick={(e) => HandleSelection3(e, 5)}>
                                                <TagFacesIcon style={{ color: SelectedData.q3 === 5 ? "#0A6847" : "#EF9C66", fontSize: 35 }} />
                                            </IconButton>
                                        </Box>
                                        <Box sx={{ textAlign: "center" }}>
                                            <Typography sx={{ color: "#686D76", fontSize: 10 }}>Excellent</Typography>
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>

                            <Box sx={{ mt: 0.5, p: 0.5 }}>
                                <Typography level='6'>4.The training will be useful in my work.</Typography>
                                <Box sx={{ display: "flex", flexDirection: "row", gap: 1, mt: 1 }}>
                                    <Box sx={{ flex: 1 }}>
                                        <Box sx={{ textAlign: "center" }}>
                                            <IconButton value={1} onClick={(e) => HandleSelection4(e, 1)} >
                                                <SentimentVeryDissatisfiedIcon style={{ color: SelectedData.q4 === 1 ? "#0A6847" : "#EF9C66", fontSize: 35 }} />
                                            </IconButton>
                                        </Box>
                                        <Box sx={{ textAlign: "center" }}><Typography sx={{ color: "#686D76", fontSize: 10 }}>Improvement</Typography></Box>
                                    </Box>
                                    <Box sx={{ flex: 1 }}>
                                        <Box sx={{ textAlign: "center" }}>
                                            <IconButton value={2} onClick={(e) => HandleSelection4(e, 2)}>
                                                <MoodBadIcon style={{ color: SelectedData.q4 === 2 ? "#0A6847" : "#EF9C66", fontSize: 35 }} /></IconButton>
                                        </Box>
                                        <Box sx={{ textAlign: "center" }}>
                                            <Typography sx={{ color: "#686D76", fontSize: 10 }}>Satisfactory</Typography>
                                        </Box>
                                    </Box>
                                    <Box sx={{ flex: 1 }}>
                                        <Box sx={{ textAlign: "center" }}>
                                            <IconButton value={3} onClick={(e) => HandleSelection4(e, 3)}>
                                                <SentimentSatisfiedIcon style={{ color: SelectedData.q4 === 3 ? "#0A6847" : "#EF9C66", fontSize: 35 }} />
                                            </IconButton>
                                        </Box>
                                        <Box sx={{ textAlign: "center" }}>
                                            <Typography sx={{ color: "#686D76", fontSize: 10 }}>Average</Typography>
                                        </Box>
                                    </Box>
                                    <Box sx={{ flex: 1 }}>
                                        <Box sx={{ textAlign: "center" }}>
                                            <IconButton value={4} onClick={(e) => HandleSelection4(e, 4)}>
                                                <SentimentSatisfiedAltIcon style={{ color: SelectedData.q4 === 4 ? "#0A6847" : "#EF9C66", fontSize: 35 }} />
                                            </IconButton>
                                        </Box>
                                        <Box sx={{ textAlign: "center" }}>
                                            <Typography sx={{ color: "#686D76", fontSize: 10 }}>Good</Typography>
                                        </Box>
                                    </Box>
                                    <Box sx={{ flex: 1 }}>
                                        <Box sx={{ textAlign: "center" }}>
                                            <IconButton value={5} onClick={(e) => HandleSelection4(e, 5)}>
                                                <TagFacesIcon style={{ color: SelectedData.q4 === 5 ? "#0A6847" : "#EF9C66", fontSize: 35 }} />
                                            </IconButton>
                                        </Box>
                                        <Box sx={{ textAlign: "center" }}>
                                            <Typography sx={{ color: "#686D76", fontSize: 10 }}>Excellent</Typography>
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                            <Box sx={{ mt: 0.5 }}>
                                <Textarea
                                    maxRows={2}
                                    name="Suggestions"
                                    placeholder="Suggestion if any"
                                    variant="outlined"
                                    onChange={(e) => SetFeedback(e.target.value)}
                                />
                            </Box>
                        </Box>
                        <Box sx={{ textAlign: 'center', p: 0.5 }}>
                            <Button onClick={handleSubmit}>DONE</Button>
                        </Box>
                    </Paper>
                </ModalDialog>
            </Modal>
        </Fragment >
    )
}

export default memo(FeedbackPage) 
