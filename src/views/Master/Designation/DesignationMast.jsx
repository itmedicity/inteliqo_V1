import React, { useCallback, useEffect, useState } from 'react'
import { memo } from 'react'
import { Box, Grid, IconButton } from '@mui/material'
import { ToastContainer } from 'react-toastify'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNofity, succesNofity } from 'src/views/CommonCode/Commonfunc'
import { employeeIdNumber } from 'src/views/Constant/Constant'
import MasterLayout from '../MasterComponents/MasterLayout'
import InputComponent from 'src/views/MuiComponents/JoyComponent/InputComponent'
import JoyCheckbox from 'src/views/MuiComponents/JoyComponent/JoyCheckbox'
import SaveIcon from '@mui/icons-material/Save';
import CommonAgGrid from 'src/views/Component/CommonAgGrid'
import { Button, CssVarsProvider } from '@mui/joy'
import EditIcon from '@mui/icons-material/Edit';
import { useMemo } from 'react'

const DesignationMast = () => {
    const [count, setCount] = useState(0);
    const [slno, setSlno] = useState(0)
    const [tableData, setTableData] = useState([])
    const [flag, setFlag] = useState(0)
    const [designation, setDesignation] = useState({
        desg_name: '',
        desg_notice_prd: 0,
        desg_status: false
    });
    const { desg_name, desg_notice_prd, desg_status } = designation;
    // update state to feild
    const updateDesignationfld = useCallback((e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setDesignation({ ...designation, [e.target.name]: value })
    }, [designation])

    const postDesigData = useMemo(() => {
        return {
            desg_name,
            desg_notice_prd,
            desg_status: desg_status === true ? 1 : 0,
            create_user: employeeIdNumber()
        }
    }, [desg_name, desg_notice_prd, desg_status])
    // reset forn
    const resetForm = useMemo(() => {
        return {
            desg_name: '',
            desg_notice_prd: 0,
            desg_status: false
        }
    }, [])

    const postDesignationData = useMemo(() => {
        return {
            desg_name,
            desg_notice_prd,
            desg_status: desg_status === true ? 1 : 0,
            desg_slno: slno,
            edit_user: employeeIdNumber()
        }

    }, [desg_name, desg_notice_prd, desg_status, slno])
    // submit fnc
    const submitDesignation = useCallback(async (e) => {
        e.preventDefault();
        if (flag === 1) {
            const result = await axioslogin.patch('/designation', postDesignationData)
            const { message, success } = result.data;
            if (success === 2) {
                setDesignation(resetForm);
                setCount(count + 1);
                succesNofity(message);
                setFlag(0)
            } else if (success === 0) {
                infoNofity(message.sqlMessage);
            } else {
                infoNofity(message)
            }
        } else {
            const result = await axioslogin.post('/designation', postDesigData)
            const { message, success } = result.data;
            if (success === 1) {
                succesNofity(message);
                setCount(count + 1);
                setDesignation(resetForm);
            } else if (success === 0) {
                infoNofity(message.sqlMessage);
            } else {
                infoNofity(message)
            }
        }

    }, [postDesigData, flag, count, resetForm, postDesignationData])

    // Get data
    useEffect(() => {
        const getDesigList = async () => {
            const result = await axioslogin.get('/designation')
            const { success, data } = result.data;
            if (success === 1) {
                setTableData(data);
                setCount(0)
            } else {
                setTableData([]);
            }
        }
        getDesigList();
    }, [count]);

    const [columnDef] = useState([
        { headerName: 'Sl No', field: 'desg_slno' },
        { headerName: 'Designation', field: 'desg_name', filter: true, width: 150 },
        { headerName: 'Period ', field: 'desg_notice_prd', width: 100 },
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
        const { desg_name, desg_notice_prd, desg_status, desg_slno } = params.data
        const frmdata = {
            desg_name: desg_name,
            desg_notice_prd: desg_notice_prd,
            desg_status: desg_status === 1 ? true : false
        }
        setDesignation(frmdata)
        setSlno(desg_slno)
    }, [])

    return (
        <MasterLayout title="Designation Master" displayClose={true} >
            <ToastContainer />
            <Box sx={{ width: "100%" }} >
                <Grid container spacing={1}>
                    <Grid item xl={3} lg={2}>
                        <Box sx={{ width: "100%", mx:0.5, my:0.5}}>
                            <InputComponent
                                placeholder={'Designation Name'}
                                type="text"
                                size="sm"
                                name="desg_name"
                                value={desg_name}
                                onchange={(e) => updateDesignationfld(e)}
                            />
                        </Box>
                        <Box sx={{ width: "100%", mx:0.5,my:0.5 }}>
                            <InputComponent
                                placeholder={'Notice Period'}
                                type="text"
                                size="sm"
                                name="desg_notice_prd"
                                value={desg_notice_prd}
                                onchange={(e) => updateDesignationfld(e)}
                            />
                        </Box>
                        <Box sx={{ pl: 1 }} >
                            <JoyCheckbox
                                label='Status'
                                checked={desg_status}
                                name="desg_status"
                                onchange={(e) => updateDesignationfld(e)}
                            />
                        </Box>
                        <Box sx={{ px: 0.5, mt: 0.9 }}>
                            <CssVarsProvider>
                                <Button
                                    variant="outlined"
                                    component="label"
                                    size="md"
                                    color="primary"
                                    onClick={submitDesignation}
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

export default memo(DesignationMast) 
