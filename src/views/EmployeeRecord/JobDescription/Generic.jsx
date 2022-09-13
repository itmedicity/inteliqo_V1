import { Checkbox, CssVarsProvider } from '@mui/joy'
import Typography from '@mui/joy/Typography';
import { Box, Paper, TextareaAutosize } from '@mui/material'
import React, { Fragment, useContext } from 'react'
import IconButton from '@mui/joy/IconButton';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined';
import TextInput from 'src/views/Component/TextInput';
import LibraryAddCheckOutlinedIcon from '@mui/icons-material/LibraryAddCheckOutlined';
import ExperienceItem from './ExperienceItem';
import FemaleOutlinedIcon from '@mui/icons-material/FemaleOutlined';
import MaleOutlinedIcon from '@mui/icons-material/MaleOutlined';
import CourseSelectionMast from 'src/views/CommonCode/CourseSelectionMast';
import { SELECT_CMP_STYLE } from 'src/views/Constant/Constant';
import SpecializationSelection from 'src/views/CommonCode/SpecializationSelection';
import { PayrolMasterContext } from 'src/Context/MasterContext';
import { useState } from 'react';
import { errorNofity, infoNofity, succesNofity } from 'src/views/CommonCode/Commonfunc';
import { useEffect } from 'react';
import { axioslogin } from 'src/views/Axios/Axios';


const Generic = ({ jobedit, selectDesignation, selectedDept }) => {

    const { selectCourse, updateCourse, selectSpec, updateSpec, courseName, setCourseName,
        specName, setSpecName } = useContext(PayrolMasterContext)
    const [experiencee, setExperience] = useState([])
    const [deleteitem, setDeleteItem] = useState(0)
    const [editKra, setEditKra] = useState(0)
    const [qual, setqual] = useState(0)
    const [course, setcourse] = useState(0)

    //adding experience to tbale

    const addExperienceItem = () => {
        if (selectCourse > 0 && selectSpec > 0) {

            const frmData = {
                id: Math.ceil(Math.random() * 1000),
                course: courseName,
                specialization: specName,
                courseslno: selectCourse,
                specializationslno: selectSpec
            }
            setExperience([...experiencee, frmData])
            updateCourse(0)
            updateSpec(0)
            setCourseName('')
            setSpecName('')
        }
        else {
            infoNofity('Select Course And Specialization ')
        }
    }
    //deleteing qualiification
    useEffect(() => {
        if (deleteitem > 0) {
            const newexp = experiencee.filter((val) => {
                if (val.id !== deleteitem) {
                    return val
                }
            })
            setExperience(newexp)
        }

    }, [deleteitem])
    //save
    const [formData, setFormData] = useState({
        experincedetl: '',
        expYear: '',
        specialcomment: '',
        ageFrom: '',
        ageTo: '',
        female: false,
        male: false
    })
    const { experincedetl, expYear, specialcomment, ageFrom, ageTo, female, male } = formData
    useEffect(() => {
        if (editKra > 0) {
            const editdata = experiencee.filter((val) => {
                if (val.id === editKra) {
                    return val
                }

            })

            const newKra = experiencee.filter((val) => {
                if (val.id !== editKra) {
                    return val
                }

            })
            setExperience(newKra)
        }
    }, [editKra])


    const updateGeneric = async (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
        setFormData({ ...formData, [e.target.name]: value })
    }
    const checkData = {
        designation: selectDesignation,
        dept_id: selectedDept
    }
    const [editdata, setEditdata] = useState([])
    //use effect for getting job generic to edit
    useEffect(() => {
        if (jobedit > 0) {
            const getJoGeneric = async () => {
                const result = await axioslogin.post('/jobsummary/getjobgeneric', checkData)
                const { success, data } = result.data
                if (success === 1) {
                    const { experience, experience_year, special_comment, age_from, age_to, is_female, is_male } = data[0]

                    const frmdata = {
                        experincedetl: experience,
                        expYear: experience_year,
                        specialcomment: special_comment,
                        ageFrom: age_from,
                        ageTo: age_to,
                        female: is_female,
                        male: is_male

                    }
                    setFormData(frmdata)
                    setEditdata(data)

                }
            }
            getJoGeneric()
        }
    }, [jobedit])
    useEffect(() => {
        if (jobedit > 0) {
            const getJobqualification = async () => {
                const result = await axioslogin.post('/jobsummary/getjobQual', checkData)
                const { success, data } = result.data
                if (success === 1) {
                    setExperience(data)
                }
            }
            getJobqualification()
        }
    }, [jobedit])


    const SaveJobGeneric = async (e) => {
        e.preventDefault();
        const result = await axioslogin.post('/jobsummary/check', checkData)
        const { data, success } = result.data
        if (success === 1) {
            const { summary_slno } = data[0]
            if (experiencee.length === 0) {
                infoNofity("Please Add Qaulification")
            }
            else {
                const saveQualification = experiencee && experiencee.map((val) => {
                    return {
                        job_id: summary_slno,
                        course: val.courseslno,
                        specialization: val.specializationslno,
                        dept_id: selectedDept,
                        designation: selectDesignation
                    }
                })
                const result = await axioslogin.post('/jobsummary/jobqualification', saveQualification)
                const { success } = result.data
                if (success === 1) {
                    const postData = {
                        job_id: summary_slno,
                        experience: experincedetl,
                        experience_year: expYear,
                        age_from: ageFrom,
                        age_to: ageTo,
                        is_female: female === 1 ? true : false,
                        is_male: male === 1 ? true : false,
                        special_comment: specialcomment,
                        dept_id: selectedDept,
                        designation: selectDesignation

                    }
                    const result = await axioslogin.post('/jobsummary/jobGeneric', postData)
                    const { success, message } = result.data
                    if (success === 1) {
                        succesNofity(message)
                    }
                    else {
                        errorNofity("Error Occured!!!Please Contact EDP")
                    }
                }
                else {
                    errorNofity("Error Occured!!!Please Contact EDP")
                }

            }
        }
        else if (success === 0) {
            infoNofity("Please Save Job Specification Before Saving Job Generic")
        }
        else {
            errorNofity("Error Occured!!!Please Contact EDP")
        }
    }
    return (
        <Fragment>
            {/* Generic */}
            <Box sx={{ p: 1, display: "flex" }} >
                <CssVarsProvider>
                    <Typography
                        startDecorator={<DragIndicatorOutlinedIcon color='success' />}
                        level="body2"
                        sx={{ flex: 2 }}
                    >
                        Job Specification : Generic
                    </Typography>
                </CssVarsProvider>
                <Box sx={{ flex: 0 }} >
                    <IconButton variant="outlined" size='sm' onClick={SaveJobGeneric}>
                        <LibraryAddCheckOutlinedIcon />
                    </IconButton>
                </Box>
            </Box>
            <Paper square elevation={3} sx={{ p: 1, display: "flex", flexDirection: "column" }} >
                <Box sx={{ display: "flex", width: "100%" }} >
                    <Paper square sx={{
                        display: "flex",
                        flex: 2,
                        px: 0.5,
                        justifyContent: "center",
                    }} variant="outlined" >
                        <CssVarsProvider>
                            <Typography level="body1"> Experience </Typography>
                        </CssVarsProvider>
                    </Paper>
                    <Box sx={{ flex: 3, }} >
                        <TextInput
                            style={{ width: "100%", paddingLeft: 13, }}
                            Placeholder="Experience In Handling Recruitment Activities"
                            name="experincedetl"
                            value={experincedetl}
                            changeTextValue={(e) => updateGeneric(e)}
                        />
                    </Box>
                    <Box sx={{ flex: 1, }} >
                        <TextInput
                            style={{ width: "100%", paddingLeft: 13, }}
                            Placeholder="Min Exp In Year"
                            name="expYear"
                            value={expYear}
                            changeTextValue={(e) => updateGeneric(e)}
                        />
                    </Box>
                </Box>

                <Box sx={{ display: "flex", width: "100%" }} >
                    <Paper square sx={{
                        display: "flex",
                        flex: 1,
                        px: 0.5,
                        justifyContent: "center",
                        alignItems: "center"
                    }} variant="outlined" >
                        <CssVarsProvider>
                            <Typography level="body1"> Qualification</Typography>
                        </CssVarsProvider>
                    </Paper>
                    {/* Experience Entry Section */}
                    <Box sx={{ display: 'flex', flex: 2, flexDirection: "column" }} >
                        {/* Exp - Header Add + */}
                        <Paper square sx={{
                            display: "flex",
                            flex: 3,
                            px: 0.5,
                            justifyContent: "center",
                            alignItems: "center"
                        }} variant="outlined" >
                            <Box sx={{ flex: 3, }} >
                                <Box sx={{ flex: 2 }} >
                                    <CourseSelectionMast style={SELECT_CMP_STYLE} />
                                </Box>
                            </Box>
                            <Box sx={{ flex: 3, }} >
                                <Box sx={{ flex: 2, paddingTop: 0.5 }} >
                                    <SpecializationSelection label="Specialization" style={SELECT_CMP_STYLE} />
                                </Box>
                            </Box>
                            <Box sx={{ flex: 0 }} >
                                <IconButton variant="outlined" size='sm' onClick={addExperienceItem}>
                                    <AddToPhotosIcon />
                                </IconButton>
                            </Box>
                        </Paper>
                        {/* Exp - Header Add + */}
                        <Paper square sx={{
                            display: "flex",
                            flex: 3,
                            p: 0.3,
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "column"
                        }} variant="outlined" >
                            {
                                experiencee && experiencee.map((val, index) => <ExperienceItem key={index} val={val} setDeleteItem={setDeleteItem} />)
                            }
                        </Paper>
                    </Box>
                </Box>
                <Box sx={{ display: "flex", flex: 1, mt: 0.5 }} >
                    <Box sx={{ display: "flex", flex: 2 }} >
                        <TextareaAutosize
                            style={{ width: "100%", display: "flex", borderRadius: 4, borderColor: "#c4c4c4", paddingLeft: 13 }}
                            minRows={2}
                            placeholder="Special Comments"
                            name="specialcomment"
                            value={specialcomment}
                            onChange={(e) => updateGeneric(e)}
                        />
                    </Box>
                    <Paper square sx={{
                        display: "flex",
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center"
                    }} variant="outlined" >

                        <Box sx={{ display: "flex", flexDirection: "row-reverse", flex: 1, px: 1, alignItems: "center" }} >
                            <CssVarsProvider>
                                <Typography level="body1" >Age</Typography>
                            </CssVarsProvider>
                        </Box>

                        <Box sx={{ display: "flex", flex: 2, px: 1, alignItems: "center" }} >
                            <Box sx={{ px: 1 }} >
                                <TextInput
                                    style={{ width: "100%", paddingLeft: 3, }}
                                    Placeholder="From"
                                    type="number"
                                    name="ageFrom"
                                    value={ageFrom}
                                    changeTextValue={(e) => updateGeneric(e)}
                                />
                            </Box>
                            <Box sx={{ px: 1 }}  >
                                <TextInput
                                    style={{ width: "100%", paddingLeft: 3, }}
                                    Placeholder="To"
                                    type="number"
                                    name="ageTo"
                                    value={ageTo}
                                    changeTextValue={(e) => updateGeneric(e)}
                                />
                            </Box>
                        </Box>

                        <Box sx={{ display: "flex", flex: 2, px: 1, alignItems: "center" }} >
                            <Box sx={{ display: "flex", px: 0.5, alignItems: "center" }} >
                                <CssVarsProvider>
                                    <Checkbox
                                        color="success"
                                        size="lg"
                                        variant="outlined"
                                        uncheckedIcon={<FemaleOutlinedIcon />}
                                        name="female"
                                        value={female}
                                        checked={female}
                                        onChange={(e) => updateGeneric(e)}
                                    />
                                </CssVarsProvider>
                            </Box>
                            <Box sx={{ display: "flex", px: 0.5, alignItems: "center" }} >
                                <CssVarsProvider>
                                    <Checkbox
                                        color="success"
                                        size="lg"
                                        variant="outlined"
                                        uncheckedIcon={<MaleOutlinedIcon />}
                                        name="male"
                                        value={male}
                                        checked={male}
                                        onChange={(e) => updateGeneric(e)}
                                    />
                                </CssVarsProvider>
                            </Box>
                        </Box>
                    </Paper>
                </Box>
            </Paper>
        </Fragment>
    )
}

export default Generic