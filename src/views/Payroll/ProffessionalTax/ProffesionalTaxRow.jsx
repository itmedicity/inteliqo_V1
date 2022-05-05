import { TableCell, IconButton, TableRow, LinearProgress } from '@mui/material'
import React, { Fragment, memo, Suspense } from 'react'
import ProffesionalTaxMap from './ProffesionalTaxMap'
import { HiTrash } from "react-icons/hi";

const ProffesionalTaxRow = ({ emp, tax }) => {
    return (
        <Fragment>
            {emp && emp.map((val, index) => {
                return <TableRow key={val.em_id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell align="center" style={{ padding: 0, width: '10rem', height: '2rem' }} >{val.em_id}</TableCell>
                    <TableCell align="center" style={{ padding: 0, width: '10rem', height: '2rem' }} >{val.em_no}</TableCell>
                    <TableCell align="center" style={{ padding: 0, width: '10rem', height: '2rem' }} >{val.em_name}</TableCell>
                    <TableCell align="center" style={{ padding: 0, width: '10rem', height: '2rem' }} >{val.gross_salary}</TableCell>
                    <Suspense fallback={<LinearProgress />} >
                        <ProffesionalTaxMap
                            gross={val.gross_salary}
                            tax={tax}
                        />
                        <TableCell align="center" style={{ padding: 0, width: '10rem', height: '1rem' }}>
                            <IconButton
                                aria-label="add"
                                style={{ padding: '0rem' }}
                                onClick={(data) => {
                                    //         setCarryForwardLeave(data)

                                }}
                            >
                                <HiTrash size={26} color='success' />
                            </IconButton>
                        </TableCell>
                    </Suspense>
                </TableRow>
            })}
        </Fragment>
    )
}

export default memo(ProffesionalTaxRow)