import { Box, Table, Typography } from '@mui/joy'
import React, { lazy, memo } from 'react'
import JoyCheckbox from 'src/views/MuiComponents/JoyComponent/JoyCheckbox'

const AnnualHealthDetails = lazy(() => import('./AnnualHealthDetails'))

const AnnualHealthHistory = () => {
    return (
        <Box>
            <Table aria-label="basic table" borderAxis="both" size='sm' variant="outlined">

                <tbody>
                    <tr>
                        <td style={{ width: '20%' }}> <Typography level="title-md" sx={{ ml: 1 }}>Do You Have Any History Of The Following</Typography></td>
                        <td style={{ width: '5%', textAlign: 'center' }}><Typography level="title-md" sx={{ ml: 1 }}>Yes</Typography> </td>
                        <td style={{ width: '5%', textAlign: 'center' }}><Typography level="title-md" sx={{ ml: 1 }}>No</Typography> </td>
                        <td style={{ width: '20%' }}><Typography level="title-md" sx={{ ml: 1 }}>If yes,how long/when ?</Typography> </td>
                        <td style={{ width: '10%' }}><Typography level="title-md" sx={{ ml: 1 }}>Still on Treatment</Typography> </td>
                        <td style={{ width: '10%' }}><Typography level="title-md" sx={{ ml: 1 }}>Not On Treatment</Typography> </td>
                        <td style={{ width: '20%' }}><Typography level="title-md" sx={{ ml: 1 }}>If still on treatment,specify the medications</Typography> </td>
                    </tr>
                    <tr>
                        <td style={{ width: '20%' }}> <Typography level="title-md" sx={{ ml: 1 }}>A.Diabetes</Typography></td>
                        <td style={{ width: '10%', textAlign: 'center' }}>
                            <JoyCheckbox
                                size="sm"
                                sx={{}}
                                name="workstation"
                            // checked={workstation}
                            // onchange={(e) => setworkstation(e.target.checked)}

                            />
                        </td>
                        <td style={{ width: '10%', textAlign: 'center' }}>
                            <JoyCheckbox
                                size="sm"
                                sx={{}}
                                name="workstation"
                            // checked={workstation}
                            // onchange={(e) => setworkstation(e.target.checked)}

                            />
                        </td>
                        <td style={{ width: '20%' }}><Typography level="title-md" sx={{ ml: 1 }}></Typography> </td>
                        <td style={{ width: '10%', textAlign: 'center' }}>
                            <JoyCheckbox
                                size="sm"
                                sx={{}}
                                name="workstation"
                            // checked={workstation}
                            // onchange={(e) => setworkstation(e.target.checked)}

                            />
                        </td>
                        <td style={{ width: '10%', textAlign: 'center' }}>
                            <JoyCheckbox
                                size="sm"
                                sx={{}}
                                name="workstation"
                            // checked={workstation}
                            // onchange={(e) => setworkstation(e.target.checked)}

                            />
                        </td>
                        <td style={{ width: '20%' }}><Typography level="title-md" sx={{ ml: 1 }}></Typography> </td>
                    </tr>
                    <tr>
                        <td style={{ width: '20%' }}> <Typography level="title-md" sx={{ ml: 1 }}>B.Hypertension</Typography></td>
                        <td style={{ width: '10%', textAlign: 'center' }}>
                            <JoyCheckbox
                                size="sm"
                                sx={{}}
                                name="workstation"
                            // checked={workstation}
                            // onchange={(e) => setworkstation(e.target.checked)}

                            />
                        </td>
                        <td style={{ width: '10%', textAlign: 'center' }}>
                            <JoyCheckbox
                                size="sm"
                                sx={{}}
                                name="workstation"
                            // checked={workstation}
                            // onchange={(e) => setworkstation(e.target.checked)}

                            />
                        </td>
                        <td style={{ width: '20%' }}><Typography level="title-md" sx={{ ml: 1 }}></Typography> </td>
                        <td style={{ width: '10%', textAlign: 'center' }}>
                            <JoyCheckbox
                                size="sm"
                                sx={{}}
                                name="workstation"
                            // checked={workstation}
                            // onchange={(e) => setworkstation(e.target.checked)}

                            />
                        </td>
                        <td style={{ width: '10%', textAlign: 'center' }}>
                            <JoyCheckbox
                                size="sm"
                                sx={{}}
                                name="workstation"
                            // checked={workstation}
                            // onchange={(e) => setworkstation(e.target.checked)}

                            />
                        </td>
                        <td style={{ width: '20%' }}><Typography level="title-md" sx={{ ml: 1 }}></Typography> </td>
                    </tr>
                    <tr>
                        <td style={{ width: '20%' }}> <Typography level="title-md" sx={{ ml: 1 }}>C.Heart diseases</Typography></td>
                        <td style={{ width: '10%', textAlign: 'center' }}>
                            <JoyCheckbox
                                size="sm"
                                sx={{}}
                                name="workstation"
                            // checked={workstation}
                            // onchange={(e) => setworkstation(e.target.checked)}

                            />
                        </td>
                        <td style={{ width: '10%', textAlign: 'center' }}>
                            <JoyCheckbox
                                size="sm"
                                sx={{}}
                                name="workstation"
                            // checked={workstation}
                            // onchange={(e) => setworkstation(e.target.checked)}

                            />
                        </td>
                        <td style={{ width: '20%' }}><Typography level="title-md" sx={{ ml: 1 }}></Typography> </td>
                        <td style={{ width: '10%', textAlign: 'center' }}>
                            <JoyCheckbox
                                size="sm"
                                sx={{}}
                                name="workstation"
                            // checked={workstation}
                            // onchange={(e) => setworkstation(e.target.checked)}

                            />
                        </td>
                        <td style={{ width: '10%', textAlign: 'center' }}>
                            <JoyCheckbox
                                size="sm"
                                sx={{}}
                                name="workstation"
                            // checked={workstation}
                            // onchange={(e) => setworkstation(e.target.checked)}

                            />
                        </td>
                        <td style={{ width: '20%' }}><Typography level="title-md" sx={{ ml: 1 }}></Typography> </td>
                    </tr>
                    <tr>
                        <td style={{ width: '20%' }}> <Typography level="title-md" sx={{ ml: 1 }}>D.Respiratory Diseases</Typography></td>
                        <td style={{ width: '10%', textAlign: 'center' }}>
                            <JoyCheckbox
                                size="sm"
                                sx={{}}
                                name="workstation"
                            // checked={workstation}
                            // onchange={(e) => setworkstation(e.target.checked)}

                            />
                        </td>
                        <td style={{ width: '10%', textAlign: 'center' }}>
                            <JoyCheckbox
                                size="sm"
                                sx={{}}
                                name="workstation"
                            // checked={workstation}
                            // onchange={(e) => setworkstation(e.target.checked)}

                            />
                        </td>
                        <td style={{ width: '20%' }}><Typography level="title-md" sx={{ ml: 1 }}></Typography> </td>
                        <td style={{ width: '10%', textAlign: 'center' }}>
                            <JoyCheckbox
                                size="sm"
                                sx={{}}
                                name="workstation"
                            // checked={workstation}
                            // onchange={(e) => setworkstation(e.target.checked)}

                            />
                        </td>
                        <td style={{ width: '10%', textAlign: 'center' }}>
                            <JoyCheckbox
                                size="sm"
                                sx={{}}
                                name="workstation"
                            // checked={workstation}
                            // onchange={(e) => setworkstation(e.target.checked)}

                            />
                        </td>
                        <td style={{ width: '20%' }}><Typography level="title-md" sx={{ ml: 1 }}></Typography> </td>
                    </tr>
                    <tr>
                        <td style={{ width: '20%' }}> <Typography level="title-md" sx={{ ml: 1 }}>E.AIDS&apos;S </Typography></td>
                        <td style={{ width: '10%', textAlign: 'center' }}>
                            <JoyCheckbox
                                size="sm"
                                sx={{}}
                                name="workstation"
                            // checked={workstation}
                            // onchange={(e) => setworkstation(e.target.checked)}

                            />
                        </td>
                        <td style={{ width: '10%', textAlign: 'center' }}>
                            <JoyCheckbox
                                size="sm"
                                sx={{}}
                                name="workstation"
                            // checked={workstation}
                            // onchange={(e) => setworkstation(e.target.checked)}

                            />
                        </td>
                        <td style={{ width: '20%' }}><Typography level="title-md" sx={{ ml: 1 }}></Typography> </td>
                        <td style={{ width: '10%', textAlign: 'center' }}>
                            <JoyCheckbox
                                size="sm"
                                sx={{}}
                                name="workstation"
                            // checked={workstation}
                            // onchange={(e) => setworkstation(e.target.checked)}

                            />
                        </td>
                        <td style={{ width: '10%', textAlign: 'center' }}>
                            <JoyCheckbox
                                size="sm"
                                sx={{}}
                                name="workstation"
                            // checked={workstation}
                            // onchange={(e) => setworkstation(e.target.checked)}

                            />
                        </td>
                        <td style={{ width: '20%' }}><Typography level="title-md" sx={{ ml: 1 }}></Typography> </td>
                    </tr>
                    <tr>
                        <td style={{ width: '20%' }}> <Typography level="title-md" sx={{ ml: 1 }}>F.Hepatitis</Typography></td>
                        <td style={{ width: '10%', textAlign: 'center' }}>

                            <JoyCheckbox
                                size="sm"
                                sx={{}}
                                name="workstation"
                            // checked={workstation}
                            // onchange={(e) => setworkstation(e.target.checked)}

                            /> </td>
                        <td style={{ width: '10%', textAlign: 'center' }}>

                            <JoyCheckbox
                                size="sm"
                                sx={{}}
                                name="workstation"
                            // checked={workstation}
                            // onchange={(e) => setworkstation(e.target.checked)}

                            /> </td>
                        <td style={{ width: '20%' }}><Typography level="title-md" sx={{ ml: 1 }}></Typography> </td>
                        <td style={{ width: '10%', textAlign: 'center' }}>
                            <JoyCheckbox
                                size="sm"
                                sx={{}}
                                name="workstation"
                            // checked={workstation}
                            // onchange={(e) => setworkstation(e.target.checked)}

                            />
                        </td>
                        <td style={{ width: '10%', textAlign: 'center' }}>
                            <JoyCheckbox
                                size="sm"
                                sx={{}}
                                name="workstation"
                            // checked={workstation}
                            // onchange={(e) => setworkstation(e.target.checked)}

                            />
                        </td>
                        <td style={{ width: '20%' }}><Typography level="title-md" sx={{ ml: 1 }}></Typography> </td>
                    </tr>
                    <tr>
                        <td style={{ width: '20%' }}> <Typography level="title-md" sx={{ ml: 1 }}>G.Chickenpox</Typography></td>
                        <td style={{ width: '10%', textAlign: 'center' }}>
                            <JoyCheckbox
                                size="sm"
                                sx={{}}
                                name="workstation"
                            // checked={workstation}
                            // onchange={(e) => setworkstation(e.target.checked)}

                            />
                        </td>
                        <td style={{ width: '10%', textAlign: 'center' }}>
                            <JoyCheckbox
                                size="sm"
                                sx={{}}
                                name="workstation"
                            // checked={workstation}
                            // onchange={(e) => setworkstation(e.target.checked)}

                            />
                        </td>
                        <td style={{ width: '20%' }}><Typography level="title-md" sx={{ ml: 1 }}></Typography> </td>
                        <td style={{ width: '10%', textAlign: 'center' }}>
                            <JoyCheckbox
                                size="sm"
                                sx={{}}
                                name="workstation"
                            // checked={workstation}
                            // onchange={(e) => setworkstation(e.target.checked)}

                            />
                        </td>
                        <td style={{ width: '10%', textAlign: 'center' }}>
                            <JoyCheckbox
                                size="sm"
                                sx={{}}
                                name="workstation"
                            // checked={workstation}
                            // onchange={(e) => setworkstation(e.target.checked)}

                            />
                        </td>
                        <td style={{ width: '20%' }}><Typography level="title-md" sx={{ ml: 1 }}></Typography> </td>
                    </tr>
                    <tr>
                        <td style={{ width: '20%' }}> <Typography level="title-md" sx={{ ml: 1 }}>H.Other communicable diseases </Typography></td>
                        <td style={{ width: '10%', textAlign: 'center' }}>
                            <JoyCheckbox
                                size="sm"
                                sx={{}}
                                name="workstation"
                            // checked={workstation}
                            // onchange={(e) => setworkstation(e.target.checked)}

                            />
                        </td>
                        <td style={{ width: '10%', textAlign: 'center' }}>
                            <JoyCheckbox
                                size="sm"
                                sx={{}}
                                name="workstation"
                            // checked={workstation}
                            // onchange={(e) => setworkstation(e.target.checked)}

                            />
                        </td>
                        <td style={{ width: '20%' }}><Typography level="title-md" sx={{ ml: 1 }}></Typography> </td>
                        <td style={{ width: '10%', textAlign: 'center' }}>
                            <JoyCheckbox
                                size="sm"
                                sx={{}}
                                name="workstation"
                            // checked={workstation}
                            // onchange={(e) => setworkstation(e.target.checked)}

                            />
                        </td>
                        <td style={{ width: '10%', textAlign: 'center' }}>
                            <JoyCheckbox
                                size="sm"
                                sx={{}}
                                name="workstation"
                            // checked={workstation}
                            // onchange={(e) => setworkstation(e.target.checked)}

                            />
                        </td>
                        <td style={{ width: '20%' }}><Typography level="title-md" sx={{ ml: 1 }}></Typography> </td>
                    </tr>
                    <tr>
                        <td style={{ width: '20%' }}> <Typography level="title-md" sx={{ ml: 1 }}>I.Allergy </Typography></td>
                        <td style={{ width: '10%', textAlign: 'center' }}>
                            <JoyCheckbox
                                size="sm"
                                sx={{}}
                                name="workstation"
                            // checked={workstation}
                            // onchange={(e) => setworkstation(e.target.checked)}

                            />
                        </td>
                        <td style={{ width: '10%', textAlign: 'center' }}>
                            <JoyCheckbox
                                size="sm"
                                sx={{}}
                                name="workstation"
                            // checked={workstation}
                            // onchange={(e) => setworkstation(e.target.checked)}

                            />
                        </td>
                        <td style={{ width: '20%' }}><Typography level="title-md" sx={{ ml: 1 }}></Typography> </td>
                        <td style={{ width: '10%', textAlign: 'center' }}>
                            <JoyCheckbox
                                size="sm"
                                sx={{}}
                                name="workstation"
                            // checked={workstation}
                            // onchange={(e) => setworkstation(e.target.checked)}

                            /> </td>
                        <td style={{ width: '10%', textAlign: 'center' }}>
                            <JoyCheckbox
                                size="sm"
                                sx={{}}
                                name="workstation"
                            // checked={workstation}
                            // onchange={(e) => setworkstation(e.target.checked)}

                            /> </td>
                        <td style={{ width: '20%' }}><Typography level="title-md" sx={{ ml: 1 }}></Typography> </td>
                    </tr>
                    <tr>
                        <td style={{ width: '20%' }}> <Typography level="title-md" sx={{ ml: 1 }}>J.Other</Typography></td>
                        <td style={{ width: '10%', textAlign: 'center' }}>
                            <JoyCheckbox
                                size="sm"
                                sx={{}}
                                name="workstation"
                            // checked={workstation}
                            // onchange={(e) => setworkstation(e.target.checked)}

                            />
                        </td>
                        <td style={{ width: '10%', textAlign: 'center' }}>
                            <JoyCheckbox
                                size="sm"
                                sx={{}}
                                name="workstation"
                            // checked={workstation}
                            // onchange={(e) => setworkstation(e.target.checked)}

                            />
                        </td>
                        <td style={{ width: '20%' }}><Typography level="title-md" sx={{ ml: 1 }}></Typography> </td>
                        <td style={{ width: '10%', textAlign: 'center' }}>
                            <JoyCheckbox
                                size="sm"
                                sx={{}}
                                name="workstation"
                            // checked={workstation}
                            // onchange={(e) => setworkstation(e.target.checked)}

                            />
                        </td>
                        <td style={{ width: '10%', textAlign: 'center' }}>
                            <JoyCheckbox
                                size="sm"
                                sx={{}}
                                name="workstation"
                            // checked={workstation}
                            // onchange={(e) => setworkstation(e.target.checked)}

                            />
                        </td>
                        <td style={{ width: '20%' }}><Typography level="title-md" sx={{ ml: 1 }}></Typography> </td>
                    </tr>
                </tbody>
            </Table>
            <AnnualHealthDetails />
        </Box>
    )
}

export default memo(AnnualHealthHistory)