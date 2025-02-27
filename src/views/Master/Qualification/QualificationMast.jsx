import { Box, Button, CssVarsProvider } from '@mui/joy'
import { Grid, IconButton } from '@mui/material'
import React, { memo, useCallback, useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import { axioslogin } from 'src/views/Axios/Axios'
import { errorNofity, infoNofity, succesNofity } from 'src/views/CommonCode/Commonfunc'
import { employeeIdNumber } from 'src/views/Constant/Constant'
import InputComponent from 'src/views/MuiComponents/JoyComponent/InputComponent'
import JoyCheckbox from 'src/views/MuiComponents/JoyComponent/JoyCheckbox'
import MasterLayout from '../MasterComponents/MasterLayout'
import SaveIcon from '@mui/icons-material/Save';
import CommonAgGrid from 'src/views/Component/CommonAgGrid'
import EditIcon from '@mui/icons-material/Edit';
import { useMemo } from 'react'

const QualificationMast = () => {

    const [flag, setFlag] = useState(0)
    const [count, setCount] = useState(0);
    const [tableData, setTableData] = useState([])
    const [slno, setSlno] = useState(0)
    const [qualification, setQualification] = useState({
        qual_name: '',
        qual_status: false
    });
    const { qual_name, qual_status } = qualification;

    const updateQaulstatus = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setQualification({ ...qualification, [e.target.name]: value })
    }

    const postData = useMemo(() => {
        return {
            qual_name,
            qual_status: qual_status === true ? 1 : 0,
            create_user: employeeIdNumber()
        }
    }, [qual_status, qual_name])

    // reset form
    const resetForm = useMemo(() => {
        return {
            qual_name,
            qual_status: false
        }
    }, [qual_name])

    const patchData = useMemo(() => {
        return {
            qual_name,
            qual_status: qual_status === true ? 1 : 0,
            qual_slno: slno,
            edit_user: employeeIdNumber()
        }
    }, [qual_status, qual_name, slno])

    const submitQualification = useCallback(async (e) => {
        e.preventDefault();
        if (flag === 1) {
            const result = await axioslogin.patch('/qal', patchData);
            const { success, message } = result.data;
            if (success === 2) {
                setQualification(resetForm);
                succesNofity(message);
                setCount(count + 1);
                setFlag(0)
            } else if (success === 0) {
                infoNofity(message.sqlMessage);
            } else {
                infoNofity(message)
            }
        } else {
            const result = await axioslogin.post('/qal', postData);
            const { success, message } = result.data;
            if (success === 1) {
                succesNofity(message);
                setCount(count + 1);
                setQualification(resetForm);
            } else if (success === 0) {
                infoNofity(message.sqlMessage);
            } else {
                errorNofity(message);
            }
        }
    }, [patchData, flag, count, resetForm, postData])

    const [columnDef] = useState([
        { headerName: 'Sl No', field: 'qual_slno' },
        { headerName: 'Qulaification', field: 'qual_name', filter: true, width: 150 },
        { headerName: 'Status ', field: 'status', width: 100 },
        {
            headerName: 'Edit', cellRenderer: params =>
                <IconButton sx={{ paddingY: 0.5 }} onClick={() => getEdit(params)} >
                    <EditIcon color='primary' />
                </IconButton>
        },
    ])

    useEffect(() => {
        const getQualificationDetl = async () => {
            const result = await axioslogin.get('/qal');
            const { success, data } = result.data;
            if (success === 1) {
                setTableData(data);
                setCount(0);
            } else {
                setTableData([])
            }
        }
        getQualificationDetl();
    }, [count]);

    const getEdit = useCallback((params) => {
        setFlag(1)
        const { qual_slno,
            qual_name,
            qual_status } = params.data
        const frmdata = {
            qual_name: qual_name,
            qual_status: qual_status === 1 ? true : false
        }
        setQualification(frmdata)
        setSlno(qual_slno)
    }, [])

    return (

        <MasterLayout title="Qualification" displayClose={true} >
            <ToastContainer />
            <Box sx={{ width: "100%" }} >
                <Grid container spacing={1}>
                    <Grid item xl={3} lg={2}>
                        <Box sx={{ width: "100%", p: 1 }}>
                            <InputComponent
                                placeholder={'Qualification'}
                                type="text"
                                size="sm"
                                name="qual_name"
                                value={qual_name}
                                onchange={(e) => updateQaulstatus(e)}
                            />
                        </Box>
                        <Box sx={{ pl: 1 }} >
                            <JoyCheckbox
                                label=' Status'
                                checked={qual_status}
                                name="qual_status"
                                onchange={(e) => updateQaulstatus(e)}
                            />
                        </Box>
                        <Box sx={{ px: 0.5, mt: 0.9 }}>
                            <CssVarsProvider>
                                <Button
                                    variant="outlined"
                                    component="label"
                                    size="md"
                                    color="primary"
                                    onClick={submitQualification}
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

export default memo(QualificationMast) 
