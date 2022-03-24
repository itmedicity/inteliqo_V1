import { LinearProgress, Typography } from '@mui/material'
import { Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from '@material-ui/core';
import React, { Fragment, Suspense, useEffect, useState } from 'react'
import Paper from '@mui/material/Paper';
import '../styleattnd.css'
import ViewComfyIcon from '@mui/icons-material/ViewComfy';
import { axioslogin } from 'src/views/Axios/Axios';
import AttendanceMarkingTabdata from './AttendanceMarkingTabdata';
import AttandanceMarkingtotal from './AttandanceMarkingtotal';
const AttendanceMarkingMainCard = ({ dateformat, employeedata, startdate, enddate, duty, count }) => {
    const [date, setdate] = useState(dateformat)
    useEffect(() => {

    }, [count])
    return (

        < Fragment >
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="a dense table" className='attends'>
                    <TableHead>
                        <TableRow style={{ backgroundColor: "#a2a3ac", height: '1rem' }}>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">Emp ID</TableCell>

                            {
                                dateformat.map((val) => {
                                    return <TableCell align="center" key={val.date} className="p-2" style={{ width: '8rem' }}>
                                        {val.date}
                                    </TableCell>
                                })
                            }
                            {/* <TableCell align="center" className="p-0" style={{ width: '8rem', }}>
                                <ViewComfyIcon size={18} style={{ color: "blue" }} />
                            </TableCell> */}
                            <TableCell>Work Days </TableCell>
                            <TableCell>Present</TableCell>
                            <TableCell>Leave</TableCell>
                            <TableCell>Lop</TableCell>
                            <TableCell>Total Days</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <Suspense fallback={<LinearProgress />} >
                            {
                                employeedata.map((name) => {
                                    const data = {
                                        emp_id: name.em_id,
                                        start: startdate,
                                        end: enddate,
                                    }
                                    return <TableRow key={name.em_name}  >

                                        <TableCell align="center" style={{ padding: 0, width: '8rem', backgroundColor: "#a2a3ac", height: '3rem' }} >
                                            <Typography variant="subtitle2" noWrap={true}>
                                                {name.em_name}
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="center" style={{ padding: 0, width: '8rem', backgroundColor: "#a2a3ac", height: '3rem' }}>
                                            <Typography variant="subtitle2">
                                                {name.em_id}
                                            </Typography>
                                        </TableCell>

                                        <Suspense fallback={<LinearProgress />} >
                                            <AttendanceMarkingTabdata data={data} count={count} />
                                            <AttandanceMarkingtotal data={data} length={dateformat.length} count={count} />

                                        </Suspense>


                                    </TableRow>

                                })
                            }
                        </Suspense>

                    </TableBody>
                </Table>
            </TableContainer>
        </Fragment >
    )
}

export default AttendanceMarkingMainCard