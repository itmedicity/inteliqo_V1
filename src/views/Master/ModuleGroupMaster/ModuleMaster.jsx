import React, { memo, useCallback, useMemo, useState } from 'react'
import MasterLayout from '../MasterComponents/MasterLayout'
import InputComponent from 'src/views/MuiComponents/JoyComponent/InputComponent'
import JoyCheckbox from 'src/views/MuiComponents/JoyComponent/JoyCheckbox'
import { Button, CssVarsProvider, IconButton } from '@mui/joy'
import CommonAgGrid from 'src/views/Component/CommonAgGrid'
import { Box, Grid, Paper } from '@mui/material'
import { useQuery, useQueryClient } from 'react-query';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { getModuleNameList } from '../MenuCreationMaster/FuncLis'
import { axioslogin } from 'src/views/Axios/Axios'
import { errorNofity, infoNofity, succesNofity } from 'src/views/CommonCode/Commonfunc'

const ModuleMaster = () => {

    const queryClient = useQueryClient()
    const [formData, setFormData] = useState({
        moduleName: '',
        ModuleStatus: false
    })
    const { moduleName, ModuleStatus } = formData;

    const [value, setvalue] = useState(0)
    const [slno, setslno] = useState(0)

    const { data } = useQuery({
        queryKey: ['moduleNameList'],
        queryFn: getModuleNameList
    })

    //getting formData
    const getModuleName = async (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
        setFormData({ ...formData, [e.target.name]: value })
    }

    const defaultState = useMemo(() => {
        return {
            moduleName: '',
            ModuleStatus: false
        }
    }, [])

    const [columnDef] = useState([
        { headerName: 'Sl No', field: 'module_slno' },
        { headerName: 'Module Name', field: 'module_name', filter: true },
        { headerName: 'Status ', field: 'showStatus' },
        {
            headerName: 'Action', cellRenderer: params =>
                <IconButton sx={{ paddingY: 0.5 }} onClick={() => getDataTable(params)} >
                    <EditIcon color='primary' />
                </IconButton>

        },
    ])

    const postData = useMemo(() => {
        return {
            module_name: moduleName,
            menu_status: ModuleStatus === false ? 0 : 1
        }
    }, [moduleName, ModuleStatus])

    const patchData = useMemo(() => {
        return {
            module_name: moduleName,
            module_status: ModuleStatus === false ? 0 : 1,
            module_slno: slno
        }
    }, [moduleName, ModuleStatus, slno])

    const SubmitFormData = useCallback(async (e) => {
        e.preventDefault();
        if (value === 1) {
            const result = await axioslogin.patch('/modulegroup/update/module', patchData)
            const { success, message } = result.data;
            if (success === 2) {
                succesNofity(message)
                setFormData(defaultState)
                setslno(0)
                queryClient.invalidateQueries('moduleNameList')
            } else if (success === 1) {
                errorNofity(message);
            } else if (success === 0) {
                infoNofity(message.sqlMessage);
            }
        } else {
            const result = await axioslogin.post('/modulegroup/create/module', postData)
            const { success, message } = result.data;
            if (success === 1) {
                succesNofity(message)
                setFormData(defaultState)
                queryClient.invalidateQueries('moduleNameList')
            } else if (success === 0) {
                errorNofity(message);
            } else if (success === 2) {
                infoNofity(message.sqlMessage);
            }
        }
    }, [postData, value, patchData, defaultState, queryClient])

    const getDataTable = useCallback((params) => {
        setvalue(1)
        const { module_name, module_status, module_slno } = params.data;

        const getData = {
            moduleName: module_name,
            ModuleStatus: module_status === 1 ? true : false
        }
        setFormData(getData)
        setslno(module_slno)
    }, [])

    return (
        <MasterLayout title="Module Name Creation" displayClose={true} >
            <Box sx={{ width: "100%" }} >
                <Grid container spacing={1}>
                    <Grid item xl={3} lg={2}>
                        <Paper square elevation={0} sx={{ p: 1, }}   >
                            <Box sx={{ width: "100%", pt: 1 }}>
                                <InputComponent
                                    placeholder={'Module Name'}
                                    type="text"
                                    size="sm"
                                    name="moduleName"
                                    value={moduleName}
                                    onchange={(e) => getModuleName(e)}
                                />
                            </Box>
                            <Box sx={{ width: "100%", pt: 1 }}>
                                <JoyCheckbox
                                    label='Status'
                                    checked={ModuleStatus}
                                    name="ModuleStatus"
                                    onchange={(e) => getModuleName(e)}
                                />
                            </Box>
                            <Box sx={{ px: 0.5, mt: 0.9 }}>
                                <CssVarsProvider>
                                    <Button
                                        variant="outlined"
                                        component="label"
                                        size="md"
                                        color="primary"
                                        onClick={SubmitFormData}
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
        </MasterLayout>
    )
}

export default memo(ModuleMaster) 