import React, { Fragment, useContext, useEffect, useState, } from 'react'
import PageLayoutSave from 'src/views/CommonCode/PageLayoutSave'
import { useHistory } from 'react-router'
import { SELECT_CMP_STYLE } from 'src/views/Constant/Constant'
import { Checkbox, FormControlLabel } from '@material-ui/core';
import ApprovalInchargeTable from '../ApprovalIncharge/ApprovalInchargeTable';
import { PayrolMasterContext } from 'src/Context/MasterContext'
import DeptSectionMastSelect from 'src/views/CommonCode/DeptSectionMastSelect';
import Tooltip from "@material-ui/core/Tooltip";
import { HrLeave, getleaverequest, Hrhalfdayrequest, getHRnopunchrequst, compensatoryHr } from 'src/views/CommonCode/Commonfunc';
const LeaveCancelHr = () => {
    const history = useHistory()
    const { getDeptSection, updateleaverequest } = useContext(PayrolMasterContext)
    // type of leave request 
    const [leaverequesttype, setleaverequesttype] = useState([]);
    // to get the ype leave request
    const [levtpevalue, setleavetypevalue] = useState([])
    const [levtpevaluearry, setleavetypevaluearry] = useState({
        COFF: false,
        HDLR: false,
        LR: false,
        NOP: false,
    }
    )
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
    const [compensetory, setcompensetory] = useState([])
    const [compensetorymast, setmastcompensetory] = useState([])
    useEffect(() => {
        HrLeave().then((val) => {
            const leavecancel = val.filter((value) => {
                return (value.hr_apprv === 1)
            })
            setleavereqst(leavecancel)
            setmastleavereqst(leavecancel)
        })
        getleaverequest().then((val) => {
            setleaverequesttype(val)
        })
        getHRnopunchrequst().then((val) => {
            const leavecancel = val.filter((value) => {
                return (value.hr_apprv === 1)
            })
            setnopunch(leavecancel)
            setmastnopunch(leavecancel)
        })
        Hrhalfdayrequest().then((val) => {
            const leavecancel = val.filter((value) => {
                return (value.hr_apprv === 1)
            })
            sethalfday(leavecancel)
            setmasthalfday(leavecancel)
        })
        compensatoryHr().then((val) => {
            const leavecancel = val.filter((value) => {
                return (value.hr_apprv === 1)
            })
            setcompensetory(leavecancel)
            setmastcompensetory(leavecancel)
        })
        return (
            updateleaverequest(0)
        )
    }, [updateleaverequest]);
    //use effect for flitering leave requests against department section
    useEffect(() => {
        if (getDeptSection !== 0) {
            const leavecancel = leavereqmast.filter((value) => {
                return ((value.hr_apprv === 1) && (value.dept_section === getDeptSection))
            });
            setleavereqst(leavecancel)
            getleaverequest().then((val) => {
                setleaverequesttype(val)
            });
            const leavecancelnopunch = nopunchmast.filter((value) => {
                return ((value.hr_apprv === 1) && (value.dept_section === getDeptSection))
            })
            setnopunch(leavecancelnopunch)

            const leavecancelhalfday = halfdaymast.filter((value) => {
                return ((value.hr_apprv === 1) && (value.dept_section === getDeptSection))
            })
            sethalfday(leavecancelhalfday)

            const leavecancelcoff = compensetorymast.filter((value) => {
                return ((value.hr_apprv === 1) && (value.dept_section === getDeptSection))
            })
            setcompensetory(leavecancelcoff)
        }
    }, [getDeptSection]);
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
            <PageLayoutSave
                heading="Leave Cancel HR"
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
                                    <div className="col-md-7 col-sm-12 col-xs-12">
                                        <div className="col-md-4  col-sm-12">
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
                                        levtpevalue === 3 ? nopunch : []
                            } levtpevalue={levtpevalue} authority={5}
                                setleavereq={levtpevalue === 1 ? setleavereqst :
                                    levtpevalue === 2 ? sethalfday :
                                        levtpevalue === 4 ? setcompensetory :
                                            levtpevalue === 3 ? setnopunch : null}
                                DeptSect={getDeptSection}
                            />
                        </div>
                    </div>
                </div>
            </PageLayoutSave>
        </Fragment >
    )
}

export default LeaveCancelHr
