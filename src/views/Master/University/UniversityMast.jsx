import { Box, Button, CssVarsProvider } from '@mui/joy'
import { Grid, IconButton } from '@mui/material'
import React, { memo, useCallback, useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import { axioslogin } from 'src/views/Axios/Axios'
import SessionCheck from 'src/views/Axios/SessionCheck'
import { errorNofity, infoNofity, succesNofity } from 'src/views/CommonCode/Commonfunc'
import CommonAgGrid from 'src/views/Component/CommonAgGrid'
import { employeeIdNumber } from 'src/views/Constant/Constant'
import InputComponent from 'src/views/MuiComponents/JoyComponent/InputComponent'
import JoyCheckbox from 'src/views/MuiComponents/JoyComponent/JoyCheckbox'
import MasterLayout from '../MasterComponents/MasterLayout'
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';
import { useMemo } from 'react'

const UniversityMast = () => {
    const [count, setcount] = useState(0);
    const [tableData, setTableData] = useState([])
    const [flag, setFlag] = useState(0)
    const [slno, setSlno] = useState(0)

    //Initializing
    const [formData, setFormData] = useState({
        unver_name: '',
        unver_status: false,
        unver_alias: ''
    });

    // Destructuring
    const { unver_name, unver_status, unver_alias } = formData;
    const getUniversityFormData = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData({ ...formData, [e.target.name]: value });
    }

    const postFormData = useMemo(() => {
        return {
            unver_name,
            unver_alias,
            unver_status: unver_status === true ? 1 : 0,
            create_user: employeeIdNumber()
        }
    }, [unver_name, unver_alias, unver_status])

    // reset form
    const resetForm = useMemo(() => {
        return {
            unver_name: '',
            unver_alias: '',
            unver_status: false
        }
    }, [])
    const postUniversity = useMemo(() => {
        return {
            unver_name,
            unver_status: unver_status === true ? 1 : 0,
            unver_alias,
            unver_slno: slno,
            edit_user: employeeIdNumber()
        }
    }, [unver_name, unver_alias, unver_status, slno])

    //Insert
    const submitFormUpdate = useCallback(async (e) => {
        e.preventDefault();
        if (flag === 1) {
            const result = await axioslogin.patch('/university', postUniversity)
            const { message, success } = result.data;
            if (success === 2) {
                setFormData(resetForm);
                setcount(count + 1);
                succesNofity(message);
            } else if (success === 0) {
                infoNofity(message.sqlMessage);
            } else {
                infoNofity(message)
            }
        } else {
            const result = await axioslogin.post('/university', postFormData);
            const { message, success } = result.data;
            if (success === 1) {
                succesNofity(message);
                setcount(count + 1);
                setFormData(resetForm);
            } else if (success === 0) {
                errorNofity(message);
            } else if (success === 2) {
                infoNofity(message.sqlMessage);
            } else {
                errorNofity(message)
            }
        }
    }, [flag, count, resetForm, postFormData, postUniversity])

    //GetData
    useEffect(() => {
        const getUniversityDetl = async () => {
            const result = await axioslogin.get('/university');
            const { success, data } = result.data;
            if (success === 1) {
                setTableData(data);
                setcount(0)
            } else {
                setTableData([])
            }
        }
        getUniversityDetl();
    }, [count]);


    const [columnDef] = useState([
        { headerName: 'Sl No', field: 'unver_slno' },
        { headerName: 'University Name', field: 'unver_name', filter: true, width: 300 },
        { headerName: 'Alias', field: 'unver_alias', filter: true, width: 150 },
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
        const { unver_slno, unver_name, unver_alias, unver_status } = params.data
        const frmdata = {
            unver_name: unver_name,
            unver_alias: unver_alias,
            unver_status: unver_status === 1 ? true : false
        }
        setFormData(frmdata)
        setSlno(unver_slno)
    }, [])

    return (
        <MasterLayout title="University Master" displayClose={true} >
            <ToastContainer />
            <SessionCheck />
            <Box sx={{ width: "100%" }} >
                <Grid container spacing={1}>
                    <Grid item xl={3} lg={2}>
                        <Box sx={{ width: "100%", px: 1, mt: 0.5 }}>
                            <InputComponent
                                placeholder={'University Name'}
                                type="text"
                                size="sm"
                                name="unver_name"
                                value={unver_name}
                                onchange={(e) => getUniversityFormData(e)}
                            />
                        </Box>
                        <Box sx={{ width: "100%", px: 1, mt: 0.5 }}>
                            <InputComponent
                                placeholder={'Short Name'}
                                type="text"
                                size="sm"
                                name="unver_alias"
                                value={unver_alias}
                                onchange={(e) => getUniversityFormData(e)}
                            />
                        </Box>
                        <Box sx={{ pl: 1, mt: 0.5 }} >
                            <JoyCheckbox
                                label='Status'
                                checked={unver_status}
                                name="unver_status"
                                onchange={(e) => getUniversityFormData(e)}
                            />
                        </Box>
                        <Box sx={{ px: 0.5, mt: 0.9 }}>
                            <CssVarsProvider>
                                <Button
                                    variant="outlined"
                                    component="label"
                                    size="md"
                                    color="primary"
                                    onClick={submitFormUpdate}
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

export default memo(UniversityMast) 
