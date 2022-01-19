import React, { Fragment } from 'react'
import { ToastContainer } from 'react-toastify'
import SessionCheck from 'src/views/Axios/SessionCheck'
import PageLayoutCloseOnly from 'src/views/CommonCode/PageLayoutCloseOnly'

const HodAuthorisation = () => {
    return (
        <Fragment>
            <SessionCheck />
            <ToastContainer />
            <PageLayoutCloseOnly heading="HOD Authorisation Assignment">

            </PageLayoutCloseOnly>
        </Fragment>
    )
}

export default HodAuthorisation
