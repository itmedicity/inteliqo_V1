import { Avatar, Divider, ListItemAvatar, ListItemText, Menu, MenuItem, Typography } from '@mui/material'
import React, { Fragment, memo, useEffect } from 'react'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { useSelector } from 'react-redux';
import moment from 'moment';
const AnnouncementContent = ({ handleClose, alerts }) => {
    return (
        <Fragment>
            <MenuItem >
                <ListItemAvatar>
                    <Avatar sx={{ bgcolor: "#ff9800" }} >
                        <NotificationsNoneIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText
                    primary={moment(alerts.created_date).format('DD-MM-YYYY')}
                    primaryTypographyProps={{ variant: "caption" }}
                    secondary={
                        <Fragment>
                            <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                            >
                                {alerts.Announcement}
                            </Typography>

                        </Fragment>
                    }
                    secondaryTypographyProps={{ noWrap: true }}
                />
            </MenuItem>
            <Divider variant="inset" component="li" />
        </Fragment>
    )
}


const AnnouncementCmpnt = ({ anchorEl, open, handleClose, setannouncecount }) => {
    const Announcementlist = useSelector((state) => {
        return state.getAnnouncementList.AnnouncementList
    })
    useEffect(() => {
        setannouncecount(Announcementlist.length)
    }, [Announcementlist.length])

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
                    Announcementlist && Announcementlist.map((val) => {
                        return <AnnouncementContent key={val.announcment_slno} alerts={val} handleClose={handleClose} />
                    })
                }
            </Menu>
        </Fragment>
    )
}

export default memo(AnnouncementCmpnt) 