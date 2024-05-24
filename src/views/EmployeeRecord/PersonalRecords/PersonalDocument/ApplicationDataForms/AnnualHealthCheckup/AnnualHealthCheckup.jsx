import { Box, Table, Typography } from '@mui/joy'
import React, { lazy, memo } from 'react'

const AnnualHealthHistory = lazy(() => import('./AnnualHealthHistory'))

const AnnualHealthCheckup = ({ Empdata }) => {
    return (
        <Box sx={{ height: window.innerHeight - 200, overflowX: "auto", '::-webkit-scrollbar': { display: "none" }, p: 1 }}>
            <Table aria-label="basic table" borderAxis="both" size='sm' variant="outlined">

                <tbody>
                    <tr>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}> Name Of The Employee</Typography></td>
                        <td><Typography sx={{ ml: 1 }}>{Empdata?.em_name === '' ? "Not Updated" : Empdata?.em_name} </Typography>
                        </td>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>Period Of Employment</Typography></td>
                        <td><Typography sx={{ ml: 1 }}>{Empdata?.em_name === '' ? "Not Updated" : Empdata?.em_name} </Typography>
                        </td>
                    </tr>
                </tbody>
            </Table>
            <Table aria-label="basic table" borderAxis="both" size='sm'>

                <tbody>
                    <tr>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>Age</Typography></td>
                        <td><Typography sx={{ ml: 1 }}>{Empdata?.em_name === '' ? "Not Updated" : Empdata?.em_name} </Typography>
                        </td>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>Gender</Typography></td>
                        <td><Typography sx={{ ml: 1 }}>{Empdata?.em_name === '' ? "Not Updated" : Empdata?.em_name} </Typography>
                        </td>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>Blood Group</Typography></td>
                        <td><Typography sx={{ ml: 1 }}>{Empdata?.em_name === '' ? "Not Updated" : Empdata?.em_name} </Typography>
                        </td>
                    </tr>
                </tbody>
            </Table>
            <Table aria-label="basic table" borderAxis="both" size='sm'>

                <tbody>
                    <tr>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>Designation</Typography></td>
                        <td><Typography sx={{ ml: 1 }}>{Empdata?.em_name === '' ? "Not Updated" : Empdata?.em_name} </Typography>
                        </td>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>Emp Id</Typography></td>
                        <td><Typography sx={{ ml: 1 }}>{Empdata?.em_name === '' ? "Not Updated" : Empdata?.em_name} </Typography>
                        </td>
                    </tr>
                    <tr>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>Department</Typography></td>
                        <td><Typography sx={{ ml: 1 }}>{Empdata?.em_name === '' ? "Not Updated" : Empdata?.em_name} </Typography>
                        </td>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>Date Of Joining</Typography></td>
                        <td><Typography sx={{ ml: 1 }}>{Empdata?.em_name === '' ? "Not Updated" : Empdata?.em_name} </Typography>
                        </td>
                    </tr>
                </tbody>
            </Table>
            <Box sx={{ ml: 1, mt: 1 }}>
                <Typography level="title-md">. Read the following carefully</Typography>
                <Typography level="title-md">. Tick appropriately</Typography>
                <Typography level="title-md">. Mention the required information as accordingly</Typography>
            </Box>
            <AnnualHealthHistory />
        </Box>
    )
}

export default memo(AnnualHealthCheckup)