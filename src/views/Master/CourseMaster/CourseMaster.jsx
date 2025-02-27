import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import SessionCheck from 'src/views/Axios/SessionCheck'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNofity, succesNofity } from 'src/views/CommonCode/Commonfunc'
import { employeeIdNumber } from 'src/views/Constant/Constant'
import MasterLayout from '../MasterComponents/MasterLayout'
import { Box, Button, CssVarsProvider } from '@mui/joy'
import EducationSelect from '../MasterComponents/EducationSelect'
import InputComponent from 'src/views/MuiComponents/JoyComponent/InputComponent'
import JoyCheckbox from 'src/views/MuiComponents/JoyComponent/JoyCheckbox'
import CommonAgGrid from 'src/views/Component/CommonAgGrid'
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton, Grid } from '@mui/material'

const CourseMaster = () => {
    const [count, setCount] = useState(0);
    const [tableData, setTableData] = useState([])
    const [flag, setFlag] = useState(0)
    const [slno, setSlno] = useState(0)
    const [education, setEducation] = useState(0)

    //Initializing
    const [type, setType] = useState({
        cour_desc: '',
        edu_slno: '',
        cour_status: false,
        cour_created: ''
    })

    //Destructuring
    const { cour_desc, cour_status } = type;
    const updateType = useCallback((e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setType({ ...type, [e.target.name]: value })
    }, [type])

    //Insert
    const postCourseData = useMemo(() => {
        return {
            cour_desc,
            edu_slno: education,
            cour_status: cour_status === true ? 1 : 0,
            cour_created: employeeIdNumber()
        }
    }, [cour_desc, education, cour_status])

    //Form resting
    const resetForm = useMemo(() => {
        return {
            cour_desc: '',
            edu_slno: '',
            cour_status: false
        }
    }, [])

    const updateData = useMemo(() => {
        return {
            cour_desc,
            edu_slno: education,
            cour_status: cour_status === true ? 1 : 0,
            cour_edit: employeeIdNumber(),
            cour_slno: slno
        }
    }, [cour_desc, education, cour_status, slno])

    //Form Submitting
    const submitType = useCallback(async (e) => {
        e.preventDefault();
        if (flag === 1) {
            const result = await axioslogin.patch('/course', updateData)
            const { message, success } = result.data;
            if (success === 2) {
                succesNofity(message);
                setCount(count + 1);
                setType(resetForm);
                setEducation(0);
            } else if (success === 0) {
                infoNofity(message.sqlMessage);
            } else {
                infoNofity(message)
            }
        } else {
            const result = await axioslogin.post('/course', postCourseData)
            const { message, success } = result.data;
            if (success === 1) {
                succesNofity(message);
                setCount(count + 1);
                setType(resetForm);
                setEducation(0);
            } else if (success === 0) {
                infoNofity(message.sqlMessage);
            } else {
                infoNofity(message)
            }
        }
    }, [count, flag, resetForm, updateData, postCourseData])

    //Get Data
    useEffect(() => {
        const getCourse = async () => {
            const result = await axioslogin.get('/course')
            const { success, data } = result.data;
            if (success === 1) {
                setTableData(data);
                setCount(0)
            } else {
                setTableData([])
            }
        }
        getCourse();
    }, [count]);

    const [columnDef] = useState([
        { headerName: 'Sl No', field: 'cour_slno' },
        { headerName: 'Board Name', field: 'cour_desc', filter: true, width: 250 },
        { headerName: 'Education Name', field: 'edu_desc', filter: true, width: 250 },
        { headerName: 'Status ', field: 'status', width: 100 },
        {
            headerName: 'Edit', cellRenderer: params =>
                <IconButton sx={{ paddingY: 0.5 }} onClick={() => getEdit(params)} >
                    <EditIcon color='primary' />
                </IconButton>
        },
    ])

    const getEdit = useCallback((params) => {
        setFlag(1)
        const { cour_slno, cour_desc, cour_status, edu_slno } = params.data
        const frmdata = {
            cour_desc: cour_desc,
            cour_status: cour_status === 1 ? true : false
        }
        setType(frmdata)
        setSlno(cour_slno)
        setEducation(edu_slno)
    }, [])

    return (
        <MasterLayout title="Course Master" displayClose={true} >
            <ToastContainer />
            <SessionCheck />
            <Box sx={{ width: "100%" }} >
                <Grid container spacing={1}>
                    <Grid item xl={3} lg={2}>
                        <Box sx={{ width: "100%", px: 1, mt: 0.5 }}>
                            <InputComponent
                                placeholder={'Board Name'}
                                type="text"
                                size="sm"
                                name="cour_desc"
                                value={cour_desc}
                                onchange={(e) => updateType(e)}
                            />
                        </Box>
                        <Box sx={{ width: "100%", px: 1, mt: 0.5 }}>
                            <EducationSelect value={education} setValue={setEducation} />
                        </Box>
                        <Box sx={{ pl: 1, mt: 0.5 }} >
                            <JoyCheckbox
                                label='Status'
                                checked={cour_status}
                                name="cour_status"
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
                                height: 400,
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

export default memo(CourseMaster) 
