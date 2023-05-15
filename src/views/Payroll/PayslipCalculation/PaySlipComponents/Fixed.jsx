import { Popover, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React from 'react'

const Fixed = ({ open, anchorEl, setAnchorEl, data }) => {
    const { fixedSalary } = data
    const handleClose = () => {
        setAnchorEl(null)
    }

    return (
        <>
            <Popover
                id={open ? "simple-popover" : undefined}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                transformOrigin={{
                    horizontal: "center",
                    vertical: "top",
                }}
                anchorOrigin={{
                    horizontal: "center",
                    vertical: "bottom",
                }}
            >
                <TableContainer sx={{ maxHeight: 150 }}>
                    <Table size="small" >
                        <TableHead>
                            <TableRow >
                                <TableCell align="center">Type</TableCell>
                                <TableCell align="center">Amount</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                fixedSalary?.map((val, index) => {
                                    return <TableRow key={index}>
                                        <TableCell align="center" sx={{ textTransform: 'lowercase' }}>{val.earnded_name}</TableCell>
                                        <TableCell align="center" sx={{ textTransform: 'lowercase' }}>{val.amount}</TableCell>
                                    </TableRow>

                                })
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Popover>
        </>
    )
}

export default Fixed