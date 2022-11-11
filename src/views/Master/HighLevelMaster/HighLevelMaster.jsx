import { Box, Grid, Paper, Typography } from '@mui/material'
import React, { Fragment, useCallback, useEffect, useMemo } from 'react'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { axioslogin } from 'src/views/Axios/Axios'
import { errorNofity, succesNofity } from 'src/views/CommonCode/Commonfunc'
import PageLayoutSaveClose from 'src/views/CommonCode/PageLayoutSaveClose'
import CommonAgGrid from 'src/views/Component/CommonAgGrid'
import CommonCheckBox from 'src/views/Component/CommonCheckBox'
import TextInput from 'src/views/Component/TextInput'
import EditIcon from '@mui/icons-material/Edit';

const HighLevelMaster = () => {
    const history = useHistory()
    const [count, setCount] = useState(0)
    const [formData, setFormData] = useState({
        highlevel: '',
        highlevelstatus: false
    })
    const { highlevel, highlevelstatus } = formData
    const [data, setData] = useState([])
    const [value, setvalue] = useState(0)
    const [slno, setslno] = useState(0)

    const defaultState = {
        highlevel: '',
        highlevelstatus: false
    }

    //getting formData
    const updateHighLevel = async (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
        setFormData({ ...formData, [e.target.name]: value })
    }

    //postdata for submit
    const postData = useMemo(() => {
        return {
            highlevel_name: highlevel,
            highlevel_status: highlevelstatus === false ? 0 : 1
        }
    }, [highlevel, highlevelstatus])

    //updatedata for update
    const updateData = useMemo(() => {
        return {
            highlevel_name: highlevel,
            highlevel_status: highlevelstatus === false ? 0 : 1,
            highlevel_slno: slno
        }
    }, [highlevel, highlevelstatus, slno])

    //saving form Data
    const SubmitFormData = useCallback((e) => {
        e.preventDefault();
        const submitFunc = async (postData) => {
            const result = await axioslogin.post('/HighLevel/add', postData)
            const { success, message } = result.data
            if (success === 1) {
                succesNofity(message)
                setCount(count + 1)
                setFormData(defaultState)
            }
            else {
                errorNofity(message)
            }
        }
        //updating 
        const updateFunc = async (slno) => {
            const result = await axioslogin.patch('/HighLevel', updateData)
            const { success, message } = result.data
            if (success === 2) {
                setFormData(defaultState)
                setCount(count + 1)
                succesNofity(message)
            }
            else {
                errorNofity("Error Occure!!!!Please Contact EDP")
            }
        }
        if (value === 1) {
            updateFunc(updateData)
        }
        else {
            submitFunc(postData)
        }
    }, [postData, slno])

    const RedirectToMasterPage = () => {
        history.push('/Home/Settings');
    }

    const [columnDef] = useState([
        { headerName: 'Sl No', field: 'highlevel_slno' },
        { headerName: 'High level Desg ', field: 'highlevel_name' },
        { headerName: 'High Level Status', field: 'status' },
        {
            headerName: 'Action', cellRenderer: params =>
                <EditIcon onClick={() =>
                    getDataTable(params)
                }
                />
        },
    ])

    //getting High Level Table Data
    useEffect(() => {
        const getData = async () => {
            const result = await axioslogin.get('/HighLevel/list')
            const { success, data } = result.data
            if (success === 1) {
                setData(data)
            }
            else {
                setData([])
            }
        }
        getData()
    }, [count])

    const getDataTable = useCallback((params) => {
        setvalue(1)
        const data = params.api.getSelectedRows()
        const { highlevel_slno, highlevel_name, highlevel_status } = data[0]
        const formData = {
            highlevel: highlevel_name,
            highlevelstatus: highlevel_status === 1 ? true : false
        }
        setFormData(formData)
        setslno(highlevel_slno)
    })

    return (
        <Fragment>
            <PageLayoutSaveClose
                heading="High Level Master"
                submit={SubmitFormData}
                redirect={RedirectToMasterPage}
            >
                <Box>
                    <Paper square elevation={2} sx={{ p: 0.5, }}   >
                        <Box sx={{ flex: 2, flexDirection: 'row' }} >

                            <Grid container spacing={1}>
                                <Grid item xl={3} lg={2}>
                                    {/* <Card sx={{ padding: 1, borderStyle: 'inherit' }}> */}
                                    <TextInput
                                        style={{ width: "100%", paddingLeft: 13 }}
                                        Placeholder="High Level"
                                        name="highlevel"
                                        value={highlevel}
                                        changeTextValue={(e) => updateHighLevel(e)}
                                    />
                                    <Grid container >
                                        <Grid item xs={2} lg={2} xl={2} md={2}>
                                            <CommonCheckBox
                                                style={{ width: "100%", paddingLeft: 3, paddingTop: 6 }}
                                                name="highlevelstatus"
                                                value={highlevelstatus}
                                                checked={highlevelstatus}
                                                onChange={(e) => updateHighLevel(e)}
                                            />
                                        </Grid>
                                        <Grid item xs={6} lg={6} xl={6} md={6}>
                                            <Typography sx={{ paddingTop: 1, paddingLeft: 0 }}>Status</Typography>
                                        </Grid>
                                    </Grid>
                                    {/* </Card> */}
                                </Grid>
                                <Grid item xs={9} lg={9} xl={9} md={9}>
                                    <CommonAgGrid columnDefs={columnDef}
                                        tableData={data}
                                        sx={{
                                            height: 300,
                                            width: "100%"
                                        }} rowHeight={30} headerHeight={30} />
                                    {/* <HighLevelMasterTable count={count} /> */}
                                </Grid>
                            </Grid>
                        </Box>
                    </Paper>
                </Box>
            </PageLayoutSaveClose >
        </Fragment >
    )
}

export default HighLevelMaster






