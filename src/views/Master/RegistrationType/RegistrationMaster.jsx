import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import SessionCheck from 'src/views/Axios/SessionCheck'
import { infoNofity, succesNofity } from 'src/views/CommonCode/Commonfunc'
import { axioslogin } from 'src/views/Axios/Axios'
import { employeeIdNumber } from 'src/views/Constant/Constant'
import MasterLayout from '../MasterComponents/MasterLayout'
import { Box, Button, CssVarsProvider } from '@mui/joy'
import { Grid, IconButton } from '@mui/material'
import InputComponent from 'src/views/MuiComponents/JoyComponent/InputComponent'
import JoyCheckbox from 'src/views/MuiComponents/JoyComponent/JoyCheckbox'
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';
import CommonAgGrid from 'src/views/Component/CommonAgGrid'

const RegistrationMaster = () => {
    const [count, setCount] = useState(0);
    const [slno, setSlno] = useState(0)
    const [tableData, setTableData] = useState([])
    const [flag, setFlag] = useState(0)

    //Intializing
    const [type, setType] = useState({
        registration_name: '',
        registration_status: false,
        create_user: ''
    });

    //Destructuring
    const { registration_name, registration_status } = type;

    const updateType = useCallback((e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setType({ ...type, [e.target.name]: value })
    }, [type])

    const postRegistationData = useMemo(() => {
        return {
            registration_name,
            registration_status: registration_status === true ? 1 : 0,
            create_user: employeeIdNumber()
        }
    }, [registration_name, registration_status])

    const resetForm = useMemo(() => {
        return {
            registration_name: '',
            registration_status: false
        }
    }, [])

    const postRegistation = useMemo(() => {
        return {
            registration_name,
            registration_status: registration_status === true ? 1 : 0,
            reg_id: slno,
            edit_user: employeeIdNumber()
        }
    }, [registration_name, registration_status, slno])

    //Insert
    const submitType = useCallback(async (e) => {
        e.preventDefault();
        if (flag === 1) {
            const result = await axioslogin.patch('/regtype', postRegistation)
            const { message, success } = result.data;
            if (success === 2) {
                setType(resetForm);
                succesNofity(message);
                setCount(count + 1);
                setFlag(0)
            } else if (success === 0) {
                infoNofity(message.sqlMessage);
            } else {
                infoNofity(message)
            }
        } else {
            const result = await axioslogin.post('/regtype', postRegistationData)
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
    }, [flag, count, postRegistationData, postRegistation, resetForm])

    //GetData
    useEffect(() => {
        const getRegistration = async () => {
            const result = await axioslogin.get('/regtype')
            const { success, data } = result.data;
            if (success === 1) {
                setTableData(data);
                setCount(0)
            } else {
                setTableData([])
            }
        }
        getRegistration();
    }, [count]);

    const [columnDef] = useState([
        { headerName: 'Sl No', field: 'reg_id' },
        { headerName: 'Registration Name', field: 'registration_name', filter: true, width: 150 },
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
        const { reg_id, registration_name, registration_status } = params.data
        const frmdata = {
            registration_name: registration_name,
            registration_status: registration_status === 1 ? true : false
        }
        setType(frmdata)
        setSlno(reg_id)
    }, [])

    return (
        <MasterLayout title="Registation Type" displayClose={true} >
            <ToastContainer />
            <SessionCheck />
            <Box sx={{ width: "100%" }} >
                <Grid container spacing={1}>
                    <Grid item xl={3} lg={2}>
                        <Box sx={{ width: "100%", px: 1, mt: 0.5 }}>
                            <InputComponent
                                placeholder={'Registration Name'}
                                type="text"
                                size="sm"
                                name="registration_name"
                                value={registration_name}
                                onchange={(e) => updateType(e)}
                            />
                        </Box>
                        <Box sx={{ pl: 1, mt: 0.5 }} >
                            <JoyCheckbox
                                label='Status'
                                checked={registration_status}
                                name="registration_status"
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

export default memo(RegistrationMaster) 
