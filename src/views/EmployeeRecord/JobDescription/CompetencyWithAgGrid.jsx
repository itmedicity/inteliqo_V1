import { CssVarsProvider } from '@mui/joy'
import Typography from '@mui/joy/Typography';
import { Box, Paper, TextareaAutosize } from '@mui/material'
import React, { Fragment, useCallback, useEffect, useMemo, useState } from 'react'
import IconButton from '@mui/joy/IconButton';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined';
import KraSelect from './Jobdesccomponent/KraSelect';
import { infoNofity, succesNofity, errorNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';
import { SELECT_CMP_STYLE } from 'src/views/Constant/Constant';
import { axioslogin } from 'src/views/Axios/Axios';
import { ToastContainer } from 'react-toastify';
import { memo } from 'react';
import CommonAgGrid from 'src/views/Component/CommonAgGrid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const CompetencyWithAgGrid = ({ selectDesignation, selectedDept, jobedit, selectDeptSection }) => {
    const [Kra, setKra] = useState(0)
    const [KraName, setKraName] = useState(0)
    const [slno, setSlno] = useState(0)
    const [flag, setflag] = useState(0)

    //table
    const [tableData, settableData] = useState([])
    const [deletecount, setdeletecount] = useState(0)
    const [submitflag, setsubmitflag] = useState(0)
    const [value, setvalue] = useState(0)
    const [count, setCount] = useState(0)

    const [formData, setFormData] = useState({
        competency_desc: ''
    })

    const { competency_desc } = formData
    const defaultState = {
        competency_desc: ''
    }

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
        //{ headerName: 'Department', field: 'dept_name', width: 60, },
        //{ headerName: 'Designation', field: 'desg_name', width: 60, },
        { headerName: 'Edit', width: 20, cellRenderer: params => <EditIcon onClick={() => EditData(params)} /> },
        { headerName: 'Delete', width: 20, cellRenderer: params => <DeleteIcon onClick={() => DeleteItem(params)} /> },
    ])

    const checkData = {
        designation: selectDesignation,
        dept_id: selectedDept,
        sect_id: selectDeptSection
    }

    useEffect(() => {
        if (selectDesignation !== 0) {
            settableData([])
            setFormData(defaultState)
        }
    }, [selectDesignation])

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
    }, [jobedit, deletecount, flag, submitflag, count])

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
    })

    const TableValues = useMemo(() => tableData, [tableData])

    //edit data select
    const EditData = useCallback((params) => {
        setvalue(1)
        const data = params.api.getSelectedRows()
        const { competency_desc, key_result_area, competency_slno, kra_desc } = data[0]
        const frmData = {
            competency_desc: competency_desc,
        }
        setFormData(frmData)
        setKra(key_result_area)
        setSlno(competency_slno)
        setKraName(kra_desc)
    })

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

    }, [checkData, Kra, competency_desc])

    return (

        <Fragment>
            <ToastContainer />
            {/* Job Specification : Performance  */}
            <Box sx={{ p: 1, display: "flex" }} >
                <CssVarsProvider>
                    <Typography
                        startDecorator={<DragIndicatorOutlinedIcon color='success' />}
                        level="body2"
                        sx={{ flex: 2 }}
                    >
                        Job Specification : competency
                    </Typography>
                </CssVarsProvider>
                {/* <Box sx={{ flex: 0 }} >
                    <IconButton variant="outlined" size='sm'
                        //onClick={saveJobSpecification} 
                        sx={{ color: 'green' }}>
                        <LibraryAddCheckOutlinedIcon />
                    </IconButton>
                </Box> */}
            </Box>

            {/* Peformance & Competency descriptive table */}
            <Paper square elevation={3} sx={{ p: 1, display: "flex", flexDirection: "column", width: "100%" }} >
                <Box sx={{ display: "flex", alignItems: "center", }} >
                    <Box sx={{ flex: 3, width: "40%" }} >
                        <KraSelect label="Key Result Areas (KRA)" value={Kra} setValue={setKra} style={SELECT_CMP_STYLE} setKraName={setKraName} />
                    </Box>
                    {/* <Box sx={{ display: "flex", alignItems: "center", py: 0.1, flexDirection: "row" }} > */}
                    <Box sx={{ flex: 4, pl: 1, width: "60%", }}
                    // style={{ p: 0, height: 20, lineHeight: 2, m: 0 }}
                    >
                        <TextareaAutosize
                            style={{ width: 800, height: 33, display: "flex", borderRadius: 4, borderColor: "#c4c4c4", paddingLeft: 13, pt: 3 }}
                            minRows={1}
                            placeholder="Competency"
                            name="competency_desc"
                            value={competency_desc}
                            onChange={(e) => updatKeyPerformance(e)}
                        />
                    </Box>
                    <Box sx={{ flex: 1, px: 2 }} >
                        <IconButton variant="outlined" size='sm'
                            onClick={AddCompetencyToTable}
                            //</Box>onChange={AddKra}
                            sx={{ color: 'blue' }} >
                            <AddToPhotosIcon />
                        </IconButton>
                    </Box>

                </Box >
            </Paper >
            <Paper square elevation={0} sx={{
                pt: 1,
                mt: 0.5,
                display: 'flex',
                flexDirection: "column"
            }} >
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