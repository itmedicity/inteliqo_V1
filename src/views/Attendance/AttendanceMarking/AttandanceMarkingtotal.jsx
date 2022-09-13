import { LinearProgress, TableCell } from '@mui/material';

import React, { Fragment, memo, Suspense, useEffect, useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios';


const AttandanceMarkingtotal = ({ data, length, count }) => {

    const [dutydatatotal, setdutydatatotal] = useState([])
    // console.log(dutydatatotal)

    useEffect(() => {
        const getattnsdata = async () => {
            const result = await axioslogin.post('/attandancemarking/getattendancetotal', data)
            // console.log(result)
            const { success, message } = result.data
            if (success === 1) {
                setdutydatatotal(message)
            }
            else if (success === 0) {
                setdutydatatotal([])
            }
            else {
                // warningNofity("Please Contact Edp")
            }

        }
        getattnsdata()

    }, [data, count])


    return (
        <Fragment>
            <Suspense fallback={<LinearProgress />} >
                {
                    dutydatatotal && dutydatatotal.map((val, index) => {
                        return <TableCell align="center" key={index} style={{ padding: 0, width: '8rem', height: '3rem' }}>{length}</TableCell>
                    })
                }{
                    dutydatatotal && dutydatatotal.map((val, index) => {
                        return <TableCell align="center" key={index} style={{ padding: 0, width: '8rem', height: '3rem' }}>{val.duty_status}</TableCell>
                    })
                }
                {
                    dutydatatotal && dutydatatotal.map((val, index) => {
                        return <TableCell align="center" key={index} style={{ padding: 0, width: '8rem', height: '3rem' }}>{val.leave_type}</TableCell>
                    })
                }
                {
                    dutydatatotal && dutydatatotal.map((val, index) => {
                        return <TableCell align="center" key={index} style={{ padding: 0, width: '8rem', height: '3rem' }}>{val.offday}</TableCell>
                    })
                }
                {
                    dutydatatotal && dutydatatotal.map((val, index) => {
                        return <TableCell align="center" key={index} style={{ padding: 0, width: '8rem', height: '3rem' }}>{parseFloat(length) - (parseFloat(val.duty_status) + parseFloat(val.leave_type)) - parseFloat(val.offday)}</TableCell>
                    })
                }
                {
                    dutydatatotal && dutydatatotal.map((val, index) => {
                        return <TableCell align="center" key={index} style={{ padding: 0, width: '8rem', height: '3rem' }}>{(parseFloat(val.duty_status) + parseFloat(val.leave_type))}</TableCell>
                    })
                }

            </Suspense>
        </Fragment >
    )
}

export default memo(AttandanceMarkingtotal)