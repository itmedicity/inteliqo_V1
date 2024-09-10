import { Box, Table, Typography } from '@mui/joy'
import React, { memo } from 'react'
import JoyCheckbox from 'src/views/MuiComponents/JoyComponent/JoyCheckbox';

const HealthCheckupExam = () => {
    return (
        <Box>
            <Typography level="title-md" sx={{ mt: 1 }}>
                General Examininations
            </Typography>

            <Table aria-label="basic table" borderAxis="both" size='sm' variant="outlined">
                <tbody>
                    <tr>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}> </Typography></td>
                    </tr>
                </tbody>
            </Table>
            <Typography level="title-md" sx={{ mt: 1 }}>
                Fitness Certificate
            </Typography>

            <Table aria-label="basic table" borderAxis="both" size='sm' variant="outlined">
                <tbody>
                    <tr>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>
                            Mr./Miss./Mrs.............., age ............. years, has been carefully examined by me and with the supportive evidences of the test results. I am here
                            by recommending to accept/not accept ,him for the prescribed job of ............, at Travancore Medical College Hospital,(Medicity).
                        </Typography></td>
                    </tr>
                </tbody>
            </Table>
            <Table aria-label="basic table" borderAxis="both" size='sm' variant="outlined">
                <tbody>
                    <tr>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>
                            Consultant Name
                        </Typography></td>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>

                        </Typography></td>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>
                            Date
                        </Typography></td>
                    </tr>
                    <tr>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>
                            Consultant Signature
                        </Typography></td>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>

                        </Typography></td>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>
                            Time
                        </Typography></td>
                    </tr>
                </tbody>
            </Table>
            <Typography level="title-md" sx={{ mt: 1 }}>
                For the use of HR office only
            </Typography>
            <Table aria-label="basic table" borderAxis="both" size='sm' variant="outlined">
                <tbody>
                    <tr>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>
                            Mr./Miss./Mrs.............., age ............. years,has submitted the supportive evidence of the test reults ,vaccination details and these are
                            verified by HR Department .Hereby from HRD allowing him/her to join/not join/pending to take decision for the prescribed job of ......, at Travancore Medical Colege
                            Hosptial(Medicity).
                        </Typography></td>
                    </tr>
                </tbody>
            </Table>
            <Table aria-label="basic table" borderAxis="both" size='sm' variant="outlined">
                <tbody>
                    <tr>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>
                            Name of the staff
                        </Typography></td>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>
                            Empl.ID
                        </Typography></td>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>
                            Signature
                        </Typography></td>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>
                            Date
                        </Typography></td>
                    </tr>
                    <tr>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>

                        </Typography></td>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>

                        </Typography></td>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>

                        </Typography></td>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>

                        </Typography></td>
                    </tr>
                </tbody>
            </Table>
        </Box>
    )
}

export default HealthCheckupExam