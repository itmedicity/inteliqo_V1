import { Box, Table, Typography } from '@mui/joy'
import { Paper, TableContainer } from '@mui/material'
import React, { lazy, memo, useEffect, useState } from 'react'
import CustomLayout from 'src/views/Component/MuiCustomComponent/CustomLayout'
import JoyBloodGroup from 'src/views/MuiComponents/JoyComponent/JoyBloodGroup'
import JoyDepartment from 'src/views/MuiComponents/JoyComponent/JoyDepartment'
import JoyGender from 'src/views/MuiComponents/JoyComponent/JoyGender'
import JoyInput from 'src/views/MuiComponents/JoyComponent/JoyInput'
import { setDepartment } from 'src/redux/actions/Department.action';
import { useDispatch } from 'react-redux'

const HealthCheckUpHistory = lazy(() => import('./HealthCheckUpHistory'))
const PreEmployementForm = () => {

    const [gender, setgender] = useState(0)
    const [Blood, setBlood] = useState(0)
    const [dept, setdept] = useState(0)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setDepartment());
    }, [dispatch])

    const [formdata, setformdata] = useState({
        Diabetes_yes: false,
        Diabetes_no: false,
        Diabetes_stillOn: false,
        Diabetes_notOn: false,
        Hypertension_statusyes: false,
        Hypertension_statusno: false,
        Hypertension_statusstillOn: false,
        Hypertension_statusnotOn: false,
        Heart_statusyes: false,
        Heart_statusno: false,
        Heart_statusstillOn: false,
        Heart_statusnotOn: false,
        Respiratory_status_yes: false,
        Respiratory_status_no: false,
        Respiratory_status_StillOn: false,
        Respiratory_status_notOn: false,
        AIDS_status_yes: false,
        AIDS_status_no: false,
        AIDS_status_stillOn: false,
        AIDS_status_notOn: false,
        Hepatitis_status_yes: false,
        Hepatitis_status_no: false,
        Hepatitis_status_StillOn: false,
        Hepatitis_status_notOn: false,
        Chickenpox_statusyes: false,
        Chickenpox_statusno: false,
        Chickenpox_statusStillOn: false,
        Chickenpox_statusnotOn: false,

    });
    return (
        <Box >
            <CustomLayout title="Pre Employment Health CheckUp Form" displayClose={true}>
                <Paper sx={{ height: window.innerHeight - 140, overflowX: "auto", '::-webkit-scrollbar': { display: "none" }, p: 1 }}>
                    <TableContainer sx={{}}>
                        <Table size='small' aria-label="basic table" borderAxis="both">
                            <tbody >
                                <tr sx={{ p: 0 }}>
                                    <td padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                        <Typography level="title-md" sx={{ ml: 1 }}> Name of the Candidate </Typography>
                                    </td>
                                    <td padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                        <JoyInput
                                            size="sm"
                                            // value={RelativeName}
                                            // onchange={setRelativeName}
                                            name="RelativeName"
                                            type="text"
                                            placeholder="Enter The Name"

                                        />
                                    </td>
                                </tr>
                                <tr sx={{ p: 0 }}>
                                    <td padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                        <Typography level="title-md" sx={{ ml: 1 }}>Age</Typography>
                                    </td>
                                    <td padding='none' sx={{ border: '1px solid #e0e0e0', width: "50%" }}>
                                        <JoyInput
                                            size="sm"
                                            // value={RelativeName}
                                            // onchange={setRelativeName}
                                            name="RelativeName"
                                            type="text"
                                            placeholder="Enter The Age"

                                        />
                                    </td>
                                </tr>
                                <tr sx={{ p: 0 }}>
                                    <td padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                        <Typography level="title-md" sx={{ ml: 1 }}>Gender  </Typography>
                                    </td>
                                    <td padding='none' sx={{ border: '1px solid #e0e0e0', width: "50%" }}>
                                        <JoyGender value={gender} setValue={setgender} />
                                    </td>
                                </tr>

                                <tr sx={{ p: 0 }}>
                                    <td padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                        <Typography level="title-md" sx={{ ml: 1 }}>Blood Group </Typography>
                                    </td>
                                    <td padding='none' sx={{ border: '1px solid #e0e0e0', width: "50%" }}>
                                        <JoyBloodGroup setValue={setBlood} value={Blood} />
                                    </td>
                                </tr>

                                <tr sx={{ p: 0 }}>
                                    <td padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                        <Typography level="title-md" sx={{ ml: 1 }}>Emp.ID </Typography>
                                    </td>
                                    <td padding='none' sx={{ border: '1px solid #e0e0e0', width: "50%" }}>
                                        <JoyInput
                                            size="sm"
                                            // value={RelativeName}
                                            // onchange={setRelativeName}
                                            name="RelativeName"
                                            type="text"
                                        />
                                    </td>
                                </tr>
                                <tr sx={{ p: 0 }}>
                                    <td padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                        <Typography level="title-md" sx={{ ml: 1 }}>Department </Typography>
                                    </td>
                                    <td padding='none' sx={{ border: '1px solid #e0e0e0', width: "50%" }}>
                                        <JoyDepartment deptValue={dept} getDept={setdept} />
                                    </td>
                                </tr>
                                <tr sx={{ p: 0 }}>
                                    <td padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                        <Typography level="title-md" sx={{ ml: 1 }}>Date Of Joining </Typography>
                                    </td>
                                    <td padding='none' sx={{ border: '1px solid #e0e0e0', width: "50%" }}>
                                        <JoyInput
                                            size="sm"
                                            // value={RelativeName}
                                            // onchange={setRelativeName}
                                            name="RelativeName"
                                            type="date"
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        </Table>

                    </TableContainer>
                    <HealthCheckUpHistory formdata={formdata} setformdata={setformdata} />
                </Paper>
            </CustomLayout>

        </Box>
    )
}

export default memo(PreEmployementForm)