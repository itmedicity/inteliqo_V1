import { Box, Tooltip } from '@mui/material';
import React, { Fragment, memo, useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { setDepartment } from 'src/redux/actions/Department.action';
import CustomLayout from 'src/views/Component/MuiCustomComponent/CustomLayout';
import DepartmentDropRedx from 'src/views/Component/ReduxComponent/DepartmentRedx';
import DepartmentSectionRedx from 'src/views/Component/ReduxComponent/DepartmentSectionRedx';
import { CssVarsProvider, IconButton } from '@mui/joy';
import JoyInput from 'src/views/MuiComponents/JoyComponent/JoyInput';
import SearchIcon from '@mui/icons-material/Search';
import { warningNofity } from 'src/views/CommonCode/Commonfunc';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import { axioslogin } from 'src/views/Axios/Axios';
import CommonAgGrid from 'src/views/Component/CommonAgGrid';
import { IconButton as OpenIcon } from '@mui/material';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import LaunchIcon from '@mui/icons-material/Launch';
import DetailModal from './DetailModal';
import { PdfInductionTrannings } from 'src/views/TrainingDevelopment/TrainingDetails/PdfInductionTranning';
import { format } from 'date-fns';

const InductionDetailsMainpage = () => {
    const dispatch = useDispatch();

    const [dept, setDept] = useState(0);
    const [deptSec, setDeptSec] = useState(0);
    const [count, setCount] = useState(0);
    const [type, setType] = useState(0);
    const [empId, setEmpId] = useState(0);
    const [empDetails, setEmpDetails] = useState([]);
    const [selectedData, setSelectedData] = useState([]);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        dispatch(setDepartment());
    }, [dispatch, count]);

    const getDetails = useCallback(async () => {
        if (dept && deptSec && parseInt(type) !== 0) {
            const obj = { dept, deptSec };

            const endpoint = parseInt(type) === 1 ? '/TrainingDetails/getInductionDetails' : '/TrainingDetails/getDepartmentalDetails';
            const result = await axioslogin.post(endpoint, obj);
            const { success, data } = result.data;

            if (success === 2 && data.length > 0) {
                if (empId !== 0) {
                    const filtered = data.filter(val => val.em_no === parseInt(empId));
                    setEmpDetails(filtered);
                } else {
                    setEmpDetails(data);
                }
                setCount(prev => prev + 1);
            } else {
                warningNofity("No data shown");
                setEmpDetails([]);
                setDept(0);
                setDeptSec(0);
                setType(0);
                setCount(0);
            }
        } else {
            warningNofity("Provide Basic Information to Search");
        }
    }, [type, empId, dept, deptSec]);

    const handleClick = useCallback((params) => {
        const data = params.api.getSelectedRows();
        setSelectedData(data);
        setOpen(true);
    }, []);

    const handlePdf = useCallback((params) => {
        const selected = params.api.getSelectedRows();
        const { em_id } = selected[0];
        const getTrainerName = async (emid) => {
            const result = await axioslogin.get(`/TrainingDetails/getInductTrainersdetail/${emid}`);
            return result.data;
        };

        const getDeptData = async () => {
            const emid = parseInt(em_id);
            const result = await axioslogin.get(`/TrainingDetails/getInductiontrainings/${emid}`);
            const { success, data } = result.data;

            if (success === 2) {
                const trainerData = await getTrainerName(emid);
                const { datas } = trainerData;
                const showData = datas?.map((val) => {
                    const mapdata = data.find(item => item.indct_emp_no === val.indct_emp_no && item.schedule_topic === val.schedule_topic);
                    return {
                        trainer_name: val.trainer_name.toLowerCase(),
                        Induct_slno: mapdata.Induct_slno,
                        induct_pre_mark: (mapdata.training_status === 1 && mapdata.pretest_status === 1) ? mapdata.induct_pre_mark : "NA",
                        induct_post_mark: (mapdata.training_status === 1 && mapdata.posttest_status === 1) ? mapdata.induct_post_mark : "NA",
                        hours: mapdata.hours,
                        date: format(new Date(mapdata.induction_date), 'dd-MM-yyyy'),
                        training_topic_name: mapdata.training_topic_name.toLowerCase(),
                        Remark: (mapdata.pretest_status === 1 && mapdata.posttest_status === 1 && mapdata.induct_post_mark >= 2) ? "Eligible" : "Not Eligible",
                        training_induct_hod_aprvl_status: mapdata.training_induct_hod_aprvl_status,
                        training_iduct_tnd_verify_status: mapdata.training_iduct_tnd_verify_status,
                        training_status: mapdata.training_status
                    };
                });
                PdfInductionTrannings(selected[0], showData);
            }
        };

        getDeptData();
    }, []);

    const columnDef = [
        { headerName: 'Sl No', field: 'slnum', filter: true, width: 100 },
        { headerName: 'Employee ID', field: 'em_no', filter: true, width: 150 },
        { headerName: 'Employee Names', field: 'em_name', filter: true, width: 150 },
        {
            headerName: 'View',
            cellRenderer: params => (
                <OpenIcon onClick={() => handleClick(params)} sx={{ paddingY: 0.5 }}>
                    <Tooltip title="View More">
                        <LaunchIcon />
                    </Tooltip>
                </OpenIcon>
            )
        },
        {
            headerName: 'Induction PDF Report',
            cellRenderer: params => (
                <OpenIcon onClick={() => handlePdf(params)}>
                    <Tooltip title="Pdf View">
                        <PictureAsPdfIcon />
                    </Tooltip>
                </OpenIcon>
            )
        }
    ];

    return (
        <Fragment>
            <ToastContainer />
            {open ? (
                <DetailModal setSelectedData={setSelectedData} selectedData={selectedData} setOpen={setOpen} open={open} />
            ) : (
                <CustomLayout title="Training Details" displayClose={true}>
                    <Box sx={{ width: '100%', p: 1 }}>
                        <Box sx={{ p: 1, width: '100%', display: 'flex', flexDirection: 'row', gap: 0.5, flexWrap: 'wrap' }}>
                            <Tooltip title="Select Department">
                                <Box sx={{ flex: 1 }}>
                                    <DepartmentDropRedx getDept={setDept} />
                                </Box>
                            </Tooltip>
                            <Tooltip title="Select Department Section">
                                <Box sx={{ flex: 1 }}>
                                    <DepartmentSectionRedx getSection={setDeptSec} />
                                </Box>
                            </Tooltip>
                            <Box sx={{ flex: 1 }}>
                                <JoyInput
                                    size="sm"
                                    value={empId}
                                    onchange={setEmpId}
                                    name="Employee_ID"
                                    placeholder="Employee ID"
                                />
                            </Box>
                            <Tooltip title="Select Training Type">
                                <Box sx={{ flex: 1 }}>
                                    <Select
                                        value={type}
                                        onChange={(event, newValue) => setType(newValue)}
                                        size="md"
                                        variant="outlined"
                                    >
                                        <Option value={0}>Select Training Type</Option>
                                        <Option value={1}>Induction</Option>
                                        <Option value={2}>Departmental</Option>
                                    </Select>
                                </Box>
                            </Tooltip>
                            <Box>
                                <CssVarsProvider>
                                    <IconButton variant="outlined" size="sm" color="primary" onClick={getDetails}>
                                        <SearchIcon />
                                    </IconButton>
                                </CssVarsProvider>
                            </Box>
                        </Box>
                        <Box sx={{ width: '100%', overflow: 'auto' }}>
                            <Box sx={{ height: 750, display: 'flex', flexDirection: 'column', mt: 2 }}>
                                <CommonAgGrid
                                    columnDefs={columnDef}
                                    tableData={empDetails}
                                    sx={{ height: 700, width: '100%', mt: 1 }}
                                    rowHeight={30}
                                    headerHeight={30}
                                />
                            </Box>
                        </Box>
                    </Box>
                </CustomLayout>
            )}
        </Fragment>
    );
};

export default memo(InductionDetailsMainpage);



// import { Box, Tooltip } from '@mui/material';
// import React, { Fragment, memo, useCallback, useEffect, useState } from 'react'
// import { useDispatch } from 'react-redux';
// import { ToastContainer } from 'react-toastify';
// import { setDepartment } from 'src/redux/actions/Department.action';
// import CustomLayout from 'src/views/Component/MuiCustomComponent/CustomLayout';
// import DepartmentDropRedx from 'src/views/Component/ReduxComponent/DepartmentRedx';
// import DepartmentSectionRedx from 'src/views/Component/ReduxComponent/DepartmentSectionRedx';
// import { CssVarsProvider, IconButton } from '@mui/joy';
// import JoyInput from 'src/views/MuiComponents/JoyComponent/JoyInput';
// import SearchIcon from '@mui/icons-material/Search';
// import { warningNofity } from 'src/views/CommonCode/Commonfunc';
// import Select from '@mui/joy/Select';
// import Option from '@mui/joy/Option';
// import { axioslogin } from 'src/views/Axios/Axios';
// import CommonAgGrid from 'src/views/Component/CommonAgGrid';
// import { IconButton as OpenIcon } from '@mui/material';
// import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
// import LaunchIcon from '@mui/icons-material/Launch';
// import DetailModal from './DetailModal';
// import { PUBLIC_NAS_FOLDER } from 'src/views/Constant/Static';
// import { urlExist } from 'src/views/Constant/Constant';
// import { PdfInductionTrannings } from 'src/views/TrainingDevelopment/TrainingDetails/PdfInductionTranning';
// import { format } from 'date-fns';
// import ProfilePicDefault from 'src/assets/images/nosigature.jpg'

// const InductionDetailsMainpage = () => {

//     const dispatch = useDispatch();

//     const [dept, setdept] = useState(0);
//     const [deptSec, setdeptSec] = useState(0);
//     const [count, Setcount] = useState(0);
//     const [type, SetType] = useState(0);
//     const [Emp_ID, SetEmp_ID] = useState(0);
//     const [EmpDetails, SetEmpDetails] = useState([])
//     const [selectedData, SetSelectedData] = useState([])
//     const [open, SetOpen] = useState(false)

//     useEffect(() => {
//         dispatch(setDepartment());
//     }, [dispatch, count])

//     const GetDetails = useCallback(async () => {
//         if (dept !== 0 && deptSec !== 0 && parseInt(type) !== 0) {
//             const obj = {
//                 dept: dept,
//                 deptSec: deptSec,
//             }
//             if (parseInt(type) === 1) {
//                 const result = await axioslogin.post(`/TrainingDetails/getInductionDetails`, obj)
//                 const { success, data } = result.data;
//                 if (success === 2) {
//                     SetEmpDetails(data)
//                     Setcount(count + 1)
//                     if (Emp_ID !== 0) {
//                         const MatchData = data?.filter((val) => val.em_no === parseInt(Emp_ID))
//                         SetEmpDetails(MatchData)
//                     }
//                 }
//                 else {
//                     warningNofity("No data shown")
//                     SetEmpDetails([])
//                     setdept(0);
//                     setdeptSec(0)
//                     SetType(0)
//                     Setcount(0)
//                 }
//             }
//             else if (parseInt(type) === 2) {
//                 const result = await axioslogin.post(`/TrainingDetails/getDepartmentalDetails`, obj)
//                 const { data, success } = result.data
//                 if (success === 2 && data.length !== 0) {
//                     SetEmpDetails(data)
//                     Setcount(count + 1)
//                     if (Emp_ID !== 0) {
//                         const MatchData = data?.filter((val) => val.em_no === parseInt(Emp_ID))
//                         SetEmpDetails(MatchData)
//                     }
//                 }
//             }
//             else {
//                 warningNofity("No Record Found")
//             }
//         }
//         else {
//             warningNofity("Provide Basic Information to Search")
//         }
//     }, [type, Emp_ID, dept, deptSec, count])

//     //click to open modal
//     const handleClick = useCallback((params) => {
//         const data = params.api.getSelectedRows()
//         SetSelectedData(data)
//         SetOpen(true)
//     }, [])

//     //click to open pdf
//     const HandlePdf = useCallback((params) => {
//         const getdata = params.api.getSelectedRows()
//         const { em_id } = getdata[0];
//         // const getHODSign = async (hodID) => {
//         //     const profilePic = JSON.stringify(`${PUBLIC_NAS_FOLDER}/${hodID}/signature/signature.jpg`);
//         //     return profilePic
//         // }
//         // const getHod = async (emid) => {
//         //     const result = await axioslogin.get(`/TrainingDetails/GetHOD/${emid}`)
//         //     return result.data
//         // }
//         const getTrainneerName = async (emid) => {
//             const results = await axioslogin.get(`/TrainingDetails/getInductTrainersdetail/${emid}`)
//             return results.data
//         }
//         const getdeptdatas = (async () => {
//             const emid = parseInt(em_id)
//             const result = await axioslogin.get(`/TrainingDetails/getInductiontrainings/${emid}`)
//             const { success, data } = result.data;
//             if (success === 2) {
//                 getTrainneerName(emid).then((values) => {
//                     const { datas } = values
//                     const ShowData = datas?.map((val) => {
//                         const mapdata = data?.find((item) => item.indct_emp_no === val.indct_emp_no && item.schedule_topic === val.schedule_topic)
//                         return {
//                             trainer_name: val.trainer_name.toLowerCase(),
//                             Induct_slno: mapdata.Induct_slno,
//                             induct_pre_mark: mapdata.training_status === 1 && mapdata.pretest_status === 1 ? mapdata.induct_pre_mark : "NA",
//                             induct_post_mark: mapdata.training_status === 1 && mapdata.posttest_status === 1 ? mapdata.induct_post_mark : "NA",
//                             hours: mapdata.hours,
//                             // date: moment(mapdata.induction_date).format("DD/MM/YY"),
//                             date: format(new Date(mapdata.induction_date), 'dd-MM-yyyy'),
//                             training_topic_name: mapdata.training_topic_name.toLowerCase(),
//                             Remark: mapdata.pretest_status === 1 && mapdata.posttest_status === 1 && mapdata.induct_post_mark >= 2 ? "Eligible" : "Not Eligible",
//                             training_induct_hod_aprvl_status: mapdata.training_induct_hod_aprvl_status,
//                             training_iduct_tnd_verify_status: mapdata.training_iduct_tnd_verify_status,
//                             training_status: mapdata.training_status
//                         }
//                     })
//                     PdfInductionTrannings(getdata[0], ShowData)
//                 })
//                 // getHod(emid).then((value) => {
//                 //     const { dataas, success } = value
//                 //     if (success === 2) {
//                 //         const { emp_id } = dataas[0]
//                 //         getHODSign(emp_id).then((sign) => {
//                 //             urlExist(sign, (status) => {
//                 //                 if (status === true) {
//                 //                     const HODSign = JSON.parse(sign)
//                 //                     getTrainneerName(emid).then((values) => {
//                 //                         const { datas } = values
//                 //                         const ShowData = datas?.map((val) => {
//                 //                             const mapdata = data?.find((item) => item.indct_emp_no === val.indct_emp_no && item.schedule_topic === val.schedule_topic)
//                 //                             return {
//                 //                                 trainer_name: val.trainer_name.toLowerCase(),
//                 //                                 Induct_slno: mapdata.Induct_slno,
//                 //                                 induct_pre_mark: mapdata.training_status === 1 && mapdata.pretest_status === 1 ? mapdata.induct_pre_mark : "NA",
//                 //                                 induct_post_mark: mapdata.training_status === 1 && mapdata.posttest_status === 1 ? mapdata.induct_post_mark : "NA",
//                 //                                 hours: mapdata.hours,
//                 //                                 // date: moment(mapdata.induction_date).format("DD/MM/YY"),
//                 //                                 date: format(new Date(mapdata.induction_date), 'dd-MM-yyyy'),
//                 //                                 training_topic_name: mapdata.training_topic_name.toLowerCase(),
//                 //                                 Remark: mapdata.pretest_status === 1 && mapdata.posttest_status === 1 && mapdata.induct_post_mark >= 2 ? "Eligible" : "Not Eligible",
//                 //                                 training_induct_hod_aprvl_status: mapdata.training_induct_hod_aprvl_status,
//                 //                                 training_iduct_tnd_verify_status: mapdata.training_iduct_tnd_verify_status,
//                 //                                 training_status: mapdata.training_status
//                 //                             }
//                 //                         })
//                 //                         PdfInductionTrannings(getdata[0], ShowData, HODSign)
//                 //                     })

//                 //                 } else {

//                 //                     getTrainneerName(emid).then((values) => {
//                 //                         const { datas } = values
//                 //                         const ShowData = datas?.map((val) => {
//                 //                             const mapdata = data.find((item) => item.indct_emp_no === val.indct_emp_no && item.schedule_topic === val.schedule_topic)
//                 //                             return {
//                 //                                 trainer_name: val.trainer_name.toLowerCase(),
//                 //                                 Induct_slno: mapdata.Induct_slno,
//                 //                                 induct_pre_mark: mapdata.training_status === 1 && mapdata.pretest_status === 1 ? mapdata.induct_pre_mark : "NA",
//                 //                                 induct_post_mark: mapdata.training_status === 1 && mapdata.posttest_status === 1 ? mapdata.induct_post_mark : "NA",
//                 //                                 hours: mapdata.hours,
//                 //                                 date: format(new Date(mapdata.induction_date), 'dd-MM-yyyy'),
//                 //                                 training_topic_name: mapdata.training_topic_name.toLowerCase(),
//                 //                                 Remark: mapdata.pretest_status === 1 && mapdata.posttest_status === 1 && mapdata.induct_post_mark >= 2 ? "Eligible" : "Not Eligible",
//                 //                                 training_induct_hod_aprvl_status: mapdata.training_induct_hod_aprvl_status,
//                 //                                 training_iduct_tnd_verify_status: mapdata.training_iduct_tnd_verify_status,
//                 //                                 training_status: mapdata.training_status
//                 //                             }
//                 //                         })
//                 //                         PdfInductionTrannings(getdata[0], ShowData, ProfilePicDefault)
//                 //                     })
//                 //                 }
//                 //             })

//                 //         })
//                 //     }
//                 // })

//             }
//             else {

//             }
//         })
//         getdeptdatas();
//     }, [])

//     const [columnDef] = useState([
//         { headerName: 'Sl No', field: 'slnum', filter: true, width: 100 },
//         { headerName: 'Employee ID', field: 'em_no', filter: true, width: 150 },
//         { headerName: 'Employee Names', field: 'em_name', filter: true, width: 150 },
//         {
//             headerName: 'View', cellRenderer: params => {
//                 return <OpenIcon
//                     onClick={() => handleClick(params)}
//                     sx={{ paddingY: 0.5 }} >
//                     <Tooltip title="View More">
//                         <LaunchIcon
//                             sx={{ size: "sm" }} />
//                     </Tooltip>
//                 </OpenIcon>
//             }
//         },
//         {
//             headerName: 'Induction PDF Report ', cellRenderer: params => {
//                 return <OpenIcon
//                     onClick={() => HandlePdf(params)}
//                 >
//                     <Tooltip title="Pdf View">
//                         <PictureAsPdfIcon
//                             sx={{ size: "sm" }} />
//                     </Tooltip>
//                 </OpenIcon>
//             }
//         }
//     ])

//     return (
//         <Fragment>
//             <ToastContainer />
//             {open === true ? <DetailModal SetSelectedData={SetSelectedData} selectedData={selectedData} SetOpen={SetOpen} open={open} /> :
//                 <CustomLayout title="Training Details" displayClose={true}>
//                     <Box sx={{ width: "100%", p: 1, }}>
//                         <Box sx={{ p: 1, width: "100%", display: "flex", flexDirection: "row", gap: 0.5, flexWrap: "wrap" }}>
//                             <Tooltip title="Select Department">
//                                 <Box sx={{ flex: 1, }}>
//                                     <DepartmentDropRedx getDept={setdept} />
//                                 </Box>
//                             </Tooltip>
//                             <Tooltip title="Select Department Section">
//                                 <Box sx={{ flex: 1, }}>
//                                     <DepartmentSectionRedx getSection={setdeptSec}
//                                     />
//                                 </Box>
//                             </Tooltip>
//                             <Box sx={{ flex: 1 }} >
//                                 <JoyInput
//                                     size="sm"
//                                     value={Emp_ID}
//                                     onchange={SetEmp_ID}
//                                     name="Employee_ID"
//                                     placeholder="Employee ID"
//                                 />
//                             </Box>
//                             <Tooltip title="Select Training Type">
//                                 <Box sx={{ flex: 1, }}>
//                                     <Select
//                                         value={type}
//                                         onChange={(event, newValue) => {
//                                             SetType(newValue);
//                                         }}
//                                         size='md'
//                                         variant='outlined'
//                                     >
//                                         <Option value={0}>Select Tarining Type</Option>
//                                         <Option value="1">Induction</Option>
//                                         <Option value="2">Departmental</Option>
//                                     </Select>
//                                 </Box>

//                             </Tooltip>
//                             <Box sx={{}}>
//                                 <CssVarsProvider>
//                                     <IconButton variant="outlined" size='sm' color="primary" onClick={GetDetails}>
//                                         <SearchIcon />
//                                     </IconButton>
//                                 </CssVarsProvider>
//                             </Box>
//                         </Box>
//                         <Box sx={{ width: "100%", overflow: 'auto' }}>
//                             <Box sx={{ height: 750, display: 'flex', flexDirection: "column", mt: 2 }}>
//                                 <CommonAgGrid
//                                     columnDefs={columnDef}
//                                     tableData={EmpDetails}

//                                     sx={{
//                                         height: 700,
//                                         width: "100%",
//                                         mt: 1
//                                     }}
//                                     rowHeight={30}
//                                     headerHeight={30}
//                                 />
//                             </Box>
//                         </Box>
//                     </Box>
//                 </CustomLayout >
//             }
//         </Fragment >
//     )
// }
// export default memo(InductionDetailsMainpage) 
