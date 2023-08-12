import { Button, CssVarsProvider, Textarea } from '@mui/joy'
import { Box, Paper, TextField, Grid, IconButton } from '@mui/material'
import React, { Fragment, memo, useCallback, useEffect, useMemo } from 'react'
import { ToastContainer } from 'react-toastify'
import CustomLayout from 'src/views/Component/MuiCustomComponent/CustomLayout'
import SaveIcon from '@mui/icons-material/Save';
import { useState } from 'react'
import TrainingQuestTopic from 'src/views/MuiComponents/TrainingQuestTopic'
import { axioslogin } from 'src/views/Axios/Axios'
import { succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc'
import { useSelector } from 'react-redux';
import _ from 'underscore';
import CommonAgGrid from 'src/views/Component/CommonAgGrid'
import EditIcon from '@mui/icons-material/Edit';

const TrainingQuestions = () => {
    const [questions, setQuestions] = useState('');
    const [answer, setAnswer] = useState('');
    const [training_topic, setTraining_topic] = useState([]);
    const [marks, setMarks] = useState(0);
    const [Q_id, setQid] = useState(0);
    const [tableData, setTabledata] = useState([]);
    const [count, setCount] = useState(0);
    const [flag, setFlag] = useState(0);

    const employeeState = useSelector((state) => state.getProfileData.ProfileData, _.isEqual);
    const employeeProfileDetl = useMemo(() => employeeState[0], [employeeState]);
    const { em_id } = employeeProfileDetl;

    //postdata
    const postdata = useMemo(() => {
        return {
            questions: questions,
            answers: answer,
            training_topics: training_topic,
            marks: marks,
            edit_user: em_id
        }
    }, [questions, answer, training_topic, marks, em_id])

    //patchdata
    const patchdata = useMemo(() => {
        return {
            q_slno: Q_id,
            questions: questions,
            answers: answer,
            training_topics: training_topic,
            marks: marks,
            edit_user: em_id
        }
    }, [Q_id, questions, answer, training_topic, marks, em_id])

    //reset
    const reset = useCallback(() => {
        setQuestions('');
        setAnswer('');
        setTraining_topic([]);
        setMarks(0);
    }, [])

    //view
    useEffect(() => {
        const getData = async () => {
            const result = await axioslogin.get('TriningQuestions/select')
            const { success, data } = result.data;
            if (success === 2) {
                const viewData = data.map((val) => {
                    const obj = {
                        q_slno: val.q_slno,
                        topic_slno: val.topic_slno,
                        training_topic_name: val.training_topic_name,
                        questions: val.questions,
                        answers: val.answers,
                        training_topics: val.training_topics,
                        marks: val.marks
                    }
                    return obj;
                })
                setTabledata(viewData);
                setCount(0)
            } else {
                setTabledata([]);
            }
        }
        getData()
    }, [count])

    //ClickEdit
    const getDataTable = useCallback((params) => {
        setFlag(1);
        const data = params.api.getSelectedRows()
        const { q_slno, questions, answers, topic_slno, marks } = data[0]
        setQuestions(questions);
        setAnswer(answers);
        setTraining_topic(topic_slno);
        setMarks(marks)
        setQid(q_slno);
    }, [])

    const submitTrainingQuestions = useCallback(() => {
        const InsertData = async (postdata) => {
            const result = await axioslogin.post('/TriningQuestions/insert', postdata)
            const { message, success } = result.data
            if (success === 1) {
                succesNofity(message)
                reset();
                setCount(count + 1)
            }
            else if (success === 0) {
                warningNofity(message)
                reset();
            }
            else {
                warningNofity(message)
                reset();
            }
        }

        //Edit
        const EditData = async (patchdata) => {
            const result = await axioslogin.patch('/TriningQuestions/update', patchdata)
            const { message, success } = result.data
            if (success === 2) {
                reset();
                setCount(count + 1);
                setQid(0);
                succesNofity(message)
                setFlag(0)
            }
            else {
                warningNofity(message)
                reset();
            }
        }
        //flag checking
        if (flag === 0) {
            InsertData(postdata)
        }
        else {
            EditData(patchdata)

        }
    }, [postdata, patchdata, flag, count])

    //column def
    const [columnDef] = useState([
        { headerName: 'Sl.No ', field: 'q_slno', filter: true, width: 150 },
        { headerName: 'Questions', field: 'questions', filter: true, width: 250 },
        { headerName: 'Answers ', field: 'answers', filter: true, width: 250 },
        { headerName: 'Topics ', field: 'training_topic_name', filter: true, width: 250 },
        { headerName: 'Mark ', field: 'marks', filter: true, width: 250 },

        {
            headerName: 'Edit', cellRenderer: params =>
                <Fragment>
                    <IconButton sx={{ paddingY: 0.5 }} onClick={() => getDataTable(params)} >
                        <EditIcon color='primary' />
                    </IconButton>
                </Fragment>

        }
    ])
    return (
        <CustomLayout title="Training Questions Master" displayClose={true}>
            <ToastContainer />
            <Box sx={{ width: "100%" }}>
                <Paper>
                    <Grid container spacing={1}>
                        <Grid item xl={3} lg={2}>
                            <Paper sx={{ p: 1 }}>
                                <Box sx={{ p: 1 }}>
                                    <CssVarsProvider>
                                        <Textarea
                                            label="Outlined"
                                            placeholder="Question:"
                                            variant="outlined"
                                            size="lg"
                                            value={questions}
                                            minRows={1}
                                            maxRows={3}
                                            onChange={(e) => setQuestions(e.target.value)}
                                            sx={{ flex: 1 }}
                                        />
                                    </CssVarsProvider>
                                </Box>
                                <Box sx={{ p: 1 }}>
                                    <CssVarsProvider>
                                        <Textarea
                                            label="Outlined"
                                            placeholder="Answer:"
                                            variant="outlined"
                                            size="lg"
                                            value={answer}
                                            minRows={1}
                                            maxRows={3}
                                            onChange={(e) => setAnswer(e.target.value)}
                                            sx={{ flex: 1 }}
                                        />
                                    </CssVarsProvider>
                                </Box>
                                <Box sx={{ p: 1 }}>
                                    <TrainingQuestTopic value={training_topic} setValue={setTraining_topic} />
                                </Box>
                                <Box sx={{ p: 1 }}>
                                    <TextField
                                        fullWidth
                                        placeholder='Marks'
                                        id='Marks'
                                        size="small"
                                        value={marks}
                                        name="Marks"
                                        onChange={(e) => setMarks(e.target.value)}
                                    />
                                </Box>
                                <Box sx={{ px: 0.5, mt: 0.9 }}>
                                    <CssVarsProvider>
                                        <Button
                                            variant="outlined"
                                            component="label"
                                            size="md"
                                            color="primary"
                                            onClick={submitTrainingQuestions}
                                        >
                                            <SaveIcon />
                                        </Button>
                                    </CssVarsProvider>
                                </Box>
                            </Paper>
                        </Grid>
                        <Grid item xs={9} lg={9} xl={9} md={9}>
                            <CommonAgGrid
                                columnDefs={columnDef}
                                tableData={tableData}
                                sx={{
                                    height: 500,
                                    width: "100%"
                                }}
                                rowHeight={30}
                                headerHeight={30}
                            />
                        </Grid>
                    </Grid>
                </Paper>
            </Box>
        </CustomLayout>
    )
}

export default memo(TrainingQuestions)
