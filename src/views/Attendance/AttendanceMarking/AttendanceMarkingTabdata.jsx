import { LinearProgress } from '@mui/material';
import React, { Fragment, memo, Suspense } from 'react'
import { useState, useEffect } from 'react';
import { axioslogin } from 'src/views/Axios/Axios';


import { TableCell } from '@material-ui/core';
import Avatharattndance from './Avatharattndance';
// import { deepOrange, deepPurple, green, brown, cyan } from '@mui/material/colors';

const AttendanceMarkingTabdata = ({ data, count }) => {
    const [dutydata, setdutydata] = useState([])
    useEffect(() => {

        const getattnsdata = async () => {
            const result = await axioslogin.post('/attandancemarking', data)
            const { success, message } = result.data
            if (success === 1) {
                setdutydata(message)
            }
            else if (success === 0) {
                setdutydata([])
            }
            else {
                // warningNofity("Please Contact Edp")
            }

        }
        getattnsdata()

    }, [data])
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