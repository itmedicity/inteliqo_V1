import { Box, Table, Typography } from '@mui/joy'
import React, { lazy, memo } from 'react'
import CustmTypog from 'src/views/Component/MuiCustomComponent/CustmTypog';
import InputComponent from 'src/views/MuiComponents/JoyComponent/InputComponent';
import JoyCheckbox from 'src/views/MuiComponents/JoyComponent/JoyCheckbox';

const CredentialOperating = lazy(() => import('./CredentialOperating'))

const CredentialPrivileging = ({ privilageData, FormDatamain, setFormDatamain, Credentialdata }) => {
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
                    O - Observer only
                </Typography>
                <Typography>
                    S - Perform procedure and activities under supervision
                </Typography>
                <Typography>
                    A - Assist Procedures
                </Typography>
                <Typography>
                    P - Perform procedure and activities without supervision after privileging by authority (Privileging ,authority shall be HOD/C&P Committee as decided By the Board of Managment)
                </Typography>
            </Box>

            <Table variant="outlined" borderAxis="both" >
                <thead >
                    <tr>
                        <th>Name of the procedure</th>
                        <th style={{ textAlign: 'center' }}>O</th>
                        <th style={{ textAlign: 'center' }}>S</th>
                        <th style={{ textAlign: 'center' }}>A</th>
                        <th style={{ textAlign: 'center' }}>P</th>
                        <th>Decision of the C&P committee</th>

                    </tr>
                </thead>
                <tbody>
                    {privilageData?.map((item, index) => (
                        <tr key={index}>
                            <td style={{ textAlign: 'center' }}>{item?.name_procedure === null ? "not updated" : item?.name_procedure}</td>
                            <td style={{ textAlign: 'center' }}>{item?.Observer === null ? "not updated" : item?.Observer === 1 ? "YES" : "NO"}</td>
                            <td style={{ textAlign: 'center' }}>{item?.supervision === null ? "not updated" : item?.supervision === 1 ? "YES" : "NO"}</td>
                            <td style={{ textAlign: 'center' }}>{item?.Procedures === null ? "not updated" : item?.Procedures === 1 ? "YES" : "NO"}</td>
                            <td style={{ textAlign: 'center' }}>{item?.Perform_procedure === null ? "not updated" : item?.Perform_procedure === 1 ? "YES" : "NO"}</td>
                            <td style={{ textAlign: 'center' }}>{item?.decision === null ? "not updated" : item?.decision}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <CredentialOperating FormDatamain={FormDatamain} setFormDatamain={setFormDatamain} />

        </Box>
    )
}

export default memo(CredentialPrivileging)