import { Box, Card, Grid, Paper, Typography } from '@mui/material'
import React, { Fragment, useEffect, useMemo } from 'react'
import { useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { axioslogin } from 'src/views/Axios/Axios'
import { errorNofity, succesNofity } from 'src/views/CommonCode/Commonfunc'
import PageLayoutSaveClose from 'src/views/CommonCode/PageLayoutSaveClose'
import CommonCheckBox from 'src/views/Component/CommonCheckBox'
import TextInput from 'src/views/Component/TextInput'
import HighLevelMasterTable from './HighLevelMasterTable'

const HighLevelMasterEdit = () => {
    const history = useHistory()
    const [count, setCount] = useState(0)
    const { id } = useParams()

    const [formData, setFormData] = useState({
        highlevel: '',
        highlevelstatus: false
    })
    const { highlevel, highlevelstatus } = formData

    const defaultState = {
        highlevel: '',
        highlevelstatus: false
    }
    //getting formData
    const updateHighLevel = async (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
        setFormData({ ...formData, [e.target.name]: value })
    }

    //Get data
    useEffect(() => {
        const getHighlevel = async () => {
            const result = await axioslogin.get(`/HighLevel/data/${id}`)
            const { success, data } = result.data
            if (success === 1) {
                const { highlevel_name, highlevel_status } = data[0]
                const frmdata = {
                    highlevel: highlevel_name,
                    highlevelstatus: highlevel_status === 1 ? true : false
                }
                setFormData(frmdata)
            }
        }
        getHighlevel()
    }, [id])

    const postData = useMemo(() => {
        return {
            highlevel_name: highlevel,
            highlevel_status: highlevelstatus === false ? 0 : 1,
            highlevel_slno: id
        }
    }, [highlevel, highlevelstatus, id])

    //update data
    const SubmitFormData = async (e) => {
        e.preventDefault();
        const result = await axioslogin.patch('/HighLevel', postData)
        const { success, message } = result.data
        if (success === 2) {
            setFormData(defaultState)
            history.push('/Home/HighLevelMaster');
            succesNofity(message)
        }
        else {
            errorNofity("Error Occure!!!!Please Contact EDP")
        }
    }

    const RedirectToMasterPage = () => {
        history.push('/Home/Settings');
    }

    return (
        <Fragment>
            <PageLayoutSaveClose
                heading="High Level Master"
                submit={SubmitFormData}
                redirect={RedirectToMasterPage}
            >
                <Box>
                    <Paper square elevation={2} sx={{ p: 0.5, }}   >
                        <Box sx={{ flex: 2, }} >

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
                                    <HighLevelMasterTable count={count} />
                                </Grid>
                            </Grid>
                        </Box>
                    </Paper>
                </Box>
            </PageLayoutSaveClose >
        </Fragment >
    )
}

export default HighLevelMasterEdit