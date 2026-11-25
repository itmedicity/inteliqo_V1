import { Box, Button, LinearProgress, Tooltip } from '@mui/joy'
import { Paper } from '@mui/material'
import React, { memo, Suspense, useCallback, useMemo, useState } from 'react'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useSelector } from 'react-redux';
import { getEmployeeInformationLimited } from 'src/redux/reduxFun/reduxHelperFun';
import { warningNofity } from 'src/views/CommonCode/Commonfunc';
import InchargeHodPage from 'src/views/LeaveManagement/CompOffRequest/InchargeHodPage';
import NormalEmployeeLeveReqPage from 'src/views/LeaveManagement/LeavereRequsition/NormalEmployeeLeveReqPage';
import ViewListIcon from '@mui/icons-material/ViewList';

const OtEmployeeSelection = ({ setShowForm, steEmployeeData, setShowtable }) => {

    const empInformation = useSelector((state) => getEmployeeInformationLimited(state))
    const empInformationFromRedux = useMemo(() => empInformation, [empInformation])
    const { hod, incharge, em_no, em_id, em_department, em_dept_section } = empInformationFromRedux;

    // POST DATA FOR EMPLOYEE IS NOT A HOD OR INCHARGE
    const employeePostData = useMemo(() => {
        return {
            emNo: em_no,
            emID: em_id,
            deptID: em_department,
            sectionID: em_dept_section
        }
    }, [em_no, em_id, em_department, em_dept_section])

    // Leave request user States
    const [requestUser, setRequestUser] = useState({
        deptID: 0,
        sectionID: 0,
        emNo: 0,
        emID: 0
    })
    const userPostData = useMemo(() => requestUser, [requestUser])

    // HANDLE CLICK THE OVERTIME REQUEST PROCESS BUTTON
    const handleProcessOtRequest = useCallback(async () => {
        const isInchargeOrHOD = (hod === 1 || incharge === 1) ? true : false

        // CHECK IF THE EMPLOYEE IS HOD OR INCHARGE
        const postData = isInchargeOrHOD === true ? { ...userPostData } : { ...employeePostData }

        const { sectionID, emNo, emID } = postData;

        if (sectionID === 0 || emNo === 0 || emID === 0) {
            warningNofity("Please Check for Any Selection")
        } else {
            setShowForm(1)
            steEmployeeData(postData)
        }
    }, [userPostData, hod, incharge, employeePostData, setShowForm, steEmployeeData])

    const tableView = useCallback(() => {
        setShowtable(prev => prev === 1 ? 0 : 1)
    }, [setShowtable])

    return (
        <Paper variant="outlined" sx={{ display: "flex", alignItems: 'center', flexWrap: 'wrap', p: 0.5 }} >
            <Box display={'flex'} sx={{ flexGrow: 1 }} >
                <Suspense fallback={<LinearProgress variant="outlined" />} >
                    {
                        (hod === 1 || incharge === 1)
                            ? <InchargeHodPage state={requestUser} setState={setRequestUser} setShowForm={setShowForm} />
                            : <NormalEmployeeLeveReqPage />
                    }
                </Suspense>
            </Box>
            <Box sx={{ display: "flex", px: 0.3 }} >
                <Tooltip title="Process" followCursor placement='top' arrow >
                    <Button
                        aria-label="Process"
                        variant="outlined"
                        color="danger"
                        onClick={handleProcessOtRequest}
                        size='sm'
                    >
                        <AddCircleOutlineIcon />
                    </Button>
                </Tooltip>
            </Box>
            <Box sx={{ display: "flex", px: 0.3 }} >
                <Tooltip title="Click Here to View / Hide Overtime Requests" followCursor placement='top' arrow variant='outlined' color='primary' >
                    <Button
                        aria-label="View Table"
                        variant="outlined"
                        color="primary"
                        onClick={tableView}
                        size='sm'
                        endDecorator={<Box>View</Box>}
                    >
                        <ViewListIcon fontSize='medium' />
                    </Button>
                </Tooltip>
            </Box>
        </Paper>
    )
}

export default memo(OtEmployeeSelection)
