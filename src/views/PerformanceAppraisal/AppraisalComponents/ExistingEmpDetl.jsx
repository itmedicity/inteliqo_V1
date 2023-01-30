import { CssVarsProvider, Typography } from '@mui/joy'
import { Box, Paper } from '@mui/material'
import React, { Fragment, memo, useEffect, useMemo, useState } from 'react'
import { warningNofity } from 'src/views/CommonCode/Commonfunc'
import { getexistDetails } from '../AppraisalFunctions'
import { useSelector } from 'react-redux'

const ExistingEmpDetl = ({ empno, display }) => {

    const emp_no = useMemo(() => empno, [empno])

    const [formdata, setformdata] = useState({
        name: '',
        department_name: '',
        designation_name: '',
        salary: '',
        date_of_joining: '',
        emp_id: '',
        experience: '',
        appraisal_date: '',
        section_name: ''
    })
    const { name, department_name, designation_name, salary, date_of_joining,
        emp_id, experience, appraisal_date, section_name } = formdata

    useEffect(() => {
        getexistDetails(emp_no).then((values) => {
            const { status, data } = values
            if (status === 1) {
                const { em_id, em_name, dept_name, sect_name, desg_name,
                    em_doj, em_amount, exp_year, last_appraisal_date } = data[0]
                const formdata = {
                    emp_id: em_id === null ? "NIL" : em_id,
                    name: em_name === null ? 'NIL' : em_name,
                    department_name: dept_name === null ? 'NIL' : dept_name,
                    section_name: sect_name === null ? 'NIL' : sect_name,
                    designation_name: desg_name === null ? 'NIL' : desg_name,
                    date_of_joining: em_doj === null ? 'NIL' : em_doj,
                    salary: em_amount === null ? 'NIL' : em_amount,
                    experience: exp_year === null ? 'NIL' : exp_year,
                    appraisal_date: last_appraisal_date === null ? 'NIL' : last_appraisal_date
                }
                setformdata(formdata)

            } else {
                warningNofity('There is no data')
            }
        })
    }, [emp_no])

    //to get employee accademic detls
    const state = useSelector((state) => {
        return state.getPrifileDateEachEmp?.empAcademicData?.academicData;
    })
    //to get last qualification of employee
    const lastdata = state.slice(-1)

    return (
        <Fragment>
            <Paper square variant='outlined' elevation={0} sx={{ p: 1, display: "flex", flexDirection: "column" }} >
                <Box sx={{ display: "flex", width: "100%" }} >
                    <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left", fontWeight: 500 }}>
                        <CssVarsProvider>
                            <Typography level="body1"> Name</Typography>
                        </CssVarsProvider>
                    </Box>
                    <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left" }} >
                        <CssVarsProvider>
                            <Typography level="body1"> {name}</Typography>
                        </CssVarsProvider>
                    </Box>
                    <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left", fontWeight: 500 }}  >
                        <CssVarsProvider>
                            <Typography level="body1"> Emp. ID</Typography>
                        </CssVarsProvider>
                    </Box>
                    <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left", }}  >
                        <CssVarsProvider>
                            <Typography level="body1"> {emp_id}</Typography>
                        </CssVarsProvider>
                    </Box>
                </Box>
                <Box sx={{ display: "flex", width: "100%" }} >
                    <Box sx={{ display: "flex", flex: 1, px: 0.5, fontWeight: 500, justifyContent: "left" }}  >
                        <CssVarsProvider>
                            <Typography level="body1"> Department</Typography>
                        </CssVarsProvider>
                    </Box>
                    <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left" }}  >
                        <CssVarsProvider>
                            <Typography level="body1"> {department_name}</Typography>
                        </CssVarsProvider>
                    </Box>
                    <Box sx={{ display: "flex", flex: 1, px: 0.5, fontWeight: 500, justifyContent: "left" }}  >
                        <CssVarsProvider>
                            <Typography level="body1"> Department Section</Typography>
                        </CssVarsProvider>
                    </Box>
                    <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left" }}  >
                        <CssVarsProvider>
                            <Typography level="body1"> {section_name}</Typography>
                        </CssVarsProvider>
                    </Box>
                </Box>
                <Box sx={{ display: "flex", width: "100%" }} >
                    <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left", fontWeight: 500 }}  >
                        <CssVarsProvider>
                            <Typography level="body1"> Designation</Typography>
                        </CssVarsProvider>
                    </Box>
                    <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left", }}  >
                        <CssVarsProvider>
                            <Typography level="body1"> {designation_name}</Typography>
                        </CssVarsProvider>
                    </Box>

                    <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left", fontWeight: 500 }}  >
                        <CssVarsProvider>
                            <Typography level="body1"> Qualification</Typography>
                        </CssVarsProvider>
                    </Box>
                    <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left", }}  >
                        {
                            lastdata && lastdata.map((id, index) => {
                                return <Box key={index}>
                                    <CssVarsProvider >
                                        <Typography textColor="text.secondary">
                                            {id.cour_desc}-{id.spec_desc}
                                        </Typography>
                                    </CssVarsProvider>
                                </Box>
                            })
                        }
                    </Box>
                </Box>
                <Box sx={{ display: "flex", width: "100%" }} >
                    <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left", fontWeight: 500 }}  >
                        <CssVarsProvider>
                            <Typography level="body1"> Previous Exp in Years</Typography>
                        </CssVarsProvider>
                    </Box>
                    <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left", }}  >
                        <CssVarsProvider>
                            <Typography level="body1">{experience}</Typography>
                        </CssVarsProvider>
                    </Box>
                    <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left", fontWeight: 500 }}  >
                        <CssVarsProvider>
                            <Typography level="body1"> Date of Joining</Typography>
                        </CssVarsProvider>
                    </Box>
                    <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left", }}  >
                        <CssVarsProvider>
                            <Typography level="body1">{date_of_joining} </Typography>
                        </CssVarsProvider>
                    </Box>
                </Box>

                {
                    display === 1 ? null : <Box sx={{ display: "flex", width: "100%" }} >
                        <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left", fontWeight: 500 }}  >
                            <CssVarsProvider>
                                <Typography level="body1"> Present Salary Rs.</Typography>
                            </CssVarsProvider>
                        </Box>
                        <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left", }} >
                            <CssVarsProvider>
                                <Typography level="body1"> {salary}</Typography>
                            </CssVarsProvider>
                        </Box>
                        <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left", fontWeight: 500 }}  >
                            <CssVarsProvider>
                                <Typography level="body1">Date of Last Appraisal</Typography>
                            </CssVarsProvider>
                        </Box>
                        <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left", }} >
                            <CssVarsProvider>
                                <Typography level="body1">{appraisal_date}</Typography>
                            </CssVarsProvider>
                        </Box>
                    </Box>
                }

            </Paper>
        </Fragment>
    )
}

export default memo(ExistingEmpDetl)