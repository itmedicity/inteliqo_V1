import { CssVarsProvider } from '@mui/joy'
import Typography from '@mui/joy/Typography';
import { Box, Paper, TextareaAutosize } from '@mui/material'
import React, { Fragment, useCallback, useEffect, useState } from 'react'
import IconButton from '@mui/joy/IconButton';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined';
import LibraryAddCheckOutlinedIcon from '@mui/icons-material/LibraryAddCheckOutlined';
import KraItem from './KraItem';
import KraSelect from './Jobdesccomponent/KraSelect';
import { infoNofity, succesNofity, errorNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';
import { SELECT_CMP_STYLE } from 'src/views/Constant/Constant';
import { axioslogin } from 'src/views/Axios/Axios';
import { ToastContainer } from 'react-toastify';
import { memo } from 'react';
import TextInput from 'src/views/Component/TextInput';

const Performance = ({ jobedit, selectDesignation, selectedDept, selectDeptSection }) => {
    const [Kra, setKra] = useState(0)
    const [KraName, setKraName] = useState(0)
    const [Kraview, setKraview] = useState(0)
    const [editKra, setEditKra] = useState(0)
    const [deleteKra, setDeleteKra] = useState(0)
    const [filterdata, setfilterdata] = useState([])

    const [Submitedit, setSubmitEdit] = useState(0)
    const [sumbitdelt, setsubmitdelt] = useState(0)
    const [slno, setSlno] = useState(0)
    const [ids, setId] = useState(0)
    const [editcheckdata, setEditcheck] = useState([])
    const [remaining, setremaining] = useState([])
    const [flag, setflag] = useState(0)
    const [arrays, setArrays] = useState([])
    const [editcount, seteditCount] = useState(0)
    const [currentstate, setCurrentstate] = useState(0)
    const [checkid, setCheckid] = useState(0)
    const [addId, setAddId] = useState(0)
    const [newarray, setnewarray] = useState([])
    const [newid, setnewId] = useState(0)

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
    })
    const { kpi, kpiscore } = formData
    const defaultState = {
        kpi: '',
        kpiscore: '',
    }


    //getting form data
    const updatKeyPerformance = async (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
        setFormData({ ...formData, [e.target.name]: value })
    }
    const [perfomance, setPerformance] = useState([])
    const [score, setScore] = useState(0)

    //Adding KRA and KPI's and displays as an array
    const AddKraDataToTable = () => {
        if (kpiscore > 100 && score < 100) {
            infoNofity("Please Enter Score Below 100")
        }
        else if (score >= 100) {
            infoNofity("Score Must Be Below 100")
        }
        else if (kpi === '' && kpiscore === '') {
            infoNofity("Please Add KPI & Score")
        }
        else if (kpi !== '' && kpiscore === '') {
            infoNofity("Please Enter KPI Score")
        }
        else {
            if (addId === 2) {
                infoNofity("Cannot Add New Data, Please Submit edit data")
                setFormData(defaultState)
                setAddId(0)
            }
            else if (addId === 1) {
                //checking edit clicked data retrieved from database
                if (editcheckdata.some(key => key.kpi_id === ids)) {
                    setScore(Number(score) + Number(kpiscore))
                    const keyperformance = {
                        id: ids,
                        key_result_area: Kra,
                        kra_desc: KraName,
                        kpi: kpi,
                        kpi_score: kpiscore,
                    }
                    setPerformance([...perfomance, keyperformance])
                    setFormData(defaultState)
                    setAddId(2)
                }
                else if (newarray.some(key => key.kpi_id === ids)) {
                    setScore(Number(score) + Number(kpiscore))
                    const keyperformance = {
                        id: ids,
                        key_result_area: Kra,
                        kra_desc: KraName,
                        kpi: kpi,
                        kpi_score: kpiscore,
                    }
                    setPerformance([...perfomance, keyperformance])
                    setFormData(defaultState)
                    setAddId(2)
                }
            }
            else {
                //adding new KRA KPI's
                setScore(Number(score) + Number(kpiscore))
                const keyperformance = {
                    id: new Date().getTime(),
                    key_result_area: Kra,
                    kra_desc: KraName,
                    kpi: kpi,
                    kpi_score: kpiscore,
                }
                setPerformance([...perfomance, keyperformance])
                setFormData(defaultState)
                setnewId(1)
            }
        }
    }

    //function for editing kra details
    useEffect(() => {
        if (editKra > 0) {
            const editdata = perfomance.filter((val) => {
                if (val.id === editKra) {
                    return val
                }
            })
            const { key_result_area, kpi, kpi_score } = editdata[0]
            const frmData = {
                kpi: kpi,
                kpiscore: kpi_score,
                kras: key_result_area,
            }
            setFormData(frmData)
            setKra(key_result_area)
            const newKra = perfomance.filter((val) => {
                if (val.id !== editKra) {
                    return val
                }
            })
            setPerformance(newKra)
        }
        //function for edit after save

        else if (Submitedit > 0) {
            if (editcount === 1) {
                infoNofity("Please Save Data Before Another Edit")
            }
            else {
                const editdata = perfomance.filter((val) => {
                    if (val.kpi_id === Submitedit) {
                        return val
                    }
                })
                const { key_result_area, kpi, kpi_score, kpi_id, specification_slno, kra_desc } = editdata[0]
                const frmData = {
                    kpi: kpi,
                    kpiscore: kpi_score,
                    kras: key_result_area,
                }
                setFormData(frmData)
                setKra(key_result_area)
                setKraName(kra_desc)
                setKraview(1)
                setSlno(specification_slno)
                setId(kpi_id)
                const newKra = perfomance.filter((val) => {
                    if (val.kpi_id !== Submitedit) {
                        return val
                    }
                })
                setPerformance(newKra)
                seteditCount(editcount + 1)
                setCurrentstate(1)
                setCheckid(1)
                setAddId(1)
            }
        }
    }, [Submitedit, editKra])

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
        //function for delete after save
        else if (sumbitdelt > 0) {
            if (editcount === 1) {
                infoNofity("Please Save Data Before Deletion")
            }
            else {
                const deletee = perfomance.filter((val) => {
                    if (val.kpi_id !== sumbitdelt) {
                        return val
                    }
                })
                setPerformance(deletee)

                const rem = perfomance.filter((val) => {
                    if (val.kpi_id === sumbitdelt) {
                        return val
                    }
                })
                setremaining(rem)
            }
        }
    }, [sumbitdelt, deleteKra])

    useEffect(() => {
        if (selectDesignation !== 0) {
            setFormData(defaultState)
            setKraview(0)
            setPerformance([])
        }
    }, [selectDesignation])


    const checkData = {
        designation: selectDesignation,
        dept_id: selectedDept,
        sect_id: selectDeptSection
    }

    //use effect for getting job performance for edit
    useEffect(() => {
        if (jobedit > 0) {
            const getPerformace = async () => {
                const result = await axioslogin.post('/jobsummary/getjobspecific', checkData)
                const { success, data } = result.data
                if (success === 1) {
                    setPerformance(data)
                    setfilterdata(data)
                    setEditcheck(data)
                    setflag(1)
                }
            }
            getPerformace()
        }
        else {
            setPerformance([])
        }
    }, [jobedit])



    //function for saving job Specification
    const saveJobSpecification = useCallback((e) => {
        e.preventDefault();
        const submitFunc = async (checkData) => {
            if (flag === 1) {
                //saving job performance, if it already saved in database 
                let array = perfomance.filter((value) => {
                    return !filterdata.find((val) => {
                        return value.kpi_id === val.kpi_id;
                    })
                })
                const result = await axioslogin.post('/jobsummary/check', checkData)
                const { data, success } = result.data
                if (success === 1) {
                    const { summary_slno } = data[0]
                    if (perfomance.length === 0) {
                        infoNofity("Please Add Duties & Responsibilities")
                    }
                    else {
                        const saveDuties = array && array.map((val) => {
                            return {
                                job_id: summary_slno,
                                kra: val.key_result_area,
                                kpi: val.kpi,
                                kpi_score: val.kpi_score,
                                dept_id: selectedDept,
                                designation: selectDesignation,
                                kpi_id: val.id
                            }
                        })
                        const result = await axioslogin.post('/jobsummary/jobspecification', saveDuties)
                        const { success, message } = result.data
                        if (success === 1) {
                            const result = await axioslogin.post('/jobsummary/getjobspecific', checkData)
                            const { success, data } = result.data
                            if (success === 1) {
                                setPerformance(data)
                                succesNofity(message)
                                setnewId(0)
                            }
                        }
                        else if (success === 2) {
                            warningNofity("Already Added!!")
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
                //adding new job performance to database
                let array = perfomance.filter((value) => {
                    return !arrays.find((val) => {
                        return value.kpi_id === val.kpi_id;
                    })
                })
                const result = await axioslogin.post('/jobsummary/check', checkData)
                const { data, success } = result.data
                if (success === 1) {
                    const { summary_slno } = data[0]
                    if (perfomance.length === 0) {
                        infoNofity("Please Add Duties & Responsibilities")
                    }
                    else {
                        const saveDuties = array && array.map((val) => {
                            return {
                                job_id: summary_slno,
                                kra: val.key_result_area,
                                kpi: val.kpi,
                                kpi_score: val.kpi_score,
                                dept_id: selectedDept,
                                designation: selectDesignation,
                                kpi_id: val.id
                            }
                        })
                        const result = await axioslogin.post('/jobsummary/jobspecification', saveDuties)
                        const { success, message } = result.data
                        if (success === 1) {
                            //succesNofity(message)
                            const result = await axioslogin.post('/jobsummary/getjobspecific', checkData)
                            const { success, data } = result.data
                            if (success === 1) {
                                setPerformance(data)
                                setArrays(data)
                                succesNofity(message)
                                setnewarray(data)
                                setnewId(0)
                            }
                        }
                        else if (success === 2) {
                            warningNofity("Already Added!!")
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

        //updating saved data from database
        const updateEach = async () => {
            let obj = perfomance.find(o => o.id === ids);
            const patchCompte = {
                key_result_area: obj.key_result_area,
                kpi: obj.kpi,
                kpi_score: obj.kpi_score,
                kpi_id: ids,
                specification_slno: slno
            }
            const result = await axioslogin.patch('/jobsummary/updateperf', patchCompte)
            const { success, message } = result.data
            if (success === 4) {
                const result = await axioslogin.post('/jobsummary/getjobspecific', checkData)
                const { success, data } = result.data
                if (success === 1) {
                    setPerformance(data)
                    succesNofity(message)
                    setnewId(0)
                }
                setCurrentstate(0)
            }
            else {
                warningNofity(message)
            }
        }
        if (currentstate === 1) {
            updateEach()
        }
        else {
            submitFunc(checkData)
        }
    }, [sumbitdelt, checkData, Submitedit])

    //deletion process
    const [open, setOpen] = useState(false)
    const [Active, setActive] = useState(0)
    const handleClose = async () => {
        setOpen(false)
        setActive(0)
    }
    const Close = async () => {
        setOpen(false)
        setActive(0)
    }
    // const DeleteValue = useCallback((e) => {
    //     e.preventDefault();
    //     const value = remaining && remaining.map((val) => {
    //         return val.specification_slno
    //     })
    //     const deltevalue = async (value) => {
    //         const result = await axioslogin.delete(`/jobsummary/deletePerf/${value}`)
    //         const { success, message } = result.data
    //         if (success === 5) {
    //             succesNofity(message)
    //             handleClose()
    //             const deletee = perfomance.filter((val) => {
    //                 if (val.kpi_id !== sumbitdelt) {
    //                     return val
    //                 }
    //             })
    //             setPerformance(deletee)

    //         }
    //     }
    //     deltevalue(value)
    //     return 0
    // })

    return (
        <Fragment>
            <ToastContainer />
            {/* Job Specification : Performance  */}
            <Box sx={{ p: 1, display: "flex" }} >
                <CssVarsProvider>
                    <Typography
                        startDecorator={<DragIndicatorOutlinedIcon color='success' />}
                        level="body2"
                        sx={{ flex: 2, }}
                    >
                        Job Specification : Performance
                    </Typography>
                </CssVarsProvider>
                <Box sx={{ flex: 0 }} >
                    <IconButton variant="outlined" size='sm' onClick={saveJobSpecification} sx={{ color: 'green' }}>
                        <LibraryAddCheckOutlinedIcon />
                    </IconButton>
                </Box>
            </Box>

            {/* Peformance & Competency descriptive table */}

            <Paper square elevation={3} sx={{ p: 1, display: "flex", flexDirection: "column" }} >
                <Box sx={{ display: "flex", alignItems: "center" }} >
                    <Box sx={{ flex: 1 }} >
                        <KraSelect label="Key Result Areas (KRA)" value={Kra} setValue={setKra} style={SELECT_CMP_STYLE} setKraName={setKraName} />
                    </Box>
                    <Box sx={{ flex: 1, px: 2 }} >
                        <IconButton variant="outlined" size='sm' onClick={AddKra} sx={{ color: 'blue' }}>
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
                            {/* <TextareaAutosize
                                style={{ width: "100%", display: "flex", borderRadius: 4, borderColor: "#c4c4c4", paddingLeft: 13 }}
                                minRows={1}
                                placeholder="KPI Score"
                                name="kpiscore"
                                value={kpiscore}
                                onChange={(e) => updatKeyPerformance(e)}
                            /> */}
                            <TextInput
                                style={{ width: "100%", paddingLeft: 13 }}
                                placeholder="KPI Score"
                                type="number"
                                name="kpiscore"
                                value={kpiscore}
                                changeTextValue={(e) => updatKeyPerformance(e)}
                            />
                        </Box>
                        <Box sx={{ flex: 0, px: 1 }} >
                            <IconButton variant="outlined" size='sm' onClick={AddKraDataToTable} sx={{ color: 'blue' }} >
                                <AddToPhotosIcon />
                            </IconButton>
                        </Box>
                    </Box>
                }

                {
                    perfomance.length > 0 ? perfomance && perfomance.map((val, index) =>
                        <KraItem key={index} val={val}
                            setEditKra={setEditKra} setDeleteKra={setDeleteKra}
                            setSubmitEdit={setSubmitEdit} setsubmitdelt={setsubmitdelt}
                            open={open} setOpen={setOpen}
                            handleClose={handleClose} Close={Close}
                            setActive={setActive} Active={Active} checkid={checkid}
                            setnewId={setnewId} newid={newid} />
                    ) : null
                }

            </Paper>

        </Fragment>
    )
}

export default memo(Performance) 