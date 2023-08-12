import { Button, CssVarsProvider, Typography } from '@mui/joy';
import { Box, Dialog, DialogActions, DialogContent, DialogContentText, IconButton, Paper, Slide, TextField, Tooltip } from '@mui/material';
import React, { Fragment, memo, useCallback, useEffect, useMemo, useState } from 'react'
import { ToastContainer } from 'react-toastify';
import { axioslogin } from 'src/views/Axios/Axios';
import CommonCheckBox from 'src/views/Component/CommonCheckBox';
import EarnDeductionSelection from 'src/views/MuiComponents/EarnDeductionSelection';
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import Close from '@mui/icons-material/Close';
import CommonAgGrid from 'src/views/Component/CommonAgGrid';
import { employeeNumber } from 'src/views/Constant/Constant';
import { infoNofity, succesNofity } from 'src/views/CommonCode/Commonfunc';
import EditIcon from '@mui/icons-material/Edit';
import ArrowRightOutlinedIcon from '@mui/icons-material/ArrowRightOutlined';
import { insertWage, updateEmpmaster } from '../EmployeeFile/EmployeeProfile/EmpMenus/EarnDeductionDetails/Functions';
import moment from 'moment';
import DeleteIcon from '@mui/icons-material/Delete';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});

const EarnDeductionModel = ({ open, setOpen, Empno, empId, recomendeSalary, setModel }) => {

    const [wage, setWage] = useState(0)
    const [LastWage, setlastWage] = useState(0)
    const [monthstart, setMonthstart] = useState(new Date());
    const [monthend, setMonthend] = useState(new Date());
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
    const { earning_type_name, em_earning_type, em_amount, include_esi, include_pf, include_lwf, include_protax } = wageType;
    const [fixedData, setFixedData] = useState([])
    const [earnData, setearnData] = useState([])
    const [deductData, setDeductData] = useState([])
    const [count, setCount] = useState(0)
    const [flag, setflag] = useState(0)
    const [slno, setSlno] = useState(0)
    const [earnTotal, setearnTotal] = useState(0)
    const [fixedTotal, setFixedTotal] = useState(0)
    const [deductTotal, setDeductTotal] = useState(0)

    const updateAllowance = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setWageType({ ...wageType, [e.target.name]: value })
    }

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

    const postData = useMemo(() => {
        return {
            em_no: Empno,
            em_id: empId,
            em_salary_desc: wage,
            em_earning_type: em_earning_type,
            em_amount: em_amount,
            em_start_date: month_start,
            em_end_date: month_end,
            create_user: employeeNumber(),
        }
    }, [wage, em_earning_type, em_amount, empId, Empno, month_start, month_end])

    const [fiexWageColumn] = useState([
        { headerName: 'Wage Description ', field: 'earnded_name' },
        { headerName: 'Wage Type ', field: 'earning_type_name' },
        { headerName: 'Amount', field: 'em_amount' },
        {
            headerName: 'Edit', cellRenderer: params =>
                <IconButton sx={{ paddingY: 0.5 }} onClick={() => EditProcess(params)} >
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

    const EditProcess = async (params) => {
        const data = params.api.getSelectedRows()
        const { em_salary_desc, ernded_slno, earning_type_name, include_esi, include_pf, include_lwf,
            include_protax, em_amount, em_start_date, em_end_date } = data[0]
        const updateformdata = {
            earning_type_name: earning_type_name,
            include_esi: include_esi,
            include_pf: include_pf,
            include_lwf: include_lwf,
            include_protax: include_protax,
            em_amount: em_amount,
        }
        setlastWage(em_amount)
        setWageType(updateformdata)
        setWage(em_salary_desc)
        setMonthstart(em_start_date)
        setMonthend(em_end_date)
        setflag(1)
        setSlno(ernded_slno)
    }

    const CloseModel = () => {
        setOpen(false)
        setModel(0)
    }
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
        end_month: false,
        LastWage: 0
    }

    // post data for update
    const updateData = useMemo(() => {
        return {
            em_id: empId,
            em_no: Empno,
            em_salary_desc: wage,
            em_amount: em_amount,
            em_start_date: month_start,
            em_end_date: month_end,
            edit_user: employeeNumber(),
            last_wage: LastWage,
            ernded_slno: slno,
        }

    }, [empId, Empno, wage, em_amount, LastWage, slno, month_start, month_end])

    const submitAllowance = useCallback(() => {
        const submitData = async (postData) => {
            const result = await axioslogin.get(`/empearndeduction/${Empno}`)
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
                            updateEmpmaster(empId).then((values) => {
                                const { status, message } = values
                                if (status === 1) {
                                    succesNofity(message);
                                    setCount(count + 1)
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
                    setCount(count + 1)
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

        const UpdateData = async (updateData) => {

            const result = await axioslogin.get(`/empearndeduction/${Empno}`)
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
                            updateEmpmaster(empId).then((values) => {
                                const { status, message } = values
                                if (status === 1) {
                                    succesNofity(message);
                                    setCount(count + 1)
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
        if (flag === 1) {
            UpdateData(updateData)
        } else {
            submitData(postData)
        }

    }, [postData, updateData, Empno, empId, count, flag])

    const getDelete = useCallback(async (params) => {
        const data1 = params.api.getSelectedRows()
        const { ernded_slno } = data1[0]
        const result = await axioslogin.get(`/empearndeduction/${Empno}`)
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
                        updateEmpmaster(empId).then((values) => {
                            const { status, message } = values
                            if (status === 1) {
                                succesNofity(message);
                                setCount(count + 1)
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
    }, [count, empId, Empno])



    useEffect(() => {
        const checkid = {
            em_id: empId
        }

        const getFixed = async (checkid) => {
            const result = await axioslogin.post('/empearndeduction/fixed', checkid)
            const { success, data } = result.data;
            if (success === 1) {
                const v = data.map(item => item.em_amount).reduce((prev, next) => Number(prev) + Number(next));
                setFixedTotal(v)
                setFixedData(data)
                setCount(0)
            } else {
                setFixedData([])
            }
        }
        getFixed(checkid)

        const getEarn = async (checkid) => {
            const result = await axioslogin.post('/empearndeduction/earning', checkid)
            const { success, data } = result.data;
            if (success === 1) {
                const v = data.map(item => item.em_amount).reduce((prev, next) => Number(prev) + Number(next));
                setearnTotal(v)
                setearnData(data)
                setCount(0)

            } else {
                setearnData([])
            }
        }
        getEarn(checkid)

        const getDeduction = async (checkid) => {
            const result = await axioslogin.post('/empearndeduction/deduction', checkid)
            const { success, data } = result.data;
            if (success === 1) {
                const v = data.map(item => item.em_amount).reduce((prev, next) => Number(prev) + Number(next));
                setDeductTotal(v)
                setDeductData(data)
                setCount(0)
            } else {
                setDeductData([])
            }
        }
        getDeduction(checkid)
    }, [empId, count,])

    return (
        <Fragment>
            <ToastContainer />
            <Dialog
                open={open}
                TransitionComponent={Transition}
                fullWidth
                maxWidth='xl'
            >
                <DialogContent id="alert-dialog-slide-descriptiona"
                    sx={{
                        width: '100%',
                        height: 800
                    }}>
                    <DialogContentText id="alert-dialog-slide-descriptiona">
                        Earning-Deduction
                    </DialogContentText>
                    <Box sx={{
                        width: "100%",
                        overflow: 'auto', '::-webkit-scrollbar': { display: "none" }
                    }} >
                        <Box sx={{ width: '100%', pt: 1, display: "flex", flexDirection: "row", }}>
                            <Box sx={{ display: "flex", width: '25%', px: 0.3 }}>
                                <EarnDeductionSelection value={wage} setValue={setWage} />
                            </Box>
                            <Tooltip title="Wage type Description (Fixed ,Earning, Deducation)" followCursor placement='top' arrow>
                                <Box sx={{ display: "flex", width: '25%', px: 0.3 }}>
                                    <TextField fullWidth
                                        //label="Wage type Description (Fixed ,Earning, Deducation)"
                                        id="fullWidth" size="small"
                                        disabled
                                        value={earning_type_name === '' ? 0 : earning_type_name}
                                    />
                                </Box>
                            </Tooltip>
                            <Tooltip title="Amount" followCursor placement='top' arrow>
                                <Box sx={{ display: "flex", width: '25%', px: 0.3 }}>
                                    <TextField fullWidth
                                        //label="Amount"
                                        size="small"
                                        id='em_amount'
                                        value={em_amount}
                                        name="em_amount"
                                        onChange={(e) => updateAllowance(e)}
                                    />
                                </Box>
                            </Tooltip>
                            <Tooltip title="Last Amount" followCursor placement='top' arrow>
                                <Box sx={{ display: "flex", width: '25%', px: 0.3 }}>
                                    <TextField fullWidth
                                        //label="Last Amount"
                                        id="fullWidth"
                                        size="small"
                                        disabled
                                        value={LastWage}
                                    />
                                </Box>
                            </Tooltip>
                            <Tooltip title="Recommended Salary" followCursor placement='top' arrow>
                                <Box sx={{ display: "flex", width: '25%', px: 0.3 }}>
                                    <TextField fullWidth
                                        //label="Last Amount"
                                        id="fullWidth"
                                        size="small"
                                        disabled
                                        value={recomendeSalary}
                                    />
                                </Box>
                            </Tooltip>
                        </Box>

                        <Box sx={{ pt: 1, width: '100%', display: 'flex', flexDirection: 'row' }}>
                            <Box sx={{ width: '70%' }}>
                                <Paper square variant="outlined" sx={{
                                    display: 'flex', flex: 1, flexDirection: 'row',
                                    alignItems: 'center',
                                }} >
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
                                </Paper>
                            </Box>
                            <Box sx={{ width: '30%', backgroundColor: 'lightcyan', display: 'flex', flexDirection: 'row', }}>
                                <Box sx={{ display: 'flex', flexDirection: 'row', flex: 1, }}>
                                    <Paper square variant="outlined" sx={{
                                        display: 'flex', flex: 1,
                                        alignItems: 'center', justifyContent: 'space-between'
                                    }} >
                                        <Box sx={{}}>
                                            <CssVarsProvider>
                                                <Typography  >
                                                    Gross
                                                </Typography>
                                            </CssVarsProvider>
                                        </Box>
                                        <Box sx={{}}>
                                            <CssVarsProvider>
                                                <Typography  >
                                                    {fixedTotal + earnTotal}
                                                </Typography>
                                            </CssVarsProvider>
                                        </Box>
                                    </Paper>
                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: 'row', flex: 1 }}>
                                    <Paper square variant="outlined" sx={{
                                        display: 'flex', flex: 1,
                                        alignItems: 'center', justifyContent: 'space-between'
                                    }} >
                                        <Box sx={{}}>
                                            <CssVarsProvider>
                                                <Typography  >
                                                    Net
                                                </Typography>
                                            </CssVarsProvider>
                                        </Box>
                                        <Box sx={{ display: 'flex', flexDirection: 'row-reverse', }}>
                                            <CssVarsProvider>
                                                <Typography  >
                                                    {fixedTotal + earnTotal - deductTotal}
                                                </Typography>
                                            </CssVarsProvider>
                                        </Box>
                                    </Paper>
                                </Box>
                            </Box>

                        </Box>

                        {/* <Box sx={{ display: "flex", }}>
                            <Box sx={{ flex: 0, p: 0.3 }} >
                                <CssVarsProvider>
                                    <ButtonIcon variant="outlined" size='sm' onClick={submitAllowance} >
                                        <LibraryAddCheckOutlinedIcon />
                                    </ButtonIcon>
                                </CssVarsProvider>
                            </Box>
                        </Box> */}
                        <Box sx={{ display: 'flex', width: '100%' }}>
                            <Box sx={{ width: '80%' }}>
                                <CssVarsProvider>
                                    <Typography textColor="text.secondary" startDecorator={<ArrowRightOutlinedIcon />} >
                                        Fixed Wages
                                    </Typography>
                                </CssVarsProvider>
                            </Box>
                            <Box sx={{ width: '20%' }}>
                                <CssVarsProvider>
                                    <Typography textColor="text.secondary" >
                                        Total:-{fixedTotal}
                                    </Typography>
                                </CssVarsProvider>
                            </Box>

                        </Box>
                        <Box sx={{ py: 0.5 }}>
                            <CommonAgGrid
                                columnDefs={fiexWageColumn}
                                tableData={fixedData}
                                sx={{
                                    height: 180,
                                    width: "100%"
                                }}
                                rowHeight={30}
                                headerHeight={30}
                            />
                        </Box>
                        <Box sx={{ display: 'flex', width: '100%' }}>
                            <Box sx={{ width: '80%' }}>
                                <CssVarsProvider>
                                    <Typography textColor="text.secondary" startDecorator={<ArrowRightOutlinedIcon />} >
                                        Earnings
                                    </Typography>
                                </CssVarsProvider>
                            </Box>
                            <Box sx={{ width: '20%' }}>
                                <CssVarsProvider>
                                    <Typography textColor="text.secondary" >
                                        Total:-{earnTotal}
                                    </Typography>
                                </CssVarsProvider>
                            </Box>
                        </Box>
                        <Box sx={{ py: 0.5 }}>
                            <CommonAgGrid
                                columnDefs={fiexWageColumn}
                                tableData={earnData}
                                sx={{
                                    height: 180,
                                    width: "100%"
                                }}
                                rowHeight={30}
                                headerHeight={30}
                            />
                        </Box>
                        <Box sx={{ display: 'flex', width: '100%' }}>
                            <Box sx={{ width: '80%' }}>
                                <CssVarsProvider>
                                    <Typography textColor="text.secondary" startDecorator={<ArrowRightOutlinedIcon />} >
                                        Deduction
                                    </Typography>
                                </CssVarsProvider>
                            </Box>
                            <Box sx={{ width: '20%' }}>
                                <CssVarsProvider>
                                    <Typography textColor="text.secondary" >
                                        Total:-{deductTotal}
                                    </Typography>
                                </CssVarsProvider>
                            </Box>
                        </Box>
                        <Box sx={{ py: 0.5 }} >
                            <CommonAgGrid
                                columnDefs={fiexWageColumn}
                                tableData={deductData}
                                sx={{
                                    height: 180,
                                    width: "100%"
                                }}
                                rowHeight={30}
                                headerHeight={30}
                            />
                        </Box>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button color="secondary" onClick={submitAllowance}>Save</Button>
                    <Button color="secondary" onClick={CloseModel} >Cancel</Button>
                </DialogActions>
            </Dialog>
        </Fragment >
    )
}

export default memo(EarnDeductionModel) 