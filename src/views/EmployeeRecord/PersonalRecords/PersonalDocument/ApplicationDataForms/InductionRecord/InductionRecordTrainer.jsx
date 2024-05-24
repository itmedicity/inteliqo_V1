import { Box } from '@mui/joy'
import React, { useEffect, useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'

const InductionRecordTrainer = ({ traineer }) => {
    console.log(traineer);
    const [Trainers, setTrainers] = useState([])
    console.log(Trainers);
    useEffect(() => {
        const GetData = (async (traineer) => {
            const result = await axioslogin.post(`/PersonalChecklist/getTrainers`, traineer)
            const { success, data } = result.data;
            if (success === 1) {
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

export default InductionRecordTrainer