// import { Button, Checkbox, FormControlLabel, TextField } from '@material-ui/core'
import React, { Fragment, useCallback, useEffect, useMemo, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNofity, succesNofity, } from 'src/views/CommonCode/Commonfunc'
import { employeeNumber } from 'src/views/Constant/Constant'
import { Checkbox, FormControlLabel, Grid, IconButton, Paper, TextField } from '@mui/material'
import { Button, Box, CssVarsProvider } from '@mui/joy'
import SaveIcon from '@mui/icons-material/Save';
import CommonAgGrid from 'src/views/Component/CommonAgGrid'
import CustomLayout from 'src/views/Component/MuiCustomComponent/CustomLayout'
import EditIcon from '@mui/icons-material/Edit';
import GradeSelectRedux from 'src/views/MuiComponents/GradeSelectRedux'

const DesignationMast = () => {

    const [count, setCount] = useState(0);
    const [grade, setGrade] = useState(0)
    const [data, setTableData] = useState([]);
    const [flag, setFlag] = useState(0)
    const [desg_slno, setslno] = useState(0)

    const [designation, setDesignation] = useState({
        desg_name: '',
        desg_status: false,
        desg_notice_prd: 0
    });
    const { desg_name, desg_notice_prd, desg_status } = designation;
    // update state to feild
    const updateDesignationfld = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setDesignation({ ...designation, [e.target.name]: value })
    }


    // reset forn
    const resetForm = useMemo(() => {
        return {
            desg_name: '',
            desg_notice_prd: '',
            desg_status: false
        }
    }, [])



    // submit fnc


    const submitDesignation = useCallback((e) => {
        e.preventDefault();

        const submitFun = async () => {
            const postDesigData = {
                desg_name,
                desg_notice_prd,
                desg_status: desg_status === true ? 1 : 0,
                create_user: employeeNumber(),
                grade,
            }
            const result = await axioslogin.post('/designation', postDesigData)
            const { message, success } = result.data;
            if (success === 1) {
                succesNofity(message);
                setCount(count + 1);
                setDesignation(resetForm);
                setGrade(0)
                setFlag(0)
            } else if (success === 0) {
                infoNofity(message.sqlMessage);
            } else {
                infoNofity(message)
            }
        }

        const updateFunc = async () => {
            const postDesignationData = {
                desg_name,
                desg_notice_prd,
                desg_status: desg_status === true ? 1 : 0,
                edit_user: employeeNumber(),
                grade,
                desg_slno
            }
            const result = await axioslogin.patch('/designation', postDesignationData)
            const { message, success } = result.data;
            if (success === 2) {
                setCount(count + 1);
                setDesignation(resetForm);
                setGrade(0)
                succesNofity(message);
                setFlag(0)
            } else if (success === 0) {
                infoNofity(message.sqlMessage);
            } else {
                infoNofity(message)
            }
        }
        if (flag === 1) {
            updateFunc()
        } else {
            submitFun()
        }
    }, [desg_name, desg_notice_prd, desg_status, grade, count, flag, desg_slno, resetForm])



    const [columnDef] = useState([
        { headerName: 'Sl No', field: 'slno' },
        { headerName: 'Designation ', field: 'desg_name', filter: true, width: 250 },
        { headerName: 'Notice Period ', field: 'desg_notice_prd', filter: true, width: 150 },
        { headerName: 'Grade ', field: 'grade_desc', filter: true, width: 150 },
        { headerName: 'Status', field: 'status', filter: true, width: 150 },
        {
            headerName: 'Action', cellRenderer: params =>
                <IconButton sx={{ paddingY: 0.5 }} onClick={() => getDataTable(params)} >
                    <EditIcon color='primary' />
                </IconButton>

        },
    ])
    useEffect(() => {
        const getDesigList = async () => {
            const result = await axioslogin.get('/designation')
            const { success, data } = result.data;
            if (success === 1) {
                setTableData(data);
            } else {
                setTableData([]);
            }
        }
        getDesigList();

    }, [count]);

    const getDataTable = useCallback((params) => {
        setFlag(1)
        const data = params.api.getSelectedRows()
        const { desg_name, desg_notice_prd, desg_status, desg_grade, desg_slno } = data[0]
        const obj = {
            desg_name: desg_name === null ? '' : desg_name, desg_notice_prd: desg_notice_prd === null ? '' : desg_notice_prd, desg_status: desg_status === 1 ? true : false
        }
        setDesignation(obj)
        setslno(desg_slno)
        setGrade(desg_grade === null ? 0 : desg_grade)
    }, [])



    return (
        <Fragment>

            <CustomLayout title="Designation" displayClose={true} >
                <ToastContainer />
                <Box sx={{ width: "100%" }} >
                    <Grid container spacing={1}>
                        <Grid item xl={3} lg={2}>
                            <Paper square elevation={0} sx={{ p: 1, }}   >
                                <Box sx={{ width: "100%", pt: 1 }}>
                                    <TextField
                                        fullWidth
                                        placeholder='Designation Name'
                                        size="small"
                                        id='desg_name'
                                        value={desg_name}
                                        name="desg_name"
                                        onChange={(e) => updateDesignationfld(e)}
                                    />
                                </Box>
                                <Box sx={{ width: "100%", pt: 1 }}>
                                    <TextField
                                        placeholder="Notice Period"
                                        fullWidth
                                        size="small"
                                        variant="outlined"
                                        autoComplete="off"
                                        name="desg_notice_prd"
                                        value={desg_notice_prd}
                                        onChange={(e) => updateDesignationfld(e)}
                                    />
                                </Box>
                                <Box sx={{ width: "100%", pt: 1 }}>
                                    <GradeSelectRedux value={grade} setValue={setGrade} />
                                </Box>
                                <Box sx={{ width: "100%", pt: 1 }}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                name="desg_status"
                                                color="primary"
                                                value={desg_status}
                                                checked={desg_status}
                                                className="ml-2"
                                                onChange={(e) => updateDesignationfld(e)}
                                            />
                                        }
                                        label="Designation Status"
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
                            </Paper>
                        </Grid>
                        <Grid item xs={9} lg={9} xl={9} md={9}>
                            <CommonAgGrid
                                columnDefs={columnDef}
                                tableData={data}
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

            </CustomLayout>
        </Fragment>
    )
}

export default DesignationMast
