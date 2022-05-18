import React, { Fragment } from 'react'
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import ProfilePicDefault from '../../../assets/images/vue.jpg'
import { Avatar } from '@mui/material';
import './CmpStyle.scss'
import { useSelector } from 'react-redux';

const ProfileComponent = () => {
    const login = useSelector((state) => {
        return state.getProfileData.ProfileData[0]
    })


    const theme = useTheme();

    return (
        <Fragment>
            <Card
                sx={{
                    display: 'flex',
                    marginTop: 1,
                    width: '100%',
                    maxWidth: '100%',
                    // boxShadow: "0 0 10px 0 #9e9e9e",
                    justifyContent: "space-between",
                    height: 150,
                    transition: "0.3s",
                    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
                    "&:hover": {
                        boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
                    }
                }}
            >
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <CardContent sx={{ flex: '1 0 auto' }}>
                        <Typography component="div" variant="h5">
                            {login.em_name}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary" component="div">
                            {login.desg_name}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary" component="div">
                            {login.dept_name}
                        </Typography>
                    </CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', pl: 2, pb: 1 }}>
                        <Typography variant="subtitle1" color="text.secondary" component="div">
                            Employee # {login.em_no}
                        </Typography>
                    </Box>
                </Box>
                <CardMedia sx={{ width: 150, height: 150, }} >
                    <Avatar
                        alt='test'
                        variant="rounded"
                        src={ProfilePicDefault}
                        sx={{
                            width: 144,
                            height: 145,
                            // margin: "auto",
                            // display: "inline-block",
                            // border: "2px solid white",
                            marginTop: 0.3,
                        }}
                    />
                </CardMedia>

                {/* <CardMedia
                    component="img"
                    sx={{ width: 151, maxHeight: 150 }}
                    image={ProfilePicDefault}
                    alt="Live from space album cover"
                /> */}
            </Card>
        </Fragment >
    )
}

export default ProfileComponent