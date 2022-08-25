import { Box, Grid, Paper, Typography } from '@mui/material'
import React, { Fragment, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { axioslogin } from 'src/views/Axios/Axios'
import { errorNofity, succesNofity } from 'src/views/CommonCode/Commonfunc'
import PageLayoutSaveClose from 'src/views/CommonCode/PageLayoutSaveClose'
import CommonCheckBox from 'src/views/Component/CommonCheckBox'
import TextInput from 'src/views/Component/TextInput'
import GradeSelect from './GradeSelect'
import PerformanceDescSelect from './PerformanceDescSelect'
import PerformanceGradeTable from './PerformanceGradeTable'

const PerformanceGrade = () => {
    const history = useHistory()
    const [grade, setGrade] = useState(0)
    const [desc, setDesc] = useState(0)
    const [count, setCount] = useState(0)
    /** set formdata null */

    const [formData, setFormData] = useState({
        score: '',
        grade: '',
        desc: '',
        fixedpay: '',
        variablepay: '',
        pgradestatus: false
    })

    /** destructuring formdata */
    const { score, fixedpay, variablepay, pgradestatus } = formData

    const defaultState = {
        score: '',
        grade: '',
        desc: '',
        fixedpay: '',
        variablepay: '',
        pgradestatus: false
    }

    //getting formData
    const updatePerformanceGrade = async (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
        setFormData({ ...formData, [e.target.name]: value })
    }

    /** postdata for submitting data to database*/
    const postData = {
        p_score: score,
        p_grade: grade,
        p_descrption: desc,
        fixed_pay_inc: fixedpay,
        variable_pay_inc: variablepay,
        p_status: pgradestatus === false ? 0 : 1
    }

    const SubmitFormData = async (e) => {
        e.preventDefault();
        /** submitting performance grade to databse */
        const result = await axioslogin.post('/performanceGrade/submit', postData)
        const { success, message } = result.data
        if (success === 1) {
            setCount(count + 1)
            setFormData(defaultState)
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
                heading="Performance Grade"
                submit={SubmitFormData}
                redirect={RedirectToMasterPage}
            >
                <Box>
                    <Paper square elevation={2} sx={{ p: 0.5, }}   >
                        <Box sx={{ flex: 2, }} >

                            <Grid container spacing={1}>
                                <Grid item xl={3} lg={2}>
                                    {/* <Card sx={{ padding: 1, borderStyle: 'inherit' }}> */}
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                            //backgroundColor: "lightblue",
                                        }}
                                    >
                                        <Box>
                                            <TextInput
                                                style={{ width: "100%", paddingLeft: 13 }}
                                                Placeholder="Score"
                                                name="score"
                                                type="text"
                                                value={score}
                                                changeTextValue={(e) => updatePerformanceGrade(e)}
                                            />
                                        </Box>
                                        <Box
                                            sx={{ pt: 1 }}
                                        >
                                            <GradeSelect
                                                label={"Select Grade"}
                                                value={grade}
                                                setValue={setGrade}
                                                style={{ minHeight: 10, maxHeight: 27, paddingTop: 0, paddingBottom: 4 }}
                                            />
                                        </Box>
                                        <Box
                                            sx={{ pt: 1 }}
                                        >
                                            <PerformanceDescSelect
                                                label={"Performance Description"}
                                                value={desc}
                                                setValue={setDesc}
                                                style={{ minHeight: 10, maxHeight: 27, paddingTop: 0, paddingBottom: 4 }}
                                            />
                                        </Box>
                                        <Box
                                            sx={{ pt: 1 }}
                                        >
                                            <Grid container >
                                                <Grid item xs={6} lg={6} xl={6} md={6}>
                                                    <Typography sx={{ paddingLeft: 0 }}>% Fixed pay increase</Typography>
                                                </Grid>
                                                <Grid item xs={6} lg={6} xl={6} md={6} >
                                                    <TextInput
                                                        style={{ width: "100%", paddingLeft: 13 }}
                                                        Placeholder="% value"
                                                        name="fixedpay"
                                                        type="text"
                                                        value={fixedpay}
                                                        changeTextValue={(e) => updatePerformanceGrade(e)}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </Box>
                                        <Box
                                            sx={{ pt: 1 }}
                                        >
                                            <Grid container >
                                                <Grid item xs={6} lg={6} xl={6} md={6}>
                                                    <Typography sx={{ paddingLeft: 0 }}>% Variable pay increase</Typography>
                                                </Grid>
                                                <Grid item xs={6} lg={6} xl={6} md={6} >
                                                    <TextInput
                                                        style={{ width: "100%", paddingLeft: 13 }}
                                                        Placeholder="% value"
                                                        name="variablepay"
                                                        type="text"
                                                        value={variablepay}
                                                        changeTextValue={(e) => updatePerformanceGrade(e)}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </Box>
                                        {/* <Box
                                            sx={{ pt: 1 }}
                                        >
                                            <Grid container >
                                                <Grid item xs={6} lg={6} xl={6} md={6}>
                                                    <Typography sx={{ paddingLeft: 0 }}>Total % increase</Typography>
                                                </Grid>
                                                <Grid item xs={6} lg={6} xl={6} md={6} >
                                                    <TextInput
                                                        style={{ width: "100%", paddingLeft: 13 }}
                                                        Placeholder="% value"
                                                        name="total"
                                                        type="text"
                                                        value={total}
                                                        changeTextValue={(e) => updatePerformanceGrade(e)}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </Box> */}
                                    </Box>
                                    <Grid container >
                                        <Grid item xs={2} lg={2} xl={2} md={2}>
                                            <CommonCheckBox
                                                style={{ width: "100%", paddingLeft: 3, paddingTop: 6 }}
                                                name="pgradestatus"
                                                value={pgradestatus}
                                                onChange={(e) => updatePerformanceGrade(e)}
                                            />
                                        </Grid>
                                        <Grid item xs={6} lg={6} xl={6} md={6}>
                                            <Typography sx={{ paddingTop: 1, paddingLeft: 0 }}>Status</Typography>
                                        </Grid>
                                    </Grid>
                                    {/* </Card> */}
                                </Grid>
                                <Grid item xs={9} lg={9} xl={9} md={9}>
                                    {/* <KraTable count={count} /> */}
                                    <PerformanceGradeTable count={count} />
                                </Grid>
                            </Grid>
                        </Box>
                    </Paper>
                </Box>
            </PageLayoutSaveClose >
        </Fragment >
    )
}

export default PerformanceGrade