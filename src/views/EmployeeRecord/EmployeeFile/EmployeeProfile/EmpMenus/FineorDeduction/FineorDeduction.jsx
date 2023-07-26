import { Box, Chip, Paper, TextField } from '@mui/material'
import React, { Fragment, memo, useCallback, useEffect, useState } from 'react'
import { MdOutlineAddCircleOutline } from 'react-icons/md'
import { useParams } from 'react-router'
import TextInput from 'src/views/Component/TextInput'
import { getFineSlno } from 'src/views/Constant/Constant'
import ModelAddFineMaster from 'src/views/EmployeeRecord/EmployeeFile/EmpFileComponent/ModelAddFineMaster'
import { eachMonthOfInterval, format } from 'date-fns'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNofity, succesNofity } from 'src/views/CommonCode/Commonfunc'
import { CssVarsProvider, Typography } from '@mui/joy'
import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined';
import LibraryAddCheckOutlinedIcon from '@mui/icons-material/LibraryAddCheckOutlined';
import FineorDeductionTable from './FineorDeductionTable'
import IconButton from '@mui/joy/IconButton'
import { useMemo } from 'react'
import FinetypeSelectRedux from 'src/views/MuiComponents/FinetypeSelectRedux'
import { useSelector } from 'react-redux'
import _ from 'underscore'

const FineorDeduction = () => {
    //const history = useHistory()
    const [open, setOpen] = useState(false);
    const { id, no } = useParams();
    const [finestart, setMonthstart] = useState(format(new Date(), "yyyy-MM-dd"));
    const [fineend, setMonthend] = useState(format(new Date(), "yyyy-MM-dd"));
    const [count, setcount] = useState()
    const [period, setPeriod] = useState(0)
    const [status, setStatus] = useState(0)
    const [serialno, getSerialno] = useState(0)
    const [fineDed, setFineDed] = useState({
        fine_descp: '',
        fine_amount: 0,
        fine_remark: '',
        fine_status: ''
    })
    //Destructuring
    const { fine_descp, fine_status, fine_amount, fine_remark } = fineDed
    const [times, setTimes] = useState(0)
    const [fine, setFine] = useState(0)
    const [updatefine, setUpdateFine] = useState(0)

    //use state for updation 
    const [flag, setflag] = useState(0)

    const em_id = useSelector((state) => state?.getProfileData?.ProfileData[0]?.em_id ?? 0, _.isEqual)

    const updateFineDed = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.value : e.target.value;
        setFineDed({ ...fineDed, [e.target.name]: value })
    }

    //Status setting
    const updateStatusCollect = (e) => {
        setStatus(1)
    }
    const updateStatusPending = (e) => {
        setStatus(0)
    }

    //month format
    const getstart = (e) => {
        var startfine = e.target.value
        var fine_start = format(new Date(startfine), "yyyy-MM-dd")
        setMonthstart(fine_start)
        return (fine_start)
    }
    const getend = (e) => {
        var endfine = e.target.value
        var fine_end = format(new Date(endfine), "yyyy-MM-dd")
        setMonthend(fine_end)
        return (fine_end)
    }

    useEffect(() => {
        if (finestart < fineend) {
            var resultdates = eachMonthOfInterval({
                start: new Date(finestart),
                end: new Date(fineend)
            })
            setPeriod(resultdates)
            setTimes(resultdates.length)
        }
    }, [fineend, finestart])

    //get serial no
    getFineSlno().then((val) => {
        const fineslno = val;
        getSerialno(fineslno)
    })

    const postData = useMemo(() => {
        return {
            fine_emp_no: id,
            fine_emp_id: no,
            fine_slno: serialno,
            fine_type: fine,
            fine_descp: fine_descp,
            fine_amount: fine_amount,
            fine_start: finestart,
            fine_end: fineend,
            fine_period: times,
            fine_remark: fine_remark,
            fine_create_user: em_id,
            fine_status: '0'
        }
    }, [id, no, serialno, fine, fine_descp, fine_amount, finestart, fineend, times, fine_remark, em_id])


    const resetForm = {
        fine_descp: '',
        fine_amount: 0,
        fine_remark: '',
        fine_status: ''
    }

    const reset = () => {
        setFine(0);
        setPeriod(0);
        setTimes(0)
        setMonthstart(format(new Date(), "yyyy-MM-dd"));
        setMonthend(format(new Date(), "yyyy-MM-dd"));
    }
    //datas mapp for fine detailed table

    var finedetlmap = [];
    for (var i = 0; i < period.length; i++) {
        const postdata = {
            fine_emp_no: id,
            fine_emp_id: no,
            fine_slno: serialno,
            fine_amount: fine_amount / period.length,
            fine_date: format(new Date(period[i]), "yyyy-MM-dd"),
            create_user: em_id,
        }
        finedetlmap.push(postdata)
    }
    //use state for getting selected fine slno
    const [updateid, setupdateid] = useState(0)

    //function getting selected fine type
    const getDataTable = useCallback((params) => {
        setflag(1)
        const data = params.api.getSelectedRows()
        const { fine_type, fine_descp, fine_amount, fine_start, fine_end, fine_period, fine_remark, fine_slno } = data[0]
        const formdata = {
            fine_descp: fine_descp,
            fine_amount: fine_amount,
            fine_remark: fine_remark,
        }
        setupdateid(fine_slno)
        setFine(fine_type)
        setMonthstart(format(new Date(fine_start), "yyyy-MM-dd"))
        setMonthend(format(new Date(fine_end), "yyyy-MM-dd"))
        setTimes(fine_period)
        setFineDed(formdata)
    }, [])

    // update postdata for submit
    const updateData = useMemo(() => {
        return {
            fine_type: fine,
            fine_descp: fine_descp,
            fine_amount: fine_amount,
            fine_start: finestart,
            fine_end: fineend,
            fine_period: times,
            fine_remark: fine_remark,
            fine_edit_user: em_id,
            fine_slno: updateid
        }
    }, [fine, fine_descp, fine_amount, finestart, fineend, times, fine_remark, em_id, updateid])

    //fine detl data
    var finedetlupdatemap = [];
    for (var j = 0; j < period.length; j++) {
        const postdata1 = {
            fine_emp_no: id,
            fine_emp_id: no,
            fine_slno: updateid,
            fine_amount: fine_amount / period.length,
            fine_date: format(new Date(period[i]), "yyyy-MM-dd"),
            create_user: em_id,
        }
        finedetlupdatemap.push(postdata1)
    }

    const submitFine = useCallback((e) => {
        e.preventDefault();
        //Submit data
        const submitdata = async (postData) => {
            const result = await axioslogin.post('/empfinededuction', postData)
            const { message, success } = result.data;
            if (success === 1) {
                const result = await axioslogin.post('/empfinededuction/detltable', finedetlmap)
                const { success } = result.data;
                if (success === 1) {
                    succesNofity(message);
                    setcount(count + 1)
                    setFineDed(resetForm);
                    reset()
                } else if (success === 0) {
                    infoNofity(message.sqlMessage);
                } else {
                    infoNofity(message)
                }
            }
        }
        //update data
        const submitUpdate = async (updateData) => {
            const result = await axioslogin.patch('/empfinededuction', updateData)
            const { message, success } = result.data;
            if (success === 2) {
                const result = await axioslogin.delete(`/empfinededuction/delete/${updateid}`)
                const { success } = result.data;
                if (success === 1) {
                    const result = await axioslogin.post('/empfinededuction/detltable', finedetlupdatemap)
                    const { success } = result.data;
                    if (success === 1) {
                        setFineDed(resetForm);
                        setcount(count + 1)
                        //history.push(`/Home/FineorDeduction/${id}/${no}`);
                        succesNofity(message);
                        reset()
                    } else {
                        infoNofity(message)
                    }
                }
            }
        }
        if (flag === 0) {
            submitdata(postData)
        }
        else {
            submitUpdate(updateData)

        }
    }, [postData, updateData, finedetlmap, finedetlupdatemap, flag, count, updateid])

    const handleClickOpen = () => {
        setOpen(true);
        //history.push(`/Home/FineorDeduction/${id}/${no}`);
    };
    const handleClose = () => {
        setOpen(false);
    };
    // const RedirectToProfilePage = () => {
    //     //history.push(`/Home/Profile/${id}/${no}`)
    // }

    return (
        <Fragment>
            <ModelAddFineMaster open={open} handleClose={handleClose} setUpdateFine={setUpdateFine} upfineCount={updatefine} />
            <Box sx={{ width: "100%", height: { xxl: 825, xl: 680, lg: 523, md: 270, sm: 270, xs: 270 }, overflow: 'auto', '::-webkit-scrollbar': { display: "none" } }} >
                <Paper square elevation={3} sx={{ display: "flex", p: 1, alignItems: "center" }}  >
                    <Box sx={{ flex: 1 }} >
                        <CssVarsProvider>
                            <Typography startDecorator={<DragIndicatorOutlinedIcon color='success' />} textColor="neutral.400" sx={{ display: 'flex', }} >
                                Fine And Other Deduction
                            </Typography>
                        </CssVarsProvider>
                    </Box>
                </Paper>
                <Box sx={{ display: "flex", flexDirection: "column", flex: 1, px: 0.5, pb: 0.5 }}>
                    <Box sx={{ display: "flex", flexDirection: "row", px: 20 }}>
                        <Box sx={{ display: 'flex', width: '20%', pt: 1 }}>
                            <CssVarsProvider>
                                <Typography textColor="text.secondary" >
                                    Fine or Deduction
                                </Typography>
                            </CssVarsProvider>
                        </Box>
                        <Box sx={{ flex: 1, pt: 0.5 }} >
                            <FinetypeSelectRedux value={fine} setValue={setFine} updatefine={updatefine} />
                        </Box>
                        <Box sx={{ display: 'flex', width: '20%', pt: 0.5, pl: 0.5 }}>
                            <CssVarsProvider>
                                <Typography textColor="text.secondary" >
                                    Create New Fine Master
                                </Typography>
                            </CssVarsProvider>
                        </Box>
                        <Box sx={{ flex: 0, }} >
                            <CssVarsProvider>
                                <IconButton aria-label="add" style={{ padding: "0rem" }} onClick={handleClickOpen}  >
                                    <MdOutlineAddCircleOutline className="text-info" size={30}
                                    />
                                </IconButton>
                            </CssVarsProvider>
                        </Box>
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "row", px: 20, pt: 1 }}>
                        <Box sx={{ display: 'flex', width: '20%' }}>
                            <CssVarsProvider>
                                <Typography textColor="text.secondary" >
                                    Description
                                </Typography>
                            </CssVarsProvider>
                        </Box>
                        <Box sx={{ flex: 1, }} >
                            <TextField fullWidth
                                placeholder='Description'
                                size="small"
                                id='fine_descp'
                                value={fine_descp}
                                name="fine_descp"
                                onChange={(e) => updateFineDed(e)}
                            />
                        </Box>
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "row", px: 20, pt: 1 }}>
                        <Box sx={{ display: 'flex', width: '20%' }}>
                            <CssVarsProvider>
                                <Typography textColor="text.secondary" >
                                    Fine Amount
                                </Typography>
                            </CssVarsProvider>
                        </Box>
                        <Box sx={{ flex: 1, }} >
                            <TextField fullWidth
                                placeholder='Amount'
                                size="small"
                                id='fine_amount'
                                value={fine_amount}
                                name="fine_amount"
                                onChange={(e) => updateFineDed(e)}
                            />
                        </Box>
                        <Box sx={{ display: 'flex', width: '20%', pl: 0.5 }}>
                            <CssVarsProvider>
                                <Typography textColor="text.secondary" >
                                    Time Period
                                </Typography>
                            </CssVarsProvider>
                        </Box>
                        <Box sx={{ flex: 1, }} >

                            <TextField
                                fullWidth
                                placeholder='Period'
                                size="small"
                                id='times'
                                value={times}
                                name="times"
                                disabled={true}

                            />
                        </Box>
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "row", pt: 0.5, px: 20 }}>
                        <Box sx={{ display: 'flex', width: '20%' }}>
                            <CssVarsProvider>
                                <Typography textColor="text.secondary" >
                                    Fine Date start
                                </Typography>
                            </CssVarsProvider>
                        </Box>
                        <Box sx={{ flex: 1, }} >
                            <TextInput
                                type="date"
                                classname="form-control form-control-md"
                                Placeholder="Start Date"
                                min={new Date()}
                                value={finestart}
                                name="finestart"
                                changeTextValue={(e) => {
                                    getstart(e)
                                }}
                            />
                        </Box>
                        <Box sx={{ display: 'flex', width: '20%', pl: 0.5 }}>
                            <CssVarsProvider>
                                <Typography textColor="text.secondary" >
                                    Fine Date End
                                </Typography>
                            </CssVarsProvider>
                        </Box>
                        <Box sx={{ flex: 1, }} >
                            <TextInput
                                type="date"
                                classname="form-control form-control-md"
                                Placeholder="End Date"
                                value={fineend}
                                min={finestart}
                                name="fineend"
                                changeTextValue={(e) => {
                                    getend(e)
                                }}
                            />
                        </Box>
                    </Box>
                    <Box sx={{
                        display: "flex",
                        flexDirection: "row", pt: 1,
                        px: 20
                    }}>

                        <Box sx={{ display: 'flex', width: '20%' }}>
                            <CssVarsProvider>
                                <Typography textColor="text.secondary" >
                                    Remark
                                </Typography>
                            </CssVarsProvider>
                        </Box>
                        <Box sx={{ flex: 1, }} >
                            <TextField fullWidth
                                placeholder='Remark'
                                size="small"
                                id='fine_remark'
                                value={fine_remark}
                                name="fine_remark"
                                onChange={(e) => updateFineDed(e)}
                            />
                            <input
                                type="text"
                                className="hiddenvalue"
                                value={fine_status}
                                name="fine_status"
                                hidden
                                onChange={(e) => updateFineDed(e)}
                            />
                        </Box>
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "row", pt: 1, px: 20 }}>
                        <Box sx={{ flex: 1, }} >
                            <Chip
                                size="small"
                                // icon={fine_status === 0 ? <IoCheckmarkDoneSharp /> : <IoBan />}
                                label="Collected"
                                color="secondary"
                                variant="outlined"
                                clickable={true}
                                onClick={(e) => updateStatusCollect(e)}
                                sx={{
                                    minWidth: '90%',
                                    maxWidth: '90%'
                                }}
                            />
                        </Box>
                        <Box sx={{ flex: 1, }} >
                            <Chip
                                size="small"
                                //icon={fine_status === 1 ? <IoCheckmarkDoneSharp /> : <IoBan />}
                                label="Pending"
                                color="secondary"
                                variant="outlined"
                                clickable={true}
                                onClick={(e) => updateStatusPending(e)}
                                sx={{
                                    minWidth: '90%',
                                    maxWidth: '90%'
                                }}
                            />
                        </Box>
                    </Box>
                    <Box>

                    </Box>
                </Box>
                <Paper square elevation={0} sx={{
                    pt: 1,
                    mt: 0.5,
                    display: 'flex',
                    //alignItems: "center",
                    //flexDirection: { xl: "row", lg: "row", md: "row", sm: 'column', xs: "column" }
                    //backgroundColor: "lightcyan",
                    flexDirection: "column"

                }} >
                    <FineorDeductionTable update={count}
                        collected={status} getDataTable={getDataTable} />
                </Paper>
                <Paper square sx={{ backgroundColor: "#F8F8F8", display: "flex", flexDirection: "row" }}>
                    <Box sx={{ flex: 0 }} >
                        <CssVarsProvider>
                            <IconButton variant="outlined" size='sm' sx={theme => ({
                                color: `rgba(${theme.vars.palette.primary.mainChannel} / 0.78)`,
                            })} onClick={submitFine} >
                                <LibraryAddCheckOutlinedIcon />
                            </IconButton>
                        </CssVarsProvider>
                    </Box>
                </Paper>
            </Box>
        </Fragment >
    )
}

export default memo(FineorDeduction) 