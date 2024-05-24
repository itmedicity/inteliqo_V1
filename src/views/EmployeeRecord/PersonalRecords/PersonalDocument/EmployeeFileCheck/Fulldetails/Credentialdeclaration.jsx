import { Box, Typography } from '@mui/joy'
import React, { memo } from 'react'
import Table from '@mui/joy/Table';


const Credentialdeclaration = ({ Employee, Verificationdata }) => {

    return (
        <Box>
            <Typography level="title-md" sx={{ ml: 1, mt: 1 }}>Training Details</Typography>
            {/* training details */}
            <Typography level="title-md" sx={{ ml: 1, mt: 1 }}>Declaration By Applicant</Typography>
            <Table aria-label="basic table" borderAxis="both" size='sm' sx={{ mt: 1 }} variant="outlined">
                <tbody>
                    <tr>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>I hereby declare that the information given above are true and correct to the best
                            of my knowledge and belief.I agree if this information is found to be incorrect/false the company is free to terminate my contract /service.</Typography></td>

                    </tr>
                </tbody>
            </Table>
            <Table aria-label="basic table" borderAxis="both" size='sm' variant="outlined">

                <tbody>
                    <tr>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>Name Of The Staff</Typography></td>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>Signature</Typography></td>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>Date</Typography></td>
                    </tr>
                    <tr>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>{Employee?.em_name === '' ? "Not Updated" : Employee?.em_name} </Typography></td>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>{Employee?.em_name === '' ? "Not Updated" : Employee?.em_name} </Typography></td>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>{Verificationdata?.Declarationdate === '' ? "Not Updated" : Verificationdata?.Declarationdate} </Typography></td>

                    </tr>
                </tbody>
            </Table>
            <Typography level="title-md" sx={{ ml: 1, mt: 1 }}>Verification Status</Typography>
            <Table aria-label="basic table" borderAxis="both" size='sm' variant="outlined">

                <tbody>
                    <tr>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>Academic Details</Typography></td>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>Academic Status</Typography></td>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>Registration Details</Typography></td>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>Registration Status</Typography></td>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>Training Details</Typography></td>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>Training Status</Typography></td>
                    </tr>
                    <tr>
                        <td style={{}}>

                            <Box sx={{ display: "flex" }}>
                                <Box sx={{ mt: .5 }}>
                                    <Typography level="title-md" sx={{ ml: 2, }}>Original Certificates Verified</Typography>
                                </Box>

                            </Box>
                            <Box sx={{ display: "flex" }}>
                                <Box sx={{ mt: .5 }}>
                                    <Typography level="title-md" sx={{ ml: 2, }}>Copies Received</Typography>
                                </Box>

                            </Box>
                        </td>
                        <td>
                            <Box>
                                <Typography level="title-md" sx={{ ml: 1, textAlign: "center" }}>{Verificationdata?.original_certificates === 1 ? "Yes" : "No"} </Typography>
                            </Box>
                            <Box>
                                <Typography level="title-md" sx={{ ml: 1, textAlign: "center" }}>{Verificationdata?.original_certificates === 1 ? "Yes" : "No"} </Typography>
                            </Box>
                        </td>

                        <td style={{}}>
                            <Box sx={{ display: "flex" }}>
                                <Box sx={{ mt: .5 }}>
                                    <Typography level="title-md" sx={{ ml: 2, textAlign: "center" }}>Registration Verified</Typography>
                                </Box>
                            </Box>
                            <Box sx={{ display: "flex" }}>
                                <Box sx={{ mt: .5 }}>
                                    <Typography level="title-md" sx={{ ml: 2, textAlign: "center" }}>Screen Shot Attached</Typography>
                                </Box>
                            </Box>
                            <Box sx={{ display: "flex" }}>
                                <Box sx={{ mt: .5 }}>
                                    <Typography level="title-md" sx={{ ml: 2, textAlign: "center" }}>Copies Received</Typography>
                                </Box>
                            </Box>
                        </td>
                        <td>
                            <Box>
                                <Typography level="title-md" sx={{ ml: 1, textAlign: "center" }}>{Verificationdata?.original_certificates === 1 ? "Yes" : "No"} </Typography>
                            </Box>
                            <Box>
                                <Typography level="title-md" sx={{ ml: 1, textAlign: "center" }}>{Verificationdata?.original_certificates === 1 ? "Yes" : "No"} </Typography>
                            </Box>
                            <Box>
                                <Typography level="title-md" sx={{ ml: 1, textAlign: "center" }}>{Verificationdata?.original_certificates === 1 ? "Yes" : "No"} </Typography>
                            </Box>
                        </td>
                        <td style={{}}>
                            <Box sx={{ display: "flex" }}>
                                <Box sx={{ mt: .5 }}>
                                    <Typography level="title-md" sx={{ ml: 2, textAlign: "center" }}>Originals Checked</Typography>
                                </Box>

                            </Box>
                            <Box sx={{ display: "flex" }}>
                                <Box sx={{ mt: .5 }}>
                                    <Typography level="title-md" sx={{ ml: 2, textAlign: "center" }}>Copies Received</Typography>
                                </Box>

                            </Box>
                        </td>
                        <td>
                            <Box>
                                <Typography level="title-md" sx={{ ml: 1, textAlign: "center" }}>{Verificationdata?.original_certificates === 1 ? "Yes" : "No"} </Typography>
                            </Box>
                            <Box>
                                <Typography level="title-md" sx={{ ml: 1, textAlign: "center" }}>{Verificationdata?.original_certificates === 1 ? "Yes" : "No"} </Typography>
                            </Box>
                        </td>
                    </tr>
                </tbody>
            </Table>
            <Typography level="title-md" sx={{ ml: 1, mt: 1 }}>Declaration by HR</Typography>
            <Table aria-label="basic table" borderAxis="both" size='sm' variant="outlined">
                <tbody>
                    <tr>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>The above details are checked and verified</Typography></td>
                    </tr>
                </tbody>
            </Table>
            <Table aria-label="basic table" borderAxis="both" size='sm' variant="outlined">
                <tbody>
                    <tr>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>Name Of The Staff</Typography></td>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>Signature</Typography></td>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>Date</Typography></td>
                    </tr>
                    <tr>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>{Verificationdata?.em_name === '' ? "Not Updated" : Verificationdata?.em_name} </Typography></td>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>{Verificationdata?.em_name === '' ? "Not Updated" : Verificationdata?.em_name} </Typography></td>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>{Verificationdata?.datesaved === '' ? "Not Updated" : Verificationdata?.datesaved} </Typography></td>
                    </tr>
                </tbody>
            </Table>
        </Box>)
}

export default memo(Credentialdeclaration) 