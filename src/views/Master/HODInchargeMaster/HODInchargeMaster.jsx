import { Box, Grid, Paper, Typography } from '@mui/material'
import React, { Fragment, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNofity, succesNofity } from 'src/views/CommonCode/Commonfunc'
import PageLayoutSaveClose from 'src/views/CommonCode/PageLayoutSaveClose'
import CommonCheckBox from 'src/views/Component/CommonCheckBox'
import HODInchargeNameSelect from './HODInchargeNameSelect'
import HODInchargeTable from './HODInchargeTable'

const HODInchargeMaster = () => {
    const history = useHistory()
    /** initializing values */
    const [count, setCount] = useState(0)
    const [namesL, setnames] = useState(0)
    const [approve, setApprove] = useState({
        incharge: false,
        hod: false,
        gm: false,
        om: false,
        hr: false,
        ms: false,
        cno: false,
        acno: false,
        ed: false,
        md: false
    })
    /** destrucuring data */
    const { incharge, hod, gm, om, hr, ms, cno, acno, ed, md } = approve

    const defaultstate = {
        names: '',
        incharge: false,
        hod: false,
        gm: false,
        om: false,
        hr: false,
        ms: false,
        cno: false,
        acno: false,
        ed: false,
        md: false
    }
    /** get values from form */
    const updateValue = async (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setApprove({ ...approve, [e.target.name]: value })
    }

    const datavalues = {
        incharge: incharge === true ? 1 : 0,
        hod: hod === true ? 1 : 0,
        gm: gm === true ? 1 : 0,
        om: om === true ? 1 : 0,
        hr: hr === true ? 1 : 0,
        ms: ms === true ? 1 : 0,
        cno: cno === true ? 1 : 0,
        acno: acno === true ? 1 : 0,
        ed: ed === true ? 1 : 0,
        md: md === true ? 1 : 0
    }

    const SubmitFormData = async (e) => {
        e.preventDefault();
        if (namesL === 0) {
            infoNofity("No Data")
        }
        else {
            /** get details of corresponding employee */
            const result = await axioslogin.get(`/performanceappriasalrights/Byname/${namesL}`)
            const { data } = result.data
            const { em_id, em_department } = data[0]
            const postData = {
                dept_id: em_department,
                em_id: em_id,
                rights_needed: datavalues
            }
            /** submit to the values to the database */
            const res = await axioslogin.post('/performanceappriasalrights/hodinsert', postData)
            const { success, message } = result.data
            if (success === 1) {
                setCount(count + 1)
                setApprove(defaultstate)
                succesNofity(message)
            }
        }
    }

    const RedirectToMasterPage = () => {
        history.push('/Home/Settings');
    }

    return (
        <Fragment>
            <PageLayoutSaveClose
                heading="HOD/Incharge Appraisal Rights Master"
                submit={SubmitFormData}
                redirect={RedirectToMasterPage}
            >
                <Box>
                    <Paper square elevation={2} sx={{ p: 0.5, }}   >
                        <Box sx={{ flex: 2, }} >
                            <Grid container spacing={1}>
                                <Grid item xl={3} lg={2}>
                                    <Box>
                                        <HODInchargeNameSelect
                                            label={"Select Name"}
                                            value={namesL}
                                            setValue={setnames}
                                            style={{ minHeight: 10, maxHeight: 27, paddingTop: 0, paddingBottom: 4 }}
                                        />
                                    </Box>
                                    <Box sx={{
                                        display: 'flex',
                                        flexDirection: 'row'
                                    }}>
                                        <Grid container >
                                            <Grid item xs={2} lg={2} xl={2} md={2}>
                                                <CommonCheckBox
                                                    style={{ width: "100%", paddingLeft: 3, paddingTop: 6 }}
                                                    name="incharge"
                                                    value={incharge}
                                                    checked={incharge}
                                                    onChange={(e) => updateValue(e)}
                                                />
                                            </Grid>
                                            <Grid item xs={4} lg={4} xl={4} md={4}>
                                                <Typography sx={{ paddingTop: 1, paddingLeft: 0 }}>Incharge</Typography>
                                            </Grid>
                                        </Grid>
                                        <Grid container >
                                            <Grid item xs={2} lg={2} xl={2} md={2}>
                                                <CommonCheckBox
                                                    style={{ width: "100%", paddingLeft: 3, paddingTop: 6 }}
                                                    name="hod"
                                                    value={hod}
                                                    checked={hod}
                                                    onChange={(e) => updateValue(e)}
                                                />
                                            </Grid>
                                            <Grid item xs={4} lg={4} xl={4} md={4}>
                                                <Typography sx={{ paddingTop: 1, paddingLeft: 0 }}>HOD</Typography>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                    <Box sx={{
                                        display: 'flex',
                                        flexDirection: 'row'
                                    }}>
                                        <Grid container >
                                            <Grid item xs={2} lg={2} xl={2} md={2}>
                                                <CommonCheckBox
                                                    style={{ width: "100%", paddingLeft: 3, paddingTop: 6 }}
                                                    name="gm"
                                                    value={gm}
                                                    checked={gm}
                                                    onChange={(e) => updateValue(e)}
                                                />
                                            </Grid>
                                            <Grid item xs={4} lg={4} xl={4} md={4}>
                                                <Typography sx={{ paddingTop: 1, paddingLeft: 0 }}>GM</Typography>
                                            </Grid>
                                        </Grid>
                                        <Grid container >
                                            <Grid item xs={2} lg={2} xl={2} md={2}>
                                                <CommonCheckBox
                                                    style={{ width: "100%", paddingLeft: 3, paddingTop: 6 }}
                                                    name="om"
                                                    value={om}
                                                    checked={om}
                                                    onChange={(e) => updateValue(e)}
                                                />
                                            </Grid>
                                            <Grid item xs={4} lg={4} xl={4} md={4}>
                                                <Typography sx={{ paddingTop: 1, paddingLeft: 0 }}>OM</Typography>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                    <Box sx={{
                                        display: 'flex',
                                        flexDirection: 'row'
                                    }}>
                                        <Grid container >
                                            <Grid item xs={2} lg={2} xl={2} md={2}>
                                                <CommonCheckBox
                                                    style={{ width: "100%", paddingLeft: 3, paddingTop: 6 }}
                                                    name="hr"
                                                    value={hr}
                                                    checked={hr}
                                                    onChange={(e) => updateValue(e)}
                                                />
                                            </Grid>
                                            <Grid item xs={4} lg={4} xl={4} md={4}>
                                                <Typography sx={{ paddingTop: 1, paddingLeft: 0 }}>HR</Typography>
                                            </Grid>
                                        </Grid>
                                        <Grid container >
                                            <Grid item xs={2} lg={2} xl={2} md={2}>
                                                <CommonCheckBox
                                                    style={{ width: "100%", paddingLeft: 3, paddingTop: 6 }}
                                                    name="ms"
                                                    value={ms}
                                                    checked={ms}
                                                    onChange={(e) => updateValue(e)}
                                                />
                                            </Grid>
                                            <Grid item xs={4} lg={4} xl={4} md={4}>
                                                <Typography sx={{ paddingTop: 1, paddingLeft: 0 }}>MS</Typography>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                    <Box sx={{
                                        display: 'flex',
                                        flexDirection: 'row'
                                    }}>
                                        <Grid container >
                                            <Grid item xs={2} lg={2} xl={2} md={2}>
                                                <CommonCheckBox
                                                    style={{ width: "100%", paddingLeft: 3, paddingTop: 6 }}
                                                    name="cno"
                                                    value={cno}
                                                    checked={cno}
                                                    onChange={(e) => updateValue(e)}
                                                />
                                            </Grid>
                                            <Grid item xs={4} lg={4} xl={4} md={4}>
                                                <Typography sx={{ paddingTop: 1, paddingLeft: 0 }}>CNO</Typography>
                                            </Grid>
                                        </Grid>
                                        <Grid container >
                                            <Grid item xs={2} lg={2} xl={2} md={2}>
                                                <CommonCheckBox
                                                    style={{ width: "100%", paddingLeft: 3, paddingTop: 6 }}
                                                    name="acno"
                                                    value={acno}
                                                    checked={acno}
                                                    onChange={(e) => updateValue(e)}
                                                />
                                            </Grid>
                                            <Grid item xs={4} lg={4} xl={4} md={4}>
                                                <Typography sx={{ paddingTop: 1, paddingLeft: 0 }}>ACNO</Typography>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                    <Box sx={{
                                        display: 'flex',
                                        flexDirection: 'row'
                                    }}>
                                        <Grid container >
                                            <Grid item xs={2} lg={2} xl={2} md={2}>
                                                <CommonCheckBox
                                                    style={{ width: "100%", paddingLeft: 3, paddingTop: 6 }}
                                                    name="ed"
                                                    value={ed}
                                                    checked={ed}
                                                    onChange={(e) => updateValue(e)}
                                                />
                                            </Grid>
                                            <Grid item xs={4} lg={4} xl={4} md={4}>
                                                <Typography sx={{ paddingTop: 1, paddingLeft: 0 }}>ED</Typography>
                                            </Grid>
                                        </Grid>
                                        <Grid container >
                                            <Grid item xs={2} lg={2} xl={2} md={2}>
                                                <CommonCheckBox
                                                    style={{ width: "100%", paddingLeft: 3, paddingTop: 6 }}
                                                    name="md"
                                                    value={md}
                                                    checked={md}
                                                    onChange={(e) => updateValue(e)}
                                                />
                                            </Grid>
                                            <Grid item xs={4} lg={4} xl={4} md={4}>
                                                <Typography sx={{ paddingTop: 1, paddingLeft: 0 }}>MD</Typography>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </Grid>

                                <Grid item xs={9} lg={9} xl={9} md={9}>

                                    <HODInchargeTable count={count} />
                                </Grid>
                            </Grid>
                        </Box>
                    </Paper>
                </Box>
            </PageLayoutSaveClose >
        </Fragment >
    )
}

export default HODInchargeMaster