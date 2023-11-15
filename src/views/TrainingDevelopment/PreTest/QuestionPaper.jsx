import { Box, Paper, Typography } from '@mui/material'
import React, { Fragment, memo, useCallback, useEffect, useState } from 'react'
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Button } from 'react-bootstrap';
import CountDownTimer from './CountDownTimer';
import { QuestionList } from 'src/redux/actions/Training.Action';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'underscore';
import QuestionHeading from './QuestionHeading';

const QuestionPaper = ({ setOpen, open, count, Setcount, Userdata }) => {

    const [questCount, setQuestcount] = useState(0);
    const [data, setData] = useState([]);
    const [order, setOrder] = useState(1)
    const [datalen, setDatalen] = useState(0)
    const [greenflag, setGreenFlag] = useState(0);
    const [redflag, setRedFlag] = useState(0);
    const [clrFlagA, SetclrFlagA] = useState(0);
    const [clrFlagB, SetclrFlagB] = useState(0);
    const [clrFlagC, SetclrFlagC] = useState(0);
    const [clrFlagD, SetclrFlagD] = useState(0);
    const [correct, SetCorrect] = useState(0);
    const [wrong, SetWrong] = useState(0);
    const [increment, SetIncrement] = useState(0);

    const dispatch = useDispatch()

    useEffect(() => {
        if (questCount !== 0) {
            dispatch(QuestionList(questCount))
        }
    }, [dispatch, count, questCount])

    const Questions = useSelector((state) => state?.gettrainingData?.QuestionDetails?.QuestionDetailsList, _.isEqual)

    useEffect(() => {
        const displayData = Questions?.map((val, index) => {
            const object = {
                oder: index + 1,
                q_slno: val.q_slno,
                topic_slno: val.topic_slno,
                training_topic_name: val.training_topic_name,
                answer_a: val.answer_a,
                answer_b: val.answer_b,
                answer_c: val.answer_c,
                answer_d: val.answer_d,
                handwrite_answer: val.handwrite_answer,
                marks: val.marks,
                questions: val.questions,
                right_answer: val.right_answer,
                upload_status: val.upload_status,
                writtenStatus: val.writtenStatus
            }
            return object;
        })
        const len = displayData.length
        setDatalen(len)
        setData(displayData)
    }, [Questions, setDatalen, setData])

    useEffect(() => {
        if (Object.keys(Userdata).length !== 0) {
            const { em_id, em_name, slno, topic_slno, training_topic_name, question_count } = Userdata[0];
            const obj = {
                em_id: em_id,
                em_name: em_name,
                slno: slno,
                topic_slno: topic_slno,
                training_topic_name: training_topic_name,
                question_count: question_count
            }
            setQuestcount(question_count)
        }
    }, [Userdata, setQuestcount])

    //Next questn
    const HandleNextQuestion = useCallback((e) => {
        setOrder(order + 1)
        SetclrFlagA(0);
        SetclrFlagB(0)
        SetclrFlagC(0)
        SetclrFlagD(0)
        // console.log(correct);
        // console.log(wrong);
        if (correct !== 0) {
            setGreenFlag(increment + 1)
            console.log(increment);
        }
        else if (wrong === 0) {
            setRedFlag(increment + 1)
        }
    }, [setOrder, SetclrFlagA, increment, correct, wrong, SetclrFlagB, SetclrFlagC, SetclrFlagD, order, setGreenFlag, setRedFlag])

    const SubmitAnswers = useCallback(() => {
        console.log("close");
    }, [])
    return (
        <Fragment>
            <Box sx={{ p: 2, width: "100%", height: 650, backgroundColor: "#F5F7F8" }}>

                <Box sx={{ display: "flex", flexDirection: "row", width: "100%", gap: 2 }}>
                    <Box sx={{ width: "4%", height: 60, borderRadius: 10, textAlign: "center", border: 4, borderColor: "#6F1AB6", p: 0.3 }}>  <CountDownTimer /></Box>

                    {/* Header Portion */}
                    <Box sx={{ width: "95%", display: "flex", flexDirection: "column", gap: 1 }}>
                        <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                            <Box sx={{ color: "#B4B4B3", fontSize: "large" }}>{order}/{questCount}</Box>
                            <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
                                <Box sx={{ backgroundColor: "#A2C579", display: "flex", flexDirection: "row", p: 0.2, gap: 1, color: "white", borderRadius: 3 }}>
                                    <Box><CheckIcon /></Box>
                                    <Box>{greenflag}</Box>
                                </Box>
                                <Box sx={{ backgroundColor: "#FA7070", display: "flex", flexDirection: "row", p: 0.2, gap: 1, color: "white", borderRadius: 3 }}>
                                    <Box><ClearIcon /></Box>
                                    <Box>{redflag}</Box>
                                </Box>
                            </Box>
                        </Box>
                        <Box>
                            <QuestionHeading data={data} order={order} setGreenFlag={setGreenFlag} setRedFlag={setRedFlag} count={count} clrFlagA={clrFlagA} SetclrFlagA={SetclrFlagA} clrFlagB={clrFlagB} SetclrFlagB={SetclrFlagB} clrFlagC={clrFlagC} SetclrFlagC={SetclrFlagC} clrFlagD={clrFlagD} SetclrFlagD={SetclrFlagD} SetCorrect={SetCorrect} SetWrong={SetWrong} />
                        </Box>
                    </Box>
                </Box>

                {/* Next Question  */}{
                    order < datalen ?
                        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
                            <Button
                                onClick={HandleNextQuestion}
                                sx={{ width: "12%", p: 2, backgroundColor: "#3085C3", borderRadius: 3, fontSize: "large" }}>
                                Next Question <ArrowForwardIosIcon />
                            </Button>
                        </Box>
                        : <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
                            <Button
                                onClick={SubmitAnswers}
                                sx={{ width: "12%", p: 2, backgroundColor: "#3085C3", borderRadius: 3, fontSize: "large" }}>
                                SUBMIT <ArrowForwardIosIcon />
                            </Button>
                        </Box>
                }
            </Box>
        </Fragment >
    )
}
export default memo(QuestionPaper)
