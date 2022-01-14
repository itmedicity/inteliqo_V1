import React, { useState } from 'react'
import { Typography } from '@mui/material';
import { Fragment, useEffect } from 'react'
import { axioslogin } from 'src/views/Axios/Axios';
import { TEXT_DARK, TEXT_MUTED } from 'src/views/Constant/Constant';

const EarnLeaveList = ({ hldnodata, no }) => {
    const [list, setlist] = useState([{
        ernlv_mnth: "",
        ernlv_allowed: 0,
        ernlv_credit: 0,
        ernlv_taken: 0,

    }])



    useEffect(() => {
        const insrtcasualleave = async () => {
            const result = await axioslogin.get(`/common/getearnleave/${no}`)
            const { success, data } = result.data

            if (success === 0) {

                hldnodata(1)
            }
            else if (success === 1) {

                setlist(data)
            }


        }
        insrtcasualleave();

    }, [hldnodata, no])


    return (
        <Fragment>
            <ul className="list-group list-group-flush ">
                {
                    list.map((val, index) => {
                        return <li className="list-group-item py-0" key={index}>
                            <div className="d-md-flex d-sm-flex justify-content-around"
                                style={val.taken === 1 ? { color: TEXT_MUTED } : { color: TEXT_DARK }}
                            >
                                <div className="col-sm-4 py-0 text-start" >
                                    <Typography variant="body2" gutterBottom className="my-0">
                                        {val.ernlv_mnth}
                                    </Typography>
                                </div>
                                <div className="col-sm-2 py-0 text-center">{val.ernlv_allowed}</div>
                                <div className="col-sm-2 py-0 text-center">{val.ernlv_credit}</div>
                                <div className="col-sm-2 py-0 text-center">{val.ernlv_taken}</div>
                            </div>
                        </li>;
                    })
                }
            </ul>
        </Fragment>
    )
}

export default EarnLeaveList
