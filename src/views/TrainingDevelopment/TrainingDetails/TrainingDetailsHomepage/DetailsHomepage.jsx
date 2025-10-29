
import { Box, Tooltip } from '@mui/material';
import React, { Fragment, memo, useCallback, useEffect, useMemo, useState } from 'react';
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
import CommonAgGrid from 'src/views/Component/CommonAgGrid';
import LaunchIcon from '@mui/icons-material/Launch';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { axioslogin } from 'src/views/Axios/Axios';
import moment from 'moment';
import { PdfTranning } from '../PdfTranning';
import EmpDetailsModal from '../EmpDetailsModal';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import InductionTableview from '../InductionTableview';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AddTrainingDatas from './AddTrainingDatas'
// import CustomBackDrop from 'src/views/Component/MuiCustomComponent/CustomBackDrop';

const DetailsHomepage = () => {
    const dispatch = useDispatch();

    const [dept, setdept] = useState(0);
    const [deptSec, setdeptSec] = useState(0);
    const [count, setCount] = useState(0);
    const [Emp_ID, setEmp_ID] = useState(0);
    const [Deptdata, setDeptData] = useState([]);
    const [selected, setSelected] = useState([]);
    const [open, setOpen] = useState(false);
    const [type, setType] = useState(0);
    const [Inductdata, setInductdata] = useState([]);
    const [Induct, setInduct] = useState(0);
    const [addBtn, setAddBtn] = useState(false);
    const [empTdata, setEmpTdata] = useState([]);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        dispatch(setDepartment());
    }, [dispatch, count]);

    const postdata = useMemo(() => ({ dept, deptSec, Emp_ID: parseInt(Emp_ID) }), [dept, deptSec, Emp_ID]);

    const handleClick = useCallback((params) => {
        const data = params.api.getSelectedRows();
        setSelected(data);
        setOpen(true);
    }, []);

    const AddDatas = useCallback((params) => {
        const datas = params.api.getSelectedRows();
        setEmpTdata(datas);
        setAddBtn(true);
    }, []);

    // const handlePdf = useCallback((params) => {
    //     const getdata = params.api.getSelectedRows();
    //     const { em_id } = getdata[0];
    //     setOpenBkDrop(true)
    //     const getTrainneerName = async (emid) => {
    //         const results = await axioslogin.get(`/TrainingDetails/getDepartmentalTrainers/${emid}`);
    //         return results.data;
    //     };

    //     const getDeptDatas = async () => {

    //         const emid = parseInt(em_id);
    //         const obj = { emid, preId: emid, postId: emid };
    //         const result = await axioslogin.post(`/TrainingDetails/getDepartmental`, obj);
    //         const { success, data } = result.data;

    //         if (success === 2) {
    //             setOpenBkDrop(false)
    //             const values = await getTrainneerName(emid);
    //             const { datas } = values;
    //             const showData = datas?.map((val) => {
    //                 const mapdata = data.find((item) => item.emp_name === val.emp_name && item.topic_slno === val.schedule_topics);
    //                 return {
    //                     trainer_name: val.trainer_name.toLowerCase(),
    //                     Dept_slno: mapdata.Dept_slno,
    //                     dept_post_mark: mapdata.training_status === 1 && mapdata.posttest_status === 1 ? mapdata.dept_post_mark : "NA",
    //                     dept_pre_mark: mapdata.training_status === 1 && mapdata.pretest_status === 1 ? mapdata.dept_pre_mark : "NA",
    //                     hours: mapdata.hours,
    //                     date: moment(mapdata.schedule_date).format("DD/MM/YY"),
    //                     training_topic_name: mapdata.training_topic_name.toLowerCase(),
    //                     Remark: mapdata.posttest_status === 1 && mapdata.pretest_status === 1 && mapdata.dept_post_mark >= 2 ? "Eligible" : "Not Eligible",
    //                     training_hod_apprvls_status: mapdata.training_hod_apprvls_status,
    //                     training_status: mapdata.training_status
    //                 };
    //             });
    //             PdfTranning(getdata[0], showData);
    //         }
    //     };
    //     getDeptDatas();
    // }, []);

    const handlePdf = useCallback((params) => {
        const getdata = params.api.getSelectedRows();
        const { em_id } = getdata[0];
        // setOpenBkDrop(true); // Show loader

        const getTrainneerName = async (emid) => {
            const results = await axioslogin.get(`/TrainingDetails/getDepartmentalTrainers/${emid}`);
            return results.data;
        };

        const getDeptDatas = async () => {
            try {
                const emid = parseInt(em_id);
                const obj = { emid, preId: emid, postId: emid };
                const result = await axioslogin.post(`/TrainingDetails/getDepartmental`, obj);
                const { success, data } = result.data;

                if (success === 2) {
                    // setOpenBkDrop(false);
                    const values = await getTrainneerName(emid);
                    const { datas } = values;

                    const showData = datas?.map((val) => {
                        const mapdata = data.find((item) =>
                            item.emp_name === val.emp_name &&
                            item.topic_slno === val.schedule_topics
                        );
                        return {
                            trainer_name: val.trainer_name.toLowerCase(),
                            Dept_slno: mapdata?.Dept_slno ?? '',
                            dept_post_mark:
                                mapdata?.training_status === 1 && mapdata?.posttest_status === 1
                                    ? mapdata.dept_post_mark
                                    : "NA",
                            dept_pre_mark:
                                mapdata?.training_status === 1 && mapdata?.pretest_status === 1
                                    ? mapdata.dept_pre_mark
                                    : "NA",
                            hours: mapdata?.hours ?? '',
                            date: mapdata ? moment(mapdata.schedule_date).format("DD/MM/YY") : '',
                            training_topic_name: mapdata?.training_topic_name?.toLowerCase() ?? '',
                            Remark:
                                mapdata?.posttest_status === 1 &&
                                    mapdata?.pretest_status === 1 &&
                                    mapdata?.dept_post_mark >= 2
                                    ? "Eligible"
                                    : "Not Eligible",
                            training_hod_apprvls_status: mapdata?.training_hod_apprvls_status ?? '',
                            training_status: mapdata?.training_status ?? '',
                        };
                    }); PdfTranning(getdata[0], showData);
                } else {
                    // setOpenBkDrop(false);
                    warningNofity("No training data found for this employee.");
                }
            } catch (error) {
                // setOpenBkDrop(false);
                warningNofity("Failed to generate PDF.");
            } finally {
                setLoading(false)
                // setOpenBkDrop(false); // Hide loader in all cases
            }
        };

        getDeptDatas();
    }, []);


    const columnDef = useMemo(() => [
        { headerName: 'Sl No', field: 'slnum', filter: true, width: 300 },
        { headerName: 'Employee ID', field: 'em_no', filter: true, width: 315 },
        { headerName: 'Employee Names', field: 'em_name', filter: true, width: 400 },
        {
            headerName: 'View', width: 200,
            cellRenderer: params => (
                <Tooltip title="View More">
                    <IconButton onClick={() => handleClick(params)}><LaunchIcon /></IconButton>
                </Tooltip>
            )
        },
        {
            headerName: 'Pdf', width: 200,
            cellRenderer: params => (
                <Tooltip title="Pdf View">
                    <IconButton disabled={loading} onClick={() => handlePdf(params)}><PictureAsPdfIcon /></IconButton>
                </Tooltip>
            )
        },
        {
            headerName: 'Add More', width: 200,
            cellRenderer: params => (
                <Tooltip title="Add More Details">
                    <IconButton onClick={() => AddDatas(params)}><AddCircleIcon /></IconButton>
                </Tooltip>
            )
        }
    ], [handleClick, handlePdf, AddDatas]);

    const GetDetails = useCallback(async () => {
        if (type === 0) {
            warningNofity("Please select any Training Type");
            return;
        }

        const fetchData = async () => {
            try {
                if (type === "2") {
                    if (Emp_ID !== 0 && dept === 0 && deptSec === 0) {
                        const result = await axioslogin.get(`/TrainingDetails/getDeptEmp/${Emp_ID}`);
                        const { success, data } = result.data;
                        if (success === 2) {
                            setDeptData(data);
                            setCount(prev => prev + 1);
                        } else {
                            warningNofity("No data shown");
                            setDeptData([]);
                        }
                        setEmp_ID(0);
                    } else if (dept !== 0 && deptSec !== 0) {
                        const result = Emp_ID !== '' ?
                            await axioslogin.post(`/TrainingDetails/getEMPDepartmentalDetails`, postdata) :
                            await axioslogin.post(`/TrainingDetails/getDepartmentalDetails`, postdata);

                        const { success, data } = result.data;
                        if (success === 2) {
                            setDeptData(data);
                            setCount(prev => prev + 1);
                        } else {
                            warningNofity("No data shown");
                            setDeptData([]);
                        }
                        setEmp_ID(0);
                    }
                } else if (type === "1") {
                    setInduct(1);
                    if (Emp_ID !== 0 && dept === 0 && deptSec === 0) {
                        const result = await axioslogin.get(`/TrainingDetails/getInductEmp/${Emp_ID}`);
                        const { success, data } = result.data;
                        if (success === 2) {
                            setInductdata(data);
                            setCount(prev => prev + 1);
                        } else {
                            warningNofity("No data shown");
                            setInductdata([]);
                        }
                        setEmp_ID(0);
                    } else if (dept !== 0 && deptSec !== 0) {
                        const result = Emp_ID !== '' ?
                            await axioslogin.post(`/TrainingDetails/getInductionEMPDetails`, postdata) :
                            await axioslogin.post(`/TrainingDetails/getInductionDetails`, postdata);

                        const { success, data } = result.data;
                        if (success === 2) {
                            setInductdata(data);
                            setCount(prev => prev + 1);
                        } else {
                            warningNofity("No data shown");
                            setInductdata([]);
                        }
                        setEmp_ID(0);
                    }
                }
                setdept(0);
                setdeptSec(0);
                setType(0);
            } catch (error) {
                warningNofity("Something went wrong!");
            }
        };

        fetchData();
    }, [Emp_ID, dept, deptSec, postdata, type]);


    return (
        <Fragment>
            {/* <CustomBackDrop open={openBkDrop} text="Please wait !. PDF In Process"> */}
            <ToastContainer />
            {addBtn === true ? (
                <AddTrainingDatas empTdata={empTdata} addBtn={addBtn} setAddBtn={setAddBtn} />
            ) : open ? (
                <EmpDetailsModal open={open} Setopen={setOpen} selected={selected} />
            ) : (
                <CustomLayout title="Training Details" displayClose={true}>
                    <Box sx={{ width: "100%", p: 1 }}>
                        <Box sx={{ p: 1, width: "100%", display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                            <Tooltip title="Select Department">
                                <Box sx={{ flex: 1 }}>
                                    <DepartmentDropRedx getDept={setdept} />
                                </Box>
                            </Tooltip>

                            <Tooltip title="Select Department Section">
                                <Box sx={{ flex: 1 }}>
                                    <DepartmentSectionRedx getSection={setdeptSec} />
                                </Box>
                            </Tooltip>

                            <Box sx={{ flex: 1 }}>
                                <JoyInput size="sm" value={Emp_ID} onchange={setEmp_ID} name="Employee_ID" placeholder="Employee ID" />
                            </Box>

                            <Tooltip title="Select Training Type">
                                <Box sx={{ flex: 1 }}>
                                    <Select value={type} onChange={(e, val) => setType(val)} size="md" variant="outlined">
                                        <Option value={0}>Select Training Type</Option>
                                        <Option value="1">Induction</Option>
                                        <Option value="2">Departmental</Option>
                                    </Select>
                                </Box>
                            </Tooltip>

                            <Box>
                                <CssVarsProvider>
                                    <IconButton variant="outlined" size="sm" color="primary" onClick={GetDetails}>
                                        <SearchIcon />
                                    </IconButton>
                                </CssVarsProvider>
                            </Box>
                        </Box>

                        {Induct === 1 ? (
                            <InductionTableview Inductdata={Inductdata} SetInductdata={setInductdata} />
                        ) : (
                            <Box sx={{ width: "100%", overflow: "auto" }}>
                                <Box sx={{ height: 750, display: "flex", flexDirection: "column", mt: 2 }}>
                                    <CommonAgGrid
                                        columnDefs={columnDef}
                                        tableData={Deptdata}
                                        sx={{ height: 700, width: "100%", mt: 1 }}
                                        rowHeight={30}
                                        headerHeight={30}
                                    />
                                </Box>
                            </Box>
                        )}
                    </Box>
                </CustomLayout>
            )}
            {/* </CustomBackDrop> */}
        </Fragment>


    );
};

export default memo(DetailsHomepage);