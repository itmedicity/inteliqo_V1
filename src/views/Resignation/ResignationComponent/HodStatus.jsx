import { Typography } from "@material-ui/core";
import React, { Fragment } from "react";

const HodStatus = ({ hod_app_status, hod_coment }) => {
    return (
        <Fragment>
            <div className="row g-1 pt-2">
                <div className="col-md-12" >
                    <Typography variant='h6'>
                        HOD Comment
                    </Typography>
                </div>
            </div>
            <div className="row g-1 pt-2">
                <div className="col-md-12" >
                    <Typography align='justify'>
                        {hod_app_status === null ? 'Incharge Approval Pending' : hod_coment}
                    </Typography>
                </div>
            </div>
        </Fragment >
    )
};

export default HodStatus;

