import { IconButton, Paper, Tooltip } from '@mui/material'
import React, { memo, useCallback, useEffect, useState } from 'react'
import CommonAgGrid from 'src/views/Component/CommonAgGrid'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useSelector } from 'react-redux';
import { Halfdaymapping, MappingData, nopunchmapping } from '../LeaveCommonComponent/LeaveApprovalFunc';
import LeavRqModel from '../LeaveCommonComponent/LeavRqModel';
import HaldayRqModel from '../LeaveCommonComponent/HaldayRqModel';
import NopunchRqModel from '../LeaveCommonComponent/NopunchRqModel';

const HodleaveTable = ({ levtpevalue, deptSect, setcount }) => {

    const [openleave, setOpenleave] = useState(false);
    const [opennopunch, setOpennopunch] = useState(false);
    const [openhalf, setOpenhalf] = useState(false);
    const [tableData, setTableData] = useState([])
    const [empData, setEmpData] = useState({})


    const sectionWiseLeaveRequest = useSelector((state) => state?.getSectLeaveRequests?.sectLeaves)
    const sectionWisehalfdayRequest = useSelector((state) => state?.getSectHalfdayRequests?.sectHalfday)
    const sectionWiseMisspunchRequest = useSelector((state) => state?.getSectMisspunchRequests?.sectMisspunch)

    useEffect(() => {
        if (levtpevalue === 1 && deptSect === 0) {
            const filterleavereq = sectionWiseLeaveRequest?.filter((val) => {
                return (val.hod_apprv_req === 1 && val.hod_apprv_status === 0)
            })
            MappingData(filterleavereq).then((val) => {
                if (Object.keys(val).length > 0) {
                    const arr = val && val.filter((k) => {
                        return (k.hr_apprv !== 1)
                    })
                    const arr1 = arr && arr.filter((k) => {
                        return (k.incaprv !== 2)
                    })
                    setTableData(arr1)
                } else {
                    setTableData([])
                }
            })
        } else if (levtpevalue === 1 && deptSect !== 0) {
            const filterleavereq = sectionWiseLeaveRequest?.filter((val) => {
                return (val.dept_section === deptSect && val.hod_apprv_req === 1 && val.hod_apprv_status === 0)
            })
            MappingData(filterleavereq).then((val) => {
                if (Object.keys(val).length > 0) {
                    const arr = val && val.filter((k) => {
                        return (k.hr_apprv !== 1)
                    })
                    const arr1 = arr && arr.filter((k) => {
                        return (k.incaprv !== 2)
                    })
                    setTableData(arr1)
                } else {
                    setTableData([])
                }
            })
        } else if (levtpevalue === 2 && deptSect === 0) {
            const filterleavereq = sectionWisehalfdayRequest?.filter((val) => {
                return (val.hf_hod_apprv_req === 1 && val.hf_hod_apprv_status === 0)
            })
            Halfdaymapping(filterleavereq).then((val) => {
                if (Object.keys(val).length > 0) {
                    const arr = val && val.filter((k) => {
                        return (k.hr_apprv !== 1)
                    })
                    const arr1 = arr && arr.filter((k) => {
                        return (k.incaprv !== 2)
                    })
                    setTableData(arr1)
                } else {
                    setTableData([])
                }
            })
        } else if (levtpevalue === 2 && deptSect !== 0) {
            const filterdata = sectionWisehalfdayRequest?.filter((val) => {
                return (val.dept_section === deptSect && val.hf_hod_apprv_req === 1 && val.hf_hod_apprv_status === 0)
            })
            Halfdaymapping(filterdata).then((val) => {
                if (Object.keys(val).length > 0) {
                    const arr = val && val.filter((k) => {
                        return (k.hr_apprv !== 1)
                    })
                    const arr1 = arr && arr.filter((k) => {
                        return (k.incaprv !== 2)
                    })
                    setTableData(arr1)
                } else {
                    setTableData([])
                }
            })
        } else if (levtpevalue === 3 && deptSect === 0) {
            const filterleavereq = sectionWiseMisspunchRequest && sectionWiseMisspunchRequest.filter((val) => {
                return (val.np_hod_apprv_req === 1 && val.np_hod_apprv_status === 0)
            })
            nopunchmapping(filterleavereq).then((val) => {
                if (Object.keys(val).length > 0) {
                    const arr = val && val.filter((k) => {
                        return (k.hr_apprv !== 1)
                    })
                    const arr1 = arr && arr.filter((k) => {
                        return (k.incaprv !== 2)
                    })
                    setTableData(arr1)
                } else {
                    setTableData([])
                }
            })
        } else if (levtpevalue === 3 && deptSect !== 0) {
            const filterdata = sectionWiseMisspunchRequest && sectionWiseMisspunchRequest.filter((val) => {
                return (val.em_dept_section === deptSect && val.np_hod_apprv_req === 1 && val.np_hod_apprv_status === 0)
            })
            nopunchmapping(filterdata).then((val) => {
                if (Object.keys(val).length > 0) {
                    const arr = val && val.filter((k) => {
                        return (k.hr_apprv !== 1)
                    })
                    const arr1 = arr && arr.filter((k) => {
                        return (k.incaprv !== 2)
                    })
                    setTableData(arr1)
                } else {
                    setTableData([])
                }
            })
        }

    }, [sectionWiseLeaveRequest, sectionWisehalfdayRequest, sectionWiseMisspunchRequest,
        levtpevalue, deptSect]);

    const [columnDef] = useState([
        { headerName: 'ID#', field: 'Emp_no', filter: true, minWidth: 100 },
        { headerName: 'Name ', field: 'Employee_name', filter: true, minWidth: 200 },
        { headerName: 'Department Section', field: 'sect_name', filter: true, minWidth: 200 },
        { headerName: 'Status ', field: 'inStatus', minWidth: 200, filter: true },
        {
            headerName: 'Action',
            cellRenderer: params => {
                if (params.data.hodaprv === 1 || params.data.hodaprv === 2 || params.data.incaprv === 2 || params.data.hr_apprv === 1) {
                    return <IconButton
                        sx={{ paddingY: 0.5 }}  >
                        <CheckCircleOutlineIcon />
                    </IconButton>
                } else {
                    return <IconButton onClick={() => handleClick(params)}
                        sx={{ paddingY: 0.5 }} >
                        <Tooltip title="Click Here to Approve/Reject">
                            <CheckCircleOutlineIcon color='primary' />
                        </Tooltip>
                    </IconButton>
                }
            }, minWidth: 200,

        },
    ])

    const rowStyle = { background: '#CE7D78' };
    const getRowStyle = params => {
        if (params.data.hodaprv === 2 || params.data.incaprv === 2) {
            return { background: '#CE7D78' };
        }
    };

    const handleClick = async (params) => {
        const data = params.data
        setEmpData(data)
        const { req_type } = data;
        if (req_type === 1) {
            setOpenleave(true)
        } else if (req_type === 2) {
            setOpenhalf(true)
        } else if (req_type === 3) {
            setOpennopunch(true)
        }
    }

    const handleClose = useCallback(() => {
        setOpenleave(false);
        setOpennopunch(false);
        setOpenhalf(false);
    }, []);


    return (
        <>
            <LeavRqModel open={openleave} setOpen={setOpenleave} empData={empData} authority={2} setcount={setcount} />
            <HaldayRqModel open={openhalf} setOpen={setOpenhalf} handleClose={handleClose} empData={empData} authority={2} setcount={setcount} />
            <NopunchRqModel open={opennopunch} setOpen={setOpennopunch} handleClose={handleClose} empData={empData} authority={2} setcount={setcount} />
            <Paper square elevation={0} sx={{ p: 1, display: 'flex', flexDirection: "column" }} >
                <CommonAgGrid
                    columnDefs={columnDef}
                    tableData={tableData}
                    sx={{
                        height: 600,
                        width: "100%"
                    }}
                    rowHeight={30}
                    headerHeight={30}
                    rowStyle={rowStyle}
                    getRowStyle={getRowStyle}
                />
            </Paper>
        </>
    )
}

export default memo(HodleaveTable) 