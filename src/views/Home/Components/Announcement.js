import React, { Fragment } from 'react'
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

const Announcement = () => {

    const annouStyle = {
        Width: '100%',
        height: 320,
        bgcolor: 'background.paper',
        overflow: "hidden",
        marginTop: 0,
        overflowY: "auto",

    }

    const array = [1, 2, 3, 4, 5, 6]

    const AnnounceMentCmp = () => {
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
                                    Ali Connors
                                </Typography>
                                {" — I'll be in your neighborhood doing errands this…"}
                            </Fragment>
                        }
                    />
                </ListItem>
                <Divider variant="inset" component="li" />
            </Fragment>
        )
    }

    return (
        <Fragment>
            <Card sx={{ maxWidth: '100%', maxHeight: '100%', marginTop: '2%', }} >
                <CardHeader
                    sx={{ paddingBottom: 0 }}
                    avatar={
                        <Avatar sx={{ bgcolor: red[500] }} src={image} />
                    }
                    action={
                        <IconButton aria-label="settings">
                            {/* <MoreVertIcon /> */}
                        </IconButton>
                    }
                    title="Announcement"
                    titleTypographyProps={{ variant: "h5" }}
                />
                <CardMedia
                    component="img"
                    height="194"
                    image={newYear}
                    alt="Paella dish"
                    className='img-fluid rounded'
                    sx={{
                        height: 200, width: '100%', objectFit: "cover",
                        // height: "auto", width: "auto", maxHeight: 200, maxWidth: '100%', backgroundSize: "cover",
                    }}
                />
                <CardContent>
                    <List sx={annouStyle}>
                        {
                            array.map((val, index) => {
                                return <AnnounceMentCmp key={index} />
                            })
                        }
                    </List>
                </CardContent>
            </Card>
        </Fragment>
    )
}

export default Announcement