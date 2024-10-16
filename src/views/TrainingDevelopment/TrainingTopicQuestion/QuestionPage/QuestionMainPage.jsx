import { Button, Checkbox, CssVarsProvider, Input, Textarea, Tooltip } from '@mui/joy'
import { Box, Paper, IconButton, Typography } from '@mui/material'
import React, { Fragment, memo, useCallback, useEffect, useMemo } from 'react'
import { ToastContainer } from 'react-toastify'
import SaveIcon from '@mui/icons-material/Save';
import { useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc'
import { useDispatch, useSelector } from 'react-redux';
import _ from 'underscore';
import CommonAgGrid from 'src/views/Component/CommonAgGrid'
import EditIcon from '@mui/icons-material/Edit';
import { TrainingTopics } from 'src/redux/actions/Training.Action';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import CloseIcon from '@mui/icons-material/Close'
import imageCompression from 'browser-image-compression'
import TouchAppSharpIcon from '@mui/icons-material/TouchAppSharp';
import { PUBLIC_NAS_FOLDER } from 'src/views/Constant/Static';
import ViewFileModal from './ViewFileModal';
import JoyTopicByDeptWiseEntry from 'src/views/MuiComponents/JoyComponent/JoyTopicByDeptWiseEntry';

const QuestionMainPage = () => {
    const [training_topic, setTraining_topic] = useState(0);
    const [questions, setQuestions] = useState('');
    const [answerA, setAnswerA] = useState('');
    const [answerB, setAnswerB] = useState('');
    const [answerC, setAnswerC] = useState('');
    const [answerD, setAnswerD] = useState('');
    const [status_a, setStatus_a] = useState(false);
    const [status_b, setStatus_b] = useState(false);
    const [status_c, setStatus_c] = useState(false);
    const [status_d, setStatus_d] = useState(false);
    const [writtenAnswer, setWrittenAnswer] = useState('');
    const [writtenStatus, setWrittenStatus] = useState(false);
    const [writeFlag, setWtriteflag] = useState(false);
    const [marks, setMarks] = useState('');
    const [selectedFileA, setSelectedFileA] = useState(null);
    const [selectedFileB, setSelectedFileB] = useState(null);
    const [selectedFileC, setSelectedFileC] = useState(null);
    const [selectedFileD, setSelectedFileD] = useState(null);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [showCloseIconA, setShowCloseIconA] = useState(true);
    const [showCloseIconB, setShowCloseIconB] = useState(true);
    const [showCloseIconC, setShowCloseIconC] = useState(true);
    const [showCloseIconD, setShowCloseIconD] = useState(true);
    const [Q_id, setQid] = useState(0);
    const [count, setCount] = useState(0);
    const [flag, setFlag] = useState(0);
    const [tableData, setTabledata] = useState([]);
    const [open, setopen] = useState(false);
    const [view, setview] = useState(0);
    const [uploads, setUploads] = useState([]);
    const [disFile, setDisFile] = useState(null)
    const [aflag, setAFlag] = useState(0)
    const [bflag, setBFlag] = useState(0)
    const [cflag, setCFlag] = useState(0)
    const [dflag, setDFlag] = useState(0)
    const [aflagFile, setAFlagFile] = useState(null)
    const [bflagFile, setBFlagFile] = useState(null)
    const [cflagFile, setCFlagFile] = useState(null)
    const [dflagFile, setDFlagFile] = useState(null)

    const employeeState = useSelector((state) => state?.getProfileData?.ProfileData, _.isEqual);
    const employeeProfileDetl = useMemo(() => employeeState[0], [employeeState]);
    const { em_id, em_department } = employeeProfileDetl;

    const editReset = useCallback(() => {


    }, [])
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(TrainingTopics())
    }, [dispatch, count])

    //postdata
    const postdata = useMemo(() => {
        return {
            training_topics: training_topic,
            questions: questions,
            answer_a: writtenStatus === true ? null : answerA,
            answer_b: writtenStatus === true ? null : answerB,
            answer_c: writtenStatus === true ? null : answerC,
            answer_d: writtenStatus === true ? null : answerD,
            right_answer: status_a === true ? 1 : status_b === true ? 2 : status_c === true ? 3 : status_d === true ? 4 : 0,
            writtenStatus: writtenStatus === true ? 1 : 0,
            handwrite_answer: writtenStatus === true ? writtenAnswer : null,
            marks: marks,
            create_user: em_id
        }
    }, [questions, training_topic, answerA, answerB, answerC, answerD, status_a, status_b, status_c,
        status_d, writtenAnswer, marks, writtenStatus, em_id])

    const patchdata = useMemo(() => {
        return {
            q_slno: Q_id,
            questions: questions,
            answer_a: writtenStatus === true ? null : answerA,
            answer_b: writtenStatus === true ? null : answerB,
            answer_c: writtenStatus === true ? null : answerC,
            answer_d: writtenStatus === true ? null : answerD,
            right_answer: status_a === true ? 1 : status_b === true ? 2 : status_c === true ? 3 : status_d === true ? 4 : 0,
            writtenStatus: writtenStatus === true ? 1 : 0,
            handwrite_answer: writtenStatus === true ? writtenAnswer : null,
            marks: marks,
            edit_user: em_id
        }
    }, [questions, Q_id, answerA, answerB, answerC, answerD, status_a, status_b, status_c,
        status_d, writtenStatus, writtenAnswer, marks, em_id])

    //reset
    const reset = useCallback(() => {
        setTraining_topic(0);
        setQuestions('');
        setAnswerA('');
        setAnswerB('');
        setAnswerC('');
        setAnswerD('');
        setWrittenAnswer('')
        setWrittenStatus(false)
        setMarks(0);
        setStatus_a(false)
        setStatus_b(false)
        setStatus_c(false)
        setStatus_d(false)
        setSelectedFileA(null)
        setSelectedFileB(null)
        setSelectedFileC(null)
        setSelectedFileD(null)
        setShowCloseIconA(false);
        setShowCloseIconB(false);
        setShowCloseIconC(false);
        setShowCloseIconD(false);
        setSelectedFiles([]);
        setWtriteflag(false);
        setAFlag(0);
        setBFlag(0);
        setCFlag(0);
        setDFlag(0);
    }, [setTraining_topic])

    //view
    useEffect(() => {
        const getData = async () => {
            const result = await axioslogin.get(`/TriningQuestions/dept_wise_quest/${em_department}`)
            const { success, data } = result.data;
            if (success === 2) {
                const viewData = data?.map((val, ndx) => {
                    const obj = {
                        slno: ndx + 1,
                        q_slno: val.q_slno,
                        topic_slno: val.topic_slno,
                        training_topic_name: val.training_topic_name,
                        questions: val.questions,
                        answer_a: val.answer_a,
                        answer_b: val.answer_b,
                        answer_c: val.answer_c,
                        answer_d: val.answer_d,
                        writtenStatus: val.writtenStatus,
                        handwrite_answer: val.handwrite_answer,
                        right_answer: val.right_answer,
                        a: val.answer_a ? val.answer_a : "NILL",
                        b: val.answer_b ? val.answer_b : "NILL",
                        c: val.answer_c ? val.answer_c : "NILL",
                        d: val.answer_d ? val.answer_d : "NILL",
                        right: val.right_answer ? val.right_answer : "NILL",
                        handwrite: val.handwrite_answer ? val.handwrite_answer : "NILL",
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
    }, [count, em_department])


    //written checkbox
    const HandleWrittenStatus = useCallback((e) => {
        if (e.target.checked === true) {
            setWtriteflag(1);
            setWrittenStatus(e.target.checked);
            setStatus_a(false)
            setStatus_b(false)
            setStatus_c(false)
            setStatus_d(false)
        }
        else {
            setWrittenStatus(false)
            setWtriteflag(0);
        }
    }, [setWtriteflag, setWrittenStatus])

    //options checking
    const HandleStatus_a = useCallback((e) => {
        if (e.target.checked === true) {
            setStatus_a(e.target.checked)
            setStatus_b(false)
            setStatus_c(false)
            setStatus_d(false)
        }
        else {
            setStatus_a(false)
            setStatus_b(false)
            setStatus_c(false)
            setStatus_d(false)
        }
    }, [setStatus_a, setStatus_b, setStatus_c, setStatus_d])

    const HandleStatus_b = useCallback((e) => {
        if (e.target.checked === true) {
            setStatus_b(e.target.checked)
            setStatus_a(false)
            setStatus_c(false)
            setStatus_d(false)
        }
        else {
            setStatus_a(false)
            setStatus_b(false)
            setStatus_c(false)
            setStatus_d(false)
        }
    }, [setStatus_a, setStatus_b, setStatus_c, setStatus_d])

    const HandleStatus_c = useCallback((e) => {
        if (e.target.checked === true) {
            setStatus_c(e.target.checked)
            setStatus_a(false)
            setStatus_b(false)
            setStatus_d(false)
        }
        else {
            setStatus_a(false)
            setStatus_b(false)
            setStatus_c(false)
            setStatus_d(false)
        }
    }, [setStatus_a, setStatus_b, setStatus_c, setStatus_d])

    const HandleStatus_d = useCallback((e) => {
        if (e.target.checked === true) {
            setStatus_d(e.target.checked)
            setStatus_a(false)
            setStatus_b(false)
            setStatus_c(false)
        }
        else {
            setStatus_a(false)
            setStatus_b(false)
            setStatus_c(false)
            setStatus_d(false)
        }
    }, [setStatus_a, setStatus_b, setStatus_c, setStatus_d])


    const handleFileA = useCallback(async (e) => {
        const ImageA = e.target.files[0];
        setShowCloseIconA(true);
        const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 1920,
            useWebWorker: true,
        };
        const compressedFile = await imageCompression(ImageA, options);
        const newName = "Image_A.jpg";
        const modifiedFile = new File([compressedFile], newName, { type: ImageA.type });
        const obj = {
            Id: "A",
            name: modifiedFile
        };
        setSelectedFiles([...selectedFiles, obj]);
        setSelectedFileA(modifiedFile.name);
    }, [selectedFiles, setSelectedFiles, setSelectedFileA, setShowCloseIconA]);

    const handleFileB = useCallback(async (e) => {
        const ImageB = e.target.files[0];
        setShowCloseIconB(true);

        const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 1920,
            useWebWorker: true,
        };

        const compressedFile = await imageCompression(ImageB, options);
        const newName = "Image_B.jpg";
        const modifiedFile = new File([compressedFile], newName, { type: ImageB.type });
        const obj = {
            Id: "B",
            name: modifiedFile
        };
        setSelectedFiles([...selectedFiles, obj]);
        setSelectedFileB(modifiedFile.name);
    }, [selectedFiles, setSelectedFiles, setSelectedFileB, setShowCloseIconB]);


    const handleFileC = useCallback(async (e) => {
        const ImageC = e.target.files[0];
        setShowCloseIconC(true);
        const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 1920,
            useWebWorker: true,
        };
        const compressedFile = await imageCompression(ImageC, options);
        const newName = "Image_C.jpg";
        const modifiedFile = new File([compressedFile], newName, { type: ImageC.type });
        const obj = {
            Id: "C",
            name: modifiedFile
        };
        setSelectedFiles([...selectedFiles, obj]);
        setSelectedFileC(modifiedFile.name);
    }, [selectedFiles, setSelectedFiles, setSelectedFileC, setShowCloseIconC]);


    const handleFileD = useCallback(async (e) => {
        const ImageD = e.target.files[0];
        setShowCloseIconD(true);
        const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 1920,
            useWebWorker: true,
        };
        const compressedFile = await imageCompression(ImageD, options);
        const newName = "Image_D.jpg";
        const modifiedFile = new File([compressedFile], newName, { type: ImageD.type });
        const obj = {
            Id: "D",
            name: modifiedFile
        };
        setSelectedFiles([...selectedFiles, obj]);
        setSelectedFileD(modifiedFile.name);
    }, [selectedFiles, setSelectedFiles, setSelectedFileD, setShowCloseIconD]);

    const handleRemoveFileA = useCallback((e) => {
        setShowCloseIconA(false);
        setSelectedFileA(null);
    }, [setSelectedFileA, setShowCloseIconA])

    const handleRemoveFileB = useCallback((e) => {
        setShowCloseIconB(false);
        setSelectedFileB(null);
    }, [setSelectedFileB, setShowCloseIconB])

    const handleRemoveFileC = useCallback((e) => {
        setShowCloseIconC(false);
        setSelectedFileC(null);
    }, [setSelectedFileC, setShowCloseIconC])

    const handleRemoveFileD = useCallback((e) => {
        setShowCloseIconD(false);
        setSelectedFileD(null);
    }, [setSelectedFileD, setShowCloseIconD])


    const getDataTable = useCallback(async (params) => {
        // setViewfiles(1);
        setFlag(1);
        const datas = params.data;
        const { topic_slno, questions, answer_a, answer_b, answer_c, answer_d,
            handwrite_answer, writtenStatus, marks, q_slno, right_answer } = datas;

        setTraining_topic(topic_slno);
        setQuestions(questions);
        setAnswerA(answer_a ? answer_a : '');
        setAnswerB(answer_b ? answer_b : '');
        setAnswerC(answer_c ? answer_c : '');
        setAnswerD(answer_d ? answer_d : '');
        setWrittenAnswer(handwrite_answer ? handwrite_answer : '');
        setMarks(marks);
        setQid(q_slno);
        setWrittenStatus(writtenStatus === 1 ? true : false)
        setStatus_a(right_answer === 1 ? true : false)
        setStatus_b(right_answer === 2 ? true : false)
        setStatus_c(right_answer === 3 ? true : false)
        setStatus_d(right_answer === 4 ? true : false)
        setUploads([])
        // api for file opening
        const postData = {
            checklistid: q_slno,
            topic_slno: topic_slno
        }
        const response = await axioslogin.post('/trainUploadCheck/selectuploads', postData)
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
            infoNofity("No File uploads")
        }
    }, [setUploads]);

    //submit
    const submitTrainingQuestions = useCallback(() => {
        const InsertData = async (postdata) => {
            try {
                const result = await axioslogin.post('/TriningQuestions/insert', postdata)
                return result.data;
            } catch (error) {
                console.error("Error while inserting data:", error);
                return { success: 0, message: "An error occurred while inserting data." };
            }
        };
        //edit
        const EditData = async (patchdata) => {
            const result = await axioslogin.patch('/TriningQuestions/update', patchdata)
            const { message, success } = result.data;
            if (success === 1) {
                reset();
                setCount(count + 1);
                setQid(0);
                succesNofity(message);
                setFlag(0);
            } else {
                warningNofity(message);
                reset();
            }
        };
        //image upload
        const handleUpload = async (insetId) => {
            try {
                const formData = new FormData();
                formData.append('training', training_topic);
                formData.append('img', insetId);

                const compressedFilesPromises = selectedFiles?.map((file) => {
                    formData.append('files', file.name);
                    formData.append('imgId', file.Id);
                });

                await Promise.all(compressedFilesPromises);
                const uploadResult = await axioslogin.post('/trainUploadCheck/uploadtrainingfiles', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                const { success, message } = uploadResult.data;
                if (success === 1) {
                    succesNofity(message);
                    setCount(count + 1);
                    reset();
                } else {
                    warningNofity(message);
                }
            } catch (error) {
                warningNofity('An error occurre.');
                console.error('Error during file upload:', error);
            }
        };

        if (flag === 1) {
            EditData(patchdata);
            reset();
        } else {
            if (questions !== '' && training_topic !== '' && answerA !== '' && answerB !== '' && answerC !== '' && answerD !== '' && marks !== '') {
                InsertData(postdata)
                    .then((val) => {
                        const { insetId, message, success } = val;
                        if (success === 1) {
                            if (selectedFiles.length !== 0) {
                                handleUpload(insetId);
                            } else {
                                succesNofity("Question inserted successfully");
                                reset();
                                setCount(count + 1);
                            }
                        }
                        else {
                            warningNofity(message)
                        }
                    })
                    .catch((error) => {
                        console.error("Error in InsertData:", error);
                        warningNofity('An error occurred while inserting data.');
                    });
            }
            else {
                warningNofity("Enter All The Feilds Before Submit")
            }

        }
    }, [postdata, patchdata, reset, flag, selectedFiles, training_topic, setCount, count, questions, answerA, answerB, answerC, answerD, marks]);

    //column def
    const [columnDef] = useState([
        { headerName: 'Sl.No ', field: 'slno', filter: true, minWidth: 90 },
        { headerName: 'Topics ', field: 'training_topic_name', filter: true, minWidth: 200 },
        { headerName: 'Questions', field: 'questions', filter: true, minWidth: 200 },
        { headerName: 'Ans_A ', field: 'a', filter: true, minWidth: 100 },
        { headerName: 'Ans_B', field: 'b', filter: true, minWidth: 100 },
        { headerName: 'Ans_C ', field: 'c', filter: true, minWidth: 100 },
        { headerName: 'Ans_D', field: 'd', filter: true, minWidth: 100 },
        { headerName: 'Crct_ans ', field: 'right', filter: true, minWidth: 100 },
        // { headerName: 'Handwrite ', field: 'handwrite', filter: true, minWidth: 100 },
        { headerName: 'Marks ', field: 'marks', filter: true, minWidth: 100 },
        {
            headerName: 'Edit', cellRenderer: params =>
                <Fragment>
                    <IconButton sx={{ paddingY: 0.5 }} onClick={() => getDataTable(params)} >
                        <EditIcon color='primary' />
                    </IconButton>
                </Fragment>
        }
    ])


    const ShowFliesA = useCallback(() => {
        setDisFile(aflagFile)
        setview(1);
        setopen(true);
    }, [setopen, setview, setDisFile, aflagFile])

    const ShowFliesB = useCallback(() => {
        setDisFile(bflagFile)
        setview(1);
        setopen(true);
    }, [setopen, setview, setDisFile, bflagFile])

    const ShowFliesC = useCallback(() => {
        setDisFile(cflagFile)
        setview(1);
        setopen(true);
    }, [setopen, setview, setDisFile, cflagFile])

    const ShowFliesD = useCallback(() => {
        setDisFile(dflagFile)
        setview(1);
        setopen(true);
    }, [setopen, setview, setDisFile, dflagFile])


    useEffect(() => {
        if (uploads.length !== 0) {
            uploads?.map((val) => {
                if (val.id === "A") {
                    setAFlag(1)
                    return setAFlagFile(val.file)
                }
                else if (val.id === "B") {
                    setBFlag(1)
                    return setBFlagFile(val.file)
                }
                else if (val.id === "C") {
                    setCFlag(1)
                    return setCFlagFile(val.file)
                }
                else if (val.id === "D") {
                    setDFlag(1)
                    return setDFlagFile(val.file)
                }
            })
        }
        else {
            setAFlag(0)
            setBFlag(0)
            setCFlag(0)
            setDFlag(0)
        }
    }, [uploads])

    return (
        <Fragment >
            <ToastContainer />
            <Box sx={{
                width: "100%", overflow: 'auto',
                '::-webkit-scrollbar': { display: "none" },
                p: 1
            }}>
                <Paper variant='outlined' sx={{ p: 1, width: "100%", display: "flex", flexDirection: "column" }}>
                    <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
                        <Box sx={{ width: "20%" }}>
                            <Typography sx={{ fontFamily: "sans-serif", fontWeight: "600" }}>Topic</Typography>
                            <JoyTopicByDeptWiseEntry value={training_topic} setValue={setTraining_topic} dept={em_department}
                                disabled={flag === 1 ? true : false} />
                        </Box>
                        <Box sx={{ flex: 1 }}>
                            <Typography sx={{ fontFamily: "sans-serif", fontWeight: "600" }}>Question</Typography>
                            <CssVarsProvider>
                                <Textarea
                                    label="Outlined"
                                    placeholder="Question:"
                                    variant="outlined"
                                    size="md"
                                    value={questions}
                                    minRows={1}
                                    maxRows={3}
                                    onChange={(e) => setQuestions(e.target.value)}
                                />
                            </CssVarsProvider>
                        </Box>
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mt: 1 }}>
                        <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
                            <Box sx={{ mt: 4 }}>
                                <Checkbox
                                    color="primary"
                                    label="Correct answer"
                                    checked={status_a}
                                    onChange={(e) => { HandleStatus_a(e) }}
                                    disabled={writtenStatus === true ? true : false}
                                />
                            </Box>
                            <Box sx={{ flex: 1 }}>
                                <Typography sx={{ fontFamily: "sans-serif", fontWeight: "600" }}>Answer A</Typography>
                                <CssVarsProvider>
                                    <Textarea
                                        label="Outlined"
                                        placeholder="Answer: A"
                                        variant="outlined"
                                        size="md"
                                        value={answerA}
                                        minRows={1}
                                        maxRows={3}
                                        onChange={(e) => setAnswerA(e.target.value)}
                                        disabled={writtenStatus === true ? true : false}
                                    />
                                </CssVarsProvider>
                            </Box>
                            <Box sx={{ display: "flex", flexDirection: "row", flex: 1, mt: 2 }}>
                                <Tooltip title="Upload file">
                                    <IconButton variant="outlined" component="label">
                                        <UploadFileIcon style={{ color: "#4682A9", fontSize: 40, border: 1, borderRadius: 10 }} />
                                        <input
                                            id="file-input"
                                            type="file"
                                            accept=".jpg, .jpeg, .png, .pdf"
                                            style={{ display: 'none' }}
                                            onChange={handleFileA}
                                        />
                                    </IconButton>
                                </Tooltip>
                                {selectedFileA && showCloseIconA && (
                                    <Box sx={{ color: "#4682A9", mt: 2, display: "flex", flexDirection: "row" }}>
                                        <Box >{selectedFileA}</Box>
                                        <IconButton color="primary" aria-label="Close" onClick={(e) => handleRemoveFileA(e)}>
                                            <CloseIcon />
                                        </IconButton>
                                    </Box>
                                )}

                                {
                                    aflag === 1 ?
                                        <Box sx={{ mt: 1 }}>
                                            <Tooltip title="View file">
                                                <IconButton onClick={(e) => ShowFliesA(e)}>
                                                    <TouchAppSharpIcon
                                                        sx={{ color: "#3876BF" }} />
                                                </IconButton>
                                            </Tooltip>
                                        </Box>
                                        : null
                                }
                            </Box>
                        </Box>
                        <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
                            <Box sx={{ mt: 4 }}>
                                <Checkbox
                                    color="primary"
                                    label="Correct answer"
                                    checked={status_b}
                                    onChange={(e) => { HandleStatus_b(e) }}
                                    disabled={writtenStatus === true ? true : false}
                                />
                            </Box>
                            <Box sx={{ flex: 1 }}>
                                <Typography sx={{ fontFamily: "sans-serif", fontWeight: "600" }}>Answer B</Typography>
                                <CssVarsProvider>
                                    <Textarea
                                        label="Outlined"
                                        placeholder="Answer: B"
                                        variant="outlined"
                                        size="md"
                                        value={answerB}
                                        minRows={1}
                                        maxRows={3}
                                        onChange={(e) => setAnswerB(e.target.value)}
                                        disabled={writtenStatus === true ? true : false}
                                    />
                                </CssVarsProvider>
                            </Box>
                            <Box sx={{ display: "flex", flexDirection: "row", flex: 1, mt: 2 }}>
                                <Tooltip title="Upload file">
                                    <IconButton variant="outlined" component="label">
                                        <UploadFileIcon style={{ color: "#4682A9", fontSize: 40, border: 1, borderRadius: 10 }} />
                                        <input
                                            id="file-input"
                                            type="file"
                                            accept=".jpg, .jpeg, .png, .pdf"
                                            style={{ display: 'none' }}
                                            onChange={handleFileB}
                                        />
                                    </IconButton>
                                </Tooltip>
                                {selectedFileB && showCloseIconB && (
                                    <Box sx={{ color: "#4682A9", mt: 2, display: "flex", flexDirection: "row" }}>
                                        <Box >{selectedFileB}</Box>
                                        <IconButton color="primary" aria-label="Close" onClick={(e) => handleRemoveFileB(e)}>
                                            <CloseIcon />
                                        </IconButton>
                                    </Box>
                                )}
                                {
                                    bflag === 1 ?
                                        <Box sx={{ mt: 1 }}>
                                            <Tooltip title="View file">
                                                <IconButton onClick={(e) => ShowFliesB(e)}>
                                                    <TouchAppSharpIcon
                                                        sx={{ color: "#3876BF" }} />
                                                </IconButton>
                                            </Tooltip>
                                        </Box>
                                        : null
                                }
                            </Box>

                        </Box>
                        <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
                            <Box sx={{ mt: 4 }}>
                                <Checkbox
                                    color="primary"
                                    label="Correct answer"
                                    checked={status_c}
                                    onChange={(e) => { HandleStatus_c(e) }}
                                    disabled={writtenStatus === true ? true : false}
                                />
                            </Box>
                            <Box sx={{ flex: 1 }}>
                                <Typography sx={{ fontFamily: "sans-serif", fontWeight: "600" }}>Answer C</Typography>
                                <CssVarsProvider>
                                    <Textarea
                                        label="Outlined"
                                        placeholder="Answer: C"
                                        variant="outlined"
                                        size="md"
                                        value={answerC}
                                        minRows={1}
                                        maxRows={3}
                                        onChange={(e) => setAnswerC(e.target.value)}
                                        disabled={writtenStatus === true ? true : false}

                                    />
                                </CssVarsProvider>
                            </Box>
                            <Box sx={{ display: "flex", flexDirection: "row", flex: 1, mt: 2 }}>
                                <Tooltip title="Upload file">
                                    <IconButton variant="outlined" component="label">
                                        <UploadFileIcon style={{ color: "#4682A9", fontSize: 40, border: 1, borderRadius: 10 }} />
                                        <input
                                            id="file-input"
                                            type="file"
                                            accept=".jpg, .jpeg, .png, .pdf"
                                            style={{ display: 'none' }}
                                            onChange={handleFileC}
                                        />
                                    </IconButton>
                                </Tooltip>
                                {selectedFileC && showCloseIconC && (
                                    <Box sx={{ color: "#4682A9", mt: 2, display: "flex", flexDirection: "row" }}>
                                        <Box >{selectedFileC}</Box>
                                        <IconButton color="primary" aria-label="Close" onClick={(e) => handleRemoveFileC(e)}>
                                            <CloseIcon />
                                        </IconButton>
                                    </Box>
                                )}
                                {
                                    cflag === 1 ?
                                        <Box sx={{ mt: 1 }}>
                                            <Tooltip title="View file">
                                                <IconButton onClick={(e) => ShowFliesC(e)}>
                                                    <TouchAppSharpIcon
                                                        sx={{ color: "#3876BF" }} />
                                                </IconButton>
                                            </Tooltip>
                                        </Box>
                                        : null
                                }
                            </Box>
                        </Box>
                        <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
                            <Box sx={{ mt: 4 }}>
                                <Checkbox
                                    color="primary"
                                    label="Correct answer"
                                    checked={status_d}
                                    onChange={(e) => { HandleStatus_d(e) }}
                                    disabled={writtenStatus === true ? true : false}
                                />
                            </Box>
                            <Box sx={{ flex: 1 }}>
                                <Typography sx={{ fontWeight: "bold" }}>Answer D</Typography>
                                <CssVarsProvider>
                                    <Textarea
                                        label="Outlined"
                                        placeholder="Answer: D"
                                        variant="outlined"
                                        size="md"
                                        value={answerD}
                                        minRows={1}
                                        maxRows={3}
                                        onChange={(e) => setAnswerD(e.target.value)}
                                        disabled={writtenStatus === true ? true : false}
                                    />
                                </CssVarsProvider>
                            </Box>
                            <Box sx={{ display: "flex", flexDirection: "row", flex: 1, mt: 2 }}>
                                <Tooltip title="Upload file">
                                    <IconButton variant="outlined" component="label">
                                        <UploadFileIcon style={{ color: "#4682A9", fontSize: 40, border: 1, borderRadius: 10 }} />
                                        <input
                                            id="file-input"
                                            type="file"
                                            accept=".jpg, .jpeg, .png, .pdf"
                                            style={{ display: 'none' }}
                                            onChange={handleFileD}
                                        />
                                    </IconButton>
                                </Tooltip>
                                {selectedFileD && showCloseIconD && (
                                    <Box sx={{ color: "#4682A9", mt: 2, display: "flex", flexDirection: "row" }}>
                                        <Box >{selectedFileD}</Box>
                                        <IconButton color="primary" aria-label="Close" onClick={(e) => handleRemoveFileD(e)}>
                                            <CloseIcon />
                                        </IconButton>
                                    </Box>
                                )}
                                {
                                    dflag === 1 ?
                                        <Box sx={{ mt: 1 }}>
                                            <Tooltip title="View file">
                                                <IconButton onClick={(e) => ShowFliesD(e)}>
                                                    <TouchAppSharpIcon
                                                        sx={{ color: "#3876BF" }} />
                                                </IconButton>
                                            </Tooltip>
                                        </Box>
                                        : null
                                }
                            </Box>
                        </Box>
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "row", gap: 1, mt: 2 }}>
                        <Box sx={{ mt: 4 }}>
                            <Checkbox
                                color="primary"
                                label="Hand Written"
                                checked={writtenStatus}
                                onChange={(e) => { HandleWrittenStatus(e) }}
                            />
                        </Box>
                        {writeFlag === 1 ?
                            <Box>
                                <Typography sx={{ fontFamily: "sans-serif", fontWeight: "600" }}>Hand Written Answer</Typography>
                                <CssVarsProvider>
                                    <Textarea
                                        label="Outlined"
                                        placeholder="Written Answer"
                                        variant="outlined"
                                        size="md"
                                        value={writtenAnswer}
                                        minRows={1}
                                        maxRows={3}
                                        onChange={(e) => setWrittenAnswer(e.target.value)}
                                        style={{ width: 800 }}
                                    />
                                </CssVarsProvider>
                            </Box>
                            : null}
                        <Box>
                            <Typography sx={{ fontFamily: "sans-serif", fontWeight: "600" }}>Mark</Typography>
                            <Input
                                type="number"
                                value={marks}
                                onChange={(e) => setMarks(e.target.value)}
                                slotProps={{
                                    input: {
                                        min: 1,
                                        max: 5
                                    },
                                }}
                            />
                        </Box>
                        <Tooltip title="Save">
                            <Box sx={{ mt: 3 }}>

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
                        </Tooltip>
                    </Box>
                </Paper>
                {view === 1 ? <ViewFileModal Reset={editReset} setUploads={setDisFile} uploads={disFile} view={view} setview={setview} setopen={setopen} open={open} /> : null}
                <Paper variant='outlined' sx={{ width: "100%", mt: 1 }}>
                    <CommonAgGrid
                        columnDefs={columnDef}
                        tableData={tableData}
                        sx={{
                            height: 290,
                            overflow: 'auto',
                            '::-webkit-scrollbar': { display: "none" }
                        }}
                        rowHeight={30}
                        headerHeight={30}
                    />
                </Paper>
            </Box >
        </Fragment >
    )
}
export default memo(QuestionMainPage) 
