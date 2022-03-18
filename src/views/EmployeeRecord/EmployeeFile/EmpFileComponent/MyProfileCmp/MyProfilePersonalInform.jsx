import { Button, Card, Badge, CardActionArea, CardContent, CardHeader, Grid, Avatar, IconButton, List, ListItem, ListItemAvatar, ListItemText, Typography, ListItemButton, ListItemIcon, TextField, Tooltip } from '@mui/material'
import React, { Fragment, useState, useEffect } from 'react'
import { red } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import HomeIcon from '@mui/icons-material/Home';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import PlaceIcon from '@mui/icons-material/Place';
import PersonPinCircleIcon from '@mui/icons-material/PersonPinCircle';
import WcIcon from '@mui/icons-material/Wc';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import BadgeIcon from '@mui/icons-material/Badge';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import SavingsIcon from '@mui/icons-material/Savings';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import CalendarViewMonthIcon from '@mui/icons-material/CalendarViewMonth';
import CalendarViewWeekIcon from '@mui/icons-material/CalendarViewWeek';
import BloodtypeIcon from '@mui/icons-material/Bloodtype';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import ProfilePicDefault from '../../../../../assets/images/default.png'
import { PUBLIC_NAS_FOLDER, urlExist } from 'src/views/Constant/Constant';
import { axioslogin } from 'src/views/Axios/Axios';
import NotificationImportantIcon from '@mui/icons-material/NotificationImportant';
import MessageIcon from '@mui/icons-material/Message';
import EmailIcon from '@mui/icons-material/Email';
import MyProfileExpQualify from './MyProfileExpQualify';
import MyProfleExperience from './MyProfleExperience';
import MyProfileSalary from './MyProfileSalary';
import AnualLeave from './AnualLeave';
import CloseIcon from '@mui/icons-material/Close';


const MyProfilePersonalInform = ({ empid, redirect }) => {

    const [src, setSrc] = useState(ProfilePicDefault)
    const profilePic = `${PUBLIC_NAS_FOLDER + empid}/profilePic.jpg`;

    const empiddata = {
        em_id: empid
    }

    useEffect(() => {
        const getProfilePicInform = async () => {
            const result = await axioslogin.post('/upload', empiddata);
            const { data } = result.data;
            var { hrm_profile } = data[0];
            if (hrm_profile === 1) {
                urlExist(profilePic, (status) => {
                    if (status === 200) {
                        setSrc(profilePic)
                    }
                })
            }
        }
        getProfilePicInform()
    }, [empiddata, profilePic])

    return (
        <Fragment>
            <Card sx={{ borderRadius: 2, boxShadow: 5 }} >
                <CardHeader
                    // sx={{ backgroundColor: '#b6b8c3' }}
                    title="Ajith Arjunan"
                    titleTypographyProps={{
                        variant: 'body1',
                    }}
                    subheader="Asst. Manager IT"
                    subheaderTypographyProps={{
                        variant: 'subtitle2',
                    }}
                    avatar={
                        <Avatar
                            sx={{ bgcolor: '#49599a', width: 65, height: 65, marginLeft: 3 }}
                            aria-label="recipe"
                            variant="rounded"
                            src={src}
                        >
                            {/* <PersonPinIcon /> */}
                        </Avatar>
                    }
                    action={
                        <Fragment>
                            <IconButton aria-label="settings">
                                <Badge badgeContent={4} color="secondary">
                                    <MessageIcon fontSize='large' sx={{ color: "#64b5f6" }} />
                                </Badge>
                            </IconButton>
                            <IconButton aria-label="settings">
                                <Badge badgeContent={4} color="secondary">
                                    <NotificationImportantIcon fontSize='large' sx={{ color: "#f44336" }} />
                                </Badge>
                            </IconButton>
                            <IconButton aria-label="settings">
                                <Badge badgeContent={4} color="secondary">
                                    <EmailIcon fontSize='large' sx={{ color: "#81c784" }} />
                                </Badge>
                            </IconButton>
                            <IconButton aria-label="settings" sx={{ marginLeft: 10 }} onClick={() => redirect()} >
                                <CloseIcon fontSize='large' sx={{ color: "#212121" }} />
                            </IconButton>
                        </Fragment>
                    }
                />
                <CardContent className='pt-1' >
                    <Grid container spacing={2}  >
                        <Grid item xs={12} md={6}>
                            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                                <ListItem alignItems="flex-start">
                                    <ListItemAvatar>
                                        {/* <ListItemIcon>
                                            <HomeIcon />
                                        </ListItemIcon> */}
                                        <Avatar sx={{ bgcolor: '#49599a' }} >
                                            <HomeIcon sx={{ color: 'white' }} />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary="Permanent Address"
                                        primaryTypographyProps={{ variant: "caption" }}
                                        secondary={
                                            <React.Fragment>
                                                <Typography
                                                    sx={{ display: 'inline' }}
                                                    component="span"
                                                    variant="body2"
                                                    color="text.primary"
                                                >
                                                    Medicity,Umayanallor, Thattamal P O, Kollam 691020
                                                </Typography>
                                                {/* {" — I'll be in your neighborhood doing errands this…"} */}
                                            </React.Fragment>
                                        }
                                    />
                                </ListItem>
                                <Grid item xs={12} md={12}  >
                                    <ListItem disablePadding>
                                        <Grid item xs={12} md={6} >
                                            <Tooltip title="Region" followCursor placement='top' arrow >
                                                <ListItemButton className='py-1' >
                                                    <ListItemIcon>
                                                        <PlaceIcon />
                                                    </ListItemIcon>
                                                    {/* place */}
                                                    <ListItemText primary="Kallumthazham" />
                                                </ListItemButton>
                                            </Tooltip>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <Tooltip title="Postal Pincode" followCursor placement='top' arrow >
                                                <ListItemButton className='py-1'>
                                                    <ListItemIcon>
                                                        <PersonPinCircleIcon />
                                                    </ListItemIcon>
                                                    {/* pin code */}
                                                    <ListItemText primary="691515" />
                                                </ListItemButton>
                                            </Tooltip>
                                        </Grid>

                                    </ListItem>
                                </Grid>
                                <Grid item xs={12} md={12}  >
                                    <ListItem disablePadding>
                                        <Grid item xs={12} md={6} >
                                            <Tooltip title="Mobile Number" followCursor placement='top' arrow >
                                                <ListItemButton className='py-1'>
                                                    <ListItemIcon>
                                                        <PhoneIphoneIcon />
                                                    </ListItemIcon>
                                                    {/* mobile */}
                                                    <ListItemText primary="91 9846009616" />
                                                </ListItemButton>
                                            </Tooltip>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <Tooltip title="Home Telephone Number" followCursor placement='top' arrow >
                                                <ListItemButton className='py-1'>
                                                    <ListItemIcon>
                                                        <LocalPhoneIcon />
                                                    </ListItemIcon>
                                                    {/* Phone */}
                                                    <ListItemText primary="0474 27229393" />
                                                </ListItemButton>
                                            </Tooltip>
                                        </Grid>
                                    </ListItem>
                                </Grid>
                                <Grid item xs={12} md={12}  >
                                    <ListItem disablePadding>
                                        <Grid item xs={12} md={6} >
                                            <Tooltip title="Email Address" followCursor placement='top' arrow >
                                                <ListItemButton className='py-1'>
                                                    <ListItemIcon>
                                                        <AlternateEmailIcon />
                                                    </ListItemIcon>
                                                    {/* Mail Id */}
                                                    <ListItemText primary="ajithajeesh@gmail.com" />
                                                </ListItemButton>
                                            </Tooltip>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <Tooltip title="Adhar Number" followCursor placement='top' arrow >
                                                <ListItemButton className='py-1'>
                                                    <ListItemIcon>
                                                        <BadgeIcon />
                                                    </ListItemIcon>
                                                    {/* adhar number */}
                                                    <ListItemText primary="1234 1234 1234 1234" />
                                                </ListItemButton>
                                            </Tooltip>
                                        </Grid>

                                    </ListItem>
                                </Grid>
                                <Grid item xs={12} md={12}  >
                                    <ListItem disablePadding>
                                        <Grid item xs={12} md={6} >
                                            <Tooltip title="Bank Account Number" followCursor placement='top' arrow >
                                                <ListItemButton className='py-1'>
                                                    <ListItemIcon>
                                                        <AccountBalanceIcon />
                                                    </ListItemIcon>
                                                    {/* Account number */}
                                                    <ListItemText primary="1010012232647" />
                                                </ListItemButton>
                                            </Tooltip>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <Tooltip title="Bank Name" followCursor placement='top' arrow >
                                                <ListItemButton className='py-1'>
                                                    <ListItemIcon>
                                                        <SavingsIcon />
                                                    </ListItemIcon>
                                                    {/* bank Master */}
                                                    <ListItemText primary="FEDERAL BANK" />
                                                </ListItemButton>
                                            </Tooltip>
                                        </Grid>
                                    </ListItem>
                                </Grid>
                            </List>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                                <ListItem alignItems="flex-start">
                                    <ListItemAvatar>
                                        <Avatar sx={{ bgcolor: '#49599a' }} >
                                            <HomeWorkIcon sx={{ color: 'white' }} />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary="Present Address"
                                        primaryTypographyProps={{ variant: "caption" }}
                                        secondary={
                                            <React.Fragment>
                                                <Typography
                                                    sx={{ display: 'inline' }}
                                                    component="span"
                                                    variant="body2"
                                                    color="text.primary"
                                                >
                                                    Medicity,Umayanallor, Thattamal P O, Kollam 691020
                                                </Typography>
                                                {/* {" — I'll be in your neighborhood doing errands this…"} */}
                                            </React.Fragment>
                                        }
                                    />
                                </ListItem>

                                <Grid item xs={12} md={12}  >
                                    <ListItem disablePadding>
                                        <Grid item xs={12} md={6} >
                                            <Tooltip title="Gender" followCursor placement='top' arrow >
                                                <ListItemButton className='py-1'>
                                                    <ListItemIcon>
                                                        <WcIcon />
                                                    </ListItemIcon>
                                                    {/* Gender */}
                                                    <ListItemText primary="Male" />
                                                </ListItemButton>
                                            </Tooltip>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <Tooltip title="Marital Status" followCursor placement='top' arrow >
                                                <ListItemButton className='py-1'>
                                                    <ListItemIcon>
                                                        <SupervisorAccountIcon />
                                                    </ListItemIcon>
                                                    {/* Marital Status */}
                                                    <ListItemText primary="Not Married" />
                                                </ListItemButton>
                                            </Tooltip>
                                        </Grid>

                                    </ListItem>
                                </Grid>
                                <Grid item xs={12} md={12}  >
                                    <ListItem disablePadding>
                                        <Grid item xs={12} md={6} >
                                            <Tooltip title="Religion" followCursor placement='top' arrow >
                                                <ListItemButton className='py-1'>
                                                    <ListItemIcon>
                                                        <SupervisorAccountIcon />
                                                    </ListItemIcon>
                                                    {/* Religion */}
                                                    <ListItemText primary="Hindhu" />
                                                </ListItemButton>
                                            </Tooltip>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <Tooltip title="Age" followCursor placement='top' arrow >
                                                <ListItemButton className='py-1'>
                                                    <ListItemIcon>
                                                        <CalendarViewMonthIcon />
                                                    </ListItemIcon>
                                                    {/* Age */}
                                                    <ListItemText primary="28 Y 10 M" />
                                                </ListItemButton>
                                            </Tooltip>
                                        </Grid>

                                    </ListItem>
                                </Grid>
                                <Grid item xs={12} md={12}  >
                                    <ListItem disablePadding>
                                        <Grid item xs={12} md={6} >
                                            <Tooltip title="Date Of Birth" followCursor placement='top' arrow >
                                                <ListItemButton className='py-1'>
                                                    <ListItemIcon>
                                                        <CalendarViewWeekIcon />
                                                    </ListItemIcon>
                                                    {/* DOB */}
                                                    <ListItemText primary="02-01-1988" />
                                                </ListItemButton>
                                            </Tooltip>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <Tooltip title="Blood Group" followCursor placement='top' arrow >
                                                <ListItemButton className='py-1'>
                                                    <ListItemIcon>
                                                        <BloodtypeIcon />
                                                    </ListItemIcon>
                                                    {/* BLood Group */}
                                                    <ListItemText primary="B +Ve" />
                                                </ListItemButton>
                                            </Tooltip>
                                        </Grid>

                                    </ListItem>
                                </Grid>
                                <Grid item xs={12} md={12} >
                                    <ListItem disablePadding>
                                        <Grid item xs={12} md={6} >
                                            <Tooltip title="IFSC Code" followCursor placement='top' arrow >
                                                <ListItemButton className='py-1'>
                                                    <ListItemIcon>
                                                        <AccountBalanceWalletIcon />
                                                    </ListItemIcon>
                                                    {/* Ifsc Code*/}
                                                    <ListItemText primary="FDRL001023" />
                                                </ListItemButton>
                                            </Tooltip>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <Tooltip title="PAN Number" followCursor placement='top' arrow >
                                                <ListItemButton className='py-1'>
                                                    <ListItemIcon>
                                                        <ConfirmationNumberIcon />
                                                    </ListItemIcon>
                                                    {/* Pan Number */}
                                                    <ListItemText primary="BRXBA2654P" />
                                                </ListItemButton>
                                            </Tooltip>
                                        </Grid>
                                    </ListItem>
                                </Grid>
                            </List>
                        </Grid>
                    </Grid>
                    <Grid item container xs={12} md={12} direction="row" spacing={2} >
                        <Grid item xs={12} md={6} >
                            <MyProfileExpQualify />
                        </Grid>
                        <Grid item xs={12} md={6} >
                            <MyProfleExperience />
                        </Grid>
                        <Grid item xs={12} md={6} >
                            <MyProfileSalary />
                        </Grid>
                        <Grid item xs={12} md={6} >
                            <AnualLeave />
                        </Grid>
                    </Grid>
                </CardContent>
                <CardActionArea>
                    {/* <Button size="small">Learn More</Button> */}
                </CardActionArea>
            </Card>
        </Fragment >
    )
}

export default MyProfilePersonalInform