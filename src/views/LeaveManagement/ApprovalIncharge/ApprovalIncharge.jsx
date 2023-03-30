import React, { Fragment, useEffect, useState } from 'react'
import PageLayoutCloseOnly from 'src/views/CommonCode/PageLayoutCloseOnly'
import { useHistory } from 'react-router'
import { Checkbox, Typography } from '@mui/joy'
import { compensatory, getAll, getleaverequest, getleaverequestget, getnopunchrequst, halfdayrequest } from 'src/views/CommonCode/Commonfunc';
import { useDispatch, useSelector } from 'react-redux'
import { getlevedata } from '../../../redux/actions/LeaveReqst.action'
import { memo } from 'react'
import { Box, IconButton, Paper, Tooltip } from '@mui/material'
import { CssVarsProvider } from '@mui/joy'
import ApprovalDeptSectSelection from 'src/views/MuiComponents/ApprovalDeptSectSelection'
import CommonAgGrid from 'src/views/Component/CommonAgGrid'
import { axioslogin } from 'src/views/Axios/Axios'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { format } from 'date-fns';
import LeavRqModel from '../LeaveCommonComponent/LeavRqModel'
import HaldayRqModel from '../LeaveCommonComponent/HaldayRqModel'
import NopunchRqModel from '../LeaveCommonComponent/NopunchRqModel'
import CompOffRqModel from '../LeaveCommonComponent/CompOffRqModel'

const ApprovalIncharge = () => {
    const history = useHistory()
    const dispatch = useDispatch()

    const [allData, setalldata] = useState([]);//list of all data 
    const [leaverequesttype, setleaverequesttype] = useState([]);//leave type list
    const [deptSect, setDeptSect] = useState(0)
    const [DeptSect, updateDeptSect] = useState([])

    // for get leave requesst details
    const [leavereqstAll, setLeavRqstAll] = useState([])
    const [leavereq, setleavereqst] = useState([])
    const [leavereqmast, setmastleavereqst] = useState([])
    const [deptlvRqst, setDptlvRqst] = useState([])
    const [levtpevalue, setleavetypevalue] = useState([])
    const [leavestatedetail, setleavestatedetails] = useState([])
    // get halfdayrequest
    const [halfday, sethalfday] = useState([])
    const [halfdaymast, setmasthalfday] = useState([])
    const [halfdayAll, setHalfdayAll] = useState([])
    const [depthlfday, setDepthlfday] = useState([])
    const [hafdaydata, sethalfdata] = useState([])

    // get nopunch request
    const [nopunch, setnopunch] = useState([])
    const [nopunchmast, setmastnopunch] = useState([])
    const [nopunchall, setnopunchall] = useState([])
    const [deptnopunch, setdeptNopunch] = useState([])

    //get compensatory leave 
    const [compensetorymast, setmastcompensetory] = useState([])
    const [compensetory, setcompensetory] = useState([])
    const [coffAll, setCoffAll] = useState([])
    const [deptCoff, setDeptCoff] = useState([])
    const [comoffsetdata, setcomoff] = useState([])

    // to get the ype leave request

    const [levtpevaluearry, setleavetypevaluearry] = useState({
        COFF: false,
        HDLR: false,
        LR: false,
        NOP: false,
    })
    const { COFF, HDLR, LR, NOP } = levtpevaluearry
    const [leaveremastdata, setleavereqmastdata] = useState([
        {
            emno: '',
            leave_date: '',
            leavetodate: '',
            nodays: '',
            reqtype: '',
            lve_uniq_no: '',
            leave_reason: ''
        }
    ])

    // to set reqtype 
    const [reqtype, setreqtype] = useState([])
    const [count, setcount] = useState(0)

    const [openleave, setOpenleave] = useState(false);
    const [opennopunch, setOpennopunch] = useState(false);
    const [opencompen, setOpencompen] = useState(false);
    const [openhalf, setOpenhalf] = useState(false);


    const em_id = useSelector((state) => {
        return state?.getProfileData?.ProfileData[0]?.em_id ?? 0;
    })

    //to get checkbox checked value
    const leverequesttypechange = async (e) => {
        const ob1 = {
            COFF: false,
            HDLR: false,
            LR: false,
            NOP: false,
        }
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setleavetypevaluearry({ ...ob1, [e.target.name]: value })
        setleavetypevalue(e.target.value)
    }

    const RedirectToProfilePage = () => {
        history.push(`/Home`)
    }

    useEffect(() => {
        getleaverequest().then((val) => {
            setleaverequesttype(val)
        })
        const arraydepsect = DeptSect.map((val) => { return val.dept_section })
        if (arraydepsect.length !== 0) {
            dispatch(getlevedata(arraydepsect))

            //get leave request database data
            getleaverequestget(arraydepsect).then((val) => {
                setleavereqst(val)
                setmastleavereqst(val)
            })
            //no punch request database data
            getnopunchrequst(arraydepsect).then((val) => {
                setmastnopunch(val)
                setnopunch(val)
            })
            //half day request employees
            halfdayrequest(arraydepsect).then((val) => {
                sethalfday(val)
                setmasthalfday(val)
            })
            //compensatory request employees from database
            compensatory(arraydepsect).then((val) => {
                setcompensetory(val)
                setmastcompensetory(val)
            })
            setcount(0)
            getAll(arraydepsect).then((val) => {
                setalldata(val)
            })
        }
        dispatch(getlevedata(arraydepsect))
    }, [DeptSect, count, dispatch]);



    // const handleChange = async (e) => {
    // depsection change filter based on dept section leave request
    // const filterleavereq = await leavereqmast.filter((val) => {
    //     return (val.dept_section === e)
    // })
    // setleavereqst(filterleavereq)
    // // depsection change filter based on dept section no punch
    // const filternopunch = await nopunchmast.filter((val) => {
    //     return (val.dept_section === e)
    // })
    // setnopunch(filternopunch)
    // // depsection change filter based on dept section halfday
    // const filterhalfday = await halfdaymast.filter((val) => {
    //     return (val.dept_section === e)
    // })
    // sethalfday(filterhalfday)
    // // depsection change filter based on dept section setcompensetory
    // const filtercompen = await compensetorymast.filter((val) => {
    //     return (val.dept_section === e)
    // })
    // setcompensetory(filtercompen)
    //  }



    useEffect(() => {
        if (levtpevalue === '1' && deptSect === 0) {
            setLeavRqstAll(leavereq)
        } else if (levtpevalue === '1' && deptSect !== 0) {
            const filterleavereq = leavereqmast && leavereqmast.filter((val) => {
                return (val.dept_section === deptSect)
            })
            setDptlvRqst(filterleavereq)
        } else if (levtpevalue === '2' && deptSect === 0) {
            setHalfdayAll(halfday)
        } else if (levtpevalue === '2' && deptSect !== 0) {
            //depsection change filter based on dept section halfday
            const filterhalfday = halfdaymast && halfdaymast.filter((val) => {
                return (val.dept_section === deptSect)
            })
            setDepthlfday(filterhalfday)
        } else if (levtpevalue === '3' && deptSect === 0) {
            setnopunchall(nopunch)
        } else if (levtpevalue === '3' && deptSect !== 0) {
            //depsection change filter based on dept section no punch
            const filternopunch = nopunchmast && nopunchmast.filter((val) => {
                return (val.dept_section === deptSect)
            })
            setdeptNopunch(filternopunch)
        }
        else if (levtpevalue === '4' && deptSect === 0) {
            setCoffAll(compensetory)
        } else if (levtpevalue === '4' && deptSect !== 0) {
            //depsection change filter based on dept section setcompensetory
            const filtercompen = compensetorymast && compensetorymast.filter((val) => {
                return (val.dept_section === deptSect)
            })
            setDeptCoff(filtercompen)
        }
    }, [deptSect, levtpevalue, leavereq, halfday, nopunch, compensetory, leavereqmast,
        halfdaymast, nopunchmast, compensetorymast])

    const [columnDef] = useState([
        { headerName: 'Slno', field: 'SlNo', filter: true, minWidth: 100 },
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

    const handleClick = async (params) => {
        const data = params.api.getSelectedRows()
        const { req_type, SlNo } = data[0]
        setreqtype(req_type)
        if (req_type === 1) {
            const result = await axioslogin.get(`/LeaveRequestApproval/${SlNo}`)
            const { success, data } = result.data;
            if (success === 1) {
                const leaveredat =
                    data.map((val) => {
                        const d1 = {
                            leave_date: format(new Date(val.leave_date), 'yyyy-MM-dd'),
                            leavetodate: format(new Date(val.leavetodate), 'yyyy-MM-dd'),
                            nodays: val.no_of_leave,
                            reqtype: val.reqtype,
                            leave_slno: val.leave_slno,
                            emno: val.em_no,
                            lve_uniq_no: val.lve_uniq_no,
                            leave_reason: val.leave_reason
                        }
                        return d1
                    })
                setleavereqmastdata(leaveredat)
                // get leave detail data
                const resultdel = await axioslogin.get(`/LeaveRequestApproval/getlevereqdetl/${SlNo}`)
                if (resultdel.data.success === 1) {
                    setleavestatedetails(resultdel.data.data)
                }
                setOpenleave(true)
            }
        } // if leave request type is half day 
        else if (req_type === 2) {
            const result = await axioslogin.get(`/LeaveRequestApproval/half/gethalfdaydetl/${SlNo}`)
            const { success, data } = result.data;
            if (success === 1) {
                sethalfdata(data)
            }
            setOpenhalf(true)
            // if leave request type is no punch
        } else if (req_type === 3) {
            const result = await axioslogin.get(`/LeaveRequestApproval/leave/nopunch/getnopunchreq/${SlNo}`)
            const { success, data } = result.data;
            if (success === 1) {
                setnopunch(data)
            }
            setOpennopunch(true)
        }// if leave request type is compansatory leave
        else if (req_type === 4) {
            const result = await axioslogin.get(`/LeaveRequestApproval/leave/com/compensatory/compensatoryoffdata/${SlNo}`)
            const { success, data } = result.data;
            if (success === 1) {
                setcomoff(data)
            }
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
                reqtype === 1 ? <LeavRqModel open={openleave} handleClose={handleClose} DeptSect={DeptSect} leaveremastdata={leaveremastdata} leavestatedetail={leavestatedetail} authority={1} em_id={em_id} count={count} setcount={setcount} />
                    : reqtype === 2 ? <HaldayRqModel open={openhalf} handleClose={handleClose} hafdaydata={hafdaydata} authority={1} em_id={em_id} count={count} setcount={setcount} />
                        : reqtype === 3 ? <NopunchRqModel open={opennopunch} handleClose={handleClose} hafdaydata={nopunch} authority={1} em_id={em_id} count={count} setcount={setcount} />
                            : reqtype === 4 ? <CompOffRqModel open={opencompen} handleClose={handleClose} hafdaydata={comoffsetdata} authority={1} em_id={em_id} count={count} setcount={setcount} /> : null
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
                                    return <Checkbox
                                        label={<Typography level="h2" fontSize="sm" sx={{ mb: 0 }} color="neutral" >{val.lrequest_type}</Typography>}
                                        key={idx}
                                        size="lg"
                                        sx={{ flex: 1 }}
                                        value={val.lrequest_slno}
                                        name={val.lrequest_short}
                                        checked={val.lrequest_short === 'LR' ? LR :
                                            val.lrequest_short === 'HDLR' ? HDLR :
                                                val.lrequest_short === 'NOP' ? NOP :
                                                    val.lrequest_short === 'COFF' ? COFF : false
                                        }
                                        onChange={(e) => leverequesttypechange(e)}
                                    />
                                })
                            }
                        </CssVarsProvider>
                    </Box>
                </Paper>
                <Paper square elevation={0} sx={{ pt: 1, mt: 0.5, display: 'flex', flexDirection: "column" }} >
                    <CommonAgGrid
                        columnDefs={columnDef}
                        tableData={
                            levtpevalue === '1' && deptSect === 0 ? leavereqstAll :
                                levtpevalue === '1' && deptSect !== 0 ? deptlvRqst :
                                    levtpevalue === '2' && deptSect === 0 ? halfdayAll :
                                        levtpevalue === '2' && deptSect !== 0 ? depthlfday :
                                            levtpevalue === '3' && deptSect === 0 ? nopunchall :
                                                levtpevalue === '3' && deptSect !== 0 ? deptnopunch :
                                                    levtpevalue === '4' && deptSect === 0 ? coffAll :
                                                        levtpevalue === '4' && deptSect !== 0 ? deptCoff : allData}
                        sx={{
                            height: 600,
                            width: "100%"
                        }}
                        rowHeight={30}
                        headerHeight={30}
                    />
                </Paper>
            </PageLayoutCloseOnly>
        </Fragment >
    )
}
export default memo(ApprovalIncharge)



