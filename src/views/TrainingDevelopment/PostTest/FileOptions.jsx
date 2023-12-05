import { Box, Paper } from '@mui/material'
import React, { memo, useCallback, useEffect } from 'react'
import { axioslogin } from 'src/views/Axios/Axios';
import { PUBLIC_NAS_FOLDER } from 'src/views/Constant/Static';

const FileOptions = ({ Questn, clrFlagA, SetclrFlagA, clrFlagB, SetclrFlagB, clrFlagC, SetclrFlagC, clrFlagD, SetclrFlagD, setDisright, incmentCount, setincmentCount, disQuestn, setDisQuestn }) => {

    const { optionA, optionB, optionC, optionD, q_slno, topic_slno } = disQuestn;

    useEffect(() => {
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
                    const fileName = parts[parts.length - 1];
                    const fileNameWithoutExtension = fileName.replace(/\.[^/.]+$/, '');
                    const obj = {
                        id: fileNameWithoutExtension,
                        file: url
                    }
                    return obj;
                });

                const fileA = fileUrls?.find((val) => val.id === "A" ? val.file : null)
                const fileB = fileUrls?.find((val) => val.id === "B" ? val.file : null)
                const fileC = fileUrls?.find((val) => val.id === "C" ? val.file : null)
                const fileD = fileUrls?.find((val) => val.id === "D" ? val.file : null)

                const frmdata = {
                    Questn: Questn,
                    optionA: fileA.file,
                    optionB: fileB.file,
                    optionC: fileC.file,
                    optionD: fileD.file,
                }
                setDisQuestn(frmdata)
            }
        }
        getData()
    }, [q_slno, topic_slno, setDisQuestn, Questn])

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

    return (
        <Box>
            {
                clrFlagA === 1 ?
                    <Paper sx={{ mt: 1, p: 1.4, display: "flex", flexDirection: "row", gap: 3, cursor: "pointer", flexWrap: "wrap", backgroundColor: "#F1EAFF" }}
                        onClick={HandleOptionA}
                    >
                        {/* <Box sx={{ mt: 2, borderRadius: 5, textAlign: "center", border: 2, borderColor: "#674188" }}>1</Box> */}
                        <Box sx={{ fontWeight: "bold", mt: 2 }}>1.</Box>
                        <Box sx={{ width: "80%", height: "100%", display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
                            <img
                                src={optionA}
                                height={50}
                                alt='Error'
                                style={{ maxWidth: '100%', maxHeight: '100%' }}
                            />
                        </Box>
                    </Paper>
                    :
                    <Paper sx={{ mt: 1, p: 1.4, display: "flex", flexDirection: "row", gap: 3, cursor: "pointer", flexWrap: "wrap" }} onClick={HandleOptionA}>

                        <Box sx={{ fontWeight: "bold", mt: 2 }}>1.</Box>
                        <Box sx={{ width: "80%", height: "100%", display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
                            <img
                                src={optionA}
                                height={50}
                                alt='Error'
                                style={{ maxWidth: '100%', maxHeight: '100%' }}
                            />
                        </Box>
                    </Paper>
            }
            {
                clrFlagB === 1 ?
                    <Paper sx={{ mt: 1, p: 1.4, display: "flex", flexDirection: "row", gap: 3, cursor: "pointer", flexWrap: "wrap", backgroundColor: "#F1EAFF" }}
                        onClick={HandleOptionB}
                    >
                        {/* <Box sx={{ width: "2%" }}><Box sx={{ mt: 2, borderRadius: 5, textAlign: "center", border: 2, borderColor: "#674188" }}>2</Box></Box> */}
                        <Box sx={{ fontWeight: "bold", mt: 2 }}>2.</Box>
                        <Box sx={{ width: "80%", height: "100%", display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
                            <img
                                src={optionB}
                                height={50}
                                alt='Error'
                                style={{ maxWidth: '100%', maxHeight: '100%' }}
                            /></Box>
                    </Paper>
                    : <Paper sx={{ mt: 1, p: 1.4, display: "flex", flexDirection: "row", gap: 3, cursor: "pointer", flexWrap: "wrap" }} onClick={HandleOptionB}>
                        {/* <Box sx={{ width: "2%" }}><Box sx={{ mt: 2, borderRadius: 5, textAlign: "center", border: 2, borderColor: "#674188" }}>2</Box></Box> */}
                        <Box sx={{ fontWeight: "bold", mt: 2 }}>2.</Box>
                        <Box sx={{ width: "80%", height: "100%", display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
                            <img
                                src={optionB}
                                height={50}
                                alt='Error'
                                style={{ maxWidth: '100%', maxHeight: '100%' }}
                            /></Box>
                    </Paper>
            }
            {
                clrFlagC === 1 ?
                    <Paper sx={{ mt: 1, p: 1.4, display: "flex", flexDirection: "row", gap: 3, cursor: "pointer", backgroundColor: "#F1EAFF", flexWrap: "wrap" }}
                        onClick={HandleOptionC}
                    >
                        {/* <Box sx={{ width: "2%" }}><Box sx={{ mt: 2, borderRadius: 5, textAlign: "center", border: 2, borderColor: "#674188" }}>3</Box></Box> */}
                        <Box sx={{ fontWeight: "bold", mt: 2 }}>3.</Box>
                        <Box sx={{ width: "80%", height: "100%", display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
                            <img
                                src={optionC}
                                height={50}
                                alt='Error'
                                style={{ maxWidth: '100%', maxHeight: '100%' }}
                            /></Box>
                    </Paper>
                    : <Paper sx={{ mt: 1, p: 1.4, display: "flex", flexDirection: "row", gap: 3, flexWrap: "wrap", cursor: "pointer" }} onClick={HandleOptionC}>
                        {/* <Box sx={{ width: "2%" }}><Box sx={{ mt: 2, borderRadius: 5, textAlign: "center", border: 2, borderColor: "#674188" }}>3</Box></Box> */}
                        <Box sx={{ fontWeight: "bold", mt: 2 }}>3.</Box>
                        <Box sx={{ width: "80%", height: "100%", display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
                            <img
                                src={optionC}
                                height={50}
                                alt='Error'
                                style={{ maxWidth: '100%', maxHeight: '100%' }}
                            /></Box>
                    </Paper>
            }
            {
                clrFlagD === 1 ?
                    <Paper sx={{ mt: 1, p: 1.4, display: "flex", flexDirection: "row", gap: 3, flexWrap: "wrap", cursor: "pointer", backgroundColor: "#F1EAFF" }}
                        onClick={HandleOptionD}
                    >
                        {/* <Box sx={{ width: "2%" }}><Box sx={{ mt: 2, borderRadius: 5, textAlign: "center", border: 2, borderColor: "#674188" }}>4</Box></Box> */}
                        <Box sx={{ fontWeight: "bold", mt: 2 }}>4.</Box>
                        <Box sx={{ width: "80%", height: "100%", display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
                            <img
                                src={optionD}
                                height={50}
                                alt='Error'
                                style={{ maxWidth: '100%', maxHeight: '100%' }}
                            /></Box>
                    </Paper>
                    : <Paper sx={{ mt: 1, p: 1.4, display: "flex", flexDirection: "row", gap: 3, flexWrap: "wrap", cursor: "pointer" }} onClick={HandleOptionD}>
                        {/* <Box sx={{ width: "2%" }}><Box sx={{ mt: 2, borderRadius: 5, textAlign: "center", border: 2, borderColor: "#674188" }}>4</Box></Box> */}
                        <Box sx={{ fontWeight: "bold", mt: 2 }}>4.</Box>
                        <Box sx={{ width: "80%", height: "100%", display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
                            <img
                                src={optionD}
                                height={50}
                                alt='Error'
                                style={{ maxWidth: '100%', maxHeight: '100%' }}
                            /></Box>
                    </Paper>
            }
        </Box>
    )
}

export default memo(FileOptions)
