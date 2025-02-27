import React, { memo, useCallback, useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import SessionCheck from 'src/views/Axios/SessionCheck'
import { axioslogin } from 'src/views/Axios/Axios'
import { succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc'
import { employeeIdNumber } from 'src/views/Constant/Constant'
import MasterLayout from '../MasterComponents/MasterLayout'
import InputComponent from 'src/views/MuiComponents/JoyComponent/InputComponent'
import { Grid, IconButton } from '@mui/material'
import { Box, Button, CssVarsProvider } from '@mui/joy'
import JoyCheckbox from 'src/views/MuiComponents/JoyComponent/JoyCheckbox'
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';
import CommonAgGrid from 'src/views/Component/CommonAgGrid'
import { useMemo } from 'react'

const ReligionMast = () => {
    const [count, setCount] = useState(0)
    const [slno, setSlno] = useState(0)
    const [tableData, setTableData] = useState([])
    const [flag, setFlag] = useState(0)

    //setting initial State
    const [formData, setformData] = useState({
        relg_name: "",
        relg_status: false
    })

    //destructuring
    const { relg_name, relg_status } = formData

    const updateReligionMastFormData = useCallback(async (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setformData({ ...formData, [e.target.name]: value })
    }, [formData])

    //getting data
    const postData = useMemo(() => {
        return {
            relg_name: relg_name,
            relg_status: relg_status === false ? 0 : 1,
            create_user: employeeIdNumber()
        }
    }, [relg_name, relg_status])

    //default state
    const defaultState = useMemo(() => {
        return {
            relg_name: "",
            relg_status: false
        }
    }, [])

    const updateData = useMemo(() => {
        return {
            relg_name: relg_name,
            relg_status: relg_status === true ? 1 : 0,
            edit_user: employeeIdNumber(),
            relg_slno: slno
        }
    }, [relg_name, relg_status, slno])

    const submitFormData = useCallback(async (e) => {
        e.preventDefault()
        if (flag === 1) {
            const result = await axioslogin.patch('/Religion', updateData)
            const { success, message } = result.data
            if (success === 2) {
                succesNofity(message)
                setformData(defaultState)
                setCount(count + 1)
            } else {
                warningNofity(message)
            }
        } else {
            const result = await axioslogin.post('/Religion', postData)
            const { success, message } = result.data
            if (success === 1) {
                succesNofity(message)
                setformData(defaultState)
                setCount(count + 1)
            }
            else {
                warningNofity(message)
            }
        }
    }, [flag, postData, count, defaultState, updateData])

    useEffect(() => {
        //get data from data base
        const getTableData = async () => {
            const results = await axioslogin.get("/Religion")
            const { success, data } = results.data
            if (success === 1) {
                setTableData(data)
                setCount(0)
            }
            else {
                setTableData([])
            }
        }
        getTableData()
    }, [count])

    const [columnDef] = useState([
        { headerName: 'Sl No', field: 'relg_slno' },
        { headerName: 'Religion Name', field: 'relg_name', filter: true, width: 150 },
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
        const { relg_slno, relg_name, relg_status, } = params.data
        const frmData = {
            relg_name: relg_name,
            relg_status: relg_status === 1 ? true : false
        }
        setformData(frmData)
        setSlno(relg_slno)
    }, [])

    return (
        <MasterLayout title="Religion Master" displayClose={true} >
            <ToastContainer />
            <SessionCheck />
            <Box sx={{ width: "100%" }} >
                <Grid container spacing={1}>
                    <Grid item xl={3} lg={2}>
                        <Box sx={{ width: "100%", px: 1, mt: 0.5 }}>
                            <InputComponent
                                placeholder={'Religion Name'}
                                type="text"
                                size="sm"
                                name="relg_name"
                                value={relg_name}
                                onchange={(e) => updateReligionMastFormData(e)}
                            />
                        </Box>
                        <Box sx={{ pl: 1, mt: 0.5 }} >
                            <JoyCheckbox
                                label='Status'
                                checked={relg_status}
                                name="relg_status"
                                onchange={(e) => updateReligionMastFormData(e)}
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
export default memo(ReligionMast)
