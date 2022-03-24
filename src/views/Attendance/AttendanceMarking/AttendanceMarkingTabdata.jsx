import { Avatar, IconButton, LinearProgress } from '@mui/material';
import moment from 'moment';
import React, { Fragment, memo, Suspense } from 'react'
import { useState, useEffect } from 'react';
import { axioslogin } from 'src/views/Axios/Axios';
import ChangeCircleOutlinedIcon from '@mui/icons-material/ChangeCircleOutlined';
import DepartmentShiftSelect from 'src/views/Attendance/DutyPlanning/DepartmentShiftSelect';
import { errorNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';

import { cyan, deepOrange, deepPurple, green, brown } from '@material-ui/core/colors';
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

                        return <TableCell key={val.punch_slno} align="right" style={{ padding: 0, width: '8rem', height: '3rem' }}>

                            <Avatharattndance color={(val.updation_flag === 0 && val.shift_id === 0) ? null : (val.punch_in !== null && val.punch_out !== null) && val.duty_status === 1 && ((val.late_in !== 0 || val.early_out !== 0)) ? "#797979" : (val.punch_in !== null && val.punch_out !== null) && val.duty_status === 1 ? "#4E9258" :
                                val.duty_status === 0.5 ? deepPurple[300] : val.lvreq_type != 0 ? cyan[300]
                                    : val.duty_status === 0 ? "#F3E3C3" : (val.punch_in === null && val.punch_out === null) ? "#F3E3C3" : ((val.punch_in === null && val.punch_out !== null) || (val.punch_in !== null && val.punch_out === null)) ? "#F3E3C3" : null}
                                data={val.updation_flag === 0 && val.shift_id === 0 ? 'NP' :
                                    (val.punch_in !== null && val.punch_out !== null) && val.duty_status === 1 && ((val.late_in !== 0 || val.early_out !== 0)) ? 'L/E' :
                                        (val.punch_in !== null && val.punch_out !== null) && val.duty_status === 1 ? 'P' :
                                            val.duty_status === 0.5 ? 'HLP' : val.lvreq_type != 0 ? val.lvreq_type
                                                : val.duty_status === 0 ? 'LOP' : (val.punch_in === null && val.punch_out === null) ? 'LOP' : ((val.late_in !== 0 || val.early_out !== 0)) ? brown[500] :
                                                    ((val.punch_in === null && val.punch_out !== null) || (val.punch_in !== null && val.punch_out === null)) ? 'LOP' : 'P'
                                }


                            />


                        </TableCell>

                    })


                }

            </Suspense>
        </Fragment >
    )
}

export default AttendanceMarkingTabdata