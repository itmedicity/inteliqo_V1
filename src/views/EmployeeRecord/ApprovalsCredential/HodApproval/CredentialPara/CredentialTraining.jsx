import { Box, IconButton, Table, Tooltip, Typography } from '@mui/joy'
import React, { lazy, memo, useState } from 'react'
import JoyCheckbox from 'src/views/MuiComponents/JoyComponent/JoyCheckbox';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import InputComponent from 'src/views/MuiComponents/JoyComponent/InputComponent';
import JoyHrd from 'src/views/MuiComponents/JoyComponent/JoyHrd';
import JoyInput from 'src/views/MuiComponents/JoyComponent/JoyInput';
import moment from 'moment';

const CredentialPrivileging = lazy(() => import('./CredentialPrivileging'))

const CredentialTraining = ({ Training, Credentialcert, Credentialdata, privilageData, FormDatamain, setFormDatamain }) => {

    const { Copies, Orginal, Orginal_Certificates, Registration,
        Registration_Copies, copies_Training, specialization, staff_hrd, date_saved, Screenshot
    } = Credentialdata


    return (
        <Box>

            <Typography level="title-md" sx={{ ml: 1 }}>Training Details </Typography>

            <Table variant="outlined" borderAxis="both" >
                <thead >
                    <tr>
                        <th>Name of the training/workshop program</th>
                        <th>Condcuted</th>
                    </tr>
                </thead>
                <tbody>
                    {Training?.map((item, index) => (
                        <tr key={index}>
                            <td>{item?.Training_name === null ? "not updated" : item?.Training_name}</td>
                            <td>{item?.Condcuted === null ? "not updated" : item?.Condcuted}</td>

                        </tr>
                    ))}
                </tbody>

            </Table>

            <Typography level="title-md" sx={{ ml: 1 }}>Please list your current life support certificate and the year of certification</Typography>

            <Table variant="outlined" borderAxis="both" >
                <thead >
                    <tr>
                        <th>Certification</th>
                        <th>Year</th>
                    </tr>
                </thead>
                <tbody>
                    {Credentialcert?.map((item, index) => (
                        <tr key={index}>
                            <td>{item?.Certification === null ? "not updated" : item?.Certification}</td>
                            <td>{item?.certification_date === null ? "not updated" : moment(item?.certification_date).format('DD-MM-YYYY')}</td>
                        </tr>
                    ))}
                </tbody>

            </Table>



            <Typography level="title-md" sx={{ ml: 1 }}>Do you request area of sub specialization in your pratice at TMCH ?</Typography>

            <Table variant="outlined" borderAxis="both" >
                <thead >
                    <tr>
                        <th>{specialization}</th>
                    </tr>
                </thead>


            </Table>


            <Typography level="title-md" sx={{ ml: 1 }}>Verification Status</Typography>

            <Table sx={{ mt: 1, p: 0, width: '100%' }} aria-label="basic table" borderAxis="both" size='sm' variant="outlined">
                <tbody >
                    <tr sx={{ p: 0 }}>
                        <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '30%' }} >
                            <Typography sx={{ ml: 1, textAlign: 'center' }}>Academic Details </Typography>
                        </td>
                        <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '30%' }} >
                            <Typography sx={{ ml: 1, textTransform: 'capitalize', textAlign: 'center' }}>Registration Details</Typography>
                        </td>
                        <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '30%' }} >
                            <Typography sx={{ ml: 1, textTransform: 'capitalize', textAlign: 'center' }}>Training Details</Typography>
                        </td>
                    </tr>
                    <tr sx={{ p: 0 }}>
                        <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '30%' }} >
                            <Box sx={{ display: "flex" }}>
                                <Typography sx={{ ml: 1, pt: 1 }}>
                                    <JoyCheckbox
                                        sx={{}}
                                        name="Orginal_Certificates"
                                        checked={Orginal_Certificates === 1}
                                        disabled={true}
                                    />
                                </Typography>
                                <Typography sx={{ ml: 1, pt: 1 }}>
                                    Orginal Certificates Verified
                                </Typography>
                            </Box>

                        </td>

                        <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '30%' }} >
                            <Box sx={{ display: "flex" }}>
                                <Typography sx={{ ml: 1, pt: 1 }}>
                                    <JoyCheckbox
                                        sx={{}}
                                        name="Registration"
                                        checked={Registration === 1}
                                        disabled={true}
                                    />
                                </Typography>
                                <Typography sx={{ ml: 1, pt: 1 }}>
                                    Registration Verified
                                </Typography>
                            </Box>
                        </td>
                        <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '30%' }} >
                            <Box sx={{ display: "flex" }}>
                                <Typography sx={{ ml: 1, pt: 1 }}>
                                    <JoyCheckbox
                                        sx={{}}
                                        name="Orginal"
                                        checked={Orginal === 1}
                                        disabled={true}

                                    />
                                </Typography>
                                <Typography sx={{ ml: 1, pt: 1 }}>
                                    Orginal Checked
                                </Typography>
                            </Box>
                        </td>
                    </tr>
                    <tr sx={{ p: 0 }}>
                        <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '30%' }} >
                            <Box sx={{ display: "flex" }}>
                                <Typography sx={{ ml: 1, pt: 1 }}>
                                    <JoyCheckbox
                                        sx={{}}
                                        name="Copies"
                                        checked={Copies === 1}
                                        disabled={true}

                                    />
                                </Typography>
                                <Typography sx={{ ml: 1, pt: 1 }}>
                                    Copies received
                                </Typography>
                            </Box>

                        </td>

                        <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '30%' }} >
                            <Box sx={{ display: "flex" }}>
                                <Typography sx={{ ml: 1, pt: 1 }}>
                                    <JoyCheckbox
                                        sx={{}}
                                        name="Screenshot"
                                        checked={Screenshot === 1}
                                        disabled={true}
                                    />
                                </Typography>
                                <Typography sx={{ ml: 1, pt: 1 }}>
                                    Screenshot attached
                                </Typography>
                            </Box>
                        </td>
                        <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '30%' }} >
                            <Box sx={{ display: "flex" }}>
                                <Typography sx={{ ml: 1, pt: 1 }}>
                                    <JoyCheckbox
                                        sx={{}}
                                        name="copies_Training"
                                        checked={copies_Training === 1}
                                        disabled={true}
                                    />
                                </Typography>
                                <Typography sx={{ ml: 1, pt: 1 }}>
                                    copies received
                                </Typography>
                            </Box>
                        </td>
                    </tr>
                    <tr sx={{ p: 0 }}>
                        <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '30%' }} >
                        </td>

                        <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '30%' }} >
                            <Box sx={{ display: "flex" }}>
                                <Typography sx={{ ml: 1, pt: 1 }}>
                                    <JoyCheckbox
                                        sx={{}}
                                        name="Registration_Copies"
                                        checked={Registration_Copies === 1}
                                        disabled={true}
                                    />
                                </Typography>
                                <Typography sx={{ ml: 1, pt: 1 }}>
                                    Copies Received
                                </Typography>
                            </Box>
                        </td>
                        <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '30%' }} >

                        </td>
                    </tr>
                </tbody>
            </Table>

            <Typography level="title-md" sx={{ ml: 1 }}>Declaration By Ms Office/Hr</Typography>

            <Box sx={{}}>
                <Typography sx={{ ml: 1, pt: 1 }}>
                    The Above details are checked and verified
                </Typography>
            </Box>
            <Table sx={{ mt: 1, p: 0, width: '100%' }} aria-label="basic table" borderAxis="both" size='sm' variant="outlined">
                <tbody >
                    <tr sx={{ p: 0 }}>
                        <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '30%' }} >
                            <Typography sx={{ ml: 1, textAlign: 'center' }}>Name of the staff </Typography>
                        </td>
                        <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '30%' }} >
                            <Typography sx={{ ml: 1, textTransform: 'capitalize', textAlign: 'center' }}>Signature</Typography>
                        </td>
                        <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '30%' }} >
                            <Typography sx={{ ml: 1, textTransform: 'capitalize', textAlign: 'center' }}>Date</Typography>
                        </td>
                    </tr>
                    <tr sx={{ p: 0 }}>
                        <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '30%' }} >
                            <JoyHrd value={staff_hrd} unidisable={true} />
                        </td>
                        <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '30%' }} >
                            <JoyHrd value={staff_hrd} unidisable={true} />
                        </td>
                        <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '30%' }} >
                            <Typography sx={{ ml: 1, textTransform: 'capitalize', textAlign: 'center' }}>{moment(date_saved).format('DD-MM-YYYY')}</Typography>


                        </td>
                    </tr>

                </tbody>
            </Table>
            <CredentialPrivileging Credentialdata={Credentialdata} privilageData={privilageData} FormDatamain={FormDatamain} setFormDatamain={setFormDatamain} />
        </Box >
    )
}

export default memo(CredentialTraining)