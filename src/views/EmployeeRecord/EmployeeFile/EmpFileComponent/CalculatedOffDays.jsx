import { Typography } from '@mui/material';
import React, { Fragment } from 'react'
import { TEXT_DARK, TEXT_MUTED } from 'src/views/Constant/Constant';

const CalculatedOffDays = () => {
    const list = [
        {
            name: "10/11/2021",
            date: "C OFF",
            credit: 1,
            taken: 1
        },
        {
            name: "10/11/2021",
            date: "W OFF",
            credit: 1,
            taken: 1
        },
        {
            name: "10/11/2021",
            date: "C OFF",
            credit: 1,
            taken: 0
        },
        {
            name: "10/11/2021",
            date: "W OFF",
            credit: 1,
            taken: 0
        },
        {
            name: "10/11/2021",
            date: "C OFF",
            credit: 1,
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
                                <div className="col-sm-3 py-0 text-start">
                                    <Typography variant="body2" gutterBottom className="my-0">
                                        {val.date}
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

export default CalculatedOffDays