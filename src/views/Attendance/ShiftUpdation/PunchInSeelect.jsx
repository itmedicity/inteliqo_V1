import { addDays } from 'date-fns'
import React, { Fragment, useEffect, useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import moment from 'moment'

const PunchInSeelect = ({ empno, dutyday, crossday, setPunchIndata }) => {
    const [punchIn, setPunchIn] = useState([])
    const nday = moment(addDays(new Date(dutyday), 1)).format('YYYY-MM-DD')
    const arr = [];
    //if cross day is 1 getting next day to select punch from punch data
    arr.push(nday, dutyday)
    useEffect(() => {
        const postData = {
            emp_code: empno,
            punch_time: crossday === 1 ? arr : dutyday
        }
        const getpunchin = async () => {
            const result = await axioslogin.post('/attendCal/punchdetlemp', postData)
            const { success, data } = result.data
            if (success === 1) {
                setPunchIn(data)
            }
        }
        getpunchin()
    }, [empno, dutyday, crossday])
    const handleChange = (e) => {
        const punch_time = e.target.value;
        setPunchIndata(punch_time)
    }
    return (
        <Fragment>
            <select className="custom-select"
                onChange={(e) => { handleChange(e) }}
            >
                <option defaultValue="0">Choose...</option>
                {
                    punchIn && punchIn.map((val, index) => {
                        return <option key={index} value={val.punch_time}>{val.punch_time}</option>
                    })
                }
            </select>
        </Fragment>
    )
}

export default PunchInSeelect