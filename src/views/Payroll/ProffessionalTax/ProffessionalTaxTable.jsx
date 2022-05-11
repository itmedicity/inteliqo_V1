import React, { Fragment, memo, Suspense } from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { LinearProgress } from '@mui/material'
import ProffesionalTaxRow from './ProffesionalTaxRow'

const ProffessionalTaxTable = ({ deleterowfromlist, mege }) => {
    return (
        <Fragment>
            <Suspense fallback={<LinearProgress />} >
                <div className="row g-1 ">
                    <div className="card ">
                        <div className="col-md-12 pt-1">
                            <TableContainer sx={{ maxHeight: 350 }}>
                                <Table size="small"
                                    stickyHeader aria-label="sticky table">
                                    <TableHead>
                                        <TableRow >
                                            <TableCell align="center">Emp ID</TableCell>
                                            <TableCell align="center">Emp No</TableCell>
                                            <TableCell align="center">Employee Name</TableCell>
                                            <TableCell align="center">Gross Salary </TableCell>
                                            <TableCell align="center">Proffessional Tax </TableCell>
                                            <TableCell align="center"></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <Suspense fallback={<LinearProgress />} >
                                            <ProffesionalTaxRow
                                                deleterowfromlist={deleterowfromlist}
                                                mege={mege}
                                            />
                                        </Suspense>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                    </div>
                </div>
            </Suspense>
        </Fragment>
    )
}

export default memo(ProffessionalTaxTable)