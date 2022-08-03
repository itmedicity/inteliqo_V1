import { CssVarsProvider } from '@mui/joy'
import Typography from '@mui/joy/Typography';
import { Box, Paper, TextareaAutosize } from '@mui/material'
import React, { Fragment, useEffect, useState } from 'react'
import IconButton from '@mui/joy/IconButton';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined';
import SelectBasic from 'src/views/Component/SelectBasic';
import LibraryAddCheckOutlinedIcon from '@mui/icons-material/LibraryAddCheckOutlined';
import KraItem from './KraItem';
import KraSelect from './Jobdesccomponent/KraSelect';
import { infoNofity, succesNofity, errorNofity } from 'src/views/CommonCode/Commonfunc';
import { SELECT_CMP_STYLE } from 'src/views/Constant/Constant';
import { axioslogin } from 'src/views/Axios/Axios';
import { ToastContainer } from 'react-toastify';

const Performance = ({ selectDesignation, selectedDept }) => {
    const [Kra, setKra] = useState(0)
    const [KraName, setKraName] = useState(0)
    const [Kraview, setKraview] = useState(0)
    const [editKra, setEditKra] = useState(0)
    const [deleteKra, setDeleteKra] = useState(0)
    const AddKra = () => {
        if (Kra === 0) {
            infoNofity("Select Key Result Area")
        }
        else {
            setKraview(1)
        }

    }
    const [formData, setFormData] = useState({
        kpi: '',
        kpiscore: '',
        competency: ''
    })
    const { kpi, kpiscore, competency } = formData
    const defaultState = {
        kpi: '',
        kpiscore: '',
        competency: ''
    }
    //getting form data
    const updatKeyPerformance = async (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
        setFormData({ ...formData, [e.target.name]: value })
    }
    const [perfomance, setPerformance] = useState([])
    const AddKraDataToTable = () => {
        const keyperformance = {
            id: Math.ceil(Math.random() * 1000),
            kras: Kra,
            kraname: KraName,
            kpiindicator: kpi,
            kpiscore: kpiscore,
            kpicompetency: competency
        }
        setPerformance([...perfomance, keyperformance])
        setFormData(defaultState)
    }
    //function for editing kra details
    useEffect(() => {
        if (editKra > 0) {
            const editdata = perfomance.filter((val) => {
                if (val.id === editKra) {
                    return val
                }

            })
            const { kras, kpiindicator, kpiscore, kpicompetency } = editdata[0]
            const frmData = {
                kpi: kpiindicator,
                kpiscore: kpiscore,
                competency: kpicompetency,
                kras: Kra,
            }
            setFormData(frmData)
            setKra(kras)

            const newKra = perfomance.filter((val) => {
                if (val.id !== editKra) {
                    return val
                }

            })
            setPerformance(newKra)
        }
    }, [editKra])
    //function for deleting kra details
    useEffect(() => {
        if (deleteKra > 0) {
            const deletee = perfomance.filter((val) => {
                if (val.id !== deleteKra) {
                    return val
                }
            })
            setPerformance(deletee)
        }
    }, [deleteKra])
    const checkData = {
        designation: selectDesignation,
        dept_id: selectedDept
    }
    //function for saving job Specification
    const saveJobSpecification = async (e) => {
        e.preventDefault();
        const result = await axioslogin.post('/jobsummary/check', checkData)
        const { data, success } = result.data
        if (success === 1) {
            const { summary_slno } = data[0]
            if (perfomance.length === 0) {
                infoNofity("Please Add Duties & Responsibilities")
            }
            else {
                const saveDuties = perfomance && perfomance.map((val) => {
                    return {
                        job_id: summary_slno,
                        kra: val.kras,
                        kpi: val.kpiindicator,
                        kpi_score: val.kpiscore,
                        competency: val.kpicompetency,
                        dept_id: selectedDept,
                        designation: selectDesignation


                    }
                })
                const result = await axioslogin.post('/jobsummary/jobspecification', saveDuties)
                const { success, message } = result.data
                if (success === 1) {
                    succesNofity(message)
                }
                else {
                    errorNofity("Error Occured!!!Please Contact EDP")
                }

            }
        }
        else if (success === 0) {
            infoNofity("Please Save Job Summary Before Saving Job Specification")
        }
        else {
            errorNofity("Error Occured!!!Please Contact EDP")
        }
    }
    return (
        <Fragment>
            <ToastContainer />
            {/* Job Specification : Performance & Competency */}
            <Box sx={{ p: 1, display: "flex" }} >
                <CssVarsProvider>
                    <Typography
                        startDecorator={<DragIndicatorOutlinedIcon color='success' />}
                        level="body2"
                        sx={{ flex: 2 }}
                    >
                        Job Specification : Performance & Competency
                    </Typography>
                </CssVarsProvider>
                <Box sx={{ flex: 0 }} >
                    <IconButton variant="outlined" size='sm' onClick={saveJobSpecification}>
                        <LibraryAddCheckOutlinedIcon />
                    </IconButton>
                </Box>
            </Box>

            {/* Prformance & Competency descriptive table */}


            <Paper square elevation={3} sx={{ p: 1, display: "flex", flexDirection: "column" }} >
                <Box sx={{ display: "flex", alignItems: "center" }} >
                    <Box sx={{ flex: 1 }} >
                        <KraSelect label="Key Result Areas (KRA)" value={Kra} setValue={setKra} style={SELECT_CMP_STYLE} setKraName={setKraName} />
                    </Box>
                    <Box sx={{ flex: 1, px: 2 }} >
                        <IconButton variant="outlined" size='sm' onClick={AddKra} >
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
                            <TextareaAutosize
                                style={{ width: "100%", display: "flex", borderRadius: 4, borderColor: "#c4c4c4", paddingLeft: 13 }}
                                minRows={1}
                                placeholder="KPI Score"
                                name="kpiscore"
                                value={kpiscore}
                                onChange={(e) => updatKeyPerformance(e)}
                            />
                        </Box>
                        <Box sx={{ flex: 2 }} >
                            <TextareaAutosize
                                style={{ width: "100%", display: "flex", borderRadius: 4, borderColor: "#c4c4c4", paddingLeft: 13 }}
                                minRows={1}
                                placeholder="Competency"
                                name="competency"
                                value={competency}
                                onChange={(e) => updatKeyPerformance(e)}
                            />
                        </Box>
                        <Box sx={{ flex: 0, px: 1 }} >
                            <IconButton variant="outlined" size='sm' onClick={AddKraDataToTable} >
                                <AddToPhotosIcon />
                            </IconButton>
                        </Box>
                    </Box>
                }

                {
                    perfomance.length > 0 ? perfomance && perfomance.map((val, index) =>
                        <KraItem key={index} val={val} setEditKra={setEditKra} setDeleteKra={setDeleteKra} />
                    ) : null
                }

            </Paper>

        </Fragment>
    )
}

export default Performance