import { IconButton, Typography } from '@material-ui/core';
import AlarmAddOutlined from '@mui/icons-material/AlarmAddOutlined';
import React from 'react';
import { CARD_HEADER_COLOR, CARD_SUB_HEADER_COLOR } from 'src/views/Constant/Constant';

const DueClearenceCard = () => {
    return (
        <div className="card">
            <div className="card-header py-0" style={CARD_HEADER_COLOR}>
                <div className="d-flex justify-content-between" >
                    <div className="col-md-2">
                        <Typography variant="body2" gutterBottom className="my-0">
                            Duce Clearence
                        </Typography>
                    </div>
                    <div className="col-md-2">
                        <Typography variant="body2" gutterBottom className="my-0 text-end">
                            <IconButton aria-label="add" style={{ padding: "0rem" }}>
                                <AlarmAddOutlined color="inherit" />
                            </IconButton>
                        </Typography>
                    </div>
                </div>
            </div>
            <div className="card-header py-0" style={CARD_SUB_HEADER_COLOR}>
                <div className="d-flex justify-content-between" >
                    <div className="col-md-1">
                        <Typography variant="body2" gutterBottom className="my-0" >
                            Dept Code
                        </Typography>
                    </div>
                    <div className="col-md-4">
                        <Typography variant="body2" gutterBottom className="my-0" >
                            Clearence Department
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

    )

};

export default DueClearenceCard;
