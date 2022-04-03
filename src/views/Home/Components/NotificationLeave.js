import { Badge, FormControlLabel, IconButton } from '@mui/material'
import React, { Fragment } from 'react'

const NotificationLeave = () => {
    return (
        <Fragment>
            <FormControlLabel
                sx={{ color: '#1976D2', fontSize: 15, fontWeight: "bold", }}
                control={
                    <IconButton  >
                        <Badge badgeContent={9} variant='standard' color='error'
                            sx={{
                                "& .MuiBadge-badge": {
                                    color: "white",
                                    backgroundColor: "#EF5350",
                                    boxShadow: "0 0 8px 2px lightblue",
                                }
                            }}
                        >
                            <MailIcon color="primary" />
                        </Badge>
                    </IconButton>
                }
                label="Leave Request"
                labelPlacement='end'
                disableTypography={true}
            />
        </Fragment>
    )
}

export default NotificationLeave