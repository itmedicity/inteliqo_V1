import { Checkbox, CssVarsProvider } from '@mui/joy'
import Typography from '@mui/joy/Typography';
import { Box, Paper, TextareaAutosize } from '@mui/material'
import React, { Fragment, useCallback, useContext } from 'react'
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
import { errorNofity, infoNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';
import { useEffect } from 'react';
import { axioslogin } from 'src/views/Axios/Axios';
import { memo } from 'react';


const Generic = ({ jobedit, selectDesignation, selectedDept, selectDeptSection }) => {

    const { selectCourse, updateCourse, selectSpec, updateSpec, courseName, setCourseName,
        specName, setSpecName } = useContext(PayrolMasterContext)
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
                updateCourse(0)
                updateSpec(0)
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
            const newexp = experiencee.filter((val) => {
                if (val.qualification_id !== sumbitdelt) {
                    return val
                }
            })
            setExperience(newexp)
            const rem = experiencee.filter((val) => {
                if (val.qualification_id === sumbitdelt) {
                    return val
                }
            })

            setremaining([...remaining, ...rem])
        }
    }, [sumbitdelt])

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
        expYear: 0,
        specialcomment: '',
        ageFrom: '',
        ageTo: '',
        female: false,
        male: false
    })

    const defaultState = {
        experincedetl: '',
        expYear: '',
        specialcomment: '',
        ageFrom: '',
        ageTo: '',
        female: false,
        male: false
    }
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
        dept_id: selectedDept,
        sect_id: selectDeptSection
    }
    const [editdata, setEditdata] = useState([])
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
                    setEditdata(data)
                    setslno(job_generic_slno)

                }
            }
            getJoGeneric()
        }
        else {
            setFormData(defaultState)
        }
    }, [jobedit])

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
    }, [jobedit])

    useEffect(() => {
        if (selectDesignation !== 0) {
            setExperience([])
            setFormData(defaultState)
        }
    }, [selectDesignation])

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
    }, [sumbitdelt, remaining, checkData])

    //deletion process
    // const [open, setOpen] = useState(false)
    // const [Active, setActive] = useState(0)
    // const handleClose = async () => {
    //     setOpen(false)
    //     setActive(0)
    // }
    // const Close = async () => {
    //     setOpen(false)
    //     setActive(0)
    // }
    // const DeleteValue = useCallback((e) => {
    //     e.preventDefault();
    //     const value = remaining && remaining.map((val) => {
    //         return val.qualification_slno
    //     })
    //     const deltevalue = async (value) => {
    //         const result = await axioslogin.delete(`/jobsummary/deleteQualification/${value}`)
    //         const { success, message } = result.data
    //         if (success === 5) {
    //             succesNofity(message)
    //             handleClose()
    //             const newexp = experiencee.filter((val) => {
    //                 if (val.qualification_id !== sumbitdelt) {
    //                     return val
    //                 }
    //             })
    //             setExperience(newexp)
    //         }
    //     }
    //     deltevalue(value)
    //     return 0
    // })

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
                    <IconButton variant="outlined" size='sm' onClick={SaveJobGeneric} sx={{ color: 'green' }}>
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
                                <IconButton variant="outlined" size='sm' onClick={addExperienceItem} sx={{ color: 'blue' }}>
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
                                    // DeleteValue={DeleteValue}
                                    // open={open} setOpen={setOpen}
                                    // handleClose={handleClose} Close={Close}
                                    // setActive={setActive} Active={Active}
                                    />
                                )}
                        </Paper>
                    </Box>
                </Box>
                <Box sx={{ display: "flex", flex: 1, mt: 0.5 }} >
                    <Box sx={{ display: "flex", flex: 1 }} >
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
                        alignItems: "center",
                    }}
                        variant="outlined"
                    >

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
                            <Box sx={{ display: "flex", flexDirection: "row-reverse", px: 1, alignItems: "center" }} >
                                <CssVarsProvider>
                                    <Typography level="body1" >Female</Typography>
                                </CssVarsProvider>
                            </Box>

                            <Box sx={{ display: "flex", px: 0.5, alignItems: "center" }} >
                                <CssVarsProvider>
                                    <Checkbox
                                        color="success"
                                        size="lg"
                                        variant="outlined"
                                        uncheckedIcon={<FemaleOutlinedIcon />}
                                        name="female"
                                        // value={female}
                                        checked={female}
                                        onChange={(e) => updateGeneric(e)}
                                    />
                                </CssVarsProvider>
                            </Box>
                            <Box sx={{ display: "flex", flexDirection: "row-reverse", px: 1, alignItems: "center" }} >
                                <CssVarsProvider>
                                    <Typography level="body1" >Male</Typography>
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
                                        //value={male}
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

export default memo(Generic) 