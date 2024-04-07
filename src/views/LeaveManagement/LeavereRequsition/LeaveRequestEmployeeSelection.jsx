import { Paper, TextField } from '@mui/material'
import { Box } from '@mui/system'
import React, { useCallback, useEffect } from 'react'
import { useState } from 'react'
import { useMemo } from 'react'
import { memo } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { getCommonLeaveData } from 'src/redux/actions/LeaveReqst.action'
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
import NormalEmployeeLeveReqPage from './NormalEmployeeLeveReqPage'

const HrRoleBasedDepartmentAndSection = lazy(() => import('./Func/DepartmentBasedSection'))

const LeaveRequestEmployeeSelection = () => {
    const dispatch = useDispatch()

    const { FETCH_LEAVE_REQUEST, LEAVE_REQ_DEFAULT } = Actiontypes;

    const [levReq, setLevReq] = useState(0);

    const empInformation = useSelector((state) => getEmployeeInformationLimited(state))
    const { hod, incharge, groupmenu, em_no, em_id, em_department, em_dept_section, dept_name, sect_name, em_name } = empInformation;


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

    const changeForm = () => {
        let requestType = { requestType: 0 };
        dispatch({ type: FETCH_LEAVE_REQUEST, payload: requestType })
        dispatch({ type: LEAVE_REQ_DEFAULT })
    }


    return (
        <Paper variant="outlined" sx={{ display: "flex", alignItems: 'center' }} >
            <Box display={'flex'} sx={{ flex: 1 }} >
                <Suspense fallback={<LinearProgress variant="outlined" />} >
                    {
                        (hod === 1 || incharge === 1) ? <HrRoleBasedDepartmentAndSection /> : <NormalEmployeeLeveReqPage />
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
                    // empstatus={employeeID}
                    onChange={setLevReq}
                    onChangeVal={levReq}
                />
            </Box>
            <Box sx={{ display: "flex", px: 0.3 }} >
                <CssVarsProvider>
                    <Tooltip title="Process" followCursor placement='top' arrow >
                        <Button
                            aria-label="Like"
                            variant="outlined"
                            color="danger"
                            // onClick={onSubmitLeaveRequestEntry}
                            size='sm'
                        >
                            <AddCircleOutlineIcon />
                        </Button>
                    </Tooltip>
                </CssVarsProvider>
            </Box>
            <Box sx={{ display: "flex", px: 0.3 }} >
                <CssVarsProvider>
                    <Button
                        aria-label="Like"
                        variant="outlined"
                        color="success"
                        // onClick={() => changeForm()}
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