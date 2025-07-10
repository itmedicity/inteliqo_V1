import React, { memo, useEffect, useMemo, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import SessionCheck from 'src/views/Axios/SessionCheck'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNofity, succesNofity } from 'src/views/CommonCode/Commonfunc'
import { employeeIdNumber } from 'src/views/Constant/Constant'
import { useCallback } from 'react'
import MasterLayout from '../MasterComponents/MasterLayout'
import { Box, Button, CssVarsProvider } from '@mui/joy'
import { Grid, IconButton } from '@mui/material'
import InputComponent from 'src/views/MuiComponents/JoyComponent/InputComponent'
import CourseSelect from '../MasterComponents/CourseSelect'
import JoyCheckbox from 'src/views/MuiComponents/JoyComponent/JoyCheckbox'
import CommonAgGrid from 'src/views/Component/CommonAgGrid'
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';

const SpecializationMaster = () => {

    const [count, setCount] = useState(0);
    const [course, setCourse] = useState(0)
    const [tableData, setTableData] = useState([])
    const [flag, setFlag] = useState(0)
    const [slno, setSlno] = useState(0)

    //Initializing
    const [type, setType] = useState({
        spec_desc: '',
        cour_slno: '',
        spec_status: false,
        reg_mandatory: false
    })

    //Destucturing
    const { spec_desc, spec_status, reg_mandatory } = type;
    const updateType = useCallback((e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setType({ ...type, [e.target.name]: value })
    }, [type])

    //Insert
    const postSpecData = useMemo(() => {
        return {
            spec_desc,
            cour_slno: course,
            spec_status: spec_status === true ? 1 : 0,
            create_user: employeeIdNumber(),
            reg_mandatory: reg_mandatory === true ? 1 : 0
        }
    }, [spec_desc, course, spec_status, reg_mandatory])

    //Form resting
    const resetForm = useMemo(() => {
        return {
            spec_desc: '',
            cour_slno: '',
            spec_status: false
        }
    }, [])

    const updateData = useMemo(() => {
        return {
            spec_desc,
            cour_slno: course,
            spec_status: spec_status === true ? 1 : 0,
            reg_mandatory: reg_mandatory === true ? 1 : 0,
            edit_user: employeeIdNumber(),
            spec_slno: slno
        }
    }, [spec_desc, course, slno, spec_status, reg_mandatory])

    //Form Submitting
    const submitType = useCallback(async (e) => {
        e.preventDefault();
        if (flag === 1) {
            const result = await axioslogin.patch('/specilization', updateData)
            const { message, success } = result.data;
            if (success === 2) {
                setType(resetForm);
                setCount(count + 1);
                succesNofity(message);
                setCourse(0)
                setFlag(0)
            } else if (success === 0) {
                infoNofity(message.sqlMessage);
            } else {
                infoNofity(message)
            }
        } else {
            const result = await axioslogin.post('/specilization', postSpecData)
            const { message, success } = result.data;
            if (success === 1) {
                succesNofity(message);
                setCount(count + 1);
                setType(resetForm);
                setCourse(0)
            } else if (success === 0) {
                infoNofity(message.sqlMessage);
            } else {
                infoNofity(message)
            }
        }
    }, [postSpecData, resetForm, count, updateData, flag])

    //Get data
    useEffect(() => {
        const getSpec = async () => {
            const result = await axioslogin.get('/specilization')
            const { success, data } = result.data;
            if (success === 1) {
                setTableData(data);
                setCount(0)
            } else {
                setTableData([])
            }
        }
        getSpec();
    }, [count]);

    const [columnDef] = useState([
        { headerName: 'Sl No', field: 'spec_slno', width: 100 },
        { headerName: 'Specialization', field: 'spec_desc', filter: true, width: 250 },
        { headerName: 'Course', field: 'cour_desc', filter: true, width: 150 },
        { headerName: 'Status ', field: 'status', width: 100 },
        { headerName: 'Mandator/Not ', field: 'mandatory', width: 100 },
        {
            headerName: 'Edit', cellRenderer: params =>
                <IconButton sx={{ paddingY: 0.5 }} onClick={() => getEdit(params)} >
                    <EditIcon color='primary' />
                </IconButton>
        },
    ])

    const getEdit = useCallback((params) => {
        setFlag(1)
        const { spec_slno, spec_desc, cour_slno, spec_status, reg_mandatory } = params.data
        const frmdata = {
            spec_desc: spec_desc,
            spec_status: spec_status === 1 ? true : false,
            reg_mandatory: reg_mandatory === 1 ? true : false
        }
        setType(frmdata)
        setCourse(cour_slno)
        setSlno(spec_slno)
    }, [])

    return (
        <MasterLayout title="Specialization Master" displayClose={true} >
            <ToastContainer />
            <SessionCheck />
            <Box sx={{ width: "100%" }} >
                <Grid container spacing={1}>
                    <Grid item xl={3} lg={2}>
                        <Box sx={{ width: "100%", px: 1, mt: 0.5 }}>
                            <InputComponent
                                placeholder={'Specialization*'}
                                type="text"
                                size="sm"
                                name="spec_desc"
                                value={spec_desc}
                                onchange={(e) => updateType(e)}
                            />
                        </Box>
                        <Box sx={{ width: "100%", px: 1, mt: 0.5 }}>
                            <CourseSelect courseValue={course} getCourse={setCourse} />
                        </Box>
                        <Box sx={{ pl: 1, mt: 0.5 }} >
                            <JoyCheckbox
                                label='Set Registration Number Mandatory'
                                checked={reg_mandatory}
                                name="reg_mandatory"
                                onchange={(e) => updateType(e)}
                            />
                        </Box>
                        <Box sx={{ pl: 1, mt: 0.5 }} >
                            <JoyCheckbox
                                label='Status'
                                checked={spec_status}
                                name="spec_status"
                                onchange={(e) => updateType(e)}
                            />
                        </Box>
                        <Box sx={{ px: 0.5, mt: 0.9 }}>
                            <CssVarsProvider>
                                <Button
                                    variant="outlined"
                                    component="label"
                                    size="md"
                                    color="primary"
                                    onClick={submitType}
                                >
                                    <SaveIcon />
                                </Button>
                            </CssVarsProvider>
                        </Box>
                    </Grid>
                    <Grid item xs={9} lg={9} xl={9} md={9}>
                        <CommonAgGrid
                            columnDefs={columnDef}
                            tableData={tableData}
                            sx={{
                                height: 500,
                                width: "100%"
                            }}
                            rowHeight={30}
                            headerHeight={30}
                        />
                    </Grid>
                </Grid>
            </Box>
        </MasterLayout>
    )
}

export default memo(SpecializationMaster) 
