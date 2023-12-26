import { CssVarsProvider, Textarea, IconButton, Typography } from '@mui/joy'
import { Box, Paper } from '@mui/material'
import React, { Fragment, memo, useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined';
import { useCallback } from 'react';
import CommonAgGrid from 'src/views/Component/CommonAgGrid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { errorNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';
import { axioslogin } from 'src/views/Axios/Axios';
import { useMemo } from 'react';
import LibraryAddCheckOutlinedIcon from '@mui/icons-material/LibraryAddCheckOutlined';
import { IconButton as OpenIcon } from '@mui/material';

const SkillsWithAgGrid = ({ jobedit, selectDesignation, selectedDept, selectDeptSection }) => {

    const JobSlno = useMemo(() => jobedit, [jobedit])

    const [skills, setSkills] = useState('')
    const [tableData, setTableData] = useState([])
    const [value, setvalue] = useState(0)
    const [count, setCount] = useState(0)
    const [slno, setSlno] = useState(0)

    // useEffect(() => {
    //     if (selectDesignation !== 0) {
    //         setTableData([])
    //     }
    // }, [selectDesignation])
    const checkData = useMemo(() => {
        return {
            designation: selectDesignation,
            dept_id: selectedDept,
            sect_id: selectDeptSection
        }
    }, [selectDesignation, selectedDept, selectDeptSection])

    useEffect(() => {
        if (JobSlno !== 0) {
            const getJobSkills = async (checkData) => {
                const result = await axioslogin.post('/jobsummary/skills/get', checkData)
                const { success, data } = result.data
                if (success === 1) {
                    setTableData(data)
                    setCount(0)
                }
                else {
                    setTableData([])
                }
            }
            getJobSkills(checkData)
        }
    }, [JobSlno, count, checkData])

    const [columnDef] = useState([
        { headerName: 'Slno', field: 'slno', width: 50, },
        { headerName: 'Skills ', field: 'skill_desc', autoHeight: true, wrapText: true, minWidth: 200, },
        {
            headerName: 'Edit', width: 20, cellRenderer: params =>
                <OpenIcon sx={{ mb: 1 }} size='sm' color='primary' onClick={() => EditData(params)}>
                    <EditIcon />
                </OpenIcon>
        },
        {
            headerName: 'Delete', width: 20, cellRenderer: params =>
                <OpenIcon sx={{ mb: 1 }} size='sm' color='primary' onClick={() => DeleteItem(params)}>
                    <DeleteIcon />
                </OpenIcon>
        },
    ])

    const SubmitFormData = useCallback(() => {
        const submitFunc = async (checkData) => {
            const result = await axioslogin.post('/jobsummary/check', checkData)
            const { data, success, message } = result.data
            if (success === 1) {
                const { summary_slno } = data[0]
                const saveSkills = {
                    job_id: summary_slno,
                    skill_desc: skills,
                    dept_id: selectedDept,
                    designation: selectDesignation,
                    sect_id: selectDeptSection
                }
                const result = await axioslogin.post('/jobsummary/skill/create', saveSkills)
                const { success, message } = result.data
                if (success === 1) {
                    setCount(count + 1)
                    setSkills('')
                    succesNofity(message)
                } else {
                    errorNofity(message)
                }
            } else if (success === 0) {
                warningNofity("Please Save Job Summary Before Saving Job Specification")
            }
            else {
                errorNofity(message)
            }
        }
        const updateEach = async () => {
            const job_skills = {
                skill_desc: skills,
                skills_slno: slno
            }
            const result = await axioslogin.patch('/jobsummary/skills/update', job_skills)
            const { success, message } = result.data
            if (success === 2) {
                succesNofity(message)
                setCount(count + 1)
                setSkills('')
            } else {
                errorNofity(message)
            }
        }

        if (value === 0 && skills !== '') {
            submitFunc(checkData)
        }
        else if (skills === '' && value === 0) {
            warningNofity("Please Add Skills!!")
        }
        else {
            updateEach()
        }
    }, [checkData, count, selectDeptSection, selectDesignation, selectedDept, slno, value, skills])

    const EditData = useCallback((params) => {
        setvalue(1)
        const data = params.api.getSelectedRows()
        const { skills_slno, skill_desc } = data[0]
        setSkills(skill_desc === null ? '' : skill_desc)
        setSlno(skills_slno)
    }, [])

    const DeleteItem = useCallback(async (params) => {
        const data = params.api.getSelectedRows()
        const { skills_slno } = data[0]
        const result = await axioslogin.delete(`/jobsummary/skills/delete/${skills_slno}`)
        const { success, message } = result.data
        if (success === 1) {
            setCount(count + 1)
            succesNofity(message)
        } else {
            errorNofity(message)
        }
    }, [count])

    return (
        <Fragment>
            <ToastContainer />
            <Box sx={{ flex: 1 }} >
                <CssVarsProvider>
                    <Typography startDecorator={<DragIndicatorOutlinedIcon />} textColor="neutral.400" sx={{ display: 'flex', }} >
                        Skills
                    </Typography>
                </CssVarsProvider>
            </Box>
            <Paper square variant='outlined' sx={{ p: 1, display: "flex", flexDirection: "column" }} >
                <Box sx={{ display: "flex", alignItems: "center", pb: 0.5 }} >
                    <Box sx={{ flex: 1, pr: 1 }}>
                        <Textarea
                            label="Outlined"
                            placeholder="Skills"
                            variant="outlined"
                            size="lg"
                            minRows={1}
                            maxRows={2}
                            name='skills'
                            value={skills}
                            onChange={(e) => setSkills(e.target.value)}
                            sx={{ flex: 1 }}
                        />
                    </Box>
                    <Box sx={{ flex: 0, px: 0.5 }} >
                        <IconButton variant="outlined" size='sm' onClick={SubmitFormData} sx={{ color: 'green' }}>
                            <LibraryAddCheckOutlinedIcon />
                        </IconButton>
                    </Box>
                </Box>
            </Paper>
            <Paper square elevation={0} sx={{
                pt: 1,
                mt: 0.5,
                display: 'flex',
                flexDirection: "column"
            }} >
                <CommonAgGrid
                    columnDefs={columnDef}
                    tableData={tableData}
                    sx={{
                        height: 300,
                        width: "100%"
                    }} rowHeight={30} headerHeight={30} />
            </Paper>
        </Fragment>
    )
}

export default memo(SkillsWithAgGrid) 