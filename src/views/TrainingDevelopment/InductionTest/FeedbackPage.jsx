import { Box, Button, IconButton, Sheet, Table, Textarea, Typography } from '@mui/joy'
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
import { Paper } from '@mui/material';
import NumbersOutlinedIcon from '@mui/icons-material/NumbersOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import LanOutlinedIcon from '@mui/icons-material/LanOutlined';

const FeedbackPage = () => {

    const [data, SetData] = useState([])
    const [ViewFedbk, SetViewFedbk] = useState(0)

    const { topic_no, schedule_no, EmId } = useParams()
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
            EmId: EmId,
        }
    }, [topic_no, schedule_no, EmId])

    useEffect(() => {
        const GetData = async (PostData) => {
            const result = await axioslogin.post('/InductionTest/GetEmpDetails_for_feedback', PostData)
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
        topic_slno: 0,
        schedule_Slno: 0,
        induct_detail_date: '',
        trainers: [],
        em_id: 0,
        question_count: 0,
        pretest_status: 0,
        posttest_status: 0,
        online_mode: 0,
        offline_mode: 0,
        retest: 0,
        training_topic_name: 0,
        pretest_mark: 0,
        post_mark: 0,
        em_no: 0,
        em_name: '',
        dept_name: '',
        desg_name: ''
    });

    const { induct_detail_date, trainers, question_count, pretest_status, posttest_status, online_mode, offline_mode, training_topic_name, pretest_mark, post_mark, retest, em_no, em_name, dept_name, desg_name } = datas;

    useEffect(() => {
        if (Object.keys(data).length !== 0) {
            const { topic_slno, schedule_no, induct_detail_date, trainers, em_id, question_count, pretest_status, posttest_status, online_mode, offline_mode, retest, training_topic_name, pretest_mark, post_mark, em_no, em_name, dept_name, desg_name } = data[0];
            const obj = {
                topic_slno: topic_slno,
                schedule_Slno: schedule_no,
                induct_detail_date: induct_detail_date,
                trainers: trainers,
                em_id: em_id,
                question_count: parseInt(question_count),
                pretest_status: pretest_status,
                posttest_status: posttest_status,
                online_mode: online_mode,
                offline_mode: offline_mode,
                retest: retest,
                training_topic_name: training_topic_name,
                pretest_mark: pretest_mark,
                post_mark: post_mark,
                em_no: em_no,
                em_name: em_name,
                dept_name: dept_name,
                desg_name: desg_name

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
    const GoFeedback = useCallback(() => {
        SetViewFedbk(1)
    }, [SetViewFedbk])

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
        const result = await axioslogin.post('/TrainingFeedback/inductfeedback', obj)
        const { success, message } = result.data
        if (success === 1) {
            succesNofity(message)
            history.push(`/InductLogInpage/${topic_no}/${schedule_no}`)
        }
        else {
            warningNofity(message)
            setDatas([])
            SetData([])
        }
    }, [history, EmId, SelectedData, topic_no, schedule_no, induct_detail_date, trainers, feedback])

    return (
        <Fragment>
            <Box sx={{}}>
                <ToastContainer />
                {ViewFedbk === 0 ?
                    <Paper variant="outlined" sx={{
                        px: 1
                    }} >
                        {ViewFedbk === 0 ?
                            <Box sx={{
                                display: "flex",
                                flexDirection: "row",
                                fontFamily: "serif",

                            }}>

                                <Box sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    flex: 1

                                }}>
                                    <Box sx={{ display: "flex", py: 0.3, mt: 1 }} >
                                        <Typography
                                            fontSize="xl2"
                                            lineHeight={0}
                                            endDecorator={<PersonOutlinedIcon color='primary' />}
                                            sx={{ textTransform: 'capitalize', fontFamily: "serif", }}
                                        >
                                            {em_name?.toLowerCase()}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', mt: 1 }} >
                                        <Typography textColor="text.secondary"
                                            startDecorator={
                                                <ManageAccountsOutlinedIcon fontSize='md' color='primary' />
                                            }
                                            endDecorator={
                                                <Typography>
                                                    |
                                                </Typography>
                                            }
                                            sx={{ textTransform: 'capitalize', fontFamily: "serif", }}
                                        >
                                            {desg_name?.toLowerCase()}
                                        </Typography>
                                        <Typography textColor="text.secondary"
                                            startDecorator={
                                                <LanOutlinedIcon fontSize='md' color='primary' />
                                            }
                                            endDecorator={
                                                <Typography>
                                                    |
                                                </Typography>
                                            }
                                            px={1}
                                            sx={{ textTransform: 'capitalize', fontFamily: "serif", }}
                                        >
                                            {dept_name?.toLowerCase()}
                                        </Typography>
                                        <Typography textColor="text.secondary"
                                            sx={{ fontFamily: "serif" }}
                                            startDecorator={<NumbersOutlinedIcon fontSize='md' color='primary' />}
                                        >
                                            {em_no}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                            : null}
                        {
                            pretest_status === 1 && posttest_status === 1 && ViewFedbk === 0 ?
                                <Box>
                                    <Typography sx={{ mt: 1 }}>Online-Test Result</Typography>
                                    <Sheet variant="outlined">
                                        <Table variant="soft" borderAxis="bothBetween">
                                            <thead>
                                                <tr>
                                                    <th>Topic</th>
                                                    <th style={{ textTransform: "capitalize", }}> {training_topic_name?.toLowerCase()}</th>
                                                </tr>
                                                <tr>
                                                    <th>Pre-Test</th>
                                                    <th style={{ textTransform: "capitalize", }}> {pretest_status !== 0 ? "Yes" : "Not"}</th>
                                                </tr>
                                                <tr>
                                                    <th>Pre-Test Mark (out of <b>{question_count !== 0 ? question_count : null}</b>)</th>
                                                    <th style={{ textTransform: "capitalize" }}> {pretest_mark !== null ? pretest_mark : "Not Attended"}</th>
                                                </tr>
                                                <tr>
                                                    <th>Post-Test</th>
                                                    <th style={{ textTransform: "capitalize", }}> {posttest_status !== 0 ? "Yes" : "No"}</th>
                                                </tr>
                                                <tr>
                                                    <th>Post-Test Mark (out of <b>{question_count}</b>)</th>
                                                    <th style={{ textTransform: "capitalize", }}>{post_mark !== null ? post_mark : "Not Attended"}</th>
                                                </tr>
                                                <tr>
                                                    <th>Training Mode</th>
                                                    <th style={{ textTransform: "capitalize", }}> {online_mode !== 0 ? "Online" : offline_mode !== 0 ? "Offline" : null}</th>
                                                </tr>
                                            </thead>
                                        </Table>
                                    </Sheet>
                                    <Box sx={{ display: "flex", justifyContent: "center", mt: 2, }}>
                                        <Button sx={{ backgroundColor: "blue", color: "white", width: "80%" }} onClick={GoFeedback}>
                                            Drop Your Feedbacks
                                        </Button>
                                    </Box>

                                    {retest === 1 ?
                                        <Box sx={{ display: "flex", flexDirection: "row", gap: 1, mt: 2 }}>
                                            <Typography sx={{ fontFamily: "serif", fontSize: "sm" }}>Your have Retest On the Topic</Typography>
                                            <Typography sx={{ fontFamily: "serif", color: "blue", fontWeight: "bold" }}>{training_topic_name} </Typography>
                                        </Box>
                                        : null
                                    }
                                </Box>
                                : null}
                    </Paper >
                    : null}

                {ViewFedbk === 1 ?
                    <Box sx={{
                        p: 0.5
                    }}>
                        <Box sx={{ p: 1 }}>
                            <Box>
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

                            <Box sx={{ mt: 1.5, p: 0.5 }}>
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

                            <Box sx={{ mt: 1.5, p: 0.5 }}>
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

                            <Box sx={{ mt: 1.5, p: 0.5 }}>
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
                            <Box sx={{ mt: 1.5 }}>
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
                            <Button onClick={handleSubmit}>DONE</Button>
                        </Box>
                    </Box>
                    : null}
            </Box>

        </Fragment >
    )
}

export default memo(FeedbackPage) 
