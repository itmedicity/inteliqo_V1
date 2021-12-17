import React, { Fragment } from 'react'
import { IconButton, Typography } from '@mui/material'
import { CARD_HEADER_COLOR, CARD_SUB_HEADER_COLOR } from 'src/views/Constant/Constant'
import '../EmpStyle.css'
import AlarmAddOutlinedIcon from '@mui/icons-material/AlarmAddOutlined';

const SalaryIncrementMainCard = ({ children, wageName }) => {
    return (
        <Fragment>
            <div className="card" >
                <div className="card-header py-0" style={CARD_HEADER_COLOR} >
                    <div className="d-flex justify-content-between" >
                        <div className="col-md-2">
                            <Typography variant="body2" gutterBottom className="my-0" >
                                {wageName}
                            </Typography>
                        </div>
                        <div className="col-md-2">
                            <Typography variant="body2" gutterBottom className="my-0 text-end" >
                                <IconButton aria-label="add" style={{ padding: "0rem" }} >
                                    <AlarmAddOutlinedIcon color="inherit" />
                                </IconButton>
                            </Typography>
                        </div>
                    </div>
                </div>
                <div className="card-header py-0" style={CARD_SUB_HEADER_COLOR}>
                    <div className="d-flex justify-content-between" >
                        <div className="col-md-3">
                            <Typography variant="body2" gutterBottom className="my-0" >
                                Description
                            </Typography>
                        </div>
                        <div className="col-md-1">
                            <Typography variant="body2" gutterBottom className="my-0" >
                                Amount
                            </Typography>
                        </div>
                        <div className="col-md-2">
                            <Typography variant="body2" gutterBottom className="my-0" >
                                Start From
                            </Typography>
                        </div>
                        <div className="col-md-1">
                            <Typography variant="body2" gutterBottom className="my-0" >
                                Type
                            </Typography>
                        </div>
                        <div className="col-md-2">
                            <Typography variant="body2" gutterBottom className="my-0" >
                                Amount
                            </Typography>
                        </div>
                        <div className="col-md-1">
                            <Typography variant="body2" gutterBottom className="my-0 text-center" >
                                Action
                            </Typography>
                        </div>
                    </div>
                </div>
                <div className="previousAmentWindow">
                    <ul className="list-group list-group-flush" >
                        {children}
                    </ul>
                </div>
            </div>
        </Fragment>
    )
}

export default SalaryIncrementMainCard
