import { CssVarsProvider, Textarea } from '@mui/joy'
import Typography from '@mui/joy/Typography';
import { Box, Paper } from '@mui/material'
import React, { Fragment, useCallback, useMemo } from 'react'
import IconButton from '@mui/joy/IconButton';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined';
import LibraryAddCheckOutlinedIcon from '@mui/icons-material/LibraryAddCheckOutlined';
import ExperienceItem from './ExperienceItem';
import FemaleOutlinedIcon from '@mui/icons-material/FemaleOutlined';
import MaleOutlinedIcon from '@mui/icons-material/MaleOutlined';
import { useState } from 'react';
import { errorNofity, infoNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';
import { useEffect } from 'react';
import { axioslogin } from 'src/views/Axios/Axios';
import { memo } from 'react';
import InputComponent from 'src/views/MuiComponents/JoyComponent/InputComponent';
import JoyCheckbox from 'src/views/MuiComponents/JoyComponent/JoyCheckbox';
import JoyCourseSelect from 'src/views/MuiComponents/JoyComponent/JoyCourseSelect';
import JoySpecializationSelect from 'src/views/MuiComponents/JoyComponent/JoySpecializationSelect';


const Generic = ({ jobedit, selectDesignation, selectedDept, selectDeptSection }) => {

    const [selectCourse, setSelectCourse] = useState(0)
    const [selectSpec, setSelectSpec] = useState(0)
    const [courseName, setCourseName] = useState('')
    const [specName, setSpecName] = useState('')
    const [experiencee, setExperience] = useState([])
    const [deleteitem, setDeleteItem] = useState(0)
    const [editKra, setEditKra] = useState(0)
    const [sumbitdelt, setsubmitdelt] = useState(0)
    const [remaining, setremaining] = useState([])
    const [filterdata, setfilterdata] = useState([])
    const [flag, setflag] = useState(0)
    const [arrays, setArrays] = useState([])
    const [slno, setslno] = useState(0)

    //adding experience to tbale
    const addExperienceItem = () => {
        if (selectCourse > 0 && selectSpec > 0) {
            if (experiencee.some(key => key.courseslno === selectCourse && key.specializationslno === selectSpec)) {
                warningNofity("Course & Specialization Already Added!!")
            }
            else {
                const frmData = {
                    id: new Date().getTime(),
                    course: courseName,
                    specialization: specName,
                    courseslno: selectCourse,
                    specializationslno: selectSpec
                }
                setExperience([...experiencee, frmData])
                setSelectCourse(0)
                setSelectSpec(0)
                setCourseName('')
                setSpecName('')
            }
        }
        else {
            infoNofity('Select Course And Specialization ')
        }
    }
    //deleting after save

    useEffect(() => {
        if (sumbitdelt > 0) {
            const newexp = experiencee?.filter((val) => {
                if (val.qualification_id !== sumbitdelt) {
                    return val
                } else {
                    return null
                }
            })
            setExperience(newexp)
            const rem = experiencee?.filter(val => val.qualification_id === sumbitdelt)
            setremaining([...remaining, ...rem])
        }
    }, [sumbitdelt, experiencee, remaining])

    //deleteing qualiification
    useEffect(() => {
        if (deleteitem > 0) {
            const newexp = experiencee?.filter((val) => {
                if (val.id !== deleteitem) {
                    return val
                } else {
                    return null
                }
            })
            setExperience(newexp)
        }
    }, [deleteitem, experiencee])


    //save
    const [formData, setFormData] = useState({
        experincedetl: '',
        expYear: 0,
        specialcomment: '',
        ageFrom: '',
        ageTo: '',
        female: false,
        male: false
    })

    const defaultState = useMemo(() => {
        return {
            experincedetl: '',
            expYear: '',
            specialcomment: '',
            ageFrom: '',
            ageTo: '',
            female: false,
            male: false
        }
    }, [])
    const { experincedetl, expYear, specialcomment, ageFrom, ageTo, female, male } = formData

    useEffect(() => {
        if (editKra > 0) {
            const newKra = experiencee?.filter((val) => {
                if (val.id !== editKra) {
                    return val
                } else {
                    return null
                }
            })
            setExperience(newKra)
        }
    }, [editKra, experiencee])

    const updateGeneric = async (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
        setFormData({ ...formData, [e.target.name]: value })
    }
    const checkData = useMemo(() => {
        return {
            designation: selectDesignation,
            dept_id: selectedDept,
            sect_id: selectDeptSection
        }
    }, [selectDesignation, selectedDept, selectDeptSection])

    // const [editdata, setEditdata] = useState([])
    //use effect for getting job generic to edit
    useEffect(() => {
        if (jobedit > 0) {
            const getJoGeneric = async () => {
                const result = await axioslogin.post('/jobsummary/getjobgeneric', checkData)
                const { success, data } = result.data
                if (success === 1) {
                    const { experience, experience_year, special_comment, age_from, age_to, is_female, is_male, job_generic_slno } = data[0]
                    const frmdata = {
                        experincedetl: experience,
                        expYear: experience_year,
                        specialcomment: special_comment,
                        ageFrom: age_from,
                        ageTo: age_to,
                        female: is_female === 1 ? true : false,
                        male: is_male === 1 ? true : false,

                    }
                    setFormData(frmdata)
                    //setEditdata(data)
                    setslno(job_generic_slno)
                    setEditKra(0)
                } else {
                    setFormData(defaultState)
                }
            }
            getJoGeneric()
        }
        else {
            setFormData(defaultState)
        }
    }, [jobedit, checkData, defaultState])

    useEffect(() => {
        if (jobedit > 0) {
            const getJobqualification = async () => {
                const result = await axioslogin.post('/jobsummary/getjobQual', checkData)
                const { success, data } = result.data
                if (success === 1) {
                    setExperience(data)
                    setfilterdata(data)
                    setflag(1)
                }
            }
            getJobqualification()
        }
        else {
            setExperience([])
        }
    }, [jobedit, checkData])

    useEffect(() => {
        if (selectDesignation !== 0) {
            setExperience([])
            setFormData(defaultState)
        }
    }, [selectDesignation, defaultState])

    const SaveJobGeneric = useCallback((e) => {
        e.preventDefault();
        const submitFunc = async (checkData) => {
            if (flag === 1) {
                let array = experiencee.filter((value) => {
                    return !filterdata.find((val) => {
                        return value.qualification_id === val.qualification_id;
                    })
                })
                const result = await axioslogin.post('/jobsummary/check', checkData)
                const { data, success } = result.data
                if (success === 1) {
                    const { summary_slno } = data[0]
                    if (experiencee.length === 0) {
                        infoNofity("Please Add Qaulification")
                    }
                    else {
                        if (array.length === 0) {
                            const postData = {
                                job_id: summary_slno,
                                experience: experincedetl,
                                experience_year: expYear === '' ? 0 : expYear,
                                age_from: ageFrom === '' ? 0 : ageFrom,
                                age_to: ageTo === '' ? 0 : ageTo,
                                is_female: female === true ? 1 : 0,
                                is_male: male === true ? 1 : 0,
                                special_comment: specialcomment,
                                job_generic_slno: slno
                            }
                            const result = await axioslogin.patch('/jobsummary/updategeneric', postData)
                            const { success, message } = result.data
                            if (success === 2) {
                                succesNofity(message)
                            }
                            else {
                                errorNofity("Error Occured!!!Please Contact EDP")
                            }
                        } else {
                            const saveQualification = array && array.map((val) => {
                                return {
                                    job_id: summary_slno,
                                    course: val.courseslno,
                                    specialization: val.specializationslno,
                                    dept_id: selectedDept,
                                    designation: selectDesignation,
                                    sect_id: selectDeptSection,
                                    qualification_id: val.id
                                }
                            })
                            const result = await axioslogin.post('/jobsummary/jobqualification', saveQualification)
                            const { success } = result.data
                            if (success === 1) {
                                const postData = {
                                    job_id: summary_slno,
                                    experience: experincedetl,
                                    experience_year: expYear === '' ? 0 : expYear,
                                    age_from: ageFrom === '' ? 0 : ageFrom,
                                    age_to: ageTo === '' ? 0 : ageTo,
                                    is_female: female === true ? 1 : 0,
                                    is_male: male === true ? 1 : 0,
                                    special_comment: specialcomment,
                                    job_generic_slno: slno
                                }
                                const result = await axioslogin.patch('/jobsummary/updategeneric', postData)
                                const { success, message } = result.data
                                if (success === 2) {
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
                }
                else if (success === 0) {
                    infoNofity("Please Save Job Specification Before Saving Job Generic")
                }
                else {
                    errorNofity("Error Occured!!!Please Contact EDP")
                }
            } else {
                let array = experiencee.filter((value) => {
                    return !arrays.find((val) => {
                        return value.qualification_id === val.qualification_id;
                    })
                })
                const result = await axioslogin.post('/jobsummary/check', checkData)
                const { data, success } = result.data
                if (success === 1) {
                    const { summary_slno } = data[0]
                    if (experiencee.length === 0) {
                        infoNofity("Please Add Qaulification")
                    }
                    else {
                        const saveQualification = array && array.map((val) => {
                            return {
                                job_id: summary_slno,
                                course: val.courseslno,
                                specialization: val.specializationslno,
                                dept_id: selectedDept,
                                designation: selectDesignation,
                                sect_id: selectDeptSection,
                                qualification_id: val.id
                            }
                        })
                        const result = await axioslogin.post('/jobsummary/jobqualification', saveQualification)
                        const { success } = result.data
                        if (success === 1) {
                            const postData = {
                                job_id: summary_slno,
                                experience: experincedetl,
                                experience_year: expYear === '' ? 0 : expYear,
                                age_from: ageFrom === '' ? 0 : ageFrom,
                                age_to: ageTo === '' ? 0 : ageTo,
                                is_female: female === true ? 1 : 0,
                                is_male: male === true ? 1 : 0,
                                special_comment: specialcomment,
                                dept_id: selectedDept,
                                designation: selectDesignation,
                                sect_id: selectDeptSection,
                            }
                            const result = await axioslogin.post('/jobsummary/jobGeneric', postData)
                            const { success, message } = result.data
                            if (success === 1) {
                                const result = await axioslogin.post('/jobsummary/getjobQual', checkData)
                                const { success, data } = result.data
                                if (success === 1) {
                                    setArrays(data)
                                    succesNofity(message)
                                }
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
        }
        submitFunc(checkData)
    }, [checkData, ageFrom, ageTo, arrays, expYear, experiencee, experincedetl, female,
        filterdata, flag, male, selectDeptSection, selectDesignation, selectedDept, slno,
        specialcomment])

    return (
        <Fragment>
            <Box sx={{ flex: 1, display: "flex" }} >
                <Box sx={{ flex: 1 }} >
                    <CssVarsProvider>
                        <Typography startDecorator={<DragIndicatorOutlinedIcon />} textColor="neutral.400" sx={{ display: 'flex', }} >
                            Job Specification : Generic
                        </Typography>
                    </CssVarsProvider>
                </Box>
                <Box sx={{ flex: 0 }} >
                    <IconButton variant="outlined" size='sm' onClick={SaveJobGeneric} sx={{ color: 'green' }}>
                        <LibraryAddCheckOutlinedIcon />
                    </IconButton>
                </Box>
            </Box>
            <Paper square variant='outlined' sx={{ p: 1, display: "flex", flexDirection: "column" }} >
                <Box sx={{ display: "flex", width: "100%" }} >
                    <Paper sx={{ display: "flex", flex: 2, px: 0.5, justifyContent: "center", }} variant="outlined" >
                        <CssVarsProvider>
                            <Typography level="body1"> Experience </Typography>
                        </CssVarsProvider>
                    </Paper>
                    <Box sx={{ flex: 3, }} >
                        <InputComponent
                            placeholder="Experience In Handling Recruitment Activities"
                            type="text"
                            size="sm"
                            name="experincedetl"
                            value={experincedetl}
                            onchange={(e) => updateGeneric(e)}
                        />
                    </Box>
                    <Box sx={{ flex: 1, }} >
                        <InputComponent
                            placeholder="Min Exp In Year"
                            type="text"
                            size="sm"
                            name="expYear"
                            value={expYear}
                            onchange={(e) => updateGeneric(e)}
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
                                    <JoyCourseSelect courseValue={selectCourse}
                                        setCourseValue={setSelectCourse} setCourseName={setCourseName} />
                                </Box>
                            </Box>
                            <Box sx={{ flex: 3, }} >
                                <Box sx={{ flex: 2, paddingTop: 0.5 }} >
                                    <JoySpecializationSelect value={selectSpec} setValue={setSelectSpec}
                                        course={selectCourse} setSpecName={setSpecName} />
                                </Box>
                            </Box>
                            <Box sx={{ flex: 0, mt: 0.2 }} >
                                <IconButton variant="outlined" size='sm' onClick={addExperienceItem} sx={{ color: 'green' }}>
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
                                experiencee && experiencee.map((val, index) =>
                                    <ExperienceItem key={index}
                                        val={val}
                                        setDeleteItem={setDeleteItem}
                                        jobedit={jobedit}
                                        setsubmitdelt={setsubmitdelt}
                                    />
                                )}
                        </Paper>
                    </Box>
                </Box>
                <Box sx={{ display: "flex", flex: 1, mt: 0.5 }} >
                    <Box sx={{ display: "flex", flex: 1 }} >
                        <Textarea
                            label="Outlined"
                            placeholder="Special Comments"
                            variant="outlined"
                            size="lg"
                            minRows={1}
                            maxRows={2}
                            name='specialcomment'
                            value={specialcomment}
                            onChange={(e) => updateGeneric(e)}
                            sx={{ flex: 1 }}
                        />
                    </Box>
                    <Paper sx={{ display: "flex", flex: 1, justifyContent: "center", alignItems: "center", }} variant="outlined" >
                        <Box sx={{ display: "flex", flexDirection: "row-reverse", flex: 1, px: 1, alignItems: "center" }} >
                            <CssVarsProvider>
                                <Typography level="body1" >Age</Typography>
                            </CssVarsProvider>
                        </Box>
                        <Box sx={{ display: "flex", flex: 2, px: 1, alignItems: "center" }} >
                            <Box sx={{ px: 1 }} >
                                <InputComponent
                                    placeholder="From"
                                    type="number"
                                    size="sm"
                                    name="ageFrom"
                                    value={ageFrom}
                                    onchange={(e) => updateGeneric(e)}
                                />
                            </Box>
                            <Box sx={{ px: 1 }}  >
                                <InputComponent
                                    placeholder="To"
                                    type="number"
                                    size="sm"
                                    name="ageTo"
                                    value={ageTo}
                                    onchange={(e) => updateGeneric(e)}
                                />
                            </Box>
                        </Box>
                        <Box sx={{ display: "flex", flex: 2, px: 1, alignItems: "center" }} >
                            <Box sx={{ display: "flex", flexDirection: "row-reverse", px: 1, alignItems: "center" }} >
                                <CssVarsProvider>
                                    <Typography level="body1" >Female</Typography>
                                </CssVarsProvider>
                            </Box>
                            <Box sx={{ display: "flex", px: 0.5, alignItems: "center" }} >
                                <JoyCheckbox
                                    uncheckedIcon={<FemaleOutlinedIcon />}
                                    color="success"
                                    name="female"
                                    checked={female}
                                    onchange={(e) => updateGeneric(e)}
                                />
                            </Box>
                            <Box sx={{ display: "flex", flexDirection: "row-reverse", px: 1, alignItems: "center" }} >
                                <CssVarsProvider>
                                    <Typography level="body1" >Male</Typography>
                                </CssVarsProvider>
                            </Box>
                            <Box sx={{ display: "flex", px: 0.5, alignItems: "center" }} >
                                <JoyCheckbox
                                    uncheckedIcon={<MaleOutlinedIcon />}
                                    color="success"
                                    name="male"
                                    checked={male}
                                    onchange={(e) => updateGeneric(e)}
                                />
                            </Box>
                        </Box>
                    </Paper>
                </Box>
            </Paper>
        </Fragment>
    )
}

export default memo(Generic) 