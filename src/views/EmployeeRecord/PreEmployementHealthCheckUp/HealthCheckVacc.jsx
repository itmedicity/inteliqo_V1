import React, { lazy, memo } from 'react'
import { Table, Typography } from '@mui/joy';
import JoyCheckbox from 'src/views/MuiComponents/JoyComponent/JoyCheckbox';
// import CustmTypog from 'src/views/Component/MuiCustomComponent/CustmTypog';

const HealthCheckDoc = lazy(() => import('./HealthCheckDoc'))


const HealthCheckVacc = () => {
    return (
        <>
            <Table>
                <tbody >
                    <tr sx={{ p: 0 }}>
                        <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '100%' }} >
                            <Typography level="title-md" sx={{ ml: 1 }}>2.Vaccination details </Typography>
                        </td>
                    </tr>
                </tbody>
            </Table>
            <Table>
                <tbody >
                    <tr sx={{ p: 0 }}>
                        <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                            <Typography level="title-md" sx={{ ml: 1 }}>A.Have you checked your titer within 1 year </Typography>
                        </td>

                        <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                            <Typography sx={{ ml: 1, textTransform: 'capitalize' }}>
                                <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}>
                                    <JoyCheckbox
                                        sx={{}}
                                        name="workstation"
                                        label={"Yes"}
                                    // checked={workstation}
                                    // onchange={(e) => setworkstation(e.target.checked)}

                                    />
                                </Typography>
                            </Typography>
                        </td>
                        <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                            <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}>
                                If Yes, Submit the Certificate
                            </Typography>
                        </td>
                        <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }}>
                            <Typography sx={{ ml: 1, textTransform: 'capitalize' }}>

                            </Typography>
                        </td>
                    </tr>
                </tbody>

            </Table>
            <Table>
                <tbody >
                    <tr sx={{ p: 0 }}>
                        <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                            <Typography level="title-md" sx={{ ml: 1 }}></Typography>
                        </td>

                        <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                            <Typography sx={{ ml: 1, textTransform: 'capitalize' }}>
                                <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}>
                                    <JoyCheckbox
                                        sx={{}}
                                        name="workstation"
                                        label={"No"}
                                    // checked={workstation}
                                    // onchange={(e) => setworkstation(e.target.checked)}

                                    />
                                </Typography>
                            </Typography>
                        </td>
                        <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '20%' }} >
                            <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}>
                                Check the titer
                            </Typography>
                        </td>

                    </tr>
                </tbody>
            </Table>
            {/* <CustmTypog title='Declaration by applicant' />
            <Typography level="title-md" sx={{ ml: 1, mt: 1 }}>I hereby declare that the information given above are true and correct to the best of my knowledge and belief.I agree if this information is found to be incorrect/ false the company is free to terminate my job approval.</Typography>
            <Table>
                <tbody >
                    <tr sx={{ p: 0 }}>
                        <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                            <Typography level="title-md" sx={{ ml: 1 }}>Name of the staff </Typography>
                        </td>

                        <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                            <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}>
                                Signature
                            </Typography>
                        </td>
                        <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                            <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}>
                                Date
                            </Typography>
                        </td>
                    </tr>
                    <tr sx={{ p: 0 }}>
                        <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                            <Typography level="title-md" sx={{ ml: 1 }}>a </Typography>
                        </td>

                        <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                            <Typography level="title-md" sx={{ ml: 1, }}>
                                a
                            </Typography>
                        </td>
                        <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                            <Typography level="title-md" sx={{ ml: 1, }}>
                                a
                            </Typography>
                        </td>
                    </tr>
                </tbody>

            </Table> */}
            <HealthCheckDoc />
        </>
    )
}

export default memo(HealthCheckVacc)