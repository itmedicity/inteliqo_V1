import { Typography } from "@material-ui/core";
import React, { Fragment, memo } from "react";

const apprvalremarkcmponent = ({ heading, status, remarks }) => {
    return (

        <Fragment>
            <div className="row g-1 pt-2">
                <div className="col-md-12" >
                    <Typography variant='h6'>
                        {heading}
                    </Typography>
                </div>
            </div>
            <div className="row g-1 pt-2">
                <div className="col-md-12" >
                    <Typography align='justify'>
                        {status === null ? 'Incharge Approval Pending' : remarks}
                    </Typography>
                </div>
            </div>
        </Fragment >

    )
}

export default apprvalremarkcmponent