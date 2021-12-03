import React, { Fragment } from 'react'
import { ToastContainer } from 'react-toastify'
import SessionCheck from '../Axios/SessionCheck'

const PageLayout = (props) => {
    return (
        <Fragment>
            <SessionCheck />
            <ToastContainer />
            <div className="card">
                <div className="card-header bg-dark pb-0 border border-dark text-white lead">
                    <h6>{props.heading}</h6>
                </div>
                <div className="card-body">
                    {/* <div className="row"> */}
                    {props.children}
                    {/* </div> */}
                </div>
            </div>
        </Fragment>
    )
}

export default PageLayout
