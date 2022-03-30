import { LinearProgress, Typography } from '@mui/material'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import React, { Fragment, memo, Suspense, useEffect } from 'react'
import Paper from '@mui/material/Paper';
import '../styleattnd.css'
import AttendanceMarkingTabdata from './AttendanceMarkingTabdata';
import AttandanceMarkingtotal from './AttandanceMarkingtotal';
import AttandanceDatecmpont from './AttandanceDatecmpont';
const AttendanceMarkingMainCard = ({ dateformat, employeedata, startdate, enddate, duty, count }) => {


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

                            <AttandanceDatecmpont date={dateformat} />

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
                                employeedata.map((name, key) => {
                                    const data = {
                                        emp_id: name.em_id,
                                        start: startdate,
                                        end: enddate,
                                    }
                                    return <TableRow key={key}  >

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

export default memo(AttendanceMarkingMainCard)