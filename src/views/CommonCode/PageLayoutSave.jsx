import React, { Fragment } from 'react'
import { ToastContainer } from 'react-toastify'
import SessionCheck from '../Axios/SessionCheck'
import FooterClosebtn from './FooterClosebtn'

const PageLayoutSave = (props) => {
    return (
        <Fragment>
            <SessionCheck />
            <ToastContainer />
            <div className="card">
                <div className="card-header bg-dark pb-0 border border-dark text-white lead">
                    <h6>{props.heading}</h6>
                </div>
                <div className="card-body">
                    <div className="card">
                        <div className="card-body">
                            {props.children}
                        </div>
                        <div className="card-footer text-black row">
                            <div className="col-md-5">
                                <FooterClosebtn
                                    redirect={props.redirect}
                                    submit={props.submit}
                                />
                            </div>
                            {props.footer}
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default PageLayoutSave
