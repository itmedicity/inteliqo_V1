import { Badge, FormControlLabel, IconButton } from '@mui/material'
import React, { Fragment } from 'react'
import TimelapseIcon from '@mui/icons-material/Timelapse';

const Overtime = () => {
    return (
        <Fragment>
            <FormControlLabel
                sx={{ color: '#1976D2', fontSize: 15, fontWeight: "bold", width: '100%' }}
                control={
                    <IconButton  >
                        <Badge badgeContent={1} variant='standard' color='error'
                            sx={{
                                "& .MuiBadge-badge": {
                                    color: "white",
                                    backgroundColor: "#EF5350",
                                    boxShadow: "0 0 8px 2px lightblack",
                                }
                            }}
                        >
                            <TimelapseIcon color="primary" />
                        </Badge>
                    </IconButton>
                }
                label="Overtime "
                labelPlacement='end'
                disableTypography={true}
            />
        </Fragment>
    )
}

export default Overtime