import { Paper, TextField } from '@mui/material'
import { Box } from '@mui/system'
import React, { useCallback, useEffect } from 'react'
import { useState } from 'react'
import { useMemo } from 'react'
import { memo } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { getCommonLeaveData, getEmployeeApprovalLevel } from 'src/redux/actions/LeaveReqst.action'
import DepartmentSection from './Func/DepartmentSection'
import EmployeeAgainSection from './Func/EmployeeAgainSection'
import LeaveRequestType from './Func/LeaveRequestType'
import { Actiontypes } from 'src/redux/constants/action.type'
import { Button, CssVarsProvider, Input, Tooltip } from '@mui/joy'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { warningNofity } from 'src/views/CommonCode/Commonfunc'
import RefreshIcon from '@mui/icons-material/Refresh';
import { lazy } from 'react'
import { Suspense } from 'react'
import { setDept } from 'src/redux/actions/Dept.Action'
import { setdeptSection } from 'src/redux/actions/DeptSection.action'
import { getDepartmentAll, getDepartmentSectBasedDeptID, getDepartmentSectionAll, getEmployeeInformationLimited } from 'src/redux/reduxFun/reduxHelperFun'
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import LinearProgress from '@mui/joy/LinearProgress';
import {
    getEmployeeInformation,
    getCreditedCasualLeave, getCreitedCommonLeave, getCreitedHolidayLeave,
    getCreitedCompansatoryOffLeave, getCreditedEarnLeave, getEmpCoffData,
} from 'src/redux/actions/LeaveReqst.action';
import { getannualleave } from 'src/redux/actions/Profile.action'
import { screenInnerHeight } from 'src/views/Constant/Constant'

const NormalEmployeeLeveReqPage = lazy(() => import('./NormalEmployeeLeveReqPage'))
const HrRoleBasedDepartmentAndSection = lazy(() => import('./Func/DepartmentBasedSection'))

const LeaveRequestEmployeeSelection = ({ setRequestType }) => {
    const dispatch = useDispatch()

    // const { FETCH_LEAVE_REQUEST, LEAVE_REQ_DEFAULT } = Actiontypes;

    const [levReq, setLevReq] = useState(0); //LEAVE REQUEST TYPE SELECTION STATE

    const empInformation = useSelector((state) => getEmployeeInformationLimited(state))
    const empInformationFromRedux = useMemo(() => empInformation, [empInformation])
    const { hod, incharge, groupmenu, em_no, em_id, em_department, em_dept_section, dept_name, sect_name, em_name } = empInformationFromRedux;

    // POST DATA FOR EMPLOYE IS NOT A HOD AOR INCHARGE
    const employeePostData = useMemo(() => {
        return {
            emNo: em_no,
            emID: em_id,
            deptID: em_department,
            sectionID: em_dept_section
        }
    }, [em_no, em_id, em_department, em_dept_section])

    // Leave request user User States
    const [requestUser, setRequestUser] = useState({
        deptID: 0,
        sectionID: 0,
        emNo: 0,
        emID: 0
    })
    const userPostData = useMemo(() => requestUser, [requestUser])


    // HANDLE CLICK THE LEAVE REQUST PROCESS BUTTON
    const handleProcessLeveRequest = useCallback(async () => {
        const isInchargeOrHOD = (hod === 1 || incharge === 1) ? true : false //IF TRUE IS (HOD OR INCHARGE ) OR NORMAL USER
        setRequestType(levReq)
        /* levReq -> state change the request form following
         * 1 -> Leave Request form
         * 2 -> Half Day Leave Request Form
         * 3 -> Miss punch Request foprm
         * 4 -> Compansatory Leave request Form
         */

        // CHECK THE EMPLOYEE IS HOD OR INCHARGE
        const postData = isInchargeOrHOD === true ? { ...userPostData } : { ...employeePostData }

        const { deptID, sectionID, emNo, emID } = postData;

        if (sectionID === 0 || emNo === 0 || emID === 0) {
            warningNofity("Please Check for Any Selection")
        } else {
            //  GET ALL ELIGIBLE LEAVES INFORMATION FROM DATA BASE
            dispatch(getCreditedCasualLeave(emNo)); //GET ALL CASUAL LEAVES 
            dispatch(getCreitedCommonLeave(emNo)); //GET COMMON LEAVES
            dispatch(getCreitedHolidayLeave(emNo)); // GET ALL HOLIDAYS LEAVES
            dispatch(getCreitedCompansatoryOffLeave(emID)); // GET COMPANSATORY OFF LEAVES
            dispatch(getCreditedEarnLeave(emNo)); // GET ALL EARN LEAVES
            dispatch(getannualleave(emID))  //GET ALL LEAVES COUNT
            dispatch(getEmployeeInformation(emID)) // LEAVE REQUESTED EMPLOYEE PERSONAL INFORMATION
            dispatch(getEmployeeApprovalLevel(emID))
            // dispatch(getEmpCoffData(postData)) // 
        }

        // console.log(employeePostData)
        // console.log(userPostData)

    }, [levReq, setRequestType, userPostData, hod, incharge, employeePostData,])


    /****************************** */



    // //get the employee details for taking the HOd and Incharge Details
    // const employeeState = useSelector((state) => state.getProfileData.ProfileData,);
    // const singleLeaveTypeFormData = useSelector((state) => state.singleLeaveRequestFormState.leaveReqState);

    // const commonSettings = useSelector((state) => state?.getCommonSettings)
    // const { group_slno } = commonSettings;


    // const singleLevFormData = useMemo(() => singleLeaveTypeFormData, [singleLeaveTypeFormData])
    // const employeeProfileDetl = useMemo(() => employeeState[0], [employeeState]);

    // const { formSubmit } = singleLevFormData;
    // const { hod, incharge, em_no, em_name, sect_name, em_dept_section } = employeeProfileDetl;


    // const onSubmitLeaveRequestEntry = (e) => {

    //     if (hod === 1 || incharge === 1) {
    //         // this employee is a hod or incharge
    //         if (deptSection === 0) {
    //             warningNofity("Section Not Selected")
    //         } else if (employeeID === 0) {
    //             warningNofity("Employee Not Selected")
    //         } else if (levReq === 0) {
    //             warningNofity("Request Type Not Selected")
    //         } else {
    //             let empDetl = {
    //                 deptSection: deptSection,
    //                 empNo: employeeID,
    //                 requestType: levReq
    //             }
    //             dispatch({ type: FETCH_LEAVE_REQUEST, payload: empDetl });
    //             //console.log(` emp selectio hod ${em_no} `)
    //             // dispatch(getCommonLeaveData(em_no));
    //         }

    //     } else {
    //         // normal employee
    //         if (levReq === 0) {
    //             warningNofity("Request Type Not Selected")
    //         } else {
    //             let empDetl = {
    //                 deptSection: em_dept_section,
    //                 empNo: em_no,
    //                 requestType: levReq
    //             }
    //             dispatch({ type: FETCH_LEAVE_REQUEST, payload: empDetl })
    //             dispatch(getCommonLeaveData(em_no));
    //         }
    //     }
    // }

    // const changeForm = () => {
    //     let requestType = { requestType: 0 };
    //     dispatch({ type: FETCH_LEAVE_REQUEST, payload: requestType })
    //     dispatch({ type: LEAVE_REQ_DEFAULT })
    // }


    return (
        <Paper variant="outlined" sx={{ display: "flex", alignItems: 'center', flexWrap: 'wrap' }} >
            <Box display={'flex'} sx={{ flexGrow: 1, }} >
                <Suspense fallback={<LinearProgress variant="outlined" />} >
                    {
                        (hod === 1 || incharge === 1)
                            ? <HrRoleBasedDepartmentAndSection state={requestUser} setState={setRequestUser} formChange={setRequestType} />
                            : <NormalEmployeeLeveReqPage />
                    }
                </Suspense>
            </Box>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                width: '20%',
                px: 0.3
            }}>
                <LeaveRequestType
                    onChange={setLevReq}
                    onChangeVal={levReq}
                />
            </Box>
            <Box sx={{ display: "flex", px: 0.3, }} >
                <CssVarsProvider>
                    <Tooltip title="Process" followCursor placement='top' arrow >
                        <Button
                            aria-label="Like"
                            variant="outlined"
                            color="danger"
                            onClick={handleProcessLeveRequest}
                            size='sm'
                        >
                            <AddCircleOutlineIcon />
                        </Button>
                    </Tooltip>
                </CssVarsProvider>
            </Box>
            <Box sx={{ display: "flex", px: 0.3, }} >
                <CssVarsProvider>
                    <Button
                        aria-label="Like"
                        variant="outlined"
                        color="success"
                        onClick={() => setRequestType(10)}
                        size='sm'
                        className='refreshButton'
                    >
                        <RefreshIcon className='rotating-icon' />
                    </Button>
                </CssVarsProvider>
            </Box>
        </Paper>
    )
}

export default memo(LeaveRequestEmployeeSelection)