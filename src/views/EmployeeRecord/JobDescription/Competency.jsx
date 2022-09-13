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



const Competency = ({ selectDesignation, selectedDept, jobedit }) => {
    const [Kra, setKra] = useState(0)
    const [KraName, setKraName] = useState(0)
    const [Kraview, setKraview] = useState(0)
    const [EditComp, setEditComp] = useState(0)
    const [deletecomp, setDeleteComp] = useState(0)
    const [Compete, setCompete] = useState([])

    const AddKra = () => {
        if (Kra === 0) {
            infoNofity("Select Key Result Area")
        }
        else {
            setKraview(1)
        }

    }

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
    // const [perfomance, setPerformance] = useState([])
    const AddCompetencyToTable = () => {
        const keyCompetency = {
            id: Math.ceil(Math.random() * 1000),
            key_result_area: Kra,
            kra_desc: KraName,
            competency_desc: competency_desc

        }

        setCompete([...Compete, keyCompetency])
        setFormData(defaultState)
    }

    //function for editing kra details
    useEffect(() => {
        if (EditComp > 0) {
            const editdata = Compete.filter((val) => {
                if (val.id === EditComp) {
                    return val
                }
            })
            const { competency_desc, key_result_area } = editdata[0]
            const frmData = {
                competency_desc: competency_desc,
            }
            setFormData(frmData)
            setKra(key_result_area)
            const newKra = Compete.filter((val) => {
                if (val.id !== EditComp) {
                    return val
                }
            })
            setCompete(newKra)
        }
    }, [EditComp])
    //function for deleting kra details
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

    useEffect(() => {
        if (jobedit > 0) {
            const getCompetency = async () => {
                const result = await axioslogin.post('/jobsummary/get/jobcompetency', checkData)
                const { success, data } = result.data
                if (success === 1) {
                    setCompete(data)

                }
            }
            getCompetency()
        }
    }, [jobedit])



    const checkData = {
        designation: selectDesignation,
        dept_id: selectedDept
    }

    // function for saving job competency
    const saveJobSpecification = async (e) => {
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
                        key_result_area: val.key_result_area,
                        competency_desc: val.competency_desc,
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
                <Box sx={{ flex: 0 }} >
                    <IconButton variant="outlined" size='sm' onClick={saveJobSpecification}>
                        <LibraryAddCheckOutlinedIcon />
                    </IconButton>
                </Box>
            </Box>

            {/* Peformance & Competency descriptive table */}

            <Paper square elevation={3} sx={{ p: 1, display: "flex", flexDirection: "column", width: "100%" }} >
                <Box sx={{ display: "flex", alignItems: "center", }} >
                    <Box sx={{ flex: 3, width: "40%" }} >
                        <KraSelect label="Key Result Areas (KRA)" value={Kra} setValue={setKra} style={SELECT_CMP_STYLE} setKraName={setKraName} />
                    </Box>
                    {/* <Box sx={{ display: "flex", alignItems: "center", py: 0.1, flexDirection: "row" }} > */}
                    <Box sx={{ flex: 4, p: 1, width: "60%", }}
                    // style={{ p: 0, height: 20, lineHeight: 2, m: 0 }}
                    >
                        <TextareaAutosize
                            style={{ width: 800, pt: 1, height: 33, display: "flex", borderRadius: 4, borderColor: "#c4c4c4", paddingLeft: 13, pt: 4 }}
                            minRows={1}
                            placeholder="Competency"
                            name="competency_desc"
                            value={competency_desc}
                            onChange={(e) => updatKeyPerformance(e)}
                        />
                    </Box>
                    <Box sx={{ flex: 1, px: 2 }} >
                        <IconButton variant="outlined" size='sm' onClick={AddCompetencyToTable} onChange={AddKra}  >
                            <AddToPhotosIcon />
                        </IconButton>
                    </Box>

                </Box>
                {/* </Box> */}

                {
                    Compete.length > 0 ? Compete && Compete.map((val, index) =>
                        <CompetencyItem key={index} val={val} setDeleteComp={setDeleteComp} setEditComp={setEditComp} />
                    ) : null
                }

            </Paper>

        </Fragment >




    )
}

export default Competency