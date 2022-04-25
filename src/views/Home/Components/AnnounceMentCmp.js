import React, { Fragment, memo, useEffect, useState } from 'react'
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import image from '../../../assets/images/Anmnt.png'
import newYear from '../../../assets/images/newYear.jpg'
import { useSelector } from 'react-redux';



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
