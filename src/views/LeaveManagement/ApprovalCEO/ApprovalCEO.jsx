import React, { Fragment, useContext, useEffect, useState, } from 'react'
import PageLayoutSave from 'src/views/CommonCode/PageLayoutSave'
import { useHistory } from 'react-router'
import { SELECT_CMP_STYLE } from 'src/views/Constant/Constant'
import { Checkbox, FormControlLabel, IconButton } from '@material-ui/core';
import { PayrolMasterContext } from 'src/Context/MasterContext'
import { axioslogin } from 'src/views/Axios/Axios'
import DeptSectionMastSelect from 'src/views/CommonCode/DeptSectionMastSelect';
import Tooltip from "@material-ui/core/Tooltip";
import TextInput from 'src/views/Component/TextInput';
import { ImSearch } from "react-icons/im";
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
            setleavereqst(val)
        })
        getleaverequest().then((val) => {
            setleaverequesttype(val)
        })
        getCEOnopunchrequst().then((val) => {
            setnopunch(val)
        })
        CEohalfdayrequest().then((val) => {
            sethalfday(val)
        })
        compensatoryCeo().then((val) => {
            setcompensetory(val)
        })

        return (
            updateleaverequest(0),
            updateDeptSection(0)
        )
    }, [updateleaverequest, updateDeptSection]);

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
            //submit={submitFine}
            >
                <div className="row g-1">
                    <div className="card">
                        <div className="card-body">
                            <div className="col-md-12 col-sm-12 col-xs-12">
                                <div className="row g-1">
                                    <div className="col-md-6 col-sm-12 col-xs-12">
                                        <div className="row g-1">
                                            <div className="d-flex justify-content-around">
                                                <div className="col-md-2">
                                                    {/* 
                                                    <FormControlLabel
                                                        control={
                                                            <Checkbox
                                                                name="all"
                                                                color="secondary"
                                                                // value={Leave_Carry_Forwad}
                                                                // checked={Leave_Carry_Forwad}
                                                                checked={true}
                                                            />
                                                        }
                                                        label="All"
                                                    /> */}
                                                </div>
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
                                            <div className="d-flex justify-content-around">
                                                <div className="col-md-4">
                                                    <DeptSectionMastSelect
                                                        style={SELECT_CMP_STYLE}
                                                    />
                                                </div>
                                                <div className="col-md-2">
                                                    <FormControlLabel
                                                        control={
                                                            <Checkbox
                                                                name="all"
                                                                color="secondary"
                                                                checked={true}
                                                            />
                                                        }
                                                        label="All"
                                                    />
                                                </div>
                                                <div className="col-md-3 pl-0">
                                                    <TextInput
                                                        type="text"
                                                        classname="form-control form-control-sm"
                                                        Placeholder="Employee No"
                                                    />
                                                </div>
                                                <div className="col-md-1 pl-0">
                                                    <Tooltip title="Search">
                                                        <IconButton >
                                                            < ImSearch size={22} />
                                                        </IconButton>
                                                    </Tooltip>
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
                                <ApprovalInchargeTable leavereq={levtpevalue == 1 ? leavereq :
                                    levtpevalue == 2 ? halfday :
                                        levtpevalue == 4 ? compensetory :
                                            levtpevalue == 3 ? nopunch : []
                                } levtpevalue={levtpevalue} authority={3}
                                    setleavereq={levtpevalue == 1 ? setleavereqst :
                                        levtpevalue == 2 ? sethalfday :
                                            levtpevalue == 4 ? setcompensetory :
                                                levtpevalue == 3 ? setnopunch : null}
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