import React, { Fragment, memo, useMemo } from 'react'
import { useCallback } from 'react';
import { Typography, Box, Modal, ModalDialog, Sheet, Table } from '@mui/joy';
import { useState } from 'react';
import { useEffect } from 'react';
import moment from 'moment';
import ModalClose from '@mui/joy/ModalClose';
import { Paper } from '@mui/material';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-material.css'
import { Tooltip } from '@mui/material';
import { Button, Checkbox, CssVarsProvider, Input, } from '@mui/joy';
import JoyDepartment from 'src/views/MuiComponents/JoyComponent/JoyDepartment';
import { setDepartment } from 'src/redux/actions/Department.action'
import { useDispatch, useSelector } from 'react-redux'
import _ from 'underscore'
import JoyCheckbox from 'src/views/MuiComponents/JoyComponent/JoyCheckbox'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { warningNofity } from 'src/views/CommonCode/Commonfunc'
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { axioslogin } from 'src/views/Axios/Axios';
import ViewNEditPage from '../InductionTraining/ViewNEditPage';
import AddInductionTopics from '../InductionTraining/AddInductionTopics';
import { getJoineesData } from './TnDViewComponents/TnDFunctions';

const SamplePage = ({ openmodal, setopenmodal }) => {

    const dispatch = useDispatch()

    const [dept, setDept] = useState(0)
    const [fromdate, Setfromdate] = useState(new Date())
    const [todate, Settodate] = useState(new Date())
    const [tabledata, setTableData] = useState([])
    const [empselect, SetEmpSelect] = useState([])
    const [type, setType] = useState(0)
    const [checkAll, SetCheckAll] = useState(false)
    const [datas, setdatas] = useState([])
    const [open, setOpen] = useState(false)
    const [count, setcount] = useState(0)
    const [viewModal, setviewModal] = useState(false)
    const [msg, setmsg] = useState(0)

    const reset = useCallback(() => {
        setDept(0)
        Setfromdate('')
        Settodate('')
        SetEmpSelect([])
        setType(0)
        setdatas([])
        SetCheckAll(false)
        setTableData([])
        setmsg(0)
        setopenmodal(false)
    }, [setDept, Setfromdate, Settodate, SetEmpSelect, setType, setdatas, SetCheckAll, setTableData, setmsg, setopenmodal])

    useEffect(() => {
        dispatch(setDepartment());
    }, [dispatch])

    const newjoineesData = useSelector((state) => getJoineesData(state))
    const newjoinees = useMemo(() => newjoineesData, [newjoineesData])

    // useEffect(() => {
    //     if (tabledata.length !== 0 && checkAll === false) {
    //         const mapArry = tabledata?.map((item) => {
    //             const obj = {
    //                 em_no: item.em_no,
    //                 datefmt: moment(item.joining_date).format("YYYY-MM-DD"),
    //                 em_name: item.em_name,
    //                 sect_name: item.sect_name,
    //                 desg_name: item.desg_name,
    //                 "inValue": false
    //             }
    //             return {
    //                 ...item,
    //                 ...obj
    //             }
    //         })
    //         setdatas(mapArry)
    //     }
    //     //Select all emp
    //     else if (checkAll === true) {
    //         const mapArry = tabledata?.map((item) => {
    //             const obj = {
    //                 em_no: item.em_no,
    //                 datefmt: moment(item.joining_date).format("YYYY-MM-DD"),
    //                 em_name: item.em_name,
    //                 sect_name: item.sect_name,
    //                 desg_name: item.desg_name,
    //                 "inValue": true
    //             }
    //             return {
    //                 ...item,
    //                 ...obj
    //             }
    //         })
    //         setdatas(mapArry)
    //     }
    //     else {
    //         setdatas([])
    //     }
    // }, [checkAll, tabledata])


    const DisplayData = (checkAll, tabledata) => {
        const mapArry = tabledata.map((item) => {
            const obj = {
                em_no: item.em_no,
                datefmt: moment(item.joining_date).format("YYYY-MM-DD"),
                em_name: item.em_name,
                sect_name: item.sect_name,
                desg_name: item.desg_name,
                inValue: checkAll // Set inValue based on checkAll
            };
            return {
                ...item,
                ...obj
            };
        });

        return mapArry;
    };

    const showData = DisplayData(checkAll, tabledata)
    setdatas(showData)

    const HandleCheckbox = useCallback((e, row) => {
        let arr = datas?.map((item) => item.em_id === row.em_id ? { ...item, "em_no": item.em_no, "datefmt": item.datefmt, "em_name": item.em_name, "sect_name": item.sect_name, "desg_name": item.desg_name, inValue: e } : item)
        setdatas([...arr]);
    }, [datas])

    useEffect(() => {
        const filterarray = datas?.filter((val) => {
            return val.inValue === true
        })
        SetEmpSelect(filterarray);
    }, [datas])

    const SearchBtn = useCallback(async () => {

        const obj = {
            fromdate: moment(fromdate).format("YYYY-MM-DD HH:mm:ss"),
            todate: moment(todate).format("YYYY-MM-DD HH:mm:ss"),
            dept: dept
        }
        if (dept !== 0) {
            const result = await axioslogin.post(`/InductionTraining/getDeptWiseEmployee/List`, obj)
            const { data, success } = result.data
            if (success === 2) {
                setTableData(data)
            } else {
                setTableData([])
            }
        }
        else {
            const result = await axioslogin.post(`/InductionTraining/getEmps`, obj)
            const { data, success } = result.data
            if (success === 2) {
                setTableData(data)
            } else {
                setTableData([])
            }
        }
        //mapArr
        // if (tabledata.length !== 0 && checkAll === false) {
        //     const mapArry = tabledata?.map((item) => {
        //         const obj = {
        //             em_no: item.em_no,
        //             datefmt: moment(item.joining_date).format("YYYY-MM-DD"),
        //             em_name: item.em_name,
        //             sect_name: item.sect_name,
        //             desg_name: item.desg_name,
        //             "inValue": false
        //         }
        //         return {
        //             ...item,
        //             ...obj
        //         }
        //     })
        //     setdatas(mapArry)
        // }
        // //Select all emp
        // else if (checkAll === true) {
        //     const mapArry = tabledata?.map((item) => {
        //         const obj = {
        //             em_no: item.em_no,
        //             datefmt: moment(item.joining_date).format("YYYY-MM-DD"),
        //             em_name: item.em_name,
        //             sect_name: item.sect_name,
        //             desg_name: item.desg_name,
        //             "inValue": true
        //         }
        //         return {
        //             ...item,
        //             ...obj
        //         }
        //     })
        //     setdatas(mapArry)
        // }
        // else {
        //     setdatas([])
        // }
    }, [fromdate, dept, todate]);


    const NextModal = useCallback(() => {
        if (fromdate !== '' && todate !== '') {
            setOpen(true)
        }
        else {
            warningNofity("Please Enter From & To date")
        }
    }, [setOpen, fromdate, todate])

    //open view and edit page
    const ViewAndEdit = useCallback(() => {
        setviewModal(true)
    }, [setviewModal])

    const Handleclose = useCallback((e) => {
        setopenmodal(false)
    }, [setopenmodal])

    return (
        <Fragment>
            {viewModal === true ? <ViewNEditPage setopenmodal={setopenmodal} setviewModal={setviewModal} viewModal={viewModal} count={count} setcount={setcount} />
                : <Box>
                    {open === true ? <AddInductionTopics newjoinees={newjoinees} open={open} empselect={empselect} setOpen={setOpen}
                        type={type} setType={setType} reset={reset} count={count} setcount={setcount} msg={msg} setmsg={setmsg}
                    /> :
                        <Modal
                            aria-labelledby="modal-title"
                            aria-describedby="modal-desc"
                            open={openmodal}
                            onClose={Handleclose}
                            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                        >
                            <ModalDialog size="lg"  >
                                <ModalClose
                                    variant="outlined"
                                    sx={{
                                        top: 'calc(-1/4 * var(--IconButton-size))',
                                        right: 'calc(-1/4 * var(--IconButton-size))',
                                        boxShadow: '0 2px 12px 0 rgba(0 0 0 / 0.2)',
                                        borderRadius: '50%',
                                        bgcolor: 'background.body',
                                    }}
                                />
                                <Box sx={{ p: 1 }}>
                                    <Paper elevation={0} sx={{ p: 1 }}>
                                        <Typography
                                            fontSize="xl2"
                                            lineHeight={1}
                                            startDecorator={
                                                <PendingActionsIcon sx={{ color: 'green' }}
                                                />
                                            }
                                            sx={{ display: 'flex', alignItems: 'flex-start', mr: 2, }}
                                        >
                                            Pending & Schedule
                                        </Typography>



                                        {/* <Box varient="outlined" sx={{ p: 1, width: "100%", height: screenInnerHeight - 120 }}> */}
                                        <Paper elevation={0} sx={{ backgroundColor: "#EEEEEE", p: 2, mt: 1 }}>
                                            <Box sx={{ display: "flex", flexDirection: "row", gap: 1, p: 0.3, flexWrap: "wrap" }}>
                                                <Box sx={{ flex: 1, mt: 1, display: "flex", flexDirection: "row", gap: 0.5 }} >
                                                    <Typography sx={{ mt: 1 }}>From:</Typography>
                                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                        < DatePicker
                                                            views={['day']}
                                                            value={fromdate}
                                                            size="small"
                                                            inputFormat="dd-MM-yyyy"
                                                            onChange={(e) => {
                                                                Setfromdate(moment(e).format("YYYY-MM-DD HH:mm:ss"));
                                                            }}
                                                            renderInput={({ inputRef, inputProps, InputProps }) => (
                                                                <Box sx={{ display: 'flex', alignItems: 'center', }}>
                                                                    <CssVarsProvider>
                                                                        <Input ref={inputRef} {...inputProps} disabled={true} />
                                                                    </CssVarsProvider>
                                                                    {InputProps?.endAdornment}
                                                                </Box>
                                                            )}
                                                        />
                                                    </LocalizationProvider>
                                                </Box>
                                                <Box sx={{ flex: 1, mt: 1, display: "flex", flexDirection: "row", gap: 0.5 }} >
                                                    <Typography sx={{ mt: 1 }}>To:</Typography>
                                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                        < DatePicker
                                                            views={['day']}
                                                            value={todate}
                                                            size="small"
                                                            inputFormat="dd-MM-yyyy"
                                                            onChange={(e) => {
                                                                Settodate(moment(e).format("YYYY-MM-DD HH:mm:ss"));
                                                            }}
                                                            renderInput={({ inputRef, inputProps, InputProps }) => (
                                                                <Box sx={{ display: 'flex', alignItems: 'center', }}>
                                                                    <CssVarsProvider>
                                                                        <Input ref={inputRef} {...inputProps} disabled={true} />
                                                                    </CssVarsProvider>
                                                                    {InputProps?.endAdornment}
                                                                </Box>
                                                            )}
                                                        />
                                                    </LocalizationProvider>
                                                </Box>
                                                <Box sx={{ flex: 1, mt: 1, }} >

                                                    <JoyDepartment sx={{ p: 1 }} deptValue={dept} getDept={setDept} />
                                                </Box>
                                                <Tooltip title="Search">
                                                    <Box sx={{
                                                        display: 'flex',
                                                        justifyContent: 'flex-start',
                                                        mt: 1
                                                    }} >
                                                        <CssVarsProvider>
                                                            <Box>
                                                                <Button aria-label="search" variant='outlined'
                                                                    onClick={SearchBtn}
                                                                >
                                                                    <SearchIcon />
                                                                </Button>
                                                            </Box>
                                                        </CssVarsProvider>
                                                    </Box>
                                                </Tooltip>
                                                <Tooltip title="Add More">
                                                    <Box sx={{
                                                        display: 'flex',
                                                        justifyContent: 'flex-start',
                                                    }} >
                                                        <CssVarsProvider>
                                                            <Box sx={{ mt: 1 }} >
                                                                <Button aria-label="next"
                                                                    onClick={NextModal}
                                                                >
                                                                    <AddCircleOutlineIcon />
                                                                </Button>
                                                            </Box>
                                                        </CssVarsProvider>
                                                    </Box>
                                                </Tooltip>
                                            </Box>
                                        </Paper>
                                        <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", flexWrap: "wrap" }}>
                                            <Box sx={{ p: 1, mt: 1 }}>
                                                <JoyCheckbox
                                                    label="Select All"
                                                    checked={checkAll}
                                                    onchange={(e) => SetCheckAll(e.target.checked)}
                                                    name="check_all"
                                                />
                                            </Box>
                                            <Tooltip title="View & Edit">
                                                <Box sx={{ p: 1, mt: 1 }}>
                                                    <Box sx={{}} >
                                                        <Button aria-label="View & Edit" variant='outlined'
                                                            onClick={ViewAndEdit}
                                                        >
                                                            <EditIcon />
                                                        </Button>
                                                    </Box>
                                                </Box>
                                            </Tooltip>
                                        </Box>
                                        {/* <Paper variant="outlined"> */}
                                        {datas?.length !== 0 ?
                                            <Sheet sx={{
                                                mt: 3,
                                                overflow: 'auto',
                                                '::-webkit-scrollbar': { display: "none" }, height: 300,
                                                width: "100%"
                                            }}>
                                                <CssVarsProvider>
                                                    <Table borderAxis="both" stickyHeader >
                                                        <thead>
                                                            <tr>
                                                                <th style={{ width: "8%", textAlign: "center" }}>
                                                                    check
                                                                </th>
                                                                <th style={{ width: "10%" }}>Emp Id</th>
                                                                <th>Joining Date</th>
                                                                <th>Name</th>
                                                                <th>Department Section</th>
                                                                <th>Designation</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {datas?.map((row, index) => (
                                                                <tr key={index}>
                                                                    <td style={{ textAlign: "center" }}>
                                                                        <Checkbox
                                                                            name="Emp Select"
                                                                            checked={row?.inValue || false}
                                                                            onChange={(e) => {
                                                                                HandleCheckbox(e.target.checked, row)
                                                                            }}
                                                                        />
                                                                    </td>
                                                                    <td style={{ width: "10%" }}>{row?.em_no}</td>
                                                                    <td>{row?.datefmt}</td>
                                                                    <td>{row?.em_name}</td>
                                                                    <td>{row?.sect_name}</td>
                                                                    <td>{row?.desg_name}</td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </Table>
                                                </CssVarsProvider>
                                            </Sheet>
                                            : null}
                                    </Paper>
                                </Box>
                            </ModalDialog>
                        </Modal>
                    }
                </Box>
            }
        </Fragment>
    )
}
export default memo(SamplePage)


// import { Button, CssVarsProvider, Input } from '@mui/joy'
// import { Box, Paper, TextField, FormControlLabel, Checkbox, IconButton, Typography, Tooltip } from '@mui/material'
// import React, { Fragment, memo, useEffect, useMemo } from 'react'
// import { ToastContainer } from 'react-toastify'
// import CustomSettingsLayout from 'src/views/Component/MuiCustomComponent/CustomSettingsLayout';
// import SaveIcon from '@mui/icons-material/Save';
// import { useState } from 'react'
// import { useCallback } from 'react'
// import { axioslogin } from 'src/views/Axios/Axios'
// import { infoNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc'
// import { useDispatch, useSelector } from 'react-redux';
// import _ from 'underscore';
// import EditIcon from '@mui/icons-material/Edit';
// import CommonAgGrid from 'src/views/Component/CommonAgGrid'
// import SelectTrainingName from 'src/views/MuiComponents/SelectTrainingName'
// import DeptSelectByRedux from 'src/views/MuiComponents/DeptSelectByRedux';
// import JoyInput from 'src/views/MuiComponents/JoyComponent/JoyInput';
// import UploadFileIcon from '@mui/icons-material/UploadFile';
// import TouchAppSharpIcon from '@mui/icons-material/TouchAppSharp';
// import CloseIcon from '@mui/icons-material/Close'
// import { PUBLIC_NAS_FOLDER } from 'src/views/Constant/Static';
// import ShowFile from './ShowFile';
// import JoyTrainerMultipleSelect from 'src/views/MuiComponents/JoyComponent/JoyTrainerMultipleSelect';
// import { TrainerNames } from 'src/redux/actions/Training.Action';
// import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';


// const TrainingTopic = () => {

//     const dispatch = useDispatch()

//     const [dept_status, set_dept_status] = useState(false);
//     const [depttype, setdepttype] = useState(0);
//     const [training_topic_name, setTraining_topic_name] = useState('');
//     const [training_status, setTraining_status] = useState(false);
//     const [tutorial_status, setTutorial_status] = useState(false);
//     const [medical_status, setMedical_status] = useState(false);
//     const [non_medical_status, set_Non_medical_status] = useState(false);
//     const [pretest_status, setPretest_status] = useState(false);
//     const [post_test_status, setPost_test_status] = useState(false);
//     const [online_status, set_Online_status] = useState(false);
//     const [offline_status, setOffline_status] = useState(false);
//     const [both_status, setBoth_status] = useState(false);
//     const [count, setCount] = useState(0);
//     const [tableData, setTabledata] = useState(0);
//     const [topic_slno, setTopic_slno] = useState(0);
//     const [flag, setFlag] = useState(0);
//     const [dept_flag, setdept_Flag] = useState(0);
//     const [trainingname, setTrainingname] = useState(0);
//     const [hours, setHours] = useState('');
//     const [videos, SetVideos] = useState('');
//     //file
//     const [selectFile, setSelectFile] = useState([]);
//     const [uploads, setUploads] = useState([]);
//     const [open, setopen] = useState(false);
//     const [editflag, SetEditFlag] = useState(0)
//     const [video_time, SetVideo_time] = useState(0)
//     const [trainers, setTrainers] = useState([])
//     const [edit_trainers, setEdit_trainers] = useState(0);
//     const [trainer_names, SetTrainerNames] = useState([]);

//     const employeeState = useSelector((state) => state.getProfileData.ProfileData, _.isEqual);
//     const employeeProfileDetl = useMemo(() => employeeState[0], [employeeState]);
//     const { em_id } = employeeProfileDetl;

//     useEffect(() => {
//         dispatch(TrainerNames())
//     }, [dispatch])

//     console.log(trainers);
//     //reset
//     const reset = useCallback(() => {
//         setTraining_topic_name('');
//         setTraining_status(false);
//         setTutorial_status(false);
//         setMedical_status(false);
//         set_Non_medical_status(false);
//         setPretest_status(false);
//         setPost_test_status(false);
//         setTrainingname(0);
//         setHours(0);
//         set_dept_status(false);
//         setdepttype(0);
//         setdept_Flag(false)
//         set_Online_status(false)
//         setOffline_status(false)
//         setBoth_status(false)
//         SetVideos('');
//         setSelectFile([])
//         setUploads([])
//         SetVideo_time(0);
//         setTrainers([])
//         SetTrainerNames([])
//     }, [])
//     //check dept
//     const checkDepartment = useCallback((e) => {
//         if (e.target.checked === true) {
//             set_dept_status(e.target.checked)
//             setdept_Flag(1);
//         }
//         else {
//             set_dept_status(false)
//             setdept_Flag(0);
//             setdepttype(0);
//         }
//     }, [setdept_Flag, set_dept_status])

//     //postdata
//     const postdata = useMemo(() => {
//         return {
//             dept_status: dept_status === true ? 1 : 0,
//             training_dept: depttype,
//             training_topic_name: training_topic_name,
//             training_name: trainingname,
//             training_status: training_status === true ? 1 : 0,
//             tutorial_status: tutorial_status === true ? 1 : 0,
//             medical_status: medical_status === true ? 1 : 0,
//             non_medical_status: non_medical_status === true ? 1 : 0,
//             pretest_status: pretest_status === true ? 1 : 0,
//             post_test_status: post_test_status === true ? 1 : 0,
//             online_status: online_status === true ? 1 : 0,
//             offline_status: offline_status === true ? 1 : 0,
//             both_status: both_status === true ? 1 : 0,
//             create_user: em_id,
//             hours: hours,
//             video_link: videos,
//             video_time: video_time,
//             trainers: trainers
//         }
//     }, [depttype, videos, trainers, video_time, dept_status, training_topic_name, hours, trainingname, training_status, tutorial_status, medical_status, non_medical_status, pretest_status, post_test_status, online_status, offline_status, both_status, em_id])

//     //patchdata
//     const patchdata = useMemo(() => {
//         return {
//             dept_status: dept_status === true ? 1 : 0,
//             training_dept: depttype,
//             training_topic_name: training_topic_name,
//             training_name: trainingname,
//             training_status: training_status === true ? 1 : 0,
//             tutorial_status: tutorial_status === true ? 1 : 0,
//             medical_status: medical_status === true ? 1 : 0,
//             non_medical_status: non_medical_status === true ? 1 : 0,
//             pretest_status: pretest_status === true ? 1 : 0,
//             post_test_status: post_test_status === true ? 1 : 0,
//             online_status: online_status === true ? 1 : 0,
//             offline_status: offline_status === true ? 1 : 0,
//             both_status: both_status === true ? 1 : 0,
//             edit_user: em_id,
//             topic_slno: topic_slno,
//             hours: hours,
//             video_link: videos,
//             video_time: video_time,
//             trainers: trainers
//         }
//     }, [dept_status, videos, trainers, video_time, depttype, training_topic_name, hours, trainingname, training_status, tutorial_status, medical_status, non_medical_status, pretest_status, post_test_status, em_id, topic_slno, online_status, offline_status, both_status])

//     //view
//     useEffect(() => {
//         const getData = async () => {
//             const result = await axioslogin.get('TrainingTopic/select')
//             const { success, data } = result.data;
//             if (success === 2) {
//                 const viewData = data?.map((val) => {
//                     const obj = {
//                         topic_slno: val.topic_slno,
//                         dept_status: val.dept_status,
//                         deptstatus: val.dept_status === 0 ? "NO" : "YES",
//                         dept_id: val.dept_id,
//                         dept_name: val.dept_name,
//                         dept: val.dept_name,
//                         training_topic_name: val.training_topic_name,
//                         name_slno: val.name_slno,
//                         hours: val.hours,
//                         training_name: val.training_name,
//                         training_status: val.training_status,
//                         training: val.training_status === 0 ? "NO" : "YES",
//                         tutorial_status: val.tutorial_status,
//                         tutorial: val.tutorial_status === 0 ? "NO" : "YES",
//                         medical_status: val.medical_status,
//                         medical: val.medical_status === 0 ? "NO" : "YES",
//                         non_medical_status: val.non_medical_status,
//                         non_medical: val.non_medical_status === 0 ? "NO" : "YES",
//                         pretest_status: val.pretest_status,
//                         pretest: val.pretest_status === 0 ? "NO" : "YES",
//                         post_test_status: val.post_test_status,
//                         post_test: val.post_test_status === 0 ? "NO" : "YES",
//                         online_status: val.online_status,
//                         online: val.online_status === 0 ? "NO" : "YES",
//                         offline_status: val.offline_status,
//                         offline: val.offline_status === 0 ? "NO" : "YES",
//                         both_status: val.both_status,
//                         both: val.both_status === 0 ? "NO" : "YES",
//                         video_link: val.video_link === '' ? "Nill" : val.video_link,
//                         video_time: val.video_time,
//                         upload_status: val.upload_status === 1 ? "YES" : "NO",
//                         trainerss: val.trainers,
//                         trainers_name: val.trainers_name
//                     }
//                     return obj;
//                 })
//                 setTabledata(viewData);
//                 setCount(0)
//             } else {
//                 setTabledata([]);
//             }
//         }
//         getData()
//     }, [count])

//     //ClickEdit
//     const getDataTable = useCallback(async (params) => {
//         setFlag(1);
//         const data = params.api.getSelectedRows()
//         const { topic_slno, video_link, trainers_name, video_time, dept_status, dept_id, hours, training_topic_name, name_slno, training_status, tutorial_status, medical_status, non_medical_status, pretest_status, post_test_status, online_status, offline_status, both_status, trainerss } = data[0]
//         setFlag(1);
//         setdepttype(dept_id)
//         set_dept_status(dept_status === 0 ? false : true)
//         setdept_Flag(dept_status === 0 ? 0 : 1)
//         setTraining_topic_name(training_topic_name);
//         setTraining_status(training_status === 1 ? true : false);
//         setTutorial_status(tutorial_status === 1 ? true : false);
//         setMedical_status(medical_status === 1 ? true : false);
//         set_Non_medical_status(non_medical_status === 1 ? true : false);
//         setPretest_status(pretest_status === 1 ? true : false);
//         setPost_test_status(post_test_status === 1 ? true : false);
//         setTopic_slno(topic_slno)
//         setTrainingname(name_slno)
//         setHours(hours)
//         set_Online_status(online_status === 1 ? true : false)
//         setOffline_status(offline_status === 1 ? true : false)
//         setBoth_status(both_status === 1 ? true : false)
//         SetVideos(video_link);
//         SetVideo_time(video_time);
//         setUploads([])
//         SetTrainerNames(trainers_name)
//         setTrainers(trainerss)

//         //View uploads
//         const postData = {
//             topic_slno: topic_slno
//         }
//         const response = await axioslogin.post('/Training_topic_uploads/selectuploads', postData)
//         const { success } = response.data
//         if (success === 1) {
//             const data = response.data;
//             const fileNames = data.data
//             const fileUrls = fileNames?.map((filename) => {
//                 const url = `${PUBLIC_NAS_FOLDER}/TrainingTopicUploads/${topic_slno}/${filename}`;
//                 return setUploads(url);
//             });
//             return fileUrls
//         } else {
//             infoNofity("No File uploads")
//         }
//     }, [setUploads])


//     useEffect(() => {
//         if (uploads !== null) {
//             SetEditFlag(1)
//         }
//         else {
//             SetEditFlag(0)
//         }
//     }, [SetEditFlag, uploads])

//     const HandleOnline = useCallback((e) => {
//         if (e.target.checked === true) {
//             set_Online_status(e.target.checked)
//             setOffline_status(false);
//             setBoth_status(false);
//         }
//         else {
//             set_Online_status(false)
//             setOffline_status(false);
//             setBoth_status(false);
//         }
//     }, [set_Online_status, setOffline_status, setBoth_status])


//     const HandleOffline = useCallback((e) => {
//         if (e.target.checked === true) {
//             setOffline_status(e.target.checked)
//             set_Online_status(false);
//             setBoth_status(false);
//         }
//         else {
//             set_Online_status(false)
//             setOffline_status(false);
//             setBoth_status(false);
//         }
//     }, [set_Online_status, setOffline_status, setBoth_status])

//     const HandleBoth = useCallback((e) => {
//         if (e.target.checked === true) {
//             setBoth_status(e.target.checked)
//             setOffline_status(false);
//             set_Online_status(false);
//         }
//         else {
//             set_Online_status(false)
//             setOffline_status(false);
//             setBoth_status(false);
//         }
//     }, [set_Online_status, setOffline_status, setBoth_status])

//     const uploadFile = useCallback(async (e) => {
//         const newFiles = [...selectFile]
//         newFiles.push(e.target.files[0])
//         setSelectFile(newFiles)
//     }, [selectFile, setSelectFile])

//     const handleRemoveFile = (index) => {
//         setSelectFile((prevFiles) => {
//             const updatedFiles = [...prevFiles];
//             updatedFiles.splice(index, 1); // Remove the file at the specified index
//             return updatedFiles;
//         });
//     };

//     ////upload submit//////
//     const submitTrainingTopic = useCallback(() => {
//         const InsertData = async (postdata) => {
//             try {
//                 const result = await axioslogin.post('/TrainingTopic/insert', postdata)
//                 return result.data;
//             } catch (error) {
//                 console.error("Error while inserting data:", error);
//                 return { success: 0, message: "An error occurred while inserting data." };
//             }
//         };
//         //edit
//         const EditData = async (patchdata) => {
//             const result = await axioslogin.patch('/TrainingTopic/update', patchdata)
//             const { message, success } = result.data
//             if (success === 1) {
//                 reset();
//                 setCount(count + 1);
//                 setTopic_slno(0);
//                 succesNofity(message)
//                 setFlag(0)
//             }
//             else {
//                 warningNofity(message)
//                 reset();
//             }
//         }
//         //image upload
//         const handleUpload = async (insetId) => {
//             try {
//                 const formData = new FormData();
//                 formData.append('insertID', insetId);

//                 const compressedFilesPromises = selectFile?.map((file) => {
//                     return formData.append('files', file, file.name);
//                 });
//                 await Promise.all(compressedFilesPromises);
//                 const uploadResult = await axioslogin.post('/Training_topic_uploads/uploadtrainingfiles', formData, {
//                     headers: {
//                         'Content-Type': 'multipart/form-data',
//                     },
//                 });
//                 const { success, message } = uploadResult.data;
//                 if (success === 1) {
//                     succesNofity(message);
//                     setCount(count + 1);
//                     reset();
//                 } else {
//                     warningNofity(message);
//                 }
//             } catch (error) {
//                 warningNofity('An error occurre.');
//                 console.error('Error during file upload:', error);
//             }
//         };

//         if (flag === 1) {
//             EditData(patchdata);
//             reset();
//         } else {
//             InsertData(postdata)
//                 .then((val) => {
//                     const { insetId, message, success } = val;
//                     if (success === 1) {
//                         if (selectFile.length !== 0) {
//                             handleUpload(insetId);
//                         } else {
//                             succesNofity("Question inserted successfully");
//                             reset();
//                             setCount(count + 1);
//                         }
//                     }
//                     else {
//                         warningNofity(message)
//                     }
//                 })
//                 .catch((error) => {
//                     console.error("Error in InsertData:", error);
//                     warningNofity('An error occurred while inserting data.');
//                 });
//         }
//     }, [postdata, patchdata, reset, flag, selectFile, setCount, count]);


//     const ShowFlies = useCallback(() => {
//         setopen(true);
//     }, [])

//     const [columnDef] = useState([
//         { headerName: 'Sl.No ', field: 'topic_slno', filter: true, minWidth: 90 },
//         { headerName: 'Department', field: 'deptstatus', filter: true, minWidth: 150 },
//         { headerName: 'Topic Name', field: 'training_topic_name', filter: true, minWidth: 250 },
//         { headerName: 'Training Name', field: 'training_name', filter: true, minWidth: 150 },
//         { headerName: 'Training ', field: 'training', filter: true, minWidth: 150 },
//         { headerName: 'Tutorial ', field: 'tutorial', filter: true, minWidth: 150 },
//         { headerName: 'Medical', field: 'medical', filter: true, minWidth: 150 },
//         { headerName: 'Non-Med', field: 'non_medical', filter: true, minWidth: 150 },
//         { headerName: 'Pre-Test ', field: 'pretest', filter: true, minWidth: 150 },
//         { headerName: 'Post-Test ', field: 'post_test', filter: true, minWidth: 150 },
//         { headerName: 'Online', field: 'online', filter: true, minWidth: 150 },
//         { headerName: 'Offline ', field: 'offline', filter: true, minWidth: 150 },
//         { headerName: 'Both ', field: 'both', filter: true, minWidth: 150 },
//         { headerName: 'Video  ', field: 'video_link', filter: true, minWidth: 300 },
//         { headerName: 'Video Time(m) ', field: 'video_time', filter: true, minWidth: 200 },
//         { headerName: 'Pdf  ', field: 'upload_status', filter: true, minWidth: 200 },
//         { headerName: 'Taraining Hours ', field: 'hours', filter: true, minWidth: 150 },
//         { headerName: 'Trainers ', field: 'trainers_name', filter: true, minWidth: 150 },
//         {
//             headerName: 'Edit', minWidth: 150, cellRenderer: params =>
//                 < Fragment >
//                     <IconButton sx={{ paddingY: 0.5 }} onClick={() => getDataTable(params)}>
//                         <EditIcon color='primary' />
//                     </IconButton>
//                 </Fragment >
//         }
//     ])


//     const EditTrainers = useCallback(() => {
//         setEdit_trainers(1)
//     }, [setEdit_trainers])

//     return (
//         <CustomSettingsLayout title="Training Topic Master" displayClose={true} >
//             <ToastContainer />
//             <Box sx={{ width: "100%", display: "flex", flexDirection: "column" }}>
//                 <Paper sx={{ display: "flex", flexDirection: "column" }}>
//                     <Box sx={{ display: "flex", flexDirection: "row", p: 1, gap: 1 }}>
//                         <Box >

//                             <FormControlLabel
//                                 control={
//                                     <Checkbox
//                                         name="dept_status"
//                                         color="primary"
//                                         value={dept_status}
//                                         checked={dept_status}
//                                         className="ml-1"
//                                         onChange={(e) => checkDepartment(e)}
//                                     />
//                                 }
//                                 label="Departmental"
//                             />

//                         </Box>
//                         {
//                             dept_flag === 1 ?
//                                 <Box sx={{ flex: 1 }}>
//                                     <DeptSelectByRedux value={depttype} setValue={setdepttype} />
//                                 </Box>
//                                 : null
//                         }
//                         <Box sx={{ flex: 1 }}>
//                             <SelectTrainingName value={trainingname} setValue={setTrainingname} />
//                         </Box>
//                         <Box sx={{ flex: 1 }}>
//                             <TextField
//                                 fullWidth
//                                 placeholder='Training Subject Name'
//                                 id='training_topic_name'
//                                 size="small"
//                                 value={training_topic_name}
//                                 name="training_topic_name"
//                                 onChange={(e) => setTraining_topic_name(e.target.value)}
//                             />
//                         </Box>
//                         {edit_trainers === 1 ?
//                             <Tooltip title="Add Trainers">
//                                 <Box sx={{ px: 0.3, flex: 1 }} >
//                                     <JoyTrainerMultipleSelect value={trainers} setValue={setTrainers} />
//                                 </Box>
//                             </Tooltip>
//                             : null}

//                         {flag === 1 && edit_trainers === 0 ?
//                             <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
//                                 <JoyInput
//                                     type="text"
//                                     value={trainer_names}
//                                     disabled />
//                                 <Tooltip title="Add new trainers">
//                                     <Button>
//                                         <PublishedWithChangesIcon onClick={EditTrainers} />
//                                     </Button>
//                                 </Tooltip>

//                             </Box>
//                             :
//                             null
//                         }
//                         {flag === 0 && edit_trainers === 0 ?
//                             <Tooltip title="Add Trainers">
//                                 <Box sx={{ px: 0.3, flex: 1 }} >
//                                     <JoyTrainerMultipleSelect value={trainers} setValue={setTrainers} />
//                                 </Box>
//                             </Tooltip>
//                             : null}
//                         <Box>
//                             <Box sx={{ display: "flex", flexDirection: "row" }}>
//                                 <Typography sx={{ mt: 1 }}>Training Hours :</Typography>
//                                 <Input
//                                     type="number"
//                                     value={hours}
//                                     onChange={(e) => setHours(e.target.value)}
//                                     slotProps={{
//                                         input: {
//                                             min: 1,
//                                             max: 5
//                                         },
//                                     }}
//                                 />
//                             </Box>
//                         </Box>
//                     </Box>

//                     <Box sx={{ display: "flex", flexDirection: "row", p: 1, gap: 1 }}>
//                         <Box>
//                             <FormControlLabel
//                                 control={
//                                     <Checkbox
//                                         name="status"
//                                         color="primary"
//                                         value={training_status}
//                                         checked={training_status}
//                                         className="ml-1"
//                                         onChange={(e) => setTraining_status(e.target.checked)}
//                                     />
//                                 }
//                                 label="Training"
//                             />
//                         </Box>
//                         <Box>
//                             <FormControlLabel
//                                 control={
//                                     <Checkbox
//                                         name="status"
//                                         color="primary"
//                                         value={tutorial_status}
//                                         checked={tutorial_status}
//                                         className="ml-1"
//                                         onChange={(e) => setTutorial_status(e.target.checked)}
//                                     />
//                                 }
//                                 label="Tutorial"
//                             />
//                         </Box>
//                         <Box>
//                             <FormControlLabel
//                                 control={
//                                     <Checkbox
//                                         name="status"
//                                         color="primary"
//                                         value={medical_status}
//                                         checked={medical_status}
//                                         className="ml-1"
//                                         onChange={(e) => setMedical_status(e.target.checked)}
//                                     />
//                                 }
//                                 label="Medical"
//                             />
//                         </Box>
//                         <Box>
//                             <FormControlLabel
//                                 control={
//                                     <Checkbox
//                                         name="status"
//                                         color="primary"
//                                         value={non_medical_status}
//                                         checked={non_medical_status}
//                                         className="ml-1"
//                                         onChange={(e) => set_Non_medical_status(e.target.checked)}
//                                     />
//                                 }
//                                 label="Non medical"
//                             />
//                         </Box>
//                         <Box>
//                             <FormControlLabel
//                                 control={
//                                     <Checkbox
//                                         name="status"
//                                         color="primary"
//                                         value={pretest_status}
//                                         checked={pretest_status}
//                                         className="ml-1"
//                                         onChange={(e) => setPretest_status(e.target.checked)}
//                                     />
//                                 }
//                                 label="Pre-Test"
//                             />
//                         </Box>
//                         <Box>
//                             <FormControlLabel
//                                 control={
//                                     <Checkbox
//                                         name="status"
//                                         color="primary"
//                                         value={post_test_status}
//                                         checked={post_test_status}
//                                         className="ml-1"
//                                         onChange={(e) => setPost_test_status(e.target.checked)}
//                                     />
//                                 }
//                                 label="Post-Test"
//                             />
//                         </Box>
//                         <Box>
//                             <FormControlLabel
//                                 control={
//                                     <Checkbox
//                                         name="status"
//                                         color="primary"
//                                         value={online_status}
//                                         checked={online_status}
//                                         className="ml-1"
//                                         onChange={(e) => HandleOnline(e)}
//                                     />
//                                 }
//                                 label="Online"
//                             />
//                         </Box>
//                         <Box>
//                             <FormControlLabel
//                                 control={
//                                     <Checkbox
//                                         name="status"
//                                         color="primary"
//                                         value={offline_status}
//                                         checked={offline_status}
//                                         className="ml-1"
//                                         onChange={(e) => HandleOffline(e)}
//                                     />
//                                 }
//                                 label="Offline"
//                             />
//                         </Box>
//                         <Box>
//                             <FormControlLabel
//                                 control={
//                                     <Checkbox
//                                         name="status"
//                                         color="primary"
//                                         value={both_status}
//                                         checked={both_status}
//                                         className="ml-1"
//                                         onChange={(e) => HandleBoth(e)}
//                                     />
//                                 }
//                                 label="Both"
//                             />
//                         </Box>
//                     </Box>
//                     <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
//                         {
//                             both_status === true || online_status === true ?
//                                 <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
//                                     <Box sx={{ p: 1, mt: -1 }}>
//                                         <JoyInput
//                                             type='text'
//                                             name='video link'
//                                             id='videos'
//                                             placeholder="Enter Video Link"
//                                             value={videos}
//                                             onchange={(e) => SetVideos(e)}
//                                         />
//                                     </Box>
//                                     <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
//                                         <Box>
//                                             <Typography sx={{ mt: 1 }}>Video Time :</Typography>
//                                         </Box>
//                                         <Box>
//                                             <Input
//                                                 type="number"
//                                                 value={video_time}
//                                                 onChange={(e) => SetVideo_time(e.target.value)}
//                                             />
//                                         </Box>
//                                         <Box>
//                                             <Typography sx={{ mt: 1 }}>Minutes</Typography>
//                                         </Box>
//                                     </Box>
//                                     <Box>
//                                         {
//                                             both_status === true || online_status === true && flag === 0 ?
//                                                 <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
//                                                     <Box>
//                                                         <Tooltip title="Upload file">
//                                                             <IconButton variant="outlined" component="label">
//                                                                 <UploadFileIcon style={{ color: "#4682A9", fontSize: 30, border: 1, borderRadius: 10 }} />
//                                                                 <Input
//                                                                     id="file-input"
//                                                                     type="file"
//                                                                     accept=".jpg, .jpeg, .png, .pdf"
//                                                                     style={{ display: 'none' }}
//                                                                     onChange={uploadFile}
//                                                                 />
//                                                             </IconButton>
//                                                         </Tooltip>
//                                                     </Box>
//                                                     <Box>

//                                                         {
//                                                             selectFile && selectFile.map((val, index) => {
//                                                                 return <Box sx={{ display: "flex", flexDirection: "row", ml: 1, pt: 1 }}
//                                                                     key={index} >
//                                                                     <Box >{val.name}</Box>
//                                                                     <Box sx={{ ml: .3 }}><CloseIcon sx={{ height: '18px', width: '20px', cursor: 'pointer' }}
//                                                                         onClick={() => handleRemoveFile(index)}
//                                                                     /></Box>

//                                                                 </Box>
//                                                             }
//                                                             )}
//                                                     </Box>
//                                                 </Box>
//                                                 : null
//                                         }
//                                     </Box>
//                                 </Box>
//                                 : null
//                         }

//                         {
//                             flag === 1 && editflag === 1 ?
//                                 <Box sx={{ mt: 1 }}>
//                                     <Tooltip title="View file">
//                                         <IconButton onClick={(e) => ShowFlies(e)}>
//                                             <TouchAppSharpIcon
//                                                 sx={{ color: "#3876BF" }} />
//                                         </IconButton>
//                                     </Tooltip>
//                                 </Box>
//                                 : null
//                         }
//                         <Box sx={{ p: 1 }}>
//                             <CssVarsProvider>
//                                 <Button
//                                     variant="outlined"
//                                     component="label"
//                                     size="md"
//                                     color="primary"
//                                     onClick={submitTrainingTopic}
//                                 >
//                                     <SaveIcon />
//                                 </Button>
//                             </CssVarsProvider>
//                         </Box>
//                     </Box>
//                 </Paper>
//                 <ShowFile setopen={setopen} open={open} uploads={uploads} reset={reset} />
//                 <Paper sx={{ width: "100%" }}>
//                     <CommonAgGrid
//                         columnDefs={columnDef}
//                         tableData={tableData}
//                         sx={{
//                             height: 500,
//                             width: "100%"
//                         }}
//                         rowHeight={30}
//                         headerHeight={30}
//                     />
//                 </Paper>
//             </Box >
//         </CustomSettingsLayout >
//     )
// }

// export default memo(TrainingTopic)

