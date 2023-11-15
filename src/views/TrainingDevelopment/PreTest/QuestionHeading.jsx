import { CssVarsProvider, Textarea } from '@mui/joy';
import { Box, Paper, Typography } from '@mui/material'
import React, { Fragment, memo, useCallback, useEffect, useState } from 'react'

const QuestionHeading = ({ count, data, order, setGreenFlag, setRedFlag, clrFlagA, SetclrFlagA, clrFlagB, SetclrFlagB, clrFlagC, SetclrFlagC, clrFlagD, SetclrFlagD, SetCorrect, SetWrong }) => {

    const [incmentCount, setincmentCount] = useState(0)
    const [writtenAnswer, setWrittenAnswer] = useState('')
    const [disQuestn, setDisQuestn] = useState({
        Questn: '',
        optionA: '',
        optionB: '',
        optionC: '',
        optionD: '',
        writtenStatus: 0,
        upload_status: 0,
        oder: 0,
        marks: 0,
        handwrite_answer: [],
        right_answer: ''
    })

    const { Questn, optionA, optionB, optionC, optionD, writtenStatus, upload_status, oder, marks, handwrite_answer, right_answer } = disQuestn;

    useEffect(() => {
        if (data.length !== 0) {
            const questDetails = data?.find((val) => val.oder === order)
            const { questions, answer_a, answer_b, answer_c, answer_d, writtenStatus, upload_status, oder, marks, handwrite_answer, right_answer } = questDetails;
            const obj = {
                Questn: questions,
                optionA: answer_a,
                optionB: answer_b,
                optionC: answer_c,
                optionD: answer_d,
                writtenStatus: writtenStatus,
                upload_status: upload_status,
                oder: oder,
                marks: marks,
                handwrite_answer: handwrite_answer,
                right_answer: right_answer
            }
            setDisQuestn(obj);
        }
    }, [data, order, setDisQuestn])


    const HandleOptionA = useCallback(() => {
        if (incmentCount === 0) {
            SetclrFlagA(1)
            SetclrFlagB(0)
            SetclrFlagC(0)
            SetclrFlagD(0)
            setincmentCount(incmentCount + 1)
        } else if (incmentCount === 1) {
            setincmentCount(0)
            SetclrFlagA(0)
            SetclrFlagB(0)
            SetclrFlagC(0)
            SetclrFlagD(0)
        }
        else {
            setincmentCount(0)
            SetclrFlagA(0)
            SetclrFlagB(0)
            SetclrFlagC(0)
            SetclrFlagD(0)
        }
    }, [SetclrFlagA, SetclrFlagB, SetclrFlagC, SetclrFlagD, setincmentCount, incmentCount])

    //Option B
    const HandleOptionB = useCallback(() => {
        if (incmentCount === 0) {
            SetclrFlagB(1)
            SetclrFlagA(0)
            SetclrFlagC(0)
            SetclrFlagD(0)
            setincmentCount(incmentCount + 1)
        } else if (incmentCount === 1) {
            setincmentCount(0)
            SetclrFlagB(0)
            SetclrFlagA(0)
            SetclrFlagC(0)
            SetclrFlagD(0)
        }
        else {
            setincmentCount(0)
            SetclrFlagB(0)
            SetclrFlagA(0)
            SetclrFlagC(0)
            SetclrFlagD(0)
        }
    }, [SetclrFlagA, SetclrFlagB, SetclrFlagC, SetclrFlagD, setincmentCount, incmentCount])


    //Option C
    const HandleOptionC = useCallback(() => {
        if (incmentCount === 0) {
            SetclrFlagC(1)
            SetclrFlagB(0)
            SetclrFlagD(0)
            SetclrFlagA(0)
            setincmentCount(incmentCount + 1)
        }
        else if (incmentCount === 1) {
            setincmentCount(0)
            SetclrFlagC(0)
            SetclrFlagB(0)
            SetclrFlagD(0)
            SetclrFlagA(0)
        }
        else {
            setincmentCount(0)
            SetclrFlagC(0)
            SetclrFlagB(0)
            SetclrFlagD(0)
            SetclrFlagA(0)
        }

    }, [SetclrFlagA, SetclrFlagB, SetclrFlagC, SetclrFlagD, setincmentCount, incmentCount])


    //Option D
    const HandleOptionD = useCallback(() => {
        if (incmentCount === 0) {
            SetclrFlagD(1)
            SetclrFlagA(0)
            SetclrFlagB(0)
            SetclrFlagC(0)
            setincmentCount(incmentCount + 1)
        }
        else if (incmentCount === 1) {
            setincmentCount(0)
            SetclrFlagD(0)
            SetclrFlagA(0)
            SetclrFlagB(0)
            SetclrFlagC(0)
        }
        else {
            setincmentCount(0)
            SetclrFlagD(0)
            SetclrFlagA(0)
            SetclrFlagB(0)
            SetclrFlagC(0)
        }
    }, [SetclrFlagA, SetclrFlagB, SetclrFlagC, SetclrFlagD, setincmentCount, incmentCount])


    useEffect(() => {
        const correct_answer = clrFlagA === 1 ? 1 : clrFlagB === 1 ? 2 : clrFlagC === 1 ? 3 : clrFlagD === 1 ? 4 : 0
        const c_ans = correct_answer === right_answer ? correct_answer : 0
        if (c_ans > 0) {
            SetCorrect(c_ans)
        }
        else {
            SetWrong(c_ans)
        }
    }, [clrFlagA, clrFlagB, SetCorrect, SetWrong, right_answer, setGreenFlag, setRedFlag, clrFlagC, count, clrFlagD])
    return (
        <Fragment>
            <Box sx={{ display: "flex", flexDirection: "row" }}>
                <Typography sx={{ fontSize: "large", fontWeight: "bold" }}>Q. {Questn}</Typography>
            </Box>
            <Box>
                {
                    clrFlagA === 1 ?
                        <Paper sx={{ mt: 2, p: 3, display: "flex", flexDirection: "row", gap: 3, cursor: "pointer", backgroundColor: "#F1EAFF" }} onClick={HandleOptionA}>
                            <Box sx={{ width: "2%", borderRadius: 5, textAlign: "center", border: 2, borderColor: "#674188" }}>1</Box>
                            <Box sx={{ width: "80%" }}>{optionA}</Box>
                        </Paper>
                        :
                        <Paper sx={{ mt: 2, p: 3, display: "flex", flexDirection: "row", gap: 3, cursor: "pointer" }} onClick={HandleOptionA}>
                            <Box sx={{ width: "2%", borderRadius: 5, textAlign: "center", border: 2, borderColor: "#674188" }}>1</Box>
                            <Box sx={{ width: "80%" }}>{optionA}</Box>
                        </Paper>
                }
                {
                    clrFlagB === 1 ?
                        <Paper sx={{ mt: 2, p: 3, display: "flex", flexDirection: "row", gap: 3, cursor: "pointer", backgroundColor: "#F1EAFF" }} onClick={HandleOptionB}>
                            <Box sx={{ width: "2%", borderRadius: 5, textAlign: "center", border: 2, borderColor: "#674188" }}>2</Box>
                            <Box sx={{ width: "80%" }}>{optionB}</Box>
                        </Paper>
                        : <Paper sx={{ mt: 2, p: 3, display: "flex", flexDirection: "row", gap: 3, cursor: "pointer" }} onClick={HandleOptionB}>
                            <Box sx={{ width: "2%", borderRadius: 5, textAlign: "center", border: 2, borderColor: "#674188" }}>2</Box>
                            <Box sx={{ width: "80%" }}>{optionB}</Box>
                        </Paper>
                }
                {
                    clrFlagC === 1 ?
                        <Paper sx={{ mt: 2, p: 3, display: "flex", flexDirection: "row", gap: 3, cursor: "pointer", backgroundColor: "#F1EAFF" }} onClick={HandleOptionC}>
                            <Box sx={{ width: "2%", borderRadius: 5, textAlign: "center", border: 2, borderColor: "#674188" }}>3</Box>
                            <Box sx={{ width: "80%" }}>{optionC}</Box>
                        </Paper>
                        : <Paper sx={{ mt: 2, p: 3, display: "flex", flexDirection: "row", gap: 3, cursor: "pointer" }} onClick={HandleOptionC}>
                            <Box sx={{ width: "2%", borderRadius: 5, textAlign: "center", border: 2, borderColor: "#674188" }}>3</Box>
                            <Box sx={{ width: "80%" }}>{optionC}</Box>
                        </Paper>
                }
                {
                    clrFlagD === 1 ?
                        <Paper sx={{ mt: 2, p: 3, display: "flex", flexDirection: "row", gap: 3, cursor: "pointer", backgroundColor: "#F1EAFF" }} onClick={HandleOptionD}>
                            <Box sx={{ width: "2%", borderRadius: 5, textAlign: "center", border: 2, borderColor: "#674188" }}>4</Box>
                            <Box sx={{ width: "80%" }}>{optionD}</Box>
                        </Paper>
                        : <Paper sx={{ mt: 2, p: 3, display: "flex", flexDirection: "row", gap: 3, cursor: "pointer" }} onClick={HandleOptionD}>
                            <Box sx={{ width: "2%", borderRadius: 5, textAlign: "center", border: 2, borderColor: "#674188" }}>4</Box>
                            <Box sx={{ width: "80%" }}>{optionD}</Box>
                        </Paper>
                }
            </Box>
            {/* Written Answer */}
            {
                writtenStatus === 1 ?
                    <Box sx={{ mt: 2, display: "flex", flexDirection: "row", gap: 3 }}>
                        <CssVarsProvider>
                            <Textarea
                                label="Outlined"
                                placeholder="Written Answer"
                                variant="outlined"
                                size="md"
                                value={writtenAnswer}
                                minRows={3}
                                maxRows={4}
                                onChange={(e) => setWrittenAnswer(e.target.value)}
                                style={{ flex: 1 }}
                            />
                        </CssVarsProvider>
                    </Box>
                    : null
            }
        </Fragment>

    )
}

export default memo(QuestionHeading)
