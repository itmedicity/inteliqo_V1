import { Box, Paper } from '@mui/material'
import React, { memo, useEffect, useState } from 'react'
import { AspectRatio, CssVarsProvider, Typography } from '@mui/joy';
import IconButton from '@mui/joy/IconButton';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import UploadIcon from '@mui/icons-material/Upload';
import { useParams } from 'react-router-dom';
import ProfilePicDefault from '../../../../assets/images/default.png'
import { useDispatch, useSelector } from 'react-redux';
import { setPersonalData } from 'src/redux/actions/Profile.action';
import _ from 'underscore';
import { getEmpProfileImage } from 'src/redux/reduxFun/useQueryFunctions';
import { useQuery } from 'react-query';

const ProfileCard = () => {
    const { no } = useParams()
    const dispatch = useDispatch()

     useEffect(() => {
        dispatch(setPersonalData(no))
    }, [no, dispatch])

    const state = useSelector((state) => state?.getPrifileDateEachEmp?.empPersonalData?.personalData, _.isEqual)

  const { data: image } = useQuery({
      queryKey: ['profileImage', no],
      queryFn: () => getEmpProfileImage(no),
      enabled: !!getEmpProfileImage,
      staleTime: Infinity,
    })

    const Name = state?.em_name?.toLowerCase();
    const Designation = state?.desg_name?.toLowerCase();
    const Department = state?.dept_name?.toLowerCase();
    const category = state?.ecat_name?.toLowerCase();

    return (
        <>
            <Box sx={{ justifyContent: 'center', display: 'flex', width: '100%', flexDirection: 'column' }} >
                <Box sx={{ width: 200, borderRadius: 'sm', ml: 3, bgcolor: 'yellow' }}>
                    <AspectRatio objectFit="contain">
                        <img
                            src={image===undefined?ProfilePicDefault:image}
                            srcSet={image===undefined?ProfilePicDefault:image}
                            alt="Profile Pic"
                        />
                    </AspectRatio>
                </Box>
                {/* <CssVarsProvider> */}
                <Paper elevation={0} sx={{
                    display: "flex", justifyContent: 'center',
                    flexDirection: 'column', overflow: 'auto',
                    '::-webkit-scrollbar': { display: "none" },
                    backgroundColor: '#EEEFF0'
                }} >
                    <Box sx={{ display: "flex", flex: 1, justifyContent: 'center', }} >
                        <Typography level='h2' fontSize="md" textColor="#414349" sx={{ textTransform: "capitalize" }}  >
                            {Name}
                        </Typography>
                    </Box>
                    <Box sx={{ display: "flex", flex: 1, justifyContent: 'center', }} >
                        <Typography level='h2' fontSize="md" textColor="#414349" sx={{ textTransform: "capitalize" }}  >
                            {state.em_no}
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
                </Paper>
                {/* </CssVarsProvider> */}

            </Box>
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
        </>
    )
}

export default memo(ProfileCard) 