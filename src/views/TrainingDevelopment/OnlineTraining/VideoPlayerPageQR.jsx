import React, { memo, useCallback, useEffect, useState } from 'react'
import { Box, Button, Paper } from '@mui/material'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useHistory } from 'react-router'

const VideoPlayerPageQR = ({ id, Userdata }) => {

    const history = useHistory()

    const [data, SetData] = useState({
        video_link: '',
        em_id: 0,
        topic_slno: 0,
        question_count: 0,
        checkVdo: '',
        current_tym: ''
    })

    const { video_link, em_id, topic_slno, question_count, checkVdo, current_tym } = data
    useEffect(() => {
        if (Object.keys(Userdata).length !== 0) {
            const { video_link, em_id, topic_slno, question_count, checkVdo, current_tym } = Userdata;
            const obj = {
                video_link: video_link,
                em_id: em_id,
                topic_slno: topic_slno,
                question_count: question_count,
                checkVdo: checkVdo,
                current_tym: current_tym
            }
            SetData(obj)
        }
    }, [Userdata])

    const StartPostTest = useCallback(() => {
        if (em_id !== 0 && topic_slno !== 0 && question_count !== 0) {
            history.push(`/OnlinePostTest/${id}/${em_id}/${topic_slno}/${question_count}`)
        }
    }, [em_id, history, topic_slno, id, question_count])

    return (
        <Box sx={{ width: "100%", height: 650 }}>
            <Box sx={{ display: "flex", justifyContent: "center", p: 1, mt: 30, width: "100%", }}>
                <a href={video_link}>
                    <button style={{ backgroundColor: "blue", color: "white", }}>Play Video</button>
                </a>
            </Box>
            <Paper elevation={0} sx={{ display: "flex", justifyContent: "center", mt: 1.5, }}>
                {
                    checkVdo < current_tym ?
                        <Button
                            variant="contained"
                            onClick={StartPostTest}
                        >
                            Start Post-Test <ArrowForwardIosIcon />
                        </Button>
                        :
                        <Button
                            disabled
                            variant="contained"
                        >
                            Attend To PostTest <ArrowForwardIosIcon />
                        </Button>
                }
            </Paper>
        </Box>


    )
}

export default memo(VideoPlayerPageQR)
