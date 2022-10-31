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
import { errorNofity, infoNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';
import { ToastContainer } from 'react-toastify';
import { memo } from 'react';
import { useCallback } from 'react';

const DutyRespos = ({ jobedit, setjobEdit, selectDesignation, selectedDept, selectDeptSection }) => {

    const [duty, setDuty] = useState([])
    const [edit, setEdit] = useState(0)
    const [deleteData, setDelete] = useState(0)
    const [filterdata, setfilterdata] = useState([])
    const [Submitedit, setSubmitEdit] = useState(0)
    const [slno, setSlno] = useState(0)
    const [ids, setId] = useState(0)
    const [editcheckdata, setEditcheck] = useState([])
    const [flag, setflag] = useState(0)
    const [arrays, setArrays] = useState([])
    const [sumbitdelt, setsubmitdelt] = useState(0)
    const [remaining, setremaining] = useState([])
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
        if (editcheckdata.some(key => key.duties_id === ids)) {
            const newduties = {
                id: ids,
                duties_and_resp: duties
            }
            setDuty([...duty, newduties])
            setFormData(defaultstate)
        }
        else {
            const newduties = {
                id: new Date().getTime(),
                duties_and_resp: duties
            }
            setDuty([...duty, newduties])
            setFormData(defaultstate)
        }
    }

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

    //edit duties aftter save to database

    useEffect(() => {
        if (Submitedit > 0) {
            const editdata = duty.filter((val) => {
                if (val.duties_id === Submitedit) {
                    return val
                }
            })
            const { duties_and_resp, duties_slno, duties_id } = editdata[0]
            setSlno(duties_slno)
            setId(duties_id)
            const frmdata = {
                duties: duties_and_resp
            }
            setFormData(frmdata)
            const newdata = duty.filter((val) => {
                if (val.duties_id !== Submitedit) {
                    return val
                }
            })
            setDuty(newdata)
        }
        else {
            setDuty([])
        }
    }, [Submitedit])

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


    useEffect(() => {
        if (sumbitdelt > 0) {

            const deletee = duty.filter((val) => {
                if (val.duties_id !== sumbitdelt) {
                    return val
                }

                return 0;
            })
            setDuty(deletee)
            const rem = duty.filter((val) => {
                if (val.duties_id === sumbitdelt) {
                    return val
                }
            })
            setremaining([...remaining, ...rem])
        }
    }, [sumbitdelt])

    const [msg, setMsg] = useState(0)


    useEffect(() => {
        if (msg !== 0) {
            succesNofity("Delete Successfully")
        }
    }, [msg])

    const checkData = {
        designation: selectDesignation,
        dept_id: selectedDept,
        sect_id: selectDeptSection
    }
    //use effect for getting data for edit
    useEffect(() => {
        if (jobedit > 0) {
            const getdutiesandResp = async () => {
                const result = await axioslogin.post('/jobsummary/getJobDuties', checkData)
                const { success, data } = result.data
                if (success === 1) {
                    setfilterdata(data)
                    setDuty(data)
                    setEditcheck(data)
                    setflag(1)
                }
            }
            getdutiesandResp()
        }
        else {
            setDuty([])
        }
    }, [jobedit])

    //function for saving duties and responsiblities
    const SubmitFormData = useCallback((e) => {
        e.preventDefault();
        const submitFunc = async (checkData) => {

            if (flag === 1) {
                let array = duty.filter((value) => {
                    return !filterdata.find((val) => {
                        return value.duties_id === val.duties_id;
                    })
                })
                const result = await axioslogin.post('/jobsummary/check', checkData)
                const { data, success } = result.data
                if (success === 1) {
                    const { summary_slno } = data[0]
                    if (duty.length === 0) {
                        infoNofity("Please Add Duties & Responsibilities")
                    }
                    else {
                        const saveDuties = array && array.map((val) => {
                            return { jobdescid: summary_slno, dutiesandres: val.duties_and_resp, dept_id: selectedDept, designation: selectDesignation, duties_id: val.id }
                        })
                        const result = await axioslogin.post('/jobsummary/jobduties', saveDuties)
                        const { success, message } = result.data
                        if (success === 1) {
                            succesNofity(message)

                        }
                        else if (success === 2) {
                            warningNofity(message)
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
            else {

                let array = duty.filter((value) => {
                    return !arrays.find((val) => {
                        return value.duties_id === val.duties_id;
                    })
                })
                const result = await axioslogin.post('/jobsummary/check', checkData)
                const { data, success } = result.data
                if (success === 1) {
                    const { summary_slno } = data[0]
                    if (duty.length === 0) {
                        infoNofity("Please Add Duties & Responsibilities")
                    }
                    else {
                        const saveDuties = array && array.map((val) => {
                            return { jobdescid: summary_slno, dutiesandres: val.duties_and_resp, dept_id: selectedDept, designation: selectDesignation, duties_id: val.id }
                        })
                        const result = await axioslogin.post('/jobsummary/jobduties', saveDuties)
                        const { success, message } = result.data
                        if (success === 1) {
                            // setDuty([])
                            setjobEdit(0)
                            const result = await axioslogin.post('/jobsummary/getJobDuties', checkData)
                            const { success, data } = result.data
                            if (success === 1) {
                                setDuty(data)
                                setArrays(data)
                                succesNofity(message)
                            }
                        }
                        else if (success === 2) {
                            warningNofity(message)
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
        }

        //edit updation
        const updateEach = async () => {
            let obj = duty.find(o => o.id === ids);
            const patchDuties = {
                duties_and_resp: obj.duties_and_resp,
                duties_id: ids,
                duties_slno: slno
            }
            const result = await axioslogin.patch('/jobsummary/updatedutieseach', patchDuties)
            const { success, message } = result
            if (success === 2) {
                succesNofity(message)
            }
            else {
                warningNofity(message)
            }
        }
        if (Submitedit > 0) {
            updateEach()
        }
        else if (sumbitdelt > 0) {
            remaining && remaining.map((val) => {
                const deltevalue = async (value) => {
                    const result = await axioslogin.delete(`/jobsummary/deletedata/select/${value}`)
                    const { success } = result.data
                    if (success === 5) {
                        setMsg(msg + 1)
                    }
                }
                deltevalue(val.duties_slno)
                return 0
            })
        }
        else {
            submitFunc(checkData)
        }

    }, [Submitedit, checkData, setMsg, msg, flag, ids, selectDesignation, selectedDept, slno, sumbitdelt])


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
                        < Items key={index} val={val} setEdit={setEdit} setDelete={setDelete} setSubmitEdit={setSubmitEdit} setsubmitdelt={setsubmitdelt} />
                    )
                }
            </Paper>
        </Fragment>
    )
}

export default memo(DutyRespos) 