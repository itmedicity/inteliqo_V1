import { LinearProgress, Typography } from '@mui/material'
import React, { Fragment, memo, Suspense } from 'react'
import '../Att_Style.css'
import DropDownList from './DropDownList'
import ViewComfyIcon from '@mui/icons-material/ViewComfy';


const DutyPlanningMainCard = ({ dateformat, employeedata, startdate, enddate, duty, count }) => {
    return (
        <Fragment>
            <div className="card">
                <div className="card-body">
                    <div className="row">
                        <div className='table-responsive table-responsive-md' >
                            <table className="table table-sm table-bordered planTable " >
                                <thead>
                                    <tr>
                                        <th width="100" className='pt-2'  >
                                            <Typography variant="subtitle2" >
                                                Name
                                            </Typography>
                                        </th>
                                        <th width="100" >
                                            <Typography variant="subtitle2" >
                                                Emp ID
                                            </Typography>
                                        </th>
                                        {
                                            dateformat.map((val) => {
                                                return <th className='text-center'
                                                    key={val.date}
                                                    style={val.sunday === '0' ? { color: "#cb5966", backgroundColor: "#a6b2b5" } : null}
                                                >
                                                    <Typography variant="subtitle2">
                                                        {val.date}
                                                    </Typography>
                                                </th>
                                            })
                                        }
                                        <th>
                                            {/* <CircularProgress color="secondary" size={18} /> */}
                                            <ViewComfyIcon size={18} style={{ color: "blue" }} />
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <Suspense fallback={<LinearProgress />} >
                                        {
                                            employeedata.map((name) => {
                                                const data = {
                                                    emp_id: name.em_id,
                                                    start: startdate,
                                                    end: enddate,
                                                }
                                                return <tr key={name.em_no} >
                                                    <td width="100" className='pt-2' >
                                                        <Typography variant="subtitle2">
                                                            {name.em_name}
                                                        </Typography>
                                                    </td>
                                                    <td width="100">{name.em_id}</td>
                                                    <Suspense fallback={<LinearProgress />} >
                                                        <DropDownList data={data} duty={duty} count={count} />
                                                    </Suspense>
                                                </tr>
                                            })
                                        }
                                    </Suspense>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default memo(DutyPlanningMainCard)
