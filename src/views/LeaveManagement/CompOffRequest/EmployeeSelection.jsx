import { Box, Button, CssVarsProvider, LinearProgress, Tooltip } from '@mui/joy'
import { Paper } from '@mui/material'
import React, { memo, Suspense, useCallback, useMemo, useState } from 'react'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useSelector } from 'react-redux';
import { getEmployeeInformationLimited } from 'src/redux/reduxFun/reduxHelperFun';
import { warningNofity } from 'src/views/CommonCode/Commonfunc';
import InchargeHodPage from './InchargeHodPage';
import NormalEmployeeLeveReqPage from '../LeavereRequsition/NormalEmployeeLeveReqPage';

const EmployeeSelection = ({ setShowForm, steEmployeeData }) => {

    const empInformation = useSelector((state) => getEmployeeInformationLimited(state))
    const empInformationFromRedux = useMemo(() => empInformation, [empInformation])
    const { hod, incharge, em_no, em_id, em_department, em_dept_section } = empInformationFromRedux;

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

        // CHECK THE EMPLOYEE IS HOD OR INCHARGE
        const postData = isInchargeOrHOD === true ? { ...userPostData } : { ...employeePostData }

        const { sectionID, emNo, emID } = postData;

        if (sectionID === 0 || emNo === 0 || emID === 0) {
            warningNofity("Please Check for Any Selection")
        } else {
            setShowForm(1)
            steEmployeeData(postData)
        }
    }, [userPostData, hod, incharge, employeePostData, setShowForm])

    return (
        <Paper variant="outlined" sx={{ display: "flex", alignItems: 'center', flexWrap: 'wrap' }} >
            <Box display={'flex'} sx={{ flexGrow: 1, }} >
                <Suspense fallback={<LinearProgress variant="outlined" />} >
                    {
                        (hod === 1 || incharge === 1)
                            ? <InchargeHodPage state={requestUser} setState={setRequestUser} />
                            : <NormalEmployeeLeveReqPage />
                    }
                </Suspense>
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
        </Paper>
    )
}

export default memo(EmployeeSelection) 