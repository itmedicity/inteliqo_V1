import { IconButton, LinearProgress, TableCell, TableRow } from '@mui/material'
import React, { Fragment, Suspense, memo } from 'react'
import LeaveCarryCount from './LeaveCarryCount'
import AddTaskRoundedIcon from '@mui/icons-material/AddTaskRounded';

const LeaveCarryRow = ({ name, setedit, edit, setCarryForwardLeave, setemp_id, setemp_type, lcmast, setLcMast }) => {
    return (
        <Fragment>
            {name && name.map((val, index) => {
                return <TableRow key={val.em_id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell align="center" style={{ padding: 0, width: '10rem', height: '1rem' }} >{val.em_id}</TableCell>
                    <TableCell align="center" style={{ padding: 0, width: '10rem', height: '1rem' }} >{val.em_name}</TableCell>
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
                        <TableCell align="center" style={{ padding: 0, width: '10rem', height: '1rem' }}>
                            <IconButton
                                aria-label="add"
                                style={{ padding: '0rem' }}
                                onClick={(data) => {
                                    setCarryForwardLeave(data)

                                }}
                            >
                                <AddTaskRoundedIcon size={26} color='success' />
                            </IconButton>

                        </TableCell>
                    </Suspense>

                </TableRow>
            })}

        </Fragment>
    )
}

export default memo(LeaveCarryRow)