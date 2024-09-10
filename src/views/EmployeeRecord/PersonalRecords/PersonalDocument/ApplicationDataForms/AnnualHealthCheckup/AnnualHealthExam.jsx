import { Box, Table, Typography } from '@mui/joy'
import moment from 'moment'
import React, { memo, useState } from 'react'
import JoyCheckbox from 'src/views/MuiComponents/JoyComponent/JoyCheckbox'
import JoyHrd from 'src/views/MuiComponents/JoyComponent/JoyHrd'
import JoyInput from 'src/views/MuiComponents/JoyComponent/JoyInput'

const AnnualHealthExam = ({ checkup, Employee, setHrdNo, setdatesaved, datesaved, HrdNo, Recorddata, setRecorddata }) => {

    const { Join, NotJoin, pending } = Recorddata
    const updateCommonSettings = async (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setRecorddata({ ...Recorddata, [e.target.name]: value })
    }

    return (
        <Box>
            <Table aria-label="basic table" borderAxis="both" size='sm'>
                <tbody>
                    <tr>
                        <td style={{}}>
                            <Typography level="title-md" sx={{ ml: 1 }}>Other Consultation (If Required)</Typography>
                        </td>
                    </tr>
                    <tr>
                        <td style={{}}>
                            <Typography level="title-md" sx={{ ml: 1 }}>{checkup?.Consultations}</Typography>
                        </td>
                    </tr>
                </tbody>
            </Table>
            <Typography level="title-md" sx={{ mt: 1 }}>
                Fitness Certificate
            </Typography>

            <Table aria-label="basic table" borderAxis="both" size='sm' variant="outlined" sx={{ mt: 1 }}>
                <tbody>
                    <tr>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}>
                            Mr./Miss./Mrs {Employee?.em_name?.toLowerCase()}, age {Employee?.em_age_year} years, has been carefully examined by me and with the supportive evidences of the test results. I am here
                            by recommending to {checkup?.fitness_accept === 1 ? "accept" : null}{checkup?.fitness_not_accept === 1 ? "not accept" : null} ,him for the prescribed job of {Employee?.desg_name?.toLowerCase()}, at Travancore Medical College Hospital,(Medicity).
                        </Typography></td>
                    </tr>
                </tbody>
            </Table>
            <Table aria-label="basic table" borderAxis="both" size='sm' >
                <tbody>
                    <tr>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>
                            Consultant Name
                        </Typography></td>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}>
                            {checkup?.em_name?.toLowerCase()}
                        </Typography></td>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>
                            Consultant Signature
                        </Typography></td>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}>
                            {checkup?.em_name?.toLowerCase()}
                        </Typography></td>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>
                            Date
                        </Typography>
                        </td>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>
                            {checkup?.Date_saved_doc}
                        </Typography>
                        </td>
                    </tr>
                </tbody>
            </Table>
            <Typography level="title-md" sx={{ mt: 1 }}>
                For the use of HR office only
            </Typography>
            <Table aria-label="basic table" borderAxis="both" size='sm' variant="outlined" sx={{ mt: 1 }}>
                <tbody>
                    <tr>
                        <td style={{}}>
                            <Box sx={{ display: 'flex' }}>
                                <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}>
                                    Mr./Miss./Mrs  {Employee?.em_name?.toLowerCase()}, age {Employee?.em_age_year}  years,has submitted the supportive evidence of the test reults ,vaccination details and these are
                                    verified by HR Department .Hereby from HRD allowing him/her to
                                </Typography>

                            </Box>

                            <Box sx={{ display: "flex" }}>
                                <Box sx={{ ml: 1, mt: .5 }}>
                                    <JoyCheckbox
                                        sx={{}}
                                        name="Join"
                                        size="sm"
                                        checked={Join}
                                        onchange={(e) => updateCommonSettings(e)}

                                    />
                                </Box>

                                <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}>      join</Typography>
                                <Box sx={{ ml: 1, mt: .5 }}>
                                    <JoyCheckbox
                                        sx={{}}
                                        name="NotJoin"
                                        size="sm"
                                        checked={NotJoin}
                                        onchange={(e) => updateCommonSettings(e)}

                                    />
                                </Box>

                                <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}>         not join</Typography>
                                <Box sx={{ ml: 1, mt: .5 }}>
                                    <JoyCheckbox
                                        sx={{}}
                                        name="pending"
                                        size="sm"
                                        checked={pending}
                                        onchange={(e) => updateCommonSettings(e)}

                                    />
                                </Box>
                                <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}>  pending </Typography>

                            </Box>
                            <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}>
                                to take decision for the prescribed job of {Employee?.desg_name?.toLowerCase()}, at Travancore Medical Colege
                                Hosptial(Medicity).</Typography>
                        </td>
                    </tr>
                </tbody>
            </Table>
            <Table aria-label="basic table" borderAxis="both" size='sm' >
                <tbody>
                    <tr>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>
                            Name of the staff
                        </Typography></td>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>
                            Signature
                        </Typography></td>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>
                            Date
                        </Typography></td>
                    </tr>
                    <tr>
                        <td style={{}}>
                            <JoyHrd value={HrdNo} setValue={setHrdNo} />
                        </td>
                        <td style={{}}>
                            <JoyHrd value={HrdNo} setValue={setHrdNo} unidisable={true} />
                        </td>
                        <td style={{}}>
                            <JoyInput
                                // placeholder={'other'}
                                type="date"
                                size="sm"
                                name="datesaved"
                                value={datesaved}
                                onchange={setdatesaved}
                            />
                        </td>
                    </tr>
                </tbody>
            </Table>
        </Box>
    )
}

export default memo(AnnualHealthExam)