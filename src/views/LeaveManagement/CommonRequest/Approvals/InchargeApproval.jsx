import { CssVarsProvider } from '@mui/joy';
import { Box, IconButton, Paper, Tooltip } from '@mui/material';
import React, { memo, Suspense, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getEnableMisspunch, getOnDutyReqst, getOneHourReqst } from 'src/redux/actions/CommonReqst.Action';
import CommonAgGrid from 'src/views/Component/CommonAgGrid';
import CustomLayout from 'src/views/Component/MuiCustomComponent/CustomLayout';
import MappingCheckbox from 'src/views/MuiComponents/MappingCheckbox';
import _ from 'underscore';
import DeptSectionSelect from '../../NightOff/DeptSectionSelect';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import BeenhereIcon from '@mui/icons-material/Beenhere';
import EnableMispunchmodal from './Modals/EnableMispunchmodal';
import OndutyReqstModal from './Modals/OndutyReqstModal';
import OneHourReqstModal from './Modals/OneHourReqstModal';
import ApprovalDeptSectSelection from 'src/views/MuiComponents/ApprovalDeptSectSelection';
import { infoNofity } from 'src/views/CommonCode/Commonfunc';

const InchargeApproval = () => {

    const dispatch = useDispatch()
    const [deptSection, setDeptSection] = useState(0)
    const [selectValue, setSelectValue] = useState(1)
    const [tableData, setTableData] = useState([])//for displaying table data
    const [DeptSect, updateDeptSect] = useState([])

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
    const employeeState = useSelector((state) => state.getProfileData.ProfileData, _.isEqual);
    const employeeProfileDetl = useMemo(() => employeeState[0], [employeeState]);
    const { em_id } = employeeProfileDetl;

    const oneHourData = useSelector((state) => state?.setCommonreqstAll?.oneHourData?.oneHourDataList, _.isEqual)
    const onDutyData = useSelector((state) => state?.setCommonreqstAll?.onDutyData?.onDutyDataLis, _.isEqual)
    const enableData = useSelector((state) => state?.setCommonreqstAll?.enableData?.enableDataList, _.isEqual)


    const [columnDef] = useState([
        { headerName: 'Slno', field: 'slno', filter: true, minWidth: 100 },
        { headerName: 'ID#', field: 'emno', filter: true, minWidth: 100 },
        { headerName: 'Name ', field: 'name', filter: true, minWidth: 200 },
        { headerName: 'Department Section', field: 'section', filter: true, minWidth: 200 },
        { headerName: 'Request Date', field: 'section', filter: true, minWidth: 200 },
        { headerName: 'Status ', field: 'status', minWidth: 200 },
        {
            headerName: 'Action',
            cellRenderer: params => {
                if (params.data.incaprv === 1 || params.data.incaprv === 2) {
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
        const arraydepsect = DeptSect.map((val) => { return val.dept_section })

        if (selectValue === 2 && deptSection === 0) {
            const filtered = onDutyData.filter(val => arraydepsect.includes(val.dept_sect_id))
            const filteronDuty = filtered && filtered.filter((val) => {
                return (val.hod_req_status === 1)
            })
            if (Object.keys(filteronDuty).length > 0) {
                const arr = filteronDuty?.map((val) => {
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
                setTableData(arr)

            } else {
                infoNofity("No On Duty request pending for this department!!")
                setTableData([])
            }
        } else if (selectValue === 2 && deptSection === 0) {
            const filteronDuty = onDutyData && onDutyData.filter((val) => {
                return (val.dept_sect_id === deptSection && val.hod_req_status === 1)
            })
            if (Object.keys(filteronDuty).length > 0) {
                const arr = filteronDuty?.map((val) => {
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
                setTableData(arr)
            } else {
                infoNofity("No On Duty request pending for this department!!")
                setTableData([])
            }
        }

        else if (selectValue === 3 && deptSection === 0) {
            const filtered = oneHourData.filter(val => arraydepsect.includes(val.dept_sect_id))
            const filteronehour = filtered && filtered.filter((val) => {
                return (val.hod_req_status === 1)
            })
            if (Object.keys(filteronehour).length > 0) {
                const arr = filteronehour?.map((val) => {
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
                setTableData(arr)
            } else {
                infoNofity("No One Hour request pending for this department!!")
                setTableData([])
            }

        } else if (selectValue === 3 && deptSection !== 0) {
            const filteronehour = oneHourData && oneHourData.filter((val) => {
                return (val.dept_sect_id === deptSection && val.hod_req_status === 1)
            })
            if (Object.keys(filteronehour).length > 0) {
                const arr = filteronehour?.map((val) => {
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
                setTableData(arr)
            } else {
                infoNofity("No One Hour request pending for this department!!")
                setTableData([])
            }

        } else if (selectValue === 1 && deptSection === 0) {
            const filtered = enableData.filter(val => arraydepsect.includes(val.dept_sect_id))
            const filterenable = filtered && filtered.filter((val) => {
                return (val.hod_req_status === 1)
            })
            if (Object.keys(filterenable).length > 0) {
                const arr = filterenable?.map((val) => {
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
                setTableData(arr)
            } else {
                infoNofity("No request pending for this department!!")
                setTableData([])
            }
        } else if (selectValue === 1 && deptSection !== 0) {
            const filterenable = enableData && enableData.filter((val) => {
                return (val.dept_sect_id === deptSection && val.hod_req_status === 1)
            })
            if (Object.keys(filterenable).length > 0) {
                const arr = filterenable?.map((val) => {
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
                setTableData(arr)
            } else {
                infoNofity("No request pending for this department!!")
                setTableData([])
            }
        }
    }, [oneHourData, onDutyData, enableData, selectValue, deptSection, DeptSect])

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
        <CustomLayout title="Common Request Incharge Approval" displayClose={true} >
            <Suspense>
                <EnableMispunchmodal open={openenable} setOpen={setOpenEnable} data={modelData} setCount={setCount} count={count} authority={1} />
                <OndutyReqstModal open={openOnduty} setOpen={setOpenOnduty} data={modelData} setCount={setCount} count={count} authority={1} />
                <OneHourReqstModal open={oneHourRq} setOpen={setOpenOneHour} data={modelData} setCount={setCount} count={count} authority={1} />
            </Suspense>
            <Box sx={{ display: 'flex', flex: 1, px: 0.8, mt: 0.3, flexDirection: 'column', width: '100%' }}>
                <Paper square variant='outlined' sx={{ display: 'flex', flex: 1, p: 1, flexDirection: 'row', width: '100%' }}>
                    <Box sx={{ flex: 1, alignItems: 'center', mt: 0.5, px: 0.3 }} >
                        <ApprovalDeptSectSelection em_id={em_id} value={deptSection} setValue={setDeptSection} updateDeptSect={updateDeptSect} />
                    </Box>
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

export default memo(InchargeApproval) 