
import { Box, Button, CssVarsProvider } from '@mui/joy'
import React, { memo, useCallback, useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import { axioslogin } from 'src/views/Axios/Axios'
import { errorNofity, infoNofity, succesNofity } from 'src/views/CommonCode/Commonfunc'
import CommonAgGrid from 'src/views/Component/CommonAgGrid'
import InputComponent from 'src/views/MuiComponents/JoyComponent/InputComponent'
import JoyCheckbox from 'src/views/MuiComponents/JoyComponent/JoyCheckbox'
import MasterLayout from '../MasterComponents/MasterLayout'
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton, Grid } from '@mui/material'
import { useMemo } from 'react'

const Groupmaster = () => {
    const [count, setCount] = useState(0)
    const [slno, setSlno] = useState(0)
    const [tableData, setTableData] = useState([])
    const [flag, setFlag] = useState(0)
    const [formData, setFormData] = useState({
        user_group_name: '',
        user_group_status: false
    })

    const { user_group_name, user_group_status } = formData;

    const getUserGroupFormData = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData({ ...formData, [e.target.name]: value })
    }

    const postData = useMemo(() => {
        return {
            user_group_name: user_group_name,
            user_group_status: user_group_status === true ? 1 : 0,
        }
    }, [user_group_name, user_group_status])

    const resetForm = useMemo(() => {
        return {
            user_group_name: '',
            user_group_status: false
        }
    }, [])

    const updatedPostData = useMemo(() => {
        return {
            user_group_name: user_group_name,
            user_group_status: user_group_status === true ? 1 : 0,
            user_grp_slno: slno
        }
    }, [user_group_name, user_group_status, slno])

    const submitUserGroupMaster = useCallback(async (e) => {
        e.preventDefault();

        if (flag === 1) {
            const result = await axioslogin.patch(`/usergroup`, updatedPostData)
            const { message, success } = result.data
            if (success === 2) {
                succesNofity(message)
                setCount(count + 1)
                setFormData(resetForm)
            } else {
                infoNofity(message)
            }
        } else {
            const result = await axioslogin.post('/usergroup', postData)
            const { success, message } = result.data;
            if (success === 1) {
                succesNofity(message)
                setFormData(resetForm)
                setCount(count + 1)
            } else if (success === 0) {
                errorNofity(message);
            } else if (success === 2) {
                infoNofity(message.sqlMessage);
            }
        }
    }, [postData, count, resetForm, flag, updatedPostData])

    useEffect(() => {
        const getGroupmaster = async () => {
            const result = await axioslogin.get('/usergroup')
            const { success, data } = result.data;
            if (success === 1) {
                setTableData(data)
                setCount(0)
            } else {
                setTableData([])
            }
        }
        getGroupmaster()
    }, [count])

    const [columnDef] = useState([
        { headerName: 'Sl No', field: 'user_grp_slno' },
        { headerName: 'Group Name', field: 'user_group_name', filter: true, width: 150 },
        { headerName: 'Status ', field: 'grp_status', width: 100 },
        {
            headerName: 'Edit', cellRenderer: params =>
                <IconButton sx={{ paddingY: 0.5 }} onClick={() => getEdit(params)} >
                    <EditIcon color='primary' />
                </IconButton>
        },
    ])

    const getEdit = useCallback((params) => {
        setFlag(1)
        const { user_group_name, user_group_status, user_grp_slno } = params.data
        const getData = {
            user_group_name,
            user_group_status: user_group_status === 1 ? true : false
        }
        setFormData(getData)
        setSlno(user_grp_slno)

    }, [])

    return (

        <MasterLayout title="User Group Master" displayClose={true} >
            <ToastContainer />
            <Box sx={{ width: "100%" }} >
                <Grid container spacing={1}>
                    <Grid item xl={3} lg={2}>
                        <Box sx={{ width: "100%", p: 1 }}>
                            <InputComponent
                                placeholder={'User Group Name'}
                                type="text"
                                size="sm"
                                name="user_group_name"
                                value={user_group_name}
                                onchange={(e) => getUserGroupFormData(e)}
                            />
                        </Box>
                        <Box sx={{ pl: 1 }} >
                            <JoyCheckbox
                                label='User Group Status'
                                checked={user_group_status}
                                name="user_group_status"
                                onchange={(e) => getUserGroupFormData(e)}
                            />
                        </Box>
                        <Box sx={{ px: 0.5, mt: 0.9 }}>
                            <CssVarsProvider>
                                <Button
                                    variant="outlined"
                                    component="label"
                                    size="md"
                                    color="primary"
                                    onClick={submitUserGroupMaster}
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

export default memo(Groupmaster) 
