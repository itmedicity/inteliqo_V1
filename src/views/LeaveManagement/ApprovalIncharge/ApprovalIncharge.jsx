import React, { Fragment, useEffect, useState } from 'react'
import PageLayoutCloseOnly from 'src/views/CommonCode/PageLayoutCloseOnly'
import { useHistory } from 'react-router'
import AuthorizationDetails from 'src/views/CommonCode/AuthorizationDetails'
import { SELECT_CMP_STYLE } from 'src/views/Constant/Constant'
import { Checkbox, FormControlLabel } from '@material-ui/core';
import ApprovalInchargeTable from './ApprovalInchargeTable'
import Tooltip from "@material-ui/core/Tooltip";
import { compensatory, getleaverequest, getleaverequestget, getnopunchrequst, halfdayrequest } from 'src/views/CommonCode/Commonfunc';
import ResignationApprovalSection from '../../Resignation/ResignationApproval/ResignationApprovalSection'
import { useDispatch } from 'react-redux'
import { getlevedata } from '../../../redux/actions/LeaveReqst.action'

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
        const filterleavereq = leavereqmast.filter((val) => {
            return (val.dept_section === e)
        })
        setleavereqst(filterleavereq)
        // depsection change filter based on dept section no punch
        const filternopunch = nopunchmast.filter((val) => {
            return (val.dept_section === e)
        })
        setnopunch(filternopunch)
        // depsection change filter based on dept section halfday
        const filterhalfday = halfdaymast.filter((val) => {
            return (val.dept_section === e)
        })
        sethalfday(filterhalfday)
        // depsection change filter based on dept section setcompensetory
        const filtercompen = compensetorymast.filter((val) => {
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
                                        <AuthorizationDetails />
                                    </div>
                                    <div className="col-md-7 col-sm-12 col-xs-12">
                                        <div className="col-md-4  col-sm-12 pt-1">
                                            <ResignationApprovalSection style={SELECT_CMP_STYLE} DeptSect={DeptSect}
                                                updateDeptSect={updateDeptSect} onChange={handleChange} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card ">
                        <div className="col-md-12">
                            <ApprovalInchargeTable leavereq={levtpevalue == 1 ? leavereq :
                                levtpevalue == 2 ? halfday :
                                    levtpevalue == 4 ? compensetory :
                                        levtpevalue == 3 ? nopunch : []
                            } levtpevalue={levtpevalue} authority={1}
                                setleavereq={levtpevalue == 1 ? setleavereqst :
                                    levtpevalue == 2 ? sethalfday :
                                        levtpevalue == 4 ? setcompensetory :
                                            levtpevalue == 3 ? setnopunch : null}
                                DeptSect={DeptSect}
                            />
                        </div>
                    </div>
                </div>
            </PageLayoutCloseOnly>
        </Fragment >
    )
}

export default ApprovalIncharge
