import { Badge, FormControlLabel, IconButton } from '@mui/material'
import React, { Fragment, useState } from 'react'
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import AnnouncementCmpnt from 'src/components/profileComponent/AnnouncementCmpnt';

const Notification = () => {
    const [announcecount, setannouncecount] = useState(0)
    const [anchorElAnnouncement, setAnchorElAnnouncement] = React.useState(null);
    const openAnnouncement = Boolean(anchorElAnnouncement);
    const handleAnnouncementClick = (event) => {
        setAnchorElAnnouncement(event.currentTarget);
    };
    const handleAnnouncementClose = () => {
        setAnchorElAnnouncement(null);
    };

    return (
        <Fragment>
            <FormControlLabel
                sx={{ color: '#1976D2', fontSize: 15, fontWeight: "bold", width: '100%' }}
                control={
                    <IconButton
                        id="basic-button"
                        aria-controls={openAnnouncement ? 'notification-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={openAnnouncement ? 'true' : undefined}
                        onClick={handleAnnouncementClick}
                    >
                        <Badge badgeContent={announcecount} variant='standard' color='error'
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
                // label="Notification"
                labelPlacement='end'
                disableTypography={true}
            />
            < AnnouncementCmpnt anchorEl={anchorElAnnouncement} open={openAnnouncement} handleClose={handleAnnouncementClose} setannouncecount={setannouncecount} />
        </Fragment>
    )
}

export default Notification