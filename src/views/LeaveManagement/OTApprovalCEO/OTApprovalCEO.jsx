import React, { Fragment } from 'react'
import PageLayoutCloseOnly from 'src/views/CommonCode/PageLayoutCloseOnly';
import OTApprovalCEOTable from './OTApprovalCEOTable';
import { useHistory } from 'react-router'

const OTApprovalCEO = () => {
    const history = useHistory()
    const RedirectToProfilePage = () => {
        history.push(`/Home`)
    }
    return (
        <Fragment>
            <PageLayoutCloseOnly
                heading="Over Time Approval CEO"
                redirect={RedirectToProfilePage}
            >
                <div className="col-md-12">
                    <div className="row g-1">
                        <div className="d-flex justify-content-center">
                            <div className="col-md-12">
                                <OTApprovalCEOTable />
                            </div>
                        </div>
                    </div>
                </div>
            </PageLayoutCloseOnly>
        </Fragment>
    )
}

export default OTApprovalCEO
