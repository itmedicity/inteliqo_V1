import React, { memo, useCallback, useEffect, useState } from 'react'
import { Paper, TableContainer } from '@mui/material';
import { Box, IconButton, Table, Typography } from '@mui/joy';
import moment from 'moment';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import CloseIcon from '@mui/icons-material/Close';
import { axioslogin } from 'src/views/Axios/Axios';

// const PdfAndimage = lazy(() => import('../Pdfandimage/PdfAndimage'))


const ViewApplication = ({ Empdata, setShowGeneral, Files }) => {
    const [data, setData] = useState([])
    const toRedirectToHome = useCallback(() => {
        setShowGeneral(0)
    }, [setShowGeneral])

    // for updating the data
    useEffect(() => {
        const postdata = {
            emno: Empdata?.em_no,
        };
        const fetchData = async () => {
            // Data to the form page
            const result = await axioslogin.post('/PersonalChecklist/applicationdata', postdata)
            const { applicationsuccess, applicationdata } = result.data
            if (applicationsuccess === 1) {
                if (applicationdata.length > 0) {
                    setData(applicationdata[0])
                }
                else {
                    setData([])
                }

            }
        }
        fetchData()
    }, [Empdata])

    return (
        <Box>
            <Box sx={{ p: 1 }}>
                {/* <CustmTypog title={'CheckList For Documents'} /> */}
                <Paper square sx={{ backgroundColor: '#e8eaf6', height: 25 }} >
                    <Box sx={{ display: "flex", flexDirection: 'row', justifyContent: "space-between" }}>
                        <Box>
                            <Typography
                                startDecorator={<ArrowRightIcon />}
                                textColor="neutral.600" sx={{ display: 'flex', }} >
                                Application For Employment
                            </Typography>
                        </Box>
                        <Box >
                            <IconButton
                                variant="outlined"
                                size='xs'
                                color="danger"
                                onClick={toRedirectToHome}
                                sx={{ color: '#ef5350', }}
                            >
                                <CloseIcon />
                            </IconButton>
                        </Box>
                    </Box>
                </Paper>
            </Box>
            <Box sx={{
                overflowX: 'auto',
                height: window.innerHeight - 190,
                scrollbarWidth: 'none',
                '&::-webkit-scrollbar': {
                    width: 0,
                },
            }}>
                {/* {Files.length !== 0 ? */}

                <Box>
                    {/* <PdfAndimage Files={Files} /> */}
                </Box>
                :
                <Box>
                    <Box sx={{ ml: 1 }}>
                        <Box sx={{ display: "flex", width: '100%' }}>
                            <Typography level="title-md" sx={{ width: '30%' }}>Position Applying For :</Typography>
                            <Typography level="title-md" sx={{ ml: 1, }}>{Empdata?.desg_name === '' ? 'Not Updated' : Empdata?.desg_name}</Typography>
                        </Box>
                        <Box sx={{ display: "flex" }}>
                            <Typography level="title-md" sx={{ width: '30%' }}>Date Of Joining:</Typography>
                            <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}>{Empdata?.em_doj === null ? "Not Updated" : moment(Empdata?.em_doj).format('DD-MM-YYYY')} </Typography>
                        </Box>
                        <Box sx={{ display: "flex" }}>
                            <Typography level="title-md" sx={{ width: '30%' }}>Name :</Typography>
                            <Typography level="title-md" sx={{ ml: 1 }}>{Empdata?.em_name === '' ? "Not Updated" : Empdata?.em_name} </Typography>
                        </Box>
                        <Box sx={{ display: "flex" }}>
                            <Typography level="title-md" sx={{ width: '30%' }}>Qualification:</Typography>
                            <Typography level="title-md" sx={{ ml: 1 }}>{Empdata?.edu_desc === '' ? "Not Updated" : Empdata?.edu_desc} </Typography>
                        </Box>
                        <Box sx={{ display: "flex" }}>
                            <Typography level="title-md" sx={{ width: '30%' }}>Gender:</Typography>
                            <Typography level="title-md" sx={{ ml: 1 }}>{Empdata?.em_gender === 0 ? "Not Updated" : Empdata?.em_gender === 1 ? "Male" : Empdata?.em_gender === 2 ? "FeMale" : 'Other'}</Typography>
                        </Box>
                        <Box sx={{ display: "flex" }}>
                            <Typography level="title-md" sx={{ width: '30%' }} >Age:</Typography>
                            <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}>{Empdata?.em_age_year === '' ? "Not Updated" : Empdata?.em_age_year}  </Typography>
                        </Box>
                        <Box sx={{ display: "flex" }}>
                            <Typography level="title-md" sx={{ width: '30%' }}>Date Of Birth:</Typography>
                            <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}>{Empdata?.em_dob === null ? "Not Updated" : moment(Empdata?.em_dob).format('DD-MM-YYYY')}  </Typography>
                        </Box>
                        <Box sx={{ display: "flex" }}>
                            <Typography level="title-md" sx={{ width: '30%' }}>Contact Address:</Typography>
                            <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}>{Empdata?.addressPermnt1 === '' ? "Not Updated" : Empdata?.addressPermnt1} ,{Empdata?.addressPermnt2 === '' ? "Not Updated" : Empdata?.addressPermnt2} </Typography>
                        </Box>
                        <Box sx={{ display: "flex" }}>
                            <Typography level="title-md" sx={{ width: '30%' }}>Phone Number:</Typography>
                            <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}> {Empdata?.em_mobile === 0 ? "Not Updated" : Empdata?.em_mobile} </Typography>
                        </Box>
                    </Box>
                    <TableContainer sx={{ p: 1 }}>
                        <Table sx={{ mt: 1, }} size='sm' aria-label="basic table" borderAxis="both">
                            <tbody>
                                <tr sx={{}}>
                                    <th padding='none' sx={{ border: '1px solid #e0e0e0' }} colSpan={6}>
                                        <Typography level="title-md" sx={{ ml: 1 }}>Do you have any relative or friend who is employed in Travancore Medicity ?</Typography>
                                    </th>

                                </tr>
                                <tr sx={{}}>
                                    <td padding='none' sx={{ border: '1px solid #e0e0e0', }} colSpan={2}>
                                        <Typography level="title-md" sx={{ ml: 1, textAlign: "center" }}>Name</Typography>
                                    </td>
                                    <td padding='none' sx={{ border: '1px solid #e0e0e0', }} colSpan={2}>
                                        <Typography level="title-md" sx={{ ml: 1, textAlign: "center" }}>Designation</Typography>
                                    </td>
                                    <td padding='none' sx={{ border: '1px solid #e0e0e0', }} colSpan={2}>
                                        <Typography level="title-md" sx={{ ml: 1, textAlign: "center" }}>Department</Typography>
                                    </td>
                                </tr>
                                <tr sx={{}}>
                                    <td padding='none' sx={{ border: '1px solid #e0e0e0', }} colSpan={2}>
                                        <Typography level="title-md" sx={{ ml: 1, textAlign: "center" }}> {data?.Relative_name === '' ? "Not Updated" : data?.Relative_name}  </Typography>
                                    </td>
                                    <td padding='none' sx={{ border: '1px solid #e0e0e0', }} colSpan={2}>
                                        <Typography level="title-md" sx={{ ml: 1, textAlign: "center" }}>{data?.desg_name === '' ? "Not Updated" : data?.desg_name} </Typography>
                                    </td>
                                    <td padding='none' sx={{ border: '1px solid #e0e0e0', }} colSpan={2}>
                                        <Typography level="title-md" sx={{ ml: 1, textAlign: "center" }}>{data?.dept_name === '' ? "Not Updated" : data?.dept_name}</Typography>
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                        <Table aria-label="basic table" borderAxis="both" size='sm' sx={{ mt: 1 }}>
                            <tbody>
                                <tr sx={{}}>
                                    <th padding='none' sx={{ border: '1px solid #e0e0e0' }} colSpan={6}>
                                        <Typography level="title-md" sx={{ ml: 1 }}>Have you worked with us before  ?</Typography>
                                    </th>
                                </tr>
                                <tr sx={{}}>
                                    <td padding='none' sx={{ border: '1px solid #e0e0e0', }} colSpan={3}>
                                        <Typography level="title-md" sx={{ ml: 1, textAlign: "center" }}>Department</Typography>
                                    </td>
                                    <td padding='none' sx={{ border: '1px solid #e0e0e0', }} colSpan={3}>
                                        <Typography level="title-md" sx={{ ml: 1, }}>{data?.old_dept_name === '' ? "Not Updated" : data?.old_dept_name} </Typography>
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                        <Typography level="title-md" sx={{ ml: 1, mt: 1 }}>Self Declaration By the Applicant</Typography>
                        <Typography level="title-md" sx={{ ml: 1, mt: 1 }}>I, Declare that the particulars given above are correct and true to the best of my knowledge
                            and belief and no attempt has been made by me to Conceal or without pertinent information , which you are at liberty to verify at any time .I
                            also understand that any misrepresentation of facts in the application is sufficient cause for termination of my service,if appointed.</Typography>

                        <Table sx={{ mt: 1 }} aria-label="basic table" borderAxis="both" size='sm'>
                            <tbody>

                                <tr sx={{}}>
                                    <td padding='none' sx={{ border: '1px solid #e0e0e0', }} colSpan={2}>
                                        <Typography level="title-md" sx={{ ml: 1, textAlign: "center" }}>Place</Typography>
                                    </td>
                                    <td padding='none' sx={{ border: '1px solid #e0e0e0', }} colSpan={2}>
                                        <Typography level="title-md" sx={{ ml: 1, textAlign: "center" }}>Date</Typography>
                                    </td>
                                    <td padding='none' sx={{ border: '1px solid #e0e0e0', }} colSpan={2}>
                                        <Typography level="title-md" sx={{ ml: 1, textAlign: "center" }}>Applicant Signature</Typography>
                                    </td>
                                </tr>
                                <tr sx={{}}>
                                    <td padding='none' sx={{ border: '1px solid #e0e0e0', }} colSpan={2}>
                                        <Typography level="title-md" sx={{ ml: 1, textAlign: "center" }}>{data?.Place === '' ? "Not Updated" : data?.Place} </Typography>
                                    </td>
                                    <td padding='none' sx={{ border: '1px solid #e0e0e0', }} colSpan={2}>
                                        <Typography level="title-md" sx={{ ml: 1, textAlign: "center" }}>{data?.Date_of_Form === '' ? "Not Updated" : data?.Date_of_Form} </Typography>
                                    </td>
                                    <td padding='none' sx={{ border: '1px solid #e0e0e0', }} colSpan={2}>
                                        <Typography level="title-md" sx={{ ml: 1, textAlign: 'center' }}>{Empdata?.em_name === '' ? "Not Updated" : Empdata?.em_name} </Typography>

                                    </td>
                                </tr>
                            </tbody>
                        </Table>


                    </TableContainer>

                </Box>

                {/* } */}
            </Box>
        </Box>
    )
}

export default memo(ViewApplication) 