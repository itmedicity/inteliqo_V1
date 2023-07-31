import { Box, Card, CardMedia, CardContent, Paper } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { CssVarsProvider, Typography } from '@mui/joy';
import Avatar from '@mui/joy/Avatar'
import IconButton from '@mui/joy/IconButton';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import UploadIcon from '@mui/icons-material/Upload';
import { useParams } from 'react-router-dom';
import { PUBLIC_NAS_FOLDER } from 'src/views/Constant/Static';
import ProfilePicDefault from '../../../../assets/images/default.png'
import { urlExist } from 'src/views/Constant/Constant';
import { useDispatch, useSelector } from 'react-redux';
import { setPersonalData } from 'src/redux/actions/Profile.action';
import _ from 'underscore';

const ProfileCard = () => {
    const { no } = useParams()
    const dispatch = useDispatch()

    const [src, setSrc] = useState(ProfilePicDefault)
    const profilePic = `${PUBLIC_NAS_FOLDER + no}/profilePic.jpg`;

    useEffect(() => {
        dispatch(setPersonalData(no))
    }, [no, dispatch])

    const state = useSelector((state) => state.getPrifileDateEachEmp.empPersonalData.personalData, _.isEqual)

    useEffect(() => {
        const getEmpIdforProfilePic = async () => {
            if (no > 0) {
                const profilePic = JSON.stringify(`${PUBLIC_NAS_FOLDER + no}/profilePic.jpg`);

                urlExist(profilePic, (status) => {
                    if (status === true) {
                        const picUrl = JSON.parse(profilePic)
                        setSrc(picUrl)
                    }
                })
            }
        }
        getEmpIdforProfilePic()
    }, [no])

    const Name = state.em_name.toLowerCase();
    const Designation = state.desg_name.toLowerCase();
    const Department = state.dept_name.toLowerCase();
    const category = state.ecat_name.toLowerCase();

    return (
        <Box sx={{ display: 'flex', width: '100%' }} >
            <Card sx={{
                flex: 1,
                maxHeight: { xxl: 300, xl: 300, lg: 280, md: 250, sm: 250, xs: 250 },
                maxWidth: 350, borderRadius: 8, boxShadow: 5
            }} >
                <CardMedia sx={{
                    display: "flex",
                    flex: 1,
                    p: 1,
                    pb: 0,
                    justifyContent: 'center',
                }} >
                    <Box>
                        <CssVarsProvider>
                            <Avatar
                                // src="https://images.unsplash.com/photo-1502657877623-f66bf489d236?auto=format&fit=crop&w=800"
                                src={src}
                                sx={{
                                    flex: 1,
                                    "--Avatar-size": { xl: '100px', lg: '100px', md: '70px', sm: '90px', xs: '70px' },
                                }}
                            />
                        </CssVarsProvider>
                    </Box>
                </CardMedia>
                <CardContent sx={{ pb: { lg: 0.5 } }} >
                    <CssVarsProvider>
                        <Box sx={{
                            display: "flex", height: 100, justifyContent: 'center',
                            flexDirection: 'column', overflow: 'auto',
                            '::-webkit-scrollbar': { display: "none" },
                        }} >
                            <Box sx={{ display: "flex", flex: 1, justifyContent: 'center', }} >
                                <Typography level='h2' fontSize="md" textColor="#414349" sx={{ textTransform: "capitalize" }}  >
                                    {Name}
                                </Typography>
                            </Box>
                            <Box sx={{ display: "flex", flex: 1, justifyContent: 'center', }} >
                                <Typography textColor="neutral.400" sx={{ textTransform: "capitalize" }} fontSize="sm">
                                    ID# {state.em_no}
                                </Typography>
                            </Box>
                            <Box sx={{ display: "flex", flex: 1, justifyContent: 'center', }}>
                                <Typography textColor="neutral.400" sx={{ textTransform: "capitalize" }} fontSize="sm" >
                                    {Designation}
                                </Typography>
                            </Box>
                            <Box sx={{ display: "flex", flex: 1, justifyContent: 'center', }}>
                                <Typography textColor="neutral.400" sx={{ textTransform: "capitalize" }} fontSize="sm">
                                    {Department}
                                </Typography>
                            </Box>
                            <Box sx={{ display: "flex", flex: 1, justifyContent: 'center', }}>
                                <Typography textColor="neutral.400" sx={{ textTransform: "capitalize" }} fontSize="sm">
                                    {category}
                                </Typography>
                            </Box>
                        </Box>
                    </CssVarsProvider>
                </CardContent>
                {/* <CardActionArea> */}
                <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center' }}  >
                    <CssVarsProvider>
                        <IconButton variant="plain" color="neutral" size="sm" sx={{ display: 'flex' }}>
                            <PhotoCameraIcon color='primary' />
                        </IconButton>
                        <IconButton variant="plain" color="neutral" size="sm" sx={{ display: 'flex' }}>
                            <UploadIcon color='primary' />
                        </IconButton>
                    </CssVarsProvider>
                </Box>
                {/* </CardActionArea> */}
            </Card>

        </Box>
    )
}

export default ProfileCard