import React, { memo, useEffect, useMemo, useState } from 'react'
import { infoNofity, succesNofity } from 'src/views/CommonCode/Commonfunc'
import { axioslogin } from 'src/views/Axios/Axios'
import CustomLayout from 'src/views/Component/MuiCustomComponent/CustomLayout'
import { Box, Button, CssVarsProvider, Tooltip } from '@mui/joy'
import DepartmentDropRedx from 'src/views/Component/ReduxComponent/DepartmentRedx';
import DepartmentSectionRedx from 'src/views/Component/ReduxComponent/DepartmentSectionRedx';
import { Paper, Typography } from '@mui/material'
import SectionBsdEmployee from 'src/views/Component/ReduxComponent/SectionBsdEmployee';
import { useDispatch, useSelector } from 'react-redux'
import { setDepartment } from 'src/redux/actions/Department.action'
import AddTaskRoundedIcon from '@mui/icons-material/AddTaskRounded';
import SaveIcon from '@mui/icons-material/Save';
import JoyCheckbox from 'src/views/MuiComponents/JoyComponent/JoyCheckbox'
import InputComponent from 'src/views/MuiComponents/JoyComponent/InputComponent'
import JoyDesignationSelect from 'src/views/MuiComponents/JoyComponent/JoyDesignationSelect'
import { setPersonalData } from 'src/redux/actions/Profile.action'
import _ from 'underscore'
import { employeeNumber } from 'src/views/Constant/Constant'
import JoyInput from 'src/views/MuiComponents/JoyComponent/JoyInput'
import moment from 'moment'

const DepartmentSecChange = () => {

    const dispatch = useDispatch();

    const [dept, changeDept] = useState(0)
    const [deptsection, changeSection] = useState(0)
    const [emply, getEmployee] = useState(0);

    const [newDept, setNewDept] = useState(0)
    const [newDeptSect, setNewDeptSect] = useState(0)
    const [weekoff, setweekoff] = useState(false)
    const [designation, setDesignation] = useState(0)
    const [deptChangeDate, setDeptChangeDate] = useState('')
    const [desgChangeDtae, setDesgChangeDate] = useState('')

    useEffect(() => {
        dispatch(setDepartment());
    }, [dispatch])

    useEffect(() => {

        if (emply.em_id !== 0) {
            dispatch(setPersonalData(emply.em_id));
        }

    }, [emply])

    const employeeState = useSelector((state) => state?.getPrifileDateEachEmp?.empPersonalData?.personalData, _.isEqual);
    const { desg_name, em_department, em_dept_section, em_designation, em_no,
        em_branch } = employeeState;
    console.log(employeeState);

    //update Data
    const patchData = useMemo(() => {
        return {
            em_department: newDept !== 0 ? newDept : em_department,
            em_dept_section: newDeptSect !== 0 ? newDeptSect : em_dept_section,
            em_designation: designation !== 0 ? designation : em_designation,
            saturday_weekoff: weekoff === true ? 1 : 0,
            em_id: emply.em_id,
            create_user: employeeNumber(),
            edit_user: employeeNumber(),
            em_no: em_no,
            com_designation: em_designation,
            com_designation_new: designation !== 0 ? designation : em_designation,
            ineffective_date: designation !== 0 ? desgChangeDtae : moment(new Date()).format('YYYY-MM-DD'),
            section_change_date: newDeptSect !== 0 ? deptChangeDate : moment(new Date()).format('YYYY-MM-DD'),
            com_branch: em_branch,
            com_dept: em_department,
            com_deptsec: em_dept_section,
            dept_new: newDept,
            deptsect_new: newDeptSect
        }
    }, [newDept, newDeptSect, weekoff, em_department, em_dept_section, desgChangeDtae, deptChangeDate,
        emply, em_branch, designation, em_designation])

    console.log(desgChangeDtae);
    console.log(deptChangeDate);

    //Update Function
    const submitChange = async (e) => {
        e.preventDefault();
        if (dept === 0 || deptsection === 0) {
            infoNofity("Select Department & department Section")
        } else {
            const result = await axioslogin.post('/empmast/company/dept', patchData)
            const { message, success } = result.data;
            if (success === 1) {
                const result = await axioslogin.patch('/empmast/empmaster/deptsecChange', patchData)
                const { message, success } = result.data;
                if (success === 2) {
                    succesNofity(message);
                } else if (success === 0) {
                    infoNofity(message.sqlMessage);
                }
            } else {
                infoNofity(message)
            }

        }
    }



    return (
        <CustomLayout title="Change Employee Department/ Section/Designation" displayClose={true} >
            <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                <Paper variant="outlined" sx={{
                    width: '100%', p: 0.5, display: 'flex',
                    flexDirection: 'row',
                }}  >
                    <Box sx={{ flex: 1, px: 0.5 }}>
                        <DepartmentDropRedx getDept={changeDept} />
                    </Box>
                    <Box sx={{ flex: 1, px: 0.5 }}>
                        <DepartmentSectionRedx getSection={changeSection} />
                    </Box>
                    <Box sx={{ flex: 1, px: 0.5 }}>
                        <SectionBsdEmployee getEmploy={getEmployee} />
                    </Box>
                </Paper>
                <Paper variant="outlined" sx={{
                    width: '100%', p: 0.5, display: 'flex',
                    flexDirection: 'row',
                }}  >
                    <Box sx={{ flex: 1, px: 0.5, fontWeight: 500 }}>
                        <CssVarsProvider>
                            <Typography level="body1" fontSize="md">New Department & Section </Typography>
                        </CssVarsProvider>
                    </Box>
                    <Box sx={{ flex: 1, px: 0.5 }}>
                        <DepartmentDropRedx getDept={setNewDept} />
                    </Box>
                    <Box sx={{ flex: 1, px: 0.5 }}>
                        <DepartmentSectionRedx getSection={setNewDeptSect} />
                    </Box>
                    <Box sx={{ flex: 1, px: 0.5 }}>

                        <JoyInput
                            type="date"
                            size="sm"
                            name="deptChangeDate"
                            value={deptChangeDate}
                            onchange={setDeptChangeDate}
                        />
                    </Box>
                </Paper>
                <Paper variant="outlined" sx={{
                    width: '100%', p: 0.5, display: 'flex',
                    flexDirection: 'row',
                }}  >
                    <Box sx={{ flex: 1, px: 0.5, fontWeight: 500 }}>
                        <CssVarsProvider>
                            <Typography level="body1" fontSize="md">New Designation </Typography>
                        </CssVarsProvider>
                    </Box>
                    <Box sx={{ flex: 1, px: 0.5 }}>
                        <InputComponent
                            type="text"
                            size="sm"
                            placeholder="Existing Designation"
                            disabled={true}
                            name="desg_name"
                            value={desg_name}
                        />
                    </Box>
                    <Box sx={{ flex: 1, px: 0.5 }}>
                        <JoyDesignationSelect desgValue={designation} getDesg={setDesignation} />
                    </Box>
                    <Box sx={{ flex: 1, px: 0.5 }}>
                        <JoyInput
                            type="date"
                            size="sm"
                            name="desgChangeDtae"
                            value={desgChangeDtae}
                            onchange={setDesgChangeDate}
                        />
                    </Box>

                    <Box sx={{
                        display: 'flex', px: 1, py: 0.5,
                    }} >
                        <JoyCheckbox
                            label='Check If Saturday/Sunday Week off'
                            name="weekoff"
                            checked={weekoff}
                            onchange={(e) => setweekoff(e.target.checked)}
                        />
                    </Box>
                    <Box sx={{
                        display: 'flex', flex: { xs: 0, sm: 0, md: 0, lg: 0, xl: 0, },
                        justifyContent: 'flex-start', pl: 0.5,
                    }} >
                        <CssVarsProvider>
                            <Tooltip title="Save" followCursor placement='top' arrow >
                                <Button
                                    aria-label="Like"
                                    variant="outlined"
                                    color="neutral"
                                    onClick={submitChange}
                                    fullWidth
                                    startDecorator={<SaveIcon />}
                                    sx={{ mx: 0.5 }}
                                >
                                    Save
                                </Button>
                            </Tooltip>
                        </CssVarsProvider>
                    </Box>
                </Paper>
            </Box>
        </CustomLayout>
    )
}

export default memo(DepartmentSecChange)