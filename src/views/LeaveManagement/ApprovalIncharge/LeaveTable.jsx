import { IconButton, Paper, Tooltip } from '@mui/material'
import React, { memo, useCallback, useEffect, useState } from 'react'
import CommonAgGrid from 'src/views/Component/CommonAgGrid'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useSelector } from 'react-redux';
import { Halfdaymapping, MappingData, nopunchmapping } from '../LeaveCommonComponent/LeaveApprovalFunc';
import { infoNofity } from 'src/views/CommonCode/Commonfunc';
import LeavRqModel from '../LeaveCommonComponent/LeavRqModel';
import HaldayRqModel from '../LeaveCommonComponent/HaldayRqModel';
import NopunchRqModel from '../LeaveCommonComponent/NopunchRqModel';

const LeaveTable = ({ levtpevalue, deptSect, setcount }) => {

    //state for open model
    const [openleave, setOpenleave] = useState(false);
    const [opennopunch, setOpennopunch] = useState(false);
    const [openhalf, setOpenhalf] = useState(false);
    //  const [count, setcount] = useState(0)//to render dispatch useeffect

    const [tableData, setTableData] = useState([])
    const [empData, setEmpData] = useState({})

    const sectionWiseLeaveRequest = useSelector((state) => state?.getSectLeaveRequests?.sectLeaves)
    const sectionWisehalfdayRequest = useSelector((state) => state?.getSectHalfdayRequests?.sectHalfday)
    const sectionWiseMisspunchRequest = useSelector((state) => state?.getSectMisspunchRequests?.sectMisspunch)

    useEffect(() => {
        if (levtpevalue === 1 && deptSect === 0) {
            const filterleavereq = sectionWiseLeaveRequest?.filter((val) => {
                return (val.inc_apprv_req === 1 && val.incapprv_status === 0)
            })
            MappingData(filterleavereq).then((val) => {
                if (Object.keys(val).length > 0) {
                    const arr = val && val.filter((k) => {
                        return (k.hr_apprv !== 1)
                    })
                    setTableData(arr)
                } else {
                    setTableData([])
                }
            })
        } else if (levtpevalue === 1 && deptSect !== 0) {
            const filterleavereq = sectionWiseLeaveRequest?.filter((val) => {
                return (val.dept_section === deptSect && val.inc_apprv_req === 1 && val.incapprv_status === 0)
            })
            MappingData(filterleavereq).then((val) => {
                if (Object.keys(val).length > 0) {
                    const arr = val && val.filter((k) => {
                        return (k.hr_apprv !== 1)
                    })
                    setTableData(arr)
                } else {
                    infoNofity("No Leave request pending for this department!!")
                    setTableData([])
                }
            })
        }
        else if (levtpevalue === 2 && deptSect === 0) {
            const filterleavereq = sectionWisehalfdayRequest?.filter((val) => {
                return (val.hf_inc_apprv_req === 1)
            })
            Halfdaymapping(filterleavereq).then((val) => {
                if (Object.keys(val).length > 0) {
                    const arr = val && val.filter((k) => {
                        return (k.hr_apprv !== 1)
                    })
                    setTableData(arr)
                } else {
                    infoNofity("No Leave request pending for this department!!")
                    setTableData([])
                }
            })
        } else if (levtpevalue === 2 && deptSect !== 0) {
            const filterdata = sectionWisehalfdayRequest?.filter((val) => {
                return (val.dept_section === deptSect && val.hf_inc_apprv_req === 1)
            })
            Halfdaymapping(filterdata).then((val) => {
                if (Object.keys(val).length > 0) {
                    const arr = val && val.filter((k) => {
                        return (k.hr_apprv !== 1)
                    })
                    setTableData(arr)
                } else {
                    infoNofity("No Leave request pending for this department!!")
                    setTableData([])
                }
            })
        } else if (levtpevalue === 3 && deptSect === 0) {
            const filterleavereq = sectionWiseMisspunchRequest?.filter((val) => {
                return (val.np_inc_apprv_req === 1)
            })
            nopunchmapping(filterleavereq).then((val) => {
                if (Object.keys(val).length > 0) {
                    const arr = val && val.filter((k) => {
                        return (k.hr_apprv !== 1)
                    })
                    setTableData(arr)
                } else {
                    infoNofity("No Leave request pending for this department!!")
                    setTableData([])
                }
            })
        } else if (levtpevalue === 3 && deptSect !== 0) {
            const filterdata = sectionWiseMisspunchRequest?.filter((val) => {
                return (val.em_dept_section === deptSect && val.np_inc_apprv_req === 1)
            })
            nopunchmapping(filterdata).then((val) => {
                if (Object.keys(val).length > 0) {
                    const arr = val && val.filter((k) => {
                        return (k.hr_apprv !== 1)
                    })
                    setTableData(arr)
                } else {
                    infoNofity("No Leave request pending for this department!!")
                    setTableData([])
                }
            })
        }

    }, [levtpevalue, deptSect, sectionWiseLeaveRequest, sectionWisehalfdayRequest, sectionWiseMisspunchRequest])


    const [columnDef] = useState([
        //   { headerName: 'Slno', field: 'row_slno', filter: true, minWidth: 100 },
        { headerName: 'ID#', field: 'Emp_no', filter: true, minWidth: 100 },
        { headerName: 'Name ', field: 'Employee_name', filter: true, minWidth: 200 },
        { headerName: 'Department Section', field: 'Department_section', filter: true, minWidth: 200 },
        { headerName: 'Status ', field: 'inStatus', minWidth: 200 },
        {
            headerName: 'Action',
            cellRenderer: params => {
                if (params.data.incaprv === 1 || params.data.incaprv === 2) {
                    return <IconButton
                        sx={{ paddingY: 0.5 }} >
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
            }, minWidth: 200

        },
    ])

    const rowStyle = { background: '#CE7D78' };
    const getRowStyle = params => {
        if (params.data.incaprv === 2) {
            return { background: '#CE7D78' };
        }
    };

    const handleClick = useCallback((params) => {
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
    }, [])

    const handleClose = () => {
        setOpenleave(false);
        setOpennopunch(false);
        // setOpencompen(false);
        setOpenhalf(false);
    };

    return (
        <>
            <LeavRqModel open={openleave} setOpen={setOpenleave} empData={empData} authority={1} setcount={setcount} />
            <HaldayRqModel open={openhalf} setOpen={setOpenhalf} handleClose={handleClose} empData={empData} authority={1} setcount={setcount} />
            <NopunchRqModel open={opennopunch} setOpen={setOpennopunch} handleClose={handleClose} empData={empData} authority={1} setcount={setcount} />
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

export default memo(LeaveTable) 