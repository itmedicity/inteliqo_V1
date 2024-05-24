import { Box, Table, Typography } from '@mui/joy'
import React, { lazy, memo } from 'react'
import JoyCheckbox from 'src/views/MuiComponents/JoyComponent/JoyCheckbox'

const AnnualHealthExam = lazy(() => import('./AnnualHealthExam'))

const AnnualHealthDoc = () => {
    return (
        <Box>
            <Typography level="title-md" sx={{ ml: 1 }}>
                (To be filled in by the Medical Practitioner)
            </Typography>
            <Table aria-label="basic table" borderAxis="both" size='sm' variant="outlined" sx={{ mt: 1 }}>

                <tbody>
                    <tr>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>Date Of Consultation</Typography></td>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}></Typography></td>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>Time Of Consultation</Typography></td>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}></Typography></td>

                    </tr>
                </tbody>
            </Table>
            <Table aria-label="basic table" borderAxis="both" size='sm'>

                <tbody>
                    <tr>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>Pulse(/min)</Typography></td>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>BP (mmHg)</Typography></td>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>Resp(/min)</Typography></td>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>Temp(F)</Typography></td>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>Weight(Kg)</Typography></td>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>Height(cm)</Typography></td>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>BMI</Typography></td>
                    </tr>
                </tbody>
            </Table>
            <Typography level="title-md" sx={{ ml: 1, mt: 1 }}>
                General Examination
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
            <AnnualHealthExam />
        </Box>
    )
}

export default memo(AnnualHealthDoc)