import React, { Fragment } from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import AuthorizationDetails from "src/views/CommonCode/AuthorizationDetails";
import PageLayoutCloseOnly from "src/views/CommonCode/PageLayoutCloseOnly";
import { SELECT_CMP_STYLE } from "src/views/Constant/Constant";
import ResignationApprovalSection from "../ResignationApproval/ResignationApprovalSection";
import CeoApprovalTable from "./CeoApprovalTable";

const ResignationApprovalCEO = () => {
    const history = useHistory()
    const RedirectToProfilePage = () => {
        history.push(`/Home`)
    }
    return (
        <Fragment>
            <PageLayoutCloseOnly
                heading="Resignation Approval CEO"
                redirect={RedirectToProfilePage}
            >
                <div className="col-md-12">
                    <div className="row g-1">
                        <div className="d-flex justify-content-center">
                            <div className="col-md-12">
                                <CeoApprovalTable />
                            </div>
                        </div>
                    </div>
                </div>
            </PageLayoutCloseOnly>
        </Fragment>
    )
};

export default ResignationApprovalCEO;
