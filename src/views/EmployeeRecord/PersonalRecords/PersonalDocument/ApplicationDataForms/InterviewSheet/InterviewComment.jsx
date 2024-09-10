import { Box, Table, Typography } from '@mui/joy'
import React, { memo } from 'react'
import JoyCheckbox from 'src/views/MuiComponents/JoyComponent/JoyCheckbox';

const InterviewComment = ({ markdata }) => {
    return (
        <Box>
            <Typography level="title-md" sx={{ mt: 1 }}>
                Comments Of Hr
            </Typography>
            <Table aria-label="basic table" borderAxis="both" size='sm' variant="outlined">

                <tbody>
                    <tr>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>{markdata?.Hr_remark === '' ? "Not Updated" : markdata?.Hr_remark} </Typography></td>

                    </tr>

                </tbody>
            </Table>
            <Table aria-label="basic table" borderAxis="both" size='sm' variant="outlined">

                <tbody>
                    <tr>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>Name</Typography></td>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}> </Typography></td>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>Signature </Typography></td>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}> </Typography></td>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>Date </Typography></td>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}> </Typography></td>
                    </tr>

                </tbody>
            </Table>
            <Typography level="title-md" sx={{ mt: 1 }}>
                Comments Of Incharge
            </Typography>
            <Table aria-label="basic table" borderAxis="both" size='sm' variant="outlined">

                <tbody>
                    <tr>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}> {markdata?.incharge_remark === '' ? "Not Updated" : markdata?.incharge_remark} </Typography></td>

                    </tr>

                </tbody>
            </Table>
            <Table aria-label="basic table" borderAxis="both" size='sm' variant="outlined">

                <tbody>
                    <tr>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>Name</Typography></td>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}> </Typography></td>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>Signature </Typography></td>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}> </Typography></td>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>Date </Typography></td>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}> </Typography></td>
                    </tr>

                </tbody>
            </Table>
            <Typography level="title-md" sx={{ mt: 1 }}>
                Comments Of HOD
            </Typography>
            <Table aria-label="basic table" borderAxis="both" size='sm' variant="outlined">

                <tbody>
                    <tr>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>{markdata?.hod_remark === '' ? "Not Updated" : markdata?.hod_remark}  </Typography></td>

                    </tr>

                </tbody>
            </Table>
            <Table aria-label="basic table" borderAxis="both" size='sm' variant="outlined">

                <tbody>
                    <tr>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>Name</Typography></td>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}> </Typography></td>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>Signature </Typography></td>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}> </Typography></td>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>Date </Typography></td>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}> </Typography></td>
                    </tr>

                </tbody>
            </Table>
            <Typography level="title-md" sx={{ mt: 1 }}>
                Comments Of MS
            </Typography>
            <Table aria-label="basic table" borderAxis="both" size='sm' variant="outlined">

                <tbody>
                    <tr>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>{markdata?.ms_remark === '' ? "Not Updated" : markdata?.ms_remark}  </Typography></td>

                    </tr>

                </tbody>
            </Table>
            <Table aria-label="basic table" borderAxis="both" size='sm' variant="outlined">

                <tbody>
                    <tr>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>Name</Typography></td>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}> </Typography></td>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>Signature </Typography></td>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}> </Typography></td>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>Date </Typography></td>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}> </Typography></td>
                    </tr>

                </tbody>
            </Table>
            <Typography level="title-md" sx={{ mt: 1 }}>
                Comments Of DMS
            </Typography>
            <Table aria-label="basic table" borderAxis="both" size='sm' variant="outlined">

                <tbody>
                    <tr>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>{markdata?.dms_remark === '' ? "Not Updated" : markdata?.dms_remark}  </Typography></td>

                    </tr>

                </tbody>
            </Table>
            <Table aria-label="basic table" borderAxis="both" size='sm' variant="outlined">

                <tbody>
                    <tr>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>Name</Typography></td>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}> </Typography></td>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>Signature </Typography></td>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}> </Typography></td>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>Date </Typography></td>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}> </Typography></td>
                    </tr>

                </tbody>
            </Table>
            <Typography level="title-md" sx={{ mt: 1 }}>
                Comments Of Operation
            </Typography>
            <Table aria-label="basic table" borderAxis="both" size='sm' variant="outlined">

                <tbody>
                    <tr>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>{markdata?.operation_remark === '' ? "Not Updated" : markdata?.operation_remark}  </Typography></td>

                    </tr>

                </tbody>
            </Table>
            <Table aria-label="basic table" borderAxis="both" size='sm' variant="outlined">

                <tbody>
                    <tr>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>Name</Typography></td>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}> </Typography></td>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>Signature </Typography></td>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}> </Typography></td>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>Date </Typography></td>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}> </Typography></td>
                    </tr>

                </tbody>
            </Table>
            <Typography level="title-md" sx={{ mt: 1 }}>
                Comments Of Ceo
            </Typography>
            <Table aria-label="basic table" borderAxis="both" size='sm' variant="outlined">

                <tbody>
                    <tr>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>{markdata?.ceo_remark === '' ? "Not Updated" : markdata?.ceo_remark}  </Typography></td>

                    </tr>

                </tbody>
            </Table>
            <Table aria-label="basic table" borderAxis="both" size='sm' variant="outlined">

                <tbody>
                    <tr>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>Name</Typography></td>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}> </Typography></td>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>Signature </Typography></td>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}> </Typography></td>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>Date </Typography></td>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}> </Typography></td>
                    </tr>

                </tbody>
            </Table>
            <Typography level="title-md" sx={{ mt: 1 }}>
                Comments Of Executive Director/Medical Director:
            </Typography>
            <Table aria-label="basic table" borderAxis="both" size='sm' variant="outlined">
                <tbody>
                    <tr>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>{markdata?.incharge_remark === '' ? "Not Updated" : markdata?.incharge_remark}  </Typography></td>
                    </tr>
                </tbody>
            </Table>
            <Table aria-label="basic table" borderAxis="both" size='sm' variant="outlined">
                <tbody>
                    <tr>
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
                                    <Typography level="title-md" sx={{ ml: 2, textAlign: "center" }}>On Hold</Typography>
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
                                    <Typography level="title-md" sx={{ ml: 2, textAlign: "center" }}>Selected</Typography>
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
                                    <Typography level="title-md" sx={{ ml: 2, textAlign: "center" }}>On Rejected</Typography>
                                </Box>
                            </Box>
                        </td>

                    </tr>

                </tbody>
            </Table>
            <Table aria-label="basic table" borderAxis="both" size='sm' variant="outlined" sx={{ mt: 1 }}>
                <tbody>
                    <tr>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>Name</Typography></td>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}> </Typography></td>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>Signature </Typography></td>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}> </Typography></td>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>Date </Typography></td>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}> </Typography></td>
                    </tr>

                </tbody>
            </Table>
        </Box>
    )
}

export default memo(InterviewComment)