import { Badge, FormControlLabel, IconButton } from '@mui/material'
import React, { Fragment } from 'react'
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';

const Notification = () => {
    return (
        <Fragment>
            <FormControlLabel
                sx={{ color: '#1976D2', fontSize: 15, fontWeight: "bold", width: '100%' }}
                control={
                    <IconButton  >
                        <Badge badgeContent={10} variant='standard' color='error'
                            sx={{
                                "& .MuiBadge-badge": {
                                    color: "white",
                                    backgroundColor: "#EF5350",
                                    boxShadow: "0 0 8px 2px lightblue",
                                }
                            }}
                        >
                            <NotificationsActiveIcon color="primary" />
                        </Badge>
                    </IconButton>
                }
                label="Notification"
                labelPlacement='end'
                disableTypography={true}
            />
        </Fragment>
    )
}

export default Notification