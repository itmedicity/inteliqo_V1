import { Checkbox, FormControlLabel } from "@material-ui/core";
import React, { Fragment, useState } from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import AuthorizationDetails from "src/views/CommonCode/AuthorizationDetails";
import PageLayoutCloseOnly from "src/views/CommonCode/PageLayoutCloseOnly";
import { SELECT_CMP_STYLE } from "src/views/Constant/Constant";
import HRApprovalSections from "./HRApprovalSections";
import HRApprovalTable from "./HRApprovalTable";
import HrApprovalTableSection from "./HrApprovalTableSection";
import ContractCloseHRApproval from "./ContractCloseHRApproval";
const ResignationApprovalHR = () => {
    const history = useHistory()
    const RedirectToProfilePage = () => {
        history.push(`/Home`)
    }
    const [DeptSect, updateDeptSect] = useState([])
    const [depsect, setDeptsect] = useState(0)
    const [conttrcatclose, setContractclose] = useState(0)
    const handleChange = async (e) => {
        setDeptsect(e)
    }
    const [formdata, setFormdata] = useState({
        contractclose: false
    })
    const { contractclose } = formdata
    const ChangeValue = async (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormdata({ ...formdata, [e.target.name]: value })
        if (value === true) {
            setContractclose(1)
        }
        else {
            setContractclose(0)
        }
    }
    useEffect(() => {
    }, [conttrcatclose])
    return (
        <Fragment>
            <PageLayoutCloseOnly
                heading="Resignation Approval HR"
                redirect={RedirectToProfilePage}
            >
                <div className="col-md-12">
                    <div className="row g-1">
                        <div className="d-flex justify-content-center">
                            <div className="col-md-3">
                                <HRApprovalSections style={SELECT_CMP_STYLE} DeptSect={DeptSect} updateDeptSect={updateDeptSect}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="col-md-1"></div>
                            <div className="col-md-3">
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            name="contractclose"
                                            color="secondary"
                                            value={contractclose}
                                            checked={contractclose}
                                            onChange={(e) => ChangeValue(e)}
                                            className="pt-1"
                                        />
                                    }
                                    label="Contract Close"
                                />
                            </div>
                            <AuthorizationDetails />
                        </div>
                    </div>
                </div>
                <div className="col-md-12 mt-3">
                    {depsect === 0 && conttrcatclose !== 1 ? <HRApprovalTable DeptSect={DeptSect} /> : null}
                    {depsect !== 0 ? <HrApprovalTableSection DeptSect={depsect} /> : null}
                    {conttrcatclose === 1 ? <ContractCloseHRApproval /> : null}
                </div>
            </PageLayoutCloseOnly>
        </Fragment>
    )
};

export default ResignationApprovalHR;
