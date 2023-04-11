import React, { Fragment, memo, useCallback, useContext, useEffect, useState, lazy } from 'react'
import { useHistory } from 'react-router'
import { PayrolMasterContext } from 'src/Context/MasterContext'
import Tooltip from "@material-ui/core/Tooltip";
import { HrLeave, getleaverequest, Hrhalfdayrequest, getHRnopunchrequst, compensatoryHr, getAllHr, infoNofity } from 'src/views/CommonCode/Commonfunc';
import PageLayoutCloseOnly from 'src/views/CommonCode/PageLayoutCloseOnly';
import { Box, IconButton, Paper } from '@mui/material';
import DeptSectionAllSelect from 'src/views/MuiComponents/DeptSectionAllSelect';
import { Checkbox, CssVarsProvider, Radio, RadioGroup, Typography } from '@mui/joy';
import CommonAgGrid from 'src/views/Component/CommonAgGrid'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CommonCheckBox from 'src/views/Component/CommonCheckBox'
import { axioslogin } from 'src/views/Axios/Axios';
import { format } from 'date-fns';
import LeavRqModel from '../LeaveCommonComponent/LeavRqModel';
import { useDispatch, useSelector } from 'react-redux';
import HaldayRqModel from '../LeaveCommonComponent/HaldayRqModel';
import NopunchRqModel from '../LeaveCommonComponent/NopunchRqModel';
import CompOffRqModel from '../LeaveCommonComponent/CompOffRqModel';
import { getCompOffRqstAll, getHalfdayRqstAll, getLeaveRequestAll, getNopunchRqstAll } from 'src/redux/actions/LeaveApprovalAction';
import _ from 'underscore';
import BeenhereIcon from '@mui/icons-material/Beenhere';
import { Suspense } from 'react';

const LeaveRequestModal = lazy(() => import('./Modal/LeaveRequestModal'));
const CompansatoryOff = lazy(() => import('./Modal/CompansatoryOff'));
const NoPunchLeaveRequest = lazy(() => import('./Modal/NoPunchLeaveRequest'));
const HalfDayLeaveRequest = lazy(() => import('./Modal/HalfDayLeaveRequest'));

const ApprovalHR = () => {

    const history = useHistory()
    const dispatch = useDispatch()

    const [count, setCount] = useState(0)

    useEffect(() => {
        dispatch(getLeaveRequestAll())
        dispatch(getHalfdayRqstAll())
        dispatch(getNopunchRqstAll())
        dispatch(getCompOffRqstAll())
    }, [dispatch, count])

    //API DATA 
    const halfdayRqList = useSelector(state => state.setAllLeaveApproval.halfdayRqData.halfdayRqList, _.isEqual);
    const leaveRqList = useSelector(state => state.setAllLeaveApproval.leaveRqData.leaveRqList, _.isEqual);
    const nopunchRqList = useSelector(state => state.setAllLeaveApproval.nopunchRqData.nopunchRqList, _.isEqual);
    const compOffRqList = useSelector(state => state.setAllLeaveApproval.compOffrqData.compOffRqList, _.isEqual);

    // HR APPROVLA REQUEST FORM DATA STATE
    const [deptsect, setDeptSect] = useState(0)
    const [leaverequesttype, setleaverequesttype] = useState([]);
    const [value, setValue] = useState(1);
    const [tableData, setTableData] = useState([])

    //LEAVE TYPE GET FUNCTION FROM DB
    useEffect(() => {
        getleaverequest().then((val) => {
            setleaverequesttype(val)
        })
    }, [getleaverequest, setleaverequesttype])

    //RADIO BUTTON HANDLE FUNCTION
    const handleChangeRadioBtn = useCallback(async (event) => {
        let radioBtnVal = event.target.value;
        setValue(radioBtnVal);

        //CALCULATE AND FILTER THE FUNCTION

        // {lrequest_slno: 1, lrequest_short: 'LR', lrequest_type: 'LEAVE REQUEST'}
        // {lrequest_slno: 2, lrequest_short: 'HDLR', lrequest_type: 'HALF DAY LEAVE REQUEST'}
        // {lrequest_slno: 3, lrequest_short: 'NOP', lrequest_type: 'NO PUNCH'}
        // {lrequest_slno: 4, lrequest_short: 'COFF', lrequest_type: 'COMPANSATORY OFF'}

        if (radioBtnVal === '1') {
            //LEAVE REQUEST 
            if (Object.keys(leaveRqList).length > 0) {
                const leaveRequestList = await leaveRqList?.map((val) => {
                    return {
                        slno: val.lve_uniq_no,
                        emno: val.em_no,
                        name: val.em_name,
                        section: val.dept_name,
                        status: (val.inc_apprv_req === 1 && val.incapprv_status === 0) ? 'Incharge Approval Pending' :
                            (val.hod_apprv_req === 1 && val.hod_apprv_status === 0) ? 'HOD Approval Pending' :
                                (val.ceo_req_status === 1 && val.ceo_apprv_status === 0) ? 'CEO Approval Pending' :
                                    (val.hr_aprrv_requ === 1 && val.hr_apprv_status === 0) ? 'HR Approval Pending' : 'Approved',
                        hrstatus: val.hr_apprv_status,
                        code: 1,
                        reqDate: val.request_date,
                        fromDate: val.leave_date,
                        toDate: val.leavetodate
                    }
                })

                setTableData(leaveRequestList)
            } else {
                infoNofity('No Leave Request Found')
            }
        } else if (radioBtnVal === '2') {
            //HALF DAY LEAVE REQUEST
            if (Object.keys(halfdayRqList).length > 0) {
                const leaveRequestList = await halfdayRqList?.map((val) => {
                    return {
                        slno: val.half_slno,
                        emno: val.em_no,
                        name: val.em_name,
                        section: val.dept_name,
                        status: (val.hf_inc_apprv_req === 1 && val.hf_incapprv_status === 0) ? 'Incharge Approval Pending' :
                            (val.hf_hod_apprv_req === 1 && val.hf_hod_apprv_status === 0) ? 'HOD Approval Pending' :
                                (val.hf_ceo_req_status === 1 && val.hf_ceo_apprv_status === 0) ? 'CEO Approval Pending' :
                                    (val.hf_hr_aprrv_requ === 1 && val.hf_hr_apprv_status === 0) ? 'HR Approval Pending' : 'Approved',
                        hrstatus: val.hf_hr_apprv_status,
                        code: 2,
                        reqDate: val.request_date,
                        fromDate: val.leave_date,
                        toDate: val.leavetodate
                    }
                })

                setTableData(leaveRequestList)
            } else {
                infoNofity('No Leave Request Found')
            }
        } else if (radioBtnVal === '3') {
            //NO PUNCH
            if (Object.keys(nopunchRqList).length > 0) {
                const leaveRequestList = await nopunchRqList?.map((val) => {
                    return {
                        slno: val.nopunch_slno,
                        emno: val.em_no,
                        name: val.em_name,
                        section: val.dept_name,
                        status: (val.np_inc_apprv_req === 1 && val.np_incapprv_status === 0) ? 'Incharge Approval Pending' :
                            (val.np_hod_apprv_req === 1 && val.np_hod_apprv_status === 0) ? 'HOD Approval Pending' :
                                (val.np_ceo_req_status === 1 && val.np_ceo_apprv_status === 0) ? 'CEO Approval Pending' :
                                    (val.np_hr_aprrv_requ === 1 && val.np_hr_apprv_status === 0) ? 'HR Approval Pending' : 'Approved',
                        hrstatus: val.np_hr_apprv_status,
                        code: 3,
                        reqDate: val.request_date,
                        fromDate: val.leave_date,
                        toDate: val.leavetodate
                    }
                })

                setTableData(leaveRequestList)
            } else {
                infoNofity('No Leave Request Found')
            }

        } else if (radioBtnVal === '4') {
            //COMPANSATORY OFF
            if (Object.keys(compOffRqList).length > 0) {
                const leaveRequestList = await compOffRqList?.map((val) => {
                    return {
                        slno: val.cmp_off_reqid,
                        emno: val.em_no,
                        name: val.em_name,
                        section: val.dept_name,
                        status: (val.cf_inc_apprv_req === 1 && val.cf_incapprv_status === 0) ? 'Incharge Approval Pending' :
                            (val.cf_hod_apprv_req === 1 && val.cf_hod_apprv_status === 0) ? 'HOD Approval Pending' :
                                (val.cf_ceo_req_status === 1 && val.cf_ceo_apprv_status === 0) ? 'CEO Approval Pending' :
                                    (val.cf_hr_aprrv_requ === 1 && val.cf_hr_apprv_status === 0) ? 'HR Approval Pending' : 'Approved',
                        hrstatus: val.cf_hr_apprv_status,
                        code: 4,
                        reqDate: val.request_date,
                        fromDate: val.leave_date,
                        toDate: val.leavetodate
                    }
                })

                setTableData(leaveRequestList)
            } else {
                infoNofity('No Leave Request Found')
            }
        }
    }, [halfdayRqList, leaveRqList, nopunchRqList, compOffRqList, value]);

    // console.log(leaveRqList)
    useEffect(async () => {
        if (Object.keys(leaveRqList).length > 0) {
            const leaveRequestList = await leaveRqList?.map((val) => {
                return {
                    slno: val.lve_uniq_no,
                    emno: val.em_no,
                    name: val.em_name,
                    section: val.dept_name,
                    status: (val.inc_apprv_req === 1 && val.incapprv_status === 0) ? 'Incharge Approval Pending' :
                        (val.hod_apprv_req === 1 && val.hod_apprv_status === 0) ? 'HOD Approval Pending' :
                            (val.ceo_req_status === 1 && val.ceo_apprv_status === 0) ? 'CEO Approval Pending' :
                                (val.hr_aprrv_requ === 1 && val.hr_apprv_status === 0) ? 'HR Approval Pending' : 'Approved',
                    hrstatus: val.hr_apprv_status,
                    code: 1,
                    reqDate: val.request_date,
                    fromDate: val.leave_date,
                    toDate: val.leavetodate
                }
            })

            setTableData(leaveRequestList)
        }
    }, [leaveRqList])

    const [columnDef] = useState([
        { headerName: 'Slno', field: 'slno', filter: true, minWidth: 100 },
        { headerName: 'ID#', field: 'emno', filter: true, minWidth: 100 },
        { headerName: 'Name ', field: 'name', filter: true, minWidth: 200 },
        { headerName: 'Department Section', field: 'section', filter: true, minWidth: 200 },
        { headerName: 'Status ', field: 'status', minWidth: 200 },
        {
            headerName: 'Action',
            cellRenderer: params => {
                if (params.data.hrstatus === 1) {
                    return <IconButton
                        sx={{ paddingY: 0.5, cursor: 'none' }}  >
                        <Tooltip title="Approved Request">
                            <BeenhereIcon />
                        </Tooltip>
                    </IconButton>
                } else {
                    return <IconButton onClick={() => handleClickIcon(params)}
                        sx={{ paddingY: 0.5 }} >
                        <Tooltip title="Click Here to Approve / Reject">
                            <CheckCircleOutlineIcon color='primary' />
                        </Tooltip>
                    </IconButton>
                }
            }
        },
    ])

    // const [leavereq, setleavereqst] = useState([])
    // const [leavereqmast, setmastleavereqst] = useState([])
    // const [leavereqstAll, setLeavRqstAll] = useState([])
    // const [deptlvRqst, setDptlvRqst] = useState([])
    // const [leavestatedetail, setleavestatedetails] = useState([])

    // // get nopunch request
    // const [nopunch, setnopunch] = useState([])
    // const [nopunchmast, setmastnopunch] = useState([])
    // const [nopunchall, setnopunchall] = useState([])
    // const [deptnopunch, setdeptNopunch] = useState([])

    // // get halfdayrequest
    // const [halfday, sethalfday] = useState([])
    // const [halfdaymast, setmasthalfday] = useState([])
    // const [halfdayAll, setHalfdayAll] = useState([])
    // const [depthlfday, setDepthlfday] = useState([])
    // const [hafdaydata, sethalfdata] = useState([])

    // //compensatory off details
    // const [compensetory, setcompensetory] = useState([])
    // const [compensetorymast, setmastcompensetory] = useState([])
    // const [coffAll, setCoffAll] = useState([])
    // const [deptCoff, setDeptCoff] = useState([])
    // const [comoffsetdata, setcomoff] = useState([])

    // //for hr special approval for long leave
    // const [spclapproval, setspclapproval] = useState([])
    // const [reqtype, setreqtype] = useState([])
    // const [leaveremastdata, setleavereqmastdata] = useState([
    //     {
    //         emno: '',
    //         leave_date: '',
    //         leavetodate: '',
    //         nodays: '',
    //         reqtype: '',
    //         lve_uniq_no: '',
    //         leave_reason: ''
    //     }
    // ])
    // const [allData, setalldata] = useState([])
    // const [openleave, setOpenleave] = useState(false);
    // const [opennopunch, setOpennopunch] = useState(false);
    // const [opencompen, setOpencompen] = useState(false);
    // const [openhalf, setOpenhalf] = useState(false);
    // const [count, setcount] = useState(0)

    // const em_id = useSelector((state) => {
    //     return state?.getProfileData?.ProfileData[0]?.em_id ?? 0;
    // })

    // //use effect for getting pending leave requests
    // useEffect(() => {
    //     HrLeave().then((val) => {
    //         setleavereqst(val)
    //         setmastleavereqst(val)
    //     })
    //     getleaverequest().then((val) => {
    //         setleaverequesttype(val)
    //     })
    //     getHRnopunchrequst().then((val) => {
    //         setnopunch(val)
    //         setmastnopunch(val)
    //     })
    //     Hrhalfdayrequest().then((val) => {
    //         sethalfday(val)
    //         setmasthalfday(val)
    //     })
    //     compensatoryHr().then((val) => {
    //         setcompensetory(val)
    //         setmastcompensetory(val)
    //     })
    //     HrLeave().then((val) => {
    //         setspclapproval(val)
    //     })
    //     getAllHr().then((val) => {
    //         setalldata(val)
    //     })
    //     setcount(0)

    // }, [count]);
    // //use effect for filtering pending leave request against department section
    // useEffect(() => {
    //     if (levtpevalue === '1' && deptsect !== 0) {
    //         // depsection change filter based on dept section leave request
    //         const filterleavereq = leavereqmast.filter((val) => {
    //             return (val.dept_section === deptsect)
    //         })
    //         setDptlvRqst(filterleavereq)
    //     }
    //     else if (levtpevalue === '2' && deptsect !== 0) {
    //         // depsection change filter based on dept section halfday
    //         const filterhalfday = halfdaymast.filter((val) => {
    //             return (val.dept_section === deptsect)
    //         })
    //         setDepthlfday(filterhalfday)
    //     }
    //     else if (levtpevalue === '3' && deptsect !== 0) {

    //         // depsection change filter based on dept section no punch
    //         const filternopunch = nopunchmast.filter((val) => {
    //             return (val.dept_section === deptsect)
    //         })
    //         setdeptNopunch(filternopunch)
    //     }
    //     else if (levtpevalue === '1' && deptsect !== 0) {
    //         // depsection change filter based on dept section setcompensetory
    //         const filtercompen = compensetorymast.filter((val) => {
    //             return (val.dept_section === deptsect)
    //         })
    //         setDeptCoff(filtercompen)
    //     }
    //     else if (levtpevalue === '1' && deptsect === 0) {
    //         setLeavRqstAll(leavereq)
    //     }
    //     else if (levtpevalue === '2' && deptsect === 0) {
    //         setHalfdayAll(halfday)
    //     } else if (levtpevalue === '3' && deptsect === 0) {
    //         setnopunchall(nopunch)
    //     } else if (levtpevalue === '4' && deptsect === 0) {
    //         setCoffAll(compensetory)
    //     }
    // }, [deptsect, levtpevalue, leavereq, halfday, nopunch, compensetory])
    // //return to home page
    // const RedirectToProfilePage = () => {
    //     history.push(`/Home`)
    // }



    //redux

    // useEffect(() => {
    //     dispatch(getLeaveRequestAll())
    //     dispatch(getHalfdayRqstAll())
    //     dispatch(getNopunchRqstAll())
    //     dispatch(getCompOffRqstAll())
    // }, [dispatch])

    // const state = useSelector((state) => {
    //     //console.log(state.setAllLeaveApproval.halfdayRqData.halfdayRqList);
    //     // console.log(state.setAllLeaveApproval.leaveRqData.leaveRqList);
    //     //console.log(state.setAllLeaveApproval.nopunchRqData.nopunchRqList)
    //     console.log(state.setAllLeaveApproval.compOffrqData.compOffRqList)
    // })



    // const handleClick = async (params) => {
    //     const data = params.api.getSelectedRows()
    //     const { req_type, SlNo } = data[0]
    //     setreqtype(req_type)
    //     if (req_type === 1) {
    //         const result = await axioslogin.get(`/LeaveRequestApproval/${SlNo}`)
    //         const { success, data } = result.data;
    //         if (success === 1) {
    //             const leaveredat =
    //                 data.map((val) => {
    //                     const d1 = {
    //                         leave_date: format(new Date(val.leave_date), 'yyyy-MM-dd'),
    //                         leavetodate: format(new Date(val.leavetodate), 'yyyy-MM-dd'),
    //                         nodays: val.no_of_leave,
    //                         reqtype: val.reqtype,
    //                         leave_slno: val.leave_slno,
    //                         emno: val.em_no,
    //                         lve_uniq_no: val.lve_uniq_no,
    //                         leave_reason: val.leave_reason
    //                     }
    //                     return d1
    //                 })
    //             setleavereqmastdata(leaveredat)
    //             // api for getting leave request details from hrm_leave_request_detl
    //             const resultdel = await axioslogin.get(`/LeaveRequestApproval/getlevereqdetl/${SlNo}`)
    //             if (resultdel.data.success === 1) {
    //                 setleavestatedetails(resultdel.data.data)
    //             }
    //             setOpenleave(true)
    //         }
    //     } // if leave request type is half day 
    //     else if (req_type === 2) {
    //         const result = await axioslogin.get(`/LeaveRequestApproval/half/gethalfdaydetl/${SlNo}`)
    //         const { success, data } = result.data;
    //         if (success === 1) {
    //             sethalfdata(data)
    //         }
    //         setOpenhalf(true)
    //         //if no punch request
    //     } else if (req_type === 3) {
    //         const result = await axioslogin.get(`/LeaveRequestApproval/leave/nopunch/getnopunchreq/${SlNo}`)
    //         const { success, data } = result.data;
    //         if (success === 1) {
    //             setnopunch(data)
    //         }
    //         setOpennopunch(true)
    //     }
    //     //if compensatory leave request
    //     else if (req_type === 4) {
    //         const result = await axioslogin.get(`/LeaveRequestApproval/leave/com/compensatory/compensatoryoffdata/${SlNo}`)
    //         const { success, data } = result.data;
    //         if (success === 1) {
    //             setcomoff(data)
    //         }
    //         setOpencompen(true);
    //     }
    // }

    // const handleClose = () => {
    //     setOpenleave(false);
    //     setOpennopunch(false);
    //     setOpencompen(false);
    //     setOpenhalf(false);
    // };

    //MODAL STATES FOR RENDERING OPEN MODAL & UPDATE DATA
    const [leaveReqModal, setleaveReqModal] = useState(false);
    const [coffReqModal, setcoffReqModal] = useState(false);
    const [halfDayReqModal, sethalfDayReqModal] = useState(false);
    const [noPunchReqModal, setnoPunchReqModal] = useState(false);

    //UPDATE DATA
    const [lveData, setlveData] = useState({});
    const [coffData, setcoffData] = useState({});
    const [halfData, sethalfData] = useState({});
    const [noPunchData, setnoPunchData] = useState({});

    //MODAL OPENING FUNCTION
    let handleClickIcon = useCallback(async (table) => {
        const { code } = table.data;
        if (code === 1) {
            setlveData(table.data)
            setleaveReqModal(true)
        } else if (code === 2) {
            sethalfData(table.data)
            sethalfDayReqModal(true)
        } else if (code === 3) {
            setnoPunchData(table.data)
            setnoPunchReqModal(true)
        } else if (code === 4) {
            setcoffData(table.data)
            setcoffReqModal(true)
        }

    }, [])


    const RedirectToProfilePage = () => {
        history.push(`/Home`)
    }

    return (
        <Fragment>
            <Suspense>
                <LeaveRequestModal open={leaveReqModal} setOpen={setleaveReqModal} data={lveData} setCount={setCount} />
                <CompansatoryOff open={coffReqModal} setOpen={setcoffReqModal} data={coffData} setCount={setCount} />
                <NoPunchLeaveRequest open={noPunchReqModal} setOpen={setnoPunchReqModal} data={noPunchData} setCount={setCount} />
                <HalfDayLeaveRequest open={halfDayReqModal} setOpen={sethalfDayReqModal} data={halfData} setCount={setCount} />
            </Suspense>
            <PageLayoutCloseOnly
                heading="Leave Approval HR"
                redirect={RedirectToProfilePage}
            >
                <Paper variant="outlined" square sx={{ display: 'flex', flex: 1, mb: 0.4, p: 0.8, alignItems: 'center' }} >
                    <Box sx={{ display: 'flex', flex: 2 }}>
                        <CssVarsProvider>
                            {
                                <RadioGroup
                                    defaultValue="female"
                                    name="controlled-radio-buttons-group"
                                    value={value}
                                    onChange={handleChangeRadioBtn}
                                    sx={{ display: 'flex', flexDirection: 'row', flex: 1 }}
                                    size="lg"
                                >
                                    {
                                        leaverequesttype && leaverequesttype?.map((val, idx) => {
                                            return <Box key={idx} sx={{ display: 'flex', flex: 1 }}>
                                                <Radio
                                                    value={val.lrequest_slno}
                                                    label={val.lrequest_type}
                                                    color="success"
                                                    variant="outlined"
                                                />
                                            </Box>
                                        })
                                    }
                                </RadioGroup>
                            }
                        </CssVarsProvider>
                    </Box>
                </Paper>
                <Paper square elevation={0} sx={{ pt: 1, mt: 0.5, display: 'flex', flexDirection: "column" }} >
                    <CommonAgGrid
                        columnDefs={columnDef}
                        tableData={tableData}
                        sx={{
                            height: 600,
                            width: "100%"
                        }}
                        rowHeight={30}
                        headerHeight={30}
                    />
                </Paper>
            </PageLayoutCloseOnly>
        </Fragment >
    )
}

export default memo(ApprovalHR)
