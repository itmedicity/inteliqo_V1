import { LinearProgress } from '@mui/material';
import React, { Fragment, memo, Suspense } from 'react'
import { useState, useEffect } from 'react';
import { axioslogin } from 'src/views/Axios/Axios';
import moment from 'moment'

import { TableCell } from '@material-ui/core';
import Avatharattndance from './Avatharattndance';
// import { deepOrange, deepPurple, green, brown, cyan } from '@mui/material/colors';

const AttendanceMarkingTabdata = ({ data, count, dateformat, rageset }) => {
    const [dutydata, setdutydata] = useState([])
    // const defalstate = {
    //     duty_day: "2022-05-02",
    //     duty_status: 0,
    //     duty_worked: 0,
    //     early_out: 0,
    //     em_no: 10325,
    //     emp_id: 2,
    //     hrs_worked: 0,
    //     late_in: 0,
    //     leave_type: 0,
    //     lvreq_type: 0,
    //     mis_punch_flag: 0,
    //     ot_request_flag: 0,
    //     over_time: 0,
    //     punch_in: null,
    //     punch_out: null,
    //     punch_slno: 0,
    //     shift_id: 0,
    //     shift_in: null,
    //     shift_out: null,
    //     sublvreq_type: 0,
    //     updation_flag: 0,
    // }


    useEffect(() => {

        const getattnsdata = async () => {
            const result = await axioslogin.post('/attandancemarking', data)
            const { success, message } = result.data

            if (success === 1) {
                const final_data = rageset.map((val) => {
                    return message.filter((val1) => {

                        return (moment(new Date(val1.duty_day)).format('DD-MM-yyyy') === moment(new Date(val)).format('DD-MM-yyyy'))
                    })

                })

                setdutydata(final_data)
            }
            else if (success === 0) {
                setdutydata([])
            }
            else {
                // warningNofity("Please Contact Edp")
            }

        }
        getattnsdata()



    }, [data, rageset])
    return (
        <Fragment>
            <Suspense fallback={<LinearProgress />} >
                {
                    dutydata && dutydata.map((val, index) => {

                        return <TableCell key={index} align="right" style={{ padding: 0, width: '8rem', height: '3rem' }}>
                            <Avatharattndance val={val} />

                        </TableCell>

                    })


                }

            </Suspense>
        </Fragment >
    )
}

export default memo(AttendanceMarkingTabdata)