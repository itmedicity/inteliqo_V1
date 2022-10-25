import { LinearProgress, Typography } from '@mui/material'
import React, { Fragment, memo, Suspense, useEffect } from 'react'
import '../Att_Style.css'
import DropDownList from './DropDownList'
import ViewComfyIcon from '@mui/icons-material/ViewComfy';



const DutyPlanningMainCard = ({
    dateformat, // Date Format --> {date: 'Oct-1-Sa', sunday: '6'}
    employeedata, // Selected Employee Data
    startdate, // Selected Start Date
    enddate, // Selected End Date
    duty, // after inserting the default shift "duty" state canged to 1
    count,  //Click function state each click count + 1
    update,
    empID,
    duty1, // after inserting the default shift "duty" state canged to 1
    setmodelstatus,
    setemid,
    setOpen,
    state,
    setstate }) => {

    useEffect(() => { }, [count, employeedata, update, state])
    //function for opening model
    const openmodel = async (id) => {
        setemid(id)
        setOpen(true)
        setmodelstatus(1)
    }

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
                                            /**
                                             * After updating the onclick modal this map will render and display the table
                                             */
                                            update === 1 && state !== 0 ? employeedata.map((name) => {
                                                const data = {
                                                    emp_id: name.em_id,
                                                    start: startdate,
                                                    end: enddate,
                                                }
                                                return <tr key={name.em_no} >
                                                    <td width="100" className='pt-2'
                                                        onClick={(e) => {
                                                            openmodel(name.em_id)
                                                        }}
                                                    >
                                                        <Typography variant="subtitle2">
                                                            {name.em_name}
                                                        </Typography>
                                                    </td>
                                                    <td width="100">{name.em_no}</td>
                                                    <Suspense fallback={<LinearProgress />} >
                                                        <DropDownList
                                                            data={data}
                                                            duty={duty}
                                                            count={count}
                                                            empID={empID}
                                                            duty1={duty1}
                                                            update={update}
                                                            state={state}
                                                            setstate={setstate}

                                                        />
                                                    </Suspense>
                                                </tr>

                                            }) : null}
                                        {

                                            /**
                                             * Initial rendering the duty plan table
                                             */

                                            update === 0 || state === 0 ?
                                                employeedata.map((name) => {
                                                    const data = {
                                                        emp_id: name.em_id,
                                                        start: startdate,
                                                        end: enddate,
                                                    }
                                                    return <tr key={name.em_no} >
                                                        <td width="100" className='pt-2'
                                                            onClick={(e) => {
                                                                openmodel(name.em_id)
                                                            }}
                                                        >
                                                            <Typography variant="subtitle2">
                                                                {name.em_name}
                                                            </Typography>
                                                        </td>
                                                        <td width="100">{name.em_no}</td>
                                                        <Suspense fallback={<LinearProgress />} >
                                                            <DropDownList
                                                                data={data}
                                                                duty={duty}
                                                                count={count}
                                                                empID={empID}
                                                                duty1={duty1}
                                                                update={update}
                                                                state={state}
                                                                setstate={setstate}
                                                            />
                                                        </Suspense>
                                                    </tr>

                                                }) : null
                                        }
                                    </Suspense>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment >
    )
}

export default memo(DutyPlanningMainCard)

