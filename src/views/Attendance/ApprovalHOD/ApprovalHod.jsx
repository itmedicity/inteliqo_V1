import React, { Fragment } from 'react'
import PageLayoutSave from 'src/views/CommonCode/PageLayoutSave'
import { useHistory } from 'react-router'

const ApprovalHod = () => {
    const history = useHistory()


    const RedirectToProfilePage = () => {
        history.push(`/Home`)
    }
    return (
        <Fragment>
            <PageLayoutSave
                heading="Leave Approval HOD"
                redirect={RedirectToProfilePage}
            //submit={submitFine}
            >

            </PageLayoutSave>
        </Fragment>
    )
}

export default ApprovalHod
