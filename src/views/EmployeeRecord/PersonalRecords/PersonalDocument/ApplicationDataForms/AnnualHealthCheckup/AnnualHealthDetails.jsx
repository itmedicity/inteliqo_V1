import { Box, Table, Typography } from '@mui/joy'
import React, { lazy, memo, useEffect, useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import { warningNofity } from 'src/views/CommonCode/Commonfunc'
import JoyCheckbox from 'src/views/MuiComponents/JoyComponent/JoyCheckbox'

const AnnualHealthDoc = lazy(() => import('./AnnualHealthDoc'))

const AnnualHealthDetails = ({ checkup, Employee, setHrdNo, setdatesaved, datesaved, HrdNo, Recorddata, setRecorddata }) => {

    const [Vaccdata, setVaccination] = useState([])


    //for getting the details already entered
    useEffect(() => {
        if (Employee.length !== 0) {
            const getCommonSettings = async () => {
                const postdata = {
                    em_no: Employee?.em_no
                };
                const result = await axioslogin.post(`/PersonalChecklist/getAll`, postdata)
                const { success, data } = result.data

                if (success === 1 && data?.length > 0) {
                    setVaccination(data[0])
                }
                else {
                    setVaccination([])
                }
            }
            getCommonSettings()
        } else {
            warningNofity("SomeThing Went Wrong")
        }
    }, [Employee])
    return (
        <Box>
            <Table aria-label="basic table" borderAxis="both" size='sm' variant="outlined" sx={{ mt: 1 }}>

                <tbody>
                    <tr>
                        <td style={{ width: '20%' }}> <Typography level="title-md" sx={{ ml: 1 }}>Vaccination Details</Typography></td>
                    </tr>
                </tbody>
            </Table>
            <Typography level="title-md" sx={{ ml: 1 }}>Have you finished your HBsAg vaccination?</Typography>

            <Table aria-label="basic table" borderAxis="both" size='sm' variant="outlined" sx={{ mt: 1 }}>
                <tbody>
                    <tr>
                        <td style={{ width: '20%' }}>

                            <Box sx={{ display: "flex" }}>
                                <Box sx={{ mt: .5 }}>
                                    <JoyCheckbox
                                        size="sm"
                                        sx={{}}
                                        name="workstation"
                                        disabled={true}
                                        checked={checkup?.vaccination_status_yes === 1 ? true : false}
                                    />
                                </Box>
                                <Box>
                                    <Typography level="title-md" sx={{ ml: 1, }}>
                                        Yes
                                    </Typography>
                                </Box>
                            </Box>

                        </td>
                        <td>
                            <Box>
                                <Table aria-label="basic table" borderAxis="both" size='sm'>

                                    <tbody>
                                        <tr>
                                            <td style={{ width: '20%' }}> <Typography level="title-md" sx={{ ml: 1 }}>First Dose</Typography></td>
                                            <td style={{ width: '20%' }}> <Typography level="title-md" sx={{ ml: 1 }}>Second Dose</Typography></td>
                                            <td style={{ width: '20%' }}> <Typography level="title-md" sx={{ ml: 1 }}>Third Dose</Typography></td>
                                            <td style={{ width: '20%' }}> <Typography level="title-md" sx={{ ml: 1 }}>Booster Dose</Typography></td>

                                        </tr>
                                        <tr>
                                            <td style={{ width: '20%' }}> <Typography level="title-md" sx={{ ml: 1 }}>
                                                {Vaccdata?.firstdose_date === null ? "Not Vaccinated" : Vaccdata?.firstdose_date}
                                            </Typography></td>
                                            <td style={{ width: '20%' }}> <Typography level="title-md" sx={{ ml: 1 }}>
                                                {Vaccdata?.second_dose_given_date === null ? "Not Vaccinated" : Vaccdata?.second_dose_given_date}
                                            </Typography></td>
                                            <td style={{ width: '20%' }}> <Typography level="title-md" sx={{ ml: 1 }}>
                                                {Vaccdata?.third_dose_given_date === null ? "Not Vaccinated" : Vaccdata?.third_dose_given_date}
                                            </Typography></td>
                                            <td style={{ width: '20%' }}> <Typography level="title-md" sx={{ ml: 1 }}>
                                                {Vaccdata?.booster_dose_given_date === null ? "Not Vaccinated" : Vaccdata?.third_dose_given_date}
                                            </Typography></td>

                                        </tr>
                                    </tbody>
                                </Table>
                            </Box>
                        </td>
                    </tr>
                    <tr>
                        <td style={{ width: '20%' }}>
                            <Box sx={{ display: "flex" }}>
                                <Box sx={{ mt: .5 }}>
                                    <JoyCheckbox
                                        size="sm"
                                        sx={{}}
                                        name="workstation"
                                        disabled={true}
                                        checked={checkup?.vaccination_status_no === 1 ? true : false}

                                    />
                                </Box>
                                <Box>
                                    <Typography level="title-md" sx={{ ml: 1, }}>
                                        No
                                    </Typography>
                                </Box>
                            </Box>
                        </td>
                        <td style={{ width: '20%' }}>
                            <Typography level="title-md" sx={{ ml: 1, }}>
                                Check the titer
                            </Typography>
                        </td>
                    </tr>
                </tbody>
            </Table>

            <Typography level="title-md" sx={{ ml: 1, mt: 1 }}> Doctor&apos;s Consultation </Typography>
            <Table aria-label="basic table" borderAxis="both" size='sm' variant="outlined" sx={{ mt: 1 }}>

                <tbody>
                    <tr>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>Name of the Candidate </Typography></td>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}> {Employee?.em_name?.toLowerCase()}</Typography></td>

                    </tr>

                </tbody>
            </Table>
            <Table aria-label="basic table" borderAxis="both" size='sm' >
                <tbody>
                    <tr>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>Age </Typography></td>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}> {Employee?.em_age_year}</Typography></td>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>Gender </Typography></td>
                        <td><Typography level="title-md" sx={{ ml: 1 }}>{Employee?.em_gender === 1 ? "Male" : Employee?.em_gender === 2 ? "FeMale" : Employee?.em_gender === 3 ? "Other" : null} </Typography>
                        </td>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>Dept </Typography></td>
                        <td style={{}} width="20%" > <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}>{Employee?.dept_name?.toLowerCase()}</Typography></td>

                    </tr>
                </tbody>
            </Table>
            <Table aria-label="basic table" borderAxis="both" size='sm' >
                <tbody>
                    <tr>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>MRD No </Typography></td>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>{checkup?.mrd_no} </Typography></td>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>Unit </Typography></td>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}> {checkup?.unit}</Typography></td>
                    </tr>
                    <tr>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>Blood Group</Typography></td>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>{Employee?.group_name} </Typography></td>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>Consultant </Typography></td>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}>{checkup?.em_name?.toLowerCase()} </Typography></td>
                    </tr>
                </tbody>
            </Table>
            <AnnualHealthDoc checkup={checkup} Employee={Employee} setHrdNo={setHrdNo} setdatesaved={setdatesaved} datesaved={datesaved}
                HrdNo={HrdNo} Recorddata={Recorddata} setRecorddata={setRecorddata} />
        </Box>
    )
}

export default memo(AnnualHealthDetails)