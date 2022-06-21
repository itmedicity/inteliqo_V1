import { Typography } from '@mui/material';
import React, { Fragment, memo, useEffect, useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios';
import { TEXT_DARK, TEXT_MUTED } from 'src/views/Constant/Constant';

const HolidayLeaveList = ({ hldnodata, no }) => {
    const [list, setlist] = useState([{
        hld_desc: "",
        hl_lv_allowed: 0,
        hl_lv_credit: 0,
        hl_lv_taken: 0

    }])
    useEffect(() => {
        const getholidaylleave = async () => {
            const result = await axioslogin.get(`/common/getleaveholiday/${no}`)
            const { success, data } = result.data
            if (success === 0) {
                hldnodata(1)
            }
            else {
                hldnodata(0)
                setlist(data)
            }
        }
        getholidaylleave();
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
                                <div className="col-sm-4 py-0 text-start" style={{ width: "70%", }} >
                                    <Typography variant="body2" gutterBottom className="my-0"
                                        sx={{
                                            textTransform: "capitalize"
                                        }}
                                    >
                                        {val.hld_desc.toLowerCase()}
                                    </Typography>
                                </div>
                                <div className="col-sm-2 py-0 text-center" style={{ width: "10%", fontWeight: "bold", fontSize: 11.5 }}>{val.hl_lv_allowed}</div>
                                <div className="col-sm-2 py-0 text-center" style={{ width: "10%", fontWeight: "bold", fontSize: 11.5 }}>{val.hl_lv_credit}</div>
                                <div className="col-sm-2 py-0 text-center" style={{ width: "10%", fontWeight: "bold", fontSize: 11.5 }}>{val.hl_lv_taken}</div>
                            </div>
                        </li>;
                    })
                }
            </ul>
        </Fragment>
    )
}

export default memo(HolidayLeaveList)
