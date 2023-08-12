import CustomLayout from 'src/views/Component/MuiCustomComponent/CustomLayout'
import React, { Fragment, useState, useEffect, memo, useCallback, useMemo } from 'react'
import { useParams } from 'react-router'
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import ModalOne from 'src/views/CommonCode/ModalOne'
import { axioslogin } from 'src/views/Axios/Axios'
import { Box, IconButton, Paper, TextField } from '@mui/material'
import moment from 'moment';
import { employeeNumber } from 'src/views/Constant/Constant'
import { infoNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc'
import { CssVarsProvider, Typography } from '@mui/joy'
import LibraryAddCheckOutlinedIcon from '@mui/icons-material/LibraryAddCheckOutlined';
import CommonCheckBox from 'src/views/Component/CommonCheckBox'
import Close from '@mui/icons-material/Close';
import EarnDeductionSelection from 'src/views/MuiComponents/EarnDeductionSelection'
import CommonAgGrid from 'src/views/Component/CommonAgGrid'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { insertWage, updateEmpmaster } from './Functions';

const EarnDeduction = () => {

    const [wage, setWage] = useState(0)
    const [tableData, setTableData] = useState();
    const { id, no } = useParams();
    const [open, setOpen] = React.useState(false);
    const [monthstart, setMonthstart] = useState(new Date());
    const [monthend, setMonthend] = useState(new Date());
    const [count, setcount] = useState(0);
    const [flag, setflag] = useState(0)
    const [slno, setslno] = useState(0)
    const [LastWage, setlastWage] = useState(0)
    //Initializing
    const [wageType, setWageType] = useState({
        earning_type_name: '',
        em_earning_type: '',
        include_esi: 0,
        include_pf: 0,
        include_lwf: 0,
        include_protax: 0,
        em_amount: '',
        start_month: false,
        end_month: false,
    });
    const { earning_type_name, em_earning_type, em_amount, include_esi, include_pf, include_lwf,
        include_protax } = wageType;

    const updateAllowance = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setWageType({ ...wageType, [e.target.name]: value })
    }

    //Get data 
    useEffect(() => {
        if (wage !== 0) {
            const getWageType = async () => {
                const result = await axioslogin.get(`/common/getEarnings/${wage}`);
                const { data, success } = await result.data;
                if (success === 1) {
                    const { earning_type_name, erning_type_id, include_esi, include_pf, include_lwf, include_protax } = data[0]
                    const formdata = {
                        earning_type_name: earning_type_name,
                        em_earning_type: erning_type_id,
                        include_esi: include_esi,
                        include_pf: include_pf,
                        include_lwf: include_lwf,
                        include_protax: include_protax,
                        em_amount: '',
                        start_month: false,
                        end_month: false,
                    }
                    setWageType(formdata)
                }
                else {
                    const defaultstate = {
                        earning_type_name: '',
                        em_earning_type: '',
                        include_esi: 0,
                        include_pf: 0,
                        include_lwf: 0,
                        include_protax: 0,
                        em_amount: '',
                        start_month: false,
                    }
                    setWageType(defaultstate)
                }
            }
            getWageType()
        }
    }, [wage]);


    //moment start month
    const month_start = moment(monthstart).format('YYYY-MM-DD')
    //moment end month
    const month_end = moment(monthend).format('YYYY-MM-DD')

    // post data
    const postData = useMemo(() => {
        return {
            em_no: id,
            em_id: no,
            em_salary_desc: wage,
            em_earning_type: em_earning_type,
            em_amount: em_amount,
            em_start_date: month_start,
            em_end_date: month_end,
            create_user: employeeNumber(),
        }
    }, [id, no, wage, em_earning_type, em_amount, month_start, month_end])
    //Form reset
    const resetForm = {
        em_salary_desc: '',
        earning_type_name: '',
        em_earning_type: '',
        include_esi: 0,
        include_pf: 0,
        include_lwf: 0,
        include_protax: 0,
        em_amount: 0,
        start_month: false,
        end_month: false
    }

    // post data for update
    const updateData = useMemo(() => {
        return {
            em_id: no,
            em_no: id,
            em_salary_desc: wage,
            em_amount: em_amount,
            em_start_date: month_start,
            em_end_date: month_end,
            edit_user: employeeNumber(),
            last_wage: LastWage,
            ernded_slno: slno,
        }

    }, [no, id, wage, em_amount, LastWage, month_end, month_start, slno])

    //Submit data
    const submitAllowance = useCallback((e) => {
        e.preventDefault();
        const submitData = async (postData) => {
            const result = await axioslogin.get(`/empearndeduction/${id}`)
            const { success, data } = result.data;
            if (success === 1) {
                const arr = data?.map((val) => {
                    const obj = {
                        emp_id: val.em_id,
                        em_no: val.em_no,
                        em_salary_desc: val.em_salary_desc,
                        earning_type: val.em_earning_type,
                        last_wage: val.em_amount,
                        new_wage: val.em_amount,
                        entry_desc: 'I'
                    }
                    return obj
                })
                const result = await axioslogin.post('/empearndeduction/create/newentry', postData)
                const { message, success } = result.data;
                if (success === 1) {
                    insertWage(arr).then((values) => {
                        const { status, message } = values
                        if (status === 1) {
                            updateEmpmaster(no).then((values) => {
                                const { status, message } = values
                                if (status === 1) {
                                    succesNofity(message);
                                    setcount(count + 1)
                                    setWageType(resetForm);
                                    setWage(0)
                                    setflag(0)
                                } else {
                                    infoNofity(message)
                                }
                            })
                        } else {
                            infoNofity(message)
                        }
                    })
                } else {
                    infoNofity(message)
                    setWageType(resetForm);
                    setWage(0)
                    setflag(0)
                }
            } else {
                const result = await axioslogin.post('/empearndeduction/create/newentry', postData)
                const { message, success } = result.data;
                if (success === 1) {
                    setcount(count + 1)
                    succesNofity(message);
                    setWageType(resetForm);
                    setWage(0)
                    setflag(0)
                } else {
                    infoNofity(message)
                    setWageType(resetForm);
                    setWage(0)
                    setflag(0)
                }
            }
        }

        //submit update data
        const updateSubmit = async (updateData) => {
            const result = await axioslogin.get(`/empearndeduction/${id}`)
            const { success, data } = result.data;
            if (success === 1) {
                const arr = data?.map((val) => {
                    const obj = {
                        emp_id: val.em_id,
                        em_no: val.em_no,
                        em_salary_desc: val.em_salary_desc,
                        earning_type: val.em_earning_type,
                        last_wage: val.em_amount,
                        new_wage: val.em_amount,
                        entry_desc: 'U'
                    }
                    return obj
                })
                const result = await axioslogin.patch('/empearndeduction/update/new', updateData)
                const { message, success } = result.data;
                if (success === 2) {
                    insertWage(arr).then((values) => {
                        const { status, message } = values
                        if (status === 1) {
                            updateEmpmaster(no).then((values) => {
                                const { status, message } = values
                                if (status === 1) {
                                    succesNofity(message);
                                    setcount(count + 1)
                                    setWageType(resetForm);
                                    setWage(0)
                                    setflag(0)
                                } else {
                                    infoNofity(message)
                                }
                            })
                        } else {
                            infoNofity(message)
                        }
                    })
                } else if (success === 0) {
                    infoNofity(message.sqlMessage);
                } else {
                    infoNofity(message)
                }
            } else { }
        }
        if (flag === 0) {
            submitData(postData)
        }
        else {
            updateSubmit(updateData)
        }
    }, [updateData, postData, id, no, count, flag, resetForm])

    //Redirection
    const handleClose = () => {
        setOpen(false);
    };

    //Get Data
    useEffect(() => {
        const getData = async () => {
            const result = await axioslogin.get(`/empearndeduction/${id}`)
            const { success, data } = result.data;
            if (success === 1) {
                setTableData(data);
                setcount(0)
            }
            else if (success === 0) {
                infoNofity("No Allowance is added to this employee")
            } else {
                warningNofity(" Error occured contact EDP")
            }
        }
        getData();
    }, [id, count]);

    const [columnDef] = useState([
        { headerName: 'SlNo', field: 'slno' },
        { headerName: 'Wage Description ', field: 'earnded_name' },
        { headerName: 'Wage Type ', field: 'earning_type_name' },
        { headerName: 'Amount', field: 'em_amount' },
        {
            headerName: 'Edit', cellRenderer: params =>
                <IconButton sx={{ paddingY: 0.5 }} onClick={() => getDataTable(params)} >
                    <EditIcon color='primary' />
                </IconButton>
        },
        {
            headerName: 'Delete', cellRenderer: params =>
                <IconButton sx={{ paddingY: 0.5 }} onClick={() => getDelete(params)} >
                    <DeleteIcon color='primary' />
                </IconButton>
        },
    ])

    const getDataTable = useCallback((params) => {
        setflag(1)
        if (params.api.getSelectedRows() !== 0) {
            const data = params.api.getSelectedRows()
            const { em_salary_desc, ernded_slno, earning_type_name, include_esi, include_pf, include_lwf, include_protax, em_amount, em_start_date, em_end_date } = data[0]
            const updateformdata = {
                earning_type_name: earning_type_name,
                include_esi: include_esi,
                include_pf: include_pf,
                include_lwf: include_lwf,
                include_protax: include_protax,
                em_amount: em_amount,
                //last_amount: em_amount,
                start_month: false,
                end_month: false,
            }

            setlastWage(em_amount)
            setWageType(updateformdata)
            setWage(em_salary_desc)
            setMonthstart(em_start_date)
            setMonthend(em_end_date)
            setslno(ernded_slno)
            //const { ernded_slno, } = datas[0]
            //getDetails(ernded_slno)
        }
    }, [])

    const getDelete = useCallback(async (params) => {
        const data1 = params.api.getSelectedRows()
        const { ernded_slno } = data1[0]
        const result = await axioslogin.get(`/empearndeduction/${id}`)
        const { success, data } = result.data;
        if (success === 1) {
            const arr = data?.map((val) => {
                const obj = {
                    emp_id: val.em_id,
                    em_no: val.em_no,
                    em_salary_desc: val.em_salary_desc,
                    earning_type: val.em_earning_type,
                    last_wage: val.em_amount,
                    new_wage: val.em_amount,
                    entry_desc: 'D'
                }
                return obj
            })
            const result = await axioslogin.delete(`/empearndeduction/delete/${ernded_slno}`)
            const { success, message } = result.data;
            if (success === 2) {
                insertWage(arr).then((values) => {
                    const { status, message } = values
                    if (status === 1) {
                        updateEmpmaster(no).then((values) => {
                            const { status, message } = values
                            if (status === 1) {
                                succesNofity(message);
                                setcount(count + 1)
                                setWageType(resetForm);
                                setWage(0)
                                setflag(0)
                            } else {
                                infoNofity(message)
                            }
                        })
                    } else {
                        infoNofity(message)
                    }
                })
            } else {
                infoNofity(message)
            }

        } else {

        }
    }, [count, id, no])

    return (
        <Fragment>
            <ModalOne open={open} handleClose={handleClose} />
            <Box sx={{ width: "100%", height: { xxl: 825, xl: 680, lg: 523, md: 270, sm: 270, xs: 270 }, overflow: 'auto', '::-webkit-scrollbar': { display: "none" } }} >
                <CustomLayout title="Earnings - Deduction">
                    <Box sx={{ display: "flex", flexDirection: "column", flex: 1, px: 0.5 }}>
                        {/* First row start */}
                        <Box sx={{ display: "flex", flexDirection: "row", px: 20, width: '100%', pt: 1 }}>
                            <Box sx={{ display: 'flex', width: '20%' }}>
                                <CssVarsProvider>
                                    <Typography textColor="text.secondary" >
                                        Earn Type
                                    </Typography>
                                </CssVarsProvider>
                            </Box>
                            <Box sx={{ display: 'flex', width: '30%', }} >
                                <EarnDeductionSelection value={wage} setValue={setWage} />
                            </Box>
                            <Box sx={{ display: 'flex', width: '20%', pl: 1 }}>
                                <CssVarsProvider>
                                    <Typography textColor="text.secondary" >
                                        Earn Description
                                    </Typography>
                                </CssVarsProvider>
                            </Box>
                            <Box sx={{ display: 'flex', width: '30%', }} >
                                <TextField fullWidth
                                    placeholder='Wage type Description (Fixed ,Earning, Deducation)'
                                    size="small"
                                    id='earning_type_name'
                                    value={earning_type_name === '' ? 0 : earning_type_name}
                                    name="earning_type_name"
                                    disabled={true}
                                />
                            </Box>
                        </Box>
                        <Box sx={{ display: "flex", flexDirection: "row", px: 20, pt: 1 }}>
                            <Box sx={{ display: 'flex', width: '20%' }}>
                                <CssVarsProvider>
                                    <Typography textColor="text.secondary" >
                                        Amount
                                    </Typography>
                                </CssVarsProvider>
                            </Box>
                            <Box sx={{ display: 'flex', width: '30%' }} >
                                <TextField fullWidth
                                    placeholder='Amount'
                                    size="small"
                                    id='em_amount'
                                    value={em_amount}
                                    name="em_amount"
                                    onChange={(e) => updateAllowance(e)}
                                />
                            </Box>
                            <Box sx={{ display: 'flex', width: '20%', pl: 1 }}>
                                <CssVarsProvider>
                                    <Typography textColor="text.secondary" >
                                        Last Amount
                                    </Typography>
                                </CssVarsProvider>
                            </Box>
                            <Box sx={{ display: 'flex', width: '30%' }} >
                                <TextField fullWidth
                                    placeholder='Last Amount'
                                    size="small"
                                    id='LastWage'
                                    value={LastWage}
                                    name="LastWage"
                                    disabled={true}
                                />
                            </Box>
                        </Box>
                        <Box sx={{ display: "flex", flexDirection: "row", px: 20, pt: 1 }}>
                            <Box sx={{ display: "flex", flex: 1, justifyContent: "center" }} >
                                <CssVarsProvider>
                                    <CommonCheckBox
                                        color={include_esi === 1 ? "success" : "error"}
                                        size="lg"
                                        label={include_esi === 1 ? "ESI" : "ESI"}
                                        uncheckedIcon={include_esi === 1 ? <IoCheckmarkDoneSharp /> : <Close />}
                                        disabled={true}
                                    />
                                </CssVarsProvider>
                            </Box>
                            <Box sx={{ display: "flex", flex: 1, justifyContent: "center" }} >
                                <CssVarsProvider>
                                    <CommonCheckBox
                                        size="lg"
                                        color={include_pf === 1 ? "success" : "error"}
                                        label={include_pf === 1 ? "PF" : "PF"}
                                        uncheckedIcon={include_pf === 1 ? <IoCheckmarkDoneSharp /> : <Close />}
                                        disabled={true}
                                    />
                                </CssVarsProvider>
                            </Box>
                            <Box sx={{ display: "flex", flex: 1, justifyContent: "center" }} >
                                <CssVarsProvider>
                                    <CommonCheckBox
                                        size="lg"
                                        color={include_lwf === 1 ? "success" : "error"}
                                        label={include_lwf === 1 ? "LWF" : "LWF"}
                                        uncheckedIcon={include_lwf === 1 ? <IoCheckmarkDoneSharp /> : <Close />}
                                        disabled={true}
                                    />
                                </CssVarsProvider>
                            </Box>
                            <Box sx={{ display: "flex", flex: 1, justifyContent: "center" }} >
                                <CssVarsProvider>
                                    <CommonCheckBox
                                        size="lg"
                                        color={include_protax === 1 ? "success" : "error"}
                                        label={include_protax === 1 ? "Pro Tax" : "Pro Tax"}
                                        uncheckedIcon={include_protax === 1 ? <IoCheckmarkDoneSharp /> : <Close />}
                                        disabled={true}
                                    />
                                </CssVarsProvider>
                            </Box>
                        </Box>
                        <Paper square elevation={0} sx={{ pt: 1, mt: 0.5, display: 'flex', flexDirection: "column" }} >
                            <CommonAgGrid
                                columnDefs={columnDef}
                                tableData={tableData}
                                sx={{
                                    height: 600,
                                    width: "100%"
                                }}
                                rowHeight={30}
                                headerHeight={30}
                            />
                        </Paper>
                        <Paper square sx={{ backgroundColor: "#F8F8F8", display: "flex", flexDirection: "row" }}>
                            <Box sx={{ flex: 0, p: 0.3 }} >
                                <IconButton variant="outlined" size='sm' onClick={submitAllowance} >
                                    <LibraryAddCheckOutlinedIcon />
                                </IconButton>
                            </Box>
                        </Paper>
                    </Box>
                </CustomLayout>
            </Box>
        </Fragment>
    )
}

export default memo(EarnDeduction)