import React, { lazy, memo, } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Box } from '@mui/joy';
const Mainviewdata = lazy(() => import('./Mainviewdata'))
const Viewdata = ({ tableData, setTableData, mincount, maxcount, setmincount, setmaxcount, newdesig, salaryfrom, salaryto }) => {

    return (
        <Box sx={{
            width: '100%',
            mt: 1,
            p: 1,
            display: "flex",
            justifyContent: 'center',
            flexDirection: 'row',
            alignItems: 'center',

        }}>
            <Box>
                <TableContainer>
                    <Table sx={{ p: 0, border: '1px solid #e0e0e0', width: '100%' }}>
                        <TableHead>
                            <TableRow sx={{}}>
                                <TableCell align='center' padding='none' sx={{ border: '1px solid #e0e0e0', }}>Designation</TableCell>
                                <TableCell padding='none' align='center' sx={{ border: '1px solid #e0e0e0' }}>MinCount</TableCell>
                                <TableCell padding='none' align='center' sx={{ border: '1px solid #e0e0e0' }}>MaxCount</TableCell>
                                <TableCell padding='none' align='center' sx={{ border: '1px solid #e0e0e0', width: '100px' }}>Salary Scale</TableCell>

                                {/* <TableCell sx={{ border: '1px solid #e0e0e0' }}></TableCell> */}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {/* {rows} */}<Mainviewdata salaryfrom={salaryfrom} salaryto={salaryto} mincount={mincount} maxcount={maxcount} tableData={tableData} setmincount={setmincount} setmaxcount={setmaxcount} setTableData={setTableData} />
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Box >
    )
}

export default memo(Viewdata);
