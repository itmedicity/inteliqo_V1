import React, { lazy, memo } from 'react'
import { Box, Table, Typography } from '@mui/joy';
import JoyCheckbox from 'src/views/MuiComponents/JoyComponent/JoyCheckbox';


const HealthCheckDoc = lazy(() => import('./HealthCheckDoc'))


const HealthCheckVacc = ({ formdata, setformdata, selectedRowData, Vaccdata }) => {
    const { titer_yes, titer_no, titer_date } = formdata
    const updateformSettings = async (e) => {
        const value = e.target.type === 'checkbox' ? (e.target.checked ? 1 : 0) : e.target.value;
        setformdata({ ...formdata, [e.target.name]: value })
    }
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
            <Table size='small' aria-label="basic table" sx={{ mt: 1 }} variant="outlined" borderAxis="both" >
                <tbody >
                    <tr sx={{ p: 0 }}>
                        <td padding='none' sx={{ border: '1px solid #e0e0e0' }} >
                            <Typography level="title-md" sx={{ ml: 1 }}>A.Have you finished your HBsAg vaccination ? </Typography>
                        </td>

                        <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >

                            <Typography level="title-md" sx={{ ml: 2, mt: 1, textTransform: 'capitalize' }}>
                                <JoyCheckbox
                                    sx={{}}
                                    label={"Yes"}
                                    name="titer_yes"
                                    checked={titer_yes === 1}
                                    onchange={(e) => updateformSettings(e)}
                                />
                            </Typography>

                        </td>
                        <td padding='none' style={{ textAlign: "center" }} >
                            <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}>
                                First Dose (Date)
                            </Typography>
                            <Box sx={{ borderTop: '1px solid #e0e0e0' }}>
                                <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}>
                                    {Vaccdata?.firstdose_date === null ? "Not Vaccinated" : Vaccdata?.firstdose_date}
                                </Typography>
                            </Box>
                        </td>
                        <td padding='none' style={{ textAlign: "center" }}>
                            <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}>
                                Second Dose (Date)
                            </Typography>
                            <Box sx={{ borderTop: '1px solid #e0e0e0' }}>
                                <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}>
                                    {Vaccdata?.second_dose_given_date === null ? "Not Vaccinated" : Vaccdata?.second_dose_given_date}
                                </Typography>
                            </Box>
                        </td>
                        <td padding='none' style={{ textAlign: "center" }} >
                            <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}>
                                Third Dose (Date)
                            </Typography>
                            <Box sx={{ borderTop: '1px solid #e0e0e0' }}>
                                <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}>
                                    {Vaccdata?.third_dose_given_date === null ? "Not Vaccinated" : Vaccdata?.third_dose_given_date}
                                </Typography>
                            </Box>
                        </td>
                        <td padding='none' style={{ textAlign: "center" }}>
                            <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}>
                                Booster Dose (Date)
                            </Typography>
                            <Box sx={{ borderTop: '1px solid #e0e0e0' }}>
                                <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}>
                                    {Vaccdata?.booster_dose_given_date === null ? "Not Vaccinated" : Vaccdata?.third_dose_given_date}
                                </Typography>
                            </Box>
                        </td>

                    </tr>

                </tbody>

            </Table>
            <Table size='small' borderAxis="both" sx={{}}>
                <tbody >
                    <tr sx={{ p: 0 }}>
                        <td padding='none' sx={{ border: '1px solid #e0e0e0', }} width="16.7%" >
                            <Typography level="title-md" sx={{ ml: 1 }}></Typography>
                        </td>

                        <td padding='none' sx={{ border: '1px solid #e0e0e0' }} >

                            <Typography level="title-md" sx={{ ml: 2, mt: 1, textTransform: 'capitalize' }}>
                                <JoyCheckbox
                                    sx={{}}
                                    label={"No"}
                                    name="titer_no"
                                    checked={titer_no === 1}
                                    onchange={(e) => updateformSettings(e)}
                                />
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

            <HealthCheckDoc formdata={formdata} setformdata={setformdata} selectedRowData={selectedRowData} />
        </>
    )
}

export default memo(HealthCheckVacc)