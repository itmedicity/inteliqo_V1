import { Button, CssVarsProvider } from '@mui/joy'
import { Box, Checkbox, FormControlLabel, Grid, IconButton, TextField } from '@mui/material'
import React, { memo, useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import CommonAgGrid from 'src/views/Component/CommonAgGrid'
import CustomLayout from 'src/views/Component/MuiCustomComponent/CustomLayout'
import SaveIcon from '@mui/icons-material/Save';
import { useMemo } from 'react'
import { useCallback } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import { useSelector } from 'react-redux'
import _ from 'underscore'
import { errorNofity, succesNofity } from 'src/views/CommonCode/Commonfunc'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const CommonRequestMast = () => {

    const [reqstDesc, setReqstDesc] = useState('')
    const [status, setStatus] = useState(false)
    const [tableData, setTabledata] = useState([])
    const [editSlno, setEditSlno] = useState(0)
    const [flag, setFlag] = useState(0)
    const [count, setCount] = useState(0)

    const empData = useSelector((state) => state?.getProfileData?.ProfileData[0], _.isEqual)
    const { em_no } = empData

    const postData = useMemo(() => {
        return {
            request_name: reqstDesc,
            request_status: status,
            create_user: em_no
        }
    }, [reqstDesc, status, em_no])

    const updateData = useMemo(() => {
        return {
            request_name: reqstDesc,
            request_status: status === true ? 1 : 0,
            update_user: em_no,
            slno: editSlno
        }
    }, [reqstDesc, status, em_no, editSlno])

    const submit = useCallback(() => {
        const SubmitFunction = async () => {
            const result = await axioslogin.post('/CommonRequestMast', postData)
            const { success, message } = result.data;
            if (success === 1) {
                succesNofity(message)
                setCount(count + 1)
                setReqstDesc('')
                setStatus(false)
            } else {
                errorNofity(message)
                setReqstDesc('')
                setStatus(false)
            }
        }

        const updateFunction = async () => {
            const result = await axioslogin.patch('/CommonRequestMast', updateData)
            const { success, message } = result.data;
            if (success === 2) {
                succesNofity(message)
                setCount(count + 1)
                setReqstDesc('')
                setStatus(false)
            } else {
                errorNofity(message)
                setReqstDesc('')
                setStatus(false)
            }
        }
        if (flag === 1) {
            updateFunction(updateData)
        } else {
            SubmitFunction(postData)
        }
    }, [postData, updateData, count, flag])

    useEffect(() => {
        const getAllData = async () => {
            const result = await axioslogin.get(`/CommonRequestMast`)
            const { success, data } = result.data;
            if (success === 1) {
                setTabledata(data)
                setCount(0)
            } else {
                setTabledata([])
            }
        }
        getAllData()
    }, [count])

    const [columnDef] = useState([
        { headerName: 'Sl No', field: 'serialno' },
        { headerName: 'Request', field: 'request_name', filter: true, width: 150 },
        { headerName: 'Status ', field: 'status', width: 100 },
        {
            headerName: 'Edit', cellRenderer: params =>
                <IconButton sx={{ paddingY: 0.5 }} onClick={() => getEdit(params)} >
                    <EditIcon color='primary' />
                </IconButton>
        },
        {
            headerName: 'Delete', cellRenderer: params =>
                <IconButton sx={{ paddingY: 0.5 }} onClick={() => getDelete(params)} >
                    <DeleteIcon color='primary' />
                </IconButton>
        },
    ])

    const getEdit = useCallback((params) => {
        setFlag(1)
        const data = params.api.getSelectedRows()
        const { slno, request_name, request_status } = data[0]
        setEditSlno(slno)
        setReqstDesc(request_name === null ? '' : request_name)
        setStatus(request_status === 1 ? true : false)
    }, [])

    const getDelete = async (params) => {
        const data = params.api.getSelectedRows()
        const { slno } = data[0]
        const result = await axioslogin.delete(`/CommonRequestMast/delete/data/${slno}`)
        const { success, message } = result.data;
        if (success === 2) {
            succesNofity(message)
            setCount(count + 1)
        } else {
            errorNofity(message)
        }
    }

    return (
        <CustomLayout title="General Request" displayClose={true} >
            <ToastContainer />
            <Box sx={{ width: "100%" }} >
                <Grid container spacing={1}>
                    <Grid item xl={3} lg={2}>
                        <Box sx={{ width: "100%", p: 1 }}>
                            <TextField
                                fullWidth
                                placeholder='Request Name'
                                size="small"
                                id='reqstDesc'
                                value={reqstDesc}
                                name="reqstDesc"
                                onChange={(e) => setReqstDesc(e.target.value)}
                            />
                        </Box>
                        <Box sx={{ pl: 1 }} >
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name="status"
                                        color="primary"
                                        value={status}
                                        checked={status}
                                        className="ml-1"
                                        onChange={(e) => setStatus(e.target.checked)}
                                    />
                                }
                                label="Status"
                            />
                        </Box>
                        <Box sx={{ px: 0.5, mt: 0.9 }}>
                            <CssVarsProvider>
                                <Button
                                    variant="outlined"
                                    component="label"
                                    size="md"
                                    color="primary"
                                    onClick={submit}
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
        </CustomLayout>
    )
}

export default memo(CommonRequestMast) 