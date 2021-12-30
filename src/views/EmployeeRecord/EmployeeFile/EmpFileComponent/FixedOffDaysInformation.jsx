import { Typography } from '@mui/material';
import React, { Fragment, useEffect, useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios';
import { TEXT_DARK, TEXT_MUTED } from 'src/views/Constant/Constant';

const FixedOffDaysInformation = ({ hldnodata, no }) => {
    const [list, setlist] = useState([{
        lvetype_desc: "",
        cmn_lv_allowed: 0,
        cmn_lv_taken: 0,
        cmn_lv_balance: 0

    }])
    useEffect(() => {
        const getholidaylleave = async () => {
            const result = await axioslogin.get(`/common/getleavecommon/${no}`)
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
    }, [no, hldnodata])
    return (
        <Fragment>
            <ul className="list-group list-group-flush ">
                {
                    list.map((val, index) => {
                        return <li className="list-group-item py-0" key={index}>
                            <div className="d-md-flex d-sm-flex justify-content-around"
                                style={val.taken === 1 ? { color: TEXT_MUTED } : { color: TEXT_DARK }}
                            >
                                <div className="col-sm-3 py-0 text-start" >
                                    <Typography variant="body2" gutterBottom className="my-0">
                                        {val.lvetype_desc}
                                    </Typography>
                                </div>
                                <div className="col-sm-2 py-0 text-start">{val.cmn_lv_allowed}</div>
                                <div className="col-sm-1 py-0 text-start">{val.cmn_lv_taken}</div>
                                <div className="col-sm-2 py-0 text-start">{val.cmn_lv_balance}</div>
                            </div>
                        </li>;
                    })
                }
            </ul>
        </Fragment>
    )
}

export default FixedOffDaysInformation
