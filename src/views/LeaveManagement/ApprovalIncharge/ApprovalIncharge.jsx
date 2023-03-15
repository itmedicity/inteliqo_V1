import React, { Fragment, useEffect, useState } from 'react'
import PageLayoutCloseOnly from 'src/views/CommonCode/PageLayoutCloseOnly'
import { useHistory } from 'react-router'
import AuthorizationDetails from 'src/views/CommonCode/AuthorizationDetails'
import { SELECT_CMP_STYLE } from 'src/views/Constant/Constant'
// import { Checkbox, FormControlLabel } from '@material-ui/core';
import { Checkbox, Typography } from '@mui/joy'
import ApprovalInchargeTable from './ApprovalInchargeTable'
// import Tooltip from "@material-ui/core/Tooltip";
import { compensatory, getleaverequest, getleaverequestget, getnopunchrequst, halfdayrequest } from 'src/views/CommonCode/Commonfunc';
import ResignationApprovalSection from '../../Resignation/ResignationApproval/ResignationApprovalSection'
import { useDispatch } from 'react-redux'
import { getlevedata } from '../../../redux/actions/LeaveReqst.action'
import { memo } from 'react'
import { Box, Paper } from '@mui/material'
import { CssVarsProvider } from '@mui/joy'

const ApprovalIncharge = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    // type of leave request 
    const [leaverequesttype, setleaverequesttype] = useState([]);
    const [DeptSect, updateDeptSect] = useState([])
    // to get the ype leave request
    const [levtpevalue, setleavetypevalue] = useState([])
    const [levtpevaluearry, setleavetypevaluearry] = useState({
        COFF: false,
        HDLR: false,
        LR: false,
        NOP: false,
    })
    const { COFF, HDLR, LR, NOP } = levtpevaluearry
    // for get leave requesst details
    const [leavereq, setleavereqst] = useState([])
    const [leavereqmast, setmastleavereqst] = useState([])
    // get nopunch request
    const [nopunch, setnopunch] = useState([])
    const [nopunchmast, setmastnopunch] = useState([])
    // get halfdayrequest
    const [halfday, sethalfday] = useState([])
    const [halfdaymast, setmasthalfday] = useState([])
    const [compensetorymast, setmastcompensetory] = useState([])
    const [compensetory, setcompensetory] = useState([])
    const handleChange = async (e) => {
        // depsection change filter based on dept section leave request
        const filterleavereq = await leavereqmast.filter((val) => {
            return (val.dept_section === e)
        })
        setleavereqst(filterleavereq)
        // depsection change filter based on dept section no punch
        const filternopunch = await nopunchmast.filter((val) => {
            return (val.dept_section === e)
        })
        setnopunch(filternopunch)
        // depsection change filter based on dept section halfday
        const filterhalfday = await halfdaymast.filter((val) => {
            return (val.dept_section === e)
        })
        sethalfday(filterhalfday)
        // depsection change filter based on dept section setcompensetory
        const filtercompen = await compensetorymast.filter((val) => {
            return (val.dept_section === e)
        })
        setcompensetory(filtercompen)
    }
    useEffect(() => {
        const arraydepsect = DeptSect.map((val) => { return val.dept_section })
        if (arraydepsect.length !== 0) {
            dispatch(getlevedata(arraydepsect))
            getleaverequestget(arraydepsect).then((val) => {
                setleavereqst(val)
                setmastleavereqst(val)
            })
            getleaverequest(arraydepsect).then((val) => {
                setleaverequesttype(val)
            })
            getnopunchrequst(arraydepsect).then((val) => {
                setmastnopunch(val)
                setnopunch(val)
            })
            halfdayrequest(arraydepsect).then((val) => {
                sethalfday(val)
                setmasthalfday(val)
            })
            compensatory(arraydepsect).then((val) => {
                setcompensetory(val)
                setmastcompensetory(val)
            })
        }
    }, [DeptSect]);
    const RedirectToProfilePage = () => {
        history.push(`/Home`)
    }
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
    return (
        <Fragment>
            <PageLayoutCloseOnly
                heading="Leave Approval Incharge"
                redirect={RedirectToProfilePage}
            >
                <Paper variant="outlined" square sx={{ display: 'flex', flex: 1, mb: 0.4, p: 0.8, alignItems: 'center' }} >
                    <Box sx={{ display: 'flex', flex: 1, pt: 0.4, pr: 0.8 }} >
                        <ResignationApprovalSection
                            DeptSect={DeptSect}
                            updateDeptSect={updateDeptSect}
                            onChange={handleChange}
                        />
                        {/* <ApprovedDepartmentSection /> */}
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
                </Paper>
                <Paper variant="outlined" square>
                    <ApprovalInchargeTable
                        leavereq={
                            levtpevalue === '1' ? leavereq :
                                levtpevalue === '2' ? halfday :
                                    levtpevalue === '4' ? compensetory :
                                        levtpevalue === '3' ? nopunch : []
                        }
                        levtpevalue={levtpevalue}
                        authority={1}
                        setleavereq={
                            levtpevalue === '1' ? setleavereqst :
                                levtpevalue === '2' ? sethalfday :
                                    levtpevalue === '4' ? setcompensetory :
                                        levtpevalue === '3' ? setnopunch : null}
                        DeptSect={DeptSect}
                    />
                </Paper>




            </PageLayoutCloseOnly>
        </Fragment >
    )
}

export default memo(ApprovalIncharge) 
