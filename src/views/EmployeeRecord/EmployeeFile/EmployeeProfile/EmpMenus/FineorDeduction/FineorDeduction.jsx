import { Box, Chip, Paper, Tooltip } from '@mui/material'
import React, { Fragment, memo, useContext, useEffect, useState } from 'react'
import { MdOutlineAddCircleOutline } from 'react-icons/md'
import { useHistory, useParams } from 'react-router'
import { PayrolMasterContext } from 'src/Context/MasterContext'
import FineTypeSelection from 'src/views/CommonCode/FineTypeSelection'
import PageLayoutSave from 'src/views/CommonCode/PageLayoutSave'
import TextInput from 'src/views/Component/TextInput'
import { getFineSlno, SELECT_CMP_STYLE } from 'src/views/Constant/Constant'
import ModelAddFineMaster from 'src/views/EmployeeRecord/EmployeeFile/EmpFileComponent/ModelAddFineMaster'
import { eachMonthOfInterval, format } from 'date-fns'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNofity, succesNofity } from 'src/views/CommonCode/Commonfunc'
import ReactTooltip from 'react-tooltip';
import { CssVarsProvider, Typography } from '@mui/joy'
import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined';
import LibraryAddCheckOutlinedIcon from '@mui/icons-material/LibraryAddCheckOutlined';
import CloseIcon from '@mui/icons-material/Close';
import FineorDeductionTable from './FineorDeductionTable'
import IconButton from '@mui/joy/IconButton'

const FineorDeduction = () => {
    const history = useHistory()
    const [open, setOpen] = useState(false);
    const { id, no } = useParams();
    const { selectFine, updateFine, employeedetails } = useContext(PayrolMasterContext)
    const { em_id } = employeedetails
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
    const [times, setTimes] = useState(0)

    //Destructuring
    const { fine_descp, fine_status, fine_amount, fine_remark } = fineDed
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

    const postData = {
        fine_emp_no: id,
        fine_emp_id: no,
        fine_slno: serialno,
        fine_type: selectFine,
        fine_descp: fine_descp,
        fine_amount: fine_amount,
        fine_start: finestart,
        fine_end: fineend,
        fine_period: times,
        fine_remark: fine_remark,
        fine_create_user: em_id,
        fine_status: '0'
    }
    const resetForm = {
        fine_descp: '',
        fine_amount: 0,
        fine_remark: '',
        fine_status: ''
    }

    const reset = () => {
        updateFine(0);
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

    //Submit data
    const submitFine = async (e) => {
        e.preventDefault();
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

    const handleClickOpen = () => {
        setOpen(true);
        history.push(`/Home/FineorDeduction/${id}/${no}`);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const RedirectToProfilePage = () => {
        history.push(`/Home/Profile/${id}/${no}`)
    }


    return (
        <Fragment>
            <ModelAddFineMaster open={open} handleClose={handleClose} />
            <Box sx={{ width: "100%" }} >
                <Paper square elevation={2} sx={{ p: 0.5, }}>
                    <Paper square elevation={3} sx={{
                        display: "flex",
                        p: 1,
                        alignItems: "center",
                    }}  >
                        <Box sx={{ flex: 1 }} >
                            <CssVarsProvider>
                                <Typography startDecorator={<DragIndicatorOutlinedIcon color='success' />} level="h6" >
                                    Fine or Deduction
                                </Typography>
                            </CssVarsProvider>
                        </Box>
                    </Paper>
                    <Paper square elevation={3} sx={{
                        p: 0.5,
                        mt: 0.5,
                        display: 'flex',
                        alignItems: "center",
                        flexDirection: { xl: "row", lg: "row", md: "row", sm: 'column', xs: "column" }
                        // backgroundColor: "lightcyan"
                    }} >
                        <Box sx={{
                            display: "flex",
                            flexDirection: "column",
                            flex: 1, px: 0.5, pb: 0.5
                        }}>
                            <Box sx={{
                                display: "flex",
                                flexDirection: "row",
                                px: 20
                            }}>
                                <Box sx={{ flex: 1, pt: 0.5 }} >
                                    <FineTypeSelection
                                        select="Fine Or Deducation Master Drop Down"
                                        style={SELECT_CMP_STYLE}
                                    />
                                </Box>
                                <Box sx={{ flex: 0, }} >
                                    <CssVarsProvider>
                                        <IconButton aria-label="add" style={{ padding: "0rem" }} onClick={handleClickOpen}  >
                                            <MdOutlineAddCircleOutline className="text-danger" size={30}
                                            />
                                        </IconButton>
                                    </CssVarsProvider>
                                </Box>
                                <Box sx={{ flex: 1, pt: 0.5 }} >
                                    <TextInput
                                        type="text"
                                        classname="form-control form-control-sm"
                                        Placeholder="Description"
                                        value={fine_descp}
                                        name="fine_descp"
                                        changeTextValue={(e) => updateFineDed(e)}
                                    />
                                </Box>
                            </Box>
                            <Box sx={{
                                display: "flex",
                                flexDirection: "row",
                                px: 20,
                            }}>
                                <Box sx={{ flex: 1 }} >
                                    <TextInput
                                        type="text"
                                        classname="form-control form-control-sm"
                                        Placeholder="Amount"
                                        value={fine_amount}
                                        name="fine_amount"
                                        changeTextValue={(e) => updateFineDed(e)}
                                    />
                                </Box>
                                <Box sx={{ flex: 1, pl: 0.5 }} >
                                    <TextInput
                                        type="text"
                                        classname="form-control form-control-sm"
                                        Placeholder="Period"
                                        disabled="disabled"
                                        value={times}
                                        name="times"
                                    //changeTextValue={(e) => updateFineDed(e)}
                                    />
                                </Box>
                            </Box>
                            <Box sx={{
                                display: "flex",
                                flexDirection: "row", pt: 1,
                                px: 20
                            }}>
                                <Box sx={{ flex: 1, }} >
                                    <TextInput
                                        type="date"
                                        classname="form-control form-control-sm"
                                        Placeholder="Start Date"
                                        min={new Date()}
                                        value={finestart}
                                        name="finestart"
                                        changeTextValue={(e) => {
                                            getstart(e)
                                        }}
                                    />
                                </Box>
                                <Box sx={{ flex: 1, pl: 0.5 }} >
                                    <TextInput
                                        type="date"
                                        classname="form-control form-control-sm"
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
                                <Box sx={{ flex: 1, }} >
                                    <TextInput
                                        type="text"
                                        classname="form-control form-control-sm"
                                        Placeholder="Remark"
                                        value={fine_remark}
                                        name="fine_remark"
                                        changeTextValue={(e) => updateFineDed(e)}
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
                            <Box sx={{
                                display: "flex",
                                flexDirection: "row", pt: 1,
                                px: 20
                            }}>
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
                    </Paper>
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
                            collected={status} />
                    </Paper>
                </Paper>
                <Paper square sx={{
                    backgroundColor: "#F8F8F8",
                    display: "flex",
                    flexDirection: "row"
                }}>
                    <Box sx={{ flex: 0 }} >
                        <CssVarsProvider>
                            <IconButton variant="outlined" size='sm' sx={theme => ({
                                color: `rgba(${theme.vars.palette.primary.mainChannel} / 0.78)`,
                            })} onClick={submitFine} >
                                <LibraryAddCheckOutlinedIcon />
                            </IconButton>
                        </CssVarsProvider>
                    </Box>
                    {/* <Box sx={{ pl: 1 }}>
                        <CssVarsProvider>
                            <IconButton variant="outlined" size='sm' sx={theme => ({
                                color: `rgba(${theme.vars.palette.primary.mainChannel} / 0.78)`,
                            })} onClick={RedirectToProfilePage}>
                                <CloseIcon />
                            </IconButton>
                        </CssVarsProvider>
                    </Box> */}
                </Paper>
            </Box>
        </Fragment>
    )
}

export default memo(FineorDeduction) 