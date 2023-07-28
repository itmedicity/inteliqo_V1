import { IconButton, Paper, Tooltip } from '@mui/material'
import moment from 'moment'
import React, { Fragment, memo, useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CommonAgGrid from 'src/views/Component/CommonAgGrid'
import _ from 'underscore'
import { getEnableMisspunch, getGeneralRqst, getOnDutyReqst, getOneHourReqst } from 'src/redux/actions/CommonReqst.Action';
import DeleteIcon from '@mui/icons-material/Delete';
import { succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc'
import { ToastContainer } from 'react-toastify'
import { axioslogin } from 'src/views/Axios/Axios'

const TableViewPage = ({ show }) => {
    const dispatch = useDispatch();
    const [count, setCount] = useState(0)
    const [tableData, setTableData] = useState([])

    useEffect(() => {
        dispatch(getGeneralRqst())
        dispatch(getOnDutyReqst())
        dispatch(getOneHourReqst())
        dispatch(getEnableMisspunch())
    }, [dispatch, count])


    //get the employee details for taking the HOd and Incharge Details
    const employeeState = useSelector((state) => state.getProfileData.ProfileData, _.isEqual);
    const employeeProfileDetl = useMemo(() => employeeState[0], [employeeState]);
    const { hod, incharge, em_id } = employeeProfileDetl;

    const state = useSelector((state) => state.hodAuthorisedSection.sectionDetal, _.isEqual);
    const authorizationBasedDeptSection = useMemo(() => state, [state]);

    const generalData = useSelector((state) => state?.setCommonreqstAll?.generalData?.generalDataList, _.isEqual)
    const genrealReqst = useMemo(() => generalData, [generalData])
    const enableData = useSelector((state) => state?.setCommonreqstAll?.enableData?.enableDataList, _.isEqual)
    const punchEnable = useMemo(() => enableData, [enableData])
    const onDutyData = useSelector((state) => state?.setCommonreqstAll?.onDutyData?.onDutyDataLis, _.isEqual)
    const onduty = useMemo(() => onDutyData, [onDutyData])
    const oneHourData = useSelector((state) => state?.setCommonreqstAll?.oneHourData?.oneHourDataList, _.isEqual)
    const OneData = useMemo(() => oneHourData, [oneHourData])

    useEffect(() => {

        if (hod === 0 && incharge === 0) {
            const filterArray = punchEnable && punchEnable.filter((val) => {
                return (val.em_id === em_id)
            })
            const newEnable = filterArray.map((val) => {
                return {
                    typeslno: 1,
                    type: 'Enable punch for OT',
                    slno: val.slno,
                    serialno: val.serialno,
                    empname: val.em_name,
                    sectname: val.sect_name,
                    reqDate: moment(val.request_date).format('DD-MM-YYYY'),
                    dutyDate: moment(val.miss_punch_day).format('DD-MM-YYYY'),
                    reason: val.reason,
                    hrstatus: val.hr_approval_status,
                    status: (val.incharge_req_status === 1 && val.incharge_approval_status === 0) ? 'Incharge Approval Pending' :
                        (val.hod_req_status === 1 && val.hod_approval_status === 0) ? 'HOD Approval Pending' :
                            (val.ceo_req_status === 1 && val.ceo_approval_status === 0) ? 'CEO Approval Pending' :
                                (val.hr_req_status === 1 && val.hr_approval_status === 1) ? 'Approved' :
                                    (val.hr_req_status === 1 && val.hr_approval_status === 2) ? 'Reject' : 'HR Approval Pending',
                }
            })

            const array1 = onduty && onduty.filter((val) => {
                return (val.em_id === em_id)
            })
            const newOnduty = array1.map((val) => {
                return {
                    typeslno: 2,
                    type: 'On Duty Request',
                    slno: val.onduty_slno,
                    serialno: val.serialno,
                    empname: val.em_name,
                    sectname: val.sect_name,
                    reqDate: moment(val.request_date).format('DD-MM-YYYY'),
                    dutyDate: moment(val.miss_punch_day).format('DD-MM-YYYY'),
                    reason: val.onduty_reason,
                    status: (val.incharge_req_status === 1 && val.incharge_approval_status === 0) ? 'Incharge Approval Pending' :
                        (val.hod_req_status === 1 && val.hod_approval_status === 0) ? 'HOD Approval Pending' :
                            (val.ceo_req_status === 1 && val.ceo_approval_status === 0) ? 'CEO Approval Pending' :
                                (val.hr_req_status === 1 && val.hr_approval_status === 1) ? 'Approved' :
                                    (val.hr_req_status === 1 && val.hr_approval_status === 2) ? 'Reject' : 'HR Approval Pending',
                }
            })
            const array2 = OneData && OneData.filter((val) => {
                return (val.em_id === em_id)
            })
            const newOne = array2.map((val) => {
                return {
                    typeslno: 3,
                    type: 'One Hour Request',
                    slno: val.request_slno,
                    serialno: val.serialno,
                    empname: val.em_name,
                    sectname: val.sect_name,
                    reqDate: moment(val.request_date).format('DD-MM-YYYY'),
                    dutyDate: moment(val.one_hour_duty_day).format('DD-MM-YYYY'),
                    reason: val.reason,
                    hrstatus: val.hr_approval_status,
                    status: (val.incharge_req_status === 1 && val.incharge_approval_status === 0) ? 'Incharge Approval Pending' :
                        (val.hod_req_status === 1 && val.hod_approval_status === 0) ? 'HOD Approval Pending' :
                            (val.ceo_req_status === 1 && val.ceo_approval_status === 0) ? 'CEO Approval Pending' :
                                (val.hr_req_status === 1 && val.hr_approval_status === 1) ? 'Approved' :
                                    (val.hr_req_status === 1 && val.hr_approval_status === 2) ? 'Reject' : 'HR Approval Pending',
                }
            })
            setTableData([...newEnable, ...newOnduty, ...newOne])
        } else {
            let array = punchEnable.filter((value) => {
                return authorizationBasedDeptSection.find((val) => {
                    return value.dept_sect_id === val.dept_section;
                })
            })
            const newEnable = array.map((val) => {
                return {
                    typeslno: 1,
                    type: 'Enable punch for OT',
                    slno: val.slno,
                    serialno: val.serialno,
                    empname: val.em_name,
                    sectname: val.sect_name,
                    reqDate: moment(val.request_date).format('DD-MM-YYYY'),
                    dutyDate: moment(val.miss_punch_day).format('DD-MM-YYYY'),
                    reason: val.reason,
                    hrstatus: val.hr_approval_status,
                    status: (val.incharge_req_status === 1 && val.incharge_approval_status === 0) ? 'Incharge Approval Pending' :
                        (val.hod_req_status === 1 && val.hod_approval_status === 0) ? 'HOD Approval Pending' :
                            (val.ceo_req_status === 1 && val.ceo_approval_status === 0) ? 'CEO Approval Pending' :
                                (val.hr_req_status === 1 && val.hr_approval_status === 1) ? 'Approved' :
                                    (val.hr_req_status === 1 && val.hr_approval_status === 2) ? 'Reject' : 'HR Approval Pending',
                }
            })
            let array1 = onduty.filter((value) => {
                return authorizationBasedDeptSection.find((val) => {
                    return value.dept_sect_id === val.dept_section;
                })
            })
            const newOnduty = array1.map((val) => {
                return {
                    typeslno: 2,
                    type: 'On Duty Request',
                    slno: val.onduty_slno,
                    serialno: val.serialno,
                    empname: val.em_name,
                    sectname: val.sect_name,
                    reqDate: moment(val.request_date).format('DD-MM-YYYY'),
                    dutyDate: moment(val.miss_punch_day).format('DD-MM-YYYY'),
                    reason: val.onduty_reason,
                    status: (val.incharge_req_status === 1 && val.incharge_approval_status === 0) ? 'Incharge Approval Pending' :
                        (val.hod_req_status === 1 && val.hod_approval_status === 0) ? 'HOD Approval Pending' :
                            (val.ceo_req_status === 1 && val.ceo_approval_status === 0) ? 'CEO Approval Pending' :
                                (val.hr_req_status === 1 && val.hr_approval_status === 1) ? 'Approved' :
                                    (val.hr_req_status === 1 && val.hr_approval_status === 2) ? 'Reject' : 'HR Approval Pending',
                }
            })
            let array2 = OneData.filter((value) => {
                return authorizationBasedDeptSection.find((val) => {
                    return value.dept_sect_id === val.dept_section;
                })
            })

            const newOne = array2.map((val) => {
                return {
                    typeslno: 3,
                    type: 'One Hour Request',
                    slno: val.request_slno,
                    serialno: val.serialno,
                    empname: val.em_name,
                    sectname: val.sect_name,
                    reqDate: moment(val.request_date).format('DD-MM-YYYY'),
                    dutyDate: moment(val.one_hour_duty_day).format('DD-MM-YYYY'),
                    reason: val.reason,
                    hrstatus: val.hr_approval_status,
                    status: (val.incharge_req_status === 1 && val.incharge_approval_status === 0) ? 'Incharge Approval Pending' :
                        (val.hod_req_status === 1 && val.hod_approval_status === 0) ? 'HOD Approval Pending' :
                            (val.ceo_req_status === 1 && val.ceo_approval_status === 0) ? 'CEO Approval Pending' :
                                (val.hr_req_status === 1 && val.hr_approval_status === 1) ? 'Approved' :
                                    (val.hr_req_status === 1 && val.hr_approval_status === 2) ? 'Reject' : 'HR Approval Pending',
                }
            })

            setTableData([...newEnable, ...newOnduty, ...newOne])
        }
    }, [genrealReqst, punchEnable, onduty, OneData, authorizationBasedDeptSection, em_id, hod, incharge])

    const [column] = useState([
        { headerName: 'Slno ', field: 'serialno', filter: true },
        { headerName: 'Request Date', field: 'reqDate', filter: true },
        { headerName: 'Request Type  ', field: 'requestname', },
        { headerName: 'Status', field: 'status', filter: true },
        {
            headerName: 'Action',
            cellRenderer: params =>
                <Fragment>
                    <Tooltip title="Delete" followCursor placement='top' arrow >
                        <IconButton sx={{ paddingY: 0.5 }}
                            onClick={() => deleteGene(params)}
                        >
                            <DeleteIcon color='primary' />
                        </IconButton>
                    </Tooltip>
                </Fragment>
        },
    ])


    const [columndef] = useState([
        { headerName: 'Emp Name', field: 'empname' },
        { headerName: 'Department Section ', field: 'sectname' },
        { headerName: 'Request Type ', field: 'type' },
        { headerName: 'Duty Date ', field: 'dutyDate', filter: true },
        { headerName: 'Request Date', field: 'reqDate', filter: true },
        { headerName: 'Reason ', field: 'reason', },
        { headerName: 'Status', field: 'status', filter: true },
        {
            headerName: 'Action',
            cellRenderer: params =>
                <Fragment>
                    <Tooltip title="Delete" followCursor placement='top' arrow >
                        <IconButton sx={{ paddingY: 0.5 }}
                            onClick={() => deleteRequest(params)}
                        >
                            <DeleteIcon color='primary' />
                        </IconButton>
                    </Tooltip>
                </Fragment>
        },
    ])

    const deleteRequest = useCallback(async (params) => {
        const data = params.api.getSelectedRows()
        const { typeslno, hrstatus, slno } = data[0]
        if (hrstatus === 1) {
            warningNofity("HR Approval is Already done! You can't delete request")
        }
        else if (hrstatus === 2) {
            warningNofity("HR Rejected, You can't delete request")
        } else {
            if (typeslno === 1) {
                const Ids = {
                    slno: slno
                }
                const result = await axioslogin.patch('/CommonReqst/cancel/enable', Ids)
                const { message, success } = result.data
                if (success === 1) {
                    succesNofity(message)
                    setCount(count + 1)
                } else {
                    warningNofity(message)
                }
            } else if (typeslno === 2) {
                const Ids = {
                    slno: slno
                }
                const result = await axioslogin.patch('/CommonReqst/cancel/onduty', Ids)
                const { message, success } = result.data
                if (success === 1) {
                    succesNofity(message)
                    setCount(count + 1)
                } else {
                    warningNofity(message)
                }
            } else if (typeslno === 3) {
                const Ids = {
                    slno: slno
                }
                const result = await axioslogin.patch('/CommonReqst/cancel/onhour', Ids)
                const { message, success } = result.data
                if (success === 1) {
                    succesNofity(message)
                    setCount(count + 1)
                } else {
                    warningNofity(message)
                }
            }
        }
    }, [count])

    const deleteGene = useCallback(async (params) => {
        const data = params.api.getSelectedRows()
        const { hrstatus, slno } = data[0]
        if (hrstatus === 1) {
            warningNofity("HR Approval is Already done! You can't delete request")
        } else {
            const Ids = {
                slno: slno
            }
            const result = await axioslogin.patch('/CommonReqst/cancel/general', Ids)
            const { message, success } = result.data
            if (success === 1) {
                succesNofity(message)
                setCount(count + 1)
            } else {
                warningNofity(message)
            }
        }
    }, [count])

    useEffect(() => {
        if (show === 4) {
            const filterArray = genrealReqst?.filter((val) => {
                return (val.em_id === em_id)
            })
            const arr = filterArray.map((val) => {
                return {
                    slno: val.general_slno,
                    serialno: val.serialno,
                    reqDate: moment(val.request_date).format('DD-MM-YYYY'),
                    dutyDate: moment(val.miss_punch_day).format('DD-MM-YYYY'),
                    requestname: val.request_name,
                    hrstatus: val.hr_status,
                    status: (val.hr_status === 1) ? 'HR Approved' : 'HR Approval Pending'
                }
            })
            setTableData(arr);
        }
    }, [show, genrealReqst, em_id])

    return (
        <Paper square sx={{ p: 1, mt: 0.5, display: 'flex', flexDirection: "column" }} >
            <ToastContainer />
            <CommonAgGrid
                columnDefs={show === 4 ? column : columndef}
                tableData={tableData}
                sx={{
                    height: 400,
                    width: "100%"
                }}
                rowHeight={30}
                headerHeight={30}
            />
        </Paper>
    )
}

export default memo(TableViewPage) 