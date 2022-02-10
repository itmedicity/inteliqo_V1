import { Typography } from "@material-ui/core";
import React, { Fragment } from "react";

const InchargeStatus = ({ inch_app_status, inch_coment }) => {
    return (
        <Fragment>
            <div className="row g-1 pt-2">
                <div className="col-md-12" >
                    <Typography variant='h6'>
                        Incharge Comment
                    </Typography>
                </div>
            </div>
            <div className="row g-1 pt-2">
                <div className="col-md-12" >
                    <Typography align='justify'>
                        {inch_app_status === null ? 'Incharge Approval Pending' : inch_coment}
                    </Typography>
                </div>
            </div>
        </Fragment>
    )
};

export default InchargeStatus;
