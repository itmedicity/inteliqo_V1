import { Button, CssVarsProvider, IconButton } from '@mui/joy'
import { Box, Grid, Paper } from '@mui/material'
import React, { memo, useCallback } from 'react'
import { useMemo } from 'react'
import { useState } from 'react'
import { ToastContainer } from 'react-toastify'
import { axioslogin } from 'src/views/Axios/Axios'
import { errorNofity, infoNofity, succesNofity } from 'src/views/CommonCode/Commonfunc'
import InputComponent from 'src/views/MuiComponents/JoyComponent/InputComponent'
import JoyCheckbox from 'src/views/MuiComponents/JoyComponent/JoyCheckbox'
import MasterLayout from '../MasterComponents/MasterLayout'
import SaveIcon from '@mui/icons-material/Save';
import CommonAgGrid from 'src/views/Component/CommonAgGrid'
import EditIcon from '@mui/icons-material/Edit';
import ModuleSelection from '../GroupRights/ModuleSelection'
import { useQuery, useQueryClient } from 'react-query';
import { getMenuNameList } from './FuncLis'

const MenuCreation = () => {

    const queryClient = useQueryClient()
    const [formData, setFormData] = useState({
        menuName: '',
        menuStatus: false
    })
    const { menuName, menuStatus } = formData;
    const [modulename, setModuleName] = useState(0)
    const [value, setvalue] = useState(0)
    const [slno, setslno] = useState(0)
    //const [data, setData] = useState([])


    const defaultState = useMemo(() => {
        return {
            menuName: '',
            menuStatus: false
        }
    }, [])

    //getting formData
    const getmenuName = async (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
        setFormData({ ...formData, [e.target.name]: value })
    }

    const postData = useMemo(() => {
        return {
            menu_name: menuName,
            menu_module: modulename,
            menu_status: menuStatus === false ? 0 : 1
        }
    }, [menuName, menuStatus, modulename])

    const patchData = useMemo(() => {
        return {
            menu_name: menuName,
            menu_module: modulename,
            menu_status: menuStatus === false ? 0 : 1,
            menu_slno: slno
        }
    }, [menuName, menuStatus, modulename, slno])

    // const menuNameList = useQuery(['menuList'], getMenuNameList())

    const { data } = useQuery({
        queryKey: ['menuNameList'],
        queryFn: getMenuNameList
    })

    const getDataTable = useCallback((params) => {
        setvalue(1)
        const { menu_module, menu_status, menu_name, menu_slno } = params.data;
        setModuleName(menu_module)
        const getData = {
            menuName: menu_name,
            menuStatus: menu_status === "1" ? true : false
        }
        setFormData(getData)
        setslno(menu_slno)
    }, [])


    //saving form Data
    const SubmitFormData = useCallback(async (e) => {
        e.preventDefault();
        if (value === 1) {
            const result = await axioslogin.patch('/modulegroup/update/name', patchData)
            const { success, message } = result.data;
            if (success === 2) {
                succesNofity(message)
                setFormData(defaultState)
                setModuleName(0)
                setslno(0)
                queryClient.invalidateQueries('menuNameList')
            } else if (success === 1) {
                errorNofity(message);
            } else if (success === 0) {
                infoNofity(message.sqlMessage);
            }
        } else {
            const result = await axioslogin.post('/modulegroup/create/menu', postData)
            const { success, message } = result.data;
            if (success === 1) {
                succesNofity(message)
                setFormData(defaultState)
                setModuleName(0)
                queryClient.invalidateQueries('menuNameList')
            } else if (success === 0) {
                errorNofity(message);
            } else if (success === 2) {
                infoNofity(message.sqlMessage);
            }
        }
    }, [postData, value, patchData, defaultState, queryClient])

    const [columnDef] = useState([
        { headerName: 'Sl No', field: 'menu_slno' },
        { headerName: 'Menu Name ', field: 'menu_name', filter: true },
        { headerName: 'Module Name', field: 'module_name', filter: true },
        { headerName: 'Status ', field: 'showStatus' },
        {
            headerName: 'Action', cellRenderer: params =>
                <IconButton sx={{ paddingY: 0.5 }} onClick={() => getDataTable(params)} >
                    <EditIcon color='primary' />
                </IconButton>

        },
    ])

    return (
        <MasterLayout title="Menu Name Creation" displayClose={true} >
            <ToastContainer />
            <Box sx={{ width: "100%" }} >
                <Grid container spacing={1}>
                    <Grid item xl={3} lg={2}>
                        <Paper square elevation={0} sx={{ p: 1, }}   >
                            <Box sx={{ width: "100%", pt: 1 }}>
                                <InputComponent
                                    placeholder={'Menu Name'}
                                    type="text"
                                    size="sm"
                                    name="menuName"
                                    value={menuName}
                                    onchange={(e) => getmenuName(e)}
                                />
                            </Box>
                            <Box sx={{ width: "100%", pt: 1 }}>
                                <ModuleSelection value={modulename} setValue={setModuleName} />
                            </Box>
                            <Box sx={{ width: "100%", pt: 1 }}>
                                <JoyCheckbox
                                    label='Status'
                                    checked={menuStatus}
                                    name="menuStatus"
                                    onchange={(e) => getmenuName(e)}
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

export default memo(MenuCreation)