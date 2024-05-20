import React, { memo, useEffect, useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import { Box } from '@mui/joy'

const TraineerDetail = ({ traineer }) => {
    const [Trainers, setTrainers] = useState([])
    useEffect(() => {
        const GetData = (async (traineer) => {
            const result = await axioslogin.post(`/TrainingDetails/getTrainers`, traineer)
            const { success, data } = result.data;
            if (success === 2) {
                setTrainers(data[0])
            }
            else {
                setTrainers([])
            }
        })
        GetData(traineer)
    }, [traineer, setTrainers])

    return (
        <Box>
            {Trainers.emname}
        </Box>
    )
}
export default memo(TraineerDetail) 
