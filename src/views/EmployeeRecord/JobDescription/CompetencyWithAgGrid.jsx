import { CssVarsProvider, Textarea } from '@mui/joy'
import Typography from '@mui/joy/Typography';
import { Box, Paper } from '@mui/material'
import React, { Fragment, useCallback, useEffect, useMemo, useState } from 'react'
import IconButton from '@mui/joy/IconButton';
import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined';
import KraSelect from './Jobdesccomponent/KraSelect';
import { infoNofity, succesNofity, errorNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';
import { axioslogin } from 'src/views/Axios/Axios';
import { ToastContainer } from 'react-toastify';
import { memo } from 'react';
import CommonAgGrid from 'src/views/Component/CommonAgGrid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import LibraryAddCheckOutlinedIcon from '@mui/icons-material/LibraryAddCheckOutlined';
import { IconButton as OpenIcon } from '@mui/material';

const CompetencyWithAgGrid = ({ selectDesignation, selectedDept, jobedit, selectDeptSection }) => {
    const [Kra, setKra] = useState(0)
    //const [KraName, setKraName] = useState(0)
    const [slno, setSlno] = useState(0)

    //table
    const [tableData, settableData] = useState([])
    const [deletecount, setdeletecount] = useState(0)
    const [submitflag, setsubmitflag] = useState(0)
    const [value, setvalue] = useState(0)

    const [formData, setFormData] = useState({
        competency_desc: ''
    })

    const { competency_desc } = formData

    const defaultState = useMemo(() => {
        return {
            competency_desc: ''
        }
    }, [])

    //getting form data
    const updatKeyPerformance = async (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
        setFormData({ ...formData, [e.target.name]: value })
    }

    //colomun for table
    const [columnDef] = useState([
        { headerName: 'Slno', field: 'slno', width: 50, },
        { headerName: 'Key Result Area ', field: 'kra_desc', },
        { headerName: 'Competency Description', field: 'competency_desc', autoHeight: true, wrapText: true, minWidth: 200, },
        {
            headerName: 'Edit', width: 20, cellRenderer: params => <OpenIcon sx={{ mb: 1 }} size='sm' color='primary' onClick={() => EditData(params)}>
                <EditIcon />
            </OpenIcon>
        },
        {
            headerName: 'Delete', width: 20, cellRenderer: params => <OpenIcon sx={{ mb: 1 }} size='sm' color='primary' onClick={() => DeleteItem(params)}>
                <DeleteIcon />
            </OpenIcon>
        },
    ])

    const checkData = useMemo(() => {
        return {
            designation: selectDesignation,
            dept_id: selectedDept,
            sect_id: selectDeptSection
        }
    }, [selectDesignation, selectedDept, selectDeptSection])

    useEffect(() => {
        if (selectDesignation !== 0) {
            settableData([])
            setFormData(defaultState)
        }
    }, [selectDesignation, defaultState])

    useEffect(() => {
        if (jobedit > 0 || submitflag === 1) {
            const getCompetency = async () => {
                const result = await axioslogin.post('/jobsummary/get/jobcompetency', checkData)
                const { success, data } = result.data
                if (success === 1) {
                    settableData(data)
                    setdeletecount(0)
                }
            }
            getCompetency()
        }
        else {
            settableData([])
        }
        return () => {
            settableData([])
        }
    }, [jobedit, checkData, deletecount, submitflag])

    //for deletion process
    const DeleteItem = useCallback((params) => {
        const data = params.api.getSelectedRows()
        const value = data && data.map((val) => {
            return val.competency_slno
        })
        const deltevalue = async (value) => {
            const result = await axioslogin.delete(`/jobsummary/deletecompet/${value}`)
            const { success, message } = result.data
            if (success === 5) {
                succesNofity(message)
                setdeletecount(deletecount + 1)
            }
            else {
                warningNofity(message)
            }
        }
        deltevalue(value)
    }, [deletecount])

    const TableValues = useMemo(() => tableData, [tableData])

    //edit data select
    const EditData = useCallback((params) => {
        setvalue(1)
        const data = params.api.getSelectedRows()
        const { competency_desc, key_result_area, competency_slno } = data[0]
        const frmData = {
            competency_desc: competency_desc,
        }
        setFormData(frmData)
        setKra(key_result_area)
        setSlno(competency_slno)
        // setKraName(kra_desc)
    }, [])

    const AddCompetencyToTable = useCallback((e) => {
        e.preventDefault();
        const submitFunc = async (checkData) => {
            const result = await axioslogin.post('/jobsummary/check', checkData)
            const { data, success } = result.data
            if (success === 1) {
                const { summary_slno } = data[0]
                const saveCompetency = {
                    job_id: summary_slno,
                    key_result_area: Kra,
                    competency_desc: competency_desc,
                    dept_id: selectedDept,
                    designation: selectDesignation,
                    sect_id: selectDeptSection
                }
                const result = await axioslogin.post('/jobsummary/jobcompetency', saveCompetency)
                const { success, message } = result.data
                if (success === 1) {
                    setdeletecount(deletecount + 1)
                    setFormData(defaultState)
                    setKra(0)
                    setsubmitflag(1)
                    setvalue(0)
                    succesNofity(message)
                }
                else {
                    warningNofity(message)
                }
            }
            else if (success === 0) {
                infoNofity("Please Save Job Summary Before Saving Job Specification")
            }
            else {
                errorNofity("Error Occured!!!Please Contact EDP")
            }
        }

        //update data to database
        const updateEach = async () => {
            const patchCompetency = {
                key_result_area: Kra,
                competency_desc: competency_desc,
                competency_slno: slno
            }
            const result = await axioslogin.patch('/jobsummary/updatecompeteEach', patchCompetency)
            const { success, message } = result.data
            if (success === 4) {
                succesNofity(message)
                setdeletecount(deletecount + 1)
                setFormData(defaultState)
                setKra(0)
                setSlno(0)
                setvalue(0)
            }
            else {
                warningNofity(message)
            }
        }
        if (value === 0 && Kra !== 0 && competency_desc !== '') {
            submitFunc(checkData)
        }
        else if (value === 0 && Kra === 0 && competency_desc === '') {
            infoNofity("Please Add Competency!!")
        }
        else if (value === 0 && Kra !== 0 && competency_desc === '') {
            infoNofity("Please Add Competency!!")
        }
        else if (value === 1) {
            updateEach()
        }

    }, [checkData, Kra, deletecount, competency_desc, slno, value, selectedDept, selectDeptSection, selectDesignation, defaultState])

    return (

        <Fragment>
            <ToastContainer />
            <Box sx={{ flex: 1 }} >
                <CssVarsProvider>
                    <Typography startDecorator={<DragIndicatorOutlinedIcon />} textColor="neutral.400" sx={{ display: 'flex', }} >
                        Job Specification : competency
                    </Typography>
                </CssVarsProvider>
            </Box>
            <Paper square elevation={3} sx={{ p: 1, display: "flex", flexDirection: "column", width: "100%" }} >
                <Box sx={{ display: "flex", alignItems: "center", }} >
                    <Box sx={{ flex: 3, }} >
                        <KraSelect value={Kra} setValue={setKra} />
                    </Box>
                    <Box sx={{ flex: 4, pl: 1, width: "60%", }} >
                        <Textarea
                            label="Outlined"
                            placeholder="Competency"
                            variant="outlined"
                            size="lg"
                            minRows={1}
                            maxRows={2}
                            name='competency_desc'
                            value={competency_desc}
                            onChange={(e) => updatKeyPerformance(e)}
                            sx={{ flex: 1 }}
                        />
                    </Box>
                    <Box sx={{ flex: 0, px: 0.5 }} >
                        <IconButton variant="outlined" size='sm' onClick={AddCompetencyToTable} sx={{ color: 'green' }}>
                            <LibraryAddCheckOutlinedIcon />
                        </IconButton>
                    </Box>
                </Box >
            </Paper >
            <Paper square elevation={0} sx={{ pt: 1, mt: 0.5, display: 'flex', flexDirection: "column" }} >
                <CommonAgGrid columnDefs={columnDef}
                    tableData={TableValues}
                    sx={{
                        height: 300,
                        width: "100%"
                    }} rowHeight={30} headerHeight={30} />
            </Paper>
        </Fragment >
    )
}

export default memo(CompetencyWithAgGrid)