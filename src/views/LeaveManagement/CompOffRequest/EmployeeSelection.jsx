import { Box, Button, LinearProgress, Tooltip } from '@mui/joy'
import { Paper } from '@mui/material'
import React, { memo, Suspense, useCallback, useEffect, useMemo, useState } from 'react'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useDispatch, useSelector } from 'react-redux';
import { getCommonSettings, getEmployeeInformationLimited } from 'src/redux/reduxFun/reduxHelperFun';
import { warningNofity } from 'src/views/CommonCode/Commonfunc';
import InchargeHodPage from './InchargeHodPage';
import NormalEmployeeLeveReqPage from '../LeavereRequsition/NormalEmployeeLeveReqPage';
import ViewListIcon from '@mui/icons-material/ViewList';
import { getDepartmentSectionBasedHod } from '../LeavereRequsition/Func/LeaveFunction';
import { getEmployeeCoffRequest, getSectionCoffRequest } from 'src/redux/actions/LeaveReqst.action';

const EmployeeSelection = ({ setShowForm, steEmployeeData, setShowtable }) => {

    const dispatch = useDispatch()

    const [masterGroupStatus, setMasterGroupStatus] = useState(false);

    const empInformation = useSelector((state) => getEmployeeInformationLimited(state))
    const empInformationFromRedux = useMemo(() => empInformation, [empInformation])
    const { hod, incharge, em_no, em_id, em_department, em_dept_section, groupmenu } = empInformationFromRedux;

    const getcommonSettings = useSelector((state) => getCommonSettings(state, groupmenu))
    const groupStatus = useMemo(() => getcommonSettings, [getcommonSettings])
    useEffect(() => {
        setMasterGroupStatus(groupStatus)
    }, [groupStatus])


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
    }, [userPostData, hod, incharge, employeePostData, setShowForm, steEmployeeData])

    const tableView = useCallback(() => {
        setShowtable(1)
        if ((hod === 1 || incharge === 1) && masterGroupStatus === true) {

            const fetchData = async (em_id) => {
                const result = await getDepartmentSectionBasedHod(em_id);
                const section = await result?.map((e) => e.dept_section)

                const flag = section?.find((e) => e === em_dept_section) === undefined ? true : false

                if (flag === true) {
                    const postData = {
                        data: section
                    }
                    dispatch(getSectionCoffRequest(postData))
                } else {
                    const sectArray = [...section, em_dept_section]
                    const postData = {
                        data: sectArray
                    }
                    dispatch(getSectionCoffRequest(postData))
                }
            }
            fetchData(em_id)

        } else if ((hod === 1 || incharge === 1) && masterGroupStatus === false) {
            const fetchData = async (em_id) => {
                const result = await getDepartmentSectionBasedHod(em_id);
                const section = await result?.map((e) => e.dept_section)
                const flag = section?.find((e) => e === em_dept_section) === undefined ? true : false

                if (flag === true) {
                    const sectArray = [...section, em_dept_section]
                    const postData = {
                        data: sectArray
                    }
                    dispatch(getSectionCoffRequest(postData))
                } else {
                    const postData = {
                        data: section
                    }
                    dispatch(getSectionCoffRequest(postData))
                }
            }
            fetchData(em_id)
        } else {

            //setCount(0)
            dispatch(getEmployeeCoffRequest(em_id))
        }

    }, [dispatch, setShowtable, em_dept_section, em_id, hod, incharge, masterGroupStatus])

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
            </Box>
            <Box sx={{ display: "flex", px: 0.3, }} >
                <Tooltip title="Click Here to View Table" followCursor placement='top' arrow variant='outlined' color='primary' >
                    <Button
                        aria-label="Like"
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

export default memo(EmployeeSelection) 