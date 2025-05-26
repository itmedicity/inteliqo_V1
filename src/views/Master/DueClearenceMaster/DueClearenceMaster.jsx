
import { Box, Button, CssVarsProvider } from '@mui/joy';
import { Grid, IconButton } from '@mui/material';
import React, { memo, useCallback, useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { axioslogin } from 'src/views/Axios/Axios';
import SessionCheck from 'src/views/Axios/SessionCheck';
import { errorNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';
import InputComponent from 'src/views/MuiComponents/JoyComponent/InputComponent';
import JoyCheckbox from 'src/views/MuiComponents/JoyComponent/JoyCheckbox';
import MasterLayout from '../MasterComponents/MasterLayout';
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';
import CommonAgGrid from 'src/views/Component/CommonAgGrid'
import { useMemo } from 'react';
import { employeeIdNumber } from 'src/views/Constant/Constant';

const DueClearenceMaster = () => {

    const [count, setCount] = useState(0)
    const [tableData, setTableData] = useState([])
    const [flag, setFlag] = useState(0)
    const [slno, setSlno] = useState(0)

    const [formData, setFormData] = useState({
        clrnce_desc: '',
        clrnce_shortname: '',
        clerence_status: false,
    })
    const { clrnce_desc, clrnce_shortname, clerence_status } = formData;

    const updateDueClearenceMaster = useCallback((e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData({ ...formData, [e.target.name]: value })
    }, [formData])

    const postData = useMemo(() => {
        return {
            due_desc: clrnce_desc,
            due_shortname: clrnce_shortname,
            due_status: clerence_status === true ? 1 : 0,
            create_user: employeeIdNumber()
        }
    }, [clrnce_desc, clrnce_shortname, clerence_status])

    const defaultState = useMemo(() => {
        return {
            clrnce_desc: '',
            clrnce_shortname: '',
            clerence_status: false,
        }
    }, [])

    const updateData = useMemo(() => {
        return {
            due_desc: clrnce_desc,
            due_shortname: clrnce_shortname,
            due_status: clerence_status === true ? 1 : 0,
            edit_user: employeeIdNumber(),
            duemast_slno: slno
        }
    }, [clrnce_desc, clrnce_shortname, slno, clerence_status])

    const submitFormData = useCallback(async (e) => {
        e.preventDefault();
        if (flag === 1) {
            const result = await axioslogin.patch('/duemast', updateData)
            const { success, message } = result.data
            if (success === 2) {
                setFormData(defaultState)
                succesNofity(message)
                setCount(count + 1)
                setFlag(0)
            }
            else if (success === 1) {
                warningNofity(message)
            }
            else {
                errorNofity(message)
            }
        } else {
            const result = await axioslogin.post('/duemast', postData)
            const { success, message } = result.data
            if (success === 1) {
                succesNofity(message)
                setCount(count + 1)
                setFormData(defaultState)
            }
            else if (success === 2) {
                warningNofity(message)
            }
            else if (success === 7) {
                errorNofity(message)
            }
            else {
                errorNofity(message)
            }
        }
    }, [flag, postData, count, defaultState, updateData])

    useEffect(() => {
        const getDueClearenc = async () => {
            const result = await axioslogin.get('./duemast')
            const { success, data } = result.data
            if (success === 1) {
                setTableData(data)
                setCount(0)
            } else {
                setTableData([])
            }
        }
        getDueClearenc()
    }, [count])

    const [columnDef] = useState([
        { headerName: 'Sl No', field: 'duemast_slno' },
        { headerName: 'Due Desc', field: 'due_desc', filter: true, width: 150 },
        { headerName: 'Short Name', field: 'due_shortname', filter: true, width: 150 },
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
        const { duemast_slno, due_desc, due_shortname, due_status, } = params.data
        const frmData = {
            clrnce_desc: due_desc,
            clrnce_shortname: due_shortname,
            clerence_status: due_status === 1 ? true : false
        }
        setFormData(frmData)
        setSlno(duemast_slno)
    }, [])

    return (
        <MasterLayout title="Due Clearence Master" displayClose={true} >
            <ToastContainer />
            <SessionCheck />
            <Box sx={{ width: "100%" }} >
                <Grid container spacing={1}>
                    <Grid item xl={3} lg={2}>
                        <Box sx={{ width: "100%", px: 1, mt: 0.5 }}>
                            <InputComponent
                                placeholder={'Clearence Desc'}
                                type="text"
                                size="sm"
                                name="clrnce_desc"
                                value={clrnce_desc}
                                onchange={(e) => updateDueClearenceMaster(e)}
                            />
                        </Box>
                        <Box sx={{ width: "100%", px: 1, mt: 0.5 }}>
                            <InputComponent
                                placeholder={'Short Name'}
                                type="text"
                                size="sm"
                                name="clrnce_shortname"
                                value={clrnce_shortname}
                                onchange={(e) => updateDueClearenceMaster(e)}
                            />
                        </Box>
                        <Box sx={{ pl: 1, mt: 0.5 }} >
                            <JoyCheckbox
                                label='Status'
                                checked={clerence_status}
                                name="clerence_status"
                                onchange={(e) => updateDueClearenceMaster(e)}
                            />
                        </Box>
                        <Box sx={{ px: 0.5, mt: 0.9 }}>
                            <CssVarsProvider>
                                <Button
                                    variant="outlined"
                                    component="label"
                                    size="md"
                                    color="primary"
                                    onClick={submitFormData}
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
};

export default memo(DueClearenceMaster) 
