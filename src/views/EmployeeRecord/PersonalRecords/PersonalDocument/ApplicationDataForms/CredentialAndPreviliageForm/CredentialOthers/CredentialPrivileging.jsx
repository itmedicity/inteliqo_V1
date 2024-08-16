import { Box, Table, Typography } from '@mui/joy'
import React, { lazy, memo } from 'react'
import CustmTypog from 'src/views/Component/MuiCustomComponent/CustmTypog'
import InputComponent from 'src/views/MuiComponents/JoyComponent/InputComponent';
import JoyCheckbox from 'src/views/MuiComponents/JoyComponent/JoyCheckbox';

const CredentialOperating = lazy(() => import('./CredentialOperating'))


const CredentialPrivileging = ({ FormDatamain, setFormDatamain, Operating, setOperating, Employee, privilageData, ApprovalData }) => {

    const { insuranceyes, insuranceno, Outpatientyes, Outpatientno, clinical, Admittingyes, Admittingno, Operatingyes, Operatingno, details } = FormDatamain

    const updateformSettings = async (e) => {
        const value = e.target.type === 'checkbox' ? (e.target.checked ? 1 : 0) : e.target.value;
        setFormDatamain({ ...FormDatamain, [e.target.name]: value });
    }
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
                                name="insuranceyes"
                                checked={insuranceyes === 1}
                                onchange={(e) => updateformSettings(e)}

                            />

                        </td>
                        <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                            <Typography sx={{ ml: 1, textTransform: 'capitalize', textAlign: 'center' }}>No</Typography>
                        </td>
                        <td style={{ textAlign: "center" }} >

                            <JoyCheckbox
                                sx={{}}
                                name="insuranceno"
                                checked={insuranceno === 1}
                                onchange={(e) => updateformSettings(e)}

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
                            <InputComponent
                                type="text"
                                size="sm"
                                name="details"
                                value={details}
                                onchange={(e) => updateformSettings(e)}
                            />
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
                                name="Outpatientyes"
                                checked={Outpatientyes === 1}
                                onchange={(e) => updateformSettings(e)}

                            />

                        </td>
                        <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                            <Typography sx={{ ml: 1, textTransform: 'capitalize', textAlign: 'center' }}>No</Typography>
                        </td>
                        <td style={{ textAlign: "center" }} >

                            <JoyCheckbox
                                sx={{}}
                                name="Outpatientno"
                                checked={Outpatientno === 1}
                                onchange={(e) => updateformSettings(e)}

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
                        <td style={{ textAlign: "center" }} >
                            <InputComponent
                                type="text"
                                size="sm"
                                name="clinical"
                                value={clinical}
                                onchange={(e) => updateformSettings(e)}
                            />
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
                                name="Admittingyes"
                                checked={Admittingyes === 1}
                                onchange={(e) => updateformSettings(e)}

                            />

                        </td>
                        <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                            <Typography sx={{ ml: 1, textTransform: 'capitalize', textAlign: 'center' }}>No</Typography>
                        </td>
                        <td style={{ textAlign: "center" }} >

                            <JoyCheckbox
                                sx={{}}
                                name="Admittingno"
                                checked={Admittingno === 1}
                                onchange={(e) => updateformSettings(e)}

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
                                name="Operatingyes"
                                checked={Operatingyes === 1}
                                onchange={(e) => updateformSettings(e)}

                            />

                        </td>
                        <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                            <Typography sx={{ ml: 1, textTransform: 'capitalize', textAlign: 'center' }}>No</Typography>
                        </td>
                        <td style={{ textAlign: "center" }} >

                            <JoyCheckbox
                                sx={{}}
                                name="Operatingno"
                                checked={Operatingno === 1}
                                onchange={(e) => updateformSettings(e)}

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
            <CredentialOperating Operating={Operating} setOperating={setOperating} Employee={Employee} privilageData={privilageData} ApprovalData={ApprovalData} />
        </Box>
    )
}

export default memo(CredentialPrivileging)