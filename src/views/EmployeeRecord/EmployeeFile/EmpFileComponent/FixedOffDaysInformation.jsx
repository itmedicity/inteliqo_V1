import { Typography } from '@mui/material';
import React, { Fragment } from 'react'
import { TEXT_DARK, TEXT_MUTED } from 'src/views/Constant/Constant';

const FixedOffDaysInformation = () => {
    const list = [
        {
            name: "Maternity Leave",
            credit: 120,
            taken: 1
        },
        {
            name: "ESI Leave",
            credit: 90,
            taken: 1
        },
        {
            name: "Conference Leave",
            credit: 7,
            taken: 0
        },
        {
            name: "Lose Off Pay",
            credit: 12,
            taken: 0
        },
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
                                <div className="col-sm-2 py-0 text-start">{val.credit}</div>
                                <div className="col-sm-1 py-0 text-start">{val.taken}</div>
                            </div>
                        </li>;
                    })
                }
            </ul>
        </Fragment>
    )
}

export default FixedOffDaysInformation
