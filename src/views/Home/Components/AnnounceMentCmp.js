import React, { Fragment, memo } from 'react'
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import image from '../../../assets/images/Anmnt.png'


const AnnounceMentCmp = ({ val }) => {
    return (
        <Fragment>
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar alt="Remy Sharp" src={image} />
                </ListItemAvatar>
                <ListItemText
                    primary="Brunch this weekend?"
                    secondary={
                        <Fragment>
                            <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                            >
                                {/* Ali Connors */}
                            </Typography>
                            {val.Announcement}
                        </Fragment>
                    }
                />
            </ListItem>
            <Divider variant="inset" component="li" />
        </Fragment>
    )
}

export default memo(AnnounceMentCmp) 
