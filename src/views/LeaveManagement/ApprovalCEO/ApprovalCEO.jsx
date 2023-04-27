import React, { Fragment, memo, useEffect, useState, } from 'react'
import { useHistory } from 'react-router'
import { getleaverequest, infoNofity } from 'src/views/CommonCode/Commonfunc';
import PageLayoutCloseOnly from 'src/views/CommonCode/PageLayoutCloseOnly';
import { Box, IconButton, Paper, Tooltip } from '@mui/material';
import { CssVarsProvider } from '@mui/joy';
import CommonAgGrid from 'src/views/Component/CommonAgGrid'
import DeptSectionAllSelect from 'src/views/MuiComponents/DeptSectionAllSelect'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import LeavRqModel from '../LeaveCommonComponent/LeavRqModel'
import { useDispatch, useSelector } from 'react-redux'
import HaldayRqModel from '../LeaveCommonComponent/HaldayRqModel'
import NopunchRqModel from '../LeaveCommonComponent/NopunchRqModel'
import CompOffRqModel from '../LeaveCommonComponent/CompOffRqModel'
import _ from 'underscore';
import MappingCheckbox from 'src/views/MuiComponents/MappingCheckbox';
import { getCompOffRqstAll, getHalfdayRqstAll, getLeaveRequestAll, getNopunchRqstAll } from 'src/redux/actions/LeaveApprovalAction';
import { compensatoryMapping, Halfdaymapping, MappingData, nopunchmapping } from '../LeaveCommonComponent/LeaveApprovalFunc';

const ApprovalCEO = () => {

    const history = useHistory()
    const dispatch = useDispatch()

    const [tableData, setTableData] = useState([])
    const [slno, setSlno] = useState(0)
    const [deptsect, setDeptSect] = useState(0)
    const [levtpevalue, setleavetypevalue] = useState(1)
    const [leaverequesttype, setleaverequesttype] = useState([]);
    const [reqtype, setreqtype] = useState([])
    const [count, setcount] = useState(0)
    //state for open model
    const [openleave, setOpenleave] = useState(false);
    const [opennopunch, setOpennopunch] = useState(false);
    const [opencompen, setOpencompen] = useState(false);
    const [openhalf, setOpenhalf] = useState(false);

    const em_id = useSelector((state) => {
        return state?.getProfileData?.ProfileData[0]?.em_id ?? 0;
    })

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
        if (levtpevalue === 1 && deptsect === 0) {
            const filterleavereq = leaveRqData && leaveRqData.filter((val) => {
                return (val.ceo_req_status === 1)
            })
            if (Object.keys(filterleavereq).length > 0) {
                MappingData(filterleavereq).then((val) => {
                    setTableData(val)
                })
            } else {
                infoNofity("No Leave request pending for this department!!")
                setTableData([])
            }
        } else if (levtpevalue === 1 && deptsect !== 0) {
            const filterleavereq = leaveRqData && leaveRqData.filter((val) => {
                return (val.ceo_req_status === 1 && val.dept_section === deptsect)
            })
            if (Object.keys(filterleavereq).length > 0) {
                MappingData(filterleavereq).then((val) => {
                    setTableData(val)
                })
            } else {
                infoNofity("No Leave request pending for this department!!")
                setTableData([])
            }
        } else if (levtpevalue === 2 && deptsect === 0) {
            const filterdata = halfdayRqData && halfdayRqData.filter((val) => {
                return (val.hf_ceo_req_status === 1)
            })
            if (Object.keys(filterdata).length > 0) {
                Halfdaymapping(filterdata).then((val) => {
                    setTableData(val)
                })
            } else {
                infoNofity("No Leave request pending for this department!!")
                setTableData([])
            }
        } else if (levtpevalue === 2 && deptsect !== 0) {
            const filterdata = halfdayRqData && halfdayRqData.filter((val) => {
                return (val.hf_ceo_req_status === 1 && val.dept_section === deptsect)
            })
            if (Object.keys(filterdata).length > 0) {
                Halfdaymapping(filterdata).then((val) => {
                    setTableData(val)
                })
            } else {
                infoNofity("No Leave request pending for this department!!")
                setTableData([])
            }
        } else if (levtpevalue === 3 && deptsect === 0) {
            const filtered = nopunchRqData && nopunchRqData.filter((val) => {
                return (val.np_ceo_req_status === 1)
            })
            if (Object.keys(filtered).length > 0) {
                nopunchmapping(filtered).then((val) => {
                    setTableData(val)
                })
            } else {
                infoNofity("No Leave request pending for this department!!")
                setTableData([])
            }

        }
        else if (levtpevalue === 3 && deptsect !== 0) {
            const filterdata = nopunchRqData && nopunchRqData.filter((val) => {
                return (val.em_dept_section === deptsect && val.np_ceo_req_status === 1)
            })
            nopunchmapping(filterdata).then((val) => {
                if (Object.keys(val).length > 0) {
                    setTableData(val)
                } else {
                    infoNofity("No Leave request pending for this department!!")
                    setTableData([])
                }
            })
        }
        else if (levtpevalue === 4 && deptsect === 0) {
            const filtered = compOffrqData && compOffrqData.filter((val) => {
                return (val.cf_ceo_req_status === 1)
            })
            compensatoryMapping(filtered).then((val) => {
                if (Object.keys(val).length > 0) {
                    setTableData(val)
                } else {
                    infoNofity("No Leave request pending for this department!!")
                    setTableData([])
                }
            })
        } else if (levtpevalue === 4 && deptsect !== 0) {
            const filtered = compOffrqData && compOffrqData.filter((val) => {
                return (val.cf_ceo_req_status === 1 && val.em_dept_section === deptsect)
            })
            compensatoryMapping(filtered).then((val) => {
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
    }, [leaveRqData, deptsect, levtpevalue, count, compOffrqData, nopunchRqData, halfdayRqData])

    const RedirectToProfilePage = () => {
        history.push(`/Home`)
    }

    const [columnDef] = useState([
        { headerName: 'Slno', field: 'row_slno', filter: true, minWidth: 100 },
        { headerName: 'ID#', field: 'Emp_no', filter: true, minWidth: 100 },
        { headerName: 'Name ', field: 'Employee_name', filter: true, minWidth: 200 },
        { headerName: 'Department Section', field: 'Department_section', filter: true, minWidth: 200 },
        { headerName: 'Status ', field: 'inStatus', minWidth: 200 },
        {
            headerName: 'Action',
            cellRenderer: params => {
                if (params.data.ceo_apprv === 1 || params.data.ceo_apprv === 2 || params.data.hodaprv === 2) {
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
            }
        },
    ])
    const rowStyle = { background: '#CE7D78' };
    const getRowStyle = params => {
        if (params.data.hodaprv === 2 || params.data.incaprv === 2 || params.data.ceo_apprv === 2) {
            return { background: '#CE7D78' };
        }
    };

    const handleClick = async (params) => {
        const data = params.api.getSelectedRows()
        const { req_type, SlNo } = data[0]
        setSlno(SlNo)
        setreqtype(req_type)
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
                reqtype === 1 ? <LeavRqModel open={openleave} handleClose={handleClose} slno={slno} authority={3} em_id={em_id} count={count} setcount={setcount} />
                    : reqtype === 2 ? <HaldayRqModel open={openhalf} handleClose={handleClose} slno={slno} authority={3} em_id={em_id} count={count} setcount={setcount} />
                        : reqtype === 3 ? <NopunchRqModel open={opennopunch} handleClose={handleClose} slno={slno} authority={3} em_id={em_id} count={count} setcount={setcount} />
                            : reqtype === 4 ? <CompOffRqModel open={opencompen} handleClose={handleClose} slno={slno} authority={3} em_id={em_id} count={count} setcount={setcount} />
                                : null
            }
            <PageLayoutCloseOnly
                heading="Leave Approval CEO"
                redirect={RedirectToProfilePage}
            >
                <Paper variant="outlined" square sx={{ display: 'flex', flex: 1, mb: 0.4, p: 0.8, alignItems: 'center' }} >
                    <Box sx={{ display: 'flex', flex: 1, pt: 0.4, pr: 0.8 }} >
                        <DeptSectionAllSelect value={deptsect} setValue={setDeptSect} />
                    </Box>
                    <Box sx={{ display: 'flex', flex: 2 }}>
                        <CssVarsProvider>
                            {
                                leaverequesttype && leaverequesttype?.map((val, idx) => {
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
        </Fragment>
    )
}

export default memo(ApprovalCEO) 