import { Box, Card, Typography } from '@mui/joy'
import React, { lazy, memo, useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import CustmTypog from 'src/views/Component/MuiCustomComponent/CustmTypog';
import { axioslogin } from 'src/views/Axios/Axios';


const AssesmentSheetMark = lazy(() => import('./AssesmentSheetMark'))

const InterViewAssesment = ({ Empdata, Files }) => {
    const [markdata, Setmark] = useState([]);

    useEffect(() => {
        const postdata = {
            em_no: Empdata?.em_no,
        };
        const fetchData = async () => {
            // Data to the form page
            const result = await axioslogin.post('/PersonalChecklist/interviewmark', postdata)
            const { success, data } = result.data

            if (success === 1) {
                if (data?.length > 0) {
                    Setmark(data[0])
                }
            }
        }
        fetchData()
    }, [Empdata])
    return (

        <>
            {/* for pdf View */}
            {Files.length !== 0 ?

                <Box sx={{
                    mt: 1,

                    overflowX: 'auto',
                    height: window.innerHeight - 160,
                    scrollbarWidth: 'none',
                    '&::-webkit-scrollbar': {
                        width: 0,
                    },
                }}>
                    {Files?.map((file, index) => (
                        <Box key={index} sx={{ p: 1 }}>
                            {file.endsWith('.pdf') ? (
                                <Card>
                                    <embed
                                        src={file}
                                        type="application/pdf"
                                        height={window.innerHeight - 200}
                                        width="100%"
                                    />
                                </Card>

                            ) : (
                                <Card>
                                    <img
                                        src={file}
                                        height={window.innerHeight - 200}
                                        alt=''
                                        style={{ maxWidth: '100%', maxHeight: '100%' }}
                                    />
                                </Card>

                            )}
                        </Box>
                    ))}
                </Box>
                :
                <Box sx={{ height: window.innerHeight - 170, overflowX: "auto", '::-webkit-scrollbar': { display: "none" }, p: 1 }}>

                    {markdata?.interview_status !== null ?
                        <Box>
                            <CustmTypog title={'Employee details'} />
                            <TableContainer sx={{}}>
                                <Table sx={{ mt: 1, p: 0, border: '1px solid #e0e0e0', width: '100%' }}>
                                    <TableBody >
                                        <TableRow sx={{ p: 0 }}>
                                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                                <Typography level="title-md" sx={{ ml: 1 }}>Name Of Candidate </Typography>
                                            </TableCell>
                                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "50%" }}>
                                                <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}>{Empdata?.em_name === '' ? "Not Updated" : Empdata?.em_name} </Typography>
                                            </TableCell>
                                        </TableRow>

                                        <TableRow sx={{ p: 0 }}>
                                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                                <Typography level="title-md" sx={{ ml: 1 }}>Job Position</Typography>
                                            </TableCell>
                                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                                <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}>{Empdata?.desg_name === '' ? "Not Updated" : Empdata?.desg_name} </Typography>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow sx={{ p: 0 }}>
                                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                                <Typography level="title-md" sx={{ ml: 1 }}>Department</Typography>
                                            </TableCell>
                                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                                <Typography level="title-md" sx={{ ml: 1 }}>{Empdata?.dept_name === '' ? "Not Updated" : Empdata?.dept_name}</Typography>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                                <AssesmentSheetMark markdata={markdata} />

                            </TableContainer>
                        </Box>
                        :
                        <Box sx={{
                            display: "flex", alignItems: 'center', justifyContent: 'center',

                            overflowX: 'auto',
                            height: window.innerHeight - 200,
                            scrollbarWidth: 'none',
                            '&::-webkit-scrollbar': {
                                width: 0,
                            },
                        }}>
                            <Box sx={{ width: '10%' }}>No Data Found</Box>
                        </Box>
                    }

                </Box>
            }

        </>

    )
}

export default memo(InterViewAssesment)