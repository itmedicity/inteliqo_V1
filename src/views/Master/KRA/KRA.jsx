import { Button, CssVarsProvider, IconButton } from '@mui/joy'
import { Box, Grid, Paper } from '@mui/material'
import React, { memo, useCallback, useEffect } from 'react'
import { useMemo } from 'react'
import { useState } from 'react'
import { ToastContainer } from 'react-toastify'
import { axioslogin } from 'src/views/Axios/Axios'
import { errorNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc'
import InputComponent from 'src/views/MuiComponents/JoyComponent/InputComponent'
import JoyCheckbox from 'src/views/MuiComponents/JoyComponent/JoyCheckbox'
import MasterLayout from '../MasterComponents/MasterLayout'
import SaveIcon from '@mui/icons-material/Save';
import CommonAgGrid from 'src/views/Component/CommonAgGrid'
import EditIcon from '@mui/icons-material/Edit';

const KRA = () => {

    const [count, setCount] = useState(0)
    const [formData, setFormData] = useState({
        kra: '',
        krastatus: false
    })
    const { kra, krastatus } = formData
    const [value, setvalue] = useState(0)
    const [slno, setslno] = useState(0)
    const [data, setData] = useState([])


    const defaultState = useMemo(() => {
        return {
            kra: '',
            krastatus: false
        }
    }, [])
    //getting formData
    const updatekeyResultArea = async (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
        setFormData({ ...formData, [e.target.name]: value })
    }
    const postData = useMemo(() => {
        return {
            kra_desc: kra,
            krastatus: krastatus === false ? 0 : 1
        }

    }, [kra, krastatus])

    const getDataTable = useCallback((params) => {
        setvalue(1)
        const data = params.api.getSelectedRows()
        const { kra_desc, kra_slno, kra_status } = data[0]
        const formData = {
            kra: kra_desc,
            krastatus: kra_status === 1 ? true : false
        }
        setFormData(formData)
        setslno(kra_slno)
    }, [])

    const postupdateData = useMemo(() => {
        return {
            kra_desc: kra,
            kra_status: krastatus === false ? 0 : 1,
            kra_slno: slno
        }
    }, [kra, krastatus, slno])

    //saving form Data
    const SubmitFormData = useCallback((e) => {
        e.preventDefault();
        const submit = async (postData) => {
            const result = await axioslogin.post('/KraMast', postData)
            const { success, message } = result.data
            if (success === 1) {
                setCount(count + 1)
                setFormData(defaultState)
                succesNofity(message)
            }
            else if (success === 7) {
                errorNofity(message)
            }
            else {
                errorNofity("Error Occure!!!!Please Contact EDP")
            }
        }
        //update data
        const update = async (postupdateData) => {
            const result = await axioslogin.patch('/KraMast', postupdateData)
            const { success, message } = result.data
            if (success === 2) {
                setCount(count + 1)
                setFormData(defaultState)
                succesNofity(message)
            }
            else if (success === 7) {
                errorNofity(message)
            }
            else if (success === 2) {
                warningNofity(message)
            }
            else {
                errorNofity("Error Occure!!!!Please Contact EDP")
            }
        }
        if (value === 0) {
            submit(postData)
        }
        else {
            update(postupdateData)
        }
    }, [postData, postupdateData, defaultState, count, value])

    //getting Kra Table Data
    useEffect(() => {
        const getData = async () => {
            const result = await axioslogin.get('/KraMast')
            const { success, data } = result.data
            if (success === 1) {
                setData(data)
                setCount(0)
            }
            else {
                setData([])
            }
        }
        getData()
    }, [count])

    const [columnDef] = useState([
        { headerName: 'Sl No', field: 'kra_slno' },
        { headerName: 'KRA desc ', field: 'kra_desc' },
        { headerName: 'Kra status ', field: 'status' },
        {
            headerName: 'Action', cellRenderer: params =>
                <IconButton sx={{ paddingY: 0.5 }} onClick={() => getDataTable(params)} >
                    <EditIcon color='primary' />
                </IconButton>

        },
    ])

    return (
        <MasterLayout title="Key Performance Area" displayClose={true} >
            <ToastContainer />
            <Box sx={{ width: "100%" }} >
                <Grid container spacing={1}>
                    <Grid item xl={3} lg={2}>
                        <Paper square elevation={0} sx={{ p: 1, }}   >
                            <Box sx={{ width: "100%", pt: 1 }}>
                                <InputComponent
                                    placeholder={'Key Result Area'}
                                    type="text"
                                    size="sm"
                                    name="kra"
                                    value={kra}
                                    onchange={(e) => updatekeyResultArea(e)}
                                />
                            </Box>
                            <Box sx={{ width: "100%", pt: 1 }}>
                                <JoyCheckbox
                                    label='Status'
                                    checked={krastatus}
                                    name="krastatus"
                                    onchange={(e) => updatekeyResultArea(e)}
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

export default memo(KRA) 