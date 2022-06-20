import React, { Fragment, memo } from 'react'
import { ToastContainer } from 'react-toastify'
import SessionCheck from '../Axios/SessionCheck'

const PageLayoutReports = (props) => {
    return (
        <Fragment>
            <SessionCheck />
            <ToastContainer />
            <div className="card">
                <div className="card-header bg-dark pb-0 border border-dark text-white lead">
                    <h6>{props.heading}</h6>
                </div>
            </div>
        </Fragment>
    )
}

export default memo(PageLayoutReports)