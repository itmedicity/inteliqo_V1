import React, { Fragment, useEffect, useState } from 'react'
import PageLayoutCloseOnly from 'src/views/CommonCode/PageLayoutCloseOnly'
import { useHistory } from 'react-router'
import { getleaverequest, infoNofity } from 'src/views/CommonCode/Commonfunc';
import { useDispatch, useSelector } from 'react-redux'
import { memo } from 'react'
import { Box, IconButton, Paper, Tooltip } from '@mui/material'
import { CssVarsProvider } from '@mui/joy'
import ApprovalDeptSectSelection from 'src/views/MuiComponents/ApprovalDeptSectSelection'
import CommonAgGrid from 'src/views/Component/CommonAgGrid'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import LeavRqModel from '../LeaveCommonComponent/LeavRqModel'
import HaldayRqModel from '../LeaveCommonComponent/HaldayRqModel'
import NopunchRqModel from '../LeaveCommonComponent/NopunchRqModel'
import CompOffRqModel from '../LeaveCommonComponent/CompOffRqModel'
import MappingCheckbox from 'src/views/MuiComponents/MappingCheckbox';
import { getCompOffRqstAll, getHalfdayRqstAll, getLeaveRequestAll, getNopunchRqstAll } from 'src/redux/actions/LeaveApprovalAction';
import _ from 'underscore';
import { compensatoryMapping, Halfdaymapping, MappingData, nopunchmapping } from '../LeaveCommonComponent/LeaveApprovalFunc';

const ApprovalIncharge = () => {
    const history = useHistory()
    const dispatch = useDispatch()

    const [leaverequesttype, setleaverequesttype] = useState([]);//leave type list
    const [deptSect, setDeptSect] = useState(0)//select box selected department section
    const [DeptSect, updateDeptSect] = useState([])//logined incharge dept section list
    const [levtpevalue, setleavetypevalue] = useState(1)//selected checkbox
    const [tableData, setTableData] = useState([])//for displaying table data
    const [slno, setSlno] = useState(0)//setting selected row slno
    const [reqtype, setreqtype] = useState(0)//for setting leave type linke halfday,leave req etc
    const [count, setcount] = useState(0)//to render dispatch useeffect

    //state for pen model
    const [openleave, setOpenleave] = useState(false);
    const [opennopunch, setOpennopunch] = useState(false);
    const [opencompen, setOpencompen] = useState(false);
    const [openhalf, setOpenhalf] = useState(false);

    //login incharge id
    const em_id = useSelector((state) => {
        return state?.getProfileData?.ProfileData[0]?.em_id ?? 0;
    })

    const RedirectToProfilePage = () => {
        history.push(`/Home`)
    }

    useEffect(() => {
        dispatch(getLeaveRequestAll())
        dispatch(getHalfdayRqstAll())
        dispatch(getNopunchRqstAll())
        dispatch(getCompOffRqstAll())
    }, [dispatch, count])

    const leaveRqData = useSelector((state) => state?.setAllLeaveApproval?.leaveRqData?.leaveRqList, _.isEqual)
    const halfdayRqData = useSelector((state) => state?.setAllLeaveApproval?.halfdayRqData?.halfdayRqList, _.isEqual)
    const nopunchRqData = useSelector((state) => state?.setAllLeaveApproval?.nopunchRqData?.nopunchRqList, _.isEqual)
    const compOffrqData = useSelector((state) => state?.setAllLeaveApproval?.compOffrqData?.compOffRqList, _.isEqual)

    useEffect(() => {
        //leavetype
        getleaverequest().then((val) => {
            setleaverequesttype(val)
        })
        const arraydepsect = DeptSect.map((val) => { return val.dept_section })
        if (arraydepsect.length !== 0) {
            if (levtpevalue === 1 && deptSect === 0) {
                const filtered = leaveRqData.filter(val => arraydepsect.includes(val.dept_section))
                const filterleavereq = filtered && filtered.filter((val) => {
                    return (val.inc_apprv_req === 1)
                })
                MappingData(filterleavereq).then((val) => {
                    if (Object.keys(val).length > 0) {
                        setTableData(val)
                    } else {
                        infoNofity("No Leave request pending for this department!!")
                        setTableData([])
                    }
                })
            } else if (levtpevalue === 1 && deptSect !== 0) {
                const filterleavereq = leaveRqData && leaveRqData.filter((val) => {
                    return (val.dept_section === deptSect && val.inc_apprv_req === 1)
                })
                MappingData(filterleavereq).then((val) => {
                    if (Object.keys(val).length > 0) {
                        setTableData(val)
                    } else {
                        infoNofity("No Leave request pending for this department!!")
                        setTableData([])
                    }
                })
            } else if (levtpevalue === 2 && deptSect === 0) {
                const filtered = halfdayRqData.filter(val => arraydepsect.includes(val.dept_section))
                const filterleavereq = filtered && filtered.filter((val) => {
                    return (val.hf_inc_apprv_req === 1)
                })
                Halfdaymapping(filterleavereq).then((val) => {
                    if (Object.keys(val).length > 0) {
                        setTableData(val)
                    } else {
                        infoNofity("No Leave request pending for this department!!")
                        setTableData([])
                    }
                })
            } else if (levtpevalue === 2 && deptSect !== 0) {
                const filterdata = halfdayRqData && halfdayRqData.filter((val) => {
                    return (val.dept_section === deptSect && val.hf_inc_apprv_req === 1)
                })
                Halfdaymapping(filterdata).then((val) => {
                    if (Object.keys(val).length > 0) {
                        setTableData(val)
                    } else {
                        infoNofity("No Leave request pending for this department!!")
                        setTableData([])
                    }
                })
            } else if (levtpevalue === 3 && deptSect === 0) {
                const filtered = nopunchRqData.filter(val => arraydepsect.includes(val.em_dept_section))
                const filterleavereq = filtered && filtered.filter((val) => {
                    return (val.np_inc_apprv_req === 1)
                })
                nopunchmapping(filterleavereq).then((val) => {
                    if (Object.keys(val).length > 0) {
                        setTableData(val)
                    } else {
                        infoNofity("No Leave request pending for this department!!")
                        setTableData([])
                    }
                })
            } else if (levtpevalue === 3 && deptSect !== 0) {
                const filterdata = nopunchRqData && nopunchRqData.filter((val) => {
                    return (val.em_dept_section === deptSect && val.np_inc_apprv_req === 1)
                })
                nopunchmapping(filterdata).then((val) => {
                    if (Object.keys(val).length > 0) {
                        setTableData(val)
                    } else {
                        infoNofity("No Leave request pending for this department!!")
                        setTableData([])
                    }
                })
            } else if (levtpevalue === 4 && deptSect === 0) {
                const filtered = compOffrqData.filter(val => arraydepsect.includes(val.em_dept_section))
                const filterleavereq = filtered && filtered.filter((val) => {
                    return (val.cf_inc_apprv_req === 1)
                })
                compensatoryMapping(filterleavereq).then((val) => {
                    if (Object.keys(val).length > 0) {
                        setTableData(val)
                    } else {
                        infoNofity("No Leave request pending for this department!!")
                        setTableData([])
                    }
                })
            } else if (levtpevalue === 4 && deptSect !== 0) {
                const filterdata = compOffrqData && compOffrqData.filter((val) => {
                    return (val.em_dept_section === deptSect && val.cf_inc_apprv_req === 1)
                })
                compensatoryMapping(filterdata).then((val) => {
                    if (Object.keys(val).length > 0) {
                        setTableData(val)
                    } else {
                        infoNofity("No Leave request pending for this department!!")
                        setTableData([])
                    }
                })
            }
            else {
                setTableData([])
            }
        }
    }, [DeptSect, levtpevalue, deptSect, halfdayRqData, nopunchRqData, compOffrqData, count, leaveRqData]);

    const [columnDef] = useState([
        { headerName: 'Slno', field: 'row_slno', filter: true, minWidth: 100 },
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
            }

        },
    ])

    const rowStyle = { background: '#CE7D78' };
    const getRowStyle = params => {
        if (params.data.incaprv === 2) {
            return { background: '#CE7D78' };
        }
    };

    const handleClick = async (params) => {
        const data = params.api.getSelectedRows()
        const { req_type, SlNo } = data[0]
        setreqtype(req_type)
        setSlno(SlNo)
        if (req_type === 1) {
            setOpenleave(true)
        } else if (req_type === 2) {
            setOpenhalf(true)
        } else if (req_type === 3) {
            setOpennopunch(true)
        } else if (req_type === 4) {
            setOpencompen(true);
        }
    }
    const handleClose = () => {
        setOpenleave(false);
        setOpennopunch(false);
        setOpencompen(false);
        setOpenhalf(false);
    };
    return (
        <Fragment>
            {
                reqtype === 1 ? <LeavRqModel open={openleave} handleClose={handleClose} slno={slno} authority={1} em_id={em_id} count={count} setcount={setcount} />
                    : reqtype === 2 ? <HaldayRqModel open={openhalf} handleClose={handleClose} slno={slno} authority={1} em_id={em_id} count={count} setcount={setcount} />
                        : reqtype === 3 ? <NopunchRqModel open={opennopunch} handleClose={handleClose} slno={slno} authority={1} em_id={em_id} count={count} setcount={setcount} />
                            : reqtype === 4 ? <CompOffRqModel open={opencompen} handleClose={handleClose} slno={slno} authority={1} em_id={em_id} count={count} setcount={setcount} /> : null
            }
            <PageLayoutCloseOnly
                heading="Leave Approval Incharge"
                redirect={RedirectToProfilePage}
            >
                <Paper variant="outlined" square sx={{ display: 'flex', flex: 1, mb: 0.4, p: 0.8, alignItems: 'center' }} >
                    <Box sx={{ display: 'flex', flex: 1, pt: 0.4, pr: 0.8 }} >
                        <ApprovalDeptSectSelection em_id={em_id} value={deptSect} setValue={setDeptSect} updateDeptSect={updateDeptSect} />
                    </Box>
                    <Box sx={{ display: 'flex', flex: 2 }}>
                        <CssVarsProvider>
                            {
                                leaverequesttype?.map((val, idx) => {
                                    return <Box sx={{
                                        display: 'flex', p: 1,
                                        width: { xl: "100%", lg: "100%", md: "100%", sm: "100%" }
                                    }}
                                        key={val.lrequest_slno}
                                    >
                                        <MappingCheckbox
                                            label={val.lrequest_short}
                                            name={val.lrequest_short}
                                            value={val.lrequest_slno}
                                            onChange={setleavetypevalue}
                                            checkedValue={levtpevalue}
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
                        rowStyle={rowStyle}
                        getRowStyle={getRowStyle}
                    />
                </Paper>
            </PageLayoutCloseOnly>
        </Fragment >
    )
}
export default memo(ApprovalIncharge)