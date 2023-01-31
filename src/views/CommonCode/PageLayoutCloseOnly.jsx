import React, { Fragment } from 'react'
import { ToastContainer } from 'react-toastify'
import SessionCheck from '../Axios/SessionCheck'
import FooterCloseOnly from './FooterCloseOnly'

import CustomHeaderCmpOnly from '../Component/MuiCustomComponent/CustomHeaderCmpOnly'

const PageLayoutCloseOnly = (props) => {
    return (
        <Fragment>
            <SessionCheck />
            <ToastContainer />
            <div className="card">
                <CustomHeaderCmpOnly title={props.heading} displayClose={true} />
                <div className="card-body">
                    <div className="card">
                        <div className="card-body">
                            {props.children}
                        </div>
                        <div className="card-footer text-muted">
                            <FooterCloseOnly
                                redirect={props.redirect}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default PageLayoutCloseOnly
