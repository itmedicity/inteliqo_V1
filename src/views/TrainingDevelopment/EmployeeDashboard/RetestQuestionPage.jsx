import { Box } from '@mui/material'
import React, { Fragment, memo, useCallback, useEffect, useMemo, useState } from 'react'
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Button } from 'react-bootstrap';
import { ResetQuestionsByTopic } from 'src/redux/actions/Training.Action';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'underscore';
import { axioslogin } from 'src/views/Axios/Axios';
import { succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import RetestCountdownTimer from './RetestCountdownTimer';
import RetestQuestionsHeadings from './RetestQuestionsHeadings';
import ResetSubmitModal from './ResetSubmitModal';

const RetestQuestionPage = () => {

    const [questCount, setQuestcount] = useState(0);
    const [data, setData] = useState([]);
    const [order, setOrder] = useState(1);
    const [datalen, setDatalen] = useState(0)
    const [clrFlagA, SetclrFlagA] = useState(0);
    const [clrFlagB, SetclrFlagB] = useState(0);
    const [clrFlagC, SetclrFlagC] = useState(0);
    const [clrFlagD, SetclrFlagD] = useState(0);
    const [correct, SetCorrect] = useState(0);
    const [wrong, SetWrong] = useState(0);
    const [rightAns, setRightAns] = useState(0)
    const [disright, setDisright] = useState(0)
    const [checkInsert, setCheckInsert] = useState(0)
    const [sec, setSec] = useState(0);
    const [timeLeft, setTimeLeft] = useState(60);
    const [open, setopen] = useState(false);
    const [count, Setcount] = useState(0);
    const [incmentCount, setincmentCount] = useState(0)

    const [datas, setDatas] = useState({
        em_id: 0,
        em_name: '',
        retest_sl_no: 0,
        retest_topic: 0,
        retest_quest_count: 0,
        candidate_dept: 0,
        candidate_dept_sec: 0,
        candidate_em_no: 0
    });

    const { em_name, candidate_dept, candidate_dept_sec } = datas;

    const dispatch = useDispatch()

    const { slno, emId, tslno, qcount } = useParams()

    useEffect(() => {
        if (qcount !== 0) {
            const obj = {
                questCount: parseInt(qcount),
                topic_slno: parseInt(tslno),
                Em_id: parseInt(emId)
            }
            dispatch(ResetQuestionsByTopic(obj))
        }
    }, [dispatch, emId, count, qcount, tslno])

    const ResetQuestions = useSelector((state) => state?.gettrainingData?.RetestQuestions?.RetestQuestionsList, _.isEqual)

    useEffect(() => {
        const displayData = ResetQuestions?.map((val, index) => {
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
                writtenStatus: val.writtenStatus,
                online_status: val.online_status,
                offline_status: val.offline_status,
                both_status: val.both_status,
                candidate_em_no: val.candidate_em_no,
                retest_quest_count: val.retest_quest_count,
                candidate_dept: val.candidate_dept,
                candidate_dept_sec: val.candidate_dept_sec,
                em_id: val.em_id,
                em_name: val.em_name,
                retest_status: val.retest_status,
                retest_mark: val.retest_mark
            }
            return object;
        })
        const len = displayData.length
        setDatalen(len)
        setData(displayData)
    }, [ResetQuestions, setDatalen, setData])

    useEffect(() => {
        if (Object.keys(data).length !== 0) {
            const { em_id, em_name, retest_status, retest_mark, retest_sl_no, retest_topic, retest_quest_count, candidate_dept, candidate_dept_sec } = data[0];
            const obj = {
                em_id: em_id,
                em_name: em_name,
                retest_sl_no: retest_sl_no,
                retest_topic: retest_topic,
                retest_quest_count: retest_quest_count,
                candidate_dept: candidate_dept,
                candidate_dept_sec: candidate_dept_sec,
                retest_status: retest_status,
                retest_mark: retest_mark
            }
            setQuestcount(retest_quest_count)
            setDatas(obj);
        }
    }, [data, setDatas, setQuestcount])


    //Next questn
    const HandleNextQuestion = useCallback((e) => {
        if (clrFlagA !== 0 || clrFlagB !== 0 || clrFlagC !== 0 || clrFlagD) {
            if (disright === rightAns) {
                SetCorrect(correct + 1)
            }
            else {
                SetWrong(wrong + 1)
            }
            setOrder(order + 1)
            SetclrFlagA(0);
            SetclrFlagB(0)
            SetclrFlagC(0)
            SetclrFlagD(0)
            setTimeLeft(60)
            setincmentCount(0)
        }
        else {
            warningNofity("Please Select one option")
        }
    }, [clrFlagA, clrFlagB, clrFlagC, clrFlagD, setTimeLeft, setOrder, order, SetclrFlagA, SetclrFlagB, SetclrFlagC, SetclrFlagD, disright, rightAns, wrong, correct, SetCorrect, SetWrong])

    const PostData = useMemo(() => {
        return {
            retest_sl_no: slno,
            candidate_em_no: parseInt(emId),
            candidate_dept: candidate_dept,
            candidate_dept_sec: candidate_dept_sec,
            retest_topic: parseInt(tslno),
            retest_status: 1,
            mark: correct,
            create_user: parseInt(emId),
            edit_user: parseInt(emId)
        }
    }, [slno, emId, candidate_dept, candidate_dept_sec, correct, tslno])

    useEffect(() => {
        if (checkInsert === 1) {
            const InsertData = async (PostData) => {
                const result = await axioslogin.post('/TrainingEmployee_Dashboard/insertRetest', PostData)
                const { success, message } = result.data
                if (success === 1) {
                    setopen(true)
                    Setcount(Math.random())
                    succesNofity(message)
                }
                else if (success === 2) {
                    warningNofity(message)
                }
                else {
                    warningNofity("Sorry! Already attend the Test")
                }
            }
            InsertData(PostData)
        }
    }, [PostData, checkInsert, Setcount, setopen])

    //submit
    const SubmitAnswers = useCallback(() => {
        if (clrFlagA !== 0 || clrFlagB !== 0 || clrFlagC !== 0 || clrFlagD) {
            if (disright === rightAns) {
                SetCorrect(correct + 1)
            }
            else {
                SetWrong(wrong + 1)
            }
            setCheckInsert(1)
            SetclrFlagA(0);
            SetclrFlagB(0)
            SetclrFlagC(0)
            SetclrFlagD(0)
            setTimeLeft(0)
            setTimeLeft(0)
            setincmentCount(0)
        }
        else {
            warningNofity("Please Select one option")
        }
    }, [disright, rightAns, wrong, correct, clrFlagA, clrFlagB, clrFlagC, clrFlagD])

    return (
        <Fragment>
            <Box sx={{ p: 2, width: "100%", height: 500, backgroundColor: "#F5F7F8" }}>

                <Box sx={{ display: "flex", flexDirection: "row", width: "100%", gap: 2, flexWrap: "wrap" }}>

                    {/* Header Portion */}
                    <Box sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 1 }}>

                        <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>

                            <Box sx={{ color: "#B4B4B3", fontSize: "large" }}>{order}/{questCount}
                                <Box sx={{ display: "flex", height: 20, flexDirection: "row", fontWeight: "bold" }}>
                                    <Box>{em_name}</Box>
                                </Box>
                            </Box>

                            <Box sx={{ pr: 4, textAlign: "center", display: "flex", flexDirection: "row", flexWrap: "wrap", color: "#B31312" }}>
                                <RetestCountdownTimer setOrder={setOrder} order={order} sec={sec} setSec={setSec} timeLeft={timeLeft} setTimeLeft={setTimeLeft} />
                            </Box>

                            <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
                                <Box sx={{ backgroundColor: "#A2C579", display: "flex", height: 25, flexDirection: "row", p: 0.2, gap: 1, color: "white", borderRadius: 3 }}>
                                    <Box><CheckIcon /></Box>
                                    <Box>{correct}</Box>
                                </Box>
                                <Box sx={{ backgroundColor: "#FA7070", display: "flex", height: 25, flexDirection: "row", p: 0.2, gap: 1, color: "white", borderRadius: 3 }}>
                                    <Box><ClearIcon /></Box>
                                    <Box>{wrong}</Box>
                                </Box>
                            </Box>
                        </Box>
                        <Box>
                            <RetestQuestionsHeadings incmentCount={incmentCount} setincmentCount={setincmentCount} data={data} order={order} clrFlagA={clrFlagA} SetclrFlagA={SetclrFlagA} clrFlagB={clrFlagB} SetclrFlagB={SetclrFlagB} clrFlagC={clrFlagC} SetclrFlagC={SetclrFlagC} clrFlagD={clrFlagD} SetclrFlagD={SetclrFlagD} setDisright={setDisright} setRightAns={setRightAns} />
                        </Box>
                    </Box>
                </Box>

                {/* Next Question  */}{
                    order < datalen ?
                        <Box sx={{ display: "flex", justifyContent: "center", mt: 1.5 }}>
                            <Button
                                onClick={HandleNextQuestion}
                                sx={{ width: "12%", p: 2, backgroundColor: "#3085C3", borderRadius: 3, fontSize: "large" }}>
                                Next Question <ArrowForwardIosIcon />
                            </Button>
                        </Box>
                        : <Box sx={{ display: "flex", justifyContent: "center", mt: 1.5 }}>
                            <Button
                                onClick={SubmitAnswers}
                                sx={{ width: "12%", p: 2, backgroundColor: "#3085C3", borderRadius: 3, fontSize: "large" }}>
                                SUBMIT <ArrowForwardIosIcon />
                            </Button>
                        </Box>
                }
            </Box>
            {open === true ? <ResetSubmitModal slno={slno} open={open} setopen={setopen} tslno={tslno} /> : null}
        </Fragment >
    )
}
export default memo(RetestQuestionPage)


