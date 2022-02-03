import React, { Fragment } from "react";
import { useHistory } from "react-router-dom";
import PageLayoutCloseOnly from "src/views/CommonCode/PageLayoutCloseOnly";
import ResignationCancelTable from "./ResignationCancelTable";
const ResignationCancel = () => {
    const history = useHistory()
    const RedirectToProfilePage = () => {
        history.push(`/Home`)
    }
    return (
        <Fragment>
            <PageLayoutCloseOnly
                heading="Resignation Cancel"
                redirect={RedirectToProfilePage}
            >
                <div className="col-md-12">
                    <div className="row g-1">
                        <div className="d-flex justify-content-center">
                            <div className="col-md-12 mt-3">
                                <ResignationCancelTable />
                            </div>
                        </div>
                    </div>
                </div>

            </PageLayoutCloseOnly>
        </Fragment>
    )
};

export default ResignationCancel;
