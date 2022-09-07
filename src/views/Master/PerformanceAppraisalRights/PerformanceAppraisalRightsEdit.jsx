import { Box, Grid, Paper, Typography } from '@mui/material'
import React, { Fragment, useContext, useEffect } from 'react'
import { useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { axioslogin } from 'src/views/Axios/Axios'
import { errorNofity, infoNofity, succesNofity } from 'src/views/CommonCode/Commonfunc'
import DepartmentSelect from 'src/views/CommonCode/DepartmentSelect'
import PageLayoutSaveClose from 'src/views/CommonCode/PageLayoutSaveClose'
import CommonCheckBox from 'src/views/Component/CommonCheckBox'
import { PayrolMasterContext } from 'src/Context/MasterContext';
import PerformanceAppraisalRightsTable from './PerformanceAppraisalRightsTable'

const PerformanceAppraisalRightsEdit = () => {
    const history = useHistory()
    const { id } = useParams()

    const { selectedDept, updateSelected } = useContext(PayrolMasterContext)
    const [arr, setarr] = useState([])
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
    /** destructuring data */
    const { incharge, hod, gm, om, hr, ms, cno, acno, ed, md } = approve

    const defaultState = {
        selectedDept: '',
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

    /** getting values from form and stored */
    const updateValue = async (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setApprove({ ...approve, [e.target.name]: value })
    }

    useEffect(() => {
        const getAppraisalRights = async () => {
            /** get correspong details about id */
            const result = await axioslogin.get(`performanceappriasalrights/ByID/${id}`)
            const { success, data } = result.data
            if (success === 1) {
                const { dept_id, rights_needed } = data[0]
                const obj = JSON.parse(rights_needed);
                updateSelected(dept_id)
                const { incharge, hod, gm, om, hr, ms, cno, acno, ed, md } = obj
                const v = {
                    incharge: incharge === 1 ? true : false,
                    hod: hod === 1 ? true : false,
                    gm: gm === 1 ? true : false,
                    om: om === 1 ? true : false,
                    hr: hr === 1 ? true : false,
                    ms: ms === 1 ? true : false,
                    cno: cno === 1 ? true : false,
                    acno: acno === 1 ? true : false,
                    ed: ed === 1 ? true : false,
                    md: md === 1 ? true : false
                }
                setApprove(v)
            }
        }
        getAppraisalRights()
    }, [id, updateSelected])

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

    const resetForm = {
        selectedDept: '',
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
    /** to get employee id corresponding to the department */
    useEffect(() => {
        if (selectedDept !== 0) {
            const getEmployeeID = async () => {
                const result = await axioslogin.get(`/performanceappriasalrights/EmpByDept/${selectedDept}`)
                const { success, data } = result.data
                if (success === 1) {
                    setarr(data)
                }
                else if (success === 0) {
                    setarr([])
                }
            }
            getEmployeeID()
        }
    }, [selectedDept])

    const SubmitFormData = async (e) => {
        e.preventDefault();
        if (arr.length === 0) {
            infoNofity("No Employees")
        }
        else {
            const saveDuties = arr.map((val) => {
                return {
                    em_id: val.em_id,
                    dept_id: selectedDept,
                    rights_needed: datavalues
                }
            })
            const result = await axioslogin.patch('/performanceappriasalrights/updatedataa', saveDuties)
            const { success, message } = result.data
            if (success === 1) {
                setApprove(resetForm)
                succesNofity("Updated Successfully")
                history.push('/Home/PerformanceAppraisalRights')
            }
            else {
                errorNofity("Please select department")
            }
        }
    }

    const RedirectToMasterPage = () => {
        history.push('/Home/Settings');
    }
    return (
        <Fragment>
            <PageLayoutSaveClose
                heading="Performance Appraisal Rights Master"
                submit={SubmitFormData}
                redirect={RedirectToMasterPage}
            >
                <Box>
                    <Paper square elevation={2} sx={{ p: 0.5, }}   >
                        <Box sx={{ flex: 2, }} >
                            <Grid container spacing={1}>
                                <Grid item xl={3} lg={2}>
                                    <Box>
                                        <DepartmentSelect style={{ p: 0, height: 25, lineHeight: 1.200, m: 0 }} />
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

                                    <PerformanceAppraisalRightsTable />
                                </Grid>
                            </Grid>
                        </Box>
                    </Paper>
                </Box>
            </PageLayoutSaveClose >
        </Fragment >
    )
}

export default PerformanceAppraisalRightsEdit








