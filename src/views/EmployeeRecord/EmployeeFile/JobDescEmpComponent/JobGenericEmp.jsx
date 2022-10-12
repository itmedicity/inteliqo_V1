import { Checkbox, CssVarsProvider } from '@mui/joy'
import Typography from '@mui/joy/Typography';
import { Box, Paper, TextareaAutosize } from '@mui/material'
import React, { Fragment } from 'react'
import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined';
import TextInput from 'src/views/Component/TextInput';
import FemaleOutlinedIcon from '@mui/icons-material/FemaleOutlined';
import MaleOutlinedIcon from '@mui/icons-material/MaleOutlined';
import { useState } from 'react';
import { useEffect } from 'react';
import { axioslogin } from 'src/views/Axios/Axios';
import QualificationItem from './QualificationItem';
import { memo } from 'react';
import ArrowRightOutlinedIcon from '@mui/icons-material/ArrowRightOutlined';

const JobGenericEmp = ({ selectDesignation, selectedDept }) => {
    const [formData, setFormData] = useState({
        experience: '',
        experience_year: '',
        age_from: '',
        age_to: '',
        is_female: false,
        is_male: false,
        special_comment: ''
    })
    const { experience, experience_year, age_from, age_to, is_female, is_male, special_comment } = formData

    const [jobQualification, setjobQualification] = useState([])
    useEffect(() => {
        if (selectDesignation !== 0 && selectedDept !== 0) {
            const postData = {
                dept_id: selectedDept,
                designation: selectDesignation
            }
            const getjobQualification = async () => {
                const result = await axioslogin.post('/jobsummary/getjobQual', postData)
                const { success, data } = result.data
                if (success === 1) {
                    setjobQualification(data)
                }
                else {
                    setjobQualification([])
                }

            }
            getjobQualification()
        }

    }, [selectDesignation, selectedDept])
    //useEffect for getting job generic
    useEffect(() => {
        if (selectDesignation !== 0 && selectedDept !== 0) {
            const postData = {
                dept_id: selectedDept,
                designation: selectDesignation
            }
            const getjobQualification = async () => {
                const result = await axioslogin.post('/jobsummary/getjobgeneric', postData)
                const { success, data } = result.data
                if (success === 1) {
                    const { experience, experience_year, age_from, age_to, is_female, is_male, special_comment } = data[0]
                    const frmData = {
                        experience: experience,
                        experience_year: experience_year,
                        age_from: age_from,
                        age_to: age_to,
                        is_female: is_female === 0 ? false : true,
                        is_male: is_male === 0 ? false : true,
                        special_comment: special_comment
                    }
                    setFormData(frmData)
                }
            }
            getjobQualification()
        }

    }, [selectDesignation, selectedDept])



    return (
        <Fragment>
            {/* Generic */}
            <Box sx={{ p: 1, display: "flex" }} >
                <CssVarsProvider>
                    <Typography sx={{ fontStyle: "oblique", fontWeight: 500, color: '#94B7FC' }} startDecorator={<ArrowRightOutlinedIcon />} >
                        Job Specification : Generic
                    </Typography>
                </CssVarsProvider>
            </Box>
            <Paper square elevation={3} sx={{ p: 1, display: "flex", flexDirection: "column" }} >

                <Box sx={{ display: 'flex', width: '100%', alignItems: 'center', p: 0.5 }} >
                    <Box sx={{ display: 'flex', width: '20%' }}>
                        <CssVarsProvider>
                            <Typography textColor="text.secondary">
                                Experience
                            </Typography>
                        </CssVarsProvider>
                    </Box>
                    <Box sx={{ display: 'flex', width: '100%' }}>
                        <Box sx={{ display: 'flex', justifyContent: "flex-start" }}>
                            <Box sx={{ display: "flex", flexDirection: "column" }}>
                                <CssVarsProvider>
                                    <Typography endDecorator={<ArrowRightOutlinedIcon />} ></Typography>
                                </CssVarsProvider>
                            </Box>

                        </Box>
                        <Box sx={{ display: 'flex', width: '80%', textTransform: 'capitalize', }}>
                            {experience}
                        </Box>
                    </Box>
                </Box>

                <Box sx={{ display: 'flex', width: '100%', alignItems: 'center', p: 0.5 }} >
                    <Box sx={{ display: 'flex', width: '20%' }}>
                        <CssVarsProvider>
                            <Typography textColor="text.secondary">
                                Qualification
                            </Typography>
                        </CssVarsProvider>
                    </Box>
                    <Box sx={{ display: 'flex', width: '100%' }}>
                        {/* <Box sx={{ display: 'flex', justifyContent: "flex-start" }}>
                            <Box sx={{ display: "flex", flexDirection: "column" }}>
                                <CssVarsProvider>
                                    <Typography endDecorator={<ArrowRightOutlinedIcon />} ></Typography>
                                </CssVarsProvider>
                            </Box>

                        </Box> */}
                        <Box sx={{ display: 'flex', width: '80%', textTransform: 'capitalize', flexDirection: "column" }}>
                            {
                                jobQualification && jobQualification.map((val, index) => <QualificationItem key={index} val={val} />)
                            }
                        </Box>
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', width: '100%', alignItems: 'center', p: 0.5 }} >
                    <Box sx={{ display: 'flex', width: '50%', }}>
                        {special_comment}
                    </Box>
                    <Box sx={{ display: 'flex', width: '50%', }}>
                        <Box sx={{ display: "flex", flex: 1 }}>
                            <CssVarsProvider>
                                <Typography level="body1" >Age Between From</Typography>
                            </CssVarsProvider>
                        </Box>

                        <Box sx={{ display: "flex", flex: 2, px: 1, alignItems: "center" }} >
                            <Box sx={{ px: 1 }} >
                                <Box sx={{ display: "flex", flex: 0 }}>
                                    <CssVarsProvider>
                                        <Typography level="body1" >{age_from} To  {age_to}</Typography>
                                    </CssVarsProvider>
                                </Box>
                            </Box>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center", flex: 0 }} >
                            <Box sx={{ display: "flex", }} >
                                <CssVarsProvider>
                                    <Typography level="body1" >Male</Typography>
                                </CssVarsProvider>
                            </Box>
                            <Box sx={{ display: "flex", pl: 0.5 }}>
                                <CssVarsProvider>
                                    {
                                        is_male === true ? <Checkbox
                                            color="success"
                                            size="lg"
                                            variant="outlined"
                                            uncheckedIcon={<MaleOutlinedIcon />}
                                            name="is_male"
                                            value={is_male}
                                            checked={is_male}
                                        /> : <Checkbox
                                            color="success"
                                            size="lg"
                                            variant="outlined"
                                            uncheckedIcon={<MaleOutlinedIcon />}
                                            name="is_male"
                                            value={is_male}
                                            checked={is_male}
                                        />
                                    }
                                </CssVarsProvider>
                            </Box>
                            <Box sx={{ display: "flex", pl: 0.5 }} >
                                <CssVarsProvider>
                                    <Typography level="body1" >Female</Typography>
                                </CssVarsProvider>
                            </Box>
                            <Box sx={{ display: "flex", pl: 0.5 }}>
                                <CssVarsProvider>
                                    {
                                        is_female === true ? <Checkbox
                                            color="success"
                                            size="lg"
                                            variant="outlined"
                                            uncheckedIcon={<FemaleOutlinedIcon />}
                                            name="female"
                                            value={is_female}
                                            checked={is_female}
                                        /> : <Checkbox
                                            color="success"
                                            size="lg"
                                            variant="outlined"
                                            uncheckedIcon={<FemaleOutlinedIcon />}
                                            name="female"
                                            value={is_female}
                                            checked={is_female}
                                        />

                                    }
                                </CssVarsProvider>
                            </Box>
                        </Box>
                    </Box>
                </Box>


                {/* <Box sx={{ display: "flex", width: "100%" }} >
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
                            name="experience"
                            value={experience}
                            disabled={true}
                        />
                    </Box>
                    <Box sx={{ flex: 1, }} >
                        <TextInput
                            style={{ width: "100%", paddingLeft: 13, }}
                            Placeholder="Min Exp In Year"
                            name="experience_year"
                            value={experience_year}
                            disabled={true}
                        />
                    </Box>
                </Box> */}

                {/* <Box sx={{ display: "flex", width: "100%" }} > */}
                {/* <Paper square sx={{
                        display: "flex",
                        flex: 1,
                        px: 0.5,
                        justifyContent: "center",
                        alignItems: "center"
                    }} variant="outlined" >
                        <CssVarsProvider>
                            <Typography level="body1"> Qualification</Typography>
                        </CssVarsProvider>
                    </Paper> */}
                {/* Experience Entry Section */}
                {/* <Box sx={{ display: 'flex', flex: 2, flexDirection: "column" }} > */}
                {/* Exp - Header Add + */}
                {/* <Paper square sx={{
                            display: "flex",
                            flex: 3,
                            p: 0.3,
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "column"
                        }} variant="outlined" >
                            {
                                jobQualification && jobQualification.map((val, index) => <QualificationItem key={index} val={val} />)
                            }
                        </Paper> */}
                {/* </Box> */}
                {/* </Box> */}
                {/* <Box sx={{ display: "flex", flex: 1, mt: 0.5 }} >
                    <Box sx={{ display: "flex", flex: 2 }} >
                        <TextareaAutosize
                            style={{ width: "100%", display: "flex", borderRadius: 4, borderColor: "#c4c4c4", paddingLeft: 13 }}
                            minRows={2}
                            placeholder="Special Comments"
                            name="special_comment"
                            value={special_comment}
                            disabled={true}
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
                                    name="age_from"
                                    value={age_from}
                                    disabled={true}
                                />
                            </Box>
                            <Box sx={{ px: 1 }}  >
                                <TextInput
                                    style={{ width: "100%", paddingLeft: 3, }}
                                    Placeholder="To"
                                    type="number"
                                    name="age_to"
                                    value={age_to}
                                    disabled={true}
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
                                        value={is_female}
                                        checked={is_female}
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
                                        name="is_male"
                                        value={is_male}
                                        checked={is_male}
                                    />
                                </CssVarsProvider>
                            </Box>
                        </Box>
                    </Paper>
                </Box> */}
            </Paper>
        </Fragment>
    )
}

export default memo(JobGenericEmp) 