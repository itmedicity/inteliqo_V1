import { Typography } from '@mui/material';
import moment from 'moment';
import React, { Fragment, useEffect, useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios';
import { TEXT_DARK, TEXT_MUTED } from 'src/views/Constant/Constant';
import NotCreditedCmp from './MyProfileCmp/NotCreditedCmp';

const CalculatedOffDays = ({ empid }) => {
    const [list, setlist] = useState([{
        calculated_date: 0,
        credited: 0,
        taken: 0

    }])
    const [state, setState] = useState(false)
    useEffect(() => {
        const getholidaylleave = async () => {
            const result = await axioslogin.get(`/common/getcoff/${empid}`)
            const { success, data } = result.data
            if (success === 0) {
                setlist([])
            }
            else {
                setlist(data)
            }
        }
        getholidaylleave();
    }, [empid])
    return (
        <Fragment>
            {
                state === false ? <NotCreditedCmp name="Off Days Request Not Approved / Not Requested" /> :

                    <ul className="list-group list-group-flush ">
                        {
                            list.map((val, index) => {
                                return <li className="list-group-item py-0" key={index}>
                                    <div className="d-md-flex d-sm-flex justify-content-around"
                                        style={val.taken === 1 ? { color: TEXT_MUTED } : { color: TEXT_DARK }}
                                    >
                                        <div className="col-sm-4 py-0 text-start" >
                                            <Typography variant="body2" gutterBottom className="my-0">
                                                COFF
                                            </Typography>
                                        </div>
                                        <div className="col-sm-3 py-0 text-start">
                                            <Typography variant="body2" gutterBottom className="my-0">
                                                {moment(val.calculated_date).format('DD/MM/YYYY')}
                                            </Typography>
                                        </div>
                                        <div className="col-sm-2 py-0 text-start">{val.credited}</div>
                                        <div className="col-sm-1 py-0 text-start">{val.taken}</div>
                                    </div>
                                </li>;
                            })
                        }
                    </ul>
            }
        </Fragment>
    )
}

export default CalculatedOffDays
