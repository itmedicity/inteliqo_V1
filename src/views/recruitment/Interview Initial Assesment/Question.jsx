import { Box, Button, Typography } from '@mui/joy'
import { Paper } from '@mui/material';
import React, { lazy, memo, useCallback, useEffect, useMemo, useState } from 'react'
import DasboardCustomLayout from 'src/views/MuiComponents/DasboardCustomLayout';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'underscore';
import { Interview } from 'src/redux/actions/Interview.Action';
import { warningNofity } from 'src/views/CommonCode/Commonfunc';
import { ToastContainer } from 'react-toastify';
import { axioslogin } from 'src/views/Axios/Axios';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const ResultModal = lazy(() => import('./ResultModal'))
const Login = lazy(() => import('./Login'))

const Question = () => {
    // const { desigid, name, application_no } = useParams()
    const [desgid, setdesgid] = useState(0)
    const [empid, setempid] = useState('');
    const [count, setcount] = useState(0)
    const [sec, setSec] = useState(0);
    const [interviewstatus, setInterview] = useState(0);
    const [crtanswer, setcorrectanswer] = useState(0);
    const [wrganswer, setwrganswer] = useState(0);
    const [selecteditem, setitem] = useState('');
    const [timeLeft, setTimeLeft] = useState(60);
    const [currentQuestionIndex, setcurrentQuestionIndex] = useState(0)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [flag, setflag] = useState(0);
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(Interview(desgid))
    }, [dispatch, desgid, count])

    const Questions = useSelector((state) => state?.getInterviewquestion.questionType.QuestionList, _.isEqual)


    const handleNextQuestion = useCallback(() => {
        setcurrentQuestionIndex((prevIndex) => {
            if (Questions?.length === 0) {
                return warningNofity("No Question to Show")
            } else {
                if (prevIndex + 1 < Questions.length) {
                    //for checking correct answer
                    if (selecteditem === Questions[currentQuestionIndex]?.correct_answer) {
                        setcorrectanswer(crtanswer + 1)
                    }
                    else {
                        setwrganswer(wrganswer + 1)
                    }
                    setTimeLeft(60)
                    return prevIndex + 1
                } else {
                    setTimeLeft(0)
                    return prevIndex
                }
            }
        })
    }, [Questions, selecteditem, currentQuestionIndex, crtanswer, wrganswer])
    //for setting time
    const formatTime = (t) => t < 10 ? '0' + t : t;
    useEffect(() => {
        if (count === 1) {
            const interval = setInterval(() => {
                const m = Math.floor(timeLeft / 60);
                const s = timeLeft - m * 60;

                setSec(s);
                if (m <= 0 && s <= 0) return () => clearInterval(interval);
                setTimeLeft((t) => t - 1);

                if (s === 1 && currentQuestionIndex + 1 < Questions.length) {
                    warningNofity("Time Expired!")
                    setwrganswer(wrganswer + 1)
                    setcurrentQuestionIndex(currentQuestionIndex + 1)
                    setTimeLeft(60)
                }
            }, 1000);


            return () => clearInterval(interval);
        }


    }, [timeLeft, setTimeLeft, setSec, currentQuestionIndex, Questions, wrganswer, count]);
    //for checking correct answer
    const handleOnClick = useCallback((e, item) => {
        setitem(item)

    }, [])

    //for submitting
    const handleSubmit = useCallback(() => {
        if (selecteditem === Questions[currentQuestionIndex]?.correct_answer) {
            setcorrectanswer(crtanswer + 1)
        }
        else {
            setwrganswer(wrganswer + 1)
        }
        setIsModalOpen(true)
        setTimeLeft(0)
        setflag(1)
    }, [Questions, selecteditem, currentQuestionIndex, crtanswer, wrganswer])
    // for showing the interview sucess page
    const postdata = useMemo(() => {
        return {
            application_no: empid,
            desigid: desgid
        }
    }, [empid, desgid])

    useEffect(() => {
        const fetchData = async () => {
            const result = await axioslogin.post('/Applicationform/initialstatus', postdata)
            const { success, data } = result.data
            if (success === 1) {
                setflag(0)
                const { interview_status } = data[0]
                setInterview(interview_status)

            }
        }
        fetchData()
    }, [flag, postdata]);

    return (

        <>

            {count === 1 ? <>
                {interviewstatus === 0 ?

                    <Box sx={{ display: 'flex', flex: 1, flexDirection: 'column', }} >
                        <ToastContainer />

                        {Questions?.length === 0 ?
                            <Paper sx={{ width: "100%", p: 1, boxShadow: 5, display: 'flex', justifyContent: 'space-between' }}>
                                {/* <Typography level="h5">Welcome <Typography color="success" level="h4">{name}</Typography> </Typography> */}
                                <Typography level="h4">Sorry ! No question to Show</Typography>
                                <Typography level="h4">{currentQuestionIndex + 1}/{Questions?.length}</Typography>
                            </Paper>

                            : <DasboardCustomLayout title={"Interview Question"}  >
                                <Box sx={{ display: 'flex', flex: 1, py: 0.5, height: window.innerHeight - 50 }} >
                                    <Box sx={{ display: "flex", justifyContent: 'center', width: "100%", overflow: 'auto', p: 1 }}>
                                        <Box sx={{ width: "100%", p: 1, boxShadow: 5 }}>
                                            <Paper sx={{ width: "100%", p: 1, boxShadow: 5, display: 'flex', justifyContent: 'space-between' }}>
                                                <Typography level="h5">Welcome <Typography color="success" level="h4"></Typography> </Typography>
                                                <Typography level="h4">{currentQuestionIndex + 1}/{Questions?.length}</Typography>
                                            </Paper>

                                            <Paper key={currentQuestionIndex} sx={{ width: "100%", p: 1, mt: 2 }}>
                                                <Box sx={{ display: "flex", justifyContent: 'space-between' }}>
                                                    <Typography level="h4" sx={{ p: 1 }}>Q{currentQuestionIndex + 1}.{Questions[currentQuestionIndex]?.question}</Typography>
                                                    <Typography level="h3" sx={{ p: 1 }} color="danger">{formatTime(sec)}</Typography>
                                                </Box>
                                                <Paper sx={{
                                                    width: "100%", p: 1, mt: 1, ":hover": { boxShadow: 5, }, boxShadow: 2,
                                                    backgroundColor: selecteditem === Questions[currentQuestionIndex]?.choice1 ? "#E9FFC2" : "white"
                                                }}>
                                                    <Typography level="h4"
                                                        onClick={(e) => handleOnClick(e, Questions[currentQuestionIndex]?.choice1)}>
                                                        A.{Questions[currentQuestionIndex]?.choice1}
                                                    </Typography>
                                                </Paper>
                                                <Paper sx={{
                                                    width: "100%", p: 1, mt: 1, ":hover": { boxShadow: 5, }, boxShadow: 2,
                                                    backgroundColor: selecteditem === Questions[currentQuestionIndex]?.choice2 ? "#E9FFC2" : "white"
                                                }}>
                                                    <Typography level="h4"
                                                        onClick={(e) => handleOnClick(e, Questions[currentQuestionIndex]?.choice2)}>
                                                        B.{Questions[currentQuestionIndex]?.choice2}
                                                    </Typography>
                                                </Paper>
                                                <Paper sx={{
                                                    width: "100%", p: 1, ":hover": { boxShadow: 5, }, boxShadow: 2, mt: 1,
                                                    backgroundColor: selecteditem === Questions[currentQuestionIndex]?.choice3 ? "#E9FFC2" : "white"
                                                }}>
                                                    <Typography level="h4"
                                                        onClick={(e) => handleOnClick(e, Questions[currentQuestionIndex]?.choice3)}>
                                                        C.{Questions[currentQuestionIndex]?.choice3}
                                                    </Typography>
                                                </Paper>
                                                <Paper sx={{
                                                    width: "100%", p: 1, ":hover": { boxShadow: 5, }, boxShadow: 2, mt: 1,
                                                    backgroundColor: selecteditem === Questions[currentQuestionIndex]?.choice4 ? "#E9FFC2" : "white"
                                                }}>
                                                    <Typography level="h4"
                                                        onClick={(e) => handleOnClick(e, Questions[currentQuestionIndex]?.choice4)}>
                                                        D.{Questions[currentQuestionIndex]?.choice4}
                                                    </Typography>
                                                </Paper>
                                                <Box sx={{ display: "flex", justifyContent: 'center', mt: 2 }}>
                                                    {currentQuestionIndex + 1 < Questions.length ?
                                                        <Button sx={{ p: 0, width: "30%" }} size='sm' variant="outlined" color="primary"
                                                            onClick={handleNextQuestion}

                                                        >
                                                            Next Question
                                                        </Button>
                                                        : <Button sx={{ p: 0, width: "30%" }} size='sm' variant="outlined" color="success"
                                                            onClick={handleSubmit}
                                                        >
                                                            View Result
                                                        </Button>
                                                    }

                                                </Box>
                                            </Paper>
                                        </Box>
                                    </Box>
                                </Box>

                            </DasboardCustomLayout>
                        }

                        <ResultModal
                            isModalOpen={isModalOpen}
                            setIsModalOpen={setIsModalOpen}
                            // name={name}
                            crtanswer={crtanswer}
                            wrganswer={wrganswer}
                            setflag={setflag}
                            empid={empid}
                            desgid={desgid}

                        />

                    </Box >
                    : <Box
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: 300,
                            height: 200,
                            bgcolor: 'white',
                            boxShadow: 24,
                            p: 3,

                        }}
                    >
                        <Paper sx={{ width: "100%", p: 1, boxShadow: 5, mt: 3 }}>
                            <Typography color="success" level="h4">Initial Assesment Complete </Typography>
                            <Box sx={{ display: "flex", justifyContent: "center" }}>
                                <Typography color="success" level="h4">  <CheckBoxIcon></CheckBoxIcon>Please Close The Tab  </Typography>
                            </Box>
                        </Paper>

                    </Box>
                }

            </> : <Box>
                <Login
                    desgid={desgid}
                    setdesgid={setdesgid}
                    empid={empid}
                    setempid={setempid}
                    count={count}
                    setcount={setcount}
                />
            </Box>}





        </>
    )
}

export default memo(Question)