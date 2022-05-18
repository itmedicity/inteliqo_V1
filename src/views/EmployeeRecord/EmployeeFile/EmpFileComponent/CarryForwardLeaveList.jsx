import { Typography } from '@mui/material';
import React, { Fragment, useEffect, useState } from 'react'
import { TEXT_DARK, TEXT_MUTED } from 'src/views/Constant/Constant';
import { axioslogin } from 'src/views/Axios/Axios';
import NotCreditedCmp from './MyProfileCmp/NotCreditedCmp';
const CarryForwardLeaveList = ({ empid }) => {
    const [list, setlist] = useState([{
        name: 0,
        credited: 0,
        taken: 0

    }])
    const [state, setState] = useState(false)

    useEffect(() => {
        const getholidaylleave = async () => {
            const result = await axioslogin.get(`/common/carry/getcarryleave/${empid}`)
            const { success, data } = result.data
            if (success === 0) {
                setlist([])
                setState(false)
            }
            else {
                setlist(data)
                setState(true)
            }
        }
        getholidaylleave();
    }, [empid])

    return (
        <Fragment>
            {
                state === false ? <NotCreditedCmp name="Carry Forward Leave Is Not Applicable / Not Credited From Previous Year / Contract !!" /> :
                    <ul className="list-group list-group-flush ">
                        {
                            list && list.map((val, index) => {
                                return <li className="list-group-item py-0" key={index}>
                                    <div className="d-md-flex d-sm-flex justify-content-around"
                                        style={val.Taken === 1 ? { color: TEXT_MUTED } : { color: TEXT_DARK }}
                                    >
                                        <div className="col-sm-4 py-0 text-start" >
                                            <Typography variant="body2" gutterBottom className="my-0">
                                                {val.name}
                                            </Typography>
                                        </div>
                                        <div className="col-sm-2 py-0 text-start">{val.Credited}</div>
                                        <div className="col-sm-2 py-0 text-start">{val.Credited}</div>
                                        <div className="col-sm-1 py-0 text-start">{0}</div>
                                    </div>
                                </li>;
                            })
                        }
                    </ul>
            }

        </Fragment>
    )
}

export default CarryForwardLeaveList
