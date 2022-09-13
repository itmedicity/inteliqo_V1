import { LinearProgress } from '@mui/material'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import React, { Fragment, memo, Suspense, useEffect } from 'react'
import Paper from '@mui/material/Paper';
import '../styleattnd.css'
import AttandanceDatecmpont from './AttandanceDatecmpont';
import AttendanceMarkinCardMap from './AttendanceMarkinCardMap';
const AttendanceMarkingMainCard = ({ dateformat, employeedata, startdate, enddate, duty, count, rageset, arrytry, setArrytry }) => {



    useEffect(() => {

    }, [count])

    return (
        < Fragment >
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="a dense table" className='attends'>
                    <TableHead>
                        <TableRow style={{ backgroundColor: "#a2a3ac", height: '1rem' }}>
                            <TableCell></TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">Emp ID</TableCell>
                            <AttandanceDatecmpont date={dateformat} />
                            <TableCell>Work Days </TableCell>
                            <TableCell>Present</TableCell>
                            <TableCell>Leave</TableCell>
                            <TableCell>Woff</TableCell>
                            <TableCell>Lop</TableCell>
                            <TableCell>Total Days</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <Suspense fallback={<LinearProgress />} >
                            {
                                employeedata.map((name, key) => {
                                    return <AttendanceMarkinCardMap key={key} val={name} startdate={startdate} enddate={enddate}
                                        count={count} dateformat={dateformat} rageset={rageset} data={{
                                            emp_id: name.em_id,
                                            start: startdate,
                                            end: enddate,
                                        }} employeedata={employeedata} arrytry={arrytry} setArrytry={setArrytry} />
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