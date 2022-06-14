import React, { Fragment, useEffect, useState } from 'react'
import { hr_report_one } from './ReportsMenu'
import { getMenuSlno } from '../views/Constant/Constant'
import { Link } from 'react-router-dom'

const Reports = () => {
    const [report_one, setreport_one] = useState();
    const [count, setCount] = useState(0)
    useEffect(() => {
        getMenuSlno().then((val) => {
            const menuSlnoArray = val[0].map((value) => {
                return value.menu_slno;
            })
            const settings_report_one = hr_report_one.filter(val => menuSlnoArray.includes(val.slno));
            setreport_one(settings_report_one)
            setCount(1)
        })
    }, [count])
    return (
        <Fragment>
            <div className="card"  >
                <div className="card-header bg-dark pb-0 border border-secondary text-white" >
                    <h5 >Employee Record Reports</h5>
                </div>
                <div className="card-body">
                    <div className="row" >
                        <div className="col-4">
                            <ul className="list-group list-group-flush">
                                {
                                    report_one && report_one.map((val) => {
                                        return <Link to={val.to} className="list-group-item pt-1 pb-1" key={val.slno}  >{val.name}</Link>;
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

        </Fragment>
    )
}

export default Reports