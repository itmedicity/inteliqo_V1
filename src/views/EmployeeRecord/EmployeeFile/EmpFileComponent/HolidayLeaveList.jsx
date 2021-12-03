import { Typography } from '@mui/material';
import React, { Fragment, memo } from 'react'
import { TEXT_DARK, TEXT_MUTED } from 'src/views/Constant/Constant';

const HolidayLeaveList = () => {
    const list = [
        {
            name: "Republic Day",
            allowed: 1,
            credit: 1,
            taken: 1
        },
        {
            name: "Shivarathri",
            allowed: 1,
            credit: 1,
            taken: 1
        },
        {
            name: "Good Friday",
            allowed: 1,
            credit: 1,
            taken: 1
        },
        {
            name: "Vishu",
            allowed: 1,
            credit: 1,
            taken: 1
        },
        {
            name: "May Day",
            allowed: 1,
            credit: 1,
            taken: 0
        },
        {
            name: "Ramzan",
            allowed: 1,
            credit: 1,
            taken: 0
        },
        {
            name: "Bakrid",
            allowed: 1,
            credit: 1,
            taken: 0
        }
    ]
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
                                        {val.name}
                                    </Typography>
                                </div>
                                <div className="col-sm-2 py-0 text-center">{val.allowed}</div>
                                <div className="col-sm-2 py-0 text-center">{val.credit}</div>
                                <div className="col-sm-2 py-0 text-center">{val.taken}</div>
                            </div>
                        </li>;
                    })
                }
            </ul>
        </Fragment>
    )
}

export default memo(HolidayLeaveList)
