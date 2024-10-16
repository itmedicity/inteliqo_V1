import { Button, Checkbox, Chip, Input, Sheet, Table } from '@mui/joy'
import { Box, Paper, IconButton, Typography, Tooltip } from '@mui/material'
import React, { Fragment, memo, useEffect, useMemo } from 'react'
import { ToastContainer } from 'react-toastify'
import SaveIcon from '@mui/icons-material/Save';
import { useState } from 'react'
import { useCallback } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc'
import { useDispatch, useSelector } from 'react-redux';
import _ from 'underscore';
import EditIcon from '@mui/icons-material/Edit';
import JoyInput from 'src/views/MuiComponents/JoyComponent/JoyInput';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import TouchAppSharpIcon from '@mui/icons-material/TouchAppSharp';
import CloseIcon from '@mui/icons-material/Close'
import { PUBLIC_NAS_FOLDER } from 'src/views/Constant/Static';
import { DeptSectnWiseTrainerNames } from 'src/redux/actions/Training.Action';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import TopicFiles from './TopicFiles';
import JoyDeptWiseTrainingNames from 'src/views/MuiComponents/JoyDeptWiseTrainingNames';
import JoyDeptSectWiseTrainers from 'src/views/MuiComponents/JoyComponent/JoyDeptSectWiseTrainers';

const TopicPage = () => {

    const dispatch = useDispatch()

    const [training_topic_name, setTraining_topic_name] = useState('');
    const [training_status, setTraining_status] = useState(false);
    const [tutorial_status, setTutorial_status] = useState(false);
    const [medical_status, setMedical_status] = useState(false);
    const [non_medical_status, set_Non_medical_status] = useState(false);
    const [pretest_status, setPretest_status] = useState(false);
    const [post_test_status, setPost_test_status] = useState(false);
    const [online_status, set_Online_status] = useState(false);
    const [offline_status, setOffline_status] = useState(false);
    const [both_status, setBoth_status] = useState(false);
    const [count, setCount] = useState(0);
    const [tableData, setTabledata] = useState([]);
    const [topic_slno, setTopic_slno] = useState(0);
    const [flag, setFlag] = useState(0);
    const [trainingname, setTrainingname] = useState(0);
    const [hours, setHours] = useState('');
    const [videos, SetVideos] = useState('');
    //file
    const [selectFile, setSelectFile] = useState([]);
    const [uploads, setUploads] = useState([]);
    const [open, setopen] = useState(false);
    const [editflag, SetEditFlag] = useState(0)
    const [video_time, SetVideo_time] = useState(0)
    const [trainers, setTrainers] = useState([])
    const [edit_trainers, setEdit_trainers] = useState(0);
    const [trainer_names, SetTrainerNames] = useState([]);

    const employeeState = useSelector((state) => state.getProfileData.ProfileData, _.isEqual);
    const employeeProfileDetl = useMemo(() => employeeState[0], [employeeState]);
    const { em_id, em_department, em_dept_section } = employeeProfileDetl;


    useEffect(() => {
        const obj = {
            em_department: em_department,
            em_dept_section: em_dept_section
        }
        // dispatch(TrainerNames())
        dispatch(DeptSectnWiseTrainerNames(obj))
    }, [dispatch, em_department, em_dept_section])

    //reset
    const reset = useCallback(() => {
        setTraining_topic_name('');
        setTraining_status(false);
        setTutorial_status(false);
        setMedical_status(false);
        set_Non_medical_status(false);
        setPretest_status(false);
        setPost_test_status(false);
        setTrainingname(0);
        setHours(0);
        set_Online_status(false)
        setOffline_status(false)
        setBoth_status(false)
        SetVideos('');
        setSelectFile([])
        setUploads([])
        SetVideo_time(0);
        setTrainers([])
        SetTrainerNames([])
    }, [])

    //postdata
    const postdata = useMemo(() => {
        return {
            dept_status: 1,
            training_dept: em_department,
            subtype_no: 0,
            training_topic_name: training_topic_name,
            training_name: trainingname,
            training_status: training_status === true ? 1 : 0,
            tutorial_status: tutorial_status === true ? 1 : 0,
            medical_status: medical_status === true ? 1 : 0,
            non_medical_status: non_medical_status === true ? 1 : 0,
            pretest_status: pretest_status === true ? 1 : 0,
            post_test_status: post_test_status === true ? 1 : 0,
            online_status: online_status === true ? 1 : 0,
            offline_status: offline_status === true ? 1 : 0,
            both_status: both_status === true ? 1 : 0,
            create_user: em_id,
            hours: hours,
            video_link: videos,
            video_time: video_time,
            trainers: trainers
        }
    }, [em_department, videos, trainers, video_time, training_topic_name, hours, trainingname, training_status, tutorial_status, medical_status, non_medical_status, pretest_status, post_test_status, online_status, offline_status, both_status, em_id])

    //patchdata
    const patchdata = useMemo(() => {
        return {
            dept_status: 1,
            training_dept: em_department,
            subtype_no: 0,
            training_topic_name: training_topic_name,
            training_name: trainingname,
            training_status: training_status === true ? 1 : 0,
            tutorial_status: tutorial_status === true ? 1 : 0,
            medical_status: medical_status === true ? 1 : 0,
            non_medical_status: non_medical_status === true ? 1 : 0,
            pretest_status: pretest_status === true ? 1 : 0,
            post_test_status: post_test_status === true ? 1 : 0,
            online_status: online_status === true ? 1 : 0,
            offline_status: offline_status === true ? 1 : 0,
            both_status: both_status === true ? 1 : 0,
            edit_user: em_id,
            topic_slno: topic_slno,
            hours: hours,
            video_link: videos,
            video_time: video_time,
            trainers: trainers
        }
    }, [em_department, videos, trainers, video_time, training_topic_name, hours, trainingname, training_status, tutorial_status, medical_status, non_medical_status, pretest_status, post_test_status, em_id, topic_slno, online_status, offline_status, both_status])

    //view
    useEffect(() => {
        const getData = async () => {
            const result = await axioslogin.get(`/TrainingTopic/topic_by_dept/${em_department}`)
            const { success, data } = result.data;
            if (success === 2) {
                const viewData = data?.map((val) => {
                    const obj = {
                        topic_slno: val.topic_slno,
                        dept_status: val.dept_status,
                        dept_id: val.dept_id,
                        dept_name: val.dept_name,
                        dept: val.dept_name,
                        training_topic_name: val.training_topic_name,
                        name_slno: val.name_slno,
                        hours: val.hours,
                        training_name: val.training_name,
                        training_status: val.training_status,
                        tutorial_status: val.tutorial_status,
                        medical_status: val.medical_status,
                        non_medical_status: val.non_medical_status,
                        pretest_status: val.pretest_status,
                        post_test_status: val.post_test_status,
                        online_status: val.online_status,
                        offline_status: val.offline_status,
                        both_status: val.both_status,
                        video_link: val.video_link,
                        video_time: val.video_time,
                        upload_status: val.upload_status,
                        trainerss: val.trainers,
                        trainers_name: val.trainers_name
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

    useEffect(() => {
        if (uploads !== null) {
            SetEditFlag(1)
        }
        else {
            SetEditFlag(0)
        }
    }, [SetEditFlag, uploads])


    const getDataTable = useCallback(async (rowData) => {
        setFlag(1);
        const {
            topic_slno, video_link, trainers_name, video_time, hours, training_topic_name, name_slno, training_status, tutorial_status, medical_status, non_medical_status, pretest_status, post_test_status, online_status, offline_status, both_status, trainerss
        } = rowData;
        setTraining_topic_name(training_topic_name);
        setTraining_status(training_status === 1 ? true : false);
        setTutorial_status(tutorial_status === 1 ? true : false);
        setMedical_status(medical_status === 1 ? true : false);
        set_Non_medical_status(non_medical_status === 1 ? true : false);
        setPretest_status(pretest_status === 1 ? true : false);
        setPost_test_status(post_test_status === 1 ? true : false);
        setTopic_slno(topic_slno)
        setTrainingname(name_slno)
        setHours(hours)
        set_Online_status(online_status === 1 ? true : false)
        setOffline_status(offline_status === 1 ? true : false)
        setBoth_status(both_status === 1 ? true : false)
        SetVideos(video_link);
        SetVideo_time(video_time);
        setUploads([])
        SetTrainerNames(trainers_name)
        setTrainers(trainerss)

        // View uploads
        const postData = {
            topic_slno: topic_slno,
        };

        try {
            const response = await axioslogin.post('/Training_topic_uploads/selectuploads', postData);
            const { success, data } = response.data;

            if (success === 1) {
                const fileUrls = data.map((filename) => {
                    return `${PUBLIC_NAS_FOLDER}/TrainingTopicUploads/${topic_slno}/${filename}`;
                });

                setUploads(fileUrls);
            } else {
                infoNofity("No File uploads");
            }
        } catch (error) {
            console.error("Error fetching uploads:", error);
            infoNofity("Failed to fetch file uploads");
        }
    }, [setUploads]);




    const HandleTraining = useCallback((e) => {
        if (e.target.checked === true) {
            setTraining_status(e.target.checked)
            setTutorial_status(false);
        }
        else {
            setTraining_status(false)
            setTutorial_status(false);
        }
    }, [setTraining_status, setTutorial_status])

    const HandleTutorial = useCallback((e) => {
        if (e.target.checked === true) {
            setTutorial_status(e.target.checked)
            setTraining_status(false);
            setOffline_status(false)
        }
        else {
            setTutorial_status(false);
            setTraining_status(false)
            setOffline_status(false)
        }
    }, [setTraining_status, setTutorial_status, setOffline_status])

    const handleMedical = useCallback((e) => {
        if (e.target.checked === true) {
            setMedical_status(e.target.checked)
            set_Non_medical_status(false);
        }
        else {
            setMedical_status(false);
            set_Non_medical_status(false)
        }
    }, [setMedical_status, set_Non_medical_status])

    const handleNonMedical = useCallback((e) => {
        if (e.target.checked === true) {
            set_Non_medical_status(e.target.checked)
            setMedical_status(false);
        }
        else {
            set_Non_medical_status(false);
            setMedical_status(false)
        }
    }, [setMedical_status, set_Non_medical_status])

    const HandleOnline = useCallback((e) => {
        if (e.target.checked === true) {
            set_Online_status(e.target.checked)
            setOffline_status(false);
            setBoth_status(false);
        }
        else {
            set_Online_status(false)
            setOffline_status(false);
            setBoth_status(false);
        }
    }, [set_Online_status, setOffline_status, setBoth_status])


    const HandleOffline = useCallback((e) => {
        if (e.target.checked === true) {
            setOffline_status(e.target.checked)
            set_Online_status(false);
            setBoth_status(false);
            setTutorial_status(false);
        }
        else {
            set_Online_status(false)
            setOffline_status(false);
            setBoth_status(false);
            setTutorial_status(false);
        }
    }, [set_Online_status, setOffline_status, setBoth_status])

    const HandleBoth = useCallback((e) => {
        if (e.target.checked === true) {
            setBoth_status(e.target.checked)
            setOffline_status(false);
            set_Online_status(false);
        }
        else {
            set_Online_status(false)
            setOffline_status(false);
            setBoth_status(false);
        }
    }, [set_Online_status, setOffline_status, setBoth_status])

    const uploadFile = useCallback(async (e) => {
        const newFiles = [...selectFile]
        newFiles.push(e.target.files[0])
        setSelectFile(newFiles)
    }, [selectFile, setSelectFile])

    const handleRemoveFile = (index) => {
        setSelectFile((prevFiles) => {
            const updatedFiles = [...prevFiles];
            updatedFiles.splice(index, 1); // Remove the file at the specified index
            return updatedFiles;
        });
    };

    ////upload submit//////
    const submitTrainingTopic = useCallback(() => {
        const InsertData = async (postdata) => {
            try {
                const result = await axioslogin.post('/TrainingTopic/insert', postdata)
                return result.data;
            } catch (error) {
                console.error("Error while inserting data:", error);
                return { success: 0, message: "An error occurred while inserting data." };
            }
        };
        //edit
        const EditData = async (patchdata) => {
            const result = await axioslogin.patch('/TrainingTopic/update', patchdata)
            const { message, success } = result.data
            if (success === 1) {
                reset();
                setCount(count + 1);
                setTopic_slno(0);
                succesNofity(message)
                setFlag(0)
            }
            else {
                warningNofity(message)
                reset();
            }
        }
        //image upload
        const handleUpload = async (insetId) => {
            try {
                const formData = new FormData();
                formData.append('insertID', insetId);

                const compressedFilesPromises = selectFile?.map((file) => {
                    return formData.append('files', file, file.name);
                });
                await Promise.all(compressedFilesPromises);
                const uploadResult = await axioslogin.post('/Training_topic_uploads/uploadtrainingfiles', formData, {
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
            if (training_topic_name !== '' && trainingname !== 0 && trainers?.length !== 0 && hours !== '') {
                InsertData(postdata)
                    .then((val) => {
                        const { insetId, message, success } = val;
                        if (success === 1) {
                            if (selectFile.length !== 0) {
                                handleUpload(insetId);
                            } else {
                                succesNofity("inserted successfully");
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
            } else {
                warningNofity("Enter All the Feilds Before Submit")
            }

        }
    }, [postdata, patchdata, reset, flag, selectFile, setCount, count, training_topic_name, trainingname, trainers, hours]);


    const ShowFlies = useCallback(() => {
        setopen(true);
    }, [])

    const EditTrainers = useCallback(() => {
        setEdit_trainers(1)
    }, [setEdit_trainers])

    return (
        <Fragment>
            <ToastContainer />
            <Box sx={{ width: "100%", display: "flex", flexDirection: "column" }}>
                <Paper sx={{ display: "flex", flexDirection: "column" }}>
                    <Box sx={{ display: "flex", flexDirection: "row", p: 1, gap: 1, flexWrap: "wrap" }}>
                        <Box sx={{ flex: 1 }}>
                            {/* <SelectTrainingName value={trainingname} setValue={setTrainingname} /> */}
                            <JoyDeptWiseTrainingNames value={trainingname} setValue={setTrainingname} dept={em_department} />
                        </Box>
                        <Box sx={{ flex: 1 }}>
                            <Input
                                value={training_topic_name}
                                placeholder="Enter the Topic Name"
                                onChange={(e) => setTraining_topic_name(e.target.value)}
                            />
                        </Box>
                        {edit_trainers === 1 ?
                            <Tooltip title="Add Trainers">
                                <Box sx={{ px: 0.3, flex: 1 }} >
                                    <JoyDeptSectWiseTrainers value={trainers} setValue={setTrainers} />
                                </Box>
                            </Tooltip>
                            : null}

                        {flag === 1 && edit_trainers === 0 ?
                            <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
                                <JoyInput
                                    type="text"
                                    value={trainer_names}
                                    disabled />
                                <Tooltip title="Add new trainers">
                                    <Button>
                                        <PublishedWithChangesIcon onClick={EditTrainers} />
                                    </Button>
                                </Tooltip>
                            </Box>
                            :
                            null
                        }
                        {flag === 0 && edit_trainers === 0 ?
                            <Tooltip title="Add Trainers">
                                <Box sx={{ px: 0.3, flex: 1 }} >
                                    <JoyDeptSectWiseTrainers value={trainers} setValue={setTrainers} />
                                    {/* <JoyTrainerMultipleSelect value={trainers} setValue={setTrainers} /> */}
                                </Box>
                            </Tooltip>
                            : null}

                        <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
                            <Typography sx={{ mt: 1 }}>Training Hours :</Typography>
                            <Input
                                type="number"
                                value={hours}
                                onChange={(e) => setHours(e.target.value)}
                                slotProps={{
                                    input: {
                                        min: 1,
                                        max: 5
                                    },
                                }}
                            />
                        </Box>
                    </Box>

                    <Box sx={{ display: "flex", flexDirection: "row", p: 1, width: "70%", justifyContent: "space-between", flexWrap: "wrap" }}>
                        <Box>
                            <Checkbox
                                name="status"
                                color="primary"
                                checked={training_status}
                                className="ml-1"
                                onChange={(e) => HandleTraining(e)}
                                label="Training"
                            />
                        </Box>
                        <Box>
                            <Checkbox
                                name="status"
                                color="primary"
                                checked={tutorial_status}
                                className="ml-1"
                                onChange={(e) => HandleTutorial(e)}
                                label="Tutorial"
                            />

                        </Box>
                        <Box>
                            <Checkbox
                                name="status"
                                color="primary"
                                checked={medical_status}
                                className="ml-1"
                                onChange={(e) => handleMedical(e)}
                                label="Medical"
                            />
                        </Box>
                        <Box>
                            <Checkbox
                                name="status"
                                color="primary"
                                checked={non_medical_status}
                                className="ml-1"
                                onChange={(e) => handleNonMedical(e)}
                                label="Non Medical"
                            />
                        </Box>
                        <Box>
                            <Checkbox
                                name="status"
                                color="primary"
                                checked={pretest_status}
                                className="ml-1"
                                onChange={(e) => setPretest_status(e.target.checked)}
                                label="Pre-Test"
                            />
                        </Box>
                        <Box>
                            <Checkbox
                                name="status"
                                color="primary"
                                checked={post_test_status}
                                className="ml-1"
                                onChange={(e) => setPost_test_status(e.target.checked)}
                                label="Post-Test"
                            />
                        </Box>
                        <Box>
                            <Checkbox
                                name="status"
                                color="primary"
                                checked={online_status}
                                className="ml-1"
                                onChange={(e) => HandleOnline(e)}
                                label="Online"
                            />
                        </Box>
                        <Box>
                            <Checkbox
                                name="status"
                                color="primary"
                                checked={offline_status}
                                className="ml-1"
                                onChange={(e) => HandleOffline(e)}
                                label="Offline"
                            />
                        </Box>
                        <Box>
                            <Checkbox
                                name="status"
                                color="primary"
                                checked={both_status}
                                className="ml-1"
                                onChange={(e) => HandleBoth(e)}
                                label="Both"
                            />
                        </Box>
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
                        {
                            both_status === true || online_status === true ?
                                <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
                                    <Box sx={{ p: 1, mt: -1 }}>
                                        <Input
                                            type='text'
                                            value={videos}
                                            placeholder="Enter Video Link"
                                            onChange={(e) => SetVideos(e.target.value)}
                                        />
                                    </Box>
                                    <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
                                        <Box>
                                            <Typography sx={{ mt: 1 }}>Video Time :</Typography>
                                        </Box>
                                        <Box>
                                            <Input
                                                type="number"
                                                value={video_time}
                                                onChange={(e) => SetVideo_time(e.target.value)}
                                            />
                                        </Box>
                                        <Box>
                                            <Typography sx={{ mt: 1 }}>Minutes</Typography>
                                        </Box>
                                    </Box>
                                    <Box>
                                        {
                                            both_status === true || online_status === true && flag === 0 ?
                                                <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
                                                    <Box>
                                                        <Tooltip title="Upload file">
                                                            <IconButton variant="outlined" component="label">
                                                                <UploadFileIcon style={{ color: "#4682A9", fontSize: 30, border: 1, borderRadius: 10 }} />
                                                                <Input
                                                                    id="file-input"
                                                                    type="file"
                                                                    accept=".jpg, .jpeg, .png, .pdf"
                                                                    style={{ display: 'none' }}
                                                                    onChange={uploadFile}
                                                                />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </Box>
                                                    <Box>

                                                        {
                                                            selectFile && selectFile.map((val, index) => {
                                                                return <Box sx={{ display: "flex", flexDirection: "row", ml: 1, pt: 1 }}
                                                                    key={index} >
                                                                    <Box >{val.name}</Box>
                                                                    <Box sx={{ ml: .3 }}><CloseIcon sx={{ height: '18px', width: '20px', cursor: 'pointer' }}
                                                                        onClick={() => handleRemoveFile(index)}
                                                                    /></Box>

                                                                </Box>
                                                            }
                                                            )}
                                                    </Box>
                                                </Box>
                                                : null
                                        }
                                    </Box>
                                </Box>
                                : null
                        }

                        {
                            flag === 1 && editflag === 1 ?
                                <Box sx={{ mt: 1 }}>
                                    <Tooltip title="View file">
                                        <IconButton onClick={(e) => ShowFlies(e)}>
                                            <TouchAppSharpIcon
                                                sx={{ color: "#3876BF" }} />
                                        </IconButton>
                                    </Tooltip>
                                </Box>
                                : null
                        }
                        <Box sx={{ p: 1 }}>
                            <Tooltip title="Save">
                                <Button
                                    variant='outlined'
                                    onClick={submitTrainingTopic}>
                                    <SaveIcon />
                                </Button>
                            </Tooltip>
                        </Box>
                    </Box>
                </Paper>
                <TopicFiles setopen={setopen} open={open} uploads={uploads} reset={reset} />

                <Sheet sx={{
                    overflow: 'auto',
                    '::-webkit-scrollbar': { display: "none" }, height: 450,
                    width: "100%"
                }}>
                    <Table borderAxis='both' stickyHeader>
                        <thead style={{ backgroundColor: "blue" }}>
                            <tr>
                                <th style={{ backgroundColor: "#638889", color: "white", width: '5%', p: 1, textAlign: 'center' }}>Sl.No</th>
                                <th style={{ backgroundColor: "#638889", color: "white", width: "10%", textAlign: 'center' }}>Topic Name</th>
                                <th style={{ backgroundColor: "#638889", color: "white", width: "10%", textAlign: 'center' }}>TrainingName</th>
                                <th style={{ backgroundColor: "#638889", color: "white", width: "10%", textAlign: 'center' }}>Trainers</th>
                                <th style={{ backgroundColor: "#638889", color: "white", textAlign: "center", width: "5%" }}>Hours</th>
                                <th style={{ backgroundColor: "#638889", color: "white", textAlign: "center", width: "5%" }}>Training</th>
                                <th style={{ backgroundColor: "#638889", color: "white", textAlign: "center", width: "5%" }}>Tutorial</th>
                                <th style={{ backgroundColor: "#638889", color: "white", textAlign: "center", width: "5%" }}>Medical</th>
                                <th style={{ backgroundColor: "#638889", color: "white", textAlign: "center", width: "5%" }}>Non-Med</th>
                                <th style={{ backgroundColor: "#638889", color: "white", textAlign: "center", width: "5%" }}>Pre</th>
                                <th style={{ backgroundColor: "#638889", color: "white", textAlign: "center", width: "5%" }}>Post</th>
                                <th style={{ backgroundColor: "#638889", color: "white", textAlign: "center", width: "5%" }}>Online</th>
                                <th style={{ backgroundColor: "#638889", color: "white", textAlign: "center", width: "5%" }}>Offline</th>
                                <th style={{ backgroundColor: "#638889", color: "white", textAlign: "center", width: "5%" }}>Both</th>
                                <th style={{ backgroundColor: "#638889", color: "white", textAlign: "center", width: "5%" }}>Pdf</th>
                                <th style={{ backgroundColor: "#638889", color: "white", textAlign: "center", width: "5%" }}>Video</th>
                                <th style={{ backgroundColor: "#638889", color: "white", textAlign: "center", width: "5%" }}>Vdo Time</th>
                                <th style={{ backgroundColor: "#638889", color: "white", textAlign: "center", width: "5%" }}>Edit</th>
                            </tr>
                        </thead>

                        <tbody >
                            {tableData?.map((row, ndx) => (
                                <tr key={ndx} >
                                    <td style={{ textAlign: "center" }}>{ndx + 1}</td>
                                    <td style={{ textTransform: "capitalize", flex: 1 }}>
                                        {row?.training_topic_name?.toLowerCase()}</td>
                                    <td>{row?.training_name?.toLowerCase()}</td>
                                    <td style={{ textTransform: "capitalize" }}>
                                        {row?.trainers_name}</td>
                                    <td style={{ textAlign: "center" }}>{row?.hours}</td>
                                    <td style={{ textAlign: "center" }}>
                                        <Chip sx={{ backgroundColor: row?.training_status === 0 ? "#8E3E63" : "#006769", color: "white" }}>
                                            {row?.training_status === 0 ? "No" : "Yes"}</Chip>
                                    </td>
                                    <td style={{ textAlign: "center" }}>
                                        <Chip sx={{ backgroundColor: row?.tutorial_status === 0 ? "#8E3E63" : "#006769", color: "white" }}>
                                            {row?.tutorial_status === 0 ? "No" : "Yes"}
                                        </Chip>
                                    </td>
                                    <td style={{ textAlign: "center" }}>
                                        <Chip sx={{ backgroundColor: row?.medical_status === 0 ? "#8E3E63" : "#006769", color: "white" }}>
                                            {row?.medical_status === 0 ? "No" : "Yes"}
                                        </Chip>
                                    </td>
                                    <td style={{ textAlign: "center" }}>
                                        <Chip sx={{ backgroundColor: row?.non_medical_status === 0 ? "#8E3E63" : "#006769", color: "white" }}>
                                            {row?.non_medical_status === 0 ? "No" : "Yes"}</Chip>
                                    </td>
                                    <td style={{ textAlign: "center" }}>
                                        <Chip sx={{ backgroundColor: row?.pretest_status === 0 ? "#8E3E63" : "#006769", color: "white" }}>
                                            {row?.pretest_status === 0 ? "No" : "Yes"}
                                        </Chip>
                                    </td>
                                    <td style={{ textAlign: "center" }}>
                                        <Chip sx={{ backgroundColor: row?.post_test_status === 0 ? "#8E3E63" : "#006769", color: "white" }}>
                                            {row?.post_test_status === 0 ? "No" : "Yes"}
                                        </Chip>
                                    </td>


                                    <td style={{ textAlign: "center" }}>
                                        <Chip sx={{ backgroundColor: row?.online_status === 0 ? "#8E3E63" : "#006769", color: "white" }}>
                                            {row?.online_status === 0 ? "No" : "Yes"}</Chip>
                                    </td>
                                    <td style={{ textAlign: "center" }}>
                                        <Chip sx={{ backgroundColor: row?.offline_status === 0 ? "#8E3E63" : "#006769", color: "white" }}>
                                            {row?.offline_status === 0 ? "No" : "Yes"}
                                        </Chip>
                                    </td>
                                    <td style={{ textAlign: "center" }}>
                                        <Chip sx={{ backgroundColor: row?.both_status === 0 ? "#8E3E63" : "#006769", color: "white" }}>
                                            {row?.both_status === 0 ? "No" : "Yes"}
                                        </Chip>
                                    </td>
                                    <td style={{ textAlign: "center" }}>
                                        <Chip sx={{ backgroundColor: row.upload_status === 0 ? "#8E3E63" : "#006769", color: "white" }}>
                                            {row?.upload_status === 0 ? "No" : "Yes"}
                                        </Chip>
                                    </td>
                                    <td style={{ textAlign: "center" }}>{row?.video_link === '' ? "Nill" : row?.video_link}</td>
                                    <td style={{ textAlign: "center" }}>{row?.video_time}</td>
                                    <td>
                                        <IconButton sx={{ paddingY: 0.5 }} onClick={() => getDataTable(row)}>
                                            <EditIcon sx={{ color: "#640D6B" }} />
                                        </IconButton>
                                    </td>
                                </tr>
                            ))}

                        </tbody>

                    </Table>
                </Sheet>
            </Box >
        </Fragment >
    )
}

export default memo(TopicPage) 
