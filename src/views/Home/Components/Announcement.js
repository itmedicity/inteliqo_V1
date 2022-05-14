import React, { Fragment, memo, useEffect, useState } from 'react'

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import { red } from '@mui/material/colors';
import List from '@mui/material/List';
import image from '../../../assets/images/Anmnt.png'
import newYear from '../../../assets/images/newYear.jpg'
import { useSelector } from 'react-redux';
import AnnounceMentCmp from './AnnounceMentCmp';
const Announcement = () => {
    const [announcement, setannouncement] = useState([])
    const Announcementlist = useSelector((state) => {
        return state.getAnnouncementList.AnnouncementList
    })
    // console.log(Announcementlist)
    useEffect(() => {
        if (Object.keys(Announcementlist).length > 0) {
            setannouncement(Announcementlist)
        }
    }, [])
    const annouStyle = {
        Width: '100%',
        height: 320,
        bgcolor: 'background.paper',
        overflow: "hidden",
        marginTop: 0,
        overflowY: "auto",

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
                            Announcementlist && Announcementlist.map((val, index) => {
                                return <AnnounceMentCmp key={index} val={val} />
                            })
                        }
                    </List>
                </CardContent>
            </Card>
        </Fragment>
    )
}

export default memo(Announcement) 