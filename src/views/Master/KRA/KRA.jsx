import { Box, Card, Grid, Paper, Typography } from '@mui/material'
import React, { Fragment, useCallback } from 'react'
import { useMemo } from 'react'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { axioslogin } from 'src/views/Axios/Axios'
import { errorNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc'
import PageLayoutSaveClose from 'src/views/CommonCode/PageLayoutSaveClose'
import CommonCheckBox from 'src/views/Component/CommonCheckBox'
import TextInput from 'src/views/Component/TextInput'
import KRAAGgridTable from './KRAAGgridTable'

const KRA = () => {
    const history = useHistory()
    const [count, setCount] = useState(0)
    const [formData, setFormData] = useState({
        kra: '',
        krastatus: false
    })
    const { kra, krastatus } = formData
    const [value, setvalue] = useState(0)
    const [slno, setslno] = useState(0)
    const defaultState = {
        kra: '',
        krastatus: false
    }
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
    }, [postData, postupdateData, count, value])
    const RedirectToMasterPage = () => {
        history.push('/Home/Settings');
    }
    return (
        <Fragment>
            <PageLayoutSaveClose
                heading="Key Performance Area"
                submit={SubmitFormData}
                redirect={RedirectToMasterPage}
            >
                <Box>
                    <Paper square elevation={2} sx={{ p: 0.5, }}   >
                        <Box sx={{ flex: 2, }} >

                            <Grid container spacing={1}>
                                <Grid item xl={3} lg={2}>
                                    <Card sx={{ padding: 1, borderStyle: 'inherit' }}>
                                        <TextInput
                                            style={{ width: "100%", paddingLeft: 13 }}
                                            Placeholder="key Result Area"
                                            name="kra"
                                            value={kra}
                                            changeTextValue={(e) => updatekeyResultArea(e)}
                                        />
                                        <Grid container >
                                            <Grid item xs={2} lg={2} xl={2} md={2}>
                                                <CommonCheckBox
                                                    style={{ width: "100%", paddingLeft: 3, paddingTop: 6 }}
                                                    name="krastatus"
                                                    value={krastatus}
                                                    checked={krastatus}
                                                    onChange={(e) => updatekeyResultArea(e)}
                                                />
                                            </Grid>
                                            <Grid item xs={6} lg={6} xl={6} md={6}>
                                                <Typography sx={{ paddingTop: 1, paddingLeft: 0 }}>Status</Typography>
                                            </Grid>
                                        </Grid>
                                    </Card>
                                </Grid>
                                <Grid item xs={9} lg={9} xl={9} md={9}>
                                    <KRAAGgridTable getDataTable={getDataTable} count={count} />
                                </Grid>
                            </Grid>
                        </Box>
                    </Paper>
                </Box>
            </PageLayoutSaveClose >
        </Fragment >
    )
}

export default KRA