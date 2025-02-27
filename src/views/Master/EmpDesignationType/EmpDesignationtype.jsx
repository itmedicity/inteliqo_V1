import { Box, Button, CssVarsProvider } from '@mui/joy'
import { Grid, IconButton } from '@mui/material'
import React, { memo, useCallback, useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import { axioslogin } from 'src/views/Axios/Axios'
import SessionCheck from 'src/views/Axios/SessionCheck'
import { errorNofity, infoNofity, succesNofity } from 'src/views/CommonCode/Commonfunc'
import { employeeIdNumber } from 'src/views/Constant/Constant'
import InputComponent from 'src/views/MuiComponents/JoyComponent/InputComponent'
import JoyCheckbox from 'src/views/MuiComponents/JoyComponent/JoyCheckbox'
import MasterLayout from '../MasterComponents/MasterLayout'
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';
import CommonAgGrid from 'src/views/Component/CommonAgGrid'
import { useMemo } from 'react'

const EmpDesignationtype = () => {

    const [slno, setSlno] = useState(0)
    const [tableData, setTableData] = useState([])
    const [flag, setFlag] = useState(0)
    const [count, setCount] = useState(0);

    const [formData, getFormData] = useState({
        inst_emp_type: '',
        inst_emp_status: false
    });
    const { inst_emp_type, inst_emp_status } = formData;

    const updateFormDatatoState = useCallback((e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        getFormData({ ...formData, [e.target.name]: value });
    }, [formData])

    const postFormdata = useMemo(() => {
        return {
            inst_emp_type,
            inst_emp_status: inst_emp_status === true ? 1 : 0,
            create_user: employeeIdNumber()
        }
    }, [inst_emp_type, inst_emp_status])

    const resetForm = useMemo(() => {
        return {
            inst_emp_type: '',
            inst_emp_status: false
        }
    }, [])

    const postInstitutionData = useMemo(() => {
        return {
            inst_emp_type,
            inst_emp_status: inst_emp_status === true ? 1 : 0,
            edit_user: employeeIdNumber(),
            inst_slno: slno
        }
    }, [inst_emp_type, inst_emp_status, slno])

    const submitFormData = useCallback(async (e) => {
        e.preventDefault();
        if (flag === 1) {
            const result = await axioslogin.patch('/inst', postInstitutionData)
            const { message, success } = result.data;
            if (success === 2) {
                getFormData(resetForm);
                setCount(count + 1);
                succesNofity(message);
                setFlag(1)
            } else if (success === 0) {
                infoNofity(message.sqlMessage);
            } else {
                infoNofity(message)
            }
        } else {
            const result = await axioslogin.post('/inst', postFormdata);
            const { success, message } = result.data;
            if (success === 1) {
                succesNofity(message);
                setCount(count + 1);
                getFormData(resetForm);
            } else if (success === 0 || success === 2) {
                infoNofity(message);
            }
            else if (success === 7) {
                errorNofity(message)
            }
            else {
                errorNofity("Error! Please Contact EDP")
            }
        }
    }, [postFormdata, flag, count, resetForm, postInstitutionData])

    useEffect(() => {
        const getemptypedetil = async () => {
            const result = await axioslogin.get('/inst');
            const { success, data } = result.data;
            if (success === 1) {
                setTableData(data);
                setCount(0)
            } else {
                setTableData([])
            }
        }
        getemptypedetil();
    }, [count]);

    const [columnDef] = useState([
        { headerName: 'Sl No', field: 'inst_slno' },
        { headerName: 'Employee Type', field: 'inst_emp_type', filter: true, width: 150 },
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
        const { inst_slno, inst_emp_type, inst_emp_status, } = params.data
        const frmdata = {
            inst_emp_type: inst_emp_type,
            inst_emp_status: inst_emp_status === 1 ? true : false
        }
        getFormData(frmdata)
        setSlno(inst_slno)
    }, [])

    return (
        <MasterLayout title="Employee Institution Type" displayClose={true} >
            <ToastContainer />
            <SessionCheck />
            <Box sx={{ width: "100%" }} >
                <Grid container spacing={1}>
                    <Grid item xl={3} lg={2}>
                        <Box sx={{ width: "100%", px: 1, mt: 0.5 }}>
                            <InputComponent
                                placeholder={'Employee Institution Type'}
                                type="text"
                                size="sm"
                                name="inst_emp_type"
                                value={inst_emp_type}
                                onchange={(e) => updateFormDatatoState(e)}
                            />
                        </Box>
                        <Box sx={{ pl: 1, mt: 0.5 }} >
                            <JoyCheckbox
                                label='Status'
                                checked={inst_emp_status}
                                name="inst_emp_status"
                                onchange={(e) => updateFormDatatoState(e)}
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
}

export default memo(EmpDesignationtype) 
