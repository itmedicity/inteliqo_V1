import { Typography } from '@mui/joy'
import React, { memo, useEffect, useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'

const DeptPreMark = ({ emId, scheduled_slno }) => {
    const [premark, Setpremark] = useState(0)

    useEffect(() => {
        const obj = {
            emId: emId,
            scheduled_slno: scheduled_slno
        }
        const GetPreMark = async () => {
            const result = await axioslogin.post('/TrainingVerification/GetDeptPreMark', obj)
            const { success, data } = result.data
            if (success === 2) {
                const { mark } = data[0]
                Setpremark(mark)
            } else {
                Setpremark(0)
            }
        }
        GetPreMark()
    }, [emId, Setpremark, scheduled_slno])
    return (
        <Typography>
            {premark}
        </Typography>
    )
}

export default memo(DeptPreMark) 
