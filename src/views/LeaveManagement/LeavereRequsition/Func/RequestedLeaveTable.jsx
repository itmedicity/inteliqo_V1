import { IconButton, Paper } from '@mui/material'
import React, { Fragment, memo, Suspense, useCallback, useEffect, useMemo, useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector } from 'react-redux';
import LeaveCancelEmp from '../EmpView/LeaveCancelEmp';
import HalfdayCancelEmp from '../EmpView/HalfdayCancelEmp';
import NopunchCancelEmp from '../EmpView/NopunchCancelEmp';
// import CompOffCancelEmp from '../EmpView/CompOffCancelEmp';
import CommonAgGrid from 'src/views/Component/CommonAgGrid';
import BeenhereIcon from '@mui/icons-material/Beenhere';
import { getCommonSettings, getEmployeeInformationLimited, getEmployeeLeaveRs } from 'src/redux/reduxFun/reduxHelperFun';
import { getDepartmentSectionBasedHod } from './LeaveFunction';
// import { getEmployeeLeaveRequest } from 'src/redux/actions/LeaveReqst.action';

const RequestedLeaveTable = ({ setCount }) => {

    // const dispatch = useDispatch()

    // const [tableData, settableData] = useState([])


    //MODAL STATES FOR RENDERING OPEN MODAL & UPDATE DATA
    const [leaveReqModal, setleaveReqModal] = useState(false);
    //const [coffReqModal, setcoffReqModal] = useState(false);
    const [halfDayReqModal, sethalfDayReqModal] = useState(false);
    const [noPunchReqModal, setnoPunchReqModal] = useState(false);

    //UPDATE DATA
    const [lveData, setlveData] = useState({});
    // const [coffData, setcoffData] = useState({});
    const [halfData, sethalfData] = useState({});
    const [noPunchData, setnoPunchData] = useState({});


    const [masterGroupStatus, setMasterGroupStatus] = useState(false);
    const [checkStatus, setCheckStatus] = useState(false)


    //LOGGED EMPLOYEE INFORMATION
    const empInform = useSelector((state) => getEmployeeInformationLimited(state))
    const employeeInform = useMemo(() => empInform, [empInform])
    const { hod, incharge, groupmenu, em_id, em_dept_section } = employeeInform;

    const getcommonSettings = useSelector((state) => getCommonSettings(state, groupmenu))
    const groupStatus = useMemo(() => getcommonSettings, [getcommonSettings])
    useEffect(() => {
        setMasterGroupStatus(groupStatus)
    }, [groupStatus])


    useEffect(() => {
        getDepartmentSectionBasedHod(em_id).then((hodSection) => {

            const checkHodSection = hodSection?.find(e => e.dept_section === em_dept_section) === undefined ?? false

            setCheckStatus(checkHodSection)
        })
    }, [em_dept_section, em_id])

    // const sectionWiseLeaveRequest = state?.getSectLeaveRequests?.sectLeaves
    // const sectionWisehalfdayRequest = state?.getSectHalfdayRequests?.sectHalfday
    // const sectionWiseMisspunchRequest = state?.getSectMisspunchRequests?.sectMisspunch

    // const leaveRequest = useSelector((state) => state?.getSectLeaveRequests?.sectLeaves)
    // const misspunch = useSelector((state) => state?.getSectHalfdayRequests?.sectHalfday)
    // const halfday = useSelector((state) => state?.getSectMisspunchRequests?.sectMisspunch)

    //const empData = useSelector((state) => getEmployeeLeaveRequest(state))

    const empData = useSelector((state) => getEmployeeLeaveRs(state, hod, incharge, masterGroupStatus, em_id, em_dept_section, checkStatus))


    // useEffect(() => {
    //     const getLeaveReqInfo = async (leaveRequest, misspunch, halfday, hod, incharge, masterGroupStatus, em_id, em_dept_section) => {
    //         const result = await getEmployeeRequests(leaveRequest, misspunch, halfday, hod, incharge, masterGroupStatus, em_id, em_dept_section)

    //         //const data = result?.flat();

    //         //settableData(data)
    //     }
    //     getLeaveReqInfo(leaveRequest, misspunch, halfday, hod, incharge, masterGroupStatus, em_id, em_dept_section)


    // }, [leaveRequest, misspunch, halfday, hod, incharge, masterGroupStatus, em_id, em_dept_section])

    // const employeeLeaveRequest = useSelector((state) => getEmployeeRequests(state, hod, incharge, masterGroupStatus, em_id, em_dept_section))
    // const empdata = useMemo(() => employeeLeaveRequest, [employeeLeaveRequest])


    // empdata.then((e) => {
    //     const data = e.flat();

    //     settableData(data)
    // })



    const LeaveCancel = useCallback(async (params) => {
        const { code } = params?.data
        if (code === 1) {
            setlveData(params.data)
            setleaveReqModal(true)
        } else if (code === 2) {
            sethalfData(params.data)
            sethalfDayReqModal(true)
        } else if (code === 3) {
            setnoPunchData(params.data)
            setnoPunchReqModal(true)
        }
    }, [])

    const [columnDef] = useState([
        { headerName: 'Emp. ID', field: 'emno', filter: true, minWidth: 150, },
        { headerName: 'Emp. Name', field: 'name', filter: true, minWidth: 150, },
        { headerName: 'Dept. Section', field: 'section', filter: true, minWidth: 250, },
        { headerName: 'Request Type', field: 'type', minWidth: 200, },
        { headerName: 'Leave Date', field: 'fromDate', filter: true },
        { headerName: 'Leave Reason', field: 'reason', },
        { headerName: 'Status', field: 'status', filter: true },
        {
            headerName: 'Delete',
            cellRenderer: params => {
                if (params.data.hrstatus === 1 | params.data.inchargestatus === 1 || params.data.hodstatus === 1) {
                    return <IconButton
                        sx={{ paddingY: 0.5, cursor: 'none' }}  >
                        <BeenhereIcon />
                    </IconButton>
                } else {
                    return <IconButton sx={{ paddingY: 0.5 }} onClick={() => LeaveCancel(params)} >
                        <DeleteIcon color='primary' />
                    </IconButton>
                }
            }
        },
    ])



    return (
        <Fragment>
            <Suspense>
                <LeaveCancelEmp open={leaveReqModal} setOpen={setleaveReqModal} data={lveData} setCount={setCount} />
                <HalfdayCancelEmp open={halfDayReqModal} setOpen={sethalfDayReqModal} data={halfData} setCount={setCount} />
                <NopunchCancelEmp open={noPunchReqModal} setOpen={setnoPunchReqModal} data={noPunchData} setCount={setCount} />
                {/* <CompOffCancelEmp open={coffReqModal} setOpen={setcoffReqModal} data={coffData} setCount={setCount} /> */}
            </Suspense>
            {/* {
                flag === 1 ? <DeptSectionBasedEmpTable leavecanceldetl={tableData} setCount={setCount} /> : */}
            <Paper square elevation={0} sx={{
                p: 1, mt: 0.5, display: 'flex', flexDirection: "column",
                width: "100%"
            }} >
                <CommonAgGrid
                    columnDefs={columnDef}
                    tableData={empData}
                    sx={{
                        height: 400,
                        width: "100%"
                    }}
                    rowHeight={30}
                    headerHeight={30}
                />
            </Paper>
        </Fragment>
    )
}

export default memo(RequestedLeaveTable)