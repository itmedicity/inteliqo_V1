import { CssVarsProvider, Textarea } from '@mui/joy';
import { Box, Paper, Typography } from '@mui/material'
import React, { Fragment, memo, useCallback, useEffect, useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios';
import { PUBLIC_NAS_FOLDER } from 'src/views/Constant/Static';

const QuestionHeading = ({ data, order, clrFlagA, SetclrFlagA, clrFlagB, SetclrFlagB, clrFlagC, SetclrFlagC, clrFlagD, SetclrFlagD, setRightAns, setDisright }) => {

    const [incmentCount, setincmentCount] = useState(0)
    const [writtenAnswer, setWrittenAnswer] = useState('')
    const [uploads, setUploads] = useState([]);
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
        handwrite_answer: '',
        right_answer: '',
        q_slno: 0,
        topic_slno: 0
    })

    const { Questn, optionA, optionB, optionC, optionD, writtenStatus, q_slno, topic_slno } = disQuestn;

    useEffect(() => {
        if (data.length !== 0) {
            const questDetails = data?.find((val) => val.oder === order)
            const { questions, answer_a, answer_b, answer_c, answer_d, writtenStatus, upload_status, oder, marks, handwrite_answer, right_answer, q_slno, topic_slno } = questDetails;
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
                right_answer: right_answer,
                q_slno: q_slno,
                topic_slno: topic_slno
            }
            setDisQuestn(obj);
            setRightAns(right_answer)
        }
        const getData = async () => {
            const postdata = {
                checklistid: q_slno,
                topic_slno: topic_slno
            }
            const response = await axioslogin.post('/trainUploadCheck/selectuploads', postdata)
            const { success } = response.data
            if (success === 1) {
                const data = response.data;
                const fileNames = data.data
                const fileUrls = fileNames?.map((filename) => {
                    const url = `${PUBLIC_NAS_FOLDER}/Training/${topic_slno}/${q_slno}/${filename}`;
                    const parts = url.split('/');
                    const fileName = parts[parts.length - 1]; // Extract the file name
                    const fileNameWithoutExtension = fileName.replace(/\.[^/.]+$/, ''); // Remove extension
                    const obj = {
                        id: fileNameWithoutExtension,
                        file: url
                    }
                    return obj;
                });
                setUploads(fileUrls)
            } else {
                // infoNofity("No File uploads")
            }
        }
        getData()

    }, [data, order, setUploads, setDisQuestn, setRightAns, q_slno, topic_slno])

    const HandleOptionA = useCallback(() => {
        if (incmentCount === 0) {
            SetclrFlagA(1)
            SetclrFlagB(0)
            SetclrFlagC(0)
            SetclrFlagD(0)
            setincmentCount(incmentCount + 1)
            setDisright(1)
        } else if (incmentCount === 1) {
            setincmentCount(0)
            SetclrFlagA(0)
            SetclrFlagB(0)
            SetclrFlagC(0)
            SetclrFlagD(0)
            setDisright(0)
        }
        else {
            setincmentCount(0)
            SetclrFlagA(0)
            SetclrFlagB(0)
            SetclrFlagC(0)
            SetclrFlagD(0)
            setDisright(0)
        }
    }, [SetclrFlagA, SetclrFlagB, SetclrFlagC, SetclrFlagD, setincmentCount, incmentCount, setDisright])

    //Option B
    const HandleOptionB = useCallback(() => {
        if (incmentCount === 0) {
            SetclrFlagB(1)
            SetclrFlagA(0)
            SetclrFlagC(0)
            SetclrFlagD(0)
            setincmentCount(incmentCount + 1)
            setDisright(2)

        } else if (incmentCount === 1) {
            setincmentCount(0)
            SetclrFlagB(0)
            SetclrFlagA(0)
            SetclrFlagC(0)
            SetclrFlagD(0)
            setDisright(0)
        }
        else {
            setincmentCount(0)
            SetclrFlagB(0)
            SetclrFlagA(0)
            SetclrFlagC(0)
            SetclrFlagD(0)
            setDisright(0)
        }

    }, [SetclrFlagA, SetclrFlagB, SetclrFlagC, SetclrFlagD, setincmentCount, incmentCount, setDisright])


    //Option C
    const HandleOptionC = useCallback(() => {
        if (incmentCount === 0) {
            SetclrFlagC(1)
            SetclrFlagB(0)
            SetclrFlagD(0)
            SetclrFlagA(0)
            setincmentCount(incmentCount + 1)
            setDisright(3)
        }
        else if (incmentCount === 1) {
            setincmentCount(0)
            SetclrFlagC(0)
            SetclrFlagB(0)
            SetclrFlagD(0)
            SetclrFlagA(0)
            setDisright(0)
        }
        else {
            setincmentCount(0)
            SetclrFlagC(0)
            SetclrFlagB(0)
            SetclrFlagD(0)
            SetclrFlagA(0)
            setDisright(0)
        }
    }, [SetclrFlagA, SetclrFlagB, SetclrFlagC, SetclrFlagD, setincmentCount, incmentCount, setDisright])


    //Option D
    const HandleOptionD = useCallback(() => {

        if (incmentCount === 0) {
            SetclrFlagD(1)
            SetclrFlagA(0)
            SetclrFlagB(0)
            SetclrFlagC(0)
            setincmentCount(incmentCount + 1)
            setDisright(4)
        }
        else if (incmentCount === 1) {
            setincmentCount(0)
            SetclrFlagD(0)
            SetclrFlagA(0)
            SetclrFlagB(0)
            SetclrFlagC(0)
            setDisright(0)
        }
        else {
            setincmentCount(0)
            SetclrFlagD(0)
            SetclrFlagA(0)
            SetclrFlagB(0)
            SetclrFlagC(0)
            setDisright(0)
        }
    }, [SetclrFlagA, SetclrFlagB, SetclrFlagC, SetclrFlagD, setincmentCount, incmentCount, setDisright])

    useEffect(() => {
        if (uploads.length !== 0) {
            uploads?.map((val) => {
                // console.log("val", val);
                if (val.id === "A") {
                    // setoptionA(val.file)
                    console.log("A", optionA)
                }
                else if (val.id === "B") {
                    //console.log("B", val.file)
                }
                else if (val.id === "C") {
                    //console.log("C", val.file)
                }
                else if (val.id === "D") {
                    //console.log("D", val.file)
                }
            })
        }
        // else {
        //     setAFlag(0)
        //     setBFlag(0)
        //     setCFlag(0)
        //     setDFlag(0)
        // }
    }, [uploads])
    return (
        <Fragment>
            <Box sx={{ display: "flex", flexDirection: "row" }}>
                <Typography sx={{ fontSize: "large", fontWeight: "bold" }}>Q. {Questn}</Typography>
            </Box>
            {/* <Paper sx={{ width: "50%" }}>
                <img
                    src={uploads}
                    height={400}
                    alt='Error'
                    style={{ maxWidth: '100%', maxHeight: '100%' }}
                />
            </Paper> */}
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

                    : <Box>
                        {
                            clrFlagA === 1 ?
                                <Paper sx={{ mt: 2, p: 3, display: "flex", flexDirection: "row", gap: 3, cursor: "pointer", backgroundColor: "#F1EAFF" }}
                                    onClick={HandleOptionA}
                                >
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
                                <Paper sx={{ mt: 2, p: 3, display: "flex", flexDirection: "row", gap: 3, cursor: "pointer", backgroundColor: "#F1EAFF" }}
                                    onClick={HandleOptionB}
                                >
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
                                <Paper sx={{ mt: 2, p: 3, display: "flex", flexDirection: "row", gap: 3, cursor: "pointer", backgroundColor: "#F1EAFF" }}
                                    onClick={HandleOptionC}
                                >
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
                                <Paper sx={{ mt: 2, p: 3, display: "flex", flexDirection: "row", gap: 3, cursor: "pointer", backgroundColor: "#F1EAFF" }}
                                    onClick={HandleOptionD}
                                >
                                    <Box sx={{ width: "2%", borderRadius: 5, textAlign: "center", border: 2, borderColor: "#674188" }}>4</Box>
                                    <Box sx={{ width: "80%" }}>{optionD}</Box>
                                </Paper>
                                : <Paper sx={{ mt: 2, p: 3, display: "flex", flexDirection: "row", gap: 3, cursor: "pointer" }} onClick={HandleOptionD}>
                                    <Box sx={{ width: "2%", borderRadius: 5, textAlign: "center", border: 2, borderColor: "#674188" }}>4</Box>
                                    <Box sx={{ width: "80%" }}>{optionD}</Box>
                                </Paper>
                        }
                    </Box>
            }
        </Fragment>

    )
}

export default memo(QuestionHeading)
