import { Paper } from '@mui/material'
import { Box } from '@mui/system'
import React, { useCallback } from 'react'
import { useState } from 'react'
import { useMemo } from 'react'
import { memo } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { getEmployeeApprovalLevel } from 'src/redux/actions/LeaveReqst.action'
import { Button, CssVarsProvider, Option, Select, Tooltip } from '@mui/joy'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { warningNofity } from 'src/views/CommonCode/Commonfunc'
import RefreshIcon from '@mui/icons-material/Refresh';
import { lazy } from 'react'
import { Suspense } from 'react'
import { getEmployeeInformationLimited } from 'src/redux/reduxFun/reduxHelperFun'
import LinearProgress from '@mui/joy/LinearProgress';
import { getEmployeeInformation } from 'src/redux/actions/LeaveReqst.action';

const NormalEmployeeLeveReqPage = lazy(() => import('src/views/LeaveManagement/LeavereRequsition/NormalEmployeeLeveReqPage'))
const HrRoleBasedDepartmentAndSection = lazy(() => import('src/views/LeaveManagement/LeavereRequsition/Func/DepartmentBasedSection'))

const EmployeeSelectionComponent = ({ setRequestType }) => {

    const dispatch = useDispatch()
    const [request, setRequest] = useState(0); //LEAVE REQUEST TYPE SELECTION STATE

    const empInformation = useSelector((state) => getEmployeeInformationLimited(state))
    const empInformationFromRedux = useMemo(() => empInformation, [empInformation])
    const { hod, incharge, em_no, em_id, em_department, em_dept_section, } = empInformationFromRedux;

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

    const reqstArray = [
        //{ reqNo: 1, name: 'Enable Miss Punch for OT' },
        { reqNo: 2, name: 'On Duty Request' },
        { reqNo: 3, name: 'One Hour Request' },
        //{ reqNo: 4, name: 'General Request' },
    ]
    // HANDLE CLICK THE LEAVE REQUST PROCESS BUTTON
    const handleProcessLeveRequest = useCallback(async () => {
        const isInchargeOrHOD = (hod === 1 || incharge === 1) ? true : false //IF TRUE IS (HOD OR INCHARGE ) OR NORMAL USER
        setRequestType(request)
        // CHECK THE EMPLOYEE IS HOD OR INCHARGE
        const postData = isInchargeOrHOD === true ? { ...userPostData } : { ...employeePostData }

        const { sectionID, emNo, emID } = postData;

        if (sectionID === 0 || emNo === 0 || emID === 0) {
            warningNofity("Please Check for Any Selection")
        } else {
            dispatch(getEmployeeInformation(emID)) // LEAVE REQUESTED EMPLOYEE PERSONAL INFORMATION
            dispatch(getEmployeeApprovalLevel(emID))
        }

    }, [request, setRequestType, userPostData, hod, incharge, employeePostData, dispatch])

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
                <Select
                    defaultValue={request}
                    onChange={(event, newValue) => {
                        setRequest(newValue);
                    }}
                    size='sm'
                    sx={{ width: '100%' }}
                    variant='outlined'
                    color='primary'
                >
                    <Option value={0} disabled >Select Request Type ...</Option>
                    {
                        reqstArray?.map((val, index) => {
                            return <Option key={index} value={val.reqNo}>{val.name}</Option>
                        })
                    }
                </Select>
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

export default memo(EmployeeSelectionComponent) 