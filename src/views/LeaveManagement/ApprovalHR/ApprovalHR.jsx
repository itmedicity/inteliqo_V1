import React, { Fragment, useContext, useEffect, useState, } from 'react'
import { useHistory } from 'react-router'
import { PayrolMasterContext } from 'src/Context/MasterContext'
import Tooltip from "@material-ui/core/Tooltip";
import { HrLeave, getleaverequest, Hrhalfdayrequest, getHRnopunchrequst, compensatoryHr, getAllHr } from 'src/views/CommonCode/Commonfunc';
import PageLayoutCloseOnly from 'src/views/CommonCode/PageLayoutCloseOnly';
import { Box, IconButton, Paper } from '@mui/material';
import DeptSectionAllSelect from 'src/views/MuiComponents/DeptSectionAllSelect';
import { Checkbox, CssVarsProvider, Typography } from '@mui/joy';
import CommonAgGrid from 'src/views/Component/CommonAgGrid'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CommonCheckBox from 'src/views/Component/CommonCheckBox'
import { axioslogin } from 'src/views/Axios/Axios';
import { format } from 'date-fns';
import LeavRqModel from '../LeaveCommonComponent/LeavRqModel';
import { useSelector } from 'react-redux';
import HaldayRqModel from '../LeaveCommonComponent/HaldayRqModel';
import NopunchRqModel from '../LeaveCommonComponent/NopunchRqModel';
import CompOffRqModel from '../LeaveCommonComponent/CompOffRqModel';


const ApprovalHR = () => {
    const history = useHistory()

    const [deptsect, setDeptSect] = useState(0)

    //const { updateleaverequest, getDeptSection } = useContext(PayrolMasterContext)
    // type of leave request 
    const [leaverequesttype, setleaverequesttype] = useState([]);
    const [levtpevalue, setleavetypevalue] = useState([])
    const [levtpevaluearry, setleavetypevaluearry] = useState({
        COFF: false,
        HDLR: false,
        LR: false,
        NOP: false,
        specialapproval: false
    }
    )
    const { COFF, HDLR, LR, NOP, specialapproval } = levtpevaluearry
    const [leavereq, setleavereqst] = useState([])
    const [leavereqmast, setmastleavereqst] = useState([])
    const [leavereqstAll, setLeavRqstAll] = useState([])
    const [deptlvRqst, setDptlvRqst] = useState([])
    const [leavestatedetail, setleavestatedetails] = useState([])

    // get nopunch request
    const [nopunch, setnopunch] = useState([])
    const [nopunchmast, setmastnopunch] = useState([])
    const [nopunchall, setnopunchall] = useState([])
    const [deptnopunch, setdeptNopunch] = useState([])

    // get halfdayrequest
    const [halfday, sethalfday] = useState([])
    const [halfdaymast, setmasthalfday] = useState([])
    const [halfdayAll, setHalfdayAll] = useState([])
    const [depthlfday, setDepthlfday] = useState([])
    const [hafdaydata, sethalfdata] = useState([])

    //compensatory off details
    const [compensetory, setcompensetory] = useState([])
    const [compensetorymast, setmastcompensetory] = useState([])
    const [coffAll, setCoffAll] = useState([])
    const [deptCoff, setDeptCoff] = useState([])
    const [comoffsetdata, setcomoff] = useState([])

    //for hr special approval for long leave
    const [spclapproval, setspclapproval] = useState([])
    const [reqtype, setreqtype] = useState([])
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
    const [allData, setalldata] = useState([])
    const [openleave, setOpenleave] = useState(false);
    const [opennopunch, setOpennopunch] = useState(false);
    const [opencompen, setOpencompen] = useState(false);
    const [openhalf, setOpenhalf] = useState(false);
    const [count, setcount] = useState(0)

    const em_id = useSelector((state) => {
        return state?.getProfileData?.ProfileData[0]?.em_id ?? 0;
    })

    //use effect for getting pending leave requests
    useEffect(() => {
        HrLeave().then((val) => {
            setleavereqst(val)
            setmastleavereqst(val)
        })
        getleaverequest().then((val) => {
            setleaverequesttype(val)
        })
        getHRnopunchrequst().then((val) => {
            setnopunch(val)
            setmastnopunch(val)
        })
        Hrhalfdayrequest().then((val) => {
            sethalfday(val)
            setmasthalfday(val)
        })
        compensatoryHr().then((val) => {
            setcompensetory(val)
            setmastcompensetory(val)
        })
        HrLeave().then((val) => {
            setspclapproval(val)
        })
        getAllHr().then((val) => {
            setalldata(val)
        })
        setcount(0)

    }, [count]);
    //use effect for filtering pending leave request against department section
    useEffect(() => {
        if (levtpevalue === '1' && deptsect !== 0) {
            // depsection change filter based on dept section leave request
            const filterleavereq = leavereqmast.filter((val) => {
                return (val.dept_section === deptsect)
            })
            setDptlvRqst(filterleavereq)
        }
        else if (levtpevalue === '2' && deptsect !== 0) {
            // depsection change filter based on dept section halfday
            const filterhalfday = halfdaymast.filter((val) => {
                return (val.dept_section === deptsect)
            })
            setDepthlfday(filterhalfday)
        }
        else if (levtpevalue === '3' && deptsect !== 0) {

            // depsection change filter based on dept section no punch
            const filternopunch = nopunchmast.filter((val) => {
                return (val.dept_section === deptsect)
            })
            setdeptNopunch(filternopunch)
        }
        else if (levtpevalue === '1' && deptsect !== 0) {
            // depsection change filter based on dept section setcompensetory
            const filtercompen = compensetorymast.filter((val) => {
                return (val.dept_section === deptsect)
            })
            setDeptCoff(filtercompen)
        }
        else if (levtpevalue === '1' && deptsect === 0) {
            setLeavRqstAll(leavereq)
        }
        else if (levtpevalue === '2' && deptsect === 0) {
            setHalfdayAll(halfday)
        } else if (levtpevalue === '3' && deptsect === 0) {
            setnopunchall(nopunch)
        } else if (levtpevalue === '4' && deptsect === 0) {
            setCoffAll(compensetory)
        }
    }, [deptsect, levtpevalue, leavereq, halfday, nopunch, compensetory])
    //return to home page
    const RedirectToProfilePage = () => {
        history.push(`/Home`)
    }
    const leverequesttypechange = async (e) => {
        const ob1 = {
            COFF: false,
            HDLR: false,
            LR: false,
            NOP: false,
            specialapproval: false

        }
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setleavetypevaluearry({ ...ob1, [e.target.name]: value })
        setleavetypevalue(e.target.value)
    }

    const [columnDef] = useState([
        { headerName: 'Slno', field: 'SlNo', filter: true, minWidth: 100 },
        { headerName: 'ID#', field: 'Emp_no', filter: true, minWidth: 100 },
        { headerName: 'Name ', field: 'Employee_name', filter: true, minWidth: 200 },
        { headerName: 'Department Section', field: 'Department_section', filter: true, minWidth: 200 },
        { headerName: 'Status ', field: 'inStatus', minWidth: 200 },
        {
            headerName: 'Action',
            cellRenderer: params => {
                if (params.data.hr_apprv === 1 || params.data.hr_apprv === 2) {
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
        } else if (req_type === 3) {
            const result = await axioslogin.get(`/LeaveRequestApproval/leave/nopunch/getnopunchreq/${SlNo}`)
            const { success, data } = result.data;
            if (success === 1) {
                setnopunch(data)
            }
            setOpennopunch(true)
        }
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
                reqtype === 1 ? <LeavRqModel open={openleave} handleClose={handleClose} DeptSect={deptsect} leaveremastdata={leaveremastdata} leavestatedetail={leavestatedetail} authority={4} em_id={em_id} count={count} setcount={setcount} />
                    : reqtype === 2 ? <HaldayRqModel open={openhalf} handleClose={handleClose} hafdaydata={hafdaydata} authority={4} em_id={em_id} count={count} setcount={setcount} />
                        : reqtype === 3 ? <NopunchRqModel open={opennopunch} handleClose={handleClose} hafdaydata={nopunch} authority={4} em_id={em_id} count={count} setcount={setcount} />
                            : reqtype === 4 ? <CompOffRqModel open={opencompen} handleClose={handleClose} hafdaydata={comoffsetdata} authority={4} em_id={em_id} count={count} setcount={setcount} />
                                : null
            }
            <PageLayoutCloseOnly
                heading="Leave Approval HR"
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
                    <Box sx={{ display: 'flex', }}>
                        <CommonCheckBox
                            label="SP"
                            size="lg"
                            name="specialapproval"
                            value={specialapproval === false ? 5 : 0}
                            checked={specialapproval}
                            onChange={(e) => leverequesttypechange(e)}
                        />
                        {/* <FormControlLabel
                            control={
                                <Tooltip title="Special Approval">
                                    <Checkbox
                                        name="specialapproval"
                                        color="secondary"
                                        value={specialapproval === false ? 5 : 0}
                                        checked={specialapproval}
                                        onChange={(e) => leverequesttypechange(e)}
                                    />
                                </Tooltip>
                            }
                            label="SP"
                        /> */}
                    </Box>
                </Paper>
                <Paper square elevation={0} sx={{ pt: 1, mt: 0.5, display: 'flex', flexDirection: "column" }} >
                    <CommonAgGrid
                        columnDefs={columnDef}
                        tableData={
                            levtpevalue === '1' && deptsect === 0 ? leavereqstAll
                                : levtpevalue === '1' && deptsect !== 0 ? deptlvRqst
                                    : levtpevalue === '2' && deptsect === 0 ? halfdayAll
                                        : levtpevalue === '2' && deptsect !== 0 ? depthlfday
                                            : levtpevalue === '3' && deptsect === 0 ? nopunchall
                                                : levtpevalue === '3' && deptsect !== 0 ? deptnopunch
                                                    : levtpevalue === '4' && deptsect === 0 ? coffAll
                                                        : levtpevalue === '4' && deptsect !== 0 ? deptCoff
                                                            : levtpevalue === '5' && deptsect === 0 ? spclapproval
                                                                : allData
                        }
                        sx={{
                            height: 600,
                            width: "100%"
                        }}
                        rowHeight={30}
                        headerHeight={30}
                    />
                </Paper>
            </PageLayoutCloseOnly>













            {/* <PageLayoutSave
                heading="Leave Approval HR"
                redirect={RedirectToProfilePage}
            >
                <div className="row g-2">
                    <div className="col-md-12 col-sm-12 col-xs-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-5 col-sm-12 col-xs-12">
                                        <div className="d-flex justify-content-around">
                                            {
                                                leaverequesttype && leaverequesttype.map((val) => {
                                                    return <div className="pt-0" key={val.lrequest_slno} >
                                                        <FormControlLabel
                                                            control={
                                                                <Tooltip title={val.lrequest_type}>
                                                                    <Checkbox
                                                                        name={val.lrequest_short}
                                                                        color="secondary"
                                                                        value={val.lrequest_slno}
                                                                        checked={val.lrequest_short === 'LR' ? LR :
                                                                            val.lrequest_short === 'HDLR' ? HDLR :
                                                                                val.lrequest_short === 'NOP' ? NOP :
                                                                                    val.lrequest_short === 'COFF' ? COFF : false

                                                                        }
                                                                        onChange={(e) => leverequesttypechange(e)}
                                                                    />
                                                                </Tooltip>
                                                            }
                                                            label={val.lrequest_short}
                                                        />
                                                    </div>;
                                                })
                                            }
                                        </div>
                                    </div>
                                    <div className="col-md-1">
                                        <FormControlLabel
                                            control={
                                                <Tooltip title="Special Approval">
                                                    <Checkbox
                                                        name="specialapproval"
                                                        color="secondary"
                                                        value={specialapproval === false ? 5 : 0}
                                                        checked={specialapproval}
                                                        onChange={(e) => leverequesttypechange(e)}
                                                    />
                                                </Tooltip>
                                            }
                                            label="SP"
                                        />
                                    </div>
                                    <div className="col-md-6 col-sm-12 col-xs-12">
                                        <div className="col-md-5  col-sm-12 pt-1">
                                            <DeptSectionMastSelect
                                                style={SELECT_CMP_STYLE}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card ">
                        <div className="col-md-12">
                            <ApprovalInchargeTable leavereq={levtpevalue === '1' ? leavereq :
                                levtpevalue === '2' ? halfday :
                                    levtpevalue === '4' ? compensetory :
                                        levtpevalue === '3' ? nopunch :
                                            levtpevalue === '5' ? spclapproval : []
                            } levtpevalue={levtpevalue} authority={levtpevalue === '5' ? 6 : 4}
                                setleavereq={levtpevalue === '1' ? setleavereqst :
                                    levtpevalue === '2' ? sethalfday :
                                        levtpevalue === '4' ? setcompensetory :
                                            levtpevalue === '3' ? setnopunch :
                                                levtpevalue === '5' ? setspclapproval : null}
                                DeptSect={getDeptSection}
                            />
                        </div>
                    </div>
                </div>
            </PageLayoutSave> */}
        </Fragment >
    )
}

export default ApprovalHR
