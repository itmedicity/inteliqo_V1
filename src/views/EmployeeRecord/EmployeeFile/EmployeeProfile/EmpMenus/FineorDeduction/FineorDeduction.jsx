import { Box, Chip, IconButton, Paper, } from '@mui/material'
import React, { Fragment, memo, useCallback, useEffect, useState } from 'react'
import { MdOutlineAddCircleOutline } from 'react-icons/md'
import { useParams } from 'react-router'
import { getFineSlno } from 'src/views/Constant/Constant'
import ModelAddFineMaster from 'src/views/EmployeeRecord/EmployeeFile/EmpFileComponent/ModelAddFineMaster'
import { eachMonthOfInterval, format } from 'date-fns'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNofity, succesNofity } from 'src/views/CommonCode/Commonfunc'
import { Button, CssVarsProvider, Input, Tooltip, Typography } from '@mui/joy'
import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined';
import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import _ from 'underscore'
import JoyFineTypeSelect from 'src/views/MuiComponents/JoyComponent/JoyFineTypeSelect'
import { IconButton as OpenIcon } from '@mui/material';
import InputComponent from 'src/views/MuiComponents/JoyComponent/InputComponent'
import moment from 'moment'
import SaveIcon from '@mui/icons-material/Save';
import CommonAgGrid from 'src/views/Component/CommonAgGrid'
import EditIcon from '@mui/icons-material/Edit';

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
    const [insertFine, setInsertFine] = useState([])
    const [updateFineArray, setupdateFineArray] = useState([])
    const [tableData, setTableData] = useState([]);
    //use state for getting selected fine slno
    const [updateid, setupdateid] = useState(0)

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

    const resetForm = useMemo(() => {
        return {
            fine_descp: '',
            fine_amount: 0,
            fine_remark: '',
            fine_status: ''
        }
    }, [])

    // const reset = useCallback(() => {
    //     setFine(0);
    //     setPeriod(0);
    //     setTimes(0)
    //     setMonthstart(format(new Date(), "yyyy-MM-dd"));
    //     setMonthend(format(new Date(), "yyyy-MM-dd"));
    // }, [])

    useEffect(() => {
        if (Object.keys(period).length !== 0) {
            const arr = period.map((val) => {
                const postdata = {
                    fine_emp_no: id,
                    fine_emp_id: no,
                    fine_slno: serialno,
                    fine_amount: fine_amount / period.length,
                    fine_date: format(new Date(val), "yyyy-MM-dd"),
                    create_user: em_id,
                }
                return postdata
            })
            setInsertFine(arr);
        } else {
            setInsertFine([])
        }
    }, [period, id, no, serialno, fine_amount, em_id])

    useEffect(() => {
        if (Object.keys(period).length !== 0) {
            const arr2 = period.map((val) => {
                const postdata = {
                    fine_emp_no: id,
                    fine_emp_id: no,
                    fine_slno: updateid,
                    fine_amount: fine_amount / period.length,
                    fine_date: format(new Date(val), "yyyy-MM-dd"),
                    create_user: em_id,
                }
                return postdata
            })
            setupdateFineArray(arr2);
        } else {
            setupdateFineArray([])
        }
    }, [period, id, no, updateid, serialno, fine_amount, em_id])



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

    const submitFine = useCallback((e) => {
        e.preventDefault();
        //Submit data
        const submitdata = async (postData) => {
            const result = await axioslogin.post('/empfinededuction', postData)
            const { message, success } = result.data;
            if (success === 1) {
                const result = await axioslogin.post('/empfinededuction/detltable', insertFine)
                const { success } = result.data;
                if (success === 1) {
                    succesNofity(message);
                    setcount(count + 1)
                    setFineDed(resetForm);
                    // reset()
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
                    const result = await axioslogin.post('/empfinededuction/detltable', updateFineArray)
                    const { success } = result.data;
                    if (success === 1) {
                        setFineDed(resetForm);
                        setcount(count + 1)
                        succesNofity(message);
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
    }, [postData, updateData, insertFine, flag, count, resetForm, updateFineArray, updateid])

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    }

    const [columnDef] = useState([
        { headerName: 'SlNo', field: 'fine_slno' },
        { headerName: 'Fine Type', field: 'fine_desc' },
        { headerName: 'Description', field: 'fine_descp' },
        { headerName: 'Amount', field: 'fine_amount' },
        { headerName: 'Remark', field: 'fine_remark' },
        { headerName: 'Status', field: 'fine_status' },
        {
            headerName: 'Edit', cellRenderer: params =>
                <IconButton sx={{ paddingY: 0.5 }} onClick={() => getDataTable(params)} >
                    <EditIcon color='primary' />
                </IconButton>
        },
    ])

    const searchData = useMemo(() => {
        return {
            id: id,
            collected: status
        }
    }, [id, status])

    //Get Data
    useEffect(() => {
        const getFineDeduction = async () => {
            const result = await axioslogin.post('/empfinededuction/dispaly', searchData)
            const { success, data } = result.data;
            if (success === 1) {
                setTableData(data);
            } else if (success === 0) {
                infoNofity("No Fine/Deduction is added to this employee")
            } else {
                setTableData([])
            }
        }
        getFineDeduction();
    }, [id, searchData]);

    return (
        <Fragment>
            <ModelAddFineMaster open={open} handleClose={handleClose} setUpdateFine={setUpdateFine} upfineCount={updatefine} />
            <Box sx={{ width: "100%", height: { xxl: 825, xl: 680, lg: 523, md: 270, sm: 270, xs: 270 }, overflow: 'auto', '::-webkit-scrollbar': { display: "none" } }} >
                <Paper variant='outlined' square elevation={0} sx={{ display: "flex", alignItems: "center" }}  >
                    <Box sx={{ flex: 1 }} >
                        <CssVarsProvider>
                            <Typography startDecorator={<DragIndicatorOutlinedIcon color='success' />} textColor="neutral.400" sx={{ display: 'flex', }} >
                                Fine And Other Deduction
                            </Typography>
                        </CssVarsProvider>
                    </Box>
                    <Tooltip title="Save" followCursor placement='top' arrow>
                        <Box sx={{ display: "flex", pr: 1 }}>
                            <CssVarsProvider>
                                <Button
                                    variant="outlined"
                                    component="label"
                                    size="sm"
                                    color="primary"
                                    onClick={submitFine}
                                >
                                    <SaveIcon />
                                </Button>
                            </CssVarsProvider>
                        </Box>
                    </Tooltip>
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
                            <JoyFineTypeSelect value={fine} setValue={setFine} updatefine={updatefine} />
                        </Box>
                        <Box sx={{ display: 'flex', width: '20%', pl: 0.5, mt: 1 }}>
                            <CssVarsProvider>
                                <Typography textColor="text.secondary" >
                                    Create New Fine Master
                                </Typography>
                            </CssVarsProvider>
                        </Box>
                        <Box sx={{ flex: 0, mt: 1 }} >
                            <OpenIcon aria-label="add" style={{ padding: "0rem" }} onClick={handleClickOpen}  >
                                <MdOutlineAddCircleOutline className="text-info" size={30}
                                />
                            </OpenIcon>
                        </Box>
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "row", px: 20, pt: 0.5 }}>
                        <Box sx={{ display: 'flex', width: '20%' }}>
                            <CssVarsProvider>
                                <Typography textColor="text.secondary" >
                                    Description
                                </Typography>
                            </CssVarsProvider>
                        </Box>
                        <Box sx={{ flex: 1, }} >
                            <InputComponent
                                type="text"
                                size="sm"
                                placeholder="Description"
                                name="fine_descp"
                                value={fine_descp}
                                onchange={(e) => updateFineDed(e)}
                            />
                        </Box>
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "row", px: 20, pt: 0.5 }}>
                        <Box sx={{ display: 'flex', width: '20%' }}>
                            <CssVarsProvider>
                                <Typography textColor="text.secondary" >
                                    Fine Amount
                                </Typography>
                            </CssVarsProvider>
                        </Box>
                        <Box sx={{ flex: 1, }} >
                            <InputComponent
                                type="text"
                                size="sm"
                                placeholder="Amount"
                                name="fine_amount"
                                value={fine_amount}
                                onchange={(e) => updateFineDed(e)}
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
                            <InputComponent
                                type="text"
                                size="sm"
                                placeholder="Period"
                                name="times"
                                value={times}
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
                            <Input
                                type="date"
                                slotProps={{
                                    input: {
                                        min: moment(new Date()).format('YYYY-MM-DD'),
                                    },

                                }}
                                value={finestart}
                                name="finestart"
                                onChange={(e) => getstart(e)}
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
                            <Input
                                type="date"
                                slotProps={{
                                    input: {
                                        min: moment(new Date(finestart)).format('YYYY-MM-DD'),
                                        //max: moment(addMonths(new Date(finestart), 6)).format('YYYY-MM-DD'),
                                    },

                                }}
                                value={fineend}
                                name="fineend"
                                onChange={(e) => getend(e)}
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
                            <InputComponent
                                type="text"
                                size="sm"
                                placeholder="Remark"
                                name="fine_remark"
                                value={fine_remark}
                                onchange={(e) => updateFineDed(e)}
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
                </Box>
                <Paper square elevation={0} sx={{ p: 1, mt: 0.5, display: 'flex', flexDirection: "column" }} >
                    <CommonAgGrid
                        columnDefs={columnDef}
                        tableData={tableData}
                        sx={{
                            height: 300,
                            width: "100%"
                        }}
                        rowHeight={30}
                        headerHeight={30}
                    />
                </Paper>
                <Paper square sx={{ backgroundColor: "#F8F8F8", display: "flex", flexDirection: "row" }}>
                </Paper>
            </Box>
        </Fragment >
    )
}

export default memo(FineorDeduction) 