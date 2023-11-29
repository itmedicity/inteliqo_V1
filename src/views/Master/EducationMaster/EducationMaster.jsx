import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNofity, succesNofity } from 'src/views/CommonCode/Commonfunc'
import { employeeNumber } from 'src/views/Constant/Constant'
import MasterLayout from '../MasterComponents/MasterLayout'
import InputComponent from 'src/views/MuiComponents/JoyComponent/InputComponent'
import { Box, Grid, IconButton } from '@mui/material'
import JoyCheckbox from 'src/views/MuiComponents/JoyComponent/JoyCheckbox'
import { Button, CssVarsProvider } from '@mui/joy'
import CommonAgGrid from 'src/views/Component/CommonAgGrid'
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';

const EducationMaster = () => {
    const [count, setCount] = useState(0);
    const [slno, setSlno] = useState(0)
    const [tableData, setTableData] = useState([])
    const [flag, setFlag] = useState(0)

    //Initializing
    const [type, setType] = useState({
        edu_desc: '',
        edu_status: false,
        edu_create: ''
    });

    //destructuring
    const { edu_desc, edu_status } = type;
    const updateType = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setType({ ...type, [e.target.name]: value })
    }

    //insert
    const postEduData = useMemo(() => {
        return {
            edu_desc,
            edu_status: edu_status === true ? 1 : 0,
            edu_create: employeeNumber()
        }
    }, [edu_desc, edu_status])

    //Form Reseting
    const resetForm = useMemo(() => {
        return {
            edu_desc: '',
            edu_status: false
        }
    }, [])

    //Post Data
    const postEdu = useMemo(() => {
        return {
            edu_desc,
            edu_status: edu_status === true ? 1 : 0,
            edu_slno: slno,
            edu_edit: employeeNumber()
        }
    }, [edu_desc, slno, edu_status])

    //Form Submitting
    const submitType = useCallback(async (e) => {
        e.preventDefault();
        if (flag === 1) {
            const result = await axioslogin.patch('/edu', postEdu)
            const { message, success } = result.data;
            if (success === 2) {
                setType(resetForm);
                succesNofity(message);
                setCount(count + 1);
            } else if (success === 0) {
                infoNofity(message.sqlMessage);
            } else {
                infoNofity(message)
            }
        } else {
            const result = await axioslogin.post('/edu', postEduData)
            const { message, success } = result.data;
            if (success === 1) {
                succesNofity(message);
                setCount(count + 1);
                setType(resetForm);
            } else if (success === 0) {
                infoNofity(message);
            } else {
                infoNofity(message)
            }
        }

    }, [flag, postEduData, postEdu, count, resetForm])

    // Get data
    useEffect(() => {
        const getEdu = async () => {
            const result = await axioslogin.get('/edu')
            const { success, data } = result.data;
            if (success === 1) {
                setTableData(data);
                setCount(0);
            } else {
                setTableData([])
            }
        }
        getEdu();
    }, [count]);

    const [columnDef] = useState([
        { headerName: 'Sl No', field: 'edu_slno' },
        { headerName: 'Education', field: 'edu_desc', filter: true, width: 150 },
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
        const { edu_slno,
            edu_desc,
            edu_status } = params.data

        const frmdata = {
            edu_desc: edu_desc,
            edu_status: edu_status === 1 ? true : false
        }
        setType(frmdata)
        setSlno(edu_slno)

    }, [])


    return (
        <MasterLayout title="Education Master" displayClose={true} >
            <ToastContainer />
            <Box sx={{ width: "100%" }} >
                <Grid container spacing={1}>
                    <Grid item xl={3} lg={2}>
                        <Box sx={{ width: "100%", p: 1 }}>
                            <InputComponent
                                placeholder={'Education'}
                                type="text"
                                size="sm"
                                name="edu_desc"
                                value={edu_desc}
                                onchange={(e) => updateType(e)}
                            />
                        </Box>
                        <Box sx={{ pl: 1 }} >
                            <JoyCheckbox
                                label='Status'
                                checked={edu_status}
                                name="edu_status"
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

export default memo(EducationMaster) 
