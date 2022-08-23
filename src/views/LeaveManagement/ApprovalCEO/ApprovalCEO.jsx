import React, { Fragment, useContext, useEffect, useState, } from 'react'
import PageLayoutSave from 'src/views/CommonCode/PageLayoutSave'
import { useHistory } from 'react-router'
import { SELECT_CMP_STYLE } from 'src/views/Constant/Constant'
import { Checkbox, FormControlLabel } from '@material-ui/core';
import { PayrolMasterContext } from 'src/Context/MasterContext'
import DeptSectionMastSelect from 'src/views/CommonCode/DeptSectionMastSelect';
import Tooltip from "@material-ui/core/Tooltip";
import { ceoLeavereq, getleaverequest, CEohalfdayrequest, getCEOnopunchrequst, compensatoryCeo } from 'src/views/CommonCode/Commonfunc';
import ApprovalInchargeTable from '../ApprovalIncharge/ApprovalInchargeTable';

const ApprovalCEO = () => {
    const [levtpevalue, setleavetypevalue] = useState([])
    const history = useHistory()
    const { updateleaverequest, getDeptSection, updateDeptSection } = useContext(PayrolMasterContext)
    const [leaverequesttype, setleaverequesttype] = useState([]);
    // for get leave requesst details
    const [leavereq, setleavereqst] = useState([])
    // get nopunch request
    const [nopunch, setnopunch] = useState([])
    // get halfdayrequest
    const [halfday, sethalfday] = useState([])
    const [compensetory, setcompensetory] = useState([])
    // for get leave requesst details
    const [leavereqmast, setmastleavereqst] = useState([])
    // get nopunch request
    const [nopunchmast, setmastnopunch] = useState([])
    // get halfdayrequest
    const [halfdaymast, setmasthalfday] = useState([])
    const [compensetorymast, setmastcompensetory] = useState([])
    const [levtpevaluearry, setleavetypevaluearry] = useState({
        COFF: false,
        HDLR: false,
        LR: false,
        NOP: false,
    }
    )
    const { COFF, HDLR, LR, NOP } = levtpevaluearry
    useEffect(() => {
        ceoLeavereq().then((val) => {
            setmastleavereqst(val)
            setleavereqst(val)
        })
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

        return (
            updateleaverequest(0),
            updateDeptSection(0)
        )
    }, []);
    //use Effect for filtering leave request against  selected department section
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
                heading="Leave Approval CEO"
                redirect={RedirectToProfilePage}
            >
                <div className="row g-1">
                    <div className="card">
                        <div className="card-body">
                            <div className="col-md-12 col-sm-12 col-xs-12">
                                <div className="row g-1">
                                    <div className="col-md-6 col-sm-12 col-xs-12">
                                        <div className="row g-1">
                                            <div className="d-flex justify-content-around">
                                                {
                                                    leaverequesttype && leaverequesttype.map((val) => {
                                                        return <div className="col-md-2" key={val.lrequest_slno} >
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
                                    </div>
                                    <div className="col-md-6 col-sm-12 col-xs-12">
                                        <div className="row">
                                            <div className="d-flex justify-content-start">
                                                <div className="col-md-5 pt-1">
                                                    <DeptSectionMastSelect
                                                        style={SELECT_CMP_STYLE}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="pt-2">
                    <div className="card ">
                        <div className="card-body">
                            <div className="col-md-12">
                                <ApprovalInchargeTable leavereq={
                                    levtpevalue === '1' ? leavereq :
                                        levtpevalue === '2' ? halfday :
                                            levtpevalue === '4' ? compensetory :
                                                levtpevalue === '3' ? nopunch : []
                                } levtpevalue={levtpevalue} authority={3}
                                    setleavereq={levtpevalue === '1' ? setleavereqst :
                                        levtpevalue === '2' ? sethalfday :
                                            levtpevalue === '4' ? setcompensetory :
                                                levtpevalue === '3' ? setnopunch : null}

                                />
                            </div>
                        </div>
                    </div>
                </div>
            </PageLayoutSave>
        </Fragment>
    )
}

export default ApprovalCEO