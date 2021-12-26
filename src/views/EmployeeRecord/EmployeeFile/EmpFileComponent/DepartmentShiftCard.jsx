import { IconButton, Typography } from '@material-ui/core'
import React, { Fragment } from 'react'
import { CARD_HEADER_COLOR, CARD_SUB_HEADER_COLOR } from 'src/views/Constant/Constant'
import AlarmAddOutlinedIcon from '@mui/icons-material/AlarmAddOutlined';

const DepartmentShiftCard = ({ DepartmentShift }) => {
    return (
        <Fragment>
            <div className="card">
                <div className="card-header py-0" style={CARD_HEADER_COLOR} >
                    <div className="d-flex justify-content-between" >
                        <div className="col-md-2">
                            <Typography variant="body2" gutterBottom className="my-0" >
                                {DepartmentShift}
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
                        <div className="col-md-1">
                            <Typography variant="body2" gutterBottom className="my-0" >
                                Shift Code
                            </Typography>
                        </div>
                        <div className="col-md-2">
                            <Typography variant="body2" gutterBottom className="my-0" >
                                Shift Description
                            </Typography>
                        </div>
                        <div className="col-md-1">
                            <Typography variant="body2" gutterBottom className="my-0 text-center" >
                                Action
                            </Typography>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment >
    )
}

export default DepartmentShiftCard
