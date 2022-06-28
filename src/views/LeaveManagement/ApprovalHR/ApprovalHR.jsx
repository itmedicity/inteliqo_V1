import React, { Fragment, useContext, useEffect, useState, } from 'react'
import PageLayoutSave from 'src/views/CommonCode/PageLayoutSave'
import { useHistory } from 'react-router'
import { SELECT_CMP_STYLE } from 'src/views/Constant/Constant'
import { Checkbox, FormControlLabel } from '@material-ui/core';
import { PayrolMasterContext } from 'src/Context/MasterContext'
import Tooltip from "@material-ui/core/Tooltip";
import { HrLeave, getleaverequest, Hrhalfdayrequest, getHRnopunchrequst, compensatoryHr } from 'src/views/CommonCode/Commonfunc';
import ApprovalInchargeTable from '../ApprovalIncharge/ApprovalInchargeTable';
import DeptSectionMastSelect from 'src/views/CommonCode/DeptSectionMastSelect';
const ApprovalHR = () => {
    const history = useHistory()
    const { updateleaverequest, getDeptSection } = useContext(PayrolMasterContext)
    // type of leave request 
    const [leaverequesttype, setleaverequesttype] = useState([]);
    // to get the ype leave request
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
    // for get leave requesst details
    const [leavereq, setleavereqst] = useState([])
    const [leavereqmast, setmastleavereqst] = useState([])
    // get nopunch request
    const [nopunch, setnopunch] = useState([])
    const [nopunchmast, setmastnopunch] = useState([])
    // get halfdayrequest
    const [halfday, sethalfday] = useState([])
    const [halfdaymast, setmasthalfday] = useState([])
    //compensatory off details
    const [compensetory, setcompensetory] = useState([])
    const [compensetorymast, setmastcompensetory] = useState([])
    //for hr special approval for long leave
    const [spclapproval, setspclapproval] = useState([])
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
        return (
            updateleaverequest(0)
        )
    }, [updateleaverequest]);
    //use effect for filtering pending leave request against department section
    useEffect(() => {
        if (getDeptSection !== 0) {
            // depsection change filter based on dept section leave request
            const filterleavereq = leavereqmast.filter((val) => {
                return (val.dept_section === getDeptSection)
            })
            setleavereqst(filterleavereq)
            // depsection change filter based on dept section no punch
            const filternopunch = nopunchmast.filter((val) => {
                return (val.dept_section === getDeptSection)
            })
            setnopunch(filternopunch)

            // depsection change filter based on dept section halfday
            const filterhalfday = halfdaymast.filter((val) => {
                return (val.dept_section === getDeptSection)
            })
            sethalfday(filterhalfday)

            // depsection change filter based on dept section setcompensetory
            const filtercompen = compensetorymast.filter((val) => {
                return (val.dept_section === getDeptSection)
            })
            setcompensetory(filtercompen)
        }
    }, [getDeptSection])
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
    return (
        <Fragment>
            <PageLayoutSave
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
                            <ApprovalInchargeTable leavereq={levtpevalue === 1 ? leavereq :
                                levtpevalue === 2 ? halfday :
                                    levtpevalue === 4 ? compensetory :
                                        levtpevalue === 3 ? nopunch :
                                            levtpevalue === 5 ? spclapproval : []
                            } levtpevalue={levtpevalue} authority={levtpevalue === '5' ? 6 : 4}
                                setleavereq={levtpevalue === 1 ? setleavereqst :
                                    levtpevalue === 2 ? sethalfday :
                                        levtpevalue === 4 ? setcompensetory :
                                            levtpevalue === 3 ? setnopunch :
                                                levtpevalue === 5 ? setspclapproval : null}
                                DeptSect={getDeptSection}
                            />
                        </div>
                    </div>
                </div>
            </PageLayoutSave>
        </Fragment >
    )
}

export default ApprovalHR
