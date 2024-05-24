import React, { memo, lazy } from 'react'
import { Paper, Box, Typography } from '@mui/material'
import { useSelector } from 'react-redux';
import _ from 'underscore';
import { useMemo } from 'react';
import { Form } from 'react-bootstrap';
import { Button, CssVarsProvider, Textarea, Tooltip, Typography as Typo } from '@mui/joy';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import { add, differenceInCalendarDays, eachDayOfInterval, format, lastDayOfMonth, startOfMonth } from 'date-fns';
import moment from 'moment';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { useState } from 'react';
import { errorNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';
import { getleaverequest } from 'src/views/Constant/Constant';
import { axioslogin } from 'src/views/Axios/Axios';
import { Actiontypes } from 'src/redux/constants/action.type'
import CustomBackDrop from 'src/views/Component/MuiCustomComponent/CustomBackDrop';
import { getannualleave } from 'src/redux/actions/Profile.action';
import { fetchleaveInformationFun } from './Func/LeaveFunction';
import {
    getEmployeeInformation,
    getCreditedCasualLeave, getCreitedCommonLeave, getCreitedHolidayLeave,
    getCreitedCompansatoryOffLeave, getCreditedEarnLeave, getEmpCoffData,
} from 'src/redux/actions/LeaveReqst.action';
// lazy import 
// const MultiLeaveTypeSelectCmp = lazy(() => import('./Func/MultiLeaveTypeSelectCmp'));
const MuliLeaveMapCmp = lazy(() => import('./MuliLeaveMapCmp'));

const MultiLeaveRequestForm = () => {

    const { FETCH_LEAVE_REQUEST, LEAVE_REQ_DEFAULT } = Actiontypes;
    const dispatch = useDispatch();
    const [newData, setnewData] = useState([]);
    const [levRequestNo, setLevRequestNo] = useState(0);
    const [reason, setReason] = useState('');
    const [drop, setDropOpen] = useState(false)

    const changeForm = useCallback(() => {
        let requestType = { requestType: 0 };
        dispatch({ type: FETCH_LEAVE_REQUEST, payload: requestType })
        dispatch({ type: LEAVE_REQ_DEFAULT })
    }, [dispatch, FETCH_LEAVE_REQUEST, LEAVE_REQ_DEFAULT])

    //request selected employee details after the submit button pn;y changes
    // const empDetl = useSelector((state) => state.getLeaveRequestInfom.empDetl, _.isEqual);
    // const reqEmpDetl = useMemo(() => empDetl, [empDetl]);
    // const { em_no, requestType, deptSection } = reqEmpDetl;

    //get the employee details for taking the HOd and Incharge Details
    const getEmployeeInformations = useSelector((state) => state.getEmployeeInformationState.empData, _.isEqual);
    const employeeApprovalLevels = useSelector((state) => state.getEmployeeApprovalLevel.payload, _.isEqual);
    const singleLeaveTypeData = useSelector((state) => state.getEmpLeaveData.commonLeave, _.isEqual);
    const commonState = useSelector((state) => state.getCommonSettings, _.isEqual);

    const selectedEmployeeDetl = useMemo(() => getEmployeeInformations, [getEmployeeInformations])

    const empApprovalLevel = useMemo(() => employeeApprovalLevels, [employeeApprovalLevels])
    const CommonLeaveType = useMemo(() => singleLeaveTypeData, [singleLeaveTypeData]);
    const commonSetting = useMemo(() => commonState, [commonState])

    const { hod, incharge, authorization_incharge, authorization_hod } = empApprovalLevel

    const {
        em_no, em_id,
        em_department, em_dept_section,
        hod: empHodStat,
        //incharge: empInchrgStat
    } = selectedEmployeeDetl?.[0];

    useEffect(() => {
        if (hod === 0 && incharge === 0) {
            const data = { em_id: em_id }
            dispatch(getCreditedCasualLeave(em_id));
            dispatch(getCreitedCommonLeave(data));
            dispatch(getCreitedHolidayLeave(em_id));
            dispatch(getCreitedCompansatoryOffLeave(em_id));
            dispatch(getCreditedEarnLeave(em_id));
            dispatch(getannualleave(em_id))
            dispatch(getEmployeeInformation(em_id))
        }
        const postData = {
            count: commonSetting?.comp_day_count,
            em_id: em_id
        }
        dispatch(getEmpCoffData(postData))
    }, [incharge, hod, dispatch, em_id, commonSetting])

    useEffect(() => {
        getleaverequest().then((val) => setLevRequestNo(val))
    }, [])

    // selected form data 
    const multiLeaveTypeFormData = useSelector((state) => state.singleLeaveRequestFormState.leaveReqState, _.isEqual);
    const multiLeaveTypeData = useMemo(() => multiLeaveTypeFormData, [multiLeaveTypeFormData])

    const { fromDate, toDate } = multiLeaveTypeData;

    //get the date interwal

    const numberOfDays = differenceInCalendarDays(new Date(toDate), new Date(fromDate)) + 1;

    useEffect(() => {
        const intervalDate = eachDayOfInterval({ start: new Date(fromDate), end: new Date(toDate) }).map((date) => moment(date).format('YYYY-MM-DD'))
        const leaveSelectedData = intervalDate.map((val, ind) => {
            return {
                index: ind,
                "date": val,
                "leaveTypeSlno": 0,
                "leaveTypeName": '',
                "selectedLveSlno": 0,
                "selectedLeaveTypeName": '',
                "leaveDate": '',
                "selectedLeaveName": '',
            }
        })

        setnewData(leaveSelectedData)
    }, [fromDate, toDate]);

    //allowed leave type 

    // const state = useSelector((state) => state.getPrifileDateEachEmp.empLeaveData);
    // const allowedLeaveData = useMemo(() => state, [state]);

    //allowed leave details against leave type

    //leave request selection

    const handleChangeLeaveRequest = useCallback(async (leveTypeData, leaveDetl) => {
        //filter the leaves for duplication and get the post data
        const duplicateLeaveSelection = newData?.map((val) => val.selectedLveSlno).includes(leaveDetl?.selectedLveSlno);
        const duplicateLeaveSelections = newData?.map((val) => val.lveTypeName).includes(leaveDetl?.lveTypeName);

        if (duplicateLeaveSelection === true && duplicateLeaveSelections === true) {
            warningNofity("You are Already Selected This Leaves");
        } else {
            // leave add to the map
            const newSelectedLeaveData = newData?.map((val) => {
                if (val?.index === leveTypeData?.index) {
                    return {
                        ...val,
                        "leaveTypeSlno": leveTypeData?.leaveType,
                        "leaveTypeName": leaveDetl?.lveTypeName,
                        "singleLeave": leveTypeData?.singleLeave,
                        "selectedLveSlno": 0,
                        "selectedLeaveTypeName": leaveDetl?.lveTypeName,
                        "leaveDate": '',
                        "selectedLeaveName": '',
                    }
                } else if (val?.index === leaveDetl?.index) {
                    return {
                        ...val,
                        "leaveTypeName": leaveDetl?.lveTypeName,
                        "selectedLveSlno": parseInt(leaveDetl?.selectedLveSlno),
                        "selectedLeaveTypeName": leaveDetl?.lveTypeName,
                        "leaveDate": leaveDetl?.lveDate,
                        "selectedLeaveName": leaveDetl?.leave,
                    }
                } else {
                    return {
                        ...val,

                    }

                }
            })
            setnewData(newSelectedLeaveData)
        }
    }, [newData])


    // multi leave request  submit function
    const leaveRequestSubmitFun = useCallback(async () => {
        setDropOpen(true)
        // requested form information
        const { fromDate, toDate } = multiLeaveTypeData;

        // leave request master table post data
        const postData = {
            leaveid: levRequestNo,
            em_id: em_id,
            em_no: em_no,
            em_department: em_department,
            em_dept_section: em_dept_section,
            leavefrom_date: fromDate,
            leavetodate: toDate,
            attendance_marking_month: moment(startOfMonth(new Date(fromDate))).format('YYYY-MM-DD'),
            rejoin_date: format(add(new Date(toDate), { days: 1 }), "yyyy-MM-dd"),
            request_status: 1,
            inc_apprv_req:
                (authorization_incharge === 1 && incharge === 1) ? 1 :
                    (authorization_incharge === 1 && incharge === 0) ? 1 :
                        (authorization_incharge === 0 && incharge === 1) ? 1 : 0,
            incapprv_status:
                (authorization_incharge === 1 && incharge === 1) ? 1 :
                    (hod === 1) ? 1 :
                        (authorization_incharge === 0 && incharge === 1) ? 1 : 0,
            inc_apprv_cmnt:
                (authorization_incharge === 1 && incharge === 1) ? "DIRECT" :
                    (hod === 1) ? "DIRECT" :
                        (authorization_incharge === 0 && incharge === 1) ? 'DIRECT' : '',
            inc_apprv_time:
                (authorization_incharge === 1 && incharge === 1) ? moment().format('YYYY-MM-DD HH:mm:ss') :
                    (hod === 1) ? moment().format('YYYY-MM-DD HH:mm:ss') :
                        (authorization_incharge === 0 && incharge === 1) ? moment().format('YYYY-MM-DD HH:mm:ss') : '0000-00-00 00:00:00',
            hod_apprv_req:
                (authorization_hod === 1 && hod === 1) ? 1 :
                    (authorization_hod === 1 && hod === 0) ? 1 :
                        (authorization_hod === 0 && hod === 1) ? 1 : 0,
            hod_apprv_status:
                (authorization_hod === 1 && hod === 1) ? 1 :
                    (authorization_hod === 0 && hod === 1) ? 1 : 0,
            hod_apprv_cmnt:
                (authorization_hod === 1 && hod === 1) ? "DIRECT" :
                    (authorization_hod === 0 && hod === 1) ? 'DIRECT' : '',
            hod_apprv_time:
                (authorization_hod === 1 && hod === 1) ? moment().format('YYYY-MM-DD HH:mm:ss') :
                    (authorization_hod === 0 && hod === 1) ? moment().format('YYYY-MM-DD HH:mm:ss') : '0000-00-00 00:00:00',
            hr_aprrv_requ: 1,
            ceo_req_status: empHodStat === 1 ? 1 : 0,
            resonforleave: reason,
            no_of_leave: numberOfDays
        }

        //validation    
        const checkIfSelectedLeveReqType = newData?.filter((val) => val.leaveTypeSlno === 0 && val.singleLeave === 1);
        const checkIfSelectedLeve = newData?.filter((val) => val.selectedLveSlno === 0 && val.singleLeave === 0);
        const checkIfAnyLeaveSelected = newData?.filter((val) => val.leaveTypeSlno === 0 && val.selectedLveSlno === 0);
        // const CheckIfCasualLeave = newData?.filter((val) => val.leaveTypeSlno === '1' && val.singleLeave === 0);
        // const CheckIfEarnLeave = newData?.filter((val) => val.leaveTypeSlno === '8' && val.singleLeave === 0);

        // const sickLeave = newData?.some(key => key.leaveTypeSlno === '7') && (newData?.some(key => key.leaveTypeSlno === '1')
        //     || newData?.some(key => key.leaveTypeSlno === '8') || newData?.some(key => key.leaveTypeSlno === '3')
        //     || newData?.some(key => key.leaveTypeSlno === '4') || newData?.some(key => key.leaveTypeSlno === '6'));

        if (checkIfSelectedLeveReqType?.length > 0 || checkIfSelectedLeve?.length > 0 || checkIfAnyLeaveSelected?.length > 0) {
            warningNofity("Leave Type OR Name not selected OR Duplicate Leave Selected")
            setDropOpen(false)
        } else if (reason === '') {
            warningNofity("Leave Request Reason is Blank")
            setDropOpen(false)
        }
        else {
            const findSingleTypeLeave = newData?.filter((val) => val.singleLeave === 1);

            // IF SELECTED LEAVE TYPE HAVE THE COMMON LEAVE
            if (findSingleTypeLeave?.length > 0) {
                const counts = {}
                findSingleTypeLeave?.map((val) => val.leaveTypeSlno).forEach((val) => {
                    counts[val] = (counts[val] || 0) + 1
                })
                //find the leave count ( selected common leaves)
                if (Object.values(counts).length > 0) {
                    const commonLeaveSelectedCount = await Object.entries(counts)?.map((val) => {
                        return { 'leaveType': Number.parseInt(val[0]), count: val[1] }
                    })?.map((element) => {
                        const a = CommonLeaveType?.find((val) => val.llvetype_slno === element.leaveType)
                        return {
                            name: a?.lvetype_desc,
                            balance: a?.cmn_lv_balance,
                            selected: element?.count,
                            status: a?.cmn_lv_balance >= element?.count ? true : false
                        }
                    })

                    if (commonLeaveSelectedCount?.length > 0 && commonLeaveSelectedCount?.filter(val => val.status === false)?.length > 0) {
                        warningNofity(`${commonLeaveSelectedCount?.map(val => `${val.name} `)} Selected Greater than Allowed Count `)
                    } else {
                        //insert function leave master and detail
                        //detailed object fro insert 

                        const postDetailedData = newData?.map((val) => {
                            return {
                                leaveid: levRequestNo,
                                lveDate: moment(val.date).format('YYYY-MM-DD HH:mm:ss'),
                                caulmnth: val.singleLeave === 1 ? val.leaveTypeSlno : val.selectedLveSlno,
                                lveType: val.leaveTypeSlno,
                                status: 1,
                                levtypename: val.leaveTypeName,
                                leave: val.singleLeave === 1 ? val.leaveTypeName : val.selectedLeaveName,
                                nof_leave: 1,
                                empNo: em_no,
                                singleleave: 0
                            }
                        })

                        // insert the single leave request 

                        const monthStartDate = moment(startOfMonth(new Date(fromDate))).format('YYYY-MM-DD')
                        const dateCheck = {
                            month: monthStartDate,
                            section: em_dept_section
                        }

                        const checkPunchMarkingHr = await axioslogin.post("/attendCal/checkPunchMarkingHR/", dateCheck);
                        const { success, data } = checkPunchMarkingHr.data
                        if (success === 0 || success === 1) {
                            const lastUpdateDate = data?.length === 0 ? moment(startOfMonth(new Date(fromDate))).format('YYYY-MM-DD') : moment(new Date(data[0]?.last_update_date)).format('YYYY-MM-DD')
                            const lastDay_month = moment(lastDayOfMonth(new Date(fromDate))).format('YYYY-MM-DD')
                            if (lastUpdateDate === lastDay_month) {
                                warningNofity("Punch Marking Monthly Process Done !! Can't Apply No punch Request!!  ")
                                setDropOpen(false)
                            } else {
                                const result = await axioslogin.post('/LeaveRequest', postData);
                                const { success, message } = await result.data;
                                if (success === 1) {
                                    // insert the leave request detailed table
                                    const insertDetlTable = await axioslogin.post('/LeaveRequest/createdetlleave', postDetailedData);
                                    const { success, message } = await insertDetlTable.data;
                                    if (success === 1) {
                                        succesNofity(message);
                                        changeForm()
                                        setDropOpen(false)
                                    } else {
                                        warningNofity(`Contact EDP - ${JSON.stringify(message)}`)
                                        changeForm()
                                        setDropOpen(false)
                                    }
                                } else {
                                    warningNofity(`Contact EDP - ${JSON.stringify(message)}`)
                                    changeForm()
                                    setDropOpen(false)
                                }
                            }
                        } else {
                            errorNofity("Error getting PunchMarkingHR ")
                        }
                    }

                } else {
                    warningNofity('Common Leave Not Selected ! Select the Leave and Check')
                    setDropOpen(false)
                }

            } else {
                //insert function leave master and details
                const postDetailedData = newData?.map((val) => {
                    return {
                        leaveid: levRequestNo,
                        lveDate: moment(val.date).format('YYYY-MM-DD HH:mm:ss'),
                        caulmnth: val.singleLeave === 1 ? val.leaveTypeSlno : val.selectedLveSlno,
                        lveType: val.leaveTypeSlno,
                        status: 1,
                        levtypename: val.leaveTypeName,
                        leave: val.singleLeave === 1 ? val.leaveTypeName : val.selectedLeaveName,
                        nof_leave: 1,
                        empNo: em_no,
                        singleleave: 0
                    }
                })


                //insert the single leave request
                const monthStartDate = moment(startOfMonth(new Date(fromDate))).format('YYYY-MM-DD')
                const dateCheck = {
                    month: monthStartDate,
                    section: em_dept_section
                }

                const checkPunchMarkingHr = await axioslogin.post("/attendCal/checkPunchMarkingHR/", dateCheck);
                const { success, data } = checkPunchMarkingHr.data
                if (success === 0 || success === 1) {
                    const lastUpdateDate = data?.length === 0 ? moment(startOfMonth(new Date(fromDate))).format('YYYY-MM-DD') : moment(new Date(data[0]?.last_update_date)).format('YYYY-MM-DD')
                    const lastDay_month = moment(lastDayOfMonth(new Date(fromDate))).format('YYYY-MM-DD')
                    if (lastUpdateDate === lastDay_month) {
                        warningNofity("Punch Marking Monthly Process Done !! Can't Apply No punch Request!!  ")
                        setDropOpen(false)
                    } else {
                        const result = await axioslogin.post('/LeaveRequest', postData);
                        const { success, message } = await result.data;
                        if (success === 1) {
                            //insert the leave request detailed table
                            const insertDetlTable = await axioslogin.post('/LeaveRequest/createdetlleave', postDetailedData);
                            const { success, message } = await insertDetlTable.data;
                            if (success === 1) {
                                succesNofity(message);
                                changeForm()
                                setDropOpen(false)
                                fetchleaveInformationFun(dispatch, em_id)
                            } else {
                                warningNofity(`Contact EDP - ${JSON.stringify(message)}`)
                                changeForm()
                                setDropOpen(false)
                            }
                        } else {
                            warningNofity(`Contact EDP - ${JSON.stringify(message)}`)
                            changeForm()
                            setDropOpen(false)
                        }
                    }
                } else {
                    errorNofity("Error getting PunchMarkingHR ")
                }
            }
        }
    }, [newData, multiLeaveTypeData, reason, em_id, em_no, levRequestNo, changeForm,
        em_department, em_dept_section, numberOfDays, authorization_hod, authorization_incharge, dispatch,
        empHodStat, hod, incharge, CommonLeaveType])

    const [select, setSelect] = useState(0)
    const [casualLeve, setCasualLeave] = useState([]);
    const casulLeves = useSelector((state) => state.getCreditedCasualLeave, _.isEqual);
    const casualLve = useMemo(() => casulLeves, [casulLeves])

    useEffect(() => {
        const { casualLeave } = casualLve;
        const nohalfcasual = casualLeave.filter(val => val.cl_bal_leave !== 0.5)
        const array = nohalfcasual.map((val) => {
            const obj = {
                ...val, checkValue: 0
            }
            return obj
        })
        setCasualLeave(array);
    }, [casualLve])

    const [earnLeave, setEarnLeave] = useState([]);
    //const [status, setStatus] = useState(false);

    const earnLeaves = useSelector((state) => state.getCreditedEarnLeave, _.isEqual);
    const earnLve = useMemo(() => earnLeaves, [earnLeaves]);

    useEffect(() => {
        const { earnLeave } = earnLve;
        const array = earnLeave.map((val) => {
            const obj = {
                ...val, checkValue: 0
            }
            return obj
        })
        // setCasualLeave(array);
        setEarnLeave(array);
    }, [earnLve])

    const [coff, setCoff] = useState([]);
    // const [status, setStatus] = useState(false);

    const copansatoryOff = useSelector((state) => state?.getEmpCoffData, _.isEqual);

    const compOff = useMemo(() => copansatoryOff, [copansatoryOff]);


    useEffect(() => {
        const { coffData } = compOff;
        const array = coffData.map((val) => {
            const obj = {
                ...val, checkValue: 0
            }
            return obj
        })
        setCoff(array);
    }, [compOff])



    return (
        <Paper
            // component={Grid}
            // container
            variant="outlined"
            sx={{
                display: "flex",
                flex: 1,
                p: 0.5, mb: 0.5, backgroundColor: '#EBEDEF',
                flexDirection: 'column',
            }}
        >
            <CustomBackDrop open={drop} text="Your Request Is Processing. Please Wait..." />
            <Box sx={{
                flex: 1,
                display: "flex",
                backgroundColor: 'Scrollbar',
                alignItems: 'center',
                justifyContent: 'center',
                p: 0,
                mb: -1
            }} >
                <Box sx={{ display: "flex", flex: 1, px: 1, backgroundColor: 'lightblue' }} component={Typography} variant="subtitle2" gutterBottom >Selected Leave Date</Box>
                <Box sx={{ display: "flex", flex: 1, px: 1, backgroundColor: 'lightblue' }} component={Typography} variant="subtitle2" gutterBottom >Leave Type</Box>
                <Box sx={{ display: "flex", flex: 1, px: 1, backgroundColor: 'lightblue' }} component={Typography} variant="subtitle2" gutterBottom >Leave Name</Box>
            </Box>
            <Box
                variant="outlined"
                sx={{
                    display: "flex",
                    flex: 1,
                    p: 0.5, mb: 0.5, backgroundColor: '#EBEDEF',
                    flexDirection: 'column',
                    minHeight: 10,
                    maxHeight: 210,
                    overflowY: 'auto'
                }}
            >
                {newData?.map((val, index) => <MuliLeaveMapCmp
                    key={index}
                    data={val}
                    index={index}
                    handleChange={handleChangeLeaveRequest}
                    select={select}
                    setSelect={setSelect}
                    casualLeve={casualLeve}
                    setCasualLeave={setCasualLeave}
                    earnLeave={earnLeave}
                    setEarnLeave={setEarnLeave}
                    coff={coff}
                    setCoff={setCoff}
                />)}
            </Box>
            <Paper
                variant="outlined"
                sx={{
                    p: 0.5, mb: 0.5,
                }}
            >
                <Box sx={{ display: "flex", flex: 1 }}>
                    <Box sx={{ flex: 2 }} >
                        <Box sx={{ display: "flex", flex: 1 }}>
                            <Box sx={{ display: "flex", flex: 2 }}>
                                <Form.Group style={{ width: '100%' }} >
                                    <Form.Control type="file" size="sm" />
                                </Form.Group>
                            </Box>
                            <Box sx={{ display: "flex", flex: 2, pl: 1 }} >
                                <CssVarsProvider>
                                    <Tooltip title="View Documents" variant="outlined" placement="top">
                                        <Button
                                            variant="outlined"
                                            component="label"
                                            size="sm"
                                            color="primary"
                                        // fullWidth

                                        // onClick={() => setOpen(true)}
                                        >
                                            <FindInPageIcon />View Document
                                        </Button>
                                    </Tooltip>
                                </CssVarsProvider>
                            </Box>
                        </Box>
                        <Box sx={{
                            display: 'flex',
                            flex: 1,
                            width: '100%',
                            flexDirection: 'start',
                            p: 0,
                            m: 0
                        }} >
                            <Typo level="body4">Supported Document/ Image Formats - *.pdf / *.jpg,*.jpeg,*.png || Doc/Image Size Should Be Less Than 2 MB </Typo>
                        </Box>
                    </Box>
                    <Box sx={{ display: "flex", flex: 2, px: 1 }} >
                        <CssVarsProvider>
                            <Textarea
                                label="Outlined"
                                placeholder="Reason For Leave Request"
                                variant="outlined"
                                color="warning"
                                size="lg"
                                minRows={1}
                                maxRows={3}
                                onChange={(e) => setReason(e.target.value)}
                                sx={{ flex: 1 }}
                            />
                        </CssVarsProvider>
                    </Box>
                    <Box sx={{ display: "flex", flex: 1, px: 0 }} >
                        <CssVarsProvider>
                            <Button
                                aria-label="Like"
                                variant="outlined"
                                color="primary"
                                size="sm"
                                startDecorator={<SaveAsIcon />}
                                onClick={leaveRequestSubmitFun}
                                fullWidth
                            >
                                Save Leave Request
                            </Button>
                        </CssVarsProvider>
                    </Box>
                </Box>
            </Paper>
        </Paper>
    )
}

export default memo(MultiLeaveRequestForm)