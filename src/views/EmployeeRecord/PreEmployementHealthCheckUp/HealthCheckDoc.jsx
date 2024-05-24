import { Box, Table, Typography } from '@mui/joy'
import React, { lazy, memo } from 'react'
import CustmTypog from 'src/views/Component/MuiCustomComponent/CustmTypog';
import JoyCheckbox from 'src/views/MuiComponents/JoyComponent/JoyCheckbox';

const HealthCheckupExam = lazy(() => import('./HealthCheckupExam'))


const HealthCheckDoc = () => {
    return (
        <Box>

            <CustmTypog title='  Doctor&apos;s Consultation' />
            <Table aria-label="basic table" borderAxis="both" size='sm' variant="outlined">

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
            <Typography level="title-md" sx={{ mt: 1 }}>
                (To be filled in by the Medical Practitioner)
            </Typography>
            <Table aria-label="basic table" borderAxis="both" size='sm' variant="outlined" >
                <tbody>
                    <tr>
                        <td rowSpan={3} style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>Investigations </Typography></td>
                        <td colSpan={3} style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>Blood Tests: </Typography></td>
                    </tr>
                    <tr>
                        <td rowSpan={3}>
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
                                    <Typography level="title-md" sx={{ ml: 2, textAlign: "center" }}>HBs Ag Titer</Typography>
                                </Box>
                            </Box>
                        </td>
                        <td rowSpan={3}>
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
                                    <Typography level="title-md" sx={{ ml: 2, textAlign: "center" }}>Blood Grouping</Typography>
                                </Box>
                            </Box>
                        </td>
                        <td rowSpan={3}>
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
                                    <Typography level="title-md" sx={{ ml: 2, textAlign: "center" }}>Serology</Typography>
                                </Box>
                            </Box>
                        </td>
                    </tr>
                    <tr>
                        <td >
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
                                    <Typography level="title-md" sx={{ ml: 2, textAlign: "center" }}>Check X-ray</Typography>
                                </Box>
                            </Box>
                        </td>
                    </tr>
                </tbody>
            </Table>
            <Table aria-label="basic table" borderAxis="both" size='sm' >
                <tbody>
                    <tr>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>HBs Ag Titer Value </Typography></td>
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
                                    <Typography level="title-md" sx={{ ml: 2, textAlign: "center" }}>Greather than 100 IU/L</Typography>
                                </Box>
                            </Box></td>
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
                                    <Typography level="title-md" sx={{ ml: 2, textAlign: "center" }}>12-100 IU/L</Typography>
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
                                    <Typography level="title-md" sx={{ ml: 2, textAlign: "center" }}>0-12 IU/L</Typography>
                                </Box>
                            </Box>
                        </td>
                    </tr>

                </tbody>
            </Table>
            <Table aria-label="basic table" borderAxis="both" size='sm' >
                <tbody>
                    <tr>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>Vaciination Required</Typography></td>
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
                                    <Typography level="title-md" sx={{ ml: 2, textAlign: "center" }}>First Dose(0 Month)</Typography>
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
                                    <Typography level="title-md" sx={{ ml: 2, textAlign: "center" }}>Second dose(1 month)</Typography>
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
                                    <Typography level="title-md" sx={{ ml: 2, textAlign: "center" }}>Third dose(6 month)</Typography>
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
                                    <Typography level="title-md" sx={{ ml: 2, textAlign: "center" }}>Booster dose(If required)</Typography>
                                </Box>
                            </Box>
                        </td>
                    </tr>

                </tbody>
            </Table>
            <HealthCheckupExam />
        </Box>
    )
}

export default memo(HealthCheckDoc)