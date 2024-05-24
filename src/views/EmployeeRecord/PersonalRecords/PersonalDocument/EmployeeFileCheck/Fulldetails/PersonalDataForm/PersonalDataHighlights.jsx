import React, { memo } from 'react'
import CustmTypog from 'src/views/Component/MuiCustomComponent/CustmTypog'
import { TableContainer } from '@mui/material';
import { Box, Table, Typography } from '@mui/joy';
import moment from 'moment';

const PersonalDataHighlights = ({ HighData, Empdata }) => {
    return (
        <>
            <CustmTypog title={"Professional Highlights"} />
            <TableContainer sx={{ mt: 1 }}>
                <Table aria-label="basic table" borderAxis="both" size='sm'>
                    <tbody >
                        <tr sx={{ p: 0 }}>
                            <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '50%' }}>
                                <Typography level="title-md" sx={{ ml: 1 }}> Details of Assignment Handled </Typography>
                            </td>
                            <td padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                <Typography level="title-md" sx={{ ml: 1 }}>Key result areas archieved </Typography>
                            </td>
                        </tr>
                        <tr sx={{ p: 0 }}>
                            <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '50%' }}>
                                <Typography level="title-md" sx={{ ml: 1 }}>{HighData?.Details_of_Assignment === "" ? "Not Updated" : HighData?.Details_of_Assignment} </Typography>
                            </td>
                            <td padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                <Typography level="title-md" sx={{ ml: 1 }}>{HighData?.Key_result_areas === "" ? "Not Updated" : HighData?.Key_result_areas} </Typography>
                            </td>
                        </tr>

                    </tbody>
                </Table>
                <CustmTypog title={"Present Salary Package"} />
                <Table aria-label="basic table" borderAxis="both" size='sm'>
                    <tbody >
                        <tr sx={{ p: 0 }}>
                            <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '50%' }}>
                                <Typography level="title-md" sx={{ ml: 1 }}> Current </Typography>
                            </td>
                            <td padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                <Typography level="title-md" sx={{ ml: 1 }}>{HighData?.Current_salary === "" ? "Not Updated" : HighData?.Current_salary}  </Typography>
                            </td>
                        </tr>
                        <tr sx={{ p: 0 }}>
                            <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '50%' }}>
                                <Typography level="title-md" sx={{ ml: 1 }}> Other </Typography>
                            </td>
                            <td padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                <Typography level="title-md" sx={{ ml: 1 }}>{HighData?.Others === "" ? "Not Updated" : HighData?.Others} </Typography>
                            </td>
                        </tr>
                        <tr sx={{ p: 0 }}>
                            <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '50%' }}>
                                <Typography level="title-md" sx={{ ml: 1 }}> Expected Monthly Salary </Typography>
                            </td>
                            <td padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                <Typography level="title-md" sx={{ ml: 1 }}>{HighData?.Expected_Monthly_Salary === "" ? "Not Updated" : HighData?.Expected_Monthly_Salary} </Typography>
                            </td>
                        </tr>
                        <tr sx={{ p: 0 }}>
                            <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '50%' }}>
                                <Typography level="title-md" sx={{ ml: 1 }}> Time required to Join </Typography>
                            </td>
                            <td padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                <Typography level="title-md" sx={{ ml: 1 }}> {moment(HighData?.required_to_Join_date).format('DD-MM-YYYY')}</Typography>
                            </td>
                        </tr>


                    </tbody>
                </Table>


                <Box sx={{ mt: 1 }}>
                    <CustmTypog title={"Career Goals"} />
                    <Typography level="title-md" sx={{ ml: 1 }}>{HighData?.Career_Goals === "" ? "Not Updated" : HighData?.Career_Goals}</Typography>
                </Box>
                <Box sx={{ mt: 1 }}>
                    <CustmTypog title={"Interests/Hobbies"} />
                    <Typography level="title-md" sx={{ ml: 1 }}>{HighData?.Interests_Hobbies === "" ? "Not Updated" : HighData?.Interests_Hobbies}</Typography>
                </Box>
                <Box sx={{ mt: 1 }}>
                    <CustmTypog title={"Any other skill set /activities important to selection which have not been highlighted above "} />
                    <Typography level="title-md" sx={{ ml: 1 }}>{HighData?.skills === "" ? "Not Updated" : HighData?.skills}</Typography>
                </Box>
                <Box sx={{ mt: 1 }}>
                    <CustmTypog title={"Request/Demands"} />
                    <Typography level="title-md" sx={{ ml: 1 }}>{HighData?.Demands === "" ? "Not Updated" : HighData?.Demands}</Typography>
                </Box>

                <Box sx={{ mt: 1 }}>
                    <CustmTypog title={"Declaration"} />
                    <Typography level="title-md" sx={{ ml: 1 }}>I hereby declare that the information given above are true and correct to the best of my knowledge and belief .I agree if this information is found to be incorrect/false the company is free to terminate my contract/services.
                    </Typography>
                </Box>
                <Table aria-label="basic table" borderAxis="both" size='sm'>
                    <tbody >
                        <tr sx={{ p: 0 }}>
                            <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '50%' }}>
                                <Typography level="title-md" sx={{ ml: 1 }}> Date </Typography>
                            </td>
                            <td padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                <Typography level="title-md" sx={{ ml: 1 }}> Signature</Typography>
                            </td>
                        </tr>
                        <tr sx={{ p: 0 }}>
                            <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '50%' }}>
                                <Typography level="title-md" sx={{ ml: 1 }}>{moment(HighData?.personal_data_save).format('DD-MM-YYYY')}</Typography>
                            </td>
                            <td padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                <Typography level="title-md" sx={{ ml: 1 }}>{Empdata?.em_name === '' ? "Not Updated" : Empdata?.em_name}</Typography>
                            </td>
                        </tr>

                    </tbody>
                </Table>

            </TableContainer>
        </>
    )
}

export default memo(PersonalDataHighlights) 