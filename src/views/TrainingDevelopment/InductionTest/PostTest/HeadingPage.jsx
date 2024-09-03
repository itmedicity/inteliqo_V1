import { Box } from '@mui/material'
import React, { Fragment, memo, useCallback, useEffect, useMemo, useState } from 'react'
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Button } from 'react-bootstrap';
import { InductPostTestEmpDetails, QuestionList } from 'src/redux/actions/Training.Action';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'underscore';
import { axioslogin } from 'src/views/Axios/Axios';
import { warningNofity } from 'src/views/CommonCode/Commonfunc';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import CountDownTimer from '../../PostTest/CountDownTimer';
import QuestionPage from './QuestionPage';
import SubmitModal from './SubmitModal';

const HeadingPage = () => {

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
        slno: 0,
        topic_slno: 0,
        training_topic_name: '',
        question_count: 0,
        dept_id: 0,
        desg_slno: 0,
        sect_id: 0,
        schedule_no: 0,
        induct_detail_date: ''
    });

    const { em_id, dept_id, sect_id, topic_slno, slno, em_name, schedule_no, induct_detail_date } = datas;

    const dispatch = useDispatch()

    const { id, tslno, qcount } = useParams()

    useEffect(() => {
        if (qcount !== 0) {
            const obj = {
                questCount: parseInt(qcount),
                topic_slno: parseInt(tslno)
            }
            dispatch(QuestionList(obj))
            dispatch(InductPostTestEmpDetails(id))
        }
    }, [dispatch, id, count, qcount, tslno])

    const Questions = useSelector((state) => state?.gettrainingData?.QuestionDetails?.QuestionDetailsList, _.isEqual)
    const Emp_Details = useSelector((state) => state?.gettrainingData?.InductionPostTestEmp?.InductionPostTestEmpList, _.isEqual)

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
        if (Object.keys(Emp_Details).length !== 0) {
            const { trainers, em_id, em_name, induction_slno, topic_slno, training_topic_name, question_count, dept_id, desg_slno, sect_id, induct_detail_date, schedule_no } = Emp_Details[0];
            const obj = {
                em_id: em_id,
                em_name: em_name,
                slno: induction_slno,
                topic_slno: topic_slno,
                training_topic_name: training_topic_name,
                question_count: question_count,
                dept_id: dept_id,
                desg_slno: desg_slno,
                sect_id: sect_id,
                trainers: trainers,
                schedule_no: schedule_no,
                induct_detail_date: induct_detail_date
            }
            setQuestcount(question_count)
            setDatas(obj);
        }
    }, [Emp_Details, setDatas, setQuestcount])


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
    }, [clrFlagA, clrFlagB, clrFlagC, clrFlagD, setincmentCount, setTimeLeft, setOrder, order, SetclrFlagA, SetclrFlagB, SetclrFlagC, SetclrFlagD, disright, rightAns, wrong, correct, SetCorrect, SetWrong])

    const PostData = useMemo(() => {
        return {
            slno: slno,
            emp_id: em_id,
            emp_dept: dept_id,
            emp_dept_sec: sect_id,
            emp_topic: parseInt(topic_slno),
            posttest_status: 1,
            mark: correct,
            create_user: em_id,
            schedule_no: schedule_no,
            induct_detail_date: induct_detail_date
        }
    }, [em_id, dept_id, sect_id, correct, topic_slno, slno, schedule_no, induct_detail_date])

    useEffect(() => {
        if (checkInsert === 1) {
            const InsertData = async (PostData) => {
                const result = await axioslogin.post('/InductionTest/postTest', PostData)
                const { success, message } = result.data
                if (success === 1) {
                    setopen(true)
                    Setcount(Math.random())
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

                            <Box sx={{ pr: 4, textAlign: "center", display: "flex", flexDirection: "row", flexWrap: "wrap", color: "#B31312" }}>  <CountDownTimer setOrder={setOrder} order={order} sec={sec} setSec={setSec} timeLeft={timeLeft} setTimeLeft={setTimeLeft} /></Box>

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
                            <QuestionPage data={data} order={order} clrFlagA={clrFlagA} SetclrFlagA={SetclrFlagA} clrFlagB={clrFlagB} SetclrFlagB={SetclrFlagB} clrFlagC={clrFlagC} SetclrFlagC={SetclrFlagC} clrFlagD={clrFlagD} SetclrFlagD={SetclrFlagD} setDisright={setDisright} setRightAns={setRightAns} incmentCount={incmentCount} setincmentCount={setincmentCount} />
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
            {open === true ? <SubmitModal Empdatas={datas} id={id} open={open} setopen={setopen} tslno={tslno} /> : null}
        </Fragment >
    )
}
export default memo(HeadingPage)

