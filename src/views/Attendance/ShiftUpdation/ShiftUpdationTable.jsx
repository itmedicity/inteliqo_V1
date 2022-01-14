import { Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from '@mui/material';
import React, { Fragment, useState } from 'react';
import Paper from '@mui/material/Paper';
import CustomePagination from 'src/views/CommonCode/CustomePagination';
import { rows } from './data'
import ShiftUpdationTblRow from './ShiftUpdationTblRow';

const ShiftUpdationTable = () => {

    // Pagination Custome State
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };


    return (
        <Fragment>
            {/* <div className="card">
                <div className="card-body"> */}
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow style={{ backgroundColor: "#a2a3ac", height: '1rem' }} >
                            <TableCell align="center" rowSpan={2} className="p-0" style={{ width: '6rem', }}>Date</TableCell>
                            <TableCell align="center" colSpan={2} className="p-0" style={{ width: '8rem', }}>Shift Time</TableCell>
                            <TableCell align="center" colSpan={2} className="p-0" style={{ width: '8rem', }}>Punch Data</TableCell>
                            <TableCell align="center" rowSpan={2} className="p-0" style={{ width: '6rem', }}>Hours Worked</TableCell>
                            <TableCell align="center" rowSpan={2} className="p-0" style={{ width: '4rem', }}>OT (min)</TableCell>
                            <TableCell align="center" rowSpan={2} className="p-0" style={{ width: '4rem', }}>L-IN(min)</TableCell>
                            <TableCell align="center" rowSpan={2} className="p-0" style={{ width: '4rem', }}>E-GO(min)</TableCell>
                            <TableCell align="center" rowSpan={2} className="p-0" style={{ width: '1rem', }}></TableCell>
                            <TableCell align="center" rowSpan={2} className="p-0" style={{ width: '1rem', }}></TableCell>
                        </TableRow>
                        <TableRow style={{ backgroundColor: "#a2a3ac", height: '1rem' }} >
                            {/* <TableCell>Date</TableCell> */}
                            <TableCell align="center" style={{ padding: 0, width: '2rem' }}>In Time</TableCell>
                            <TableCell align="center" style={{ padding: 0, width: '2rem' }}>Out Time</TableCell>
                            <TableCell align="center" style={{ padding: 0, width: '2rem' }}>In Time</TableCell>
                            <TableCell align="center" style={{ padding: 0, width: '2rem' }}>Out Time</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            (rowsPerPage > 0
                                ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                : rows
                            ).map((val, index) => {
                                return <ShiftUpdationTblRow val={val} key={index} />
                            })
                        }
                    </TableBody>
                    <TableFooter>
                        <TableRow hover={true} >
                            <CustomePagination
                                data={rows}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                handleChangePage={handleChangePage}
                                handleChangeRowsPerPage={handleChangeRowsPerPage}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
            {/* </div>
            </div> */}
        </Fragment>
    )
}

export default ShiftUpdationTable
