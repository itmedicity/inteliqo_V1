import { Box, Table, Typography } from '@mui/joy'
import React, { lazy, memo } from 'react'
import CustmTypog from 'src/views/Component/MuiCustomComponent/CustmTypog';
import InputComponent from 'src/views/MuiComponents/JoyComponent/InputComponent';


const HealthCheckupExam = lazy(() => import('./HealthCheckupExam'))


const HealthCheckDoc = ({ formdata, setformdata, selectedRowData }) => {
    const { em_name, MRD_No, Unit, Pulse, Bp, Resp, Temp, Weight, Height, BMI
    } = formdata
    const updateformSettings = async (e) => {
        const value = e.target.type === 'checkbox' ? (e.target.checked ? 1 : 0) : e.target.value;
        setformdata({ ...formdata, [e.target.name]: value })
    }
    return (
        <Box sx={{ mt: 1 }}>

            <CustmTypog title='  Doctor&apos;s Consultation' />
            <Table aria-label="basic table" borderAxis="both" size='sm' variant="outlined" sx={{ mt: 1 }}>

                <tbody>
                    <tr>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>Name of the Candidate </Typography></td>
                        <td><Typography level="title-md" sx={{ textTransform: 'capitalize', }}> {selectedRowData?.em_name?.toLowerCase() === "" ? "Not Updated" : selectedRowData?.em_name?.toLowerCase()}</Typography>
                        </td>
                    </tr>
                </tbody>
            </Table>
            <Table aria-label="basic table" borderAxis="both" size='sm' >
                <tbody>
                    <tr>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>Age </Typography></td>
                        <td><Typography level="title-md" sx={{ ml: 1 }}>{selectedRowData?.em_age_year === 0 ? "not updated" : selectedRowData?.em_age_year}</Typography>
                        </td>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>Gender </Typography></td>
                        <td style={{}}>
                            <Typography level="title-md" sx={{ ml: 1 }}>{selectedRowData?.gender === "" ? "not updated" : selectedRowData?.gender}  </Typography>

                        </td>
                    </tr>
                </tbody>
            </Table>
            <Table aria-label="basic table" borderAxis="both" size='sm' >
                <tbody>
                    <tr>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>MRD No </Typography></td>
                        <td style={{}}>
                            <InputComponent
                                type="text"
                                size="sm"
                                name="MRD_No"
                                value={MRD_No}
                                placeholder="Enter The MRD No"
                                onchange={(e) => updateformSettings(e)}
                            />
                        </td>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>Unit </Typography></td>
                        <td style={{}}>
                            <InputComponent
                                type="text"
                                size="sm"
                                name="Unit"
                                value={Unit}
                                placeholder="Enter The Unit"
                                onchange={(e) => updateformSettings(e)}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>Blood Group</Typography></td>
                        <td style={{}}>
                            <Typography level="title-md" sx={{ ml: 1 }}>{selectedRowData?.group_name === "" ? "not updated" : selectedRowData?.group_name}  </Typography>

                        </td>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>Consultant </Typography></td>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>{em_name} </Typography></td>
                    </tr>
                </tbody>
            </Table>
            <Typography level="title-md" sx={{ mt: 1 }}>
                (To be filled in by the Medical Practitioner)
            </Typography>


            <Table aria-label="basic table" borderAxis="both" size='sm' variant="outlined" >

                <thead >
                    <tr>
                        <th><Typography level="title-md" sx={{ ml: 1 }}>Pulse(/MIN) </Typography></th>
                        <th><Typography level="title-md" sx={{ ml: 1 }}>Bp(mmHg) </Typography></th>
                        <th><Typography level="title-md" sx={{ ml: 1 }}>Resp(/MIN) </Typography></th>
                        <th><Typography level="title-md" sx={{ ml: 1 }}>Temp(F) </Typography></th>
                        <th><Typography level="title-md" sx={{ ml: 1 }}>Weight(KG) </Typography></th>
                        <th><Typography level="title-md" sx={{ ml: 1 }}>Height(CM) </Typography></th>
                        <th><Typography level="title-md" sx={{ ml: 1 }}>BMI</Typography></th>

                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <InputComponent
                                type="text"
                                size="sm"
                                name="Pulse"
                                value={Pulse}
                                onchange={(e) => updateformSettings(e)}
                            />
                        </td>
                        <td>
                            <InputComponent
                                type="text"
                                size="sm"
                                name="Bp"
                                value={Bp}
                                onchange={(e) => updateformSettings(e)}
                            />
                        </td>
                        <td>
                            <InputComponent
                                type="text"
                                size="sm"
                                name="Resp"
                                value={Resp}
                                onchange={(e) => updateformSettings(e)}
                            />
                        </td>
                        <td>
                            <InputComponent
                                type="text"
                                size="sm"
                                name="Temp"
                                value={Temp}
                                onchange={(e) => updateformSettings(e)}
                            />
                        </td>
                        <td>
                            <InputComponent
                                type="text"
                                size="sm"
                                name="Weight"
                                value={Weight}
                                onchange={(e) => updateformSettings(e)}
                            />
                        </td>
                        <td>
                            <InputComponent
                                type="text"
                                size="sm"
                                name="Height"
                                value={Height}
                                onchange={(e) => updateformSettings(e)}
                            />
                        </td>
                        <td>
                            <InputComponent
                                type="text"
                                size="sm"
                                name="BMI"
                                value={BMI}
                                onchange={(e) => updateformSettings(e)}
                            />
                        </td>

                    </tr>



                </tbody>
            </Table>

            <HealthCheckupExam formdata={formdata} setformdata={setformdata} selectedRowData={selectedRowData} />
        </Box>
    )
}

export default memo(HealthCheckDoc)