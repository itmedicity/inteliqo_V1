import { Box, Card, Grid, Paper, Typography } from '@mui/material'
import { reset } from 'enzyme/build/configuration'
import React, { Fragment, useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min'
import { setGradeList } from 'src/redux/actions/Grade.Action'
import { axioslogin } from 'src/views/Axios/Axios'
import { errorNofity, infoNofity, succesNofity } from 'src/views/CommonCode/Commonfunc'
import PageLayoutSaveClose from 'src/views/CommonCode/PageLayoutSaveClose'
import CommonCheckBox from 'src/views/Component/CommonCheckBox'
import TextInput from 'src/views/Component/TextInput'
import GradeSelect from './GradeSelect'
import PerformanceDescSelect from './PerformanceDescSelect'
import PerformanceGradeTable from './PerformanceGradeTable'

const PerformanceGradeEdit = () => {
    const history = useHistory()
    const { id } = useParams()

    const [grade, setGrade] = useState(0)
    const [desc, setDesc] = useState(0)
    const [count, setCount] = useState(0)
    const [perGrade, setPerGrade] = useState(0)

    const handlechange = (e) => {
        setGrade(e)
    }
    const handlechange2 = (e) => {
        setDesc(e)
    }

    const [formData, setFormData] = useState({
        score: '',
        grade: '',
        desc: '',
        fixedpay: '',
        variablepay: '',
        pgradestatus: false
    })

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

    useEffect(() => {
        const getPerformanceGrade = async () => {
            const result = await axioslogin.get(`performanceGrade/dataById/${id}`)
            const { success, data } = result.data
            if (success === 1) {
                const { p_score, p_grade, p_descrption, fixed_pay_inc, variable_pay_inc, p_status } = data[0]
                const frmdata = {
                    score: p_score,
                    fixedpay: fixed_pay_inc,
                    variablepay: variable_pay_inc,
                    pgradestatus: p_status === 1 ? true : false
                }
                console.log(frmdata);
                setFormData(frmdata)
                setGrade(p_grade)
                setDesc(p_descrption)
            }
        }
        getPerformanceGrade()
    }, [id])

    const postEditData = {
        p_score: score,
        p_grade: grade,
        p_descrption: desc,
        fixed_pay_inc: fixedpay,
        variable_pay_inc: variablepay,
        p_status: pgradestatus === false ? 0 : 1,
        pgrade_slno: id
    }

    const resetForm = {
        score: '',
        grade: '',
        desc: '',
        fixedpay: '',
        variablepay: '',
        pgradestatus: false
    }

    const SubmitFormData = async (e) => {
        e.preventDefault();
        const result = await axioslogin.patch('performanceGrade/update', postEditData)
        const { message, success } = result.data;
        if (success === 2) {
            setFormData(resetForm);
            reset();
            history.push('/Home/PerformanceGradeMaster');
            succesNofity(message);
        } else if (success === 0) {
            infoNofity(message.sqlMessage)
        } else {
            infoNofity(message)
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
                                                onChange={handlechange}
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
                                                onChange={handlechange2}
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
                                                checked={pgradestatus}
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

export default PerformanceGradeEdit