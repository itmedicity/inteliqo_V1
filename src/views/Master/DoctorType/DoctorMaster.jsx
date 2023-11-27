import { Box, Button, CssVarsProvider } from '@mui/joy'
import { Grid, IconButton } from '@mui/material'
import React, { memo, useEffect, useMemo, useState } from 'react'
import { useCallback } from 'react'
import { ToastContainer } from 'react-toastify'
import { axioslogin } from 'src/views/Axios/Axios'
import SessionCheck from 'src/views/Axios/SessionCheck'
import { infoNofity, succesNofity } from 'src/views/CommonCode/Commonfunc'
import CommonAgGrid from 'src/views/Component/CommonAgGrid'
import { employeeNumber } from 'src/views/Constant/Constant'
import InputComponent from 'src/views/MuiComponents/JoyComponent/InputComponent'
import JoyCheckbox from 'src/views/MuiComponents/JoyComponent/JoyCheckbox'
import MasterLayout from '../MasterComponents/MasterLayout'
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';

const DoctorMaster = () => {
    const [count, setCount] = useState(0);
    const [slno, setSlno] = useState(0)
    const [tableData, setTableData] = useState([])
    const [flag, setFlag] = useState(0)

    //Intializing
    const [type, setType] = useState({
        doctype_desc: '',
        doctype_status: false
    });

    //Destructuring
    const { doctype_desc, doctype_status } = type;
    const updateType = useCallback((e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setType({ ...type, [e.target.name]: value })
    }, [type])

    const postDoctorData = useMemo(() => {
        return {
            doctype_desc,
            doctype_status: doctype_status === true ? 1 : 0,
            create_user: employeeNumber()
        }
    }, [doctype_desc, doctype_status])

    const resetForm = useMemo(() => {
        return {
            doctype_desc: '',
            doctype_status: false
        }
    }, [])

    const updateData = useMemo(() => {
        return {
            doctype_desc,
            doctype_status: doctype_status === true ? 1 : 0,
            doctype_slno: slno,
            edit_user: employeeNumber()
        }
    }, [doctype_desc, doctype_status, slno])

    //Insert
    const submitType = useCallback(async (e) => {
        e.preventDefault();
        if (flag === 1) {
            const result = await axioslogin.patch('/doctype', updateData)
            const { message, success } = result.data;
            if (success === 2) {
                setType(resetForm);
                setCount(count + 1);
                succesNofity(message);
                setSlno(0)
                setFlag(0)
            } else if (success === 0) {
                infoNofity(message.sqlMessage);
            } else {
                infoNofity(message)
            }
        } else {
            const result = await axioslogin.post('/doctype', postDoctorData)
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
    }, [flag, updateData, resetForm, postDoctorData, count])

    useEffect(() => {
        const getTypeList = async () => {
            const result = await axioslogin.get('/doctype')
            const { success, data } = result.data;
            if (success === 1) {
                setTableData(data);
                setCount(0)
            } else {
                setTableData([])
            }
        }
        getTypeList();
    }, [count]);

    const [columnDef] = useState([
        { headerName: 'Sl No', field: 'doctype_slno' },
        { headerName: 'Grade Name', field: 'doctype_desc', filter: true, width: 150 },
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
        const { doctype_slno, doctype_desc, doctype_status } = params.data
        const frmdata = {
            doctype_desc: doctype_desc,
            doctype_status: doctype_status === '1' ? true : false
        }
        setType(frmdata)
        setSlno(doctype_slno)
    }, [])


    return (
        <MasterLayout title="Doctor Type Master" displayClose={true} >
            <ToastContainer />
            <SessionCheck />
            <Box sx={{ width: "100%" }} >
                <Grid container spacing={1}>
                    <Grid item xl={3} lg={2}>
                        <Box sx={{ width: "100%", px: 1, mt: 0.5 }}>
                            <InputComponent
                                placeholder={'Doctor Type'}
                                type="text"
                                size="sm"
                                name="doctype_desc"
                                value={doctype_desc}
                                onchange={(e) => updateType(e)}
                            />
                        </Box>
                        <Box sx={{ pl: 1, mt: 0.5 }} >
                            <JoyCheckbox
                                label='Status'
                                checked={doctype_status}
                                name="doctype_status"
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

export default memo(DoctorMaster) 
