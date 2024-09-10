import { Box, Button, Table, Tooltip, Typography } from '@mui/joy'
import { Paper, TableContainer } from '@mui/material'
import React, { lazy, memo, useCallback, useEffect, useMemo, useState } from 'react'
import CustomLayout from 'src/views/Component/MuiCustomComponent/CustomLayout'
import { setDepartment } from 'src/redux/actions/Department.action';
import { useDispatch, useSelector } from 'react-redux'
import _ from 'underscore';
import { axioslogin } from 'src/views/Axios/Axios';
import { succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';


const HealthCheckUpHistory = lazy(() => import('./HealthCheckUpHistory'))

const PreEmployementForm = ({ selectedRowData, Vaccdata, setflag }) => {

    const employeeState = useSelector((state) => state.getProfileData.ProfileData, _.isEqual);
    const employeeProfileDetl = useMemo(() => employeeState[0], [employeeState]);
    const { em_name, em_id } = employeeProfileDetl
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setDepartment());
    }, [dispatch])

    const [formdata, setformdata] = useState({
        em_name: em_name,
        // Employee_name: Employee_name,
        MRD_No: '',
        Unit: '',
        Pulse: '',
        Bp: '',
        Resp: '',
        Temp: '',
        Weight: '',
        Height: '',
        BMI: '',
        General_Examininations: "",
        DateOfSave: '',
        HBs_Ag_Titer: 0,
        Blood_Grouping: 0,
        Serology: 0,
        Check_X_ray: 0,
        Titer_Value_100: 0,
        Titer_Value_12: 0,
        Titer_Value_0: 0,
        Vacination_first: 0,
        Vacination_Second: 0,
        Vacination_Third: 0,
        Vacination_Booster: 0,
        titer_yes: 0,
        titer_no: 0,
        titer_date: '',
        Fitness_yes: 0,
        Fitness_no: 0,
        Other_Consultations: ""
    });

    const { MRD_No, Unit, Pulse, Bp, Resp, Temp, Weight, Height, BMI, General_Examininations, DateOfSave, HBs_Ag_Titer,
        Blood_Grouping, Serology, Check_X_ray, Titer_Value_100, Titer_Value_12, Titer_Value_0, Vacination_first,
        Vacination_Second, Vacination_Third, Vacination_Booster, titer_yes, titer_no, Fitness_yes, Fitness_no, Other_Consultations } = formdata

    const [List, setList] = useState([
        { slno: 1, name: 'Diabetes', history_yes: 0, history_no: 0, Long: "", Treatment_yes: 0, Treatment_no: 0, Medications: '' },
        { slno: 2, name: 'Hypertension', history_yes: 0, history_no: 0, Long: "", Treatment_yes: 0, Treatment_no: 0, Medications: '' },
        { slno: 3, name: 'Heart diseases', history_yes: 0, history_no: 0, Long: "", Treatment_yes: 0, Treatment_no: 0, Medications: '' },
        { slno: 4, name: 'Respiratory Diseases', history_yes: 0, history_no: 0, Long: "", Treatment_yes: 0, Treatment_no: 0, Medications: '' },
        { slno: 5, name: 'AIDS', history_yes: 0, history_no: 0, Long: "", Treatment_yes: 0, Treatment_no: 0, Medications: '' },
        { slno: 6, name: 'Hepatitis', history_yes: 0, history_no: 0, Long: "", Treatment_yes: 0, Treatment_no: 0, Medications: '' },
        { slno: 7, name: 'Chickenpox', history_yes: 0, history_no: 0, Long: "", Treatment_yes: 0, Treatment_no: 0, Medications: '' },
        { slno: 8, name: 'Other communicable diseases', history_yes: 0, history_no: 0, Long: "", Treatment_yes: 0, Treatment_no: 0, Medications: '' },
        { slno: 9, name: 'Allergy', history_yes: 0, history_no: 0, Long: "", Treatment_yes: 0, Treatment_no: 0, Medications: '' },
        { slno: 10, name: 'Have you had any work related health problem during the previous year ?', history_yes: 0, history_no: 0, Long: "", Treatment_yes: 0, Treatment_no: 0, Medications: '' },

    ]);
    //for save the data
    const postdata = useMemo(() => {
        return {
            em_no: selectedRowData?.em_no,
            em_id: selectedRowData?.em_id,
            doc_emid: em_id,
            department: selectedRowData?.em_department,
            MRD_No: MRD_No,
            Unit: Unit,
            Pulse: Pulse,
            Bp: Bp,
            Resp: Resp,
            Temp: Temp,
            Weight: Weight,
            Height: Height,
            BMI: BMI,
            General_Examininations: General_Examininations,
            DateOfSave: DateOfSave,
            HBs_Ag_Titer: HBs_Ag_Titer,
            Blood_Grouping: Blood_Grouping,
            Serology: Serology,
            Check_X_ray: Check_X_ray,
            Titer_Value_100: Titer_Value_100,
            Titer_Value_12: Titer_Value_12,
            Titer_Value_0: Titer_Value_0,
            Vacination_first: Vacination_first,
            Vacination_Second: Vacination_Second,
            Vacination_Third: Vacination_Third,
            Vacination_Booster: Vacination_Booster,
            titer_yes: titer_yes,
            titer_no: titer_no,
            Fitness_yes: Fitness_yes,
            Fitness_no: Fitness_no,
            Other_Consultations: Other_Consultations,
            List: List,
            formdata: formdata
        }
    }, [selectedRowData, formdata, List])
    const handleOnClick = useCallback(async (event) => {
        event.preventDefault()
        if (DateOfSave === "") {
            warningNofity("Please select the date")
        }
        else if (Fitness_yes === 0 & Fitness_no === 0) {
            warningNofity("Please Tick the accept/not accept in   Fitness Certificate ")
        }
        else {
            const result = await axioslogin.post('/AnnualHealthUp/AnnualHealthCheckUp', postdata)
            const { success } = result.data
            if (success === 1) {
                succesNofity("Data Inserted SuccessFully")
                setflag(0)
                setformdata(formdata)
            }
            else {
                warningNofity("Data Not Inserted")
            }
        }
    }, [postdata, formdata, setflag])

    return (
        <Box >
            <CustomLayout title="Annual Health CheckUp Form" displayClose={true}>
                <Paper sx={{ height: window.innerHeight - 140, overflowX: "auto", '::-webkit-scrollbar': { display: "none" }, p: 1 }}>
                    <TableContainer sx={{}}>
                        <Table size='small' aria-label="basic table" borderAxis="both">
                            <tbody >
                                <tr sx={{ p: 0 }}>
                                    <td padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                        <Typography level="title-md" sx={{ ml: 1 }}> Name of the Candidate </Typography>
                                    </td>
                                    <td padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                        <Typography level="title-md" sx={{ textTransform: 'capitalize', ml: 1 }}> {selectedRowData?.em_name?.toLowerCase() === "" ? "Not Updated" : selectedRowData?.em_name?.toLowerCase()}</Typography>
                                    </td>
                                </tr>
                                <tr sx={{ p: 0 }}>
                                    <td padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                        <Typography level="title-md" sx={{ ml: 1 }}>Age</Typography>
                                    </td>
                                    <td padding='none' sx={{ border: '1px solid #e0e0e0', width: "50%" }}>
                                        <Typography level="title-md" sx={{ ml: 1 }}>{selectedRowData?.em_age_year === 0 ? "not updated" : selectedRowData?.em_age_year}</Typography>
                                    </td>
                                </tr>
                                <tr sx={{ p: 0 }}>
                                    <td padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                        <Typography level="title-md" sx={{ ml: 1 }}>Gender  </Typography>
                                    </td>
                                    <td padding='none' sx={{ border: '1px solid #e0e0e0', width: "50%" }}>

                                        <Typography level="title-md" sx={{ ml: 1 }}>{selectedRowData?.gender === "" ? "not updated" : selectedRowData?.gender}  </Typography>
                                    </td>
                                </tr>

                                <tr sx={{ p: 0 }}>
                                    <td padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                        <Typography level="title-md" sx={{ ml: 1 }}>Blood Group </Typography>
                                    </td>
                                    <td padding='none' sx={{ border: '1px solid #e0e0e0', width: "50%" }}>
                                        <Typography level="title-md" sx={{ ml: 1 }}>{selectedRowData?.group_name === "" ? "not updated" : selectedRowData?.group_name}  </Typography>

                                    </td>
                                </tr>

                                <tr sx={{ p: 0 }}>
                                    <td padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                        <Typography level="title-md" sx={{ ml: 1 }}>Emp.ID </Typography>
                                    </td>
                                    <td padding='none' sx={{ border: '1px solid #e0e0e0', width: "50%" }}>
                                        <Typography level="title-md" sx={{ ml: 1 }}>{selectedRowData?.em_no === 0 ? "not updated" : selectedRowData?.em_no}  </Typography>

                                    </td>
                                </tr>
                                <tr sx={{ p: 0 }}>
                                    <td padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                        <Typography level="title-md" sx={{ ml: 1 }}>Department </Typography>
                                    </td>
                                    <td padding='none' sx={{ border: '1px solid #e0e0e0', width: "50%" }}>
                                        <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}>{selectedRowData?.dept_name?.toLowerCase() === "" ? "not updated" : selectedRowData?.dept_name?.toLowerCase()}  </Typography>

                                    </td>
                                </tr>
                                <tr sx={{ p: 0 }}>
                                    <td padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                        <Typography level="title-md" sx={{ ml: 1 }}>Designation</Typography>
                                    </td>
                                    <td padding='none' sx={{ border: '1px solid #e0e0e0', width: "50%" }}>
                                        <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}>{selectedRowData?.desg_name?.toLowerCase() === "" ? "not updated" : selectedRowData?.desg_name?.toLowerCase()}  </Typography>

                                    </td>
                                </tr>
                                <tr sx={{ p: 0 }}>
                                    <td padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                        <Typography level="title-md" sx={{ ml: 1 }}>Date Of Joining </Typography>
                                    </td>
                                    <td padding='none' sx={{ border: '1px solid #e0e0e0', width: "50%" }}>
                                        <Typography level="title-md" sx={{ ml: 1 }}>{selectedRowData?.em_doj === null ? "not updated" : selectedRowData?.em_doj}  </Typography>

                                    </td>
                                </tr>
                            </tbody>
                        </Table>

                    </TableContainer>
                    <HealthCheckUpHistory formdata={formdata} setformdata={setformdata} List={List} Vaccdata={Vaccdata}
                        setList={setList} selectedRowData={selectedRowData} />

                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', gap: 1 }}>

                        <Tooltip title="Save">
                            <Button
                                variant="outlined"
                                component="label"
                                size="sm"
                                color="primary"
                                onClick={handleOnClick}
                            >
                                Submit Application
                            </Button>
                        </Tooltip>
                    </Box>
                </Paper>
            </CustomLayout>

        </Box>
    )
}

export default memo(PreEmployementForm)