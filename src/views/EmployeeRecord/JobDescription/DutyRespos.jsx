import { CssVarsProvider } from '@mui/joy'
import Typography from '@mui/joy/Typography';
import { Box, Paper, TextareaAutosize } from '@mui/material'
import React, { Fragment, useState } from 'react'
import IconButton from '@mui/joy/IconButton';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined';
import LibraryAddCheckOutlinedIcon from '@mui/icons-material/LibraryAddCheckOutlined';
import Items from './Items';
import { useEffect } from 'react';
import { axioslogin } from 'src/views/Axios/Axios';
import { errorNofity, infoNofity, succesNofity } from 'src/views/CommonCode/Commonfunc';
import { ToastContainer } from 'react-toastify';
import { memo } from 'react';


const DutyRespos = ({ jobedit, selectDesignation, selectedDept, selectDeptSection }) => {
    const [duty, setDuty] = useState([])
    const [formData, setFormData] = useState({
        duties: ''
    })
    const defaultstate = {
        duties: ''
    }
    const { duties } = formData
    const updateDutiesandResponsibility = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
        setFormData({ ...formData, [e.target.name]: value })
    }

    const addDuties = () => {
        const newduties = {
            id: Math.ceil(Math.random() * 1000),
            duties_and_resp: duties
        }
        setDuty([...duty, newduties])
        setFormData(defaultstate)

    }
    const [edit, setEdit] = useState(0)
    const [deleteData, setDelete] = useState(0)
    useEffect(() => {
        if (edit > 0) {
            const editdata = duty.filter((val) => {
                if (val.id === edit) {
                    return val
                }
            })
            const { duties_and_resp } = editdata[0]
            const frmdata = {
                duties: duties_and_resp
            }
            setFormData(frmdata)
            const newdata = duty.filter((val) => {
                if (val.id !== edit) {
                    return val
                }
            })
            setDuty(newdata)
        }
    }, [edit])
    //function for deleting duty 
    useEffect(() => {
        if (deleteData > 0) {
            const deletee = duty.filter((val) => {
                if (val.id !== deleteData) {
                    return val
                }
            })
            setDuty(deletee)
        }
    }, [deleteData])
    const checkData = {
        designation: selectDesignation,
        dept_id: selectedDept,
        sect_id: selectDeptSection
    }
    //use effect for getting data for edit
    useEffect(() => {
        if (jobedit > 0) {
            const getdutiesandResp = async () => {
                const result = await axioslogin.post('jobsummary/getJobDuties', checkData)
                const { success, data } = result.data
                if (success === 1) {
                    setDuty(data)
                }
            }
            getdutiesandResp()
        }
        else {
            setDuty([])
        }
    }, [jobedit])


    //function for saving duties and responsiblities
    const SubmitFormData = async () => {
        const result = await axioslogin.post('/jobsummary/check', checkData)
        const { data, success } = result.data
        if (success === 1) {
            const { summary_slno } = data[0]
            if (duty.length === 0) {
                infoNofity("Please Add Duties & Responsibilities")
            }
            else {
                const saveDuties = duty && duty.map((val) => {
                    return { jobdescid: summary_slno, dutiesandres: val.duties_and_resp, dept_id: selectedDept, designation: selectDesignation }
                })
                const result = await axioslogin.post('/jobsummary/jobduties', saveDuties)
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
            infoNofity("Please Save Job Summary Before Saving Duties & Responsibilities")
        }
        else {
            errorNofity("Error Occured!!!Please Contact EDP")
        }
    }
    return (
        <Fragment>
            <ToastContainer />
            {/* Description */}
            <Box sx={{ p: 1, display: "flex" }} >
                <CssVarsProvider>
                    <Typography
                        startDecorator={<DragIndicatorOutlinedIcon color='success' />}
                        level="body2"
                        sx={{ flex: 2 }}
                    >
                        Duties & Responsibilities
                    </Typography>
                </CssVarsProvider>
                <Box sx={{ flex: 0 }} >
                    <IconButton variant="outlined" size='sm' onClick={SubmitFormData} sx={{ color: 'green' }}>
                        <LibraryAddCheckOutlinedIcon />
                    </IconButton>
                </Box>
            </Box>

            {/* Dutieds And Responsibilities */}

            <Paper square elevation={3} sx={{ p: 1, display: "flex", flexDirection: "column" }} >
                <Box sx={{ display: "flex", alignItems: "center", pb: 0.5 }} >
                    <Box sx={{ flex: 1, pr: 1 }}>
                        <TextareaAutosize
                            style={{ width: "100%", display: "flex" }}
                            minRows={1}
                            placeholder="Duties & Responsibilities"
                            value={duties}
                            name="duties"
                            onChange={(e) => updateDutiesandResponsibility(e)}
                        />
                    </Box>
                    <Box sx={{ flex: 0, }} >
                        <IconButton variant="outlined" size='sm' onClick={addDuties} sx={{ color: 'blue' }}>
                            <AddToPhotosIcon />
                        </IconButton>
                    </Box>
                </Box>
                {
                    duty && duty.map((val, index) =>
                        < Items key={index} val={val} setEdit={setEdit} setDelete={setDelete} />
                    )
                }
            </Paper>
        </Fragment>
    )
}

export default memo(DutyRespos) 