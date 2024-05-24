import { CssVarsProvider } from '@mui/joy';
import { Box, IconButton, Paper, Tooltip } from '@mui/material'
import React, { memo, Suspense, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import CommonAgGrid from 'src/views/Component/CommonAgGrid';
import CustomLayout from 'src/views/Component/MuiCustomComponent/CustomLayout'
import MappingCheckbox from 'src/views/MuiComponents/MappingCheckbox';
import _ from 'underscore';
import { getEnableMisspunch, getOnDutyReqst, getOneHourReqst } from 'src/redux/actions/CommonReqst.Action';
import BeenhereIcon from '@mui/icons-material/Beenhere';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import EnableMispunchmodal from './Modals/EnableMispunchmodal';
import OndutyReqstModal from './Modals/OndutyReqstModal';
import OneHourReqstModal from './Modals/OneHourReqstModal';

const CeoApproval = () => {

    const dispatch = useDispatch()
    const [selectValue, setSelectValue] = useState(1)
    const [tableData, setTableData] = useState([])//for displaying table data

    const [openenable, setOpenEnable] = useState(false)
    const [openOnduty, setOpenOnduty] = useState(false)
    const [oneHourRq, setOpenOneHour] = useState(false)
    const [modelData, setModelData] = useState([])
    const [count, setCount] = useState(0)



    const request = [
        { value: 1, name: "Enable Miss Punch for OT" },
        { value: 2, name: "On Duty Request" },
        { value: 3, name: "One Hour Request" }
    ]
    useEffect(() => {
        dispatch(getOneHourReqst())
        dispatch(getOnDutyReqst())
        dispatch(getEnableMisspunch())
    }, [dispatch, count])

    //get the employee details for taking the HOd and Incharge Details
    // const employeeState = useSelector((state) => state.getProfileData.ProfileData, _.isEqual);
    // const employeeProfileDetl = useMemo(() => employeeState[0], [employeeState]);
    // const { hod, incharge, em_id, em_department, em_no, em_name, sect_name, em_dept_section, desg_name } = employeeProfileDetl;

    const oneHourData = useSelector((state) => state?.setCommonreqstAll?.oneHourData?.oneHourDataList, _.isEqual)
    const onDutyData = useSelector((state) => state?.setCommonreqstAll?.onDutyData?.onDutyDataLis, _.isEqual)
    const enableData = useSelector((state) => state?.setCommonreqstAll?.enableData?.enableDataList, _.isEqual)

    const [columnDef] = useState([
        { headerName: 'Slno', field: 'slno', filter: true, minWidth: 100 },
        { headerName: 'ID#', field: 'emno', filter: true, minWidth: 100 },
        { headerName: 'Name ', field: 'name', filter: true, minWidth: 200 },
        { headerName: 'Department Section', field: 'section', filter: true, minWidth: 200 },
        { headerName: 'Status ', field: 'status', minWidth: 200, filter: true },
        {
            headerName: 'Action',
            cellRenderer: params => {
                if (params.data.ceo_apprv === 1 || params.data.ceo_apprv === 2 || params.data.incaprv === 0 || params.data.hodaprv === 0) {
                    return <IconButton
                        sx={{ paddingY: 0.5 }} >
                        <BeenhereIcon />
                    </IconButton>
                } else {
                    return <IconButton onClick={() => handleClick(params)}
                        sx={{ paddingY: 0.5 }} >
                        <Tooltip title="Click Here to Approve/Reject">
                            <CheckCircleOutlineIcon color='primary' />
                        </Tooltip>
                    </IconButton>
                }
            }
        },
    ])

    useEffect(() => {
        if (selectValue === 2) {
            if (Object.keys(onDutyData).length > 0) {
                const arr = onDutyData?.map((val) => {
                    return {
                        reqsttype: 2,
                        slno: val.onduty_slno,
                        emno: val.em_no,
                        name: val.em_name,
                        section: val.dept_name,
                        increq: val.incharge_req_status,
                        incaprv: val.incharge_approval_status,
                        hod_req: val.hod_req_status,
                        hodaprv: val.hod_approval_status,
                        ceo_req: val.ceo_req_status,
                        ceo_apprv: val.ceo_approval_status,
                        hrreq: val.hr_req_status,
                        hr_apprv: val.hr_approval_status,
                        status: (val.incharge_req_status === 1 && val.incharge_approval_status === 0) ? 'Incharge Approval Pending' :
                            (val.hod_req_status === 1 && val.hod_approval_status === 0) ? 'HOD Approval Pending' :
                                (val.ceo_req_status === 1 && val.ceo_approval_status === 0) ? 'CEO Approval Pending' :
                                    (val.hr_req_status === 1 && val.hr_approval_status === 1) ? 'Approved' :
                                        (val.hr_req_status === 1 && val.hr_approval_status === 2) ? 'Reject' : 'HR Approval Pending',
                        hrstatus: val.hr_approval_status,
                        reqDate: val.request_date,
                        onDutydate: val.on_duty_date,
                        reason: val.onduty_reason,
                        shft_desc: val.shft_desc,
                        inchargeComment: val.incharge_approval_comment,
                        hodComment: val.hod_approval_comment,
                        ceoComment: val.ceo_approval_comment
                    }
                })

                const filterArray = arr && arr.filter((val) => {
                    return (val.ceo_req === 1)
                })

                setTableData(filterArray)
            } else {
                setTableData([])
            }
        } else if (selectValue === 3) {
            if (Object.keys(oneHourData).length > 0) {
                const arr = oneHourData?.map((val) => {
                    return {
                        reqsttype: 3,
                        slno: val.request_slno,
                        emno: val.em_no,
                        name: val.em_name,
                        section: val.dept_name,
                        increq: val.incharge_req_status,
                        incaprv: val.incharge_approval_status,
                        hod_req: val.hod_req_status,
                        hodaprv: val.hod_approval_status,
                        ceo_req: val.ceo_req_status,
                        ceo_apprv: val.ceo_approval_status,
                        hrreq: val.hr_req_status,
                        hr_apprv: val.hr_approval_status,
                        status: (val.incharge_req_status === 1 && val.incharge_approval_status === 0) ? 'Incharge Approval Pending' :
                            (val.hod_req_status === 1 && val.hod_approval_status === 0) ? 'HOD Approval Pending' :
                                (val.ceo_req_status === 1 && val.ceo_approval_status === 0) ? 'CEO Approval Pending' :
                                    (val.hr_req_status === 1 && val.hr_approval_status === 1) ? 'Approved' :
                                        (val.hr_req_status === 1 && val.hr_approval_status === 2) ? 'Reject' : 'HR Approval Pending',
                        hrstatus: val.hr_approval_status,
                        reqDate: val.request_date,
                        dutyDate: val.one_hour_duty_day,
                        reason: val.reason,
                        shft_desc: val.shft_desc,
                        check_in: val.check_in,
                        check_out: val.check_out,
                        inchargeComment: val.incharge_approval_comment,
                        hodComment: val.hod_approval_comment,
                        ceoComment: val.ceo_approval_comment
                    }
                })
                const filterArray = arr && arr.filter((val) => {
                    return (val.ceo_req === 1)
                })
                setTableData(filterArray)
            } else {
                setTableData([])
            }

        } else if (selectValue === 1) {
            if (Object.keys(enableData).length > 0) {
                const arr = enableData?.map((val) => {
                    return {
                        reqsttype: 1,
                        slno: val.slno,
                        emno: val.em_no,
                        name: val.em_name,
                        section: val.dept_name,
                        increq: val.incharge_req_status,
                        incaprv: val.incharge_approval_status,
                        hod_req: val.hod_req_status,
                        hodaprv: val.hod_approval_status,
                        ceo_req: val.ceo_req_status,
                        ceo_apprv: val.ceo_approval_status,
                        hrreq: val.hr_req_status,
                        hr_apprv: val.hr_approval_status,
                        status: (val.incharge_req_status === 1 && val.incharge_approval_status === 0) ? 'Incharge Approval Pending' :
                            (val.hod_req_status === 1 && val.hod_approval_status === 0) ? 'HOD Approval Pending' :
                                (val.ceo_req_status === 1 && val.ceo_approval_status === 0) ? 'CEO Approval Pending' :
                                    (val.hr_req_status === 1 && val.hr_approval_status === 1) ? 'Approved' :
                                        (val.hr_req_status === 1 && val.hr_approval_status === 2) ? 'Reject' : 'HR Approval Pending',
                        hrstatus: val.hr_approval_status,
                        reqDate: val.request_date,
                        punchDate: val.miss_punch_day,
                        reason: val.reason,
                        shft_desc: val.shft_desc,
                        check_in: val.check_in,
                        check_out: val.check_out,
                        checkInflag: val.checkInflag,
                        checkoutflag: val.checkoutflag,
                        inchargeComment: val.incharge_approval_comment,
                        hodComment: val.hod_approval_comment,
                        ceoComment: val.ceo_approval_comment
                    }
                })
                const filterArray = arr && arr.filter((val) => {
                    return (val.ceo_req === 1)
                })
                setTableData(filterArray)
            } else {
                setTableData([])
            }
        }
    }, [oneHourData, onDutyData, enableData, selectValue])

    const handleClick = async (params) => {
        const data = params.api.getSelectedRows()
        const { reqsttype } = data[0]
        if (reqsttype === 1) {
            setOpenEnable(true)
            setModelData(data)
        } else if (reqsttype === 2) {
            setModelData(data)
            setOpenOnduty(true)
        } else if (reqsttype === 3) {
            setModelData(data)
            setOpenOneHour(true)
        }
    }


    return (
        <CustomLayout title="Common Request CEO Approval" displayClose={true} >
            <Suspense>
                <EnableMispunchmodal open={openenable} setOpen={setOpenEnable} data={modelData} setCount={setCount} count={count} authority={3} />
                <OndutyReqstModal open={openOnduty} setOpen={setOpenOnduty} data={modelData} setCount={setCount} count={count} authority={3} />
                <OneHourReqstModal open={oneHourRq} setOpen={setOpenOneHour} data={modelData} setCount={setCount} count={count} authority={3} />
            </Suspense>
            <Box sx={{ display: 'flex', flex: 1, px: 0.8, mt: 0.3, flexDirection: 'column', width: '100%' }}>
                <Paper square variant='outlined' sx={{ display: 'flex', flex: 1, p: 1, flexDirection: 'row', width: '100%' }}>
                    <Box sx={{ display: 'flex', flex: 2 }}>
                        <CssVarsProvider>
                            {
                                request?.map((val, idx) => {
                                    return <Box sx={{
                                        display: 'flex', p: 1,
                                        width: { xl: "100%", lg: "100%", md: "100%", sm: "100%" }
                                    }}
                                        key={idx}
                                    >
                                        <MappingCheckbox
                                            label={val.name}
                                            name={val.name}
                                            value={val.value}
                                            onChange={setSelectValue}
                                            checkedValue={selectValue}
                                        />
                                    </Box>
                                })
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
                    // rowStyle={rowStyle}
                    // getRowStyle={getRowStyle}
                    />
                </Paper>
            </Box>
        </CustomLayout>
    )
}

export default memo(CeoApproval)