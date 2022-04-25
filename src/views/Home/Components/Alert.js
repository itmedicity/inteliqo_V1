import { Badge, FormControlLabel, IconButton, } from '@mui/material'
import React, { Fragment, useState } from 'react'
import AddAlertIcon from '@mui/icons-material/AddAlert';
import NotificationComponent from 'src/components/profileComponent/NotificationComponent';

const Alert = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const [alertcount, setalertcount] = useState(0)
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    return (
        <Fragment>
            <FormControlLabel
                sx={{ color: '#1976D2', fontSize: 15, fontWeight: "bold", width: '100%' }}
                control={
                    <IconButton
                        aria-controls={open ? 'notification-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                    >
                        <Badge badgeContent={alertcount} variant='standard' color='error'
                            sx={{
                                "& .MuiBadge-badge": {
                                    color: "white",
                                    backgroundColor: "#EF5350",
                                    boxShadow: "0 0 8px 2px lightblue",
                                }
                            }}
                        >
                            <AddAlertIcon color="primary" />
                        </Badge>
                    </IconButton>
                }
                label="Alert"
                labelPlacement='end'
                disableTypography={true}
            />

            <NotificationComponent anchorEl={anchorEl} open={open} handleClose={handleClose} setalertcount={setalertcount} />
        </Fragment>
    )
}

export default Alert