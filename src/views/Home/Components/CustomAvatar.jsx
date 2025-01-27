import { CircularProgress } from '@mui/material'

import React, { memo, useEffect, useState } from 'react'
import ProfilePicDefault from 'src/assets/images/default.png'
import image1 from '../../../assets/images/kmcpalalogo.jpg';
import { urlExist } from 'src/views/Constant/Constant'
import { PUBLIC_NAS_FOLDER } from 'src/views/Constant/Static'
import { Avatar } from '@mui/joy';

const CustomAvatar = ({ id }) => {

    const [src, setSrc] = useState(ProfilePicDefault)
    const [val, setVal] = useState(false)

    useEffect(() => {
        const getEmpIdforProfilePic = async (id) => {
            if (id > 0) {
                const profilePic = JSON.stringify(`${PUBLIC_NAS_FOLDER}/${id}/profilePic.jpeg`);
                urlExist(profilePic, (status) => {
                    if (status === true) {
                        const picUrl = JSON.parse(profilePic)
                        setSrc(picUrl)
                        setVal(true)
                    }
                })
            }
        }
        getEmpIdforProfilePic(id)

    }, [id])

    return (
        <>
            {
                val === false ? <Avatar sx={{
                    width: 40,  // Adjust the size of the avatar itself
                    height: 40, // Adjust the size of the avatar itself
                    '& img': {
                        objectFit: 'contain', // Ensures image doesn't stretch or overflow
                        width: '100%',  // You can adjust the size of the image within the Avatar
                        height: '100%', // You can adjust the size of the image within the Avatar
                    },
                }} src={`${PUBLIC_NAS_FOLDER}/Logo/logo.png`}><CircularProgress /></Avatar> : <Avatar src={src} />
            }
        </>
    )
}

export default memo(CustomAvatar) 