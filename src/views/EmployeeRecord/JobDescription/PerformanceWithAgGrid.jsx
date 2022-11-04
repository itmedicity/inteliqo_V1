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
import TextInput from 'src/views/Component/TextInput';
import CommonAgGrid from 'src/views/Component/CommonAgGrid'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const PerformanceWithAgGrid = ({ jobedit, selectDesignation, selectedDept, selectDeptSection }) => {
    const [Kra, setKra] = useState(0)
    const [KraName, setKraName] = useState(0)
    const [Kraview, setKraview] = useState(0)
    const [slno, setSlno] = useState(0)
    const [flag, setflag] = useState(0)

    //table
    const [tableData, settableData] = useState([])
    const [deletecount, setdeletecount] = useState(0)
    const [submitflag, setsubmitflag] = useState(0)
    const [value, setvalue] = useState(0)

    const [formData, setFormData] = useState({
        kpi: '',
        kpiscore: '',
    })
    const { kpi, kpiscore } = formData
    const defaultState = {
        kpi: '',
        kpiscore: '',
    }

    const AddKra = () => {
        if (Kra === 0) {
            infoNofity("Select Key Result Area")
        }
        else {
            setKraview(1)
        }
    }
    //getting form data
    const updatKeyPerformance = async (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
        setFormData({ ...formData, [e.target.name]: value })
    }

    //colomun for table
    const [columnDef] = useState([
        { headerName: ' Slno', field: 'slno', width: 50, },
        { headerName: 'Key Result Area ', field: 'kra_desc', },
        { headerName: 'Key Performance Indicator', field: 'kpi', autoHeight: true, wrapText: true, minWidth: 200, },
        { headerName: 'KPI Score', field: 'kpi_score', width: 50, },
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
            setFormData(defaultState)
            setKraview(0)
            settableData([])
        }
    }, [selectDesignation])

    //use effect for getting job performance for edit
    useEffect(() => {
        if (jobedit > 0 || submitflag === 1) {
            const getPerformace = async () => {
                const result = await axioslogin.post('/jobsummary/getjobspecific', checkData)
                const { success, data } = result.data

                if (success === 1) {
                    settableData(data)
                    setdeletecount(0)
                }
            }
            getPerformace()
        }
        else {
            settableData([])
        }
        return () => {
            settableData([])
        }
    }, [jobedit, deletecount, submitflag])

    const TableValues = useMemo(() => tableData, [tableData])

    //edit data select
    const EditData = useCallback((params) => {
        setvalue(1)
        const data = params.api.getSelectedRows()
        const { key_result_area, kpi, kpi_score, specification_slno, kra_desc } = data[0]
        const frmData = {
            kpi: kpi,
            kpiscore: kpi_score,
            kras: key_result_area,
        }
        setFormData(frmData)
        setKra(key_result_area)
        setKraName(kra_desc)
        setKraview(1)
        setSlno(specification_slno)
    })

    //for deletion process
    const DeleteItem = useCallback((params) => {
        const data = params.api.getSelectedRows()
        const value = data && data.map((val) => {
            return val.specification_slno
        })
        const deltevalue = async (value) => {
            const result = await axioslogin.delete(`/jobsummary/deletePerf/${value}`)
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

    const saveJobSpecification = useCallback((e) => {
        e.preventDefault();
        //submit new data to database
        const submitFunc = async (checkData) => {
            const result = await axioslogin.post('/jobsummary/check', checkData)
            const { data, success } = result.data
            if (success === 1) {
                const { summary_slno } = data[0]
                const savePerformance = {
                    job_id: summary_slno,
                    key_result_area: Kra,
                    kpi: kpi,
                    kpi_score: kpiscore,
                    dept_id: selectedDept,
                    designation: selectDesignation
                }
                const result = await axioslogin.post('/jobsummary/jobspecification', savePerformance)
                const { success, message } = result.data
                if (success === 1) {
                    setdeletecount(deletecount + 1)
                    setFormData(defaultState)
                    setKraview(0)
                    setKra(0)
                    setsubmitflag(1)
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
            const patchPerformance = {
                key_result_area: Kra,
                kpi: kpi,
                kpi_score: kpiscore,
                specification_slno: slno
            }
            const result = await axioslogin.patch('/jobsummary/updateperf', patchPerformance)
            const { success, message } = result.data
            if (success === 4) {
                setdeletecount(deletecount + 1)
                setFormData(defaultState)
                setKraview(0)
                setKra(0)
                succesNofity(message)
                setvalue(0)
                setSlno(0)
            }
            else {
                warningNofity(message)
            }
        }
        if (value === 0 && Kra !== '' && kpi !== '' && kpiscore !== '') {
            if (kpiscore < 100) {
                submitFunc(checkData)
            }
            else {
                warningNofity("Score Must be below 100")
            }
        }
        else if (value === 0 && Kra === '' && kpi === '' && kpiscore === '') {
            infoNofity("Please Add Details")
        }
        else if (value === 0 && Kra !== '' && kpi === '' && kpiscore === '') {
            infoNofity("Please Add Details")
        }
        else if (value === 0 && Kra !== '' && kpi !== '' && kpiscore === '') {
            infoNofity("Please Add Details")
        }
        else if (value === 1) {
            updateEach()
        }

    }, [checkData])

    return (
        <Fragment>
            <ToastContainer />
            {/* Job Specification : Performance  */}
            <Box sx={{ p: 1, display: "flex" }} >
                <CssVarsProvider>
                    <Typography
                        startDecorator={<DragIndicatorOutlinedIcon color='success' />}
                        level="body2"
                        sx={{ flex: 2, }}
                    >
                        Job Specification : Performance
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

            <Paper square elevation={3} sx={{ p: 1, display: "flex", flexDirection: "column" }} >
                <Box sx={{ display: "flex", alignItems: "center" }} >
                    <Box sx={{ flex: 1 }} >
                        <KraSelect label="Key Result Areas (KRA)" value={Kra} setValue={setKra} style={SELECT_CMP_STYLE} setKraName={setKraName} />
                    </Box>
                    <Box sx={{ flex: 1, px: 2 }} >
                        <IconButton variant="outlined" size='sm'
                            onClick={AddKra}
                            sx={{ color: 'blue' }}>
                            <AddToPhotosIcon />
                        </IconButton>
                    </Box>
                </Box>
                {
                    Kraview === 0 ? null : <Box sx={{ display: "flex", alignItems: "center", py: 0.1 }} >
                        <Box sx={{ flex: 3 }} >
                            <TextareaAutosize
                                style={{ width: "100%", display: "flex", borderRadius: 4, borderColor: "#c4c4c4", paddingLeft: 13 }}
                                minRows={1}
                                placeholder="Key Performance Indicators (KPI's) "
                                name="kpi"
                                value={kpi}
                                onChange={(e) => updatKeyPerformance(e)}
                            />
                        </Box>
                        <Box sx={{ flex: 1, px: 0.5 }} >
                            <TextInput
                                style={{ width: "100%", paddingLeft: 13 }}
                                placeholder="KPI Score"
                                type="number"
                                name="kpiscore"
                                value={kpiscore}
                                changeTextValue={(e) => updatKeyPerformance(e)}
                            />
                        </Box>
                        <Box sx={{ flex: 0, px: 1 }} >
                            <IconButton variant="outlined" size='sm'
                                onClick={saveJobSpecification}
                                sx={{ color: 'blue' }} >
                                <AddToPhotosIcon />
                            </IconButton>
                        </Box>
                    </Box>
                }
            </Paper>
            <Paper square elevation={0} sx={{
                pt: 1,
                mt: 0.5,
                display: 'flex',
                flexDirection: "column"
            }} >
                <CommonAgGrid
                    columnDefs={columnDef}
                    tableData={TableValues}
                    sx={{
                        height: 300,
                        width: "100%"
                    }} rowHeight={30} headerHeight={30} />
            </Paper>

        </Fragment>
    )
}

export default memo(PerformanceWithAgGrid)