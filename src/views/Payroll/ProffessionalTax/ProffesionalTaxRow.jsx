import { TableCell, IconButton, TableRow } from '@mui/material'
import React, { Fragment, memo } from 'react'
import { HiTrash } from "react-icons/hi";
const ProffesionalTaxRow = ({ deleterowfromlist, mege }) => {
    return (
        <Fragment>
            {mege && mege.map((val, index) => {
                return <TableRow key={val.pro_emp_id} sx={{ '&:last-child td, &:last-child th': { border: 0 }, }}>
                    <TableCell align="center" style={{ padding: 0, width: '10rem', height: '2rem' }} >{val.pro_emp_id}</TableCell>
                    <TableCell align="center" style={{ padding: 0, width: '10rem', height: '2rem' }} >{val.pro_emp_no}</TableCell>
                    <TableCell align="center" style={{ padding: 0, width: '10rem', height: '2rem' }} >{val.pro_emp_name}</TableCell>
                    <TableCell align="center" style={{ padding: 0, width: '10rem', height: '2rem' }} >{val.pro_gross_salary}</TableCell>
                    <TableCell align="center" style={{ padding: 0, width: '10rem', height: '1rem' }}> {val.pro_tax}</TableCell>
                    <TableCell align="center" style={{ padding: 0, width: '10rem', height: '1rem' }}>
                        <IconButton
                            aria-label="add"
                            style={{ padding: '0rem' }}
                            onClick={() => {
                                deleterowfromlist(val.pro_emp_id)
                            }}
                        >
                            <HiTrash size={26} color='success' />
                        </IconButton>
                    </TableCell>
                </TableRow>
            })}
        </Fragment >
    )
}

export default memo(ProffesionalTaxRow)