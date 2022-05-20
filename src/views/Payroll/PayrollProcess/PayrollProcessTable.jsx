
import React, { Fragment, memo } from 'react'
import { TableCell, TableRow } from '@mui/material'


const PayrollProcessTable = ({ secEmp }) => {
    return (
        <Fragment>
            {secEmp && secEmp.map((val, index) => {
                return <TableRow key={val.em_id} sx={{ '&:last-child td, &:last-child th': { border: 0 }, }}>
                    <TableCell align="center" style={{ padding: 0, width: '10rem', height: '2rem' }} >{val.em_id}</TableCell>
                    <TableCell align="center" style={{ padding: 0, width: '10rem', height: '2rem' }} >{val.em_no}</TableCell>
                    <TableCell align="center" style={{ padding: 0, width: '10rem', height: '2rem' }} >{val.em_name}</TableCell>
                    {/* <Suspense fallback={<LinearProgress />} >
                        <FixedTableCell emid={val.em_id} />
                    </Suspense> */}

                </TableRow>
            })}
        </Fragment >
    )
}

export default memo(PayrollProcessTable)