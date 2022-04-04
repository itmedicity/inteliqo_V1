import { Avatar, Divider, ListItemAvatar, ListItemText, Menu, MenuItem, Typography } from '@mui/material'
import React, { Fragment } from 'react'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';


const NotificationContent = ({ handleClose }) => {
    return (
        <Fragment>
            <MenuItem onClick={handleClose}  >
                <ListItemAvatar>
                    <Avatar sx={{ bgcolor: "#ff9800" }} >
                        <NotificationsNoneIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText
                    primary="September 14, 2016"
                    primaryTypographyProps={{ variant: "caption" }}
                    secondary={
                        <Fragment>
                            <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                            >
                                Hr Department
                            </Typography>
                            {' — Message From HR Department asdasdasdasdasdasdaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'}
                        </Fragment>
                    }
                    secondaryTypographyProps={{ noWrap: true }}
                />
            </MenuItem>
            <Divider variant="inset" component="li" />
        </Fragment>
    )
}


const NotificationComponent = ({ anchorEl, open, handleClose }) => {

    const array = [1, 2, 3, 4]

    return (
        <Fragment>
            <Menu
                id="notification-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
                sx={{ width: '100%', maxWidth: 500, }}
            >
                {
                    array.map((val) => {
                        return <NotificationContent key={val} handleClose={handleClose} />
                    })
                }
            </Menu>
        </Fragment>
    )
}

export default NotificationComponent