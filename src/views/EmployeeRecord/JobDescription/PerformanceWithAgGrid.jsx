import { CssVarsProvider, Textarea } from '@mui/joy'
import Typography from '@mui/joy/Typography';
import { Box, Paper } from '@mui/material'
import React, { Fragment, useCallback, useEffect, useMemo, useState } from 'react'
import IconButton from '@mui/joy/IconButton';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined';
import KraSelect from './Jobdesccomponent/KraSelect';
import { infoNofity, succesNofity, errorNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';
import { axioslogin } from 'src/views/Axios/Axios';
import { ToastContainer } from 'react-toastify';
import { memo } from 'react';
import CommonAgGrid from 'src/views/Component/CommonAgGrid'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import LibraryAddCheckOutlinedIcon from '@mui/icons-material/LibraryAddCheckOutlined';
import InputComponent from 'src/views/MuiComponents/JoyComponent/InputComponent';
import { IconButton as OpenIcon } from '@mui/material';

const PerformanceWithAgGrid = ({ jobedit, selectDesignation, selectedDept, selectDeptSection }) => {

    const [Kra, setKra] = useState(0)
    const [Kraview, setKraview] = useState(0)
    const [slno, setSlno] = useState(0)
    const [tableData, settableData] = useState([])
    const [deletecount, setdeletecount] = useState(0)
    const [submitflag, setsubmitflag] = useState(0)
    const [value, setvalue] = useState(0)

    const [formData, setFormData] = useState({
        kpi: '',
        kpiscore: '',
    })
    const { kpi, kpiscore } = formData
    const defaultState = useMemo(() => {
        return {
            kpi: '',
            kpiscore: '',
        }
    }, [])

    const AddKra = () => {
        if (Kra === 0) {
            infoNofity("Select Key Result Area")
        } else {
            setKraview(1)
        }
    }

    //getting form data
    const updatKeyPerformance = useCallback(async (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
        setFormData({ ...formData, [e.target.name]: value })
    }, [formData])

    //colomun for table
    const [columnDef] = useState([
        { headerName: ' Slno', field: 'slno', width: 50, },
        { headerName: 'Key Result Area ', field: 'kra_desc', },
        { headerName: 'Key Performance Indicator', field: 'kpi', autoHeight: true, wrapText: true, minWidth: 200, },
        { headerName: 'KPI Score', field: 'kpi_score', width: 50, },
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
            setFormData(defaultState)
            setKraview(0)
            settableData([])
        }
    }, [selectDesignation, defaultState])

    //use effect for getting job performance for edit
    useEffect(() => {
        if (jobedit > 0 || submitflag === 1) {
            const getPerformace = async () => {
                const result = await axioslogin.post('/jobsummary/getjobspecific', checkData)
                const { success, message, data } = result.data

                if (success === 1) {
                    settableData(data)
                    setdeletecount(0)
                } else {
                    infoNofity(message)
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
    }, [jobedit, deletecount, checkData, submitflag])

    const TableValues = useMemo(() => tableData, [tableData])

    //edit data select
    const EditData = useCallback((params) => {
        setvalue(1)
        const data = params.api.getSelectedRows()
        const { key_result_area, kpi, kpi_score, specification_slno } = data[0]
        const frmData = {
            kpi: kpi,
            kpiscore: kpi_score,
            kras: key_result_area,
        }
        setFormData(frmData)
        setKra(key_result_area)
        //setKraName(kra_desc)
        setKraview(1)
        setSlno(specification_slno)
    }, [])

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
    }, [deletecount])

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
                    designation: selectDesignation,
                    sect_id: selectDeptSection
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

    }, [checkData, defaultState, Kra, deletecount, kpi, kpiscore, selectDeptSection, selectDesignation,
        selectedDept, slno, value])

    return (
        <Fragment>
            <ToastContainer />
            {/* Job Specification : Performance  */}
            <Box sx={{ flex: 1 }} >
                <CssVarsProvider>
                    <Typography startDecorator={<DragIndicatorOutlinedIcon />} textColor="neutral.400" sx={{ display: 'flex', }} >
                        Job Specification : Performance
                    </Typography>
                </CssVarsProvider>
            </Box>
            <Paper square variant='outlined' sx={{ p: 1, display: "flex", flexDirection: "column" }} >
                <Box sx={{ display: "flex", alignItems: "center" }} >
                    <Box sx={{ flex: 1 }} >
                        <KraSelect label="Key Result Areas (KRA)" value={Kra} setValue={setKra} />
                    </Box>
                    <Box sx={{ flex: 0, px: 0.5 }} >
                        <IconButton variant="outlined" size='sm' onClick={AddKra} sx={{ color: 'green' }}>
                            < AddToPhotosIcon />
                        </IconButton>
                    </Box>
                    <Box sx={{ flex: 1 }} ></Box>
                    <Box sx={{ flex: 1 }} ></Box>
                </Box>
                {
                    Kraview === 0 ? null : <Box sx={{ display: "flex", alignItems: "center", py: 0.5 }} >
                        <Box sx={{ flex: 3 }} >
                            <Textarea
                                label="Outlined"
                                placeholder="Key Performance Indicators (KPI's) "
                                variant="outlined"
                                size="lg"
                                minRows={1}
                                maxRows={1}
                                name='kpi'
                                value={kpi}
                                onChange={(e) => updatKeyPerformance(e)}
                                sx={{ flex: 1 }}
                            />
                        </Box>
                        <Box sx={{ flex: 1, px: 0.5 }} >
                            <InputComponent
                                type="number"
                                size="sm"
                                name="kpiscore"
                                value={kpiscore}
                                onchange={(e) => updatKeyPerformance(e)}
                            />
                        </Box>
                        <Box sx={{ flex: 0, px: 1 }} >
                            <IconButton variant="outlined" size='sm'
                                onClick={saveJobSpecification}
                                sx={{ color: 'green' }} >
                                <LibraryAddCheckOutlinedIcon />
                            </IconButton>
                        </Box>
                    </Box>
                }
            </Paper>
            <Paper square elevation={0} sx={{ pt: 1, mt: 0.5, display: 'flex', flexDirection: "column" }} >
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