import { Typography } from '@material-ui/core';
import React, { Fragment, Suspense, useEffect } from 'react'
import { useHistory } from 'react-router';
import FullPageloader from 'src/components/FullPageloader';
import { useStyles } from 'src/views/CommonCode/MaterialStyle';
import PageLayoutSave from 'src/views/CommonCode/PageLayoutSave'
import './EmpStyle.css'

const SalaryInformation = () => {
    const history = useHistory()
    const classes = useStyles();
    const RedirectToProfilePage = () => {
        history.push(`/Home/Profile/${4516}/${4516}`)
    }

    const fixedWages = [
        {
            name: "Basic+Dearness Allowance",
            amount: "20000.00"
        },
        {
            name: "House Rent Allowance",
            amount: "1500.00"
        },
        {
            name: "Travel Allowance",
            amount: "1000.00"
        },
        {
            name: "Refreshment",
            amount: "2000.00"
        },
        {
            name: "Over Time",
            amount: "500.00"
        },
        {
            name: "Others",
            amount: "1000.00"
        },
    ]

    const ament = [
        {
            name: "Basic+Dearness Allowance",
            amount: "20000.00",
            date: "01-12-2021 08:35 AM"
        },
        {
            name: "House Rent Allowance",
            amount: "1500.00",
            date: "01-12-2021 08:35 AM"
        },
        {
            name: "Travel Allowance",
            amount: "1000.00",
            date: "01-12-2021 08:35 AM"
        },
        {
            name: "Refreshment",
            amount: "2000.00",
            date: "01-12-2021 08:35 AM"
        },
        {
            name: "Over Time",
            amount: "500.00",
            date: "01-12-2021 08:35 AM"
        },
        {
            name: "Others",
            amount: "1000.00",
            date: "01-12-2021 08:35 AM"
        },
        {
            name: "Others",
            amount: "1000.00",
            date: "01-12-2021 08:35 AM"
        },
        {
            name: "Others",
            amount: "1000.00",
            date: "01-12-2021 08:35 AM"
        },
        {
            name: "Others",
            amount: "1000.00",
            date: "01-12-2021 08:35 AM"
        },
        {
            name: "Others",
            amount: "1000.00",
            date: "01-12-2021 08:35 AM"
        },
        {
            name: "Others",
            amount: "1000.00",
            date: "01-12-2021 08:35 AM"
        },
        {
            name: "Others",
            amount: "1000.00",
            date: "01-12-2021 08:35 AM"
        },
        {
            name: "Others",
            amount: "1000.00",
            date: "01-12-2021 08:35 AM"
        },
        {
            name: "Others",
            amount: "1000.00",
            date: "01-12-2021 08:35 AM"
        },
        {
            name: "Others",
            amount: "1000.00",
            date: "01-12-2021 08:35 AM"
        },
        {
            name: "Others",
            amount: "1000.00",
            date: "01-12-2021 08:35 AM"
        },
        {
            name: "Others",
            amount: "1000.00",
            date: "01-12-2021 08:35 AM"
        },
        {
            name: "Others",
            amount: "1000.00",
            date: "01-12-2021 08:35 AM"
        },
        {
            name: "Others",
            amount: "1000.00",
            date: "01-12-2021 08:35 AM"
        },
        {
            name: "Others",
            amount: "1000.00",
            date: "01-12-2021 08:35 AM"
        },
        {
            name: "Others",
            amount: "1000.00",
            date: "01-12-2021 08:35 AM"
        },
        {
            name: "Others",
            amount: "1000.00",
            date: "01-12-2021 08:35 AM"
        },
        {
            name: "Others",
            amount: "1000.00",
            date: "01-12-2021 08:35 AM"
        },
        {
            name: "Others",
            amount: "1000.00",
            date: "01-12-2021 08:35 AM"
        },
        {
            name: "Others",
            amount: "1000.00",
            date: "01-12-2021 08:35 AM"
        },
        {
            name: "Others",
            amount: "1000.00",
            date: "01-12-2021 08:35 AM"
        },
        {
            name: "Others",
            amount: "1000.00",
            date: "01-12-2021 08:35 AM"
        },
        {
            name: "Others",
            amount: "1000.00",
            date: "01-12-2021 08:35 AM"
        },
        {
            name: "Others",
            amount: "1000.00",
            date: "01-12-2021 08:35 AM"
        },

    ]

    return (
        <Fragment>
            <PageLayoutSave
                heading="Employee Wages Information"
                redirect={RedirectToProfilePage}
            >
                <div className="row g-1">
                    <div className="col-md-6">
                        <div className="card" >
                            <div className="card-header py-0">
                                <Typography variant="body1" gutterBottom className="my-0" >
                                    Fixed Wages
                                </Typography>
                            </div>
                            <ul className="list-group list-group-flush">
                                <Suspense fallback={<FullPageloader />} >
                                    {
                                        fixedWages.map((val) => {
                                            return <li className="list-group-item py-0" key={val.name}>
                                                <div className="d-flex justify-content-between"  >
                                                    <div>{val.name}</div>
                                                    <div>{val.amount}</div>
                                                </div>
                                            </li>;
                                        })
                                    }
                                </Suspense>
                            </ul>
                        </div>
                        <div className="card" >
                            <div className="card-header py-0">
                                <Typography variant="body1" gutterBottom className="my-0" >
                                    Earnings
                                </Typography>
                            </div>
                            <ul className="list-group list-group-flush">
                                {
                                    fixedWages.map((val) => {
                                        return <li className="list-group-item py-0" key={val.name}>
                                            <div className="d-flex justify-content-between"  >
                                                <div>{val.name}</div>
                                                <div>{val.amount}</div>
                                            </div>
                                        </li>;
                                    })
                                }
                            </ul>
                        </div>
                        <div className="card" >
                            <div className="card-header py-0">
                                <Typography variant="body1" gutterBottom className="my-0" >
                                    Deduction
                                </Typography>
                            </div>
                            <ul className="list-group list-group-flush">
                                {
                                    fixedWages.map((val) => {
                                        return <li className="list-group-item py-0" key={val.name}>
                                            <div className="d-flex justify-content-between"  >
                                                <div>{val.name}</div>
                                                <div>{val.amount}</div>
                                            </div>
                                        </li>;
                                    })
                                }
                            </ul>
                        </div>
                        <div className="card" >
                            <div className="card-header py-0">
                                <div className="d-flex justify-content-between"  >
                                    <div>
                                        <Typography variant="body1" gutterBottom className="my-0" >
                                            Gross Salary
                                        </Typography>
                                    </div>
                                    <div>250000.00</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div>
                            <div className="card" >
                                <div className="card-header py-0">
                                    <Typography variant="body1" gutterBottom className="my-0" >
                                        Previous Amendment Information
                                    </Typography>
                                </div>
                                <div className="card" >
                                    <div className="card-header py-0">
                                        <div className="d-md-flex d-sm-flex justify-content-between"  >
                                            <div className="col-md-6 text-start">
                                                <Typography variant="body1" gutterBottom className="my-0" >
                                                    Description
                                                </Typography>
                                            </div>
                                            <div className="col-md-4 text-start" >Amendment Date</div>
                                            <div className="col-md-2 text-end" >Changes</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="previousAmentWindow">
                                    <ul className="list-group list-group-flush ">
                                        {
                                            ament.map((val, index) => {
                                                return <li className="list-group-item py-0" key={index}>
                                                    <div className="d-md-flex d-sm-flex justify-content-between " >
                                                        <div className="col-md-6 text-start" >{val.name}</div>
                                                        <div className="col-md-4 text-start">{val.date}</div>
                                                        <div className="col-md-2 text-end">{val.amount}</div>
                                                    </div>
                                                </li>;
                                            })
                                        }
                                    </ul>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </PageLayoutSave>
        </Fragment>
    )
}

export default SalaryInformation
