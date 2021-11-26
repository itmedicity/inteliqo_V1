import { Button } from '@material-ui/core'
import React, { Fragment } from 'react'
import { useHistory } from 'react-router'
import PageLayout from 'src/views/CommonCode/PageLayout'

const ApplicationForm = () => {
    const history = useHistory()
    const RedirectToProfilePage = () => {
        history.push(`/Home/Profile/${4516}`)
    }
    return (
        <Fragment>
            <PageLayout heading="Application Form">
                <Button variant="outlined" onClick={RedirectToProfilePage}  >
                    close
                </Button>
            </PageLayout>
        </Fragment>
    )
}

export default ApplicationForm
