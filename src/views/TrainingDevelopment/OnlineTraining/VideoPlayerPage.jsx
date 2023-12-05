import React, { memo, useEffect, useState } from 'react'
import ReactPlayer from 'react-player'
import { Box } from '@mui/material'

const VideoPlayerPage = ({ Userdata }) => {

    const [data, SetData] = useState({
        video_link: ''
    })

    const { video_link } = data
    useEffect(() => {
        if (Object.keys(Userdata).length !== 0) {
            const { video_link } = Userdata;
            const obj = {
                video_link: video_link,

            }
            SetData(obj)
        }
    }, [Userdata])

    return (
        <Box sx={{ width: "100%", height: 800 }}>
            <ReactPlayer
                url={video_link}
                width='100%'
                height='100%'
                controls={true}
                muted={false}

            />
        </Box>
    )
}

export default memo(VideoPlayerPage)
