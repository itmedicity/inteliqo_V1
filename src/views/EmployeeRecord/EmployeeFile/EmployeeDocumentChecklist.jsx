import React, { Fragment } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import PageLayoutCloseOnly from 'src/views/CommonCode/PageLayoutCloseOnly'

const EmployeeDocumentChecklist = () => {
    const history = useHistory()
    const { id, no } = useParams()
    const RedirectToProfilePage = () => {
        history.push(`/Home/Profile/${id}/${no}`)
    }

    return (
        <Fragment>
            <PageLayoutCloseOnly
                heading="Employee Document CheckList"
                redirect={RedirectToProfilePage}
            >

            </PageLayoutCloseOnly>
        </Fragment>
    )
}

export default EmployeeDocumentChecklist
