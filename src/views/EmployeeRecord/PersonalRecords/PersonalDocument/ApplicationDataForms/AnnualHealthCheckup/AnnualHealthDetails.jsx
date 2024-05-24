import { Box, Table, Typography } from '@mui/joy'
import React, { lazy, memo } from 'react'
import JoyCheckbox from 'src/views/MuiComponents/JoyComponent/JoyCheckbox'

const AnnualHealthDoc = lazy(() => import('./AnnualHealthDoc'))

const AnnualHealthDetails = () => {
    return (
        <Box>
            <Table aria-label="basic table" borderAxis="both" size='sm' variant="outlined" sx={{ mt: 1 }}>

                <tbody>
                    <tr>
                        <td style={{ width: '20%' }}> <Typography level="title-md" sx={{ ml: 1 }}>Vaccination Details</Typography></td>
                    </tr>
                </tbody>
            </Table>
            <Typography level="title-md" sx={{ ml: 1 }}>Have you finished your HBsAg vaccination?</Typography>

            <Table aria-label="basic table" borderAxis="both" size='sm' variant="outlined" sx={{ mt: 1 }}>
                <tbody>
                    <tr>
                        <td style={{ width: '20%' }}>

                            <Box sx={{ display: "flex" }}>
                                <Box sx={{ mt: .5 }}>
                                    <JoyCheckbox
                                        size="sm"
                                        sx={{}}
                                        name="workstation"
                                    // checked={workstation}
                                    // onchange={(e) => setworkstation(e.target.checked)}

                                    />
                                </Box>
                                <Box>
                                    <Typography level="title-md" sx={{ ml: 1, }}>
                                        Yes
                                    </Typography>
                                </Box>
                            </Box>

                        </td>
                        <td>
                            <Box>
                                <Table aria-label="basic table" borderAxis="both" size='sm'>

                                    <tbody>
                                        <tr>
                                            <td style={{ width: '20%' }}> <Typography level="title-md" sx={{ ml: 1 }}>First Dose</Typography></td>
                                            <td style={{ width: '20%' }}> <Typography level="title-md" sx={{ ml: 1 }}>Second Dose</Typography></td>
                                            <td style={{ width: '20%' }}> <Typography level="title-md" sx={{ ml: 1 }}>Third Dose</Typography></td>
                                            <td style={{ width: '20%' }}> <Typography level="title-md" sx={{ ml: 1 }}>Booster Dose</Typography></td>

                                        </tr>
                                        <tr>
                                            <td style={{ width: '20%' }}> <Typography level="title-md" sx={{ ml: 1 }}></Typography></td>
                                            <td style={{ width: '20%' }}> <Typography level="title-md" sx={{ ml: 1 }}></Typography></td>
                                            <td style={{ width: '20%' }}> <Typography level="title-md" sx={{ ml: 1 }}></Typography></td>
                                            <td style={{ width: '20%' }}> <Typography level="title-md" sx={{ ml: 1 }}></Typography></td>

                                        </tr>
                                    </tbody>
                                </Table>
                            </Box>
                        </td>
                    </tr>
                    <tr>
                        <td style={{ width: '20%' }}>
                            <Box sx={{ display: "flex" }}>
                                <Box sx={{ mt: .5 }}>
                                    <JoyCheckbox
                                        size="sm"
                                        sx={{}}
                                        name="workstation"
                                    // checked={workstation}
                                    // onchange={(e) => setworkstation(e.target.checked)}

                                    />
                                </Box>
                                <Box>
                                    <Typography level="title-md" sx={{ ml: 1, }}>
                                        No
                                    </Typography>
                                </Box>
                            </Box>
                        </td>
                        <td style={{ width: '20%' }}>
                            <Typography level="title-md" sx={{ ml: 1, }}>
                                Check the titer
                            </Typography>
                        </td>
                    </tr>
                </tbody>
            </Table>
            <Typography level="title-md" sx={{ ml: 1, mt: 1 }}>
                Declaration By Applicant
            </Typography>

            <Typography level="title-md" sx={{ ml: 1, mt: 1 }}>
                I hereby declare that the information given above are true and correct to the best of my
                knowledge and belief.I agree if this information is found to be incorrect/ false the company
                is free to terminate my job approval.
            </Typography>
            <Table aria-label="basic table" borderAxis="both" size='sm' variant="outlined" sx={{ mt: 1 }}>

                <tbody>
                    <tr>
                        <td style={{ width: '20%' }}> <Typography level="title-md" sx={{ ml: 1 }}>Name Of Staff</Typography></td>
                        <td style={{ width: '20%' }}> <Typography level="title-md" sx={{ ml: 1 }}>Signature</Typography></td>
                        <td style={{ width: '20%' }}> <Typography level="title-md" sx={{ ml: 1 }}>Date</Typography></td>
                    </tr>
                    <tr>
                        <td style={{ width: '20%' }}> <Typography level="title-md" sx={{ ml: 1 }}></Typography></td>
                        <td style={{ width: '20%' }}> <Typography level="title-md" sx={{ ml: 1 }}></Typography></td>
                        <td style={{ width: '20%' }}> <Typography level="title-md" sx={{ ml: 1 }}></Typography></td>
                    </tr>
                </tbody>
            </Table>
            <Typography level="title-md" sx={{ ml: 1, mt: 1 }}> Doctor&apos;s Consultation </Typography>
            <Table aria-label="basic table" borderAxis="both" size='sm' variant="outlined" sx={{ mt: 1 }}>

                <tbody>
                    <tr>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>Name of the Candidate </Typography></td>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}> </Typography></td>

                    </tr>

                </tbody>
            </Table>
            <Table aria-label="basic table" borderAxis="both" size='sm' >
                <tbody>
                    <tr>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>Age </Typography></td>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}> </Typography></td>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>Gender </Typography></td>
                        <td style={{}}>
                            <Box sx={{ display: "flex" }}>
                                <Box sx={{ mt: .5 }}>
                                    <JoyCheckbox
                                        sx={{}}
                                        name="workstation"
                                        size="sm"
                                    // checked={workstation}
                                    // onchange={(e) => setworkstation(e.target.checked)}

                                    />
                                </Box>
                                <Box>
                                    <Typography level="title-md" sx={{ ml: 2, textAlign: "center" }}>Male</Typography>
                                </Box>
                            </Box>
                        </td>

                        <td style={{}}>
                            <Box sx={{ display: "flex" }}>
                                <Box sx={{ mt: .5 }}>
                                    <JoyCheckbox
                                        sx={{}}
                                        name="workstation"
                                        size="sm"
                                    // checked={workstation}
                                    // onchange={(e) => setworkstation(e.target.checked)}

                                    />
                                </Box>
                                <Box>
                                    <Typography level="title-md" sx={{ ml: 2, textAlign: "center" }}>FeMale</Typography>
                                </Box>
                            </Box>
                        </td>
                        <td style={{}}>
                            <Box sx={{ display: "flex" }}>
                                <Box sx={{ mt: .5 }}>
                                    <JoyCheckbox
                                        sx={{}}
                                        name="workstation"
                                        size="sm"
                                    // checked={workstation}
                                    // onchange={(e) => setworkstation(e.target.checked)}

                                    />
                                </Box>
                                <Box>
                                    <Typography level="title-md" sx={{ ml: 2, textAlign: "center" }}>Other</Typography>
                                </Box>
                            </Box>
                        </td>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>Dept </Typography></td>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}></Typography></td>

                    </tr>
                </tbody>
            </Table>
            <Table aria-label="basic table" borderAxis="both" size='sm' >
                <tbody>
                    <tr>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>MRD No </Typography></td>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}> </Typography></td>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>Unit </Typography></td>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}> </Typography></td>
                    </tr>
                    <tr>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>Blood Group</Typography></td>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}> </Typography></td>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>Consultant </Typography></td>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}> </Typography></td>
                    </tr>
                </tbody>
            </Table>
            <AnnualHealthDoc />
        </Box>
    )
}

export default memo(AnnualHealthDetails)