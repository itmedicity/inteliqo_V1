import { CssVarsProvider } from '@mui/joy'
import Typography from '@mui/joy/Typography';
import { Box, Paper, TextareaAutosize } from '@mui/material'
import React, { Fragment, useCallback, useEffect, useMemo, useState } from 'react'
import IconButton from '@mui/joy/IconButton';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined';
import LibraryAddCheckOutlinedIcon from '@mui/icons-material/LibraryAddCheckOutlined';
import KraSelect from './Jobdesccomponent/KraSelect';
import { infoNofity, succesNofity, errorNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';
import { SELECT_CMP_STYLE } from 'src/views/Constant/Constant';
import { axioslogin } from 'src/views/Axios/Axios';
import { ToastContainer } from 'react-toastify';
import CompetencyItem from './CompetencyItem';
import { memo } from 'react';

const Competency = ({ selectDesignation, selectedDept, jobedit, selectDeptSection }) => {
    const [Kra, setKra] = useState(0)
    const [KraName, setKraName] = useState(0)
    const [Kraview, setKraview] = useState(0)
    const [EditComp, setEditComp] = useState(0)
    const [deletecomp, setDeleteComp] = useState(0)
    const [Compete, setCompete] = useState([])


    const [filterdata, setfilterdata] = useState([])
    const [Submitedit, setSubmitEdit] = useState(0)
    const [sumbitdelt, setsubmitdelt] = useState(0)
    const [slno, setSlno] = useState(0)
    const [ids, setId] = useState(0)
    const [editcheckdata, setEditcheck] = useState([])
    const [remaining, setremaining] = useState([])
    const [flag, setflag] = useState(0)
    const [arrays, setArrays] = useState([])

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

    const AddCompetencyToTable = () => {
        if (Kra === 0) {
            warningNofity("Please Add KRA")
        }
        else {
            if (editcheckdata.some(key => key.competency_id === ids)) {
                const keyCompetency = {
                    id: ids,
                    key_result_area: Kra,
                    kra_desc: KraName,
                    competency_desc: competency_desc

                }
                setCompete([...Compete, keyCompetency])
                setFormData(defaultState)
            }
            else {
                const keyCompetency = {
                    id: new Date().getTime(),
                    key_result_area: Kra,
                    kra_desc: KraName,
                    competency_desc: competency_desc

                }
                setCompete([...Compete, keyCompetency])
                setFormData(defaultState)
            }
        }
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

    //function for edit after save
    useEffect(() => {
        if (Submitedit > 0) {
            const editdata = Compete.filter((val) => {
                if (val.competency_id === Submitedit) {
                    return val
                }
            })
            const { competency_desc, key_result_area, competency_id, competency_slno } = editdata[0]
            const frmData = {
                competency_desc: competency_desc,
            }
            setFormData(frmData)
            setKra(key_result_area)
            setSlno(competency_slno)
            setId(competency_id)
            const newKra = Compete.filter((val) => {
                if (val.competency_id !== Submitedit) {
                    return val
                }
            })
            setCompete(newKra)
        }
    }, [Submitedit])


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
    }, [deletecomp, Compete])

    //function for delete after save
    useEffect(() => {
        if (sumbitdelt > 0) {
            const deletee = Compete.filter((val) => {
                if (val.competency_id !== sumbitdelt) {
                    return val
                }
            })
            setCompete(deletee)

            const rem = Compete.filter((val) => {
                if (val.competency_id === sumbitdelt) {
                    return val
                }
            })
            setremaining([...remaining, ...rem])
        }
    }, [sumbitdelt])

    const [msg, setMsg] = useState(0)


    useEffect(() => {
        if (msg === 1) {
            succesNofity("Delete Successfully")
        }
    }, [msg])

    useEffect(() => {
        if (jobedit > 0) {
            const getCompetency = async () => {
                const result = await axioslogin.post('/jobsummary/get/jobcompetency', checkData)
                const { success, data } = result.data
                if (success === 1) {
                    setCompete(data)
                    setfilterdata(data)
                    setEditcheck(data)
                    setflag(1)
                }
            }
            getCompetency()
        }
        else {
            setCompete([])
        }
    }, [jobedit])

    const checkData = useMemo(() => {
        return {
            designation: selectDesignation,
            dept_id: selectedDept,
            sect_id: selectDeptSection
        }
    }, [selectDesignation, selectedDept, selectDeptSection])

    // function for saving job competency
    const saveJobSpecification = useCallback((e) => {
        e.preventDefault();
        const submitFunc = async (checkData) => {
            if (flag === 1) {
                let array = Compete.filter((value) => {
                    return !filterdata.find((val) => {
                        return value.competency_id === val.competency_id;
                    })
                })

                const result = await axioslogin.post('/jobsummary/check', checkData)
                const { data, success } = result.data
                if (success === 1) {
                    const { summary_slno } = data[0]
                    if (Compete.length === 0) {
                        infoNofity("Please Add Competency!!")
                    }
                    else {
                        const saveDuties = array && array.map((val) => {

                            return {
                                job_id: summary_slno,
                                key_result_area: val.key_result_area,
                                competency_desc: val.competency_desc,
                                dept_id: selectedDept,
                                designation: selectDesignation,
                                competency_id: val.id

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
            else {
                let array = Compete.filter((value) => {
                    return !arrays.find((val) => {
                        return value.competency_id === val.competency_id;
                    })
                })

                const result = await axioslogin.post('/jobsummary/check', checkData)
                const { data, success } = result.data
                if (success === 1) {
                    const { summary_slno } = data[0]
                    if (Compete.length === 0) {
                        infoNofity("Please Add Competency!!!")
                    }
                    else {
                        const saveDuties = array && array.map((val) => {

                            return {
                                job_id: summary_slno,
                                key_result_area: val.key_result_area,
                                competency_desc: val.competency_desc,
                                dept_id: selectedDept,
                                designation: selectDesignation,
                                competency_id: val.id

                            }
                        })
                        const result = await axioslogin.post('/jobsummary/jobcompetency', saveDuties)
                        const { success, message } = result.data
                        if (success === 1) {
                            const result = await axioslogin.post('/jobsummary/get/jobcompetency', checkData)
                            const { success, data } = result.data
                            if (success === 1) {
                                setCompete(data)
                                setArrays(data)
                                succesNofity(message)
                                setKra(0)

                            }
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

        }

        const updateEach = async () => {
            let obj = Compete.find(o => o.id === ids);
            const patchCompte = {
                key_result_area: obj.key_result_area,
                competency_desc: obj.competency_desc,
                competency_id: ids,
                competency_slno: slno
            }
            const result = await axioslogin.patch('/jobsummary/updatecompeteEach', patchCompte)
            const { success, message } = result
            if (success === 4) {
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
                    const result = await axioslogin.delete(`/jobsummary/deletecompet/${value}`)
                    const { success, message } = result.data
                    if (success === 5) {
                        setMsg(msg + 1)
                    }
                    else {
                        warningNofity(message)
                    }
                }
                deltevalue(val.competency_slno)
                return 0
            })
        }
        else {
            submitFunc(checkData)
        }
    }, [checkData, Compete])

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
                    <IconButton variant="outlined" size='sm' onClick={saveJobSpecification} sx={{ color: 'green' }}>
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
                            style={{ width: 800, height: 33, display: "flex", borderRadius: 4, borderColor: "#c4c4c4", paddingLeft: 13, pt: 4 }}
                            minRows={1}
                            placeholder="Competency"
                            name="competency_desc"
                            value={competency_desc}
                            onChange={(e) => updatKeyPerformance(e)}
                        />
                    </Box>
                    <Box sx={{ flex: 1, px: 2 }} >
                        <IconButton variant="outlined" size='sm' onClick={AddCompetencyToTable} onChange={AddKra} sx={{ color: 'blue' }} >
                            <AddToPhotosIcon />
                        </IconButton>
                    </Box>

                </Box>
                {/* </Box> */}

                {
                    Compete.length > 0 ? Compete && Compete.map((val, index) =>
                        <CompetencyItem key={index} val={val} setDeleteComp={setDeleteComp} setEditComp={setEditComp} setSubmitEdit={setSubmitEdit} setsubmitdelt={setsubmitdelt} />
                    ) : null
                }

            </Paper>

        </Fragment >




    )
}

export default memo(Competency) 