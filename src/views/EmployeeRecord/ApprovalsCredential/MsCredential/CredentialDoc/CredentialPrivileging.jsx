import { Box, Table, Typography } from '@mui/joy'
import React, { lazy, memo } from 'react'
import CustmTypog from 'src/views/Component/MuiCustomComponent/CustmTypog'
import InputComponent from 'src/views/MuiComponents/JoyComponent/InputComponent';
import JoyCheckbox from 'src/views/MuiComponents/JoyComponent/JoyCheckbox';

const CredentialOperating = lazy(() => import('./CredentialOperating'))


const CredentialPrivileging = ({ Credentialdata, privilageData, FormDatamain, setFormDatamain }) => {
    const { Admitting_no, Admitting_yes, Operating_no, Operating_yes, Outpatient_no, Outpatient_yes, Request_clinical,
        details, insurance_no, insurance_yes } = Credentialdata
    return (
        <Box>

            <Typography level="title-md" sx={{ ml: 1 }}>Privileging</Typography>

            <Table sx={{ mt: 1, p: 0, width: '100%' }} aria-label="basic table" borderAxis="both" size='sm' variant="outlined">
                <tbody >
                    <tr sx={{ p: 0 }}>
                        <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '60%' }} >
                            <Typography sx={{ ml: 1, }}>Are you covered by professional liability insurance </Typography>
                        </td>
                        <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                            <Typography sx={{ ml: 1, textTransform: 'capitalize', textAlign: 'center' }}>Yes</Typography>
                        </td>
                        <td style={{ textAlign: "center" }} >

                            <JoyCheckbox
                                sx={{}}
                                name="insurance_yes"
                                checked={insurance_yes === 1}
                                disabled={true}
                            />

                        </td>
                        <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                            <Typography sx={{ ml: 1, textTransform: 'capitalize', textAlign: 'center' }}>No</Typography>
                        </td>
                        <td style={{ textAlign: "center" }} >

                            <JoyCheckbox
                                sx={{}}
                                name="insurance_no"
                                checked={insurance_no === 1}
                                disabled={true}
                            />

                        </td>
                    </tr>
                </tbody>
            </Table>
            <Table sx={{ mt: 1, p: 0, width: '100%' }} aria-label="basic table" borderAxis="both" size='sm' variant="outlined">
                <tbody >
                    <tr sx={{ p: 0 }}>
                        <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '30%' }} >
                            <Typography sx={{ ml: 1, }}>Please give details </Typography>
                        </td>
                        <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '60%' }} >
                            <Typography sx={{ ml: 1, }}>{details}</Typography>

                        </td>
                    </tr>
                </tbody>
            </Table>
            <CustmTypog title={'Do You Need ?'} />
            <Table sx={{ mt: 1, p: 0, width: '100%' }} aria-label="basic table" borderAxis="both" size='sm' variant="outlined">
                <tbody >
                    <tr sx={{ p: 0 }}>
                        <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '60%' }} >
                            <Typography sx={{ ml: 1, }}>Outpatient privilege ?</Typography>
                        </td>
                        <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                            <Typography sx={{ ml: 1, textTransform: 'capitalize', textAlign: 'center' }}>Yes</Typography>
                        </td>
                        <td style={{ textAlign: "center" }} >

                            <JoyCheckbox
                                sx={{}}
                                name="Outpatient_yes"
                                checked={Outpatient_yes === 1}
                                disabled={true}
                            />

                        </td>
                        <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                            <Typography sx={{ ml: 1, textTransform: 'capitalize', textAlign: 'center' }}>No</Typography>
                        </td>
                        <td style={{ textAlign: "center" }} >

                            <JoyCheckbox
                                sx={{}}
                                name="Outpatient_no"
                                checked={Outpatient_no === 1}
                                disabled={true}

                            />

                        </td>
                    </tr>
                </tbody>
            </Table>
            <Table sx={{ mt: 1, p: 0, width: '100%' }} aria-label="basic table" borderAxis="both" size='sm' variant="outlined">
                <tbody >
                    <tr sx={{ p: 0 }}>
                        <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '60%' }} >
                            <Typography sx={{ ml: 1, }}>Request clinical days and time </Typography>
                        </td>
                    </tr>
                    <tr sx={{ p: 0 }}>
                        <td style={{}} >
                            <Typography sx={{ ml: 1, }}>{Request_clinical} </Typography>
                        </td>
                    </tr>

                </tbody>
            </Table>
            <Table sx={{ mt: 1, p: 0, width: '100%' }} aria-label="basic table" borderAxis="both" size='sm' variant="outlined">
                <tbody >
                    <tr sx={{ p: 0 }}>
                        <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '60%' }} >
                            <Typography sx={{ ml: 1, }}>Admitting Privilege ?</Typography>
                        </td>
                        <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                            <Typography sx={{ ml: 1, textTransform: 'capitalize', textAlign: 'center' }}>Yes</Typography>
                        </td>
                        <td style={{ textAlign: "center" }} >

                            <JoyCheckbox
                                sx={{}}
                                name="Admitting_yes"
                                checked={Admitting_yes === 1}
                                disabled={true}

                            />

                        </td>
                        <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                            <Typography sx={{ ml: 1, textTransform: 'capitalize', textAlign: 'center' }}>No</Typography>
                        </td>
                        <td style={{ textAlign: "center" }} >

                            <JoyCheckbox
                                sx={{}}
                                name="Admitting_no"
                                checked={Admitting_no === 1}
                                disabled={true}

                            />

                        </td>
                    </tr>
                    <tr sx={{ p: 0 }}>
                        <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '60%' }} >
                            <Typography sx={{ ml: 1, }}>Operating(Invasive procedure)privilege ?</Typography>
                        </td>
                        <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                            <Typography sx={{ ml: 1, textTransform: 'capitalize', textAlign: 'center' }}>Yes</Typography>
                        </td>
                        <td style={{ textAlign: "center" }} >

                            <JoyCheckbox
                                sx={{}}
                                name="Operating_yes"
                                checked={Operating_yes === 1}
                                disabled={true}

                            />

                        </td>
                        <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                            <Typography sx={{ ml: 1, textTransform: 'capitalize', textAlign: 'center' }}>No</Typography>
                        </td>
                        <td style={{ textAlign: "center" }} >

                            <JoyCheckbox
                                sx={{}}
                                name="Operating_no"
                                checked={Operating_no === 1}
                                disabled={true}

                            />

                        </td>
                    </tr>
                </tbody>
            </Table>

            <Typography level="title-md" sx={{ ml: 1 }}>Operating Privilege</Typography>

            <Box sx={{ ml: 1 }}>
                <Typography>
                    Operating privilege request can be listed in a separate sheet to level of supervision required.Your logbook will be a useful guide.Privilege
                    to perform emergency life saving procedure is automatially granted to all staff physicians.
                </Typography>

                <Typography sx={{ mt: 1 }}>
                    Please put tick in the appropriate column against each procedure
                </Typography>
                <Typography sx={{ mt: 1 }}>
                    U - Can do the procedure unsupervised
                </Typography>
                <Typography>
                    S - Need Supervision to do the procedure(peer present /involved in procedure)
                </Typography>
                <Typography>
                    I - Interested to get trained in the procedure
                </Typography>
            </Box>
            <CredentialOperating privilageData={privilageData} FormDatamain={FormDatamain} setFormDatamain={setFormDatamain} Credentialdata={Credentialdata} />
        </Box>
    )
}

export default memo(CredentialPrivileging)