import React, { Fragment, useEffect, useState, } from 'react'
import { useHistory } from 'react-router'
import { ceoLeavereq, getleaverequest, CEohalfdayrequest, getCEOnopunchrequst, compensatoryCeo, getAllCeo, infoNofity } from 'src/views/CommonCode/Commonfunc';
import PageLayoutCloseOnly from 'src/views/CommonCode/PageLayoutCloseOnly';
import { Box, IconButton, Paper, Tooltip } from '@mui/material';
import { CssVarsProvider } from '@mui/joy';
import CommonAgGrid from 'src/views/Component/CommonAgGrid'
import DeptSectionAllSelect from 'src/views/MuiComponents/DeptSectionAllSelect'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { axioslogin } from 'src/views/Axios/Axios'
import { format } from 'date-fns';
import LeavRqModel from '../LeaveCommonComponent/LeavRqModel'
import { useSelector } from 'react-redux'
import HaldayRqModel from '../LeaveCommonComponent/HaldayRqModel'
import NopunchRqModel from '../LeaveCommonComponent/NopunchRqModel'
import CompOffRqModel from '../LeaveCommonComponent/CompOffRqModel'
import _ from 'underscore';
import MappingCheckbox from 'src/views/MuiComponents/MappingCheckbox';

const ApprovalCEO = () => {

    const history = useHistory()

    const [allData, setalldata] = useState([])
    const [deptsect, setDeptSect] = useState(0)

    const [levtpevalue, setleavetypevalue] = useState(1)
    const [leaverequesttype, setleaverequesttype] = useState([]);
    const [leavereq, setleavereqst] = useState([])
    const [deptlvRqst, setDptlvRqst] = useState([])
    const [leavereqmast, setmastleavereqst] = useState([])
    const [leavereqstAll, setLeavRqstAll] = useState([])
    const [leavestatedetail, setleavestatedetails] = useState([])

    // get nopunch request
    const [nopunch, setnopunch] = useState([])
    const [deptnopunch, setdeptNopunch] = useState([])
    const [nopunchmast, setmastnopunch] = useState([])
    const [nopunchall, setnopunchall] = useState([])

    // get halfdayrequest
    const [halfday, sethalfday] = useState([])
    const [depthlfday, setDepthlfday] = useState([])
    const [halfdaymast, setmasthalfday] = useState([])
    const [hafdaydata, sethalfdata] = useState([])
    const [halfdayAll, setHalfdayAll] = useState([])


    const [compensetory, setcompensetory] = useState([])
    const [compensetorymast, setmastcompensetory] = useState([])
    const [deptCoff, setDeptCoff] = useState([])
    const [comoffsetdata, setcomoff] = useState([])
    const [coffAll, setCoffAll] = useState([])


    const [reqtype, setreqtype] = useState([])


    const [count, setcount] = useState(0)
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

    const [openleave, setOpenleave] = useState(false);
    const [opennopunch, setOpennopunch] = useState(false);
    const [opencompen, setOpencompen] = useState(false);
    const [openhalf, setOpenhalf] = useState(false);

    const em_id = useSelector((state) => {
        return state?.getProfileData?.ProfileData[0]?.em_id ?? 0;
    })

    useEffect(() => {
        ceoLeavereq().then((val) => {
            setmastleavereqst(val)
            setleavereqst(val)
        })
        //to get leave type
        getleaverequest().then((val) => {
            setleaverequesttype(val)
        })

        getCEOnopunchrequst().then((val) => {
            setmastnopunch(val)
            setnopunch(val)
        })
        CEohalfdayrequest().then((val) => {
            setmasthalfday(val)
            sethalfday(val)
        })
        compensatoryCeo().then((val) => {
            setmastcompensetory(val)
            setcompensetory(val)
        })
        getAllCeo().then((val) => {
            setalldata(val)
        })
        setcount(0)
    }, [count]);

    //use Effect for filtering leave request against  selected department section
    useEffect(() => {
        if (deptsect !== 0 && levtpevalue === 1) {
            // depsection change filter based on dept section leave request
            const filterleavereq = leavereqmast.filter((val) => {
                return (val.dept_section === deptsect)
            })
            setDptlvRqst(filterleavereq)
        } else if (levtpevalue === 3 && deptsect !== 0) {
            // depsection change filter based on dept section no punch
            const filternopunch = nopunchmast.filter((val) => {
                return (val.dept_section === deptsect)
            })
            setdeptNopunch(filternopunch)
        } else if (levtpevalue === 2 && deptsect !== 0) {
            // depsection change filter based on dept section halfday
            const filterhalfday = halfdaymast.filter((val) => {
                return (val.dept_section === deptsect)
            })
            setDepthlfday(filterhalfday)

        } else if (levtpevalue === 4 && deptsect !== 0) {
            // depsection change filter based on dept section setcompensetory
            const filtercompen = compensetorymast.filter((val) => {
                return (val.dept_section === deptsect)
            })
            setDeptCoff(filtercompen)
        } else if (levtpevalue === 1 && deptsect === 0) {
            if (Object.keys(leavereq).length > 0) {
                setLeavRqstAll(leavereq)
            } else {
                infoNofity("No Leave request pending!!")
            }

        } else if (levtpevalue === 2 && deptsect === 0) {
            if (Object.keys(halfday).length > 0) {
                setHalfdayAll(halfday)
            } else {
                infoNofity("No Leave request pending!!")
            }
        } else if (levtpevalue === 3 && deptsect === 0) {
            if (Object.keys(nopunch).length > 0) {
                setnopunchall(nopunch)
            } else {
                infoNofity("No Leave request pending!!")
            }

        } else if (levtpevalue === 4 && deptsect === 0) {
            if (Object.keys(compensetory).length > 0) {
                setCoffAll(compensetory)
            } else {
                infoNofity("No Leave request pending!!")
            }
        }
    }, [deptsect, levtpevalue, leavereq, halfday, nopunch, compensetory,])

    const RedirectToProfilePage = () => {
        history.push(`/Home`)
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
                if (params.data.ceo_apprv === 1 || params.data.ceo_apprv === 2) {
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
        }
        // if leave request type is half day 
        else if (req_type === 2) {
            const result = await axioslogin.get(`/LeaveRequestApproval/half/gethalfdaydetl/${SlNo}`)
            const { success, data } = result.data;
            if (success === 1) {
                sethalfdata(data)
            }
            setOpenhalf(true)
        }
        else if (req_type === 3) {
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
                reqtype === 1 ? <LeavRqModel open={openleave} handleClose={handleClose} DeptSect={deptsect} leaveremastdata={leaveremastdata} leavestatedetail={leavestatedetail} authority={3} em_id={em_id} count={count} setcount={setcount} />
                    : reqtype === 2 ? <HaldayRqModel open={openhalf} handleClose={handleClose} hafdaydata={hafdaydata} authority={3} em_id={em_id} count={count} setcount={setcount} />
                        : reqtype === 3 ? <NopunchRqModel open={opennopunch} handleClose={handleClose} hafdaydata={nopunch} authority={3} em_id={em_id} count={count} setcount={setcount} />
                            : reqtype === 4 ? <CompOffRqModel open={opencompen} handleClose={handleClose} hafdaydata={comoffsetdata} authority={3} em_id={em_id} count={count} setcount={setcount} />
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
                        tableData={
                            levtpevalue === '1' && deptsect === 0 ? leavereqstAll
                                : levtpevalue === '1' && deptsect !== 0 ? deptlvRqst
                                    : levtpevalue === '2' && deptsect === 0 ? halfdayAll
                                        : levtpevalue === '2' && deptsect !== 0 ? depthlfday
                                            : levtpevalue === '3' && deptsect === 0 ? nopunchall
                                                : levtpevalue === '3' && deptsect !== 0 ? deptnopunch
                                                    : levtpevalue === '4' && deptsect === 0 ? coffAll
                                                        : levtpevalue === '4' && deptsect !== 0 ? deptCoff
                                                            : allData}
                        sx={{
                            height: 600,
                            width: "100%"
                        }}
                        rowHeight={30}
                        headerHeight={30}
                    />
                </Paper>
            </PageLayoutCloseOnly>
        </Fragment>
    )
}

export default ApprovalCEO