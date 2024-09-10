import { Box, Typography } from '@mui/joy'
import React, { lazy, memo } from 'react'
import CustmTypog from 'src/views/Component/MuiCustomComponent/CustmTypog'
import { Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import JoyCheckbox from 'src/views/MuiComponents/JoyComponent/JoyCheckbox';

const AnnualHealthVacc = lazy(() => import('./AnnualHealthVacc'))


const AnnualHealthIllnes = () => {
    return (
        <Box>
            <CustmTypog title='History Of Illness' />
            <Box sx={{ ml: 1, mt: 1 }}>
                <Typography level="title-md">. Read the following carefully</Typography>
                <Typography level="title-md">. Tick appropriately</Typography>
                <Typography level="title-md">. Mention the required information as accordingly</Typography>
            </Box>
            <TableContainer sx={{ mt: 2 }}>

                <Table sx={{ mt: 1, p: 0, border: '1px solid #e0e0e0', width: '100%' }}>
                    <TableBody >
                        <TableRow sx={{ p: 0 }}>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                                <Typography level="title-md" sx={{ ml: 1 }}>1.Do you have any history of the following </Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                                <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}>Yes  </Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }}>
                                <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}>No </Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                                <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}>If yes,How long/When ? </Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                                <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}>Still on treatment </Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                                <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}>Not on  treatment</Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                                <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}>If still on treatment , specify the medications.</Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow sx={{ p: 0 }}>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                                <Typography level="title-md" sx={{ ml: 1 }}>A.Diabetes </Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                                <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}>
                                    <JoyCheckbox
                                        sx={{}}
                                        name="workstation"
                                    // checked={workstation}
                                    // onchange={(e) => setworkstation(e.target.checked)}

                                    />
                                </Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }}>
                                <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}>
                                    <JoyCheckbox
                                        sx={{}}
                                        name="workstation"
                                    // checked={workstation}
                                    // onchange={(e) => setworkstation(e.target.checked)}

                                    />
                                </Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                                <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}> </Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                                <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}>
                                    <JoyCheckbox
                                        sx={{}}
                                        name="workstation"
                                    // checked={workstation}
                                    // onchange={(e) => setworkstation(e.target.checked)}

                                    />
                                </Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                                <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}>
                                    <JoyCheckbox
                                        sx={{}}
                                        name="workstation"
                                    // checked={workstation}
                                    // onchange={(e) => setworkstation(e.target.checked)}

                                    /></Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                                <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}> </Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow sx={{ p: 0 }}>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                                <Typography level="title-md" sx={{ ml: 1 }}>B.Hypertension </Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                                <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}>
                                    <JoyCheckbox
                                        sx={{}}
                                        name="workstation"
                                    // checked={workstation}
                                    // onchange={(e) => setworkstation(e.target.checked)}

                                    />
                                </Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }}>
                                <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}>
                                    <JoyCheckbox
                                        sx={{}}
                                        name="workstation"
                                    // checked={workstation}
                                    // onchange={(e) => setworkstation(e.target.checked)}

                                    />
                                </Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                                <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}> </Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                                <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}>
                                    <JoyCheckbox
                                        sx={{}}
                                        name="workstation"
                                    // checked={workstation}
                                    // onchange={(e) => setworkstation(e.target.checked)}

                                    />
                                </Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                                <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}>
                                    <JoyCheckbox
                                        sx={{}}
                                        name="workstation"
                                    // checked={workstation}
                                    // onchange={(e) => setworkstation(e.target.checked)}

                                    /></Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                                <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}> </Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow sx={{ p: 0 }}>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                                <Typography level="title-md" sx={{ ml: 1 }}>C.Heart diseases </Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                                <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}>
                                    <JoyCheckbox
                                        sx={{}}
                                        name="workstation"
                                    // checked={workstation}
                                    // onchange={(e) => setworkstation(e.target.checked)}

                                    />
                                </Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }}>
                                <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}>
                                    <JoyCheckbox
                                        sx={{}}
                                        name="workstation"
                                    // checked={workstation}
                                    // onchange={(e) => setworkstation(e.target.checked)}

                                    />
                                </Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                                <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}> </Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                                <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}>
                                    <JoyCheckbox
                                        sx={{}}
                                        name="workstation"
                                    // checked={workstation}
                                    // onchange={(e) => setworkstation(e.target.checked)}

                                    />
                                </Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                                <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}>
                                    <JoyCheckbox
                                        sx={{}}
                                        name="workstation"
                                    // checked={workstation}
                                    // onchange={(e) => setworkstation(e.target.checked)}

                                    /></Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                                <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}> </Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow sx={{ p: 0 }}>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                                <Typography level="title-md" sx={{ ml: 1 }}>D.Respiratory Diseases </Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                                <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}>
                                    <JoyCheckbox
                                        sx={{}}
                                        name="workstation"
                                    // checked={workstation}
                                    // onchange={(e) => setworkstation(e.target.checked)}

                                    />
                                </Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }}>
                                <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}>
                                    <JoyCheckbox
                                        sx={{}}
                                        name="workstation"
                                    // checked={workstation}
                                    // onchange={(e) => setworkstation(e.target.checked)}

                                    />
                                </Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                                <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}> </Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                                <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}>
                                    <JoyCheckbox
                                        sx={{}}
                                        name="workstation"
                                    // checked={workstation}
                                    // onchange={(e) => setworkstation(e.target.checked)}

                                    />
                                </Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                                <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}>
                                    <JoyCheckbox
                                        sx={{}}
                                        name="workstation"
                                    // checked={workstation}
                                    // onchange={(e) => setworkstation(e.target.checked)}

                                    /></Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                                <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}> </Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow sx={{ p: 0 }}>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                                <Typography level="title-md" sx={{ ml: 1 }}>E.AIDS&apos;S </Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                                <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}>
                                    <JoyCheckbox
                                        sx={{}}
                                        name="workstation"
                                    // checked={workstation}
                                    // onchange={(e) => setworkstation(e.target.checked)}

                                    />
                                </Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }}>
                                <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}>
                                    <JoyCheckbox
                                        sx={{}}
                                        name="workstation"
                                    // checked={workstation}
                                    // onchange={(e) => setworkstation(e.target.checked)}

                                    />
                                </Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                                <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}> </Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                                <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}>
                                    <JoyCheckbox
                                        sx={{}}
                                        name="workstation"
                                    // checked={workstation}
                                    // onchange={(e) => setworkstation(e.target.checked)}

                                    />
                                </Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                                <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}>
                                    <JoyCheckbox
                                        sx={{}}
                                        name="workstation"
                                    // checked={workstation}
                                    // onchange={(e) => setworkstation(e.target.checked)}

                                    /></Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                                <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}> </Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow sx={{ p: 0 }}>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                                <Typography level="title-md" sx={{ ml: 1 }}>F.Hepatitis </Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                                <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}>
                                    <JoyCheckbox
                                        sx={{}}
                                        name="workstation"
                                    // checked={workstation}
                                    // onchange={(e) => setworkstation(e.target.checked)}

                                    />
                                </Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }}>
                                <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}>
                                    <JoyCheckbox
                                        sx={{}}
                                        name="workstation"
                                    // checked={workstation}
                                    // onchange={(e) => setworkstation(e.target.checked)}

                                    />
                                </Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                                <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}> </Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                                <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}>
                                    <JoyCheckbox
                                        sx={{}}
                                        name="workstation"
                                    // checked={workstation}
                                    // onchange={(e) => setworkstation(e.target.checked)}

                                    />
                                </Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                                <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}>
                                    <JoyCheckbox
                                        sx={{}}
                                        name="workstation"
                                    // checked={workstation}
                                    // onchange={(e) => setworkstation(e.target.checked)}

                                    /></Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                                <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}> </Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow sx={{ p: 0 }}>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                                <Typography level="title-md" sx={{ ml: 1 }}>G.Chickenpox </Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                                <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}>
                                    <JoyCheckbox
                                        sx={{}}
                                        name="workstation"
                                    // checked={workstation}
                                    // onchange={(e) => setworkstation(e.target.checked)}

                                    />
                                </Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }}>
                                <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}>
                                    <JoyCheckbox
                                        sx={{}}
                                        name="workstation"
                                    // checked={workstation}
                                    // onchange={(e) => setworkstation(e.target.checked)}

                                    />
                                </Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                                <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}> </Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                                <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}>
                                    <JoyCheckbox
                                        sx={{}}
                                        name="workstation"
                                    // checked={workstation}
                                    // onchange={(e) => setworkstation(e.target.checked)}

                                    />
                                </Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                                <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}>
                                    <JoyCheckbox
                                        sx={{}}
                                        name="workstation"
                                    // checked={workstation}
                                    // onchange={(e) => setworkstation(e.target.checked)}

                                    /></Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                                <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}> </Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow sx={{ p: 0 }}>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                                <Typography level="title-md" sx={{ ml: 1 }}>H.Other communicable diseases </Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                                <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}>  </Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }}>
                                <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}> </Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                                <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}>  </Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                                <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}>  </Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                                <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}>  </Typography>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                <Table>
                    <TableBody >
                        <TableRow sx={{ p: 0 }}>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '5%' }} >
                                <Typography level="title-md" sx={{ ml: 1 }}>I.Allergy </Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '25%' }} >
                                <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}>  </Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                                <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}>  </Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }}>
                                <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}> </Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                                <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}>  </Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                                <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}>  </Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow sx={{ p: 0 }}>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '5%' }} >
                                <Typography level="title-md" sx={{ ml: 1 }}>J.Other </Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '25%' }} >
                                <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}>  </Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                                <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}>  </Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }}>
                                <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}> </Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                                <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}>  </Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                                <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}>  </Typography>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                <AnnualHealthVacc />
            </TableContainer>

        </Box>
    )
}

export default memo(AnnualHealthIllnes) 