import React, { Fragment } from 'react'
import PageLayoutSave from 'src/views/CommonCode/PageLayoutSave'
import { useHistory } from 'react-router'

const ApprovalIncharge = () => {
    const history = useHistory()


    const RedirectToProfilePage = () => {
        history.push(`/Home`)
    }
    return (
        <Fragment>
            <PageLayoutSave
                heading="Leave Approval Incharge"
                redirect={RedirectToProfilePage}
            //submit={submitFine}
            >

            </PageLayoutSave>
        </Fragment>
    )
}

export default ApprovalIncharge
