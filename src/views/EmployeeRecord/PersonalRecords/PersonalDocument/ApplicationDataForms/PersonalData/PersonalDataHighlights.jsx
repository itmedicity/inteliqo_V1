import React, { memo } from 'react'
import CustmTypog from 'src/views/Component/MuiCustomComponent/CustmTypog'
import { Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import { Box, Typography } from '@mui/joy';
import InputComponent from 'src/views/MuiComponents/JoyComponent/InputComponent';

const PersonalDataHighlights = ({ Empdata, HighData, HighLightSettings }) => {
    const { assignment,
        archieved,
        Current,
        Others,
        MonthlySalary,
        requiredtoJoin,
        CareerGoals,
        Hobbies,
        skill,
        Demands,
        datesaved
    } = HighData
    return (
        <>
            <CustmTypog title={"Professional Highlights"} />
            <TableContainer sx={{}}>
                <Table sx={{ mt: 1, p: 0, border: '1px solid #e0e0e0', width: '100%' }}>
                    <TableBody >
                        <TableRow sx={{ p: 0 }}>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '50%' }}>
                                <Typography level="title-md" sx={{ ml: 1 }}> Details of Assignment Handled </Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                <Typography level="title-md" sx={{ ml: 1 }}>Key result areas archieved </Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow sx={{ p: 0 }}>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '50%' }}>
                                <InputComponent
                                    // placeholder={'other'}
                                    type=""
                                    size="sm"
                                    name="assignment"
                                    value={assignment}
                                    onchange={(e) => HighLightSettings(e)}
                                />

                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                <InputComponent
                                    // placeholder={'other'}
                                    type="text"
                                    size="sm"
                                    name="archieved"
                                    value={archieved}
                                    onchange={(e) => HighLightSettings(e)}
                                />
                            </TableCell>
                        </TableRow>

                    </TableBody>
                </Table>
                <CustmTypog title={"Present Salary Package"} />
                <Table sx={{ mt: 1, p: 0, border: '1px solid #e0e0e0', width: '100%' }}>
                    <TableBody >



                        <TableRow sx={{ p: 0 }}>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '50%' }}>
                                <Typography level="title-md" sx={{ ml: 1 }}>Current</Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                <InputComponent
                                    // placeholder={'other'}
                                    type="text"
                                    size="sm"
                                    name="Current"
                                    value={Current}
                                    onchange={(e) => HighLightSettings(e)}
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow sx={{ p: 0 }}>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '50%' }}>
                                <Typography level="title-md" sx={{ ml: 1 }}> Others </Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                <InputComponent
                                    // placeholder={'other'}
                                    type="text"
                                    size="sm"
                                    name="Others"
                                    value={Others}
                                    onchange={(e) => HighLightSettings(e)}
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow sx={{ p: 0 }}>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '50%' }}>
                                <Typography level="title-md" sx={{ ml: 1 }}> Expected Monthly Salary </Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                <InputComponent
                                    // placeholder={'other'}
                                    type="text"
                                    size="sm"
                                    name="MonthlySalary"
                                    value={MonthlySalary}
                                    onchange={(e) => HighLightSettings(e)}
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow sx={{ p: 0 }}>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '50%' }}>
                                <Typography level="title-md" sx={{ ml: 1 }}>Time required to Join </Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                <InputComponent
                                    type="date"
                                    size="sm"
                                    name="requiredtoJoin"
                                    value={requiredtoJoin}
                                    onchange={(e) => HighLightSettings(e)}
                                />
                                {/* <InputComponent
                                    // placeholder={'other'}
                                    type="text"
                                    size="sm"
                                    name="requiredtoJoin"
                                    value={requiredtoJoin}
                                    onchange={(e) => HighLightSettings(e)}
                                /> */}
                            </TableCell>
                        </TableRow>

                    </TableBody>
                </Table>

                <Box sx={{ mt: 1 }}>
                    <CustmTypog title={"Career Goals"} />
                    <InputComponent
                        // placeholder={'other'}
                        type="text"
                        size="sm"
                        name="CareerGoals"
                        value={CareerGoals}
                        onchange={(e) => HighLightSettings(e)}
                    />
                </Box>
                <Box sx={{ mt: 1 }}>
                    <CustmTypog title={"Interests/Hobbies"} />
                    <InputComponent
                        // placeholder={'other'}
                        type="text"
                        size="sm"
                        name="Hobbies"
                        value={Hobbies}
                        onchange={(e) => HighLightSettings(e)}
                    />
                </Box>
                <Box sx={{ mt: 1 }}>
                    <CustmTypog title={"Any other skill set /activities important to selection which have not been highlighted above "} />
                    <InputComponent
                        // placeholder={'other'}
                        type="text"
                        size="sm"
                        name="skill"
                        value={skill}
                        onchange={(e) => HighLightSettings(e)}
                    />
                </Box>
                <Box sx={{ mt: 1 }}>
                    <CustmTypog title={"Request/Demands"} />
                    <InputComponent
                        // placeholder={'other'}
                        type="text"
                        size="sm"
                        name="Demands"
                        value={Demands}
                        onchange={(e) => HighLightSettings(e)}
                    />
                </Box>

                <Box sx={{ mt: 1 }}>
                    <CustmTypog title={"Declaration"} />
                    <Typography level="title-md" sx={{ ml: 1 }}>I hereby declare that the information given above are true and correct to the best of my knowledge and belief .I agree if this information is found to be incorrect/false the company is free to terminate my contract/services.
                    </Typography>
                </Box>
                <Table sx={{ mt: 1, p: 0, border: '1px solid #e0e0e0', width: '100%' }}>
                    <TableBody >
                        <TableRow sx={{ p: 0 }}>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '50%' }}>
                                <Typography level="title-md" sx={{ ml: 1 }}> Date </Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                <Typography level="title-md" sx={{ ml: 1 }}> Signature</Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow sx={{ p: 0 }}>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '50%' }}>
                                <InputComponent
                                    // placeholder={'other'}
                                    type="date"
                                    size="sm"
                                    name="datesaved"
                                    value={datesaved}
                                    onchange={(e) => HighLightSettings(e)}
                                />
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                <Typography sx={{ ml: 1 }}>{Empdata?.em_name === '' ? "Not Updated" : Empdata?.em_name} </Typography>

                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>

        </>
    )
}

export default memo(PersonalDataHighlights)