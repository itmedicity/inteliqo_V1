import { Typography } from '@mui/material';
import React, { Fragment, useEffect, useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios';
import { TEXT_DARK, TEXT_MUTED } from 'src/views/Constant/Constant';
// import { axioslogin } from 'src/views/Axios/Axios';

const CasualLeaveList = ({ nodataset, no, castable }) => {

    const [listt, setlist] = useState([{
        name: "",
        allowed: 0,
        credit: 0,
        taken: 0,
    }])

    useEffect(() => {

        const insrtcasualleave = async () => {
            const result = await axioslogin.get(`/common/getcasual/${no}`)
            const { success, data } = result.data
            if (success === 0) {
                nodataset(1)
            }
            else if (success === 1) {
                setlist(data)
            }
        }
        insrtcasualleave();

    }, [castable, no, nodataset])

    return (
        <Fragment>
            <ul className="list-group list-group-flush ">
                {
                    listt.map((val, index) => {
                        return <li className="list-group-item py-0" key={index}>
                            <div className="d-md-flex d-sm-flex justify-content-around"
                                style={val.cl_lv_taken === 1 ? { color: TEXT_MUTED } : { color: TEXT_DARK }}
                            >
                                <div className="col-sm-4 py-0 text-start" style={{ width: "70%", }} >
                                    <Typography variant="body2" gutterBottom className="my-0"
                                        sx={{
                                            textTransform: "capitalize"
                                        }}
                                    >
                                        {val.cl_lv_mnth}
                                    </Typography>
                                </div>
                                <div className="col-sm-2 py-0 text-center" style={{ width: "10%", fontWeight: "bold", fontSize: 11.5 }}>{val.cl_lv_credit}</div>
                                <div className="col-sm-2 py-0 text-center" style={{ width: "10%", fontWeight: "bold", fontSize: 11.5 }}>{val.cl_lv_taken}</div>
                                <div className="col-sm-2 py-0 text-center" style={{ width: "10%", fontWeight: "bold", fontSize: 11.5 }}>{parseFloat(val.cl_lv_credit) - parseFloat(val.cl_lv_taken)}</div>
                            </div>
                        </li>;
                    })
                }
            </ul>
        </Fragment>
    )
}

export default CasualLeaveList
