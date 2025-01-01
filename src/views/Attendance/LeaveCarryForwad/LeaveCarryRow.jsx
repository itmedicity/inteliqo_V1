
import React, { Fragment, Suspense, memo } from 'react'
import LeaveCarryCount from './LeaveCarryCount'
import AddTaskRoundedIcon from '@mui/icons-material/AddTaskRounded';
import { IconButton } from '@mui/joy';

const LeaveCarryRow = ({ name, setedit, edit, setCarryForwardLeave, setemp_id, emp_tpe, setemp_type, lcmast, setLcMast }) => {
    return (
        <Fragment>
            {
                name && name?.map((val, idx) =>
                    <tr key={idx} style={{ p: 0, m: 0 }} >
                        <td style={{ textAlign: 'center', }}>
                            {val.em_no}
                        </td>
                        <td
                            style={{
                                textAlign: 'center',
                            }}
                        >
                            {val.em_name}
                        </td>
                        <td
                            style={{
                                textAlign: 'center',
                            }}
                        >
                            <LeaveCarryCount
                                emid={val.em_id}
                                setedit={setedit}
                                edit={edit}
                                setemp_id={setemp_id}
                                setLcMast={setLcMast}
                                setemp_type={val.emp_type}
                                lcmast={lcmast}
                            />
                        </td>
                        <td
                            style={{
                                textAlign: 'center',
                            }}
                        >
                            <IconButton
                                aria-label="add"
                                style={{ padding: '0rem' }}
                                onClick={(data) => {
                                    setCarryForwardLeave(data)

                                }}
                            >
                                <AddTaskRoundedIcon size={26} color='success' />
                            </IconButton>

                        </td>

                    </tr>
                )
            }
            {/* {name && name.map((val, index) => {
                return <tr key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <td align="center" style={{ padding: 0, width: '10rem', height: '1rem' }} >{val.em_id}</td>
                    <td align="center" style={{ padding: 0, width: '10rem', height: '1rem' }} >{val.em_name}</td>
                    <Suspense fallback={<LinearProgress />} >
                        <LeaveCarryCount
                            emid={val.em_id}
                            setedit={setedit}
                            edit={edit}
                            setemp_id={setemp_id}
                            setLcMast={setLcMast}
                            setemp_type={val.emp_type}
                            lcmast={lcmast}
                        />
                        <td align="center" style={{ padding: 0, width: '10rem', height: '1rem' }}>
                            <IconButton
                                aria-label="add"
                                style={{ padding: '0rem' }}
                                onClick={(data) => {
                                    setCarryForwardLeave(data)

                                }}
                            >
                                <AddTaskRoundedIcon size={26} color='success' />
                            </IconButton>

                        </td>
                    </Suspense>

                </tr>
            })} */}

        </Fragment>
    )
}

export default memo(LeaveCarryRow)