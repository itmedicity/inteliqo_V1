import { Box, Button, IconButton, Textarea, Typography } from '@mui/joy'
import React, { Fragment, memo, useCallback, useEffect, useMemo, useState } from 'react'
import TagFacesIcon from '@mui/icons-material/TagFaces';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import MoodBadIcon from '@mui/icons-material/MoodBad';
import { axioslogin } from 'src/views/Axios/Axios';
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';
import { ToastContainer } from 'react-toastify';
import { format } from 'date-fns';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';

const FeedbackWithoutTest = () => {

    const { topic_no, schedule_no, EmId } = useParams()

    const [data, SetData] = useState([])

    const history = useHistory()

    const [feedback, SetFeedback] = useState('');

    const [SelectedData, SetSelectedData] = useState({
        q1: 0,
        q2: 0,
        q3: 0,
        q4: 0,
    })
    const PostData = useMemo(() => {
        return {
            topic_no: topic_no,
            schedule_no: schedule_no,
        }
    }, [topic_no, schedule_no])

    useEffect(() => {
        const GetData = async (PostData) => {
            const result = await axioslogin.post('/InductionTest/GetEmpDetails_for_feedback_withoutTest', PostData)
            const { success, data } = result.data
            if (success === 2) {
                SetData(data)
            }
            else {
                SetData([])
            }
        }
        GetData(PostData)

    }, [PostData])

    const [datas, setDatas] = useState({
        induct_detail_date: '',
        trainers: [],
        training_topic_name: '',
        date: '',
        em_name: ''
    });

    const { induct_detail_date, trainers, training_topic_name, date, em_name } = datas;

    useEffect(() => {
        if (Object.keys(data).length !== 0) {
            const { induct_detail_date, trainers, training_topic_name, em_name } = data[0];
            const obj = {
                induct_detail_date: induct_detail_date,
                trainers: trainers,
                training_topic_name: training_topic_name,
                date: format((new Date(induct_detail_date)), 'dd-MM-yyyy'),
                em_name: em_name
            }
            setDatas(obj);
        }
    }, [data])

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

    const handleSubmit = useCallback(async () => {
        const obj = {
            em_id: parseInt(EmId),
            topic: parseInt(topic_no),
            schedule_no: parseInt(schedule_no),
            induct_detail_date: induct_detail_date,
            trainers: trainers,
            feedback: feedback === '' ? null : feedback,
            create_user: parseInt(EmId),
            ...SelectedData
        }
        const result = await axioslogin.post('/TrainingFeedback/inductfeedbackWithoutTest', obj)
        const { success, message } = result.data
        if (success === 1) {
            succesNofity(message)
            SetSelectedData([])
            SetFeedback('');
            // history.push(`/InductLogInpage/${topic_no}/${schedule_no}`)
        }
        else {
            warningNofity(message)
            setDatas([])
            SetData([])
            SetFeedback('');
        }
    }, [history, SelectedData, topic_no, SetFeedback, schedule_no, induct_detail_date, trainers, EmId, feedback])

    return (
        <Fragment>
            <Box sx={{}}>
                <ToastContainer />
                <Box sx={{
                    p: 0.5
                }}>
                    <Box sx={{ p: 1 }}>
                        <Typography sx={{ textAlign: "center", fontSize: 25, }} >TRAINING & DEVELOPMENT</Typography>

                        <Box sx={{ backgroundColor: "#F1EFEF" }}>
                            <Typography sx={{ p: 0.2, mt: 2, color: "#686D76", }}>Date: {date}</Typography>
                            <Typography sx={{ p: 0.2, color: "#686D76", textTransform: "capitalize" }}>Topic: {training_topic_name.toLowerCase()}</Typography>
                            <Typography sx={{ p: 0.2, color: "#686D76", textTransform: "capitalize" }}>Trainer Name: {em_name.toLowerCase()}</Typography>
                        </Box>
                        <Box sx={{ mt: 2 }}>
                            <Typography level='6'>1.The Objectives of the training were clearly defined.</Typography>
                            <Box sx={{ display: "flex", flexDirection: "row", gap: 1, mt: 1.5 }}>
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

                        <Box sx={{ mt: 1, p: 0.5 }}>
                            <Typography level='6'>2.The content was organised and easy to follow.</Typography>
                            <Box sx={{ display: "flex", flexDirection: "row", gap: 1, mt: 1.5 }}>
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

                        <Box sx={{ mt: 1.2, p: 0.5 }}>
                            <Typography level='6'>3.Training Facilities were adequate.</Typography>
                            <Box sx={{ display: "flex", flexDirection: "row", gap: 1, mt: 1.5 }}>
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

                        <Box sx={{ mt: 1.1, p: 0.5 }}>
                            <Typography level='6'>4.The training will be useful in my work.</Typography>
                            <Box sx={{ display: "flex", flexDirection: "row", gap: 1, mt: 1.5 }}>
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
                        <Box sx={{ mt: 1 }}>
                            <Textarea
                                minRows={2}
                                maxRows={4}
                                name="Suggestions"
                                placeholder="Suggestion if any"
                                variant="outlined"
                                onChange={(e) => SetFeedback(e.target.value)}
                            />
                        </Box>
                    </Box>
                    <Box sx={{ textAlign: 'center', p: 0.5 }}>
                        <Button end startDecorator={<ThumbUpAltIcon />} onClick={handleSubmit}>Submit Your Feedback</Button>
                    </Box>
                </Box>

            </Box>

        </Fragment >
    )
}

export default memo(FeedbackWithoutTest)


