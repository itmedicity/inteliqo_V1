import { Box, Table, Typography } from '@mui/joy'
import React, { memo } from 'react'
import CustmTypog from 'src/views/Component/MuiCustomComponent/CustmTypog'
import InputComponent from 'src/views/MuiComponents/JoyComponent/InputComponent'
import JoyCheckbox from 'src/views/MuiComponents/JoyComponent/JoyCheckbox'


const HealthCheckupExam = ({ formdata, setformdata, selectedRowData }) => {
    const { em_name, General_Examininations, Fitness_yes, Fitness_no, DateOfSave, Employee_name, age, Other_Consultations,
        HBs_Ag_Titer, Blood_Grouping, Serology, Check_X_ray, Titer_Value_100, Titer_Value_12, Titer_Value_0, Vaciination_first,
        Vaciination_Second, Vaciination_Third, Vaciination_Booster
    } = formdata

    const updateformSettings = async (e) => {
        const value = e.target.type === 'checkbox' ? (e.target.checked ? 1 : 0) : e.target.value;
        setformdata({ ...formdata, [e.target.name]: value })
    }
    return (
        <Box>
            <Box sx={{ mt: 1 }}>
                <CustmTypog title='General Examination' />
                <Table aria-label="basic table" borderAxis="both" size='sm' variant="outlined">
                    <tbody>
                        <tr>
                            <td width="15%"><Typography level="title-md" sx={{ ml: 1 }} >Physician Notes </Typography></td>
                            <td style={{}}>
                                <InputComponent
                                    type="text"
                                    size="sm"
                                    name="General_Examininations"
                                    value={General_Examininations}

                                    onchange={(e) => updateformSettings(e)}
                                />
                            </td>
                        </tr>
                    </tbody>
                </Table>
                <Table aria-label="basic table" borderAxis="both" size='sm' variant="outlined" sx={{ mt: 1 }}>
                    <tbody>
                        <tr>
                            <td rowSpan={3} style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>Investigations(If Required) </Typography></td>
                            <td colSpan={3} style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>Blood Tests: </Typography></td>
                        </tr>
                        <tr>
                            <td rowSpan={3}>
                                <Box sx={{ display: "flex" }}>
                                    <Box sx={{ mt: .5 }}>
                                        <JoyCheckbox
                                            sx={{}}
                                            name="HBs_Ag_Titer"
                                            checked={HBs_Ag_Titer === 1}
                                            onchange={(e) => updateformSettings(e)}
                                        />
                                    </Box>
                                    <Box>
                                        <Typography level="title-md" sx={{ ml: 2, textAlign: "center" }}>HBs Ag Titer</Typography>
                                    </Box>
                                </Box>
                            </td>
                            <td rowSpan={3}>
                                <Box sx={{ display: "flex" }}>
                                    <Box sx={{ mt: .5 }}>
                                        <JoyCheckbox
                                            sx={{}}

                                            name="Blood_Grouping"
                                            checked={Blood_Grouping === 1}
                                            onchange={(e) => updateformSettings(e)}
                                        />
                                    </Box>
                                    <Box>
                                        <Typography level="title-md" sx={{ ml: 2, textAlign: "center" }}>Blood Grouping</Typography>
                                    </Box>
                                </Box>
                            </td>
                            <td rowSpan={3}>
                                <Box sx={{ display: "flex" }}>
                                    <Box sx={{ mt: .5 }}>
                                        <JoyCheckbox
                                            sx={{}}
                                            name="Serology"
                                            checked={Serology === 1}
                                            onchange={(e) => updateformSettings(e)}
                                        />
                                    </Box>
                                    <Box>
                                        <Typography level="title-md" sx={{ ml: 2, textAlign: "center" }}>Serology</Typography>
                                    </Box>
                                </Box>
                            </td>
                        </tr>
                        <tr>
                            <td >
                                <Box sx={{ display: "flex" }}>
                                    <Box sx={{ mt: .5 }}>
                                        <JoyCheckbox
                                            sx={{}}

                                            name="Check_X_ray"
                                            checked={Check_X_ray === 1}
                                            onchange={(e) => updateformSettings(e)}
                                        />
                                    </Box>
                                    <Box>
                                        <Typography level="title-md" sx={{ ml: 2, textAlign: "center" }}>Check X-ray</Typography>
                                    </Box>
                                </Box>
                            </td>
                        </tr>
                    </tbody>
                </Table>
                <Table aria-label="basic table" borderAxis="both" size='sm' >
                    <tbody>
                        <tr>
                            <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>HBs Ag Titer Value </Typography></td>
                            <td style={{}}>
                                <Box sx={{ display: "flex" }}>
                                    <Box sx={{ mt: .5 }}>
                                        <JoyCheckbox
                                            sx={{}}

                                            name="Titer_Value_100"
                                            checked={Titer_Value_100 === 1}
                                            onchange={(e) => updateformSettings(e)}
                                        />
                                    </Box>
                                    <Box>
                                        <Typography level="title-md" sx={{ ml: 2, textAlign: "center" }}>Greather than 100 IU/L</Typography>
                                    </Box>
                                </Box></td>
                            <td style={{}}>
                                <Box sx={{ display: "flex" }}>
                                    <Box sx={{ mt: .5 }}>
                                        <JoyCheckbox
                                            sx={{}}

                                            name="Titer_Value_12"
                                            checked={Titer_Value_12 === 1}
                                            onchange={(e) => updateformSettings(e)}
                                        />
                                    </Box>
                                    <Box>
                                        <Typography level="title-md" sx={{ ml: 2, textAlign: "center" }}>12-100 IU/L</Typography>
                                    </Box>
                                </Box>
                            </td>
                            <td style={{}}>
                                <Box sx={{ display: "flex" }}>
                                    <Box sx={{ mt: .5 }}>
                                        <JoyCheckbox
                                            sx={{}}

                                            name="Titer_Value_0"
                                            checked={Titer_Value_0 === 1}
                                            onchange={(e) => updateformSettings(e)}
                                        />
                                    </Box>
                                    <Box>
                                        <Typography level="title-md" sx={{ ml: 2, textAlign: "center" }}>0-12 IU/L</Typography>
                                    </Box>
                                </Box>
                            </td>
                        </tr>

                    </tbody>
                </Table>
                <Table aria-label="basic table" borderAxis="both" size='sm' >
                    <tbody>
                        <tr>
                            <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>Vaciination Required</Typography></td>
                            <td style={{}}>
                                <Box sx={{ display: "flex" }}>
                                    <Box sx={{ mt: .5 }}>
                                        <JoyCheckbox
                                            sx={{}}

                                            name="Vaciination_first"
                                            checked={Vaciination_first === 1}
                                            onchange={(e) => updateformSettings(e)}
                                        />
                                    </Box>
                                    <Box>
                                        <Typography level="title-md" sx={{ ml: 2, textAlign: "center" }}>First Dose(0 Month)</Typography>
                                    </Box>
                                </Box>
                            </td>
                            <td style={{}}>
                                <Box sx={{ display: "flex" }}>
                                    <Box sx={{ mt: .5 }}>
                                        <JoyCheckbox
                                            sx={{}}

                                            name="Vaciination_Second"
                                            checked={Vaciination_Second === 1}
                                            onchange={(e) => updateformSettings(e)}
                                        />
                                    </Box>
                                    <Box>
                                        <Typography level="title-md" sx={{ ml: 2, textAlign: "center" }}>Second dose(1 month)</Typography>
                                    </Box>
                                </Box>
                            </td>
                            <td style={{}}>
                                <Box sx={{ display: "flex" }}>
                                    <Box sx={{ mt: .5 }}>
                                        <JoyCheckbox
                                            sx={{}}

                                            name="Vaciination_Third"
                                            checked={Vaciination_Third === 1}
                                            onchange={(e) => updateformSettings(e)}
                                        />
                                    </Box>
                                    <Box>
                                        <Typography level="title-md" sx={{ ml: 2, textAlign: "center" }}>Third dose(6 month)</Typography>
                                    </Box>
                                </Box>
                            </td>
                            <td style={{}}>
                                <Box sx={{ display: "flex" }}>
                                    <Box sx={{ mt: .5 }}>
                                        <JoyCheckbox
                                            sx={{}}

                                            name="Vaciination_Booster"
                                            checked={Vaciination_Booster === 1}
                                            onchange={(e) => updateformSettings(e)}
                                        />
                                    </Box>
                                    <Box>
                                        <Typography level="title-md" sx={{ ml: 2, textAlign: "center" }}>Booster dose(If required)</Typography>
                                    </Box>
                                </Box>
                            </td>
                        </tr>

                    </tbody>
                </Table>
            </Box>
            <Typography level="title-md" sx={{ mt: 1 }}>
                Other Consultations(If required)
            </Typography>
            <Table aria-label="basic table" borderAxis="both" size='sm' variant="outlined">
                <tbody>
                    <tr>
                        <td style={{}}>
                            <InputComponent
                                type="text"
                                size="sm"
                                name="Other_Consultations"
                                value={Other_Consultations}
                                onchange={(e) => updateformSettings(e)}
                            />
                        </td>
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
                            Mr./Miss./Mrs {selectedRowData?.em_name === "" ? "Not Updated" : selectedRowData?.em_name},
                            age  {selectedRowData?.em_age_year === 0 ? "not updated" : selectedRowData?.em_age_year}    years,
                            has been carefully examined by me and with the supportive evidences of the test results. I am here
                            by recommending to   </Typography>
                            <Box sx={{ display: 'flex', mt: .5, ml: .5 }}>
                                <Box sx={{ mt: .5 }}>
                                    <JoyCheckbox
                                        sx={{}}
                                        name="Fitness_yes"
                                        checked={Fitness_yes === 1}
                                        onchange={(e) => updateformSettings(e)}
                                    />

                                </Box>
                                <Typography level="title-md" sx={{ ml: 1 }}>   accept/ </Typography>

                                <Box sx={{ mt: .5, ml: 1 }}>
                                    <JoyCheckbox
                                        sx={{}}
                                        name="Fitness_no"
                                        checked={Fitness_no === 1}
                                        onchange={(e) => updateformSettings(e)}
                                    />
                                </Box>
                                <Typography level="title-md" sx={{ ml: 1 }}>  not accept ,him for the prescribed job at Travancore Medical College Hospital, (Medicity).</Typography>
                            </Box>


                        </td>
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
                            {em_name}
                        </Typography></td>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>
                            Consultant Signature
                        </Typography></td>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>
                            {em_name}
                        </Typography></td>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>
                            Date
                        </Typography></td>
                        <td style={{}}>
                            <InputComponent
                                type="date"
                                size="sm"
                                name="DateOfSave"
                                value={DateOfSave}
                                onchange={(e) => updateformSettings(e)}
                            />
                        </td>
                    </tr>

                </tbody>
            </Table>

        </Box>
    )
}

export default memo(HealthCheckupExam)