import { Button, CssVarsProvider } from '@mui/joy'
import { Box, Checkbox, FormControl, FormControlLabel, Grid, IconButton, MenuItem, Paper, Select, TextField } from '@mui/material'
import React, { memo, useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import { axioslogin } from 'src/views/Axios/Axios'
import { errorNofity, infoNofity, succesNofity } from 'src/views/CommonCode/Commonfunc'
import CustomLayout from 'src/views/Component/MuiCustomComponent/CustomLayout'
import { employeeNumber } from 'src/views/Constant/Constant'
import SaveIcon from '@mui/icons-material/Save';
import { useCallback } from 'react'
import CommonAgGrid from 'src/views/Component/CommonAgGrid'
import EditIcon from '@mui/icons-material/Edit';

const DepartmentMasterPage = () => {
    const [dept_name, setDeptname] = useState("");
    const [dept_alias, setDeptalias] = useState("");
    const [dept_status, setDeptstatus] = useState(false);
    const [type, setType] = useState(0)
    const [count, setCount] = useState(0);
    const [data, setData] = useState([]);
    const [id, setId] = useState(0)
    const [flag, setFlag] = useState(0)

    const typeArray = [
        { typeNo: 1, name: 'Clinical' },
        { typeNo: 2, name: 'Non Clinical' },
        { typeNo: 3, name: 'Accademic' },
    ]

    const resetForm = () => {
        setDeptname('');
        setDeptalias('');
        setDeptstatus(false);
        setType(0)
    }

    const submitDeptForm = useCallback((e) => {
        e.preventDefault();

        const submitFun = async () => {
            let formData = {
                dept_name: dept_name,
                dept_alias: dept_alias,
                dept_status: dept_status === true ? 1 : 0,
                create_user: employeeNumber(),
                dept_type: type,
            }
            const result = await axioslogin.post('/department', formData).then((response) => {
                return response;
            }).catch((error) => {
                return error;
            })
            const resResult = result.data;
            if (resResult.success === 2) {
                infoNofity(resResult.message);
            } else if (resResult.success === 1) {
                succesNofity(resResult.message);
                resetForm();
                setCount(count + 1)
            } else if (resResult.success === 0) {
                errorNofity(resResult.message);

            }
            else if (resResult.success === 7) {
                infoNofity(resResult.message);

            }
        }

        const updateFunc = async () => {
            const newDeptDetail = {
                dept_status: dept_status === true ? 1 : 0,
                dept_name: dept_name,
                dept_alias: dept_alias,
                edit_user: employeeNumber(),
                dept_type: type,
                dept_id: id
            }
            axioslogin.patch('/department', newDeptDetail)
                .then((response) => {
                    const { success, message } = response.data;
                    if (success === 0) {
                        errorNofity(message)
                    } else if (success === 1) {
                        infoNofity(message)
                    } else if (success === 3) {
                        infoNofity(message)
                    } else if (success === 2) {
                        succesNofity(message)
                        setCount(count + 1)
                        resetForm();
                    }
                    else if (success === 7) {
                        infoNofity(message)
                    }
                })
                .catch((response) => {
                    const { message } = response.data;
                    errorNofity(message);
                })
        }
        if (flag === 1) {
            updateFunc()
        } else {
            submitFun()
        }
    }, [dept_name, dept_alias, dept_status, type, id])

    const [columnDef] = useState([
        { headerName: 'ID', field: 'dept_id' },
        { headerName: 'Department ', field: 'dept_name', filter: true, width: 250 },
        { headerName: 'Alias ', field: 'dept_alias', filter: true, width: 150 },
        { headerName: 'Type ', field: 'descrp', filter: true, width: 150 },
        { headerName: 'Status', field: 'status', filter: true, width: 150 },
        {
            headerName: 'Action', cellRenderer: params =>
                <IconButton sx={{ paddingY: 0.5 }} onClick={() => getDataTable(params)} >
                    <EditIcon color='primary' />
                </IconButton>

        },
    ])

    useEffect(() => {
        axioslogin.get('/department')
            .then((response) => {
                setData(response.data.data);
                setCount(0)
            })
            .catch((error) => {
                return error;
            });

    }, [count]);

    const getDataTable = useCallback((params) => {
        setFlag(1)
        const data = params.api.getSelectedRows()
        const { dept_alias, dept_id, dept_name, dept_status, dept_type } = data[0]
        setDeptname(dept_name === null ? '' : dept_name);
        setDeptalias(dept_alias === null ? '' : dept_alias);
        setDeptstatus(dept_status === 1 ? true : false);
        setType(dept_type)
        setId(dept_id)
    }, [])



    return (
        <CustomLayout title="Department" displayClose={true} >
            <ToastContainer />
            <Box sx={{ width: "100%" }} >
                <Grid container spacing={1}>
                    <Grid item xl={3} lg={2}>
                        <Paper square elevation={2} sx={{ p: 1, }}   >
                            <Box sx={{ width: "100%", pt: 1 }}>
                                <TextField
                                    fullWidth
                                    placeholder='Department Name'
                                    size="small"
                                    id='dept_name'
                                    value={dept_name}
                                    name="dept_name"
                                    onChange={(e) => setDeptname(e.target.value)}
                                />
                            </Box>
                            <Box sx={{ width: "100%", pt: 1 }}>
                                <TextField
                                    placeholder="Short Name"
                                    fullWidth
                                    size="small"
                                    variant="outlined"
                                    autoComplete="off"
                                    value={dept_alias}
                                    name="dept_alias"
                                    onChange={(e) => setDeptalias(e.target.value)}
                                />
                            </Box>
                            <Box sx={{ width: "100%", pt: 1 }}>
                                <FormControl
                                    fullWidth
                                    size='small'   >
                                    <Select
                                        value={type}
                                        onChange={(e) => setType(e.target.value)}
                                        size="small"
                                        fullWidth
                                        variant='outlined'
                                    >
                                        <MenuItem disabled value={0} >
                                            Select Type
                                        </MenuItem>
                                        {
                                            typeArray?.map((val, ind) => {
                                                return <MenuItem key={ind} value={val.typeNo}>{val.name}</MenuItem>
                                            })
                                        }
                                    </Select>
                                </FormControl>
                            </Box>
                            <Box sx={{ width: "100%", pt: 1 }}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            name="dept_status"
                                            color="primary"
                                            value={dept_status}
                                            checked={dept_status}
                                            className="ml-2"
                                            onChange={(e) => { setDeptstatus(e.target.checked) }}
                                        />
                                    }
                                    label="Department Status"
                                />
                            </Box>
                            <Box sx={{ px: 0.5, mt: 0.9 }}>
                                <CssVarsProvider>
                                    <Button
                                        variant="outlined"
                                        component="label"
                                        size="md"
                                        color="primary"
                                        onClick={submitDeptForm}
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
    )
}

export default memo(DepartmentMasterPage) 