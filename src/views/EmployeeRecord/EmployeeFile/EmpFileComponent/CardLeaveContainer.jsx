import { IconButton, Tooltip, Typography } from '@mui/material'
import React from 'react'
import { CARD_HEADER_COLOR, CARD_SUB_HEADER_COLOR } from 'src/views/Constant/Constant'

const CardLeaveContainer = ({ children, title }) => {
    const { mainHeading, headingOne, headingTwo, headingThee, headingFour } = title
    return (
        <div className="card">
            <div className="card-header py-0 d-flex justify-content-between" style={CARD_HEADER_COLOR} >
                <div>{mainHeading}</div>
                <div style={{ color: "#023015" }} ></div>
            </div>
            <div className="card-header py-0" style={CARD_SUB_HEADER_COLOR} >
                <div className="d-sm-flex d-md-flex flex-row justify-content-around">
                    <div className="col-sm-4 py-0 text-start" style={{ width: "70%" }}>

                        <Typography variant="caption" display="block" gutterBottom className="py-0 my-0" >
                            {headingOne}
                        </Typography>

                    </div>
                    <div className="col-sm-2 py-0 text-center" style={{ width: "10%" }}>
                        <Tooltip title="Credited" arrow placement="top" >
                            <IconButton color="primary" aria-label="Credited" size='small' sx={{ padding: 0, color: "#556b83" }}  >
                                <Typography variant="caption" display="block" gutterBottom className="py-0 my-0" >
                                    {headingTwo}
                                </Typography>
                            </IconButton>
                        </Tooltip>
                    </div>
                    <div className="col-sm-2 py-0 text-center" style={{ width: "10%" }}>
                        <Tooltip title="Taken" arrow placement="top" >
                            <IconButton color="primary" aria-label="Taken" size='small' sx={{ padding: 0, color: "#556b83" }}  >
                                <Typography variant="caption" display="block" gutterBottom className="py-0 my-0" >
                                    {headingThee}
                                </Typography>
                            </IconButton>
                        </Tooltip>
                    </div>
                    <div className="col-sm-2 py-0 text-center" style={{ width: "10%" }}>
                        <Tooltip title="Balance" arrow placement="top" >
                            <IconButton color="primary" aria-label="Balance" size='small' sx={{ padding: 0, color: "#556b83" }}  >
                                <Typography variant="caption" display="block" gutterBottom className="py-0 my-0" >
                                    {headingFour}
                                </Typography>
                            </IconButton>
                        </Tooltip>
                    </div>
                </div>
            </div>
            {children}
        </div>
    )
}

export default CardLeaveContainer
