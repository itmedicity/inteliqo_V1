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
import CompetencyItem from './CompetencyItem';

const Competency = ({ selectDesignation, selectedDept }) => {

    const [Kra, setKra] = useState(0)
    const [KraName, setKraName] = useState(0)
    const [Kraview, setKraview] = useState(0)
    const [EditComp, setEditComp] = useState(0)
    const [deletecomp, setDeleteComp] = useState(0)
    const [Compete, setCompete] = useState([])

    const [formData, setFormData] = useState({
        Kra: '',
        competency: ''
    })

    const { competency } = formData
    const defaultState = {
        competency: ''
    }

    //get values from the page
    const updatKeyPerformance = async (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
        setFormData({ ...formData, [e.target.name]: value })
    }

    /** setting keyCompetency for display the enterd list */
    const AddCompetencyToTable = () => {
        const keyCompetency = {
            id: Math.ceil(Math.random() * 1000),
            kras: Kra,
            kraname: KraName,
            kpicompetency: competency
        }
        setCompete([...Compete, keyCompetency])
        setFormData(defaultState)
    }

    /** to delete the entered competency list */
    useEffect(() => {
        if (deletecomp > 0) {
            const deletee = Compete.filter((val) => {
                if (val.id !== deletecomp) {
                    return val
                }
            })
            setCompete(deletee)
        }
    }, [deletecomp])

    //function for editing competency details
    useEffect(() => {
        if (EditComp > 0) {
            const editdata = Compete.filter((val) => {
                if (val.id === EditComp) {
                    return val
                }

            })
            const { kras, kpicompetency } = editdata[0]
            const frmData = {
                competency: kpicompetency,
                kras: Kra,
            }
            setFormData(frmData)
            setKra(kras)

            const newKra = Compete.filter((val) => {
                if (val.id !== EditComp) {
                    return val
                }

            })
            setCompete(newKra)
        }
    }, [EditComp])

    const checkData = {
        dept_id: selectedDept,
        designation: selectDesignation

    }

    //function for saving job Competency
    const saveJobCompetency = async (e) => {
        e.preventDefault();
        const result = await axioslogin.post('/jobsummary/check', checkData)
        const { data, success } = result.data
        if (success === 1) {
            const { summary_slno } = data[0]
            if (Compete.length === 0) {
                infoNofity("Please Add Duties & Responsibilities")
            }
            else {
                const saveDuties = Compete && Compete.map((val) => {
                    return {
                        job_id: summary_slno,
                        key_result_area: val.kras,
                        competency_desc: val.kpicompetency,
                        dept_id: selectedDept,
                        designation: selectDesignation


                    }
                })
                const result = await axioslogin.post('/jobsummary/jobcompetency', saveDuties)
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
                        Job Specification : Competency
                    </Typography>
                </CssVarsProvider>
                <Box sx={{ flex: 0 }} >
                    <IconButton variant="outlined" size='sm'
                        onClick={saveJobCompetency}
                    >
                        <LibraryAddCheckOutlinedIcon />
                    </IconButton>
                </Box>
            </Box>

            {/* Prformance & Competency descriptive table */}

            <Paper square elevation={3} sx={{ p: 1, display: "flex", flexDirection: "column", p: 1 }} >
                <Box sx={{ display: "flex", alignItems: "center", flex: 2 }} >
                    <Box sx={{ flex: 20, width: 1500 }} >
                        <KraSelect label="Key Result Areas (KRA)" value={Kra} setValue={setKra} style={SELECT_CMP_STYLE} setKraName={setKraName} />
                    </Box>
                    <Box sx={{ flex: 0, pb: 0.5, pl: 1 }} >
                        <TextareaAutosize
                            style={{ width: 1150, display: "flex", borderRadius: 4, borderColor: "#c4c4c4" }}
                            minRows={1}
                            placeholder="Competency "
                            name="competency"
                            value={competency}
                            onChange={(e) => updatKeyPerformance(e)}

                        />
                    </Box>
                    <Box sx={{ flex: 0, px: 0.5, pl: 1 }} >
                        <IconButton variant="outlined" size='sm'
                            onClick={AddCompetencyToTable}
                        >
                            <AddToPhotosIcon />
                        </IconButton>
                    </Box>
                </Box>
                {
                    Compete.length > 0 ? Compete && Compete.map((val, index) =>
                        <CompetencyItem key={index} val={val} setDeleteComp={setDeleteComp} setEditComp={setEditComp} />
                    )
                        : null
                }

            </Paper>

        </Fragment >
    )
}

export default Competency