import { Box, Typography } from '@mui/joy'
import React, { Fragment, memo, lazy } from 'react'
import CustmTypog from 'src/views/Component/MuiCustomComponent/CustmTypog'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';


const Requestdetialspage = lazy(() => import('./Requestdetialspage'))
const ManpowerplaningView = ({ tableData, statusData }) => {


    const groupedData = tableData.reduce((result, item) => {
        const { grade_desg } = item;
        // const gradeLabel = grade_desg || "No Grade";
        if (!result[grade_desg]) {
            result[grade_desg] = [];
        }
        result[grade_desg].push(item);
        return result;
    }, {});
    return (

        <Box sx={{ mt: 2, width: "100%", display: "flex", height: '44%' }}>
            <Box sx={{ width: "50%", display: "flex", flexDirection: 'column', }}>
                <CustmTypog title={' PLANNING DETIALS'} />
                <TableContainer sx={{ mt: 2, }}>
                    <Table sx={{ p: 0, border: '1px solid #e0e0e0', width: '100%' }}>
                        <TableHead>
                            <TableRow sx={{}}>
                                <TableCell align='center' padding='none' sx={{ border: '1px solid #e0e0e0', color: "#0F0F0F", fontSize: 15, }}>Designation</TableCell>
                                <TableCell padding='none' align='center' sx={{ border: '1px solid #e0e0e0', color: "#0F0F0F", fontSize: 15, }}>MinCount</TableCell>
                                <TableCell padding='none' align='center' sx={{ border: '1px solid #e0e0e0', color: "#0F0F0F", fontSize: 15, }}>MaxCount</TableCell>
                                <TableCell padding='none' align='center' sx={{ border: '1px solid #e0e0e0', color: "#0F0F0F", fontSize: 15, }}>Salary Scale</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Object.keys(groupedData).map((grade) => (
                                <Fragment key={`grade-${grade}`}>
                                    <TableRow>
                                        <TableCell colSpan={4} sx={{ fontWeight: 'bold', p: .5 }}>
                                            {grade}
                                        </TableCell>
                                    </TableRow>
                                    {groupedData[grade].map((val, ind) => (
                                        <TableRow key={`grade-${grade}-row-${ind}`} sx={{ p: 0 }}>
                                            <TableCell align='center' padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                                {val?.desg_name}
                                            </TableCell>
                                            <TableCell padding='none' align='center' sx={{ border: '1px solid #e0e0e0' }}>
                                                <Typography color="neutral" sx={{ mt: .4, ml: 1, mr: 1 }}>{val.MinCount === null ? 0 : val.MinCount}</Typography>
                                            </TableCell>
                                            <TableCell padding='none' align='center' sx={{ border: '1px solid #e0e0e0' }}>
                                                <Typography color="neutral" sx={{ mt: .4, ml: 1, mr: 1 }}>{val.MaxCount === null ? 0 : val.MaxCount}</Typography>
                                            </TableCell>
                                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                                <Box sx={{ display: 'flex' }}>
                                                    <Typography color="neutral" sx={{ mt: .4, ml: 1, mr: 1 }}>from:</Typography>
                                                    <Typography color="neutral" sx={{ mt: .4, ml: 1, mr: 1 }}>{val.salaryfrom === null ? 0 : val.salaryfrom}</Typography>
                                                    <Typography color="neutral" sx={{ mt: .4, mr: 1 }}>to:</Typography>
                                                    <Typography color="neutral" sx={{ mt: .4, ml: 1, mr: 1 }}>{val.salaryto === null ? 0 : val.salaryto}</Typography>
                                                </Box>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </Fragment>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

            </Box>
            <Box sx={{ width: "50%", display: "flex", flexDirection: 'column', }}>
                <CustmTypog title={'Approval And Rejected Status'} />
                <Requestdetialspage statusData={statusData} />
            </Box>


        </Box >

    )
}

export default memo(ManpowerplaningView)