import { Avatar, Divider, ListItemAvatar, ListItemText, Menu, MenuItem, Typography } from '@mui/material'
import React, { Fragment } from 'react'
import MessageIcon from '@mui/icons-material/Message';

const MessageContent = ({ handleClose }) => {
    return (
        <Fragment>
            <MenuItem onClick={handleClose}  >
                <ListItemAvatar>
                    <Avatar sx={{ bgcolor: "#66bb6a" }} >
                        <MessageIcon />
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



const MessageComponent = ({ anchorEl, open, handleClose }) => {

    const array = [1, 2, 3, 4]

    return (
        <Fragment>
            <Menu
                id="basic-menu"
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
                        return <MessageContent key={val} handleClose={handleClose} />
                    })
                }
            </Menu>
        </Fragment>
    )
}

export default MessageComponent