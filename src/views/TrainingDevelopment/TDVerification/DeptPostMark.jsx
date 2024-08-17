import { Typography } from '@mui/joy'
import React, { memo, useEffect, useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'

const DeptPostMark = ({ emId, scheduled_slno }) => {
    const [postmark, SetPostmark] = useState(0)

    useEffect(() => {
        const obj = {
            emId: emId,
            scheduled_slno: scheduled_slno
        }
        const GetPreMark = async () => {
            const result = await axioslogin.post('/TrainingVerification/GetDeptPostMark', obj)
            const { success, data } = result.data
            if (success === 2) {
                const { mark } = data[0]
                SetPostmark(mark)
            } else {
                SetPostmark(0)
            }
        }
        GetPreMark()

    }, [emId, SetPostmark, scheduled_slno])
    return (
        <Typography>
            {postmark}
        </Typography>
    )
}

export default memo(DeptPostMark) 
